// const multer = require('multer');

// // >>>>>>> image uploads with multer <<<<<<<<<<
// const storage = multer.diskStorage({
//     destination : (req, file, cb) =>{
//         cb(null, "../Uploads"); 
//     },
//     filename : (req, file, cb) => {
//         const filename = `image-${Date.now()}.${file.originalname}`;
//         cb(null, filename);
//     }
// });
// const upload = multer({storage : storage});

// module.exports = upload;