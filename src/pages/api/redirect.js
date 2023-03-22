import connectMongo from '../../../lib/dbConnect';
import ShortUrl from '../../../model/ShortUrl';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    try {
        await connectMongo();

        if (req.method === 'GET' && req.query.link) {
            const { link } = req.query;

            const url = await ShortUrl.findOneAndUpdate(
                { shortUrl: link },
                { $inc: { clickCount: 1 } },
                { new: true }
            );

            if (url.isopen || url.clickCount >= url.readCount) {
                await ShortUrl.deleteOne({ _id: url._id });
                res.status(404).json({ success: false, message: 'Url Not Found!' });
                return;
            }

            if (url.protection) {
                res.status(200).json({ success: true, protection: url.protection });
                return;
            }

            if (url.viewOnce && !url.protection) {
                await ShortUrl.findOneAndUpdate({ _id: url._id }, { $set: { isopen: true } });
            }

            res.status(200).json({ success: true, destinationUrl: url.destinationUrl, protection: url.protection });
        } else if (req.method === 'POST' && req.body.shortUrl && req.body.password) {
            const { shortUrl, password } = req.body;

            const url = await ShortUrl.findOne({ shortUrl });

            if (!url) {
                res.status(404).json({ success: false, message: 'Url Not Found!' });
                return;
            }

            if (url.isopen || url.clickCount >= url.readCount) {
                await ShortUrl.deleteOne({ _id: url._id });
                res.status(404).json({ success: false, message: 'Url Not Found!' });
                return;
            }

            const checkPass = await bcrypt.compare(password, url.password);

            if (checkPass) {
                if (url.viewOnce) {
                    await ShortUrl.findOneAndUpdate({ _id: url._id }, { $set: { isopen: true } }, { new: true });
                }
                res.status(200).json({ success: true, destinationUrl: url.destinationUrl });
            } else {
                res.status(401).json({ success: false, message: 'Unauthorized' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Bad Request' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
