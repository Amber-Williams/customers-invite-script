const fs = require('fs');
const customers = require('./customers.json');
const offices = require('./constants/office-locations.json');
const { distHaversine, distVincenty } = require('./helpers/distance-calculators.js');

const CustomerInvites = function (office_name, offices, customers) {
  const distance_limit = 100; // kilometres

  let destination = offices.filter(office => office.name === office_name); //gets office office

  if (destination.length > 0) {
    destination = destination[0];
  } else {
    return [];
  }

  this.create_customer_list = function() {
    let list = customers.map(customer => {
      customer.distance = {
        measurement: "kilometres"
      };

      customer.distance.amount = distHaversine(destination.latitude,
                                               destination.longitude,
                                               customer.latitude,
                                               customer.longitude);

      customer.distance.amount_percise = distVincenty( destination.latitude,
                                                       destination.longitude,
                                                       customer.latitude,
                                                       customer.longitude);

      return customer;
    }); // maps through customer list and creates distance away from destination on each

    list = list.sort((a, b) => a.distance.amount - b.distance.amount); // sorts the customers list for readability

    const filtered_list = list.filter(user => {
      if (user.distance.amount <= distance_limit ) return user;
    }); // removes any customers farther away then the distance_limit

    return filtered_list;
  }


}

module.exports = {
  CustomerInvites
};

module.exports.init = function () {
  const customer_invites = new CustomerInvites('Intercom Dublin office', offices, customers);
  const customer_list = customer_invites.create_customer_list();

  fs.writeFile('customers-invite.json', JSON.stringify(customer_list, null, 4), 'utf8', () => {
    console.log('Customer list created and placed into customers-invite.json file')
  }); // writes invite list to customers-invite.json (WARNING: will overwrite existing file)
};