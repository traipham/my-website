// Using this alongside GridFS, maybe not needed

const multer =require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

const storage = new GridFsStorage(
    {
        url: process.env.DB,
        options: {useNewUrlParser: true, useUnifiedTopology: true},
        file: (req,file) => {
            const match = ["image/png", "image/jpeg"];

            if (match.indexOf(file.mimetype) === -1) {
                const filename = `${Date.now()}-some-name-${file.originalname}`;
            }
            return {
                bucketName: "photos",
                filename: `${Date.now()}-some-name-${fileoriginalname}`
            }
        }
    }
)
const upload = multer({storage});

module.exports = upload;
