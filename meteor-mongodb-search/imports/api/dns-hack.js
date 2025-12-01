import dns from "node:dns";

// Save original lookup function
dns._lookup = dns.lookup;

const dnsForced = [];

const customLookup = (hostname, options, callback) => {
  // Force localhost for internal docker DNS resolution
  if (hostname.endsWith(".search-community")) {
    if (!dnsForced.includes(hostname)) {
      console.debug(`Forcing DNS resolution from ${hostname} to IP 127.0.0.1`);
      dnsForced.push(hostname);
    }
    return callback(null, [{ address: "127.0.0.1", family: 4 }]);
  }
  dns._lookup(hostname, options, callback);
};

dns.lookup = customLookup;
