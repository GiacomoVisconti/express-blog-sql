function error404handler(req, res, next){
    res.status(404)
    res.json({
        error: 'Not found',
        message: 'Pagina non trovata'
    })
}

module.exports = error404handler