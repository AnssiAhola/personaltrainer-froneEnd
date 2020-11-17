import moment from 'moment';
import DataTable from './DataTable';
import { useState, useEffect } from 'react';
import { TrainingsService as service } from './../Services';
import IconButton from '@material-ui/core/IconButton';
import { Add, People } from '@material-ui/icons';

export default function Trainings() {
	const [ trainings, setTrainings ] = useState([]);

	const fetchTrainings = async () => {
		await service.GetAll().then((data) => setTrainings(data.content));
	};

	useEffect(() => fetchTrainings(), []);

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
		{ headerName: 'Activity', field: 'activity' },
		{ headerName: 'Duration', field: 'duration' },
		{
			headerName: 'Date',
			field: 'date',
			valueFormatter: (params) => {
				return moment(params.value).format('DD.MM.YYYY');
			}
		}
	];

	return <DataTable data={{ rows: trainings, columns }} />;
}
