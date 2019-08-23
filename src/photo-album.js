const request = require('request');

const isInt = str => true;

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
    : console.log('invalid argument');
};

module.exports = { photoAlbum, isInt };
