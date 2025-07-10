function errors500handlers(err, req, res, next){
    res.status(500)
    res.json({
        error: err.message,
    })
}

module.exports = errors500handlers