import { useEffect } from "react";
import Nav from "../NavBar/Nav";
import Hero from "../Home/Hero/Hero";
import Skills from "../Home/Skills/Skills";
import Experience from "../Home/Experience/Experience";
import Education from "../Home/Education/Education";
import Contact from "../Home/Contact/Contact";
import ProjectShowcase from "../ProjectShowCase/Projects";
export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");
        const navLink = document.querySelector(`.navbar a[href*="#${sectionId}"]`);

        if (navLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add("active");
          } else {
            navLink.classList.remove("active");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div style={{ scrollBehavior: "smooth" }}>
      <Nav />
      <section id="about">
        <Hero />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experience">
        <Experience />
        <Education />
      </section>
      <section id="projects">
        <ProjectShowcase />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  )
}