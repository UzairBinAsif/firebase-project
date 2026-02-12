export default async function handler(req, res) {
    try {
        const cloudinaryUrl = process.env.CLOUDINARY_URL;

        const response = await fetch(cloudinaryUrl, {
            method: "POST",
            body: req.body
        });

        const data = await response.json();

        return res.status(200).json({
            secure_url: data.secure_url
        });

    } catch (error) {
        return res.status(500).json({
            message: "Upload failed",
            error: error.message
        });
    }
}
