import React, { useEffect, useState } from "react";
import withPrivate from "../../hoc/withPrivate";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../redux/action/user";
import ColorfulLoader from "../../layout/spinner/spinner";
import ImageCrop from "./croper/ImageCrop";
import { useNavigate, useParams } from "react-router";

const EditProfile = ({ setProgress }) => {
  const [loading, setLoading] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authReducer.user);
  const user = useSelector((state) => state.userReducer);

  const handlePreview = (e) => {
    setOpenCrop(true);
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.onload = () => {
      setProfilePicture(filereader.result);
      setImage(file);
    };
    filereader.readAsDataURL(file);
    // filereader
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      if (firstName === null || lastName === null)
        throw new Error("first and last name are required");
      const formData = new FormData();
      formData.append("image", image);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("bio", bio);
      formData.append("phone", phone);
      dispatch(updateUser(formData, id, navigate, setProgress, setLoading));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setBio("");
    setPhone("");
    setProfilePicture("");
    setImage(null);
    navigate(`/user/${id}`);
  };

  useEffect(() => {
    dispatch(getUser(auth.id, setLoading));
  }, []);
  return (
    <>
      {user ? (
        <div className="max-w-screen-lg mx-auto p-4 bg-gray-200 dark:bg-gray-800 rounded mt-2 mb-2">
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {openCrop ? (
              <ImageCrop
                setProfilePicture={setProfilePicture}
                profilePicture={profilePicture}
                setImage={setImage}
                setOpenCrop={setOpenCrop}
              />
            ) : (
              <>
                <div className="flex items-center justify-center flex-col md:flex-row md:items-center md:space-x-6 ">
                  <div className="flex flex-col">
                    {user.profilePicture === null ? (
                      <div
                        className="max-w-xs bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 rounded-full flex items-center text-sm focus:outline-none focus:shadow-solid"
                        id="user-menu"
                      >
                        <span className="rounded-full h-14 w-14 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user?.firstName?.charAt(0).toUpperCase()}
                            {user?.lastName?.charAt(0).toUpperCase()}
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className="">
                        <img
                          className="w-20 h-20 rounded-full  object-cover"
                          src={profilePicture || user.profilePicture}
                          alt="Profile"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      accept="image/*"
                      onChange={handlePreview}
                      className="sr-only"
                    />
                  </div>
                  <label
                    htmlFor="photo"
                    aria-required
                    className="mt-2 rounded-md text-white bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 px-2.5 py-1.5 text-sm font-semibold shadow-sm cursor-pointer"
                  >
                    Upload
                  </label>
                </div>
              </>
            )}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <label
                htmlFor="firstName"
                className="w-full md:w-32 font-semibold mb-2 md:mb-0 text-gray-900 dark:text-gray-50"
              >
                First Name:
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                id="firstName"
                required
                value={firstName || user?.firstName}
                className="w-full md:flex-grow border rounded p-2 focus:ring focus:ring-yellow-300 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
                placeholder="John"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <label
                htmlFor="lastName"
                className="w-full md:w-32 font-semibold mb-2 md:mb-0 text-gray-900 dark:text-gray-50"
              >
                Last Name:
              </label>
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName || user?.lastName}
                required
                type="text"
                id="lastName"
                className="w-full md:flex-grow border rounded p-2 focus:ring focus:ring-yellow-300 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
                placeholder="Doe"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <label
                htmlFor="email"
                className="w-full md:w-32 font-semibold mb-2 md:mb-0 text-gray-900 dark:text-gray-50"
              >
                Email:
              </label>
              <input
                disabled={true}
                value={user?.email}
                type="email"
                id="email"
                className="w-full md:flex-grow border rounded p-2 focus:ring focus:ring-yellow-300 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
                placeholder="johndoe@example.com"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <label
                htmlFor="phoneNumber"
                className="w-full md:w-32 font-semibold mb-2 md:mb-0 text-gray-900 dark:text-gray-50"
              >
                Phone Number:
              </label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone || user?.phone}
                type="tel"
                id="phoneNumber"
                className="w-full md:flex-grow border rounded p-2 focus:ring focus:ring-yellow-300 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
                placeholder="Optional"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <label
                htmlFor="bio"
                className="w-full md:w-32 font-semibold mb-2 md:mb-0 text-gray-900 dark:text-gray-50"
              >
                Bio:
              </label>
              <textarea
                onChange={(e) => setBio(e.target.value)}
                value={bio || user?.bio}
                id="bio"
                className="w-full md:flex-grow border rounded p-2 focus:ring focus:ring-blue-300 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
                rows="4"
                placeholder="Tell something about yourself..."
              ></textarea>
            </div>
            <div className="flex m-5 justify-end">
              <button
                disabled={loading}
                onClick={handleCancel}
                type="button"
                className="mr-2 text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || openCrop}
                className=" max-w-30 md:w-auto text-white focus:ring-4 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none  active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        <ColorfulLoader />
      )}
    </>
  );
};

export default withPrivate(EditProfile);
