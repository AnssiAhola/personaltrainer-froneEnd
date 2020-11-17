import { createMuiTheme } from '@material-ui/core/styles';
import { blue, deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: blue,
		secondary: deepOrange
	}
});
export default theme;
