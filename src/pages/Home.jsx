import { useState } from "react";
import Preloader from "../components/Preloader";
import Cursor from "../components/Cursor";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import About, { TechMarquee } from "../sections/About";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import Education from "../sections/Education";
import Contact from "../sections/Contact";
import "../components/components.css";

export default function Home() {
    const [ready, setReady] = useState(false);

    return (
        <div className="portfolio-app">
            <Preloader onDone={() => setReady(true)} />
            <Cursor />
            <Navbar />

            <main>
                <Hero ready={ready} />
                <TechMarquee />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Education />
                <Contact />
            </main>
        </div>
    );
}