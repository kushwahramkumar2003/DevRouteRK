import fs from "fs";
import path from "path";

const fileRemover = (filename) => {
  fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.log(`File ${filename} doesn't exist, won't remove it`);
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error(`Error occurred while trying to remove file ${filename}`);
    } else {
      console.log(`File ${filename} removed`);
    }
  });
};

export default fileRemover;
