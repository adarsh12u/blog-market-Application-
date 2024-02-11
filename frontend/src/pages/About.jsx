import React from 'react'

const About = () => {
  return (
    <section className=' flex flex-col p-3 items-center gap-10'>
  
             <div className=' flex  flex-col items-center mt-5'>
                     <h1 className=' font-serif text-2xl  md:text-5xl'>Adarsh Gurjar Blog Application</h1>             
                     <div className=' mt-2 w-20 h-1 bg-black rounded-lg'></div>
                </div>   


                <div className=' w-full md:w-[60vw] flex mt-7 mb-10 flex-col gap-10 items-center '>
                     <h1 className=' font-serif text-xl  md:text-3xl'>
                         Our Mission
                     </h1>

                     <p className=' text-lg font-semibold'>
                      to create a platform where people can connect through meaningful content. We believe in the power of storytelling to inspire, educate, and entertain. Through our blog, we aim to foster a community where diverse voices are heard and respected.
                     </p>

                     <h1 className=' font-serif text-xl  md:text-3xl'>What You'll Find Here</h1>
                     <p className=' text-lg font-semibold'>
                     Our blog features carefully curated posts created by our dedicated admin team. From technology trends to travel tips, personal development to pop culture, we strive to offer something for everyone. Our team is committed to delivering high-quality, relevant content that sparks curiosity and encourages conversation
                     </p>
                     <h1 className=' font-serif text-xl  md:text-3xl'>
                      Get Involved
                     </h1>
                     <p className=' text-lg font-semibold'>
                     We value input from our readers! Engage with our content by leaving comments, sharing your thoughts, and connecting with other readers
                     </p>
                </div>
  

    </section>
  )
}

export default About