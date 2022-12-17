var pkg = require('./package.json');

module.exports = bestbuy;

function bestbuy (_options) {
  var options = setupOptions(_options);

  const availabilityEndpoint = require('./js/availability')(options);
  const realTimeAvailabilityEndpoint = require('./js/real-time-availability')(options);
  const categoriesEndpoint = require('./js/categories')(options);
  const productsEndpoint = require('./js/products')(options);
  const openBoxEndpoint = require('./js/openBox')(options);
  const storesEndpoint = require('./js/stores')(options);

  if (!options.key) throw new Error('A Best Buy developer API key is required');

  return {
    options: options,
    availability: availabilityEndpoint.availability,
    availabilityAsStream: availabilityEndpoint.availabilityAsStream,
    realTimeAvailability: realTimeAvailabilityEndpoint.realTimeAvailability,
    openBox: openBoxEndpoint.openBox,
    openBoxAsStream: openBoxEndpoint.openBoxAsStream,
    categories: categoriesEndpoint.categories,
    categoriesAsStream: categoriesEndpoint.categoriesAsStream,
    products: productsEndpoint.products,
    productsAsStream: productsEndpoint.productsAsStream,
    recommendations: require('./js/recommendations')(options),
    stores: storesEndpoint.stores,
    storesAsStream: storesEndpoint.storesAsStream,
    warranties: require('./js/warranties')(options),
    version: require('./js/version')(options)
  };
}

function setupOptions (_opts) {
  var opts = {
    key: process.env.BBY_API_KEY,
    url: 'https://api.bestbuy.com',
    debug: false,
    headers: {
      'User-Agent': `bestbuy-sdk-js/${pkg.version};nodejs`
    },
    requestsPerSecond: 5,
    maxRetries: 0,
    retryInterval: 2000,
    timeout: 5000
  };

  if (typeof _opts === 'string') {
    opts.key = _opts;
  } else if (typeof _opts === 'object') {
    opts = Object.assign(opts, _opts);
  }

  opts.apiService = require('./js/api.service')(opts);
  opts.apiStreamService = require('./js/api.stream.service')(opts);

  return opts;
}