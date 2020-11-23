import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<CssBaseline />
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</MuiThemeProvider>,
	document.getElementById('root')
);
