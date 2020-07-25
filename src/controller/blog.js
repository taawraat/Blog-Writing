const Blog = require('../models/blog');
const queryString = require('query-string')


const blog = async (req, res) => {
    let page = req.query.page;
    let loggedIn = req.session.isLoggedIn

    if(page === undefined) page = 1;

    const blogs = await Blog.find().sort({ createdAt: 'desc' })
    const data = pagination(blogs, Number(page), 5,loggedIn);
    
    res.render('blog', data);
}

const showBlog = async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (blog == null) res.redirect('/blog');

    res.render('showBlog', { blog: blog });
}

const newBlog = async (req, res) => {
    let blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        blog = await blog.save();
        res.redirect(`/blog/${blog.slug}`);
    } catch (err) {
        res.redirect('blog/new')
    }
}

const deleteBlog = async (req,res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect('/blog?page=1')
}

const editBlog = async (req,res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('edit', { blog: blog });
}

const edit = async (req,res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });

    res.send('edited')
}

function pagination(data, page, rows, loggedIn) {
    var start = (page - 1) * rows;
    var end = start + rows;

    var trimmedData = data.slice(start, end);

    var pages = Math.ceil(data.length / rows);

    return { blogs: trimmedData, pages: pages, loggedIn };
}

exports.blog = blog
exports.newBlog = newBlog
exports.showBlog = showBlog
exports.deleteBlog = deleteBlog
exports.editBlog = editBlog
exports.edit = edit