// routes/uploadRoute.js
const express = require('express');
const multiparty = require('multiparty');
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const fs = require('fs');
const mime = require('mime-types');
const router = express.Router();

const bucketName = 'hikeko-web-admin';

// Upload endpoint
router.post('/api/upload', async (req, res) => {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });

    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });

    const links = [];
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop();
        const newFileName = `${Date.now()}.${ext}`;
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFileName,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mime.lookup(file.path),
        }));
        const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
        links.push(link);
    }

    return res.json({ links });
});

module.exports = router;
