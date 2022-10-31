const fs = require("fs");
const path = require("path");
const { stdin } = require("process");
const output = fs.createWriteStream(path.resolve(__dirname, "text.txt"), "utf-8");


console.log("Enter text:");

process.on("SIGINT", () => {
  process.stdout.write("good by");
  process.exit();
});

process.stdin.on("data", data => {
  const dataStringified = data.toString();
  dataStringified.replace(/^ +/, "");
  if (dataStringified.includes("exit")) {
    process.stdout.write("good by");
    process.exit();
  } else {
    output.write(data);
  }
});

