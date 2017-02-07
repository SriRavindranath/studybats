
var models = require('../../server/model-config.json');
var loopback = require('loopback');
var app = loopback();

var CONTAINERS_URL = '/api/containers/';
module.exports = function(File) {

    File.upload = function (ctx,options,cb) {
        if(!options) options = {};
        ctx.req.params.container = 'common';
         var app = require('../server');
var container = app.models.container;

      container.upload(ctx.req,ctx.result,options,function (err,fileObj) {
            if(err) {
                cb(err);
            } else {
                var imagesURL="";
fileObj.files.file.forEach(function(entry) {
image=CONTAINERS_URL+entry.container+'/download/'+entry.name;

imagesURL=imagesURL+";"+image;
});
if(imagesURL.substr(0,1)==";")
{
    imagesURL=imagesURL.substring(1,imagesURL.length)
}
console.log("imagesURL "+imagesURL+ctx.arg);
var book_id=fileObj.fields.book_id[0];
var image_id;
console.log("image name  "+fileObj.fields.book_id[0]);
                var fileInfo = fileObj.files.file[0];
                File.create({
                    name: fileInfo.name,
                    type: fileInfo.type,
                    container: fileInfo.container,
                    url: imagesURL
                },function (err,obj) {
                    if (err !== null) {
                        cb(err);
                    } else {
                        image_id=obj.id;
                       console.log("image id  "+obj.id); 

Notes=app.models.Notes;
var ds = Notes.dataSource;
      var sql = "UPDATE `studybats`.`notes` SET image_id=?  where id=?";
     console.log("Query"+sql.toString())

      ds.connector.query(sql, [image_id,book_id], function (err, Notes) {

          if (err) console.error(err);
      });





                        cb(null, obj);
                    }
                });
            }
        });
    };

    File.remoteMethod(
        'upload',
        {
            description: 'Uploads a file',
            accepts: [
                { arg: 'ctx', type: 'object', http: { source:'context' } },
                { arg: 'options', type: 'object', http:{ source: 'query'} }
            ],
            returns: {
                arg: 'fileObject', type: 'object', root: true
            },
            http: {verb: 'post'}
        }
    );

};