import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../redux/action/user";
import ColorfulLoader from "../../layout/spinner/spinner";
import ImageCrop from "./croper/ImageCrop";
import { useNavigate, useParams } from "react-router";
import withPrivate from "../../hoc/withPrivate";
import Modal from "../../layout/Modal/Modal";

const EditProfile = ({ setProgress }) => {
  const [loading, setLoading] = useState(false);
  const [cropLoading, setCropLoading] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [image, setImage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authReducer.user);
  const user = useSelector((state) => state.userReducer.user);

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
    try {
      e.preventDefault();
      setLoading(true);
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

  const toggleCrop = () => {
    setOpenCrop(!openCrop);
  }

  useEffect(() => {
    dispatch({type:"GET_USER", payload:null})
    dispatch(getUser(auth.id, setLoading));
  }, []);
  return (
    <>
    <Modal open={openCrop} setOpen={toggleCrop}>
    <ImageCrop
                setProfilePicture={setProfilePicture}
                profilePicture={profilePicture}
                setImage={setImage}
                setOpenCrop={setOpenCrop}
                setCropLoading={setCropLoading}
              />
              </Modal>
      {user ? (
        <div className="max-w-screen-lg mx-auto p-4 bg-gray-200 dark:bg-slate-900 rounded mt-20 mb-2">
          <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {openCrop ? (
              <></>
            ) : (
              <>
                <div className="flex items-center justify-center flex-col md:flex-row md:items-center md:space-x-6 ">
                  <div className="flex flex-col">
                    {user.profilePicture === null ? (
                      <>
                        {profilePicture === null ? (
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
                      </>
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
                  >{
                    cropLoading ? <>
                    {" "}
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-5 h-5 mr-3 text-gray-800 animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="white"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Select
                  </> : "Upload"
                  }
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
                disabled={loading || cropLoading}
                onClick={handleCancel}
                type="button"
                className="mr-2 text-sm font-semibold leading-6 text-gray-900 dark:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || openCrop || cropLoading}
                className=" max-w-30 md:w-auto text-white focus:ring-4 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none  active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600"
              >{
                loading ? <>
                {" "}
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-5 h-5 mr-3 text-gray-800 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="white"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Saving...
              </> : "Save Changes"
              }
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
