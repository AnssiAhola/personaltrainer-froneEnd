import { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Add } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

export default function AddDialog({ toggleOpen, open, title, onConfirm, onCancel, children }) {
	return (
		<Fragment>
			<Tooltip onClick={toggleOpen} title={title}>
				<IconButton color="inherit" style={{ margin: 4 }}>
					<Add />
					<Typography style={{ marginLeft: 4 }} variant="h6" component="h1">
						Add
					</Typography>
				</IconButton>
			</Tooltip>
			<Dialog open={open} onClose={onCancel}>
				<DialogTitle id="form-dialog-title">{title}</DialogTitle>
				<DialogContent>{children}</DialogContent>
				<DialogActions>
					<Button onClick={onCancel} color="secondary">
						Cancel
					</Button>
					<Button onClick={onConfirm} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
