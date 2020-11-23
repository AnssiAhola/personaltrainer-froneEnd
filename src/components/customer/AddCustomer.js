import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AddDialog from '../../dialogs/AddDialog';
import { Customer } from './Customer';
import { CustomerValidator } from './../../validators/CustomerValidator';
import { CustomersService } from './../../Services';

export default function AddCustomer({ fields, onComplete }) {
	const [ customer, setCustomer ] = useState(new Customer());
	const [ errors, setErrors ] = useState({});
	const [ open, setOpen ] = useState(false);

	const toggleOpen = () => setOpen((prevState) => !prevState);

	const handleInputChange = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value });

	const handleCancelEvent = () => {
		setErrors({});
		toggleOpen();
	};

	const addCustomer = (customer) => CustomersService.Add(customer).then(() => onComplete());

	const handleAddEvent = () => {
		CustomerValidator.validate(customer, { abortEarly: false })
			.then((validCustomer) => {
				addCustomer(validCustomer);
				setErrors({});
				toggleOpen();
				setCustomer(new Customer());
			})
			.catch((e) => {
				const current = {};
				e.inner.forEach((error) => {
					current[error.path] = error.message;
				});
				setErrors(current);
			});
	};

	return (
		<AddDialog
			toggleOpen={toggleOpen}
			open={open}
			title="Add Customer"
			onConfirm={handleAddEvent}
			onCancel={handleCancelEvent}
		>
			{fields.map((field, i) => {
				return (
					<TextField
						key={i}
						margin="dense"
						name={field.field}
						value={customer[field.field]}
						onChange={handleInputChange}
						label={field.headerName}
						error={errors[field.field] ? true : false}
						helperText={errors[field.field] ? errors[field.field] : ''}
						fullWidth
					/>
				);
			})}
		</AddDialog>
	);
}
