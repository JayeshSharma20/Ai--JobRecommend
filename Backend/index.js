const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();
const PORT = 5000;

// Enable CORS for frontend
app.use(cors());

// File upload config (store files in /uploads folder)
const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.send('Server is running');
});

console.log("This changes happend in second Branch.")

app.post('/upload-resume', upload.single('resume'), async (req, res) => {
    console.log("this line print:",req.file);
  try {
    const filePath = req.file.path;
    // console.log(filePath);
    const fileData = fs.readFileSync(filePath);
    // console.log(fileData);
    // Extract text using pdf-parse
    const pdfData = await pdfParse(fileData);
    console.log("this line print:",pdfData.info);
    const text = pdfData.text;
    console.log("This line print:",text);

    // Delete the uploaded file after processing (optional)
    fs.unlinkSync(filePath);

 console.log(`File uploaded at path:${filePath} successfully!`);
    return res.json({
      success: true,
      content: text
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Failed to process PDF.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
