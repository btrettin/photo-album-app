const request = require('request');

const errMsg = 'Argument must be an int from 1-100. Ex: node photo-album 43';

const isInt = str => /^\d+$/.test(str);

const photoAlbum = id => {
  isInt(id) && id > 0 && id < 101
    ? request.get(
        'https://jsonplaceholder.typicode.com/photos?albumId=' +
          process.argv[2],
        (err, res, body) =>
          JSON.parse(body).forEach(photo =>
            console.log(`[${photo.id}] ${photo.title}`)
          )
      )
    : console.log(errMsg);
};

module.exports = { photoAlbum, isInt };
