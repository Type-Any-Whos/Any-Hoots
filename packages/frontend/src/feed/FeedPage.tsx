import { FormControl, Input, Paper, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { FormEvent, useEffect, useState, useContext } from 'react';
import Form, { FormInput } from '../components/form';
import { getFeed, submitTweet } from './feedApi';
import { StateContext, ContextType } from '../StateProvider';

import AlertMessage from '../AlertMessage';
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

	const [status, setStatus] = useState<any>();
	async function submit({ errors, values }: any) {
		const { newTweet } = values;
		const value = newTweet ? newTweet.trim() : undefined;

		if (newTweet === undefined) {
			setStatus({ msg: 'Hoot cannot be empty!', key: Math.random() });
			return;
		}
		if (newTweet.length > 180) {
			setStatus({
				msg: 'Hoot cannot longer than 180 charcters!',
				key: Math.random(),
			});
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
						{/* IF THE STATUS IS TRUE, DISPLAY THE STATUS IE: THE CONDITIONALS FOR HOOT SUBMISSIONS */}
						{status ? (
							<AlertMessage key={status.key} message={status.msg} />
						) : null}
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
