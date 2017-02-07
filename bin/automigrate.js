/*
var app = require('../server');

var accounts = [
  {
    email: 'foo@bar.com',
    createdAt: new Date(),
    lastModifiedAt: new Date()
  },
  {
    email: 'baz@qux.com',
    createdAt: new Date(),
    lastModifiedAt: new Date()
  }
];

// this loads the accountDb configuration in ~/server/datasources.json
var dataSource = app.dataSources.studybats;

// this automigrates the Account model
dataSource.automigrate('Account', function(err) {
  if (err) throw err;

  // this loads the Account model from ~/common/models/Account.json
  var Account = app.models.Account;
  var count = accounts.length;
  accounts.forEach(function(account) {
     // insert new records into the Account table
     Account.create(account, function(err, record) {
      if (err) return console.log(err);

      console.log('Record created:', record);

      count--;

      if (count === 0) {
        console.log('done');
        dataSource.disconnect();
      }
    });
  });
*/


});
