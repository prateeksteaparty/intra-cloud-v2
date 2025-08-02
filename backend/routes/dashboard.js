const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const { Data } = require('../model/userSchema');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { create } = require('domain');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const region = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
});

const randomFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

router.post('/upload', upload.single('file'), async (req, res) => {
  const randomName = randomFileName();

  const params = {
    Bucket: bucketName,
    Key: randomName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype
  };

  try {
    await s3.send(new PutObjectCommand(params));

    await Data.create({
      imgName: randomName,
      originalName: req.file.originalname,
      username: req.body.username,
      size: req.file.size
    });

    res.send({ message: 'File uploaded successfully' });

  } catch (err) {
    res.status(500).send({ error: 'Failed to upload file' });
  }
});

router.get('/posts', async (req, res) => {
  const username = req.query.username;

  try {
    const posts = await Data.find({ username });

    const urls = await Promise.all(posts.map(async post => {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: post.imgName
      });

      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return {
        imgName: post.imgName,         
        originalName: post.originalName, 
        url,
        size: post.size,
        createdAt: post.createdAt
      };
    }));

    res.send(urls);

  } catch (err) {
    res.status(500).send({ error: 'Could not fetch posts' });
  }
});

router.delete('/delete', async (req, res) => {
  const { imgName, username } = req.body;

  if (!imgName || !username) {
    return res.status(400).send({ error: 'imgName and username are required' });
  }

  const deleteParams = {
    Bucket: bucketName,
    Key: imgName
  };

  try {
 
    await s3.send(new DeleteObjectCommand(deleteParams));

    
    await Data.deleteOne({ imgName, username });

    res.send({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete file' });
  }
});


module.exports = router;
