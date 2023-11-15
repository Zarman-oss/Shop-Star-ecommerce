import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'upload/');
    },
    filename(req, file, cb) {
        cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`)

    }
});


const checkFileType = () => {
    const filetype = /jpg|jpg|png/;
    const extname = filetype.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetype.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Image Only');
    }
}

const upload = multer({
    storage,
});

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image Uploader ',
        image: `/${req.file.path}`,
    });
})


export default router;
