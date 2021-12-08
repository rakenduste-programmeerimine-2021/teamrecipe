var express = require('express');
var mongoose = require('mongoose');
var assert = require('assert');

exports.getRecipeImage = async (req, res) => {
    var gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: "images"
    });

    var readStream = gridfs.openDownloadStreamByName(req.params.filename)
    readStream.on('error', () => {
        res.status(404).send("Image not found!");
    })
    readStream.pipe(res)
}