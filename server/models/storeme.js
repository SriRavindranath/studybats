var count="";
var async = require('async');
module.exports = function(storeme) {
  /*
  Colleges.disableRemoteMethod("create", true);
  Colleges.disableRemoteMethod("upsert", false);
  Colleges.disableRemoteMethod("updateAll", false);
  Colleges.disableRemoteMethod("updateAttributes", false);

  Colleges.disableRemoteMethod("find", false);
  Colleges.disableRemoteMethod("findById", false);
  Colleges.disableRemoteMethod("findOne", false);

  Colleges.disableRemoteMethod("deleteById", false);

  Colleges.disableRemoteMethod("confirm", false);
  Colleges.disableRemoteMethod("count", false);
  Colleges.disableRemoteMethod("exists", false);
  Colleges.disableRemoteMethod("createChangeStream", true);
*/

    storeme.search = function (storename,limit,skip, cb) {
var where=""
if(isBlank(storename))
{
 where="";
}else
{
 where=" where storename like \"%\" ? \"%\" ";
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

        var ds = storeme.dataSource;
        //var sql = "SELECT id,storeme FROM colleges "+ where +" order by storeme "+offsetvar;
        // var sql2 = "SELECT count(*) as count FROM colleges "+ where +" order by storeme ";

async.parallel([
    function(callback) {
        var queryData = "SELECT id,storename,latitude,longitude,altitude,image_url,created_at FROM storeme "+ where +" order by storename "+offsetvar;
        ds.connector.query(queryData, [storename], function (err, result) {
 if (err) {
                return callback(err);
            }
            return callback(null, result);
           
        });
    },
    function(callback) {
        var queryData2 = "SELECT count(*) as count FROM storeme "+ where;
        ds.connector.query(queryData2, [storename], function (err, result) {
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
output = {
      "count":count ,
      "result":result1json
      };
cb(error, output);
    }
});

    };

    storeme.remoteMethod(
        'search',
        {
            http: { verb: 'get' },
            description: 'Get list of storename  by store',
            accepts: [{ arg: 'storename', type: 'string' },
         {arg: 'limit', type: 'number'},
        {arg: 'skip', type: 'number'}],
            returns: { arg: 'data', type: ['storeme'], root: true }
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

function getcount(ds,sql,params)
{
   
     
     ds.connector.query(sql, [params], function (err, storeme) {

            if (err){ 
                console.error(err)
                return false ;
                }else
                {

 console.log('>> results: ', storeme );
        var string=JSON.stringify(storeme);
        console.log('>> string: ', string );
        var json =  JSON.parse(string);
         console.log('>> totalCount: ', json[0].count );
         count= json[0].count;
           
 
}
        });
       

}

