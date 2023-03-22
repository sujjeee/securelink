import connectMongo from '../../../lib/dbConnect';
import ShortUrl from '../../../model/ShortUrl';

export default async function handler(req, res) {
    try {
        await connectMongo();

        if (req.method === 'GET' && req.query.link) {
            const { link } = req.query;

            const url = await ShortUrl.findOne(
                { shortUrl: link },
            );

            if (!url) {
                res.status(404).json({ success: false, message: 'Url Not Found!' });
                return;
            }

            res.status(200).json({ success: true, clicksCounts: url.clickCount });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
