import { object, string, date } from 'yup';
export const TrainingValidator = object({
	activity: string().required('Name for activity is required.'),
	duration: string().required('Duration of the activity is required.'),
	date: date().min(new Date()).required('Date is required.'),
	customer: string().required('Customer is required.')
});
