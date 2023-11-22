import { createRequire } from "module";
const require = createRequire(import.meta.url);
require('dotenv').config()
const fs = require('fs')

import { MyGame } from "#root/classes/MyGame.js";

const hostname = '127.0.0.1'
const port = 8080

require('http').createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'})

  fs.readFile('./index.html', null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write('Whoops! File not found!');
    } else {
      res.write(data);

      new MyGame(1280,60,16,[
        'TileSet.png'
    ])
    }
    res.end();
});



}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})