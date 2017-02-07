var speakeasy = require('speakeasy');
var loopback = require('loopback');
var app = loopback();
module.exports = function(UserProfile) {
var validator = require('validator');
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 var mre=/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
UserProfile.disableRemoteMethod("updateAttributes", false);
//UserProfile.validatesFormatOf('email', {with: re, message: 'Must provide a valid email'});
//UserProfile.validatesFormatOf('phone_no', {with: mre, message: 'Must provide a valid phone no'});
//if (!(UserProfile.settings.realmRequired || UserProfile.settings.realmDelimiter)) {
  //  UserProfile.validatesUniquenessOf('email', {message: 'Email already exists'});
    //UserProfile.validatesUniquenessOf('username', {message: 'User already exists'});
//}
/*
UserProfile.disableRemoteMethod("create", false);
UserProfile.disableRemoteMethod("upsert", false);
UserProfile.disableRemoteMethod("updateAll", true);
UserProfile.disableRemoteMethod("updateAttributes", true);

UserProfile.disableRemoteMethod("find", false);
UserProfile.disableRemoteMethod("findById", true);
UserProfile.disableRemoteMethod("findOne", true);

UserProfile.disableRemoteMethod("deleteById", true);

UserProfile.disableRemoteMethod("confirm", true);
UserProfile.disableRemoteMethod("count", true);
UserProfile.disableRemoteMethod("exists", true);
UserProfile.disableRemoteMethod("resetPassword", true);
UserProfile.disableRemoteMethod("createChangeStream", true);

UserProfile.disableRemoteMethod('__count__accessTokens', false);
UserProfile.disableRemoteMethod('__create__accessTokens', true);
UserProfile.disableRemoteMethod('__delete__accessTokens', false);
UserProfile.disableRemoteMethod('__destroyById__accessTokens', false);
UserProfile.disableRemoteMethod('__findById__accessTokens', true);
UserProfile.disableRemoteMethod('__get__accessTokens', true);
UserProfile.disableRemoteMethod('__updateById__accessTokens', true);

*/
UserProfile.on('resetPasswordRequest', function (info) {
    //var User = app.models.user;
  console.log(info.email); // the email of the requested user
  console.log(info.accessToken.id); // the temp access token to allow password reset
 
  // requires AccessToken.belongsTo(User)
  UserProfile.update('password', info.password, function(err, user) {
          if (err) return res.sendStatus(404);
          console.log('> password change request processed successfully');
          res.status(200).json({msg: 'password change request processed successfully'});
        });
});


///////////////
UserProfile.requestCode = function(credentials, fn) {
       console.log('Two factor code for ' + credentials.email + ': ' + credentials.password);
        var self = this,
            now = (new Date()).getTime(),
            defaultError = new Error('login failed');
        
        defaultError.statusCode = 401;
        defaultError.code = 'LOGIN_FAILED';
        
        if (!credentials.email || !credentials.password) {
            return fn(defaultError);
        }
        
        self.findOne({where: { email: credentials.email }}, function(err, user) {
            if (err) {
                return fn(defaultError);
            } else if (user) {
                user.hasPassword(credentials.password, function(err, isMatch) {
                    if (err) {
                        return fn(defaultError);
                    } else if (isMatch) {
                        
                        var code = speakeasy.totp({secret: 'APP_SECRET' + credentials.email});
                        
                        console.log('Two factor code for ' + credentials.email + ': ' + code);
                        
                        // [TODO] hook into your favorite SMS API and 
                        //        send your user the code!
                        
                        fn(null, now);
                        
                    } else {
                        return fn(defaultError);
                    }
                });
            } else {
                return fn(defaultError);
            }
        });
    };

//---------Start-----------------------------------------------------
//below method is used to  post ads in database
//--------------------------------------------------------------
UserProfile.insert = function(username,password,email,phone_no,college_id,course_id,university_id,cb) {
 var msg="";
 var errorJson;
if(isBlank(username)||isBlank(email)||isBlank(phone_no)||isBlank(password))
{

  if(isBlank(username))
  {
     msg="username can't be blank ; ";
  }
  if (isBlank(email)) {
 msg=msg+"email can't be blank ; ";
}
  if(isBlank(phone_no))
  {
    msg=msg+"phone_no can't be blank ; ";
  }
  if(isBlank(password))
  {
    msg=msg+"password can't be blank ; ";
  }

errorJson = {
      "name": "ValidationError",
      "status": 422,
      "message": msg,
      "statusCode": 422
      };


return cb(errorJson, null);
}else
{
  if (!isBlank(email)) {
if (!validator.isEmail(email)) {


msg=msg+" Must provide a valid email ";
errorJson = {
      "name": "ValidationError",
      "status": 422,
      "message": msg,
      "statusCode": 422
      };

return cb(errorJson, null);
}
}





}




UserProfile.create({
      // id: 1, // do not pass a seq, to let mongodb generate a number
    username: username,
    password: password,
    email: email,
    phone_no: phone_no,
    college_id:college_id,
    Course_id:course_id,
    university_id:university_id
    }, function(err, UserProfile) {
var output = UserProfile;


errorJson = {
      "name": "Error",
      "status": 422,
      "message": "no records inserted",
      "statusCode": 422,
      "code": "MODEL_NOT_FOUND  ",
      };
if (err) {
  var errparse="";
console.log("main Error"+  err.toString() );
//Email already exists  erro


  emailerr=err.toString();
  var start = emailerr.indexOf("Email already exists");
  if(start!=(-1))
  {
  errparse="Email ID already exists";
  }
  //User already exists  erro

    var usrstart = emailerr.indexOf("User already exists");

    if(usrstart!=(-1))
    {
    errparse=errparse+ " "+"User Name already exists";
    }



errorJson.message=errparse;

        cb(errorJson, null);
      }
     else
          {
            //var ads_id=UserProfile.id;
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










console.log(username);
        cb(null, output);
      }

});



}








//---------end-----------------------------------------------------
//below method is used to  post ads in database
 UserProfile.remoteMethod(
        'requestCode',
        {
            description: 'Request a two-factor code for a user with email and password',
            accepts: [
                {arg: 'credentials', type: 'object', required: true, http: {source: 'body'}}
            ],
            returns: {arg: 'timestamp', type: 'string'},
            http: {verb: 'post'}
        }
    );

UserProfile.remoteMethod (
        'insert',
        {
          http: {path: '/insert', verb: 'post',source: 'path'},
          accepts: [
              {arg: 'username', type: 'string' },
              {arg: 'password', type: 'string' },
              {arg: 'email',    type: 'string' },
              {arg: 'phone_no', type: 'string' },

              {arg: 'college_id', type: 'string' },
              {arg: 'course_id', type: 'string' },
              {arg: 'university_id', type: 'string' }
          ],
          returns: {arg: 'user', root: true, type: 'object'},
          description: "Create a new instance of the model and persist it into the data source"
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
