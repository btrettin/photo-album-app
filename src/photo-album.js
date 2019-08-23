const request = require('request');

const photoAlbum = id => {
  id < 100 && id > 0
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

module.exports = photoAlbum;
