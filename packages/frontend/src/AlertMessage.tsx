import React, { useState } from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export default function AlertMassage({ message }: any) {
	const [open, setOpen] = useState(true);
	function handleClose(event?: React.SyntheticEvent, reason?: string): any {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	}

	return (
		<div>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={open}
				autoHideDuration={2000}
				onClose={handleClose}
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				message={message}
			/>
		</div>
	);
}
