"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null)

  // Footer sections
  const sections = {
    services: [
      { name: "Visualise Services", path: "/graph" },
      { name: "Organise Solutions", path: "/timeline" },
      { name: "Optimise Strategy", path: "/user-input" },
      { name: "Custom Projects", path: "/user-input" }
    ],
    social: [
      { name: "Twitter", icon: "🐦", path: "https://twitter.com" },
      { name: "Instagram", icon: "📸", path: "https://instagram.com" },
      { name: "LinkedIn", icon: "💼", path: "https://linkedin.com" },
      { name: "GitHub", icon: "💻", path: "https://github.com" }
    ]
  }

  // Contact info
  const contactInfo = {
    email: "plothole@vmr.in",
    phone: "+91 8850277951",
    address: "Mumbai, Maharashtra"
  }

  return (
    <footer className="relative mt-8 pt-8 pb-4 overflow-hidden" style={{
      background: "linear-gradient(90deg, #f0f9ff 0%, #d6eaff 100%)",
      borderTop: "2px solid #000"
    }}>
      {/* Comic style decorative elements */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-6">
          <path d="M0,0 L50,10 L100,2 L150,15 L200,5 L250,12 L300,0 L350,7 L400,2 L450,10 L500,0 L550,15 L600,7 L650,12 L700,2 L750,10 L800,0 L850,12 L900,7 L950,15 L1000,2 L1050,10 L1100,0 L1150,5 L1200,0 L1200,40 L0,40 Z" 
            fill="#ffed00" stroke="#000" strokeWidth="2"/>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          
          {/* Company Intro Section */}
          <div>
            <div className="flex items-center mb-2 gap-2">
              {/* Logo */}
              <div className="h-8 w-8 rounded-md flex items-center justify-center"
                style={{
                  backgroundColor: "#ffed00",
                  border: "2px solid black",
                  boxShadow: "2px 2px 0 rgba(0,0,0,0.8)"
                }}
              >
                <div className="font-bold text-black" style={{ fontFamily: "'Bangers', cursive" }}>P</div>
              </div>
              
              {/* Company name with comic styling */}
              <div className="relative">
                <h2 className="text-lg text-black font-bold" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "1px" }}>
                  PlotHole
                </h2>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-300 -z-10" 
                  style={{ transform: "rotate(-1deg)" }}></div>
              </div>
            </div>
            
            {/* Contact Info - Comic Style */}
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-black">✉️</span>
                <span className="text-black text-xs" style={{ fontFamily: "'Comic Neue', cursive" }}>{contactInfo.email}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-black">📞</span>
                <span className="text-black text-xs" style={{ fontFamily: "'Comic Neue', cursive" }}>{contactInfo.phone}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-black">📍</span>
                <span className="text-black text-xs" style={{ fontFamily: "'Comic Neue', cursive" }}>{contactInfo.address}</span>
              </div>
            </div>
          </div>
          
          {/* Services Section */}
          <div className="px-2">
            <div className="relative inline-block mb-2">
              <h3 className="text-base text-black font-bold" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "1px" }}>
                Our Services
              </h3>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-pink-300 -z-10" 
                style={{ transform: "rotate(-1deg)" }}></div>
            </div>
            
            <ul className="space-y-0.5">
              {sections.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="group flex items-center">
                    <div className="mr-1 h-1 w-1 bg-yellow-400 rounded-full border border-black"/>
                    <span className="text-black text-xs group-hover:underline" style={{ fontFamily: "'Comic Neue', cursive" }}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter & Social Section */}
          <div>
            <div className="relative inline-block mb-2">
              <h3 className="text-base text-black font-bold" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "1px" }}>
                Stay Updated
              </h3>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-purple-300 -z-10" 
                style={{ transform: "rotate(-1deg)" }}></div>
            </div>
            
            {/* Newsletter Form - Comic Style */}
            <div className="p-2 mb-2 rounded-lg text-xs"
              style={{
                backgroundColor: "#ffffff",
                border: "2px solid black",
                boxShadow: "3px 3px 0 rgba(0,0,0,1)"
              }}
            >
              <p className="mb-1 text-black" style={{ fontFamily: "'Comic Neue', cursive" }}>
                Subscribe for updates!
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow px-2 py-1 rounded-l-md border-2 border-r-0 border-black focus:outline-none text-black text-xs"
                  style={{ fontFamily: "'Comic Neue', cursive" }}
                />
                <motion.button 
                  className="px-2 py-1 bg-yellow-400 rounded-r-md font-bold border-2 border-black text-black text-xs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: "'Bangers', cursive", letterSpacing: "1px" }}
                >
                  JOIN!
                </motion.button>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="relative inline-block mb-1">
              <h3 className="text-base text-black font-bold" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "1px" }}>
                Connect With Us
              </h3>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-red-300 -z-10" 
                style={{ transform: "rotate(-1deg)" }}></div>
            </div>
            
            <div className="flex gap-2 mt-1">
              {sections.social.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative"
                  onMouseEnter={() => setHoveredSocial(item.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ y: -3, scale: 1.1 }}
                >
                  <div className="h-7 w-7 flex items-center justify-center rounded-full text-sm"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "2px solid black",
                      boxShadow: "1px 1px 0 rgba(0,0,0,0.8)"
                    }}
                  >
                    {item.icon}
                  </div>
                  
                  {/* Hover tag */}
                  {hoveredSocial === item.name && (
                    <motion.div
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-300 px-1 py-0 rounded-md border-2 border-black text-xs whitespace-nowrap"
                      initial={{ opacity: 0, y: 5, scale: 0.5 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      style={{ 
                        fontFamily: "'Bangers', cursive",
                        pointerEvents: "none"
                      }}
                    >
                      <span className="text-black">
                        {item.name === "Twitter" ? "TWEET!" : item.name === "Instagram" ? "SNAP!" : item.name === "LinkedIn" ? "CONNECT!" : "CODE!"}
                      </span>
                    </motion.div>
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-4 pt-2 border-t-2 border-black border-dashed text-center">
          <div className="relative inline-block">
            <p className="text-black text-xs" style={{ fontFamily: "'Comic Neue', cursive" }}>
              © {new Date().getFullYear()} PlotHole. All rights reserved!
            </p>
            <motion.div 
              className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-300 -z-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          
          {/* Comic style ending */}
          <div className="mt-1 flex justify-center">
            <motion.div 
              className="px-3 py-0 rounded-full border-2 border-black bg-yellow-400 font-bold text-black text-xs"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ rotate: [0, -3, 3, 0], transition: { duration: 0.5 } }}
              style={{ fontFamily: "'Bangers', cursive", letterSpacing: "1px" }}
            >
              THAT'S ALL FOLKS!
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer