import { makeStyles } from '@material-ui/core/styles';

export const appStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},

	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		marginTop: theme.spacing(4)
	}
}));

const drawerWidth = 240;
export const appBarStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: theme.spacing(4)
	},
	hide: {
		display: 'none'
	}
}));

export const drawerStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.easeIn,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.easeIn,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing(6) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(7)
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	}
}));

export const dataTableStyles = makeStyles((theme) => ({
	card: {
		minHeight: 500,
		marginTop: 30
	},
	gridItem: {
		margin: theme.spacing(1.5, 2)
	}
}));
