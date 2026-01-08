

import { Briefcase, MapPin, Calendar, Link } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import external CSS
import "./Projects.css";

import {
    EffectFade,
    Navigation,
    Pagination,
} from "swiper/modules";

const PROJECTS_DATA = [
    {
        title: "Kazuo Travels",
        techstack: "React, OpenStreet API, Leaflet.js, TailwindCSS",
        About:
            "A dynamic travel exploration platform that integrates interactive mapping. It allows users to discover hidden gems and plan journeys with real-time geographic data visualization using Leaflet and OpenStreetMap.",
        Link: "https://kazuo-travels.vercel.app/",
        thumbnail: "@/app/assets/Kazuo_Travels1.png",
        images: [
            { id: 1, src: "/assets/Kazuo_Travels1.png" },
            { id: 2, src: "/assets/Kazuo_Travels2.png" },
            { id: 3, src: "/assets/Kazuo_Travels3.png" },
            { id: 4, src: "/assets/Kazuo_Travels4.png" },
        ],
    },
    {
        title: "Zenix",
        techstack: "Next.js, MongoDB, TailwindCSS, Auth.js",
        About:
            "A comprehensive Learning Management System (LMS) designed to bridge the gap between instructors and students. Features secure authentication, course progress tracking, and a robust backend architecture for a seamless educational experience.",
        Link: "https://zenix-edu.netlify.app/home",
        thumbnail: "@/app/assets/Kazuo_Travels1.png",
        images: [
            { id: 1, src: "/assets/Zenix/Zenix1.png" },
            { id: 2, src: "/assets/Zenix/Zenix2.png" },
            { id: 3, src: "/assets/Zenix/Zenix3.png" },
            { id: 4, src: "/assets/Zenix/Zenix4.png" },
            { id: 5, src: "/assets/Zenix/Zenix5.png" },
            { id: 6, src: "/assets/Zenix/Zenix6.png" },
            { id: 7, src: "/assets/Zenix/Zenix7.png" },
            { id: 8, src: "/assets/Zenix/Zenix8.png" },
        ],
    },
    {
        title: "Crestview Pro",
        techstack: "Next.js, MongoDB, TailwindCSS, Auth.js, OpenStreet API, Leaflet.js",
        About:
            "A high-performance real estate or location-based management tool. It combines secure data handling with geospatial visualization, allowing users to manage properties and view data points accurately on a custom-styled map interface.",
        Link: "#",
        thumbnail: "@/app/assets/Kazuo_Travels1.png",
        images: [
            { id: 1, src: "/assets/Crestview/Crestview1.png" },
            { id: 2, src: "/assets/Crestview/Crestview2.png" },
            { id: 3, src: "/assets/Crestview/Crestview3.png" },
            { id: 4, src: "/assets/Crestview/Crestview4.png" },
            { id: 5, src: "/assets/Crestview/Crestview5.png" },
            { id: 6, src: "/assets/Crestview/Crestview6.png" },
            { id: 7, src: "/assets/Crestview/Crestview7.png" },
        ],
    },
];

export default function ProjectShowcase() {
    return (
        <section className="projects-section">
            <div className="projects-container">
                <h2 className="projects-main-title">
                    Projects
                </h2>

                <div className="projects-list">
                    {PROJECTS_DATA.map((project, index) => (
                        <div className="project-item" key={index}>
                            <div className="project-swiper-container">
                                <Swiper
                                    spaceBetween={10}
                                    effect={"fade"}
                                    direction="horizontal"
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                    }}
                                    modules={[EffectFade, Navigation, Pagination]}
                                    className="mySwiper1"
                                >
                                    {project.images.map((image) => (
                                        <SwiperSlide key={image.id} className="project-slide">
                                            <div className="project-image-box">
                                                <img
                                                    src={image.src}
                                                    alt={project.title}
                                                    className="project-image"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <div className="project-content">
                                <h3 className="project-name">{project.title}</h3>
                                <p className="project-tech">{project.techstack}</p>
                                <p className="project-about">{project.About}</p>
                                <a
                                    href={project.Link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link"
                                >
                                    View Project
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

