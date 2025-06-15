const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const admin = require('firebase-admin');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const firestore = admin.firestore();
const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/deleteMedia', async (req, res) => {
  const { public_id, type } = req.body; 
  if (!public_id) {
    return res.status(400).json({ error: 'Missing media identifier' });
  }
  try {
    await cloudinary.uploader.destroy(public_id, {
      resource_type: type || 'image'
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ 
      error: 'Media deletion failed',
      details: error.message
    });
  }
});

app.post('/deleteCapsule', async (req, res) => {
  const { userId, capsuleId } = req.body;
  if (!userId || !capsuleId) {
    return res.status(400).json({ error: 'Invalid request parameters' });
  }
  try {
    const docPath = `users/${userId}/capsules/${capsuleId}`;
    await firestore.doc(docPath).delete();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      error: 'Capsule deletion failed',
      details: error.message
    });
  }
});



const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server operational on port ${port}`);
});