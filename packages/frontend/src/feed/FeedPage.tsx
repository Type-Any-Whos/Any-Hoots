import {
	Button,
	FormControl,
	Input,
	InputLabel,
	Paper,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import React, {
	SyntheticEvent,
	useEffect,
	useRef,
	useState,
	useContext,
} from 'react';
import { getFeed, submitTweet } from './feedApi';
import { StateContext, ContextType } from '../StateProvider';

export default function FeedPage() {
	const { state, dispatch } = useContext<ContextType>(StateContext);
	const { user } = state;
	const [tweets, setTweets] = useState<Tweet[]>([]);
	const [tweetInputValue, setTweetInputValue] = useState<String>('');

	useEffect(() => {
		getTweets();
	}, []);

	async function getTweets() {
		const tweets = await getFeed();
		setTweets(tweets);
	}

	async function submit(evt: SyntheticEvent) {
		evt.preventDefault();

		const value = tweetInputValue?.trim();

		if (!value) {
			return;
		}

		await submitTweet({ text: value });
		setTweetInputValue('');
		await getTweets();
	}
	const currentUser = user ? user.handle : '';
	console.log('what is my user', currentUser);
	return (
		<Grid item xs={10}>
			<Paper elevation={2}>
				{/* IF THERE IS NO USER, DO NOT DISPLAY FORM TO TWEET */}
				{currentUser && (
					<form onSubmit={(evt) => submit(evt)}>
						<FormControl fullWidth>
							<Input
								id='tweet-input'
								placeholder="What's happening?"
								value={tweetInputValue}
								onChange={(evt) => setTweetInputValue(evt.target.value)}
							/>
						</FormControl>
						<FormControl fullWidth>
							<Input type='submit' value='Tweet'></Input>
						</FormControl>
					</form>
				)}
			</Paper>
			<Button>Filter</Button>
			{tweets.map((tweet) => (
				<Box key={tweet._id} padding={1}>
					<Paper elevation={1}>
						<Box padding={1}>@{tweet.user.handle}</Box>
						<Box padding={1}>{tweet.text}</Box>
						<Box padding={1}>{tweet.timestamp}</Box>
					</Paper>
				</Box>
			))}
		</Grid>
	);
}
