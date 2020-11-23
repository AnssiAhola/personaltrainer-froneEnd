import { useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { CustomerValidator } from './../../validators/CustomerValidator';
import { CustomersService } from './../../Services';
import EditDialog from '../../dialogs/EditDialog';

export default function EditCustomer({ customer, onComplete, fields }) {
	const [ inEdit, setInEdit ] = useState(customer);
	const [ errors, setErrors ] = useState({});

	const handleInputChange = (e) => setInEdit({ ...inEdit, [e.target.name]: e.target.value });

	const handleCancelEvent = () => setErrors({});

	const updateCustomer = (customer) => CustomersService.Update(customer).then(() => onComplete());

	const handleConfirmEvent = async () => {
		return await CustomerValidator.validate(inEdit, { abortEarly: false })
			.then((validCustomer) => {
				updateCustomer(validCustomer);
				setErrors({});
				return true;
			})
			.catch((e) => {
				const current = {};
				e.inner.forEach((error) => (current[error.path] = error.message));
				setErrors(current);
				return false;
			});
	};

	return (
		<Fragment>
			<EditDialog onConfirm={handleConfirmEvent} onCancel={handleCancelEvent}>
				{fields.map((field, i) => {
					return (
						<TextField
							key={i}
							margin="dense"
							name={field.field}
							value={inEdit[field.field]}
							onChange={handleInputChange}
							label={field.headerName}
							error={errors[field.field] ? true : false}
							helperText={errors[field.field] ? errors[field.field] : ''}
							fullWidth
						/>
					);
				})}
			</EditDialog>
		</Fragment>
	);
}
