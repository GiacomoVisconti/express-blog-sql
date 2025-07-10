

function checkToken(req, res, next){

    if (!req.headers.token || req.headers.token !== process.env.token){

        res.status(401).json({
            error: true,
            message: "You don't have the permission to do this operations"
        })
    }
    
    // if(req.headers.token !== process.env.token){
    //     res.status(401).json({
    //         error: true,
    //         message: "You don't have the permission to do this operations"
    //     })
    // }

    next()
}

module.exports = checkToken