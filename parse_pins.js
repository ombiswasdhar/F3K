const fs = require("fs");
const path = require("path");
const https = require("https");

const html = fs.readFileSync("pinterest_dump.html", "utf8");

// Pinterest embeds JSON state inside <script id="__PWS_DATA__" type="application/json">
let pins = [];
const pwsMatch = html.match(/<script id="__PWS_DATA__"[^>]*>([\s\S]*?)<\/script>/);

if (pwsMatch) {
  try {
    const data = JSON.parse(pwsMatch[1]);
    console.log("PWS_DATA keys:", Object.keys(data));
    
    // Search recursively for pin objects with images
    function findPins(obj) {
      if (!obj || typeof obj !== "object") return;
      if (obj.images && (obj.images["orig"] || obj.images["736x"] || obj.images["474x"])) {
        const img = obj.images["orig"]?.url || obj.images["736x"]?.url || obj.images["474x"]?.url;
        pins.push({
          id: obj.id,
          title: obj.title || obj.grid_title || obj.description || "T-Shirt",
          description: obj.description || "",
          imageUrl: img
        });
      }
      for (const k of Object.keys(obj)) {
        findPins(obj[k]);
      }
    }
    findPins(data);
  } catch (e) {
    console.error("JSON parse error", e);
  }
}

// Fallback: extract from raw regex if pins array is small
if (pins.length === 0) {
  const origs = html.match(/https:\/\/i\.pinimg\.com\/originals\/[a-f0-9\/]+\.(?:jpg|png|webp)/g) || [];
  const uniqueOrigs = Array.from(new Set(origs));
  uniqueOrigs.forEach((url, i) => {
    pins.push({
      id: `pin_${i+1}`,
      title: `T-Shirt ${i+1}`,
      imageUrl: url
    });
  });
}

// Remove duplicates by image URL
const seen = new Set();
pins = pins.filter(p => {
  if (seen.has(p.imageUrl)) return false;
  seen.add(p.imageUrl);
  return true;
});

console.log("Total unique pins found:", pins.length);
pins.forEach((p, idx) => console.log(`${idx + 1}. [${p.id}] ${p.title} -> ${p.imageUrl}`));

fs.writeFileSync("pins_extracted.json", JSON.stringify(pins, null, 2));

