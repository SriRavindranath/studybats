var async = require('async');
module.exports = function(City) {
 City.search = function (city,limit,skip, cb) {
var where=""
if(isBlank(city))
{
 where="";
}else
{
 where=" where city like \"%\" ? \"%\" ";
}

var offsetvar="";
if(isBlank(skip) )
{
  
offsetvar="LIMIT 0";
}else
{
  offsetvar="LIMIT "+skip;
}
if(isBlank(limit) )
{
offsetvar="";
}else
{
  offsetvar=offsetvar+","+limit;
}

        var ds = City.dataSource;
        var sql = "SELECT id,city FROM city "+ where +" order by city "+offsetvar;


async.parallel([
    function(callback) {
        var queryData ="SELECT id,city FROM city "+ where +" order by city "+offsetvar;
        ds.connector.query(queryData, [city], function (err, result) {
 if (err) {
                return callback(err);
            }
            return callback(null, result);
           
        });
    },
    function(callback) {
        var queryData2 = "SELECT count(*) as count FROM city "+ where;
        ds.connector.query(queryData2, [city], function (err, result) {
 if (err) {
                return callback(err);
            }
            return callback(null, result);
           
        });
    }
], function(error, callbackResults) {
    if (error) {
        //handle error
        console.log(error);
    } else {
 var result1=JSON.stringify(callbackResults[0]);
        var result1json =  JSON.parse(result1);

 var result2=JSON.stringify(callbackResults[1]);
       // console.log('>> string: ', result2 );
        var result2json =  JSON.parse(result2);    
         var count=result2json[0].count;   
var output = {
      "count":count ,
      "result":result1json
      };
cb(error, output);
    }
});
 }


    City.remoteMethod(
        'search',
        {
            http: { verb: 'get' },
            description: 'Get list of products by category',
            accepts: [{ arg: 'city', type: 'string' },
         {arg: 'limit', type: 'number'},
        {arg: 'skip', type: 'number'}],
            returns: { arg: 'data', type: ['City'], root: true }
        }
    );

};


function isBlank( data ) {
    if(data==''|| data==null)
    {
      return true;
    }else
    {
      return false;
    }

}
