export default class Training {
	constructor() {
		this.activity = '';
		this.duration = '';
		this.date = new Date().toISOString();
		this.customer = '';
	}

	set = (training) => {
		this.activity = training.activity;
		this.duration = training.duration;
		this.date = training.date;
		this.customer = training.customer;
		return this;
	};
}
