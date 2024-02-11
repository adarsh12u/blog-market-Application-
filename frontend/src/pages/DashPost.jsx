import React from 'react'
import { Modal, Table, Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from 'axios';
import { customurl } from '../axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const DashPost = () => {

  const { isLoading, data, isError } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const { data } = await axios.get(`${customurl}post/getpost`)
      return data;
    },
  });
    const { user } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState(data ? {...data}.posts : []);
 
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');
 useEffect(()=>{
   if(data){
      
        setUserPosts({...data}.posts)
        if({...data}.posts.length < 9)setShowMore(false)
      }
 },[data])

  
    const handleShowMore = async () => {
      const startIndex = userPosts.length;

      const res = await axios.get(`${customurl}post/getpost?userId=${user._id}&startIndex=${startIndex}`).then((res)=>{
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }  
      }).catch((err)=>{
             console.log(err)

      })

    };
  



     const handleDeletePost = () => {
       

      const queryClient = useQueryClient();
  
      const { mutate : deleteTask } = useMutation({
          mutationFn : ( { postid  , userid} ) =>{
              return axios.delete(`${customurl}post/deletepost/${postid}/${userid}`)
          },
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post'] });
          },
      })
  
  return {deleteTask}
  };

const {deleteTask} = handleDeletePost();
if(isLoading){
  return <div className='flex justify-center items-center min-h-screen'>

   <Spinner size={'xl'}/>

  </div>
}

    return (
      <div className={` table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 `}>
  
        {user.isAdmin &&userPosts.length > 0 ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head className=' bg-gray-500'>
                <Table.HeadCell className=' bg-gray-200'>Date updated</Table.HeadCell>
                <Table.HeadCell className=' bg-gray-200'>Post image</Table.HeadCell>
                <Table.HeadCell className=' bg-gray-200'>Post title</Table.HeadCell>
                <Table.HeadCell className=' bg-gray-200'>Category</Table.HeadCell>
                <Table.HeadCell className=' bg-gray-200'>Delete</Table.HeadCell>
                <Table.HeadCell className=' bg-gray-200'>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {userPosts.map((post , index) =>{ 
                
                 if(post.file.includes('pdf')){
                    post.image = 'https://www.freeiconspng.com/uploads/pdf-icon-9.png'
                 }
              else if(post.file.includes('txt')){
                    post.image = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Ftxt-file&psig=AOvVaw0Mdy1qrdbCfZxDIS_zn9cN&ust=1707118178479000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKjexPeUkYQDFQAAAAAdAAAAABAE'
              }else {post.image = post.file}
              
                return (
                <Table.Body key={index} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className='w-20 h-12  rounded-md bg-gray-500'
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className='font-medium text-gray-900 dark:text-white'
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className='text-teal-500 hover:underline'
                        to={`/update-post/${post._id}`}
                      >
                        <span>Edit</span>
                      </Link>
          
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              )})}
            </Table>
            {showMore && (
              <button
                onClick={handleShowMore}
                className='w-full text-teal-500 self-center text-sm py-7'
              >
                Show more
              </button>
            )}
          </>
        ) : (
          <p>You have no posts yet!</p>
        )}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this post?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button gradientDuoTone={"purpleToBlue"}  onClick={()=>{deleteTask({postid:postIdToDelete , userid : user._id})
                  setShowModal(false)
                 }}>
                  Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      
    );
}

export default DashPost