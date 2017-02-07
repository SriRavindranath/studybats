var async = require('async');
module.exports = function(Coursedetails) {
  Coursedetails.disableRemoteMethod("create", true);
  Coursedetails.disableRemoteMethod("upsert", false);
  Coursedetails.disableRemoteMethod("updateAll", false);
  Coursedetails.disableRemoteMethod("updateAttributes", false);

  Coursedetails.disableRemoteMethod("find", false);
  Coursedetails.disableRemoteMethod("findById", false);
  Coursedetails.disableRemoteMethod("findOne", false);

  Coursedetails.disableRemoteMethod("deleteById", false);

  Coursedetails.disableRemoteMethod("confirm", false);
  Coursedetails.disableRemoteMethod("count", false);
  Coursedetails.disableRemoteMethod("exists", false);
  Coursedetails.disableRemoteMethod("createChangeStream", true);
  //------------------------------------------------------------------------------
  //below method are used to search the data for Universtiy name
  //------------------------------------------------------------------------------
  Coursedetails.search = function (course,limit,skip, cb) {
var where=""
if(isBlank(course))
{
 where="";
}else
{
 where=" where course like \"%\" ? \"%\" ";
}

var offsetvar="";
if(isBlank(skip) )
{
  
offsetvar=" LIMIT 0";
}else
{
  offsetvar=" LIMIT "+skip;
}
if(isBlank(limit) )
{
offsetvar="";
}else
{
  offsetvar=offsetvar+","+limit;
}

      var ds = Coursedetails.dataSource;
      //var sql = "select id,Course_name,Course_level,Course from studybats.course_details "+ where +" order by Course " +offsetvar;


async.parallel([
    function(callback) {
        var queryData = "select id,course_name,course_level,course from studybats.course_details "+ where +" order by course " +offsetvar
        ds.connector.query(queryData, [course], function (err, result) {
 if (err) {
                return callback(err);
            }
            return callback(null, result);
           
        });
    },
    function(callback) {
        var queryData2 = "select count(*) as count from studybats.course_details "+ where
        ds.connector.query(queryData2, [course], function (err, result) {
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

  Coursedetails.remoteMethod(
      'search',
      {
          http: { verb: 'get' },
          description: 'Get list of products by category',
          accepts: [{ arg: 'course', type: 'string' },
         {arg: 'limit', type: 'number'},
        {arg: 'skip', type: 'number'}],
          returns: { arg: 'data', type: ['Coursedetails'], root: true }
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