import { useState, useEffect } from 'react';
import { FitnessCenterTwoTone, PeopleAltTwoTone } from '@material-ui/icons';

import Customers from './components/Customers';
import Trainings from './components/Trainings';
import {
	MiniDrawer,
	MiniDrawerAppBar,
	MiniDrawerButton,
	MiniDrawerContent
} from './components/MiniDrawer';
import { appBarStyles, appStyles, drawerStyles } from './styles';

const tabs = {
	customers: {
		title: 'Customers',
		value: 'customers',
		icon: <PeopleAltTwoTone />,
		component: <Customers />
	},
	trainings: {
		title: 'Trainings',
		value: 'trainings',
		icon: <FitnessCenterTwoTone />,
		component: <Trainings />
	}
};

function App() {
	const appClasses = appStyles();
	const drawerClasses = drawerStyles();
	const appBarClasses = appBarStyles();

	const [ tab, setTab ] = useState(tabs.customers);
	const [ open, setOpen ] = useState(false);

	useEffect(() => (document.title = tab.title), [ tab ]);

	const handleToggle = () => setOpen((prevState) => !prevState);

	return (
		<div className={appClasses.root}>
			<MiniDrawerAppBar
				classes={appBarClasses}
				title={tab.title}
				open={open}
				onToggle={handleToggle}
			/>
			<MiniDrawer classes={drawerClasses} open={open} onToggle={handleToggle}>
				<MiniDrawerContent>
					{Object.values(tabs).map((_tab, i) => (
						<MiniDrawerButton
							key={i}
							text={_tab.title}
							onClick={() => setTab(_tab)}
							icon={_tab.icon}
							selected={tab === _tab ? true : false}
						/>
					))}
				</MiniDrawerContent>
			</MiniDrawer>
			<div className={appClasses.content}>{tab.component}</div>
		</div>
	);
}

export default App;
