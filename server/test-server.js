const http = require('http');
const port = 5002;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, pid: process.pid }));
});
server.listen(port, '0.0.0.0', () => {
  console.log(`test-server listening on ${port}`);
});
server.on('error', (err) => {
  console.error('test-server error', err);
  process.exit(1);
});
