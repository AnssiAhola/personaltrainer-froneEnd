import { object, string } from 'yup';

export const CustomerValidator = object({
	firstname: string().required('First name is required.'),
	lastname: string().required('Last name is required.'),
	streetaddress: string().required('Address is required.'),
	postcode: string().required('Postcode is required.'),
	city: string().required('City is required.'),
	phone: string().required('Phonenumber is required.'),
	email: string().required('Email is required.').email('Invalid email.')
});
