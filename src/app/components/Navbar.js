"use client"
import React, {useState,useEffect} from 'react'
import Link from 'next/link';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
     useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 56); // change 80 to your threshold
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      <div className={`p-4 fixed top-0 z-20 w-full ${scrolled ? "bg-black backdrop-blur-lg" : "bg-transparent"}`}>
        <img src="/Logonetflix.png" alt="Logo" className="w-30 h-8 inline-block"/>
        {/* <h1 className="text-3xl font-bold">Movie Explorer</h1> */}
      </div>
    </div>
  )
}

export default Navbar
