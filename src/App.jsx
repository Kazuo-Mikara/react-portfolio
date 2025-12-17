
import React, { useEffect, useRef } from 'react'
import Home from './pages/Home'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import ThemeToggle from './components/ThemeToggle'
import { ReactLenis, useLenis } from 'lenis/react'
import "./App.css"
import { cardActionAreaClasses } from '@mui/material/CardActionArea';


gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)
const App = () => {
  const smoothTextScroll = async () => {
    // Wait for fonts to load before running SplitText
    await document.fonts.ready;

    const splitTpes = document.querySelectorAll(".reveal-type");
    splitTpes.forEach((char, i) => {
      const text = SplitText.create(char, { types: "chars" })
      gsap.from(text.chars,
        {
          scrollTrigger: {
            trigger: char,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
            markers: false,
            toggleActions: 'play play reverse reverse'
          },
          // scaleY: 0,
          // y: -20,
          // transformOrigin: "top",
          // stagger: 0.11,
          // duration: 1,
          // ease: "power3.out",
          opacity: 0.3,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",

        }
      )
    })
  }
  const smoothBoxScroll = async () => {
    // Wait for fonts to load before running SplitText
    await document.fonts.ready;

    const splitTpes = document.querySelectorAll(".reveal-box");
    splitTpes.forEach((box) => {
      gsap.from(box,
        {
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            end: "top 70%",
            scrub: true,
            markers: false,
            toggleActions: 'play play reverse reverse'
          },
          scaleY: 0,
          y: -20,
          transformOrigin: "top",
          stagger: 0.11,
          duration: 1,
          ease: "power2.out",
          // opacity: 0.3,
          // stagger: 0.1,
          // duration: 1,
          // ease: "power3.out",

        }
      )
    })
  }

  const smoothEducationCardScroll = async () => {
    // Wait for fonts to load before running SplitText
    await document.fonts.ready;

    const splitTpes = document.querySelectorAll(".reveal-card");
    splitTpes.forEach((card) => {
      gsap.from(card,
        {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 70%",
            scrub: true,
            markers: false,
            toggleActions: 'play play reverse reverse'
          },
          // scaleX: 0,
          // y: -20,
          // transformOrigin: "top",
          // stagger: 0.1,
          // duration: 1,
          // delay: 1,
          // ease: "power2.out",
          opacity: 0.3,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",

        },

      )
    })
  }
  useEffect(() => {
    smoothTextScroll()
    smoothBoxScroll()
    smoothEducationCardScroll()
  }, [])

  const lenis = useLenis((lenis) => {
  })
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }


  return (
    <div className='home'>
      <ReactLenis root />
      <Home />
      {/* <Projects/> */}
      <ThemeToggle className="theme-toggle" />

    </div>
  )
}

export default App

