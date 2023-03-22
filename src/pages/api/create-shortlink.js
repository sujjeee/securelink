import connectMongo from '../../../lib/dbConnect';
import ShortUrl from '../../../model/ShortUrl';
import CryptoJS from 'crypto-js';
import { validationResult, check } from 'express-validator';
import bcrypt from 'bcrypt';

async function createShortLink(req, res) {
    try {
        // connect to mongodb
        await connectMongo();

        // Validating the API request body
        const validationRules = [
            check('originalUrl')
                .notEmpty()
                .withMessage('Destination URL is required')
                .isURL()
                .withMessage('Destination URL is invalid'),
            check('shortId')
                .notEmpty()
                .withMessage('Short URL is required'),
            check('protection')
                .optional()
                .isBoolean()
                .withMessage('Protection should be a boolean value'),
            check('password')
                .optional()
                .custom((value, { req }) => {
                    if (req.body.protection && !value) {
                        throw new Error('Password is required for protected URL');
                    }
                    return true;
                }),
            check('viewOnce')
                .optional()
                .isBoolean()
                .withMessage('View Once should be a boolean value'),
            check('readCount')
                .optional()
                .notEmpty()
                .withMessage('Read Count is required')
                .isInt({ min: 1, max: 100 })
                .withMessage('Read Count should be an integer value and should be between 1 and 30'),
            check('expiresAt')
                .optional()
                .notEmpty()
                .withMessage('Expires time is required')
                .isInt({ min: 1, max: 30 })
                .withMessage('Expires time should be an integer value and should be between 1 and 30'),
        ];

        await Promise.all(validationRules.map((validation) => validation.run(req)));

        // Checking for errors in req body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { originalUrl, shortId, protection, password, viewOnce, readCount, expiresAt } = req.body;

        // hashing password using bcrypt.js
        let passwordHash = null;
        if (protection) {
            if (!password) {
                return res.status(400).json({ error: 'Password is required for protected URL' });
            }
            passwordHash = await bcrypt.hash(password, 10);
        }

        // converting the date taken by user in minutes to ISO format
        const expirationTime = expiresAt ? new Date(Date.now() + expiresAt * 60 * 1000) : new Date(Date.now() + 5 * 60 * 1000);

        let url = await ShortUrl.findOne({ originalUrl });

        // creating field to database
        if (!url) {

            // if you want to use in localhost then turn 'https' to 'http' 
            const checkShortId = await ShortUrl.findOne({ shortUrl: `https://${req.headers.host}/${shortId}` });
            if (checkShortId) {
                return res.status(409).json({ success: false, message: 'Short URL is already taken' });
            }

            const shortUrl = `https://${req.headers.host}/${shortId}`;
            const destinationUrl = CryptoJS.AES.encrypt(originalUrl, process.env.NEXT_PUBLIC_NEXTAUTH_KEY).toString();

            url = await ShortUrl.create({
                destinationUrl,
                shortUrl,
                password: passwordHash,
                protection,
                viewOnce,
                clickCount: 0,
                open: false,
                expiresAt: expirationTime,
                readCount,
            });
        }

        res.status(200).json({ success: true, shortUrl: url.shortUrl, expiresAt: url.expiresAt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export default createShortLink;
