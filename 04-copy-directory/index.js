const fs = require("fs");
const path = require("path");
const dest = path.join(__dirname, "/", "files-copy");
const src = path.join(__dirname, "/", "files");

// create destination folder
fs.mkdir(dest, {recursive : true}, (err) => {}); 

fs.readdir(dest, function (err, files) {
  // clear destination folder
  files.forEach(file => {
    fs.unlink(path.join(dest, file), err => {});
  });
  fs.readdir(src, function (err, files) {
    // copy files
    files.forEach(file => {
      fs.copyFile(path.join(src, file), path.join(dest, file), err => {
        if (err) {console.log("err = "+err)}
      });
    }); 
  });
});

