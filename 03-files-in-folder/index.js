const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "/", "secret-folder");


fs.readdir(dir, function (err, files) {
  files.forEach(file => {
    let fullDir = path.join(dir,file);
    
    fs.stat(fullDir, (err, stats) => {
      if (stats.size > 0) {
        let output = "";
        output += path.basename(fullDir, path.extname(fullDir));
        output += " - " + path.extname(fullDir).slice(1);
        output += " - " + stats.size;
        console.log(output);
      }
    });
  });
}
);
 