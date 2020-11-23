import DataTable, { TableHeaderContent } from '../DataTable';
import { useState, useEffect, Fragment } from 'react';
import { CustomersService as service } from '../../Services';
import DeleteDialog from '../../dialogs/DeleteDialog';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

export default function Customers() {
	const [ customers, setCustomers ] = useState([]);

	const getCustomers = async () => {
		await service.GetAll().then((data) => setCustomers(data.content));
	};
	useEffect(() => getCustomers(), []);

	const deleteCustomer = (customer) => service.Delete(customer).then(() => getCustomers());

	const columns = [
		{ headerName: 'First Name', field: 'firstname' },
		{ headerName: 'Last Name', field: 'lastname' },
		{ headerName: 'Street Address', field: 'streetaddress' },
		{ headerName: 'Postcode', field: 'postcode' },
		{ headerName: 'City', field: 'city' },
		{ headerName: 'Email', field: 'email' },
		{ headerName: 'Phone', field: 'phone' },
		{
			headerName: 'Actions',
			sortable: false,
			maxWidth: 150,
			cellRendererFramework: (params) => {
				return (
					<Fragment>
						<EditCustomer
							customer={params.data}
							onComplete={getCustomers}
							fields={columns.slice(0, -1)}
						/>
						<DeleteDialog deletable={params.data} onConfirm={deleteCustomer} />
					</Fragment>
				);
			}
		}
	];

	return (
		<DataTable data={{ rows: customers, columns }}>
			<TableHeaderContent>
				<AddCustomer onComplete={getCustomers} fields={columns.slice(0, -1)} />
			</TableHeaderContent>
		</DataTable>
	);
}
