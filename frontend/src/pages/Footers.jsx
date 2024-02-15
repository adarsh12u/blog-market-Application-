
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import { Footer } from 'flowbite-react';
import { FaLinkedin } from "react-icons/fa";
import React from 'react'

const Footers = () => {
  return (
    <Footer container bgDark>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className=" flex items-center justify-center ml-28">
          
            <h1 className=" text-gray-500 text-4xl mb-6 md:mb-0 md:text-8xl">
              BlogApp.
            </h1>


          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">about</Footer.Link>
                <Footer.Link href="#">contact us</Footer.Link>
                <Footer.Link href="#">blog</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow me" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://github.com/adarsh12u">Github</Footer.Link>
                <Footer.Link href="https://www.linkedin.com/in/adarsh-gurjar-6170b0249/">Linkedin</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="All right reserved" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://leetcode.com/Adarshgurjar123/" icon={SiLeetcode} />
            <Footer.Icon href="https://github.com/adarsh12u" icon={FaGithub} />
            
            <Footer.Icon href="https://www.linkedin.com/in/adarsh-gurjar-6170b0249/" icon={FaLinkedin} />
            <Footer.Icon href="https://adarsh-gurjar-portfolio.netlify.app/" icon={CgWebsite} />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default Footers

