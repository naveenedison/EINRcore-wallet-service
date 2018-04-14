var EINRcore_ = {
  btc: require('EINRcore-lib'),
  bch: require('EINRcore-lib-cash')
};

var _ = require('lodash');

function BCHAddressTranslator() {
};


BCHAddressTranslator.getAddressCoin = function(address) {
  try {
    new EINRcore_['btc'].Address(address);
    return 'legacy';
  } catch (e) {
    try {
      var a= new EINRcore_['bch'].Address(address);
      if (a.toString() == address) return 'copay';
      return 'cashaddr';
    } catch (e) {
      return;
    }
  }
};


// Supports 3 formats:  legacy (1xxx, mxxxx); Copay: (Cxxx, Hxxx), Cashaddr(qxxx);
BCHAddressTranslator.translate = function(addresses, to, from) {
  var wasArray = true;
  if (!_.isArray(addresses)) {
    wasArray = false;
    addresses = [addresses];
  }


  from = from || BCHAddressTranslator.getAddressCoin(addresses[0]);
  if (from == to) return addresses;
  var ret =  _.map(addresses, function(x) {

    var EINRcore = EINRcore_[from == 'legacy' ? 'btc' : 'bch'];
    var orig = new EINRcore.Address(x).toObject();

    if (to == 'cashaddr') {
      return EINRcore_['bch'].Address.fromObject(orig).toCashAddress(true);
    } else if (to == 'copay') {
      return EINRcore_['bch'].Address.fromObject(orig).toString();
    } else if (to == 'legacy') {
      return EINRcore_['btc'].Address.fromObject(orig).toString();
    }
  });

  if (wasArray) 
    return ret;
  else 
    return ret[0];

};


module.exports = BCHAddressTranslator;
