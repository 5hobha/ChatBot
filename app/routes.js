'use strict';

var dialog = require('./controllers/dialogflow');
//     config = require('./../../config/config'),
//     ads = require('./../controllers/admin/AdsController');

module.exports = function(app, io, router) {
    //router.post('/getAllAdBrand', ads.getAllAdsOfBrand);
   // console.log("udhsfd")
    io.on('connection', dialog.dialogChat);
        // function(socket) {
    	// console.log("socket connected");
        // // socket.emit('news', {
        // //     hello: 'world'
        // // });
        // // socket.on('my other event', function(data) {
        // //     console.log("",data);
        // // });
        // socket.on('new-message', (message) => {
        //     console.log(message);
        //     // runSample("Hi").then(function(resp) {
        //     //     console.log("resp--->>",resp.Response);
        //         socket.emit('reply-message', "Welcome");
        //     // }).catch(function(errr) {
        //     //     console.log("errr---->>>", errr);
        //     // })
        
            
        // });
   
     router.get('/check', function(req, res) {
         console.log("ebfgjhdgregregfregf")
         res.send("responseffgtrytryhtuytu")
     });
};
