const https = require('https');

https.get('https://chemburproperties.com/', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Look for any jpg/png links
    const matches = data.match(/https:\/\/[^"'\s]+\.(jpg|jpeg|png)/g);
    if(matches) {
      console.log([...new Set(matches)].slice(0, 30).join('\n'));
    } else {
      console.log("No images found");
    }
  });
}).on('error', err => console.log(err.message));
