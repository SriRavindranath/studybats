module.exports = function(University) {
University.disableRemoteMethod("create", false);
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

University.getId = function(UniversityName, cb) {
University.find ({where: {UniversityName: UniversityName}}, function (err, University) {

        response =University[0].id;
        cb(null, response);
        console.log(response);
    });
  }

  University.remoteMethod (
        'getId',
        {
          http: {path: '/getid', verb: 'get'},
          accepts: {arg: 'UniversityName', type: 'string', http: { source: 'query' } },
          returns: {arg: 'id', type: 'string'},
          description: "Find a model instance by UniversityName from the data source and additionally return the id."
        }
    );


//--------------------------------------------------------------
//below method is used to serarch name in database 
//--------------------------------------------------------------

University.search = function(UniversityName, cb) {
var pattern = new RegExp('.*'+UniversityName+'.*', "i"); 

University.find ({
	where: {UniversityName:{like:pattern}},
	 fields: ['id', 'UniversityName']},
	 function (err, university) {

var output = university;

var errorJson = {
	    "name": "Error",
	    "status": 404,
	    "message": "no \"University\" found with name : \"" + UniversityName + "\".",
	    "statusCode": 404,
	    "code": "MODEL_NOT_FOUND  ",
  	  };
if (err) {	  
  	    cb(errorJson, null);
      }
      else {
if (university.length<1) {
					errorJson.message = "University not found";
					cb(errorJson, output);
				  }else
				  {
      	cb(null, output);}
}
    });
  }




  University.remoteMethod (
        'search',
        {
          http: {path: '/search', verb: 'get'},
          accepts: {arg: 'UniversityName', type: 'string', http: { source: 'query' } },
          returns: {arg: 'University', root: true, type: 'object'},
          description: "Find a model instance by UniversityName from the data source and additionally return list of matching University name id."
        }
    );








};
