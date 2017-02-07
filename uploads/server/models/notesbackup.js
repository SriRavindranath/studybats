module.exports = function(Notes) {
//Notes.disableRemoteMethod("create", false);
//Notes.disableRemoteMethod("upsert", false);
//Notes.disableRemoteMethod("updateAll", false);
//Notes.disableRemoteMethod("updateAttributes", false);
 
//Notes.disableRemoteMethod("find", false);
//Notes.disableRemoteMethod("findById", false);
//Notes.disableRemoteMethod("findOne", false);
 
Notes.disableRemoteMethod("deleteById", true);
 
Notes.disableRemoteMethod("confirm", false);
//Notes.disableRemoteMethod("count", false);
//Notes.disableRemoteMethod("exists", false);
Notes.disableRemoteMethod("createChangeStream", true);





//--------------------------------------------------------------
//below method is used to search ads in database 
//--------------------------------------------------------------

Notes.search = function(university_id,Course,Degree,limit,skip, cb) {

if(!isBlank(university_id)&&!isBlank(Course)&&!isBlank(Degree))
{
  
Notes.find ({
  where: {university_id:university_id,Course_Name:Course,Course_Type:Degree},
  limit:limit,skip:skip,order: 'ADS_ID ASC',},
   function (err, notes) {

var output = notes;

var errorJson = {
      "name": "Error",
      "status": 404,
      "message": "no \"University\" found with name : \"" + university_id + "\".",
      "statusCode": 404,
      "code": "MODEL_NOT_FOUND  ",
      };
if (err) {    
        cb(errorJson, null);
      }
      else {
if (notes.length<1) {
          errorJson.message = "University not found";
          cb(errorJson, output);
          }else
          {
        cb(null, output);}
}
    });
}else if(!isBlank(university_id)&&(isBlank(Course)&&isBlank(Degree)))
{
Notes.find ({
  where: {university_id:university_id},
  limit:limit,skip:skip,order: 'ADS_ID ASC',},
   function (err, notes) {

var output = notes;

var errorJson = {
      "name": "Error",
      "status": 404,
      "message": "no \"University\" found with name : \"" + university_id + "\".",
      "statusCode": 404,
      "code": "MODEL_NOT_FOUND  ",
      };
if (err) {    
        cb(errorJson, null);
      }
      else {
if (notes.length<1) {
          errorJson.message = "University not found";
          cb(errorJson, output);
          }else
          {
        cb(null, output);}
}
    });
 

}else if(!isBlank(Course) &&(isBlank(university_id)&&isBlank(Degree)))
{
Notes.find ({
  where: {Course_Name:Course},
  limit:limit,skip:skip,order: 'ADS_ID ASC',},
   function (err, notes) {

var output = notes;

var errorJson = {
      "name": "Error",
      "status": 404,
      "message": "no \"Course\" found with name : \"" + Course + "\".",
      "statusCode": 404,
      "code": "MODEL_NOT_FOUND  ",
      };
if (err) {    
        cb(errorJson, null);
      }
      else {
if (notes.length<1) {
          errorJson.message = "Course not found";
          cb(errorJson, output);
          }else
          {
        cb(null, output);}
}
    });
}else if(!isBlank(Degree) &&(isBlank(university_id)&&isBlank(Course)))
{

  Notes.find ({
  where: {Course_Type:Degree},
  limit:limit,skip:skip,order: 'ADS_ID ASC',},
   function (err, notes) {

var output = notes;

var errorJson = {
      "name": "Error",
      "status": 404,
      "message": "no \"Course\" found with name : \"" + Course + "\".",
      "statusCode": 404,
      "code": "MODEL_NOT_FOUND  ",
      };
if (err) {    
        cb(errorJson, null);
      }
      else {
if (notes.length<1) {
          errorJson.message = "Course not found";
          cb(errorJson, output);
          }else
          {
        cb(null, output);}
}
    });
}

}





  Notes.remoteMethod (
        'search',
        {
          http: {path: '/search', verb: 'post',source:'body'},
          accepts: [
          {arg: 'university_id', type: 'string' },
           {arg: 'college_id', type: 'string' },
             {arg: 'Course', type: 'string' },
 {arg: 'Degree', type: 'string' },

            {arg: 'city', type: 'string' },
              {arg: 'limit', type: 'number'},
                {arg: 'skip', type: 'number'}

          ],
          returns: {arg: 'University', root: true, type: 'object'},
          description: "Find a model instance by university_id from the data source and additionally return list of matching University name id."
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