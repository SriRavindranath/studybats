var async = require('async');
module.exports = function(University) {
University.disableRemoteMethod("create", true);
University.disableRemoteMethod("upsert", false);
University.disableRemoteMethod("updateAll", false);
University.disableRemoteMethod("updateAttributes", false);

University.disableRemoteMethod("find", false);
University.disableRemoteMethod("findById", false);
University.disableRemoteMethod("findOne", false);

University.disableRemoteMethod("deleteById", false);

University.disableRemoteMethod("confirm", false);
University.disableRemoteMethod("count", false);
University.disableRemoteMethod("exists", false);
University.disableRemoteMethod("createChangeStream", true);


//------------------------------------------------------------------------------
//below method are used to search the data for Universtiy name
//------------------------------------------------------------------------------
University.search = function (university_name,limit,skip, cb) {
var where="";
if(!isBlank(university_name))
{

 where=" where university_name like \"%\" ? \"%\" ";
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







    var ds = University.dataSource;
    //var sql = "select id, university_name  from university "+ where+" order by university_name  " +offsetvar;


async.parallel([
    function(callback) {
        var queryData = "select id, university_name  from university "+ where+" order by university_name  " +offsetvar;
        ds.connector.query(queryData, [university_name], function (err, result) {
 if (err) {
                return callback(err);
            }
            return callback(null, result);
           
        });
    },
    function(callback) {
        var queryData2 = "select count(*) as count  from university "+ where;
        ds.connector.query(queryData2, [university_name], function (err, result) {
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

University.remoteMethod(
    'search',
    {
        http: { verb: 'get' },
        description: 'Get list of products by category',
        accepts:[ { arg: 'university_name', type: 'string' },
         {arg: 'limit', type: 'number'},
        {arg: 'skip', type: 'number'}
        ],
        returns: { arg: 'data', type: ['University'], root: true }
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
