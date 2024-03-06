import React, { useEffect, useState, useContext } from "react";
import { allposts } from "../utils/AuthService";
import Post from "../components/Post";
import { Context } from "../usecontext/Usecontext";

function HomePage() {
  const { renderPost } = useContext(Context);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getallposts() {
      const takenposts = await allposts();
      console.log(takenposts.data);
      setPosts(takenposts.data);
    }
    getallposts();
  }, [renderPost]);
  return (
    <div className="text-white">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}

export default HomePage;
