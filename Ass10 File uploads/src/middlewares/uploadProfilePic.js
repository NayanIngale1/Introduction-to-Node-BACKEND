const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
    

        callback(null, path.join(__dirname, "../my-uploads"));
        
    // console.log('__dirname:', __dirname)
    
  },
  filename: function (req, file, callback) {
    const uniquePrefix = Date.now();
    callback(null, uniquePrefix + "-" + file.originalname);
  },
});


function fileFilter(req, file, callback) {
  // The function should call `callback` with a boolean
  // to indicate if the file should be accepted
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    // To accept the file pass `true`, like so:
    callback(null, true);
  } else {
    // To reject this file pass `false`, like so:
    callback(null, false);
  }

  // You can always pass an error if something goes wrong:
  // callback(new Error('I don\'t have a clue!'))
}


const options = {
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 1kb * 1 mb *5 = 5 mb limit
  },
};

const upload = multer(options);

module.exports = upload;
