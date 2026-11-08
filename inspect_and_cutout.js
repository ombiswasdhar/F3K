const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inDir = path.join(__dirname, "public", "products", "pinterest");
const files = fs.readdirSync(inDir).filter(f => !f.includes("_nobg"));

console.log("Found files to inspect:", files.length);

async function processImage(file) {
  const filePath = path.join(inDir, file);
  const metadata = await sharp(filePath).metadata();
  console.log(`${file}: ${metadata.width}x${metadata.height}, format: ${metadata.format}, hasAlpha: ${metadata.hasAlpha}`);
  
  // If PNG and already has alpha channel, check corner pixels
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  // Sample corner pixel (0,0)
  const r0 = data[0];
  const g0 = data[1];
  const b0 = data[2];
  const a0 = data[3];
  
  // If corner is already transparent or whitish/greyish, we can make it transparent
  const isSolid = (r, g, b, a) => {
    // Check if close to corner background
    const diff = Math.abs(r - r0) + Math.abs(g - g0) + Math.abs(b - b0);
    return diff < 45 || (r > 240 && g > 240 && b > 240);
  };
  
  const outBuf = Buffer.from(data);
  for (let i = 0; i < outBuf.length; i += 4) {
    const r = outBuf[i];
    const g = outBuf[i+1];
    const b = outBuf[i+2];
    if (isSolid(r, g, b, outBuf[i+3])) {
      outBuf[i+3] = 0; // make transparent
    }
  }
  
  const outName = file.replace(/\.[^.]+$/, "") + "_nobg.png";
  const outPath = path.join(inDir, outName);
  await sharp(outBuf, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(outPath);
  console.log(`Saved transparent cutout: ${outName}`);
}

async function run() {
  for (const f of files) {
    try {
      await processImage(f);
    } catch (e) {
      console.error("Failed on", f, e.message);
    }
  }
  console.log("All cutouts processed!");
}

run();

