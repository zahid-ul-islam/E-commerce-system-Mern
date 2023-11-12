const {Schema,model} = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
    name: {
        type: String,
        required:[true, 'User name is required'],
        trim:true,
        maxlength: [31,'character exceed'],
        minlength: [3,'too short'],
    },
    email:{
        type: String,
        required:[true, 'User email is required'],
        trim:true,
        unique:true,
        lowercase:true,
        validate: {
            validator: function (v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message:'please enter a valid email'
        }
    },
    password:{
        type: String,
        required:[true, 'password is required'],
        minlength: [6,'too short'],
        set: (v)=> bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image:{
        type: Buffer,
        contentType: String,
        required: [true, 'user image is required']
       
    },
    address:{
        type: String,
        required:[true, 'User address is required'],
        
    },
    phone:{
        type: String,
        required:[true, 'User phone number is required'],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isBanned:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

const User = model('user',userSchema)
module.exports = User