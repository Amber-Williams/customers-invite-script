const { CustomerInvites } = require('./../create-invites.js');
const offices = require('./test_data/test-office-locations.json');
const customers = require('./test_data/test-customers.json');
const expected = require('./test_data/create-invites.expected.json');

test('Returns empty array if desination does not exist in office list', () => {
  customer_invites = new CustomerInvites("Does not exist", offices, customers);
  expect(customer_invites).toEqual([]);
});

test('Creates customer invite list', () => {
  let customer_invites = new CustomerInvites("Intercom Dublin office", offices, customers);
  let customer_list = customer_invites.create_customer_list();

  expect(customer_list).toEqual(expected.result_0);

  customer_invites = new CustomerInvites("Intercom New York City office", offices, customers);
  customer_list = customer_invites.create_customer_list();

  expect(customer_list).toEqual(expected.result_1);
});