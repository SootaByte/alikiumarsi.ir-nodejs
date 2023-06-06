const bodyParser = require('body-parser');
const User = require('./../../../models/users');
class registerController {
    showForm(req, res) {
        res.render('home/auth/register');
    }

    registerProcess(req, res) {
        const addUser = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        });

        addUser.save();
    }
}

module.exports = new registerController();