import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,

    params: async (req, file) => {

        // Remove extension
        const originalName = file.originalname.split('.')[0];

        return {

            folder: "blog-images",

            allowed_formats: ["jpg", "png", "jpeg", "webp", "avif"],

            public_id: `${Date.now()}-${originalName}`,

            // Uniform Blog Cover Size
            transformation: [
                {
                    width: 1200,
                    height: 630,
                    crop: "fill",
                    gravity: "auto"
                },
                {
                    quality: "auto"
                }
            ]

        };
    }
});

const upload = multer({ storage });

export default upload;