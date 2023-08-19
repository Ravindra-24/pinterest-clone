import { Post, Comment, User } from "../db";
import logger from "../logger";
import { validationResult } from "express-validator";
import axios from "axios";

export const getPosts = async (req, res) => {
  try {
    const { _page = 1, _limit = 20, _search } = req.query;

    if (_search && _search.length > 0) {
      const posts = await Post.find({
        title: { $regex: _search, $options: "i" },
      })
        // await Post.find({$text: {$search: _search}})
        .limit(_limit)
        .skip((_page - 1) * 10)
        .sort({ createdAt: -1 })
        .populate("user");
      return res.status(200).json({
        message: "Posts fetched successfully",
        success: true,
        data: posts,
      });
    }

    // page size = 10
    const offset = (_page - 1) * 10;
    const posts = await Post.find()
      .limit(_limit)
      .skip(offset)
      .sort({ createdAt: -1 })
      .populate("user");
    // .select("title description image createdAt user comments id")
    //   .populate("comments", "commentText user");
    // .populate({
    //   path: "comments",
    //   populate: {
    //     path: "user",
    //     select: "firstName lastName email profilePicture",
    //   },
    // });
    return res.status(200).json({
      message: "Posts fetched successfully",
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
    const post = await Post.findOne({ _id: id })
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "firstName lastName email profilePicture",
        },
      });
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      return res.status(400).json({
        errors: errors.array(),
        success: false,
      });
    }
    const {
      user: { id },
    } = req;
    const { title, description } = req.body;
    const file = req.file;
    const responseURL = await axios.post(
      `https://api.upload.io/v2/accounts/${process.env.UPLOAD_IO_ACCOUNT_ID}/uploads/binary`,
      file.buffer,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPLOAD_IO_API_KEY}`,
        },
      }
    );
    // console.log(responseURL);
    const post = await Post.create({
      title,
      description,
      image: responseURL.data.fileUrl,
      user: id,
    });
    return res.status(200).json({
      message: "Post created successfully",
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

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    // console.log(id, title, description);
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    if (post.user._id.toString() !== req.user.id) {
      return res.status(401).json({
        message: "You are not authorized to update this post",
        success: false,
      });
    }
    await Post.findByIdAndUpdate(id, {
      ...(title && { title }),
      ...(description && { description }),
    });
    const updatedPost = await Post.findById(id).populate("user");
    // post.title = title;
    // post.description = description;
    // await post.save();
    return res.status(200).json({
      message: "Post updated successfully",
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

export const updatePostLikes = async (req, res) => {
  try {
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

    const userIndex = post.likes.findIndex((id) => id == user._id.toString());
    if (userIndex != -1) {
      post.likes = post.likes.filter((id) => id != user._id.toString());
    } else {
      post.likes.push(user._id.toString());
    }

    await post.save();
    return res.status(200).json({
      message: "Post updated successfully",
      success: true,
      data: post,
    });
  } catch (error) {
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
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    if (post.user._id.toString() !== req.user.id) {
      return res.status(401).json({
        message: "You are not authorized to delete this post",
        success: false,
      });
    }
    await Post.findByIdAndDelete(id);

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
