const fs = require("fs");
const path = require("path");
const https = require("https");

const pins = JSON.parse(fs.readFileSync("pins_extracted.json", "utf8"));
const outDir = path.join(__dirname, "public", "products", "pinterest");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(outDir, filename);
    const file = fs.createWriteStream(filePath);
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`Downloaded ${filename}`);
          resolve(filePath);
        });
      } else {
        file.close();
        fs.unlink(filePath, () => {});
        console.error(`Failed ${filename}: HTTP ${res.statusCode}`);
        resolve(null);
      }
    }).on("error", (err) => {
      file.close();
      fs.unlink(filePath, () => {});
      console.error(`Error ${filename}:`, err.message);
      resolve(null);
    });
  });
}

async function main() {
  console.log(`Starting download of ${pins.length} pins...`);
  for (let i = 0; i < pins.length; i++) {
    const ext = path.extname(pins[i].imageUrl) || ".jpg";
    const filename = `f3k_tee_${i + 1}${ext}`;
    await downloadImage(pins[i].imageUrl, filename);
  }
  console.log("Download complete!");
}

main();

