const { distHaversine, distVincenty } = require('./../helpers/distance-calculators.js');

const destination = {
  "latitude": 0,
  "longitude": 0
};

const customer = {
  "latitude": 45,
  "longitude": 87
};

test('Haversine formula calculates distance correctly', () => {
  const expected = 9771.717253760784;

  const result = distHaversine(
    destination.latitude,
    destination.longitude,
    customer.latitude,
    customer.longitude
    );

  expect(result).toBe(expected);

  expect(distHaversine(0,0,0,0)).toBe(0);
});


test('Vincenty formula calculates distance correctly', () => {
  const expected = 9773.889194397765;

  const result = distVincenty(
    destination.latitude,
    destination.longitude,
    customer.latitude,
    customer.longitude
    );

  expect(result).toBe(expected);

  expect(distVincenty(0,0,0,0)).toBe(0);
});