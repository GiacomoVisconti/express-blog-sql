//Import connections methods
// const posts = require('../data/db')
const connection = require('../data/db')

//Create the functions for the CRUD operations
function index(req, res) {

    //Save the query string into a variable
   const sql = 'SELECT * FROM posts'
    
    
    connection.query(sql, (err, results) => {
        if(err){
            return res.status(500).json({
                error: 'Database query failed'
            })
        }
        console.log(results);
        
        res.json(results)
    })
    
}


function show(req, res) {
    const id = parseInt(req.params.id) ;

    //Save the query string into a variable and use the sql injection protection
    const sql = 'SELECT * FROM posts WHERE id = ?'
    
    connection.query(sql, [id], (err, results) => {
        if(err){
            return res.status(500).json({
                error: 'Database query failed'
            })
        }
        if(!results.length > 0){
            return res.status(404).json({
                error: 'true',
                message: 'Record not found'
            })
        }
        console.log(results);
        
        res.json(results)
    })

}


function destroy(req, res) {
    const id = parseInt(req.params.id) ;

    //Save the query string into a variable and use the sql injection protection
    const sql = 'DELETE FROM posts WHERE id = ?'
    
    connection.query(sql, [id], (err, results) => {
        if(err){
            console.log(err);
            
            return res.status(500).json({
                error: 'Database query failed'
            })
        }

        console.log(results);
        
        res.status(204).json({
            message: 'Record removed successfully'
        })
        
    })
}


function store(req, res) {
    const {title, content, image} = req.body
    const sql = "INSERT INTO boolean_db_posts.posts (title, content, image) VALUES (?, ?, ?)"
    
    connection.query(sql, [title, content, image], (err, results) => {
        if(err){
            console.log(err);
            
            return res.status(500).json({
                error: 'Database query failed'
            })
        }

        console.log(results);
        
        res.status(204).json({
            message: 'Record added successfully'
        })
        
    })
    
}


function update(req, res) {
    const id = parseInt(req.params.id) ;

    console.log(posts);
    
    //finding the post with the specified ID
    const post = posts.find( post => post.id === id)

    //If the post is not found, return a 404 error
    if(!post){
        res.status(404)
        return res.json({
            error: 'True',
            message:`The post with ID: ${id} is not present`
        })
    }

    //If the post is found, update the post with the data from the request body
    post.title = req.body.title
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags
    res.status(201).send('Elemento modificato correttamente')
    console.log(posts, post);
    
    
}


function modify(req, res) {
    const id = req.params.id;
    res.send(`Il post con ID: ${id} è stato modificato`)
}

// Exporting the functions to be used in the routes
module.exports = {index, show, destroy, store, update, modify}