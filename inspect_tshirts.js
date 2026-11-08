const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inDir = path.join(__dirname, "public", "products", "pinterest");
const files = fs.readdirSync(inDir).filter(f => !f.includes("_nobg"));

async function inspect() {
  const tshirts = [];
  for (const f of files) {
    const meta = await sharp(path.join(inDir, f)).metadata();
    // T-shirts are usually at least 500px in height/width
    if (meta.width >= 400 && meta.height >= 400) {
      tshirts.push({
        file: f,
        cutoutFile: f.replace(/\.[^.]+$/, "") + "_nobg.png",
        width: meta.width,
        height: meta.height
      });
    }
  }
  console.log("Valid high-res t-shirts:", tshirts.length);
  tshirts.forEach((t, i) => console.log(`${i+1}: ${t.file} (${t.width}x${t.height})`));
  fs.writeFileSync("valid_tshirts.json", JSON.stringify(tshirts, null, 2));
}

inspect();

