const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

async function checkLargeFiles() {
  console.log("🔍 Mencari file > 100KB...\n");

  const imageFiles = await glob("public/images/**/*.{jpg,jpeg,png,webp,avif}", {
    ignore: ["**/node_modules/**"],
  });

  const maxSize = 100 * 1024; // 100KB
  let largeFiles = [];
  let totalSize = 0;

  for (const filePath of imageFiles) {
    const stats = fs.statSync(filePath);
    const size = stats.size;
    totalSize += size;

    if (size > maxSize) {
      largeFiles.push({
        path: filePath,
        size: size,
        sizeKB: (size / 1024).toFixed(2),
        sizeMB: (size / 1024 / 1024).toFixed(2),
      });
    }
  }

  console.log(`📊 Total files checked: ${imageFiles.length}`);
  console.log(`📦 Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`⚠️  Large files (> 100KB): ${largeFiles.length}\n`);

  if (largeFiles.length > 0) {
    console.log("⚠️  Files that need more compression:\n");

    // Sort by size descending
    largeFiles.sort((a, b) => b.size - a.size);

    largeFiles.forEach((file, index) => {
      console.log(`${index + 1}. ${file.path}`);
      console.log(`   Size: ${file.sizeKB} KB (${file.sizeMB} MB)`);
      console.log(
        `   Excess: ${((file.size - maxSize) / 1024).toFixed(2)} KB over limit\n`,
      );
    });

    console.log("\n💡 Recommendation:");
    console.log("Run: pnpm compress-images");
    console.log("Or manually compress these files with lower quality.\n");
  } else {
    console.log("✅ All files are under 100KB! Excellent!\n");
  }

  // Average file size
  const avgSize = totalSize / imageFiles.length;
  console.log(`📈 Average file size: ${(avgSize / 1024).toFixed(2)} KB`);

  // Size distribution
  const sizeRanges = {
    "< 100KB": 0,
    "100-200KB": 0,
    "200-300KB": 0,
    "300-400KB": 0,
    "400-500KB": 0,
    "> 500KB": 0,
  };

  imageFiles.forEach((filePath) => {
    const size = fs.statSync(filePath).size;
    const sizeKB = size / 1024;

    if (sizeKB < 100) sizeRanges["< 100KB"]++;
    else if (sizeKB < 200) sizeRanges["100-200KB"]++;
    else if (sizeKB < 300) sizeRanges["200-300KB"]++;
    else if (sizeKB < 400) sizeRanges["300-400KB"]++;
    else if (sizeKB < 500) sizeRanges["400-500KB"]++;
    else sizeRanges["> 500KB"]++;
  });

  console.log("\n📊 Size Distribution:");
  Object.entries(sizeRanges).forEach(([range, count]) => {
    const percentage = ((count / imageFiles.length) * 100).toFixed(1);
    const marker = range !== "< 100KB" ? " ⚠️" : " ✅";
    console.log(`   ${range}: ${count} files (${percentage}%)${marker}`);
  });
}

checkLargeFiles().catch(console.error);
