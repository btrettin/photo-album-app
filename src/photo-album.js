const request = require('request');

const arg = process.argv[2];
const url = 'https://jsonplaceholder.typicode.com/photos?albumId=' + arg;
const errMsg = 'Argument must be an int from 1-100. Ex: node photo-album 43';

const isInt = str => /^\d+$/.test(str);

const photoAlbum = albumId => {
  isInt(albumId) && albumId > 0 && albumId < 101
    ? request.get(url, (err, res, body) =>
        JSON.parse(body).forEach(photo =>
          console.log(`[${photo.id}] ${photo.title}`)
        )
      )
    : console.log(errMsg);
};

photoAlbum(arg);

module.exports = { isInt, photoAlbum };
