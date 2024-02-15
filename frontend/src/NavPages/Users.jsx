import React from "react";
import { Modal, Table, Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";
import { customurl } from "../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCheck, FaTimes } from "react-icons/fa";

const Users = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${customurl}user/getusers?startIndex=0`
      );
      return data;
    },
  });
  const { user } = useSelector((state) => state.user);
  const [userusers, setUserusers] = useState(data ? { ...data }.users : []);

  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  useEffect(() => {
    if (data) {
      setUserusers({ ...data }.users);
      if ({ ...data }.users.length < 9) setShowMore(false);
    }
  }, [data]);

  const handleShowMore = async () => {
    const startIndex = userusers.length;

    const res = await axios
      .get(`${customurl}user/getusers?startIndex=${startIndex}`)
      .then((res) => {
        setUserusers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeletePost = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteTask } = useMutation({
      mutationFn: ({ postid, userid }) => {
        return axios.delete(`${customurl}user/${userid}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    });

    return { deleteTask };
  };

  const { deleteTask } = handleDeletePost();
  if(isLoading){
    return <div className='flex justify-center items-center min-h-screen'>
  
     <Spinner size={'xl'}/>
  
    </div>
  }

  return (
    <div
      className={` table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 `}
    >
      {user.isAdmin && userusers.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head className=" bg-gray-500">
              <Table.HeadCell className=" bg-gray-200">
                Date created
              </Table.HeadCell>
              <Table.HeadCell className=" bg-gray-200">UserName</Table.HeadCell>
              <Table.HeadCell className=" bg-gray-200">Email</Table.HeadCell>
              <Table.HeadCell className=" bg-gray-200">Admin</Table.HeadCell>
              <Table.HeadCell className=" bg-gray-200">
                Delete user
              </Table.HeadCell>
            </Table.Head>
            {userusers.map((post, index) => {
              return (
                <Table.Body key={index} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <h1> {post.username} </h1>
                    </Table.Cell>
                    <Table.Cell>
                      <h1>{post.email}</h1>
                    </Table.Cell>
                    <Table.Cell>
                      {post.isAdmin ? <FaCheck /> : <FaTimes />}
                    </Table.Cell>
                    <Table.Cell>
                      <button
                        disabled={user._id === post._id}
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </button>
                    </Table.Cell>
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
        <p>You have no users yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                gradientDuoTone={"purpleToBlue"}
                onClick={() => {
                  deleteTask({ postid: postIdToDelete, userid: user._id });
                  setShowModal(false);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Users;
