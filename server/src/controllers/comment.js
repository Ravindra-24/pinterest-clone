import { Post, Comment, User } from "../db";
import logger from "../logger";

export const comment = async (req, res) => {
  try {
    //only the user who created the post can delete it and modrator
    const { id } = req.params;
    const { commentText, userId } = req.body;
    const comment = await Comment.create({
      commentText,
      user: userId,
    });
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: comment._id,
        },
      },
      {
        new: true,
      }
    );
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

export const updateCommentLike = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { postId } = req.params;
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      return res.status(404).json({
        message: "comment not found",
        success: false,
      });
    }

    const userIndex = comment.likes.findIndex(
      (id) => id == user._id.toString()
    );
    if (userIndex != -1) {
      comment.likes = comment.likes.filter((id) => id != user._id.toString());
    } else {
      comment.likes.push(user._id.toString());
    }

    await comment.save();
    return res.status(200).json({
      message: "Liked successfully",
      success: true,
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { postId } = req.params;

    const comment = await Comment.findOne({ _id: commentId });
    if (comment.user._id != req.user.id) {
      return res.status(401).json({
        message: "You are not authorized to delete this comment",
        success: false,
      });
    }

    await Comment.findByIdAndDelete(commentId);
    const updatedPost = await Post.findByIdAndUpdate(postId, {
      $pull: {
        comments: commentId,
      },
    });
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
