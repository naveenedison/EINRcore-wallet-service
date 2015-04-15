var config = {
  basePath: '/bws/api',
  disableLogs: false,
  BlockchainMonitor: {
    livenet: {
      name: 'insight',
      url: 'https://insight.bitpay.com:443',
    },
    testnet: {
      name: 'insight',
      url: 'https://test-insight.bitpay.com:443',
    },
  },
  WalletService: {
    storageOpts: {
      dbPath: './db',
      /*  To use multilevel, uncomment this:
      multiLevel: {
        host: 'localhost',
        port: 3230,
      },
     */
    },
    lockOpts: {
      /*  To use locker-server, uncomment this:
      lockerServer: {
        host: 'localhost',
        port: 3231,
      },
     */
    },
  },
};
module.exports = config;