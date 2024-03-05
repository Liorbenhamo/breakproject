import { React, useContext, useState } from "react";
import { Context } from "../usecontext/Usecontext";
import { imageDb } from "../config/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { postcreate } from "../utils/AuthService";

function PostPage() {
  const { setUseronline, useronline } = useContext(Context);
  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState("");

  async function handleSubmit() {
    console.log(postText);
    console.log(useronline._id);
    const newpost = await postcreate({
      posttext: postText,
      imgurl: postImg,
      usercreated: useronline._id,
    });
    console.log(newpost);
  }
  const triggerFileInput = () => {
    document.getElementById("takingpostimg").click();
  };
  function handlechangepostimg(e) {
    const imgRef = ref(imageDb, `files/${v4()}`);
    uploadBytes(imgRef, e.target.files[0]).then((value) => {
      getDownloadURL(value.ref).then((url) => {
        console.log(url);
        setPostImg(url);
      });
    });
  }
  return (
    <div style={{ width: "45vw" }} className="text-white">
      <div>
        <h1 className="text-3xl font-semibold whitespace-nowrap dark:text-white">
          post creation
        </h1>
        <hr />
      </div>
      <div className="flex flex-row-reverse">
        <img
          src={useronline.userimgurl}
          className="rounded-full h-6 me-3 sm:h-7 mt-2"
          alt="img"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          {useronline.username}
        </span>
      </div>
      <textarea
        onChange={(e) => setPostText(e.target.value)}
        value={postText}
        className="bg-black border-black p-1 text-xl"
        style={{ outline: "none", width: "45vw", height: "30vh" }}
        placeholder={`what are you thinking about${useronline.firstname}`}
      ></textarea>
      <img
        onClick={() => triggerFileInput()}
        src="https://cdn2.iconfinder.com/data/icons/55-files-and-documents/512/Icon_6-512.png"
        alt="add image press here"
        style={{ width: "45vw", height: "45vh" }}
        className="pl-24"
      />
      <input
        onChange={(e) => handlechangepostimg(e)}
        style={{ display: "none" }}
        id="takingpostimg"
        type="file"
      />
      <input
        onClick={() => handleSubmit()}
        type="submit"
        style={{ width: "45vw" }}
        className="mt-3 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
      />
    </div>
  );
}

export default PostPage;
