import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TrainingsService } from '../Services';

class Event {
	constructor() {
		this.id = '';
		this.title = '';
		this.start = '';
		this.end = '';
	}
}

export default function Calendar() {
	const [ events, setEvents ] = useState([]);

	useEffect(() => {
		const populateCalendar = async () => {
			const data = await TrainingsService.GetAll();
			let temp = [];
			data.forEach((el) => {
				let event = new Event();
				event.id = el.id;
				event.title = `${el.activity}`;
				if (el.customer) {
					event.title = event.title.concat(
						' / ',
						`${el.customer.firstname} ${el.customer.lastname}`
					);
				}
				let startDate = new Date(el.date);
				event.start = startDate;
				let endDate = new Date(el.date);
				event.end = endDate.setMinutes(endDate.getMinutes() + el.duration);
				temp.push(event);
			});
			setEvents(temp);
		};
		populateCalendar();
	}, []);

	return (
		<div style={{ margin: 30 }}>
			<FullCalendar
				initialView="timeGridWeek"
				headerToolbar={{ right: 'dayGridMonth,timeGridWeek,timeGridDay today prev,next' }}
				plugins={[ timeGridPlugin, dayGridPlugin ]}
				locale="en-fi"
				allDaySlot={false}
				nowIndicator
				contentHeight="auto"
				events={events}
			/>
		</div>
	);
}
