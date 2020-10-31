const db = require("../models");
const User = db.user;

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }


    const id = req.params.id;


    User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(data => {
        console.log(data);
        if (!data) {
        res.status(404).send({
            message: `User with id=${id} not found`
        });
        } else res.send({ message: "User details updated successfully." });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({
        message: "Error updating address for user with id=" + id
        });
    });



  
}
