var async = require('async');
module.exports = function(Subjectdetails) {
  Subjectdetails.disableRemoteMethod("create", true);
  Subjectdetails.disableRemoteMethod("upsert", false);
  Subjectdetails.disableRemoteMethod("updateAll", false);
  Subjectdetails.disableRemoteMethod("updateAttributes", false);

  Subjectdetails.disableRemoteMethod("find", false);
  Subjectdetails.disableRemoteMethod("findById", false);
  Subjectdetails.disableRemoteMethod("findOne", false);

  Subjectdetails.disableRemoteMethod("deleteById", false);

  Subjectdetails.disableRemoteMethod("confirm", false);
  Subjectdetails.disableRemoteMethod("count", false);
  Subjectdetails.disableRemoteMethod("exists", false);
  Subjectdetails.disableRemoteMethod("createChangeStream", true);
  //------------------------------------------------------------------------------
  //below method are used to search the data for Universtiy name
  //------------------------------------------------------------------------------
  Subjectdetails.search = function (subject,limit,skip, cb) {
var where=""
if(isBlank(subject))
{
 where="";
}else
{
 where=" where subject like \"%\" ? \"%\" ";
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
      var ds = Subjectdetails.dataSource;
      //var sql = "select id,Course_id,Subject from studybats.subject_details "+ where +" order by Subject " +offsetvar;

async.parallel([
    function(callback) {
        var queryData = "select id,course_id,subject from studybats.subject_details "+ where +" order by subject " +offsetvar;
        ds.connector.query(queryData, [subject], function (err, result) {
 if (err) {
                return callback(err);
            }
            return callback(null, result);
           
        });
    },
    function(callback) {
        var queryData2 = "select count(*) as count from studybats.subject_details "+ where;
        ds.connector.query(queryData2, [subject], function (err, result) {
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

  Subjectdetails.remoteMethod(
      'search',
      {
          http: { verb: 'get' },
          description: 'Get list of products by category',
          accepts: [{ arg: 'subject', type: 'string' },
         {arg: 'limit', type: 'number'},
        {arg: 'skip', type: 'number'}],
          returns: { arg: 'data', type: ['Subjectdetails'], root: true }
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