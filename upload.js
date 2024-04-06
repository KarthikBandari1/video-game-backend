const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dgezygfi4', 
  api_key: '887218746465357', 
  api_secret: 'z_9oeh65Yz2yi8qRPOeEsObi-oQ' 
});

const images = [
//   './images/acw-white.png',
//   './images/engineer-white.png',
//   './images/m9-white.png',
//   './images/soldier__level.png',
//   './images/soldier__tank-white.png',
  './images/soldier__dogtags (1).png',
  './images/soldier__pic.png'
];

(async function run() {
  for ( const image of images ) {
    const result = await cloudinary.uploader.upload(image);
    console.log(`Successfully uploaded ${image}`);
    console.log(`> Result: ${result.secure_url}`);
  }
})()
 
