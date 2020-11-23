import { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Add } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

export default function AddDialog({ title, onOpen, onConfirm, onCancel, children }) {
	const [ open, setOpen ] = useState(false);

	const toggleOpen = () => setOpen((prevState) => !prevState);

	const handleOpen = () => {
		if (onOpen) onOpen();
		toggleOpen();
	};

	const handleCancelEvent = () => {
		if (onCancel) onCancel();
		toggleOpen();
	};

	const handleConfirmEvent = () => {
		onConfirm().then((canClose) => {
			if (canClose) toggleOpen();
		});
	};

	return (
		<Fragment>
			<Tooltip onClick={handleOpen} title={title}>
				<IconButton color="inherit" style={{ margin: 4 }}>
					<Add />
					<Typography style={{ marginLeft: 4 }} variant="h6" component="h1">
						Add
					</Typography>
				</IconButton>
			</Tooltip>
			<Dialog open={open} onClose={handleCancelEvent}>
				<DialogTitle id="form-dialog-title">{title}</DialogTitle>
				<DialogContent>{children}</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelEvent} color="secondary">
						Cancel
					</Button>
					<Button onClick={handleConfirmEvent} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
