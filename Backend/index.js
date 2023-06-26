const express = require('express');
const app = express();
const cors =require('cors')
const multer = require('multer');
const sharp = require('sharp');

app.use(
    cors({
      origin: 'http://127.0.0.1:5500',
      optionsSuccessStatus: 200,
    })
  );

app.use(express.json()); // Parse JSON request bodies
const upload = multer({ dest: 'uploads/' });

app.post('/analyze', upload.single('image') , (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    const imagePath = req.file.path;
    
      sharp(imagePath)
        .resize(1, 10)
        .toBuffer({ resolveWithObject: true })
        .then(({ data }) => {
            const colors = {
                'URO': [data[0], data[1], data[2]],
                'BIL': [data[4], data[5], data[6]],
                'KET': [data[8], data[9], data[10]],
                'BLD': [data[12], data[13], data[14]],
                'PRO': [data[16], data[17], data[18]],
                'NIT': [data[20], data[21], data[22]],
                'LEU': [data[24], data[25], data[26]],
                'GLU': [data[28], data[29], data[30]],
                'SG': [data[32], data[33], data[34]],
                'PH': [data[36], data[37], data[38]]
              };
            res.json(colors);
        })
        .catch((error) => {
          console.error('Image processing error:', error);
          res.status(500).json({ error: 'Failed to process the image' });
        });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
