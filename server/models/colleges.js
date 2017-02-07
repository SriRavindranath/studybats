var count="";
var async = require('async');
module.exports = function(Colleges) {
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
    Colleges.search = function (college_name,limit,skip, cb) {
var where=""
if(isBlank(college_name))
{
 where="";
}else
{
 where=" where college_name like \"%\" ? \"%\" ";
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

        var ds = Colleges.dataSource;
        //var sql = "SELECT id,College_Name FROM colleges "+ where +" order by College_Name "+offsetvar;
        // var sql2 = "SELECT count(*) as count FROM colleges "+ where +" order by College_Name ";

async.parallel([
    function(callback) {
        var queryData = "SELECT id,college_name FROM colleges "+ where +" order by college_name "+offsetvar;
        ds.connector.query(queryData, [college_name], function (err, result) {
 if (err) {
                return callback(err);
            }
            return callback(null, result);
           
        });
    },
    function(callback) {
        var queryData2 = "SELECT count(*) as count FROM colleges "+ where;
        ds.connector.query(queryData2, [college_name], function (err, result) {
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

    Colleges.remoteMethod(
        'search',
        {
            http: { verb: 'get' },
            description: 'Get list of products by category',
            accepts: [{ arg: 'college_name', type: 'string' },
         {arg: 'limit', type: 'number'},
        {arg: 'skip', type: 'number'}],
            returns: { arg: 'data', type: ['colleges'], root: true }
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
   
     
     ds.connector.query(sql, [params], function (err, Colleges) {

            if (err){ 
                console.error(err)
                return false ;
                }else
                {

 console.log('>> results: ', Colleges );
        var string=JSON.stringify(Colleges);
        console.log('>> string: ', string );
        var json =  JSON.parse(string);
         console.log('>> totalCount: ', json[0].count );
         count= json[0].count;
           
 
}
        });
       

}

