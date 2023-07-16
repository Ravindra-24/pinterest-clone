import { Post, Comment } from "../db";
import logger from "../logger";

export const getPosts = async (req, res) => {
  try {
    const { pageNumber = 1 } = req.query;
    const offset = (pageNumber - 1) * 10;
    const posts = await Post.find()
      .limit(10)
      .skip(offset)
      .sort({ createdAt: -1 })
      .populate("user","firstName lastName email pofilePicture")
      .populate({
        path:"comments",
        populate: {
          path:"user",
          select: "firstName lastName email profilePicture"
        }
      });
    return res.status(200).json({
      message: "Post fetched successfully",
      success: true,
      data: posts,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({ _id: id });
    return res.status(200).json({
      message: "Post fetched successfully",
      success: true,
      data: post,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, discription, image, userId } = req.body;
    const post = await Post.create({ 
        title, 
        discription, 
        image, 
        user: userId,
    });
    return res.status(200).json({
      message: "Post fetched successfully",
      success: true,
      data: post,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};


export const deletePost = async (req, res) => {
    try {
        //only the user who created the post can delete it and modrator
      const { id } = req.params;
      const post = await Post.findOneAndDelete({ _id: id });
      return res.status(200).json({
        message: "Post deleted successfully",
        success: true,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        error: error.message,
        success: false,
      });
    }
  };

  