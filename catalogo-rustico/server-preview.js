// Servidor local para preview-publicaciones.html
// Necesario para que la descarga de imágenes con diseño funcione correctamente.
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 8181;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.gif':  'image/gif',
  '.js':   'application/javascript',
  '.css':  'text/css',
};

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/preview-publicaciones.html';

  const filePath = path.join(__dirname, decodeURIComponent(urlPath));

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Archivo no encontrado: ' + urlPath);
      return;
    }
    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}).listen(PORT, '127.0.0.1', () => {
  console.log('');
  console.log('  ✓ Servidor iniciado correctamente');
  console.log('');
  console.log('  Abrí este link en Chrome o Edge:');
  console.log('  http://localhost:' + PORT + '/preview-publicaciones.html');
  console.log('');
  console.log('  (Cerrá esta ventana para apagar el servidor)');
  console.log('');
});
