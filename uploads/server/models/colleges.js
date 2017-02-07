module.exports = function(Colleges) {
Colleges.disableRemoteMethod("create", false);
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




//--------------------------------------------------------------
//below method is used to serarch name in database 
//--------------------------------------------------------------

Colleges.search = function(CollegeName, cb) {
var pattern = new RegExp('.*'+CollegeName+'.*', "i"); 
console.log(pattern);
Colleges.find ({
  where: {College_Name:{like:pattern}},
   fields: ['id', 'College_Name']},
   function (err, colleges) {

var output = colleges;

var errorJson = {
      "name": "Error",
      "status": 404,
      "message": "no \"Colleges\" found with name : \"" + pattern + "\".",
      "statusCode": 404,
      "code": "MODEL_NOT_FOUND  ",
      };
if (err) {    
        cb(errorJson, null);
      }
      else {
if (colleges.length<1) {
          
          errorJson.message = "Colleges not found";
          cb(errorJson, output);
          }else
          {
        cb(null, output);}
}
    });
  }




  Colleges.remoteMethod (
        'search',
        {
          http: {path: '/search', verb: 'get'},
          accepts: {arg: 'CollegeName', type: 'string', http: { source: 'query' } },
          returns: {arg: 'Colleges', root: true, type: 'object'},
          description: "Find a model instance by CollegesName from the data source and additionally return list of matching Colleges name id."
        }
    );










};
