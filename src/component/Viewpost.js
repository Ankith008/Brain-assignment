import React, { useState, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Card from "./Card";
// import "../css/Viewpost.css";
import CreateContext from "../Context/CreateContext";
import { useNavigate } from "react-router-dom";

export default function Viewpost() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { setalerthead, setalertdesc, setshowalert } =
    useContext(CreateContext);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/post/getpost/${page}`,

        {
          headers: {
            braintoken: localStorage.getItem("BrainToken"),
          },
        }
      );
      const json = await res.data;
      if (res.data && Array.isArray(res.data.posts)) {
        res.data.posts.forEach((post) => {
          setPosts((prevPosts) => {
            if (prevPosts.find((p) => p._id === post._id)) {
              return prevPosts;
            }
            return [...prevPosts, post];
          });
        });

        setPage(page + 1);
        if (res.data.length === 0) {
          setHasMore(false);
        }
      } else {
        setalerthead("Error");
        setalertdesc("Please Authenticate First");
        setshowalert(true);
      }
    } catch (error) {
      console.error(error);
      setalerthead("Error");
      setalertdesc("Please Authenticate First");
      setshowalert(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="viewouter bg-[#1a1d2e] flex justify-center items-center flex-col min-h-screen">
      <p
        className="back absolute top-[30px] left-[30px] text-[white] underline text-[1.2rem] cursor-pointer"
        onClick={() => navigate("/")}
      >
        Home
      </p>
      <h1 className="post text-[white] m-[20px] uppercase text-[2.6rem] underline">
        Posts
      </h1>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
      >
        <div className="postser flex justify-center items-center flex-wrap gap-[20px] p-[20px]">
          {posts.map((post) => (
            <Card
              key={post._id}
              profile={post.profile}
              title={post.title}
              dec={post.description}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
