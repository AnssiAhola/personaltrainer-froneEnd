import { useState, useEffect } from 'react';
import { CalendarTodayOutlined, FitnessCenterTwoTone, PeopleAltTwoTone } from '@material-ui/icons';

import Customers from './components/customer/Customers';
import Trainings from './components/training/Trainings';
import {
	MiniDrawer,
	MiniDrawerAppBar,
	MiniDrawerButton,
	MiniDrawerContent
} from './components/MiniDrawer';
import { appBarStyles, appStyles, drawerStyles } from './styles';
import { useLocation, Redirect, Route, useHistory, Switch } from 'react-router-dom';
import Calendar from './components/Calendar';

const routes = {
	customers: {
		title: 'Customers',
		path: '/customers',
		icon: <PeopleAltTwoTone />,
		component: Customers
	},
	trainings: {
		title: 'Trainings',
		path: '/trainings',
		icon: <FitnessCenterTwoTone />,
		component: Trainings
	},
	calendar: {
		title: 'Calendar',
		path: '/calendar',
		icon: <CalendarTodayOutlined />,
		component: Calendar
	}
};

function App() {
	const routeHistory = useHistory();
	const location = useLocation();

	const appClasses = appStyles();
	const drawerClasses = drawerStyles();
	const appBarClasses = appBarStyles();

	const [ open, setOpen ] = useState(false);
	const [ title, setTitle ] = useState('');

	const handleToggle = () => setOpen((prevState) => !prevState);

	const pathChangeEventListener = () => {
		Object.values(routes).forEach((route) => {
			if (location.pathname === route.path) setTitle(route.title);
		});
	};

	useEffect(pathChangeEventListener, [ location ]);

	return (
		<div className={appClasses.root}>
			<MiniDrawerAppBar
				classes={appBarClasses}
				title={title}
				open={open}
				onToggle={handleToggle}
			/>
			<MiniDrawer classes={drawerClasses} open={open} onToggle={handleToggle}>
				<MiniDrawerContent>
					{Object.values(routes).map((route, i) => (
						<MiniDrawerButton
							key={i}
							text={route.title}
							icon={route.icon}
							onClick={() => routeHistory.push(route.path)}
							selected={location.pathname === route.path ? true : false}
						/>
					))}
				</MiniDrawerContent>
			</MiniDrawer>
			<div className={appClasses.content}>
				<Switch>
					<Redirect exact from="/" to={routes.customers.path} />
					{Object.values(routes).map((route, i) => (
						<Route key={i} exact path={route.path} component={route.component} />
					))}
				</Switch>
			</div>
		</div>
	);
}

export default App;
