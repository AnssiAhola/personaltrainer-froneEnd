import DataTable from './DataTable';
import { useState, useEffect } from 'react';
import { CustomersService as service } from './../Services';
import { Add, People } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

export default function Customers() {
	const [ customers, setCustomers ] = useState([]);
	
	const getCustomers = async () => {
		service.GetAll().then((data) => setCustomers(data.content));
	};

	useEffect(() => getCustomers(), []);

	const columns = [
		// {
		// 	headerName: 'Actions',
		// 	cellRendererFramework: (params) => (
		// 		<IconButton style={{ padding: 4 }}>
		// 			<Add />
		// 			<People />
		// 		</IconButton>
		// 	)
		// },
		{ headerName: 'First Name', field: 'firstname' },
		{ headerName: 'Last Name', field: 'lastname' },
		{ headerName: 'Street Address', field: 'streetaddress' },
		{ headerName: 'Postcode', field: 'postcode' },
		{ headerName: 'City', field: 'city' },
		{ headerName: 'Email', field: 'email' },
		{ headerName: 'Phone', field: 'phone' }
	];

	return <DataTable data={{ rows: customers, columns }} />;
}
