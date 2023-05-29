const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/'); // Destination folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.array('files'), (req, res) => {
  console.log('Files uploaded successfully!');
  res.status(200).send('Files uploaded successfully!');
});

//app.use(express.static(path.join(__dirname, 'dist/coreui-free-angular-admin-template')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/coreui-free-angular-admin-template/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
