
import Nav from "../NavBar/Nav";
import Hero from "../Hero/Hero";
import Skills from "../Skills/Skills";
import Experience from "../Experience/Experience";
import Education from "../Education/Education";
import Contact from "../Contact/Contact";
export default function Home() {
  return (
    <div style={{ scrollBehavior: "smooth" }}>
      <Nav />
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </div>
  )
}