import express from 'express'
import {createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog, userBlogs} from '../controllers/blogController.js';

const router = express.Router();

// GET || ALL BLOGS 
router.get('/all-blogs',getAllBlogs);

// POST || create a new blog
router.post('/create',createBlog);

// DELETE || delete a blog
router.delete('/delete/:id',deleteBlog);

// UPDATE || update a blog
router.put('/update/:id',updateBlog);

// GET || get a blog
router.get('/a-blog/:id',getBlog);

// GET || user blogs
router.get('/user-blog/:id',userBlogs);
export default router;