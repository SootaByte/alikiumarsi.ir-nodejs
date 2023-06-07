const {check} = require('express-validator');
class registerValidator {
    handle() {
        return [
            check('name')
                .isLength({min : 5})
                .withMessage('نام کاربری خود را وارد نمایید'),
            check('email')
                .isEmail()
                .withMessage('ایمیل وارد شده معتبر نمی‌باشد'),
            check('password')
                .isLength({min : 6})
                .withMessage('رمز عبور وارد شده باید حداقل 6 کاراکتر باشد.')
        ];
    }
}

module.exports = new registerValidator();