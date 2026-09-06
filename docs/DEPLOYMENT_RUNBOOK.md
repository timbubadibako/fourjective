# 🚀 Deployment & Operations Runbook — Fourjective

Panduan teknis penyebaran (*deployment*) dan pengoperasian server untuk Fourjective.

---

## 1. Requirement Server & Dependency System

### 1.1 Kebutuhan Lingkungan Server (VPS / Linux Server)
* **OS**: Ubuntu 22.04 / 24.04 LTS (atau Debian-based Linux)
* **Node.js**: `v20.x` LTS atau `v24.x` LTS
* **Package Manager**: `npm` (v10 / v11)
* **Process Manager**: `PM2` (Global)
* **Web Server**: `Nginx` (Reverse Proxy & SSL Termination)
* **System Utility (Wajib)**: `poppler-utils` (`pdftoppm`)

---

### 1.2 Instalasi System Packages

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Poppler Utilities (Diperlukan Backend untuk konversi PDF ke JPG)
sudo apt install -y poppler-utils ffmpeg

# Install PM2 & Nginx
sudo npm install -g pm2
sudo apt install -y nginx certbot python3-certbot-nginx
```

---

## 2. Setup Backend Deployment (`fourjective-be-main`)

1. Clone repositori ke server `/var/www/fourjective`:
   ```bash
   git clone https://github.com/timbubadibako/fourjective.git /var/www/fourjective
   cd /var/www/fourjective/fourjective-be-main
   ```

2. Install dependensi:
   ```bash
   npm install --production
   ```

3. Buat file `.env` produksi:
   ```env
   PORT=5000
   DB_DIALECT=mysql
   DB_HOST=127.0.0.1
   DB_USER=fourjective_usr
   DB_PASSWORD=SecurePassword_2026!
   DB_NAME=fourjective_prod
   DB_PORT=3306
   JWT_SECRET=production_super_jwt_secret_key_change_me!
   ```

4. Jalankan backend via PM2:
   ```bash
   pm2 start server.js --name "fourjective-be"
   pm2 save
   pm2 startup
   ```

---

## 3. Setup Frontend Deployment (`fourjective-fe-main`)

1. Masuk ke direktori frontend:
   ```bash
   cd /var/www/fourjective/fourjective-fe-main
   ```

2. Buat file `.env.local`:
   ```env
   NEXT_PUBLIC_BACKEND_URL=https://api.fourjectiv.com
   ```

3. Install & Build Next.js:
   ```bash
   npm install
   npm run build
   ```

4. Jalankan Next.js via PM2:
   ```bash
   pm2 start npm --name "fourjective-fe" -- start
   pm2 save
   ```

---

## 4. Konfigurasi Nginx Reverse Proxy

Buat file konfigurasi `/etc/nginx/sites-available/fourjective`:

```nginx
# Frontend Next.js (fourjectiv.com)
server {
    server_name fourjectiv.com www.fourjectiv.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend Express API (api.fourjectiv.com)
server {
    server_name api.fourjectiv.com;

    client_max_body_size 300M; # Mengizinkan upload PDF/Cover besar

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Aktifkan konfigurasi dan SSL via Certbot:
```bash
sudo ln -s /etc/nginx/sites-available/fourjective /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d fourjectiv.com -d www.fourjectiv.com -d api.fourjectiv.com
```
