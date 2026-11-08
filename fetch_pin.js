const https = require("https");
const fs = require("fs");

const url = "https://www.pinterest.com/arpanmunshi291/de-ups/?invite_code=16863c09ecde4f73b86050dec74854bf&sender=735212845326775238";

https.get(url, {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
  }
}, (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    fs.writeFileSync("pinterest_dump.html", data);
    console.log("Saved dump, size:", data.length);
    const pinimg = data.match(/https:\/\/[^"'\s<>]*pinimg\.com\/[^"'\s<>]*\.(?:jpg|png|webp)/g);
    if (pinimg) {
      const unique = Array.from(new Set(pinimg));
      console.log("Found pinimg urls:", unique.length);
      console.log(unique.slice(0, 15));
    } else {
      console.log("No pinimg urls found in HTML");
    }
  });
}).on("error", console.error);

