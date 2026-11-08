const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function run() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--window-size=1440,1080',
    'http://localhost:3000'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const tabs = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9223/json', res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });

  const pageTab = tabs.find(t => t.type === 'page' && t.url.includes('localhost:3000'));
  if (!pageTab) {
    console.error('No page tab found');
    chrome.kill();
    return;
  }

  const WebSocket = require('ws');
  // If ws isn't available, we can use built-in or simple CDP HTTP evaluation
}
run();

