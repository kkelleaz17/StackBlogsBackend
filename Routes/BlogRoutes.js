const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); 
const Views = require('../models/View'); 

router.put('/UpdatePost', async (req, res) => {
  try {
    const postId = req.body._id; 
    const updatedData = req.body;

    if (updatedData.Public) {
      updatedData.PublishedDate = new Date();
    }

    const findblog = await Blog.findByIdAndUpdate(postId, updatedData);
    await findblog.save();

    res.send('Updated');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.get('/FindAllPost', async (req, res) => {
   
  try {
    const UserBlogs = await Blog.find({ Public: true });
    res.json(UserBlogs);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post('/MakeTemplate', async (req, res) => {
  try {
    const CreatedBlog = await new Blog({ Author: req.body._id }).save();
    res.json(CreatedBlog);
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.delete('/DeletePost', async (req, res) => {
  console.log(req.body)
  try {
    const {PostID,Author} = req.body;
    const UserBlogs = await Blog.findById(PostID);
    if(UserBlogs.Author !== Author){
        throw new Error('not author')
    }
    var DeletedBlog = await Blog.findByIdAndDelete(PostID)
    res.json(DeletedBlog);
  } catch (error) {
    console.log(error)
    res.json({ error: error.message });
  }
 
});

router.get('/GetPostByID/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.json({});
  }

  try {
    const UserBlogs = await Blog.findById(id);
    res.json(UserBlogs);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get('/GetPostByAnID/:_id', async (req, res) => {
  const _id = req.params._id;
  if (!_id) {
    res.json({});
  }
  try {
    const UserBlogs = await Blog.findById(_id);
    try {
      await Views.create({ PostId: req.params._id }).save();
    } catch (err) {
      console.error(err);
    }
    res.json(UserBlogs);
  } catch (error) {
    console.error(error);
    res.json({ error: error.message });
  }
});

router.get('/GetTrendingPosts', async (req, res) => {
  try {
    const allblogs = await Blog.find({ Public: true });
    const AllViews = await Views.find();

    const postViewCounts = {};
    AllViews.forEach((view) => {
      if (postViewCounts[view.PostId]) {
        postViewCounts[view.PostId]++;
      } else {
        postViewCounts[view.PostId] = 1;
      }
    });

    const top5NewestPosts = allblogs
      .slice()
      .sort((a, b) => b.PublishedDate - a.PublishedDate)
      .slice(0, 5);

    const top5BigContent = allblogs
      .slice()
      .sort((a, b) => b.Content.length - a.Content.length)
      .slice(0, 5);

    const top5MostViews = allblogs
      .slice()
      .sort((a, b) => (postViewCounts[b._id] || 0) - (postViewCounts[a._id] || 0))
      .slice(0, 5);

    res.json({ top5NewestPosts, top5BigContent, top5MostViews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

router.get('/AllPost/:id', async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.json([]);
  }

  try {
    const UserBlogs = await Blog.find({ Author: id });
    res.json(UserBlogs);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Define other blog-related routes as needed

module.exports = router;
