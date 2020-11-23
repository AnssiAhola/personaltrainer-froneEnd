import moment from 'moment';
import DataTable, { TableHeaderContent } from '../DataTable';
import { useState, useEffect } from 'react';
import { TrainingsService as service } from '../../Services';
import DeleteDialog from '../../dialogs/DeleteDialog';
import AddTraining from './AddTraining';

export default function Trainings() {
	const [ trainings, setTrainings ] = useState([]);

	const getTrainings = () => service.GetAll().then((data) => setTrainings(data));

	useEffect(() => getTrainings(), []);

	const deleteTraining = (training) => service.Delete(training).then(() => getTrainings());

	const columns = [
		{ headerName: 'Activity', field: 'activity' },
		{ headerName: 'Duration', field: 'duration' },
		{
			headerName: 'Date',
			field: 'date',
			valueFormatter: (params) => {
				return moment(params.value).format('DD.MM.YYYY [klo] HH:mm');
			}
		},
		{
			headerName: 'Actions',
			sortable: false,
			maxWidth: 150,
			cellRendererFramework: (params) => {
				return <DeleteDialog deletable={params.data} onConfirm={deleteTraining} />;
			}
		}
	];

	return (
		<DataTable data={{ rows: trainings, columns }}>
			<TableHeaderContent>
				<AddTraining onComplete={getTrainings} />
			</TableHeaderContent>
		</DataTable>
	);
}
