const Portfolio = require('../models/Portfolio');
const path = require('path');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
// const popplerPath = require("pdf-poppler").path;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const os = require('os');
let popplerPath;
if (os.platform() === 'win32') {
    popplerPath = require("pdf-poppler").path;
}

// Fungsi Helper untuk Konversi PDF ke JPG
async function convertPdfToJpg(pdfPath, outputDir) {
    // Generate ID unik berdasarkan waktu saat ini
    const timestamp = Date.now(); 
    // Nama file output jadi: "page-1712345678" (nanti poppler nambahin -1.jpg, -2.jpg otomatis)
    const outputFile = path.join(outputDir, `page-${timestamp}`); 
    
    let command;
    if (os.platform() === 'win32') {
        command = `"${path.join(popplerPath, "pdftoppm")}" -jpeg "${pdfPath}" "${outputFile}"`;
    } else {
        command = `pdftoppm -jpeg "${pdfPath}" "${outputFile}"`;
    }

    try {
        await exec(command);
        console.log('PDF conversion successful.');
        
        // Cari file yang baru saja dibuat (yang mengandung timestamp tadi)
        const files = fs.readdirSync(outputDir);
        return files.filter(file => 
            file.includes(`page-${timestamp}`) && 
            (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'))
        );
    } catch (error) {
        console.error('Error during PDF conversion:', error);
        throw new Error('PDF to Image conversion failed');
    }
}

exports.createPortfolio = async (req, res) => {
    let finalFolderPath = null; // Variabel untuk menyimpan path folder final

    try {
        // 1. Ambil data dari body dan file temporer
        const { namaSekolah, tahun, password } = req.body;
        
        if (!req.files || !req.files.cover || !req.files.pdf) {
            return res.status(400).json({ error: 'Cover image and PDF file are required.' });
        }
        const coverFileTemp = req.files.cover[0];
        const pdfFileTemp = req.files.pdf[0];

        // 2. Buat nama folder final
        const sanitizedNamaSekolah = namaSekolah.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        const finalFolderName = `${sanitizedNamaSekolah}_${tahun}_${Date.now()}`;
        finalFolderPath = path.join(__dirname, '..', 'uploads', finalFolderName);

        if (!fs.existsSync(finalFolderPath)) {
            fs.mkdirSync(finalFolderPath, { recursive: true });
        }

        // 3. Pindahkan file ke lokasi final
        const finalCoverPath = path.join(finalFolderPath, coverFileTemp.originalname);
        const finalPdfPath = path.join(finalFolderPath, pdfFileTemp.originalname);
        
        fs.renameSync(coverFileTemp.path, finalCoverPath);
        fs.renameSync(pdfFileTemp.path, finalPdfPath);

        // 4. Konversi PDF dari lokasi barunya
        const imageFiles = await convertPdfToJpg(finalPdfPath, finalFolderPath);
        fs.unlinkSync(finalPdfPath);

        // 5. Siapkan data untuk database
        const portfolioData = {
            namaSekolah,
            tahun,
            cover: path.join(finalFolderName, coverFileTemp.originalname).replace(/\\/g, "/"),
            images: imageFiles.map(img => path.join(finalFolderName, img).replace(/\\/g, "/")),
            namaAkun: req.admin.email,
        };

        if (password && password.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            portfolioData.password = await bcrypt.hash(password, salt);
        }

        const newPortfolio = await Portfolio.create(portfolioData);
        
        const responseData = newPortfolio.toJSON();
        delete responseData.password;
        res.status(201).json(responseData);

    } catch (err) {
        // --- BLOK CATCH YANG SUDAH DIPERBAIKI ---
        console.error('Error creating portfolio:', err);

        // 1. Hapus folder final jika sudah terbuat
        if (finalFolderPath && fs.existsSync(finalFolderPath)) {
            fs.rmSync(finalFolderPath, { recursive: true, force: true });
        }

        // 2. Hapus file temporer HANYA jika mereka masih ada (lebih aman)
        if (req.files) {
            if (req.files.cover && req.files.cover[0] && fs.existsSync(req.files.cover[0].path)) {
                fs.unlinkSync(req.files.cover[0].path);
            }
            if (req.files.pdf && req.files.pdf[0] && fs.existsSync(req.files.pdf[0].path)) {
                fs.unlinkSync(req.files.pdf[0].path);
            }
        }

        res.status(500).json({ error: 'Failed to create portfolio' });
    }
};

// GET ALL PORTFOLIOS
exports.getAllPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.findAll({ order: [['id', 'ASC']] });
        res.status(200).json(portfolios);
    } catch (err) {
        console.error('Error fetching portfolios:', err);
        res.status(500).json({ error: 'Failed to fetch portfolios' });
    }
};

exports.getPortfolioById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findByPk(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }
        res.status(200).json(portfolio);
    } catch (err) {
        console.error('Error fetching portfolio:', err);
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
};

exports.viewPortfolioById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findByPk(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        let isAdmin = false;
        const authHeader = req.header('Authorization');

        if (authHeader) {
            try {
                const token = authHeader.replace('Bearer ', '');
                jwt.verify(token, process.env.JWT_SECRET);
                
                isAdmin = true; 
            } catch (err) {
                console.log("Token verification failed in view:", err.message);
            }
        }

        if (portfolio.password && !isAdmin) {
            const { password: inputPassword } = req.body;

            if (!inputPassword) {
                return res.status(401).json({ error: 'Password required', isProtected: true });
            }

            const isMatch = await bcrypt.compare(inputPassword, portfolio.password);
            if (!isMatch) {
                return res.status(403).json({ error: 'Invalid password', isProtected: true });
            }
        }
        const responseData = portfolio.toJSON();
        delete responseData.password;

        res.status(200).json(responseData);

    } catch (err) {
        console.error('Error fetching portfolio:', err);
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
};

// UPDATE PORTFOLIO (DENGAN LOGIKA HAPUS BERSIH)
exports.updatePortfolio = async (req, res) => {
    let tempFiles = []; 

    try {
        const portfolio = await Portfolio.findByPk(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        // --- 1. TENTUKAN FOLDER TUJUAN ---
        let folderName;
        
        // Prioritas: Gunakan folder dari cover yang ada, atau images, atau buat baru
        if (portfolio.cover) {
            folderName = path.dirname(portfolio.cover);
        } else if (portfolio.images && Array.isArray(portfolio.images) && portfolio.images.length > 0) {
            folderName = path.dirname(portfolio.images[0]);
        } else {
             // Jika folder belum ada sama sekali, buat nama folder baru
             const sanitizedNama = portfolio.namaSekolah.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
             folderName = `${sanitizedNama}_${portfolio.tahun}_${Date.now()}`;
        }

        // Pastikan path folder fisik terbentuk
        const folderPath = path.join(__dirname, '..', 'uploads', folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const updateData = { ...req.body }; 

        // --- 2. LOGIKA UPDATE PDF (HAPUS BERSIH DULU) ---
        if (req.files && req.files.pdf) {
            const newPdfFile = req.files.pdf[0];
            tempFiles.push(newPdfFile.path); // Catat untuk cleanup temp

            // A. HAPUS SEMUA FILE LAMA TERKAIT PDF DI FOLDER INI
            // Kita baca isi folder dan hapus semua 'page-*.jpg' dan file '.pdf'
            if (fs.existsSync(folderPath)) {
                const filesInDir = fs.readdirSync(folderPath);
                filesInDir.forEach(file => {
                    const fullPath = path.join(folderPath, file);
                    // Hapus jika: file dimulai dengan 'page-' (gambar hasil convert) ATAU akhiran .pdf
                    // TAPI: Jangan hapus file Cover (kecuali covernya juga mau diganti di blok bawah)
                    if (file.startsWith('page-') || file.toLowerCase().endsWith('.pdf')) {
                        try { fs.unlinkSync(fullPath); } catch(e) { console.log("Gagal hapus sisa file:", e.message); }
                    }
                });
            }

            // B. Sanitasi & Pindahkan PDF Baru
            const originalPdfName = newPdfFile.originalname;
            const sanitizedPdfName = originalPdfName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '');
            const newPdfPath = path.join(folderPath, sanitizedPdfName);

            fs.renameSync(newPdfFile.path, newPdfPath);
            
            // C. Konversi PDF Baru ke JPG
            // Karena folder sudah bersih dari 'page-*.jpg' lama, hasil ini pasti murni baru
            const imageFiles = await convertPdfToJpg(newPdfPath, folderPath);
            
            // D. Hapus PDF master setelah convert (opsional, sesuai logic Anda)
            if (fs.existsSync(newPdfPath)) {
                try { fs.unlinkSync(newPdfPath); } catch(e) {}
            }

            // E. Update data di DB
            updateData.images = imageFiles.map(img => path.join(folderName, img).replace(/\\/g, "/"));
        }


        // --- 3. LOGIKA UPDATE COVER ---
        if (req.files && req.files.cover) {
            const newCoverFile = req.files.cover[0];
            tempFiles.push(newCoverFile.path);

            // A. Hapus cover LAMA spesifik (jika ada di DB)
            if (portfolio.cover) {
                const oldCoverPath = path.join(__dirname, '..', 'uploads', portfolio.cover);
                if (fs.existsSync(oldCoverPath)) {
                    try { fs.unlinkSync(oldCoverPath); } catch(e) {}
                }
            }

            // B. Sanitasi & Simpan Cover Baru
            const originalName = newCoverFile.originalname;
            const sanitizedName = originalName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '');
            const newCoverPath = path.join(folderPath, sanitizedName);

            fs.renameSync(newCoverFile.path, newCoverPath);
            
            updateData.cover = path.join(folderName, sanitizedName).replace(/\\/g, "/");
        }

        // --- 4. LOGIKA PASSWORD ---
        const { password, removePassword } = req.body;
        
        if (removePassword === true || removePassword === 'true') {
            updateData.password = null; 
        } 
        else if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        } 
        else {
            delete updateData.password;
        }

        // --- 5. SIMPAN KE DATABASE ---
        await portfolio.update(updateData);
        
        // Ambil data terbaru
        const updatedPortfolio = await Portfolio.findByPk(req.params.id);
        const responseData = updatedPortfolio.toJSON();
        delete responseData.password;

        res.status(200).json(responseData);

    } catch (err) {
        console.error('Error updating portfolio:', err);
        // Cleanup temp files jika error
        tempFiles.forEach(filePath => {
            if (fs.existsSync(filePath)) {
                try { fs.unlinkSync(filePath); } catch(e) {}
            }
        });
        res.status(500).json({ error: 'Failed to update portfolio' });
    }
};

// DELETE PORTFOLIO BY ID
exports.deletePortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findByPk(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ error: 'Portfolio not found' });
        }

        // 1. Hapus folder file dari server
        const folderName = path.dirname(portfolio.cover);
        const folderPath = path.join(__dirname, '..', 'uploads', folderName);

        if (fs.existsSync(folderPath)) {
            fs.rmSync(folderPath, { recursive: true, force: true });
        }

        // 2. Hapus data dari database
        await portfolio.destroy();

        res.status(200).json({ message: 'Portfolio deleted successfully' });

    } catch (err) {
        console.error('Error deleting portfolio:', err);
        res.status(500).json({ error: 'Failed to delete portfolio' });
    }
};
