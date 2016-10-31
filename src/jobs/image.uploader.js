/**
 * Created by User on 10/31/2016.
 */
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dk1chsp5h',
    api_key: '672872814841976',
    api_secret: 'TEj_snS8SOOmDRpWv3VikI2sOjs'
});



cloudinary.uploader.upload("C:/Users/User/Downloads/images/john-constantine.jpg", function(result) {
    console.log(result)
});