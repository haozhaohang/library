const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()
const multipart = require('connect-multiparty');
var multipartMiddleware = multipart()

router.post('/upload', multipartMiddleware, function (req, res) {
    // console.log(req.body, req.files);

    const { path: filePath, originalFilename } = req.files.file
    const newPath = path.join(path.dirname(filePath), originalFilename)

    fs.rename(filePath, newPath, function (err) {
        if (err) {
            return;
        }
        else {
            const file = fs.createReadStream(newPath)
            const form = new FormData()
            form.append('file', file)

            fetch('http://localhost:8080/upload', {
                method: "POST",
                body: form
            })
        }
    })
    res.json({})
});

module.exports = router;
