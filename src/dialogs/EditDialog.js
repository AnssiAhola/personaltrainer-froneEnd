import { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

export default function EditDialog({ onConfirm, onCancel, children }) {
	const [ open, setOpen ] = useState(false);

	const toggleOpen = () => setOpen((prevState) => !prevState);

	const handelCancelEvent = () => {
		onCancel();
		toggleOpen();
	};

	const handleConfirmEvent = () => {
		onConfirm().then((canClose) => {
			if (canClose) toggleOpen();
		});
	};

	return (
		<Fragment>
			<Tooltip onClick={toggleOpen} title="Edit">
				<IconButton color="primary" style={{ padding: 4 }}>
					<Edit />
				</IconButton>
			</Tooltip>
			<Dialog open={open} onClose={toggleOpen} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit</DialogTitle>
				<DialogContent>{children}</DialogContent>
				<DialogActions>
					<Button onClick={handelCancelEvent} color="secondary">
						Cancel
					</Button>
					<Button onClick={handleConfirmEvent} color="primary">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
