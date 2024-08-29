import multer from "multer";
import path from "path";

const songStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.originalname.includes(".mp3")) {
      let songDirPath = path.join(__dirname, "../", "../", "public", "songs");
      cb(null, songDirPath);
    } else {
      let coverDirPath = path.join(__dirname, "../", "../", "public", "covers");
      cb(null, coverDirPath);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    if (file.originalname.includes(".mp3")) {
      let fname = file.fieldname + "-" + uniqueSuffix + ".mp3";
      cb(null, fname);
    } else {
      let fname = file.fieldname + "-" + uniqueSuffix + ".png";
      cb(null, fname);
    }
  },
});

export const uploadSong = multer({ storage: songStorage });
