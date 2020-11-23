import { useState, Fragment } from 'react';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import { CustomersService, TrainingsService } from '../../Services';
import Training from './Training';
import { TrainingValidator } from './../../validators/TrainingValidator';
import AddDialog from './../../dialogs/AddDialog';

export default function AddTraining({ onComplete }) {
	const [ training, setTraining ] = useState(new Training());
	const [ customers, setCustomers ] = useState([]);
	const [ customerIndex, setCustomerIndex ] = useState(-1);
	const [ errors, setErrors ] = useState({});
	const [ open, setOpen ] = useState(false);

	const toggleOpen = () => setOpen((prevState) => !prevState);

	const handleInputChange = (e) => setTraining({ ...training, [e.target.name]: e.target.value });

	const handleDateChange = (date) => setTraining({ ...training, date: date.toISOString() });

	const getCustomers = () => {
		CustomersService.GetAll().then((response) => setCustomers(response.content));
	};

	const addTraining = (training) => TrainingsService.Add(training).then(() => onComplete());

	const setLinkToCustomer = (index) => {
		setCustomerIndex(index);
		const linkToCustomer = customers[index].links[0].href;
		setTraining({ ...training, customer: linkToCustomer });
	};

	const handleOpenEvent = () => {
		toggleOpen();
		if (customers.length < 1) getCustomers();
	};

	const handleCancelEvent = () => toggleOpen();

	const handleAddEvent = async () => {
		TrainingValidator.validate(training, { abortEarly: false })
			.then(() => {
				addTraining(training);
				toggleOpen();
				setTraining(new Training());
				setCustomerIndex(-1);
				setErrors({});
			})
			.catch((e) => {
				const currentErrors = {};
				e.inner.forEach((error) => {
					currentErrors[error.path] = error.message;
				});
				setErrors(currentErrors);
			});
	};

	const Fields = [
		<TextField
			margin="dense"
			name="activity"
			value={training.activity}
			onChange={handleInputChange}
			label={'Activity'}
			error={errors.activity ? true : false}
			helperText={errors.activity ? errors.activity : ''}
			fullWidth
		/>,
		<TextField
			margin="dense"
			name="duration"
			value={training.duration}
			onChange={handleInputChange}
			label={'Duration'}
			error={errors.duration ? true : false}
			helperText={errors.duration ? errors.duration : ''}
			fullWidth
		/>,
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<DateTimePicker
				margin="dense"
				label="Date"
				id="date"
				format="dd.MM.yyyy HH:mm"
				onChange={handleDateChange}
				value={training.date}
				ampm={false}
				fullWidth
				disablePast
			/>
		</MuiPickersUtilsProvider>,
		<FormControl margin="dense" fullWidth error={errors.customer ? true : false}>
			<InputLabel>Customer</InputLabel>
			<Select
				native
				name="customer"
				value={customerIndex}
				onChange={(e) => setLinkToCustomer(e.target.value)}
			>
				<option value={-1} />
				{customers.map((customer, i) => {
					return (
						<option key={i} value={i}>
							{customer.firstname} {customer.lastname}
						</option>
					);
				})}
			</Select>
			<FormHelperText>{errors.customer ? errors.customer : ''}</FormHelperText>
		</FormControl>
	];

	return (
		<AddDialog
			toggleOpen={handleOpenEvent}
			open={open}
			title="Add Training"
			onConfirm={handleAddEvent}
			onCancel={handleCancelEvent}
		>
			{Fields.map((field, i) => <Fragment key={i}>{field}</Fragment>)}
		</AddDialog>
	);
}
