"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const Header = () => {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Visualise", path: "/graph" },
    { name: "Organise", path: "/timeline" },
    { name: "Optimise", path: "/user-input" }
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}
      style={{
        background: "linear-gradient(90deg, #f0f9ff 0%, #d6eaff 100%)",
        borderBottom: "2px solid #000",
        boxShadow: isScrolled ? "0 4px 12px rgba(0,0,0,0.1)" : "none"
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Welcome Text */}
        <Link href="/landing" className="flex items-center group gap-3">
          <motion.div 
            className="h-10 w-10 rounded-md flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform"
            style={{
              backgroundColor: "#ffed00",
              border: "2px solid black",
              boxShadow: "3px 3px 0 rgba(0,0,0,0.8)",
              color: "black"
            }}
            whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 }}}
          >
            <div className="font-bold text-lg text-black" style={{ fontFamily: "'Bangers', cursive" }}>P</div>
          </motion.div>
          
          <motion.div
            className="relative text-black"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative z-10">
              <h1 className="text-xl font-bold text-black" style={{ fontFamily: "'Bangers', cursive", letterSpacing: "1px" }}>
                PlotHole!
              </h1>
              <div className="absolute -bottom-1 left-0 right-0 h-2 bg-yellow-300 -z-10" style={{ transform: "rotate(-1deg)" }}></div>
            </div>
          </motion.div>
        </Link>

        {/* Navigation Buttons */}
        <nav className="flex gap-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="relative"
            >
              <motion.div 
                className="px-4 py-2 font-bold text-base rounded-md transition-all text-black"
                style={{ 
                  backgroundColor: pathname === item.path ? "#ffed00" : "#ffffff",
                  border: "2px solid black",
                  boxShadow: pathname === item.path 
                    ? "2px 2px 0 rgba(0,0,0,1)" 
                    : "4px 4px 0 rgba(0,0,0,1)",
                  fontFamily: "'Bangers', cursive",
                  letterSpacing: "1px",
                  color: "black"
                }}
                whileHover={{ 
                  y: 2,
                  boxShadow: "2px 2px 0 rgba(0,0,0,1)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ 
                  y: 4,
                  boxShadow: "0px 0px 0 rgba(0,0,0,1)",
                  transition: { duration: 0.1 }
                }}
              >
                {item.name}
                <motion.div
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-300 px-2 py-1 rounded-md border-2 border-black text-sm text-black"
                  initial={{ opacity: 0, y: 10, scale: 0.5 }}
                  whileHover={{ opacity: 1, y: 0, scale: 1 }}
                  style={{ fontFamily: "'Bangers', cursive", pointerEvents: "none" }}
                >
                  {item.name === "Visualise" ? "POW!" : item.name === "Organise" ? "ZAP!" : "BOOM!"}
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
