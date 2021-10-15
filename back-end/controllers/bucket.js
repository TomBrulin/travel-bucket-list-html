const sBucket = require('../models/Bucket');

exports.createBucket = (req, res, next) => {
    const bucket = new sBucket({...req.body})

    bucket.save().then((bucket) => {
        res.status(201).json(bucket)
    }).catch((error) => {
        res.status(400).json({error})
    })
}

exports.getAllBuckets = (req, res, next) => {
    sBucket.find()
    .then(buckets => res.status(200).json(buckets))
    .catch(error => res.status(400).json({error}))
}

exports.deleteBucket = (req, res, next) => {
    sBucket.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({
        message: "Bucket supprimé"
    })).catch(error => res.status(400).json({error}))
}