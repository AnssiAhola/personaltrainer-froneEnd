import { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { Card, InputAdornment, TextField, Grid } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { dataTableStyles } from '../styles';

function DataTable({ data }) {
	const [ quickFilter, setQuickFilter ] = useState('');
	const ref = useRef();

	const gridOptions = {
		defaultColDef: {
			flex: 1,
			sortable: true,
			resizeable: true,
			filter: true
		},
		columnDefs: data.columns,
		animateRows: true
	};

	const styles = dataTableStyles();

	return (
		<Card className={`ag-theme-material ${styles.card}`}>
			<Grid container>
				<Grid item className={styles.gridItem}>
					<TextField
						value={quickFilter}
						onChange={(e) => setQuickFilter(e.target.value)}
						placeholder="Search"
						InputProps={{
							startAdornment: (
								<InputAdornment>
									<SearchIcon />
								</InputAdornment>
							)
						}}
					/>
				</Grid>
			</Grid>
			<AgGridReact
				domLayout="autoHeight"
				quickFilterText={quickFilter}
				ref={ref}
				onGridReady={(params) => (ref.current = params.api)}
				rowSelection="single"
				gridOptions={gridOptions}
				rowData={data.rows}
			/>
		</Card>
	);
}
export default DataTable;
