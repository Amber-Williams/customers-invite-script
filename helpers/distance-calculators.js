const toRadians = (degree) => {
  return degree * Math.PI / 180;
};


const distHaversine = (lat1, lon1, lat2, lon2) => {
  const earth_diameter = 12742; // Diameter of the earth in kilometres

  const lat_central = toRadians(lat2-lat1);
  const long_central = toRadians(lon2-lon1);
  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  const a = Math.sin(lat_central/2) * Math.sin(lat_central/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(long_central/2) * Math.sin(long_central/2); // square of half the chord length between two points

  const c = Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); // angular distance between two points (in radians)

  const distance = earth_diameter * c; // in kilometres

  return distance;
}; // based on the Haversine formula



const distVincenty = (lat1, lon1, lat2, lon2) => {
  const a = 6378137;
  const b = 6356752.314245;
  const f = 1 / 298.257223563; // WGS-84 ellipsoid params
  const L = toRadians(lon2 - lon1);
  const U1 = Math.atan((1 - f) * Math.tan(toRadians(lat1)));
  const U2 = Math.atan((1 - f) * Math.tan(toRadians(lat2)));
  const sinU1 = Math.sin(U1);
  const cosU1 = Math.cos(U1);
  const sinU2 = Math.sin(U2);
  const cosU2 = Math.cos(U2);

  let lambda = L;
  let lambdaP;
  let iterLimit = 100;
  do {
    const sinLambda = Math.sin(lambda),
          cosLambda = Math.cos(lambda);
    var sinSigma = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));
    if (sinSigma == 0) return 0; // co-incident points
    var cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
    var sigma = Math.atan2(sinSigma, cosSigma);
    const sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
    var cosSqAlpha = 1 - sinAlpha * sinAlpha;
    var cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
    if (isNaN(cos2SigmaM)) cos2SigmaM = 0; // equatorial line: cosSqAlpha=0 (§6)
    const C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
    lambdaP = lambda;
    lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
  } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);

  if (iterLimit == 0) return NaN // formula failed to converge
  const uSq = cosSqAlpha * (a * a - b * b) / (b * b);
  const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
  const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
  const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
  let s = b * A * (sigma - deltaSigma);

  s = s / 1000 //convert to kilometres
  return s ;
}; // Vincenty formula is the most accurate for all distances on an ellipsoid with equal major and minor axes


module.exports = {
  distHaversine,
  distVincenty
};