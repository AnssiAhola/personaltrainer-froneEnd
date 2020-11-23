// https://material-ui.com/components/drawers/

import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export const MiniDrawerContent = ({ children }) => {
	return <List>{children}</List>;
};

export const MiniDrawerButton = ({ text, onClick, icon, selected }) => {
	return (
		<ListItem button onClick={onClick} selected={selected}>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={text} />
		</ListItem>
	);
};

export const MiniDrawerAppBar = ({ classes, title, open, onToggle }) => {
	return (
		<AppBar
			position="fixed"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: open
			})}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={onToggle}
					edge="start"
					className={clsx(classes.menuButton, {
						[classes.hide]: open
					})}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap>
					{title}
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export const MiniDrawer = ({ classes, open, onToggle, children }) => {
	const theme = useTheme();

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})
			}}
		>
			<div className={classes.toolbar}>
				<IconButton color="inherit" onClick={onToggle}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</div>
			<Divider />
			{children}
		</Drawer>
	);
};
