
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
console.log("imagesURL "+imagesURL);

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