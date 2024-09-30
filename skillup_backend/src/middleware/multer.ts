// import multer from "multer";
// import { v4 as uuid } from "uuid";
// import { rm } from "fs";
// import path from "path";

// // Disk storage to save images locally
// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, "uploads"); // The directory where files are stored
//   },
//   filename(req, file, callback) {
//     const id = uuid(); // Generate a unique ID for the file
//     const ext = file.originalname.split(".").pop(); // Extract the file extension
//     callback(null, `${id}.${ext}`); // Set the new file name as unique ID + extension
//   },
// });

// // Single file upload with field name 'photo'
// export const SingleUpload = multer({ storage }).single("photo");





import multer from "multer";
import { v4 as uuid } from "uuid";

// diskStorage are store in hardDisk memory
const storage = multer.diskStorage({

  //  which  folder you have upload set path or folder name to upload images 
  destination(req, file, callback) {
    //  first parameter is error message throw , second parameter is folder name
    callback(null, "uploads");
  },

  //  this function will be called after file is uploaded and saved to disk
  filename(req, file, callback) {
    // generate unique id 
    const id = uuid();

    //  split the array last element deleted 
    const ext = file.originalname.split(".").pop();
    console.log("ext", ext);
    callback(null, `${id}.${ext}`);
  }
});

//   multer is called function and inside store a object store storage data and only can 
//     upload Single photo 
export const SingleUpload = multer({ storage }).single("photo");


