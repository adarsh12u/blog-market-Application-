

import { customurl } from "../axios";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import axios from 'axios'
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import { toast } from "react-toastify";

import {app} from '../firebase'
const  UpdatePost = ()  => {
  const {id} =  useParams();

  
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setFileUploadProgress] = useState(null);
  const [imageUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title:'',
    file:'',
    content:'',
    category:''
  });
  const [publishError, setPublishError] = useState(null);
  
  useEffect(()=>{
       
   const fetchitem = async()=>{

            await axios.get(`${customurl}post/getitem/${id}`).then((res)=>{
                 const   {title ,category , content , file}= res.data[0];
               
                 setFormData({title : title , content:content , category:category , file:file})
               

            }).catch((err)=>{
 console.log(err)
            })
   }
   fetchitem();
  },[])

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setFileUploadError('Please select an file');
        return;
      }
      setFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setFileUploadError('file upload failed');
          setFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFileUploadProgress(null);
            setFileUploadError(null);
            setFormData({ ...formData, file: downloadURL });
          });
        }
      );
    } catch (error) {
      setFileUploadError('Image upload failed');
      setFileUploadProgress(null);
      console.log(error);
    }
  };
  const query = useQueryClient();
  const mutation =  useMutation({
    mutationFn:({userid , formData})=> axios.put(`${customurl}post/updatepost/${userid} `, {formData}),
    onSuccess :()=>{
      query.invalidateQueries({queryKey:["post"]})
      setFormData({})
      toast.success('Post updated')
      
    },
    onError:(error)=>{
      toast.error("plese provide title")
      console.log(error)
    }
  })
  const handleSubmit = async (e, postData) => {
    
    e.preventDefault(); // Prevent default form submission
 
 
     
      
     
  
      try {
        if (!postData.formData.title || !postData.formData.content) {
          setPublishError('Please provide a title and content for the post');
          return;
        }
  
        // Trigger the mutation
        await mutation.mutateAsync(postData);
      } catch (error) {
        console.log(error);
      
    } 
       
   
              
          };
          
          
       
          
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
     
      <h1 className='text-center text-3xl my-7 font-semibold'>Update a post</h1>
      <form className='flex flex-col gap-4' onSubmit={(e) => handleSubmit(e, { userid: id, formData })}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
          value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
           <option value='uncategorized'>Select a category</option>
            <option value='Technology'>Technology</option>
            <option value='Health'>Health</option>
            <option value='Sports'>Sports</option>
            <option value='CurrentAffairs'>Current Affairs</option>
            <option value='Food'>Food</option>
            <option value='Animals'>Animals</option>
            <option value='other'>other</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            color="warning"
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
           
              Upload Image
           
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
   
        {
          
        formData.file != null && !formData.file.includes('pdf') &&  !formData.file.includes('txt') &&
          <img
            src={formData.file}
            alt='upload'
            className='w-full h-72 object-cover'
          />
}
{
          
          formData.file != null && formData.file.includes('pdf') &&
            <img
              src='https://www.thepopularapps.com/application/upload/Apps/2022/04/photo-to-pdf-3.png'
              alt='upload'
              className='w-72 h-72 object-cover'
            />
  }
  {
      formData.file != null && formData.file.includes('txt') &&
      <img
        src='https://cdn-icons-png.flaticon.com/512/2920/2920824.png'
        alt='upload'
        className='w-72 h-72 object-cover'
      />
  }
  
     
         <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          value={formData.content}
          onChange={(e) => {
            setFormData({ ...formData, content: e.target.value });
          }}
        />
        <Button type='submit'  color="dark">
          Update
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}

export default UpdatePost