const express = require('express');
const route = express.Router();
const { ensureAuthenticated } = require('../controller/config/auth')
const { showBlog, newBlog , blog, deleteBlog, editBlog, edit }  = require('../controller/blog');

route.get('/', blog)

route.post('/', newBlog)

route.get('/:slug', showBlog)

route.delete('/:id', deleteBlog)

route.get('/edit/:id', editBlog)

route.put('/:id', edit)

route.get('/create/new', ensureAuthenticated, (req,res) => {
    res.render('newBlog');
})

module.exports = route