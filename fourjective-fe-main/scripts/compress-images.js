const sharp = require("sharp");
const { glob } = require("glob");
const fs = require("fs");
const path = require("path");

async function compressImages() {
  console.log("🔍 Mencari gambar untuk di-compress...\n");

  // Cari semua file gambar di public/images
  const imageFiles = await glob("public/images/**/*.{jpg,jpeg,png}", {
    ignore: ["**/*-optimized.*", "**/node_modules/**"],
  });

  console.log(`📦 Ditemukan ${imageFiles.length} gambar\n`);

  let totalOriginalSize = 0;
  let totalCompressedSize = 0;
  let processedCount = 0;
  let skippedCount = 0;
  const maxFileSize = 100 * 1024; // 100KB in bytes - Target all images under 100KB
  const skipThreshold = 50 * 1024; // 50KB - files already very small

  for (const filePath of imageFiles) {
    try {
      const originalStats = fs.statSync(filePath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;

      // Skip files smaller than 50KB - already very small
      if (originalSize < skipThreshold) {
        console.log(
          `⏭️  ${filePath} (${(originalSize / 1024).toFixed(2)} KB) - Skip, sudah sangat kecil`,
        );
        totalCompressedSize += originalSize; // Count as-is
        skippedCount++;
        continue;
      }

      const parsedPath = path.parse(filePath);
      const outputPath = path.join(
        parsedPath.dir,
        `${parsedPath.name}-optimized${parsedPath.ext}`,
      );

      // Determine optimal settings - AGGRESSIVE to reach < 100KB
      let quality = 45;
      let maxWidth = 1400;

      if (originalSize > 5 * 1024 * 1024) {
        // > 5MB: Extreme compression
        quality = 35;
        maxWidth = 1200;
      } else if (originalSize > 2 * 1024 * 1024) {
        // > 2MB: Very aggressive
        quality = 40;
        maxWidth = 1300;
      } else if (originalSize > 1 * 1024 * 1024) {
        // > 1MB: Aggressive
        quality = 45;
        maxWidth = 1400;
      } else if (originalSize > 500 * 1024) {
        // > 500KB: Moderate aggressive
        quality = 50;
        maxWidth = 1500;
      } else if (originalSize > 200 * 1024) {
        // > 200KB: Light aggressive
        quality = 55;
        maxWidth = 1600;
      } else {
        // 50KB - 200KB: Gentle compression
        quality = 60;
        maxWidth = 1800;
      }

      // First attempt
      let compressedSize = maxFileSize + 1;
      let attempts = 0;

      while (compressedSize > maxFileSize && attempts < 10) {
        await sharp(filePath)
          .resize(maxWidth, maxWidth, {
            fit: "inside",
            withoutEnlargement: true,
          })
          .jpeg({ quality: quality, progressive: true, mozjpeg: true })
          .png({ quality: quality, compressionLevel: 9, effort: 10 })
          .webp({ quality: quality - 10, effort: 6 })
          .toFile(outputPath);

        const stats = fs.statSync(outputPath);
        compressedSize = stats.size;

        if (compressedSize > maxFileSize) {
          // If still too large, reduce quality and size more aggressively
          quality -= 4;
          maxWidth -= 100;
          attempts++;
          fs.unlinkSync(outputPath); // Delete and retry
        }
      }

      const compressedStats = fs.statSync(outputPath);
      const finalSize = compressedStats.size;
      totalCompressedSize += finalSize;

      const savedPercentage = (
        ((originalSize - finalSize) / originalSize) *
        100
      ).toFixed(2);

      const sizeWarning = finalSize > maxFileSize ? " ⚠️  MASIH > 100KB!" : "";

      console.log(`✅ ${filePath}${sizeWarning}`);
      console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
      console.log(`   Compressed: ${(finalSize / 1024).toFixed(2)} KB`);
      console.log(`   Quality used: ${quality}%`);
      console.log(`   Max width: ${maxWidth}px`);
      console.log(`   Attempts: ${attempts + 1}`);
      console.log(`   Saved: ${savedPercentage}%\n`);

      processedCount++;
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  console.log("\n📊 Summary:");
  console.log(`✅ Processed: ${processedCount} images`);
  console.log(`⏭️  Skipped: ${skippedCount} images (< 50KB)`);
  console.log(
    `📦 Total Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`,
  );
  console.log(
    `📦 Total Compressed Size: ${(totalCompressedSize / 1024 / 1024).toFixed(2)} MB`,
  );
  console.log(
    `💾 Total Saved: ${(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100).toFixed(2)}%`,
  );
  console.log(
    `💾 Space Saved: ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(2)} MB\n`,
  );
}

compressImages().catch(console.error);
