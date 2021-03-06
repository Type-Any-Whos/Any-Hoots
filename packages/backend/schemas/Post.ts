import { Schema, Types } from 'mongoose';
import * as mongoose from 'mongoose';

const Post = new Schema({
	user: {
		type: Types.ObjectId,
		ref: 'User',
	},
	text: String,
	timestamp: Date,
	users: [
		{
			type: Types.ObjectId,
			ref: 'User',
		},
	],
});

mongoose.model('Post', Post);
