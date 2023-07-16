import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    role:{
        type:Number,
        default:0,
        // 0: normal user
        // 1: moderator
        // 2 admin
    },
    disabled:{
        type:Boolean,
        default:false,
    },
    lastLogin:{
        type:Date,
        required:false,
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    posts : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
    }],
    comments : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
    }],
}, {
    timestamps:true,
})

userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})

export const User = mongoose.model('User', userSchema)