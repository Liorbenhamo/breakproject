import React from "react";

export default function ProfilePost({ useronline }) {
  console.log(useronline);
  return (
    <div>
      {useronline.posts.map((post) => (
        <div>
          <div className="flex m-4">
            <img
              className="rounded-full h-6 me-3 sm:h-7"
              src={useronline.userimgurl}
              alt={useronline.username}
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {useronline.username}
            </span>
          </div>
          <div>
            <span className="ml-4">{post.posttext}</span>
            <div className="flex flex-col items-center">
              {post.imgurl && (
                <img className="p-4 w-1/2" src={post.imgurl} alt="postimg" />
              )}
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
