import { React, useState, useContext, useEffect } from "react";
import { addcomment, addlike } from "../utils/AuthService";
import { Context } from "../usecontext/Usecontext";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const { useronline, setRenderPost } = useContext(Context);
  const [openComments, setOpenComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState([]);

  async function handlenewcomment() {
    await addcomment({
      id: post._id,
      comments: [
        ...post.comments,
        { commentofuser: newComment, usercommented: useronline._id },
      ],
    });
    setRenderPost((prev) => !prev);
  }
  function handlelike() {
    console.log(likes);
    if (likes.includes(useronline._id)) {
      console.log(likes);
      console.log(useronline._id);
      setLikes(likes.filter((like) => like !== useronline._id));
    } else {
      setLikes((prev) => [...prev, useronline._id]);
    }
  }

  useEffect(() => {
    setLikes(post.likes);
  }, []);

  function updatelikes(func, delay) {
    let timeoutId;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func();
      }, delay);
    };
  }
  const debounceSearch = updatelikes(async () => {
    await addlike({ id: post._id, likes: likes });
  }, 3000);
  useEffect(() => {
    debounceSearch();
  }, [likes]);

  return (
    <div>
      <Link to={`/connected/userprofile/${post.usercreated._id}`}>
        <div className="flex m-4">
          <img
            className="rounded-full h-6 me-3 sm:h-7"
            src={post.usercreated.userimgurl}
            alt={post.usercreated.username}
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            {post.usercreated.username}
          </span>
        </div>
      </Link>
      <div>
        <span className="dark:text-white ml-4">{post.posttext}</span>
        <div className="flex flex-col items-center">
          {post.imgurl && (
            <img className="p-4 w-1/2" src={post.imgurl} alt="postimg" />
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handlelike()}
          type="button"
          className="flex w-1/5 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          <svg
            height={"20px"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="#ffffff"
              d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
            />
          </svg>
          <span className="ml-7">{likes.length} like</span>
        </button>
        <button
          onClick={() => setOpenComments((prev) => !prev)}
          type="button"
          className="flex w-1/5 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          <svg
            height={"20px"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="#ffffff"
              d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"
            />
          </svg>
          <span className="ml-5">comment</span>
        </button>
      </div>

      {openComments && (
        <div>
          <div className="flex justify-center">
            <input
              className=" text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
            />
            <button
              className=" text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
              onClick={() => handlenewcomment()}
            >
              add comment
            </button>
          </div>
          <div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {post.comments.map((comment, index) => (
                <Link
                  to={`/connected/userprofile/${comment.usercommented._id}`}
                >
                  <li
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    key={index}
                  >
                    <div>
                      <div className="flex">
                        {comment.usercommented.userimgurl ? (
                          <img
                            className="rounded-full h-6 me-3 sm:h-7"
                            src={comment.usercommented.userimgurl}
                            alt={comment.usercommented.username}
                          />
                        ) : (
                          <img
                            className="rounded-full h-6 me-3 sm:h-7"
                            src="data:image/png;base64,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"
                            alt={comment.usercommented.username}
                          />
                        )}

                        <span>{comment.usercommented.username}</span>
                      </div>
                      <span className="ml-10">{comment.commentofuser}</span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}

      <hr />
    </div>
  );
}
