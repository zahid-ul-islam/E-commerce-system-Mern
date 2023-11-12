const {body} = require('express-validator')

const validateUserRegistration = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({min:3, max:31})
    .withMessage("name should be at least 3 to 31 characters"),

    body('email')
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),

    body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:6})
    .withMessage('password should be at least 6 characters'),

    body('address')
    .trim()
    .notEmpty()
    .withMessage("address is required"),

    body('phone')
    .trim()
    .notEmpty()
    .withMessage('phone number is required'),

    body('image')
    .custom((value, {req})=>{
        if(!req.file || !req.file.buffer){
            throw new Error('user image is required')
        }
        return true
    })
    .withMessage('user image is required')
    

]

module.exports = validateUserRegistration