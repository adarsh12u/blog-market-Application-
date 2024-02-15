
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {  useQuery } from "@tanstack/react-query";
import axios from "axios";
import { customurl } from "../axios";
import Comment from "./Comment";

const ShowComment = ({ postId }) => {
  const [showcomments, setshowcommetnts] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: [postId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${customurl}comment/getcomment/${postId}`
      );
      return data;
    },
  });
  const { user } = useSelector((state) => state.user);
  if (!user) {
    return (
      <div>
        <h1 className="text-lg md:text-4xl">
          you are not allow to see comment , firstly you have to login
        </h1>
      </div>
    );
  }

  if (isLoading) {
    return <div>loading....</div>;
  }
  return (
    <>
      <h1
        className=" text-center cursor-pointer text-blue-500"
        onClick={() => setshowcommetnts(true)}
      >
        {" "}
        {data.length > 0 && showcomments === false ? "show comment" : ""}{" "}
      </h1>

      {data && data.length > 0 ? (
        showcomments && (
          <div className=" w-full rounded-lg">
            {data.map((comment) => {
              return (
                <Comment
                  key={comment._id}
                  comment={comment}
                  setshowcommetnts={setshowcommetnts}
                />
              );
            })}
          </div>
        )
      ) : (
        <div>No comments</div>
      )}
      <h1
        className=" text-center cursor-pointer text-blue-500 mt-3"
        onClick={() => setshowcommetnts(false)}
      >
        {" "}
        {showcomments === true ? "close all" : ""}{" "}
      </h1>
    </>
  );
};

export default ShowComment;
