module.exports = app => {

    const Jimp = require("jimp");

    const router = require("express").Router();

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      
      next();
    });

    app.use("/api/v1", router);

    app.get('/resize', (req, res) => {

        Jimp.read(req.imgurl, (err,img) => {
          if (err) throw err;
          img.resize(50, 50).getBase64( Jimp.AUTO , (err, img64) => {
              if(err) throw err;

              res.send('<img src="'+img64+'">')
          });
        });
    });

}