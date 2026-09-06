const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/AuthMiddleware');
const upload = multer({ dest: path.join(__dirname, '..', 'uploads', 'temp') });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!req.uniqueFolderInfo) {
        const { namaSekolah, tahun } = req.body;
        const uniqueFolderName = `${namaSekolah}_${tahun}`;
        const uploadDir = path.join(__dirname, '..', 'uploads', uniqueFolderName);
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Simpan informasi folder di request agar bisa dipakai lagi oleh file berikutnya
            req.uniqueFolderInfo = { path: uploadDir, name: uniqueFolderName };
        }

        // Gunakan path folder yang sudah ada di request untuk semua file
        cb(null, req.uniqueFolderInfo.path);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

router.post(
    '/', 
    authMiddleware,
    upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), 
    portfolioController.createPortfolio
);

router.get('/', portfolioController.getAllPortfolios);

router.post('/:id/view', portfolioController.viewPortfolioById);

router.put(
    '/:id', 
    authMiddleware,
    upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), 
    portfolioController.updatePortfolio
);

router.delete(
    '/:id', 
    authMiddleware, 
    portfolioController.deletePortfolio
);

module.exports = router;