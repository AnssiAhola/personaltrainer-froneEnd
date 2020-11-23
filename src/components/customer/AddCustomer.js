import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AddDialog from '../../dialogs/AddDialog';
import { Customer } from './Customer';
import { CustomerValidator } from './../../validators/CustomerValidator';
import { CustomersService } from './../../Services';

export default function AddCustomer({ fields, onComplete }) {
	const [ customer, setCustomer ] = useState(new Customer());
	const [ errors, setErrors ] = useState({});

	const handleInputChange = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value });

	const handleCancelEvent = () => setErrors({});

	const addCustomer = (customer) => CustomersService.Add(customer).then(() => onComplete());

	const handleAddEvent = async () => {
		return await CustomerValidator.validate(customer, { abortEarly: false })
			.then((validCustomer) => {
				addCustomer(validCustomer);
				setErrors({});
				setCustomer(new Customer());
				return true;
			})
			.catch((e) => {
				const current = {};
				e.inner.forEach((error) => {
					current[error.path] = error.message;
				});
				setErrors(current);
				return false;
			});
	};

	return (
		<AddDialog title="Add Customer" onConfirm={handleAddEvent} onCancel={handleCancelEvent}>
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
