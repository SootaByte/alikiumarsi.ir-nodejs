const bodyParser = require('body-parser');
const {validationResult} = require('express-validator');
const autoBind = require('auto-bind');
// import autoBind from 'auto-bind';
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const User = require('./../../../models/users');

class registerController {
    constructor() {
        autoBind(this);
        this.setRecaptcha();
    }

    setRecaptcha() {
        this.recaptcha = new Recaptcha('6Lc-yHcmAAAAAIkEgPicJI40NH_CinBlynx6RDgJ', '6Lc-yHcmAAAAAM17YF0Hvp-m_jzRXTyKI-Wfq2lc', { hl : 'fa' })
    }

    showForm(req, res) {
        res.render('home/auth/register', { messages : req.flash('errors'), recaptcha : this.recaptcha.render() });
    }

    registerProcess(req, res) {
        this.recaptcha.verify(req, (err) => {
            if(err) {
                req.flash('errors', 'گزینه من ربات نیستم را بزنید.');
                res.redirect('/auth/register');
            } else {
                const result = validationResult(req);
                if( !result.isEmpty() ) {
                    const errors = result.array();
                    const messages = [];
                    errors.forEach(err => messages.push(err.msg));
                    req.flash('errors', messages);

                    res.redirect('/auth/register');
                } else {
                    const addUser = new User({
                        name : req.body.name,
                        email : req.body.email,
                        password : req.body.password,
                    });
                }
            }
        });
        
        addUser.save();
        res.redirect('/');
    }
}

module.exports = new registerController();