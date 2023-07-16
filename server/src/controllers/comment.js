  import {Post, Comment} from '../db'
  import logger from '../logger';


  export const comment = async (req, res) => {
    try {
        //only the user who created the post can delete it and modrator
      const { id } = req.params;
      const {commentText, userId} =req.body
      const comment = await Comment.create({
        commentText,
        user:userId,
      })
      const updatedPost = await Post.findByIdAndUpdate(id,{
        $push: {
          comments:comment._id
        }
      },{
        new:true
      })
      return res.status(200).json({
        message: "comment post successfully",
        success: true,
        data: updatedPost,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  };


  export const deleteComment = async (req, res) => {
    try {
     const {postId, commentId} = req.params;
     await Comment.findByIdAndDelete(commentId)
     const updatedPost = await Post.findByIdAndUpdate(postId,{
        $pull: {
            comments :commentId
        }
     })
      return res.status(200).json({
        message: "comment deleted successfully",
        success: true,
        data: updatedPost,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  };