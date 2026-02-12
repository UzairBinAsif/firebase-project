export default function handler(req, res) {
    const url = process.env.CLOUDINARY_URL;

    if (!url) {
        return res.status(500).json({ message: "URL not found" });
    }

    res.status(200).json({ url });
}
