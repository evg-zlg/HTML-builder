const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "/", "styles");
const dist = path.join(__dirname, "/", "project-dist");

const output = fs.createWriteStream(path.resolve(dist, "bundle.css"), "utf-8");

fs.readdir(src, function (err, files) {
  files.forEach(file => {
    let fullDir = path.join(src,file);
    if (path.extname(file).slice(1) === "css") {
      let stream = fs.createReadStream(fullDir, "utf-8");
      stream.on("data", chunk => output.write(chunk));
    }
  });
}
);