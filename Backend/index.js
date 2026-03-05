const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Add this at the top to parse JSON bodies
const upload = multer({ dest: 'uploads/' });

// Dummy user database (replace with real DB in production)
const users = [];

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/upload-resume', upload.single('resume'), async (req, res) => {
    console.log("this line print:",req.file);
  try {
    const filePath = req.file.path;
    // console.log(filePath);
    const fileData = fs.readFileSync(filePath);
    // console.log(fileData);
    const pdfData = await pdfParse(fileData);
    console.log("this line print:",pdfData.info);
    const text = pdfData.text;
    console.log("This line print:",text);
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

// Signup API
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }
  users.push({ username, password });
  return res.json({ success: true, message: 'Signup successful', user: { username } });
});

// Login API
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  return res.json({ success: true, message: 'Login successful', user: { username } });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
