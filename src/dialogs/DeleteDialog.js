import { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { DeleteForeverOutlined } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';

export default function DeleteDialog({ deletable, onConfirm }) {
	const [ open, setOpen ] = useState(false);

	const toggleOpen = () => setOpen((prevState) => !prevState);

	const handleConfirm = () => {
		onConfirm(deletable);
		toggleOpen();
	};

	return (
		<Fragment>
			<Tooltip title="Delete">
				<IconButton variant="outlined" color="secondary" onClick={toggleOpen}>
					<DeleteForeverOutlined />
				</IconButton>
			</Tooltip>
			<Dialog open={open} onClose={toggleOpen}>
				<DialogTitle>{'Delete'}</DialogTitle>
				<DialogContent>
					<DialogContentText>Are you sure?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={toggleOpen} color="primary">
						Cancel
					</Button>
					<Button onClick={handleConfirm} color="primary" autoFocus>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
