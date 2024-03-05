import { React, useRef, useContext, useState } from "react";
import { Context } from "../usecontext/Usecontext";
import { useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imageDb } from "../config/config";
import { updateuser } from "../utils/AuthService";

function UserDetails() {
  const { setUseronline, useronline } = useContext(Context);

  const form = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    url: "",
    url2: "",
  });

  const triggerFileInput = () => {
    document.getElementById("themeUpload").click();
  };
  function handlechangetheme(e) {
    console.log("ok");
    const imgRef = ref(imageDb, `files/${v4()}`);
    uploadBytes(imgRef, e.target.files[0]).then((value) => {
      getDownloadURL(value.ref).then((url) => {
        console.log("lior");
        console.log(url);
        setValue("url2", url, {
          shouldValidate: true,
          shouldDirty: true,
        });
      });
    });
  }
  const triggerFileInput2 = () => {
    document.getElementById("imgUpload").click();
  };
  function handlechangeimg(e) {
    const imgRef = ref(imageDb, `files/${v4()}`);
    uploadBytes(imgRef, e.target.files[0]).then((value) => {
      getDownloadURL(value.ref).then((url) => {
        console.log("lior");
        console.log(url);
        setValue("url", url, {
          shouldValidate: true,
          shouldDirty: true,
        });
      });
    });
  }

  const onSubmit = async (data) => {
    console.log("hi");
    console.log(data);
    const newUser = await updateuser({ ...data, email: useronline.email });
    console.log(newUser);
  };

  return (
    <div style={{ width: "45vw" }} className="text-white">
      <form ref={form} onSubmit={handleSubmit(onSubmit)} className="formlogin">
        <div className=" flex justify-between">
          <h1 className="text-3xl font-semibold whitespace-nowrap dark:text-white">
            Edit profile
          </h1>
          <input
            type="submit"
            className=" text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
          />
        </div>
        <hr />

        <img
          onClick={() => triggerFileInput()}
          className="max-h-48 w-full"
          src={useronline.themeimgurl}
          alt="background photo"
        />

        <img
          onClick={() => triggerFileInput2()}
          className="m-4 rounded-full h-10 me-3 sm:h-32  transform -translate-y-16"
          src={useronline.userimgurl}
          alt="profile photo"
        />
        <div className="flex justify-around transform -translate-y-12">
          <div>
            <div>
              <label>Username:</label>
              <br />
              <input
                {...register("username")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder=""
                defaultValue={useronline.username}
                type="text"
              />
            </div>
            <div>
              <label>First Name:</label>
              <br />
              <input
                {...register("firstname")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                defaultValue={useronline.firstname}
                type="text"
              />
            </div>
            <div>
              <label>Last Name:</label>
              <br />
              <input
                {...register("lastname")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                defaultValue={useronline.lastname}
                type="text"
              />
            </div>
            <div>
              <label>Gender:</label>
              <br />
              <input
                {...register("Gender")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                defaultValue={useronline.gender}
                type="text"
              />
            </div>
          </div>
          <div>
            <div>
              <label>Location:</label>
              <br />
              <input
                {...register("location")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Location"
                defaultValue={useronline?.location}
                type="text"
              />
            </div>
            <div>
              <label>Bio:</label>
              <br />
              <textarea
                {...register("bio")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white resize-none"
                placeholder="bio"
                defaultValue={useronline?.bio}
                cols="30"
                rows="5"
              ></textarea>
            </div>
            <input
              style={{ display: "none" }}
              defaultValue={useronline?.userimgurl}
              {...register("url")}
              type="text"
            />
            <input
              style={{ display: "none" }}
              defaultValue={useronline?.themeimgurl}
              {...register("url2")}
              type="text"
            />
          </div>
        </div>
      </form>
      <input
        style={{ display: "none" }}
        id="themeUpload"
        onChange={(e) => handlechangetheme(e)}
        type="file"
      />
      <input
        style={{ display: "none" }}
        id="imgUpload"
        onChange={(e) => handlechangeimg(e)}
        type="file"
      />
    </div>
  );
}

export default UserDetails;
