import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    commentText : {
        type:String,
        required:true,
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    post : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
    },
    likes : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
},{
    timestamps:true,
})

export const Comment = mongoose.model('Comment',CommentSchema);