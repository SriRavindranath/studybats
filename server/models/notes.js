var async = require('async');
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

//below method is used to  post ads in database
//--------------------------------------------------------------


//--------------------------------------------------------------
//below method is used to search ads in database
//--------------------------------------------------------------

Notes.search = function(book_name,university_id,college_id,course_id,subject_id,city_id,limit,skip, cb) {
var offsetvar="";
var params =[];
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

var whereClause="where "
if((isBlank(book_name) && isBlank(university_id) && isBlank(college_id) && isBlank(course_id) && isBlank(subject_id) && isBlank(city_id)))
{
var whereClause=""
}else 
{
if(!isBlank(university_id))
{
  whereClause=whereClause+"university_id in (?) and ";
  params.push(university_id);
}
if(!isBlank(book_name))
{
   whereClause=whereClause+" book_name like \"%\" ? \"%\"  and ";
   params.push(book_name);
}
if(!isBlank(college_id))
{
   whereClause=whereClause+" college_id in (?) and ";
      params.push(college_id);
}
if(!isBlank(course_id))
{
   whereClause=whereClause+" course_id in (?) and ";
       params.push(course_id);
}
if(!isBlank(subject_id))
{
   whereClause=whereClause+" subject_id in (?) and ";
      params.push(subject_id);
}
if(!isBlank(city_id))
{
   whereClause=whereClause+" city_id in (?)";
      params.push(city_id);
}

}
var lastChar=whereClause.slice(-4);;
if(lastChar=="and ")
{
  whereClause=whereClause.substring(0, whereClause.length - 4);
}

whereClause=whereClause+" "+" order by priority desc,id asc   ";


var ds = Notes.dataSource;
      var sql = "select * from studybats.notes " +whereClause;



async.parallel([
    function(callback) {
        var queryData = "select id,priority,book_name,book_type,edition,price,author,subject_name \
,subject_id,course_id,college_id,department,year,semester,paper,university_id,\
description,modified_date,created_date,posted_by,phone_no,city_id from studybats.notes " +whereClause+" "+offsetvar;
        ds.connector.query(queryData, params, function (err, result) {
 if (err) {
                return callback(err);
            }
            return callback(null, result);
           
        });
    },
    function(callback) {
        var queryData2 = "select count(*) as count from studybats.notes " +whereClause;
        ds.connector.query(queryData2, params, function (err, result) {
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


  Notes.remoteMethod (
        'search',
        {
          http: {path: '/search', verb: 'get',source:'body'},
          accepts: [
              {arg: 'book_name', type: 'string' },
          {arg: 'university_id', type: 'string' },
            {arg: 'college_id', type: 'string' },
           {arg: 'course_id', type: 'string' },
 {arg: 'subject_id', type: 'string' },
  {arg: 'city_id', type: 'string' },
              {arg: 'limit', type: 'number'},
                {arg: 'skip', type: 'number'}

          ],
          returns: {arg: 'Notes', root: true, type: 'object'},
          description: ""
        }
    );


//--------------------------------------------------------------
//remote  method hook for insert ads in database
//--------------------------------------------------------------

//--------------------------------------------------------------
//below method is used to getDetails of  ads posted based on book_id in database
//--------------------------------------------------------------

Notes.getDetails = function(book_id, cb) {
var ds = Notes.dataSource;
      var sql = "select n.book_name,n.edition,n.description,n.image_url,n.author,ct.city,n.price,s.subject,c.course,u.username,n.phone_no,u.email,cl.college_name as college,uni.university_name as university from studybats.notes as n \
inner join studybats.userprofile as u on(n.posted_by=u.id) \
left join studybats.course_details as c on(n.course_id=c.id) \
left join studybats.subject_details as s on(n.subject_id=s.id) \
left join studybats.colleges as cl on(n.college_id=cl.id) \
left join studybats.file as f on(n.image_id=f.id)\
left join studybats.university as uni on(n.university_id=uni.id)  \
left join studybats.city as ct on(n.city_id=ct.id) \
where n.id= ? "
     console.log("Query\n  "+sql.toString())

      ds.connector.query(sql, [book_id], function (err, Notes) {

          if (err) console.error(err);

          cb(err, Notes);

      });
};


  Notes.remoteMethod (
        'getDetails',
        {
          http: {path: '/getDetails', verb: 'get',source:'body'},
          accepts: [
              {arg: 'book_id', type: 'number' }

          ],
          returns: {arg: 'Notes', root: true, type: 'object'},
          description: ""
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
