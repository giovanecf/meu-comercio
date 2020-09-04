const multer = require('multer');
const path = require('path');

module.exports = {
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, '..', '..', 'uploads'),
		filename: (req, file, cb) => {
			let extension = path.extname(file.originalname);
			cb(null, path.basename(file.originalname, extension)+"-"+Date.now()+""+extension);
		},
	}),
};