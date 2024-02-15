import React from "react";
import { Table,  Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { customurl } from "../axios";

const DashComment = () => {
  const { user } = useSelector((state) => state.user);
  
  const [usercomments, setUsercomments] = useState(
    []
    );
    
    const[isLoading , setisLoading] = useState(true);
    useEffect(()=>{
      
     axios.get(
        `${customurl}comment/getallcomments/${user.isAdmin}`
      ).then((res)=>{
            setisLoading(false);
          
            setUsercomments(res.data.comments);
      })
    .catch((error)=>{
         console.log(error)
    })
   
    },[])
   
  const [post, setpost] = useState();
  const [showMore, setShowMore] = useState(true);
 
  useEffect(() => {
   
    if (usercomments.length > 0) {
      
      axios
        .get(`${customurl}post/getpost`)
        .then((res) => {
     
          setpost(res.data.posts);
        })
        .catch((err) => {
          console.log(err);
        });
        
      if (usercomments.length < 9) setShowMore(false);
    }
  }, [usercomments]);
  const handleShowMore = async () => {
    const startIndex = usercomments.length;

    const res = await axios
      .get(
        `${customurl}comment/getallcomments/${user.isAdmin}?userId=${user._id}&startIndex=${startIndex}`
      )
      .then((res) => {
        setUsercomments((prev) => [...prev, ...usercomments]);
        if (usercomments.length < 9) {
          setShowMore(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading || !post ) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size={"xl"} />
      </div>
    );
  }
 
  return (
    <div
      className={` table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 `}
    >
      {user.isAdmin && usercomments.length > 0 && post && post.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head className=" bg-gray-500">
              <Table.HeadCell className=" bg-gray-200">Date</Table.HeadCell>
              <Table.HeadCell className=" bg-gray-200">Post</Table.HeadCell>
              <Table.HeadCell className=" bg-gray-200">comment </Table.HeadCell>
              <Table.HeadCell className=" bg-gray-200">UserID</Table.HeadCell>
              <Table.HeadCell className=" bg-gray-200">
                No. of likes
              </Table.HeadCell>
            </Table.Head>
            {usercomments.map((comment, index) => {
              return (
                <Table.Body key={index} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        className="w-24 h-12 object-cover rounded-md "
                        src={
                          post.filter((value) => {
                            return value._id === comment.postId;
                          })[0].file
                        }
                        alt=""
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <h1 className="">{comment.content}</h1>
                    </Table.Cell>
                    <Table.Cell>{comment.userId}</Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no comments yet!</p>
      )}
    </div>
  );
};

export default DashComment;
