import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-first text-second py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Brand */}
        <div className="text-lg font-semibold text-third mb-4 md:mb-0">
          One9 Development
        </div>

        {/* Center: Links */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="#" className="hover:text-third transition">About</a>
          <a href="#" className="hover:text-third transition">Contact</a>
          <a href="#" className="hover:text-third transition">Privacy</a>
        </div>

        {/* Right: Socials */}
        <div className="flex space-x-4 text-xl">
          <a
            href="https://github.com/Harish01234"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-third transition"
          >
            <Github size={20} />
          </a>
          <a
            href="#"
            className="hover:text-third transition"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="hover:text-third transition"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>

      <div className="text-center text-sm text-second mt-4 border-t border-second pt-4">
        © {new Date().getFullYear()} One9 Development. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
