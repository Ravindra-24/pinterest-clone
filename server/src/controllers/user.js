import { Post, User } from "../db";
import logger from "../logger";
import  cloudinary  from "../utils/cloudinary";

export const getUser = async (req, res) => {
  try {
    // const {
    //   user: { id },
    // } = req;
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "verified", success: true, data: user });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message, success: false });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const posts = await Post.find({ user: id }).select("_id image");

    return res
      .status(200)
      .json({ message: "fetched user posts", success: true, data: posts });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message, success: false });
  }
};

export const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      user: { id },
    } = req;

    if (userId === id) {
      return res.status(400).json({ message: "something went wrong" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const currentUser = await User.findById(id);
    const index = user.followers.findIndex((item) => item == id);
    const currentUserIndex = currentUser.following.findIndex(
      (id) => id == userId
    );
    if (index == -1 && currentUserIndex == -1) {
      user.followers.push(id);
      currentUser.following.push(userId);
    } else {
      user.followers.splice(index, 1);
      currentUser.following.splice(currentUserIndex, 1);
    }

    await user.save();
    await currentUser.save();
    return res.status(200).json({ message: "sucess", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};

export const updateUser = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    
    const file = req.file;
    let profilePicture = null
    const { firstName, lastName, bio, phone } = req.body;
    if(file){
    const responseURL = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "users" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(file.buffer);
    });
     profilePicture = responseURL.secure_url;
  }
    
    await User.findByIdAndUpdate(id, {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(bio && { bio }),
      ...(phone && { phone }),
      ...(profilePicture && { profilePicture }),
    });
    return res
      .status(200)
      .json({ message: "Profile Updated Successfully", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};
