export class Customer {
	constructor() {
		this.firstname = '';
		this.lastname = '';
		this.streetaddress = '';
		this.postcode = '';
		this.city = '';
		this.email = '';
		this.phone = '';
		this.links = [ { rel: '', href: '' } ];
	}
	set = (customer) => {
		this.firstname = customer.firstname;
		this.lastname = customer.lastname;
		this.streetaddress = customer.streetaddress;
		this.postcode = customer.postcode;
		this.city = customer.city;
		this.email = customer.email;
		this.phone = customer.phone;
		this.links = customer.links;
		return this;
	};
}
