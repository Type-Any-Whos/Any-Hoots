import * as express from 'express';
const mongoose = require('mongoose');
import createError from 'http-errors';
import requireAuth from '../middleware/requireAuth';
const router = express.Router();

// create
router.post('/', requireAuth, async (req, res, next) => {
	let { text } = req.body;
	if (!text) {
		return next(createError(400, 'You must provide text.'));
	}

	const timeobj = {
		timestamp: new Date(Date.now()).toISOString(),
	};
	let { timestamp } = timeobj;

	const Post = mongoose.model('Post');
	const post = await Post.create({
		text,
		timestamp,
		// @ts-ignore
		user: req.session.userId,
	});

	return res.json(post);
});

// list
router.get('/', async (req, res, next) => {
	const Post = mongoose.model('Post');
	// @ts-ignore
	const posts = await Post.find().populate({
		path: 'user',
		model: 'User',
	});
	return res.json(posts);
});

module.exports = router;
