import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads/"

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true})
        }
        cb(null, dir);
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

export default upload;


// import multer from 'multer';
// import path from 'path';
// import fs from 'fs'; // Importe o fs

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const dir = 'src/uploads/';
        
//         // Se a pasta não existir, o Node cria ela na hora!
//         if (!fs.existsSync(dir)) {
//             fs.mkdirSync(dir, { recursive: true });
//         }
        
//         cb(null, dir);
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });
// export default upload;