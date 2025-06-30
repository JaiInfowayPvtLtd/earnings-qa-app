const http = require('http');
const fs = require('fs');
const url = require('url');

// Load JSON data once
const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname.toLowerCase();

  res.setHeader('Content-Type', 'application/json');

  // GET /calls => return all calls
  if (req.method === 'GET' && path === '/calls') {
    res.writeHead(200);
    res.end(JSON.stringify(data));
  }

  // GET /calls/:company
  else if (req.method === 'GET' && path.startsWith('/calls/')) {
    const companyName = decodeURIComponent(path.replace('/calls/', '')).toLowerCase();
    const match = data.find(c => c.company.toLowerCase().includes(companyName));

    if (match) {
      res.writeHead(200);
      res.end(JSON.stringify(match));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'Company not found' }));
    }
  }

  // Fallback
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});