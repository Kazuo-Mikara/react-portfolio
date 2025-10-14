
import Nav from "../NavBar/Nav";
import Hero from "../Hero/Hero";
import Skills from "../Skills/Skills";
import Experience from "../Experience/Experience";
import Education from "../Education/Education";
export default function Home (){
   return (
    <div style={{scrollBehavior:"smooth"}}>
      <Nav/>
      <Hero/>
      <Skills/>
      <Experience/>
      <Education/>
    </div>
   )
}