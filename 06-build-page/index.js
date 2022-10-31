const fs = require("fs");
const path = require("path");

//source directories
const srcStyles = path.join(__dirname, "/", "styles");
const srcAssests = path.join(__dirname, "/", "assets");
const srcFonts = path.join(srcAssests, "/", "fonts");
const srcImg = path.join(srcAssests, "/", "img");
const srcSvg = path.join(srcAssests, "/", "svg");
const srcComponents = path.join(__dirname, "/", "components");

//destination directories
const dist = path.join(__dirname, "/", "project-dist");
const distAssests = path.join(dist, "/", "assets");
const distFonts = path.join(distAssests, "/", "fonts");
const distImg = path.join(distAssests, "/", "img");
const distSvg = path.join(distAssests, "/", "svg");
const outputStyles = fs.createWriteStream(path.resolve(dist, "style.css"), "utf-8");


//create main destination folder "project-dist"
fs.mkdir(dist, {recursive : true}, (err) => {}); 

//create and copy destination folder
const copyFolder = function (src, dist) {
  fs.mkdir(dist, {recursive : true}, (err) => {
    fs.readdir(dist, function (err, files) {
      // clear destination folder
      files.forEach(file => {
        fs.unlink(path.join(dist, file), err => {});
      });
      // copy files
      fs.readdir(src, function (err, files) {
        files.forEach(file => {
          fs.copyFile(path.join(src, file), path.join(dist, file), err => {
            if (err) {console.log("err = "+err)}
          });
        }); 
      });
    });
  }); 
}

//create and copy assets with sub-folders
copyFolder(srcFonts, distFonts);
copyFolder(srcImg, distImg);
copyFolder(srcSvg, distSvg);

// merge styles
fs.readdir(srcStyles, function (err, files) {
  files.forEach(file => {
    let fullDir = path.join(srcStyles,file);
    if (path.extname(file).slice(1) === "css") {
      let stream = fs.createReadStream(fullDir, "utf-8");
      stream.on("data", chunk => outputStyles.write(chunk));
    }
  });
});

// build index.html
const components = new Object;
fs.readdir(srcComponents, function (err, files) {
  // read components
  files.forEach(file => {
    let stream = fs.createReadStream(path.join(srcComponents, "/", file), "utf-8");
    stream.on("data", chunk => {
      components[path.basename(file, path.extname(file)).trim()] = chunk;
    })
  })

  
  // create readStream from template.html
  let streamHtml = fs.createReadStream(path.join(__dirname, "/", "template.html"), "utf-8");
  // read from template.html
  streamHtml.on("data", tmp => {
    let result = "";
  
    const outputHtml = fs.createWriteStream(path.resolve(dist, "index.html"), "utf-8");
    while (tmp.indexOf("}}") != -1) {
      outputHtml.write(tmp.substring(0, tmp.indexOf("{{")));
      
      result = tmp.substring(tmp.indexOf("{{")+2, tmp.indexOf("}}"));
      outputHtml.write(String(components[result]));
      
      // console.log("temp - "+tmp.substring(tmp.indexOf("{{")+2, tmp.indexOf("}}")));
      tmp = tmp.substring(tmp.indexOf("}}")+2, tmp.length);
    }
    outputHtml.write(tmp);
    // outputHtml.write(chunk);
  })
});


