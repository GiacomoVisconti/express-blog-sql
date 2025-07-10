const posts = require('../data/db')

//Create the functions for the CRUD operations


function index(req, res) {

    let filtered_posts = posts

    //filtering posts from tags, IF is present
    if(req.query.tag){
        filtered_posts = posts.filter(element => element.tags.includes(req.query.tag))
    }
    
    //Control the filtered post
    if(filtered_posts.length === 0){
        return res.status(404).json({
            error: 'True',
            message: 'No posts found with the specified tag'
        })  
    } 
    
    res.json(filtered_posts)
    
    



    
}


function show(req, res) {
    const id = parseInt(req.params.id) ;

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

    res.json(post)
}


function destroy(req, res) {
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

    posts.splice(posts.indexOf(post), 1)
    console.log(posts);
    
    res.sendStatus(204)
}


function store(req, res) {
    
    console.log(req.body);

    //setting the ID of the new post taking the last ID of the posts array and adding 1
    const new_id = posts[posts.length - 1].id + 1
    
    //Setting the new post object with the data from the request body
    const new_object = {
        id: new_id,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,

    }
    
    //Pushing the new post object into the posts array
    posts.push(new_object)

    //Returning a 201 status code and a success message
    res.status(201).send('Elemento aggiunto correttamente')

    console.log(new_object, posts);

    
    
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