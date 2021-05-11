import { FormControl, Input, Paper, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { FormEvent, useEffect, useState, useContext } from 'react';

import Form, { FormInput } from '../components/form';

import { getFeed, submitTweet } from './feedApi';
import { StateContext, ContextType } from '../StateProvider';

export default function FeedPage() {
	const { state } = useContext<ContextType>(StateContext);
	const { user } = state;
	const [tweets, setTweets] = useState<Tweet[]>([]);
	useEffect(() => {
		getTweets();
	}, []);

	async function getTweets() {
		const tweets = await getFeed();
		setTweets(tweets);
	}

	async function submit({ errors, values }: any) {
		const { newTweet } = values;
		// const value = newTweet?.trim();
		const value = newTweet ? newTweet.trim() : undefined;

		if (newTweet.length > 180) {
			alert('Tweet is longer than 180 characters');
			return;
		}
		if (!value) {
			return;
		}

		await submitTweet({ text: value });
		await getTweets();
	}
	const currentUser = user ? user.handle : '';

	return (
		<Grid item xs={10}>
			<Paper elevation={2}>
				{/* IF THERE IS NO USER, DO NOT DISPLAY FORM TO TWEET */}
				{currentUser && (
					<Form onSubmit={submit}>
						<FormControl fullWidth>
							<FormInput
								id='tweet-input'
								name='newTweet'
								placeholder="What's happening? (180 characters)"
							/>
						</FormControl>
						<FormControl fullWidth>
							<FormInput name='submit-btn' type='submit' value='Tweet' />
						</FormControl>
					</Form>
				)}
			</Paper>

			{tweets
				.map((tweet) => (
					<Box key={tweet._id} padding={1}>
						<Paper elevation={1}>
							<Box padding={1}>@{tweet.user.handle}</Box>
							<Box padding={1}>{tweet.text}</Box>
							<Box padding={1}>{tweet.timestamp.split('T')[0]}</Box>
						</Paper>
					</Box>
				))
				.reverse()}
		</Grid>
	);
}
