module.exports = function(Notes) {

//Notes.disableRemoteMethod("create", false);
//Notes.disableRemoteMethod("upsert", false);
//Notes.disableRemoteMethod("updateAll", false);
//Notes.disableRemoteMethod("updateAttributes", false);

//Notes.disableRemoteMethod("find", false);
//Notes.disableRemoteMethod("findById", false);
//Notes.disableRemoteMethod("findOne", false);

//Notes.disableRemoteMethod("deleteById", false);

//Notes.disableRemoteMethod("confirm", false);
//Notes.disableRemoteMethod("count", false);
//Notes.disableRemoteMethod("exists", false);
//Notes.disableRemoteMethod("createChangeStream", true);




//--------start------------------------------------------------------
//below method is used to post  photo in database
//--------------------------------------------------------------

















//---------end-----------------------------------------------------
//below method is used to  post photo in database
//--------------------------------------------------------------
Notes.insert = function(Book_Name,Subject_Name,Course_Type,Course_name,college_id,Department,
Year,Semester,Paper,university_id,Description,posted_by,cb) {

Notes.create({
      // id: 1, // do not pass a seq, to let mongodb generate a number
    Book_Name: Book_Name,
    Subject_Name: Subject_Name,
    Course_Type: Course_Type,
    Course_name: Course_name,
    college_id: college_id,
    Department: Department,
    Year: Year,
    Semester: Semester,
    Paper: Paper,
    university_id: university_id,
    Description: Description,
    modified_date: new Date(),
    created_date: new Date(),
    posted_by: posted_by
    }, function(err, notes) {
var output = notes;


var errorJson = {
      "name": "Error",
      "status": 404,
      "message": "no records inserted",
      "statusCode": 404,
      "code": "MODEL_NOT_FOUND  ",
      };
if (err) {
 errorJson = {
      "name": "Error",
      "status": 404,
      "message": err.message,
      "statusCode": 404,
      "code": "MODEL_NOT_FOUND  ",
      };



        console.log(err);
        cb(errorJson, null);
      }
     else
          {
            //var ads_id=notes.id;
 //var app = require('../../common');
//var Container = app.models.Container;

//Container.upload(
//{
  //  url: '/api/Containers/studybats/upload',
    //file: file,
    //fileName: ads_id+".jpg",
    //Additional data with file
    //params:{
     //ads_id: ads_id,
     //posted_by: posted_by
    //}
//});










//console.log(ads_id);
        cb(null, output);
      }

});



}


//--------------------------------------------------------------
//below method is used to search ads in database
//--------------------------------------------------------------

Notes.search = function(university_id,college_id,Course,Degree,limit,skip, cb) {


if(!isBlank(university_id)&& !isBlank(Course)&& !isBlank(Degree)&& !isBlank(college_id))
{
Notes.find ({
  where: {university_id:university_id,Course_Name:Course,Course_Type:Degree,college_id:college_id},limit:limit,skip:skip,order: 'ADS_ID ASC',},
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
  }else if(!isBlank(university_id)&& (isBlank(Course)&&isBlank(Degree)))
{
  Notes.find ({
  where: {university_id:university_id},limit:limit,skip:skip,order: 'ADS_ID ASC',},
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
  where: {Course_Name:Course},limit:limit,skip:skip,order: 'ADS_ID ASC',},
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
}else if(!isBlank(Degree) &&(isBlank(university_id)&&isBlank(Course)))
{
   Notes.find ({
  where: {Course_Type:Degree},limit:limit,skip:skip,order: 'ADS_ID ASC',},
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
}else
{
  Notes.find ({
  where: {university_id:university_id,Course_Name:Course,Course_Type:Degree,college_id:college_id},
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
              {arg: 'limit', type: 'number'},
                {arg: 'skip', type: 'number'}

          ],
          returns: {arg: 'University', root: true, type: 'object'},
          description: "Find a model instance by university_id from the data source and additionally return list of matching University name id."
        }
    );


//--------------------------------------------------------------
//remote  method hook for insert ads in database
//--------------------------------------------------------------

Notes.remoteMethod (
        'insert',
        {
          http: {path: '/insert', verb: 'post',source:'body'},
          accepts: [
          {arg: 'Book_Name', type: 'string' },
           {arg: 'Subject_Name', type: 'string' },
 {arg: 'Course_Type', type: 'string' },
 {arg: 'Course_name', type: 'string' },
             {arg: 'college_id', type: 'string' },
           {arg: 'Department', type: 'string' },
 {arg: 'Year', type: 'string' },
{arg: 'Semester', type: 'string' },
           {arg: 'Paper', type: 'string' },
 {arg: 'university_id', type: 'string' },
             {arg: 'Description', type: 'string' },
           {arg: 'posted_by', type: 'string' }
          ],
          returns: {arg: 'UniversityName', root: true, type: 'object'},
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
