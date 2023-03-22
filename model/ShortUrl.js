import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({
    destinationUrl: {
        type: String,
        required: true,
        unique: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    protection: {
        type: Boolean,
        default: false,
    },
    clickCount: {
        type: Number,
        default: 0
    },
    readCount: {
        type: Number,
        default: 20
    },
    viewOnce: {
        type: Boolean,
        default: false,
    },
    isopen: {
        type: Boolean,
        default: false,
    },
    expiresAt: {
        type: Date,
        default: Date.now() + 5 * 60 * 1000, // 5 minutes in milliseconds
        index: { expires: 0 }
    }
});

const ShortUrl = mongoose.models.ShortUrl || mongoose.model('ShortUrl', shortUrlSchema);

export default ShortUrl;
