/* =========================================================================
   Single source of truth for all portfolio content.
   Projects & experience reference technologies by id, so the
   "Applied Knowledge" explorer can show exactly where each skill was used.
   ========================================================================= */
import {
    SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiCss3,
    SiBootstrap, SiReactquery, SiExpo, SiNodedotjs, SiExpress, SiGraphql, SiPhp,
    SiPostgresql, SiMongodb, SiMysql, SiPrisma, SiAppwrite, SiDocker, SiNginx, SiApache,
    SiGithubactions, SiGit, SiJest, SiVitest, SiPostman, SiInsomnia, SiPytorch, SiPython,
    SiWordpress, SiElementor, SiJira, SiConfluence, SiFigma, SiLeaflet, SiJsonwebtokens,
    SiCloudinary, SiVercel, SiGooglesheets,
} from "react-icons/si";
import {
    FiLock, FiBox, FiShield, FiCpu, FiLayout, FiSmartphone, FiServer, FiDatabase,
    FiGitBranch, FiCheckCircle, FiBarChart2, FiUsers, FiLink, FiCrosshair,
} from "react-icons/fi";

export const PROFILE = {
    name: "Htoo Myat Kyaw",
    firstName: "Htoo",
    lastName: "Myat Kyaw",
    roles: ["Frontend Developer", "Development Lead", "Full-Stack Engineer", "Mobile App Builder"],
    intro:
        "I specialize in architecting scalable web and cross-platform mobile applications, leading development teams from initial concept to seamless deployment.",
    statement:
        "I turn complex ideas into fast, accessible products — architecting web and mobile apps, wiring up APIs and pipelines, and leading teams from the first commit to production.",
    email: "htoomyatkyaw32@gmail.com",
    phone: "+959263906925",
    location: "Yangon, Myanmar",
    timezone: "Asia/Yangon",
    socials: {
        github: "https://github.com/Kazuo-Mikara",
        linkedin: "https://www.linkedin.com/in/htoo-myat-kyaw-47316828a/",
        facebook: "https://www.facebook.com/profile.php?id=100077291498498",
    },
};

/* ---------------------------- Technology registry ---------------------------- */
export const TECH = {
    react: { name: "React", icon: SiReact, color: "#61dafb" },
    next: { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    ts: { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
    js: { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
    tailwind: { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
    html: { name: "HTML5", icon: SiHtml5, color: "#e34f26" },
    css: { name: "CSS3", icon: SiCss3, color: "#2965f1" },
    bootstrap: { name: "Bootstrap", icon: SiBootstrap, color: "#7952b3" },
    tanstack: { name: "TanStack", icon: SiReactquery, color: "#ff4154" },
    zustand: { name: "Zustand", icon: FiBox, color: "#e8b472" },
    reactnative: { name: "React Native", icon: SiReact, color: "#61dafb" },
    expo: { name: "Expo", icon: SiExpo, color: "#ffffff" },
    nativewind: { name: "NativeWind", icon: SiTailwindcss, color: "#06b6d4" },
    node: { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
    express: { name: "Express", icon: SiExpress, color: "#ffffff" },
    graphql: { name: "GraphQL", icon: SiGraphql, color: "#e10098" },
    rest: { name: "REST APIs", icon: FiLink, color: "#a78bfa" },
    jwt: { name: "JWT", icon: SiJsonwebtokens, color: "#fb015b" },
    auth: { name: "Auth.js / Better Auth", icon: FiLock, color: "#c4b5fd" },
    php: { name: "PHP", icon: SiPhp, color: "#8892bf" },
    postgres: { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
    mongodb: { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
    mysql: { name: "MySQL", icon: SiMysql, color: "#4479a1" },
    prisma: { name: "Prisma ORM", icon: SiPrisma, color: "#5a67d8" },
    appwrite: { name: "Appwrite", icon: SiAppwrite, color: "#fd366e" },
    cloudinary: { name: "Cloudinary", icon: SiCloudinary, color: "#3448c5" },
    docker: { name: "Docker", icon: SiDocker, color: "#2496ed" },
    nginx: { name: "Nginx", icon: SiNginx, color: "#009639" },
    apache: { name: "Apache", icon: SiApache, color: "#d22128" },
    gha: { name: "GitHub Actions", icon: SiGithubactions, color: "#2088ff" },
    git: { name: "Git", icon: SiGit, color: "#f05032" },
    vercel: { name: "Vercel / Netlify", icon: SiVercel, color: "#ffffff" },
    jest: { name: "Jest", icon: SiJest, color: "#c21325" },
    vitest: { name: "Vitest", icon: SiVitest, color: "#6e9f18" },
    postman: { name: "Postman", icon: SiPostman, color: "#ff6c37" },
    insomnia: { name: "Insomnia", icon: SiInsomnia, color: "#7b4ef3" },
    qa: { name: "Test Planning", icon: FiCheckCircle, color: "#34d399" },
    python: { name: "Python", icon: SiPython, color: "#3776ab" },
    pytorch: { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c" },
    yolo: { name: "YOLOv11", icon: FiCrosshair, color: "#00ffff" },
    swinTransformer: { name: "Swin Transformer", icon: FiCpu, color: "#f472b6" },
    convnext: { name: "ConvNeXt", icon: FiCpu, color: "#38bdf8" },
    data: { name: "Data Validation", icon: FiBarChart2, color: "#f472b6" },
    sheets: { name: "Spreadsheets", icon: SiGooglesheets, color: "#34a853" },
    leaflet: { name: "Leaflet / OSM", icon: SiLeaflet, color: "#199900" },
    wordpress: { name: "WordPress", icon: SiWordpress, color: "#21759b" },
    elementor: { name: "Elementor", icon: SiElementor, color: "#92003b" },
    jira: { name: "Jira", icon: SiJira, color: "#0052cc" },
    confluence: { name: "Confluence", icon: SiConfluence, color: "#2684ff" },
    figma: { name: "Figma", icon: SiFigma, color: "#f24e1e" },
    agile: { name: "Agile / SDLC", icon: FiUsers, color: "#fbbf24" },
    security: { name: "Security Hardening", icon: FiShield, color: "#94a3b8" },
};

/* ------------------------------ Skill domains ------------------------------ */
export const DOMAINS = [
    {
        id: "frontend",
        title: "Frontend Engineering",
        icon: FiLayout,
        color: "#a78bfa",
        level: 92,
        summary: "Type-safe, responsive interfaces with React & Next.js — from marketing pages to complex admin dashboards.",
        tech: ["react", "next", "ts", "js", "tailwind", "tanstack", "zustand", "html", "css", "bootstrap"],
    },
    {
        id: "mobile",
        title: "Cross-Platform Mobile",
        icon: FiSmartphone,
        color: "#22d3ee",
        level: 82,
        summary: "iOS & Android apps from a single codebase using React Native, Expo and NativeWind.",
        tech: ["reactnative", "expo", "nativewind", "appwrite"],
    },
    {
        id: "backend",
        title: "Backend & APIs",
        icon: FiServer,
        color: "#f472b6",
        level: 80,
        summary: "REST & GraphQL services with secure JWT / session auth, documented and tested end-to-end.",
        tech: ["node", "express", "graphql", "rest", "jwt", "auth", "php"],
    },
    {
        id: "data",
        title: "Databases & ORM",
        icon: FiDatabase,
        color: "#60a5fa",
        level: 78,
        summary: "Relational & document data modelling with Prisma-driven type safety and containerized databases.",
        tech: ["postgres", "mongodb", "mysql", "prisma", "appwrite", "cloudinary"],
    },
    {
        id: "devops",
        title: "DevOps & Delivery",
        icon: FiGitBranch,
        color: "#34d399",
        level: 76,
        summary: "Dockerized apps, Nginx/Apache servers and automated CI/CD pipelines for zero-drama releases.",
        tech: ["docker", "nginx", "apache", "gha", "git", "vercel"],
    },
    {
        id: "qa",
        title: "Testing & QA",
        icon: FiCheckCircle,
        color: "#fbbf24",
        level: 85,
        summary: "Test plans, automated suites and rigorous API testing — a QA mindset baked into every build.",
        tech: ["jest", "vitest", "postman", "insomnia", "qa"],
    },
    {
        id: "ai",
        title: "AI & Computer Vision",
        icon: FiCpu,
        color: "#fb7185",
        level: 78,
        summary: "Computer vision architectures (YOLOv8, Swin Transformer, ConvNeXt) with PyTorch deployed into mobile & production apps.",
        tech: ["python", "pytorch", "yolo", "swinTransformer", "convnext", "leaflet"],
    },
    {
        id: "lead",
        title: "Leadership & CMS",
        icon: FiUsers,
        color: "#c084fc",
        level: 84,
        summary: "Running sprints in Jira & Confluence, designing in Figma, and shipping WordPress sites for clients.",
        tech: ["agile", "jira", "confluence", "figma", "wordpress", "elementor", "security"],
    },
];

/* -------------------------------- Experience -------------------------------- */
// Ordered newest first.
export const EXPERIENCE = [
    {
        id: "tam79",
        role: "Frontend Developer / Development Lead",
        company: "TAM79 Marketing Agency",
        location: "Yangon, Myanmar",
        period: "Present",
        current: true,
        color: "#a78bfa",
        points: [
            "Spearheaded technical development for two high-impact projects through full production lifecycles, managing timelines, team workflows, and sprint deliverables via Jira and Confluence.",
            "Engineered fully-responsive web applications and cross-platform mobile apps utilizing React, Next.js, and React Native (Expo), optimized with TailwindCSS and React Query.",
            "Architected application containerization using Docker and configured Nginx and Apache production servers to guarantee consistent environments from local development to production.",
            "Designed, tested, and integrated robust REST APIs, implementing JWT authentication and managing endpoints with Postman and Insomnia.",
            "Engineered automated CI/CD pipelines via GitHub Actions and established comprehensive testing suites with Jest and Vitest to streamline workflows and minimize release downtime.",
        ],
        stack: ["react", "next", "reactnative", "expo", "tailwind", "tanstack", "docker", "nginx", "apache", "rest", "jwt", "postman", "insomnia", "gha", "jest", "vitest", "jira", "confluence", "agile"],
    },
    {
        id: "mwolf",
        role: "Freelance WordPress Developer",
        company: "M.Wolf Marketing Agency",
        location: "Arizona, USA (Remote)",
        period: "Sep 2025 – Dec 2025",
        color: "#34d399",
        points: [
            "Built and customized WordPress sites using Elementor, including custom templates, global widgets, and theme builder integrations.",
            "Integrated and configured essential plugins (SEO, caching, contact forms, analytics and security) and performed compatibility checks.",
            "Optimized site performance through image compression, lazy loading, caching strategies and CSS/JS minimization.",
            "Troubleshot theme and plugin conflicts, implemented accessibility improvements, and applied security hardening best practices.",
        ],
        stack: ["wordpress", "elementor", "php", "css", "js", "security"],
    },
    {
        id: "doublewave",
        role: "Mid-level Data Collector",
        company: "Double-Wave / HOME",
        location: "Yangon, Myanmar",
        period: "Nov 2023 – Aug 2025",
        color: "#f472b6",
        points: [
            "Collected and validated data from various sources, ensuring accuracy and completeness.",
            "Organized and maintained data in databases and spreadsheets.",
            "Performed data validation and cleaning to ensure data quality.",
            "Collaborated with team members to gather requirements and deliver data-driven insights.",
        ],
        stack: ["data", "sheets"],
    },
    {
        id: "shopdoora",
        role: "Quality Assurance Analyst",
        company: "ShopDoora",
        location: "Yangon, Myanmar",
        period: "Sep 2023 – Oct 2023",
        color: "#fbbf24",
        points: [
            "Developed and executed test plans and test cases to ensure quality and accuracy.",
            "Identified, documented, and tracked defects, working with teams to resolve issues.",
            "Analyzed data to identify inconsistencies and anomalies, ensuring data integrity.",
            "Contributed to process improvements to enhance data collection and QA procedures.",
        ],
        stack: ["qa", "data"],
    },
    {
        id: "compass",
        role: "Junior Full-Stack Web Developer",
        company: "Compass Global",
        location: "Yangon, Myanmar",
        period: "Sep 2022 – Jan 2023",
        color: "#22d3ee",
        points: [
            "Developed and optimized production-ready web applications using React, Next.js, and TypeScript, ensuring robust code quality through strict type-checking and custom interfaces.",
            "Engineered responsive, mobile-first interfaces using Tailwind CSS across complex marketing landing pages and internal admin dashboards.",
            "Built and documented RESTful APIs using Express.js to facilitate real-time communication between internal data services and third-party integrations.",
            "Participated in the full SDLC within an Agile environment, utilizing Git for version control and Postman for rigorous API testing and documentation.",
        ],
        stack: ["react", "next", "ts", "tailwind", "express", "node", "rest", "git", "postman", "agile"],
    },
];

/* --------------------------------- Projects --------------------------------- */
const seq = (folder, prefix, n, ext = "png", sep = "") =>
    Array.from({ length: n }, (_, i) => `/assets/${folder}/${prefix}${sep}${i + 1}.${ext}`);

export const PROJECTS = [
    {
        id: "pharmacy-next",
        title: "Pharmacy Management",
        kind: "Full-Stack · Inventory & Retail",
        description:
            "A pharmacy management system that optimizes inventory tracking and streamlines retail operations. Decoupled Next.js + GraphQL architecture with a containerized PostgreSQL database, Better Auth, real-time Zustand cart state and Prisma-driven type safety.",
        stack: ["next", "graphql", "zustand", "prisma", "postgres", "docker", "tailwind", "auth"],
        live: null,
        github: "https://github.com/Kazuo-Mikara/Pharmacy-Nextjs",
        color: "#2dd4bf",
        images: seq("Pharmacy-NextJs", "Pharmacy", 7, "jpg", "-"),
    },
    {
        id: "myakhwarnyo",
        title: "Mya Khwar Nyo",
        kind: "AI Mobile App · Computer Vision",
        description:
            "An AI-assisted plant identification app — snap a photo and the app identifies the plant. Uses YOLOv8, Swin Transformer, and ConvNeXt via PyTorch for detection & classification, Appwrite for the backend and Cloudinary for image storage.",
        stack: ["reactnative", "nativewind", "appwrite", "yolo", "swinTransformer", "convnext", "pytorch", "python", "cloudinary"],
        live: null,
        github: "https://github.com/Kazuo-Mikara/MyaKhwarNyo",
        color: "#4ade80",
        mobile: true,
        images: seq("MyaKhwarNyo", "MyaKhwarNyo", 12, "jpg", "-"),
    },
    {
        id: "luxe",
        title: "Luxe Estate",
        kind: "Real Estate Platform",
        description:
            "A premium real-estate platform built on TanStack Start with PostgreSQL, Prisma and Better Auth — fully Dockerized, with interactive Leaflet maps for browsing properties geographically.",
        stack: ["tanstack", "react", "postgres", "prisma", "auth", "docker", "leaflet", "tailwind"],
        live: null,
        github: "https://github.com/Kazuo-Mikara/luxe_estate",
        color: "#e8b472",
        images: ["/assets/Luxe/Luxe.png", ...seq("Luxe", "Luxe", 4)],
    },
    {
        id: "zenix",
        title: "Zenix LMS",
        kind: "Learning Management System",
        description:
            "A comprehensive LMS bridging instructors and students. Secure authentication, course progress tracking and a robust backend architecture for a seamless educational experience.",
        stack: ["next", "mongodb", "tailwind", "auth", "react"],
        live: "https://zenix-edu.netlify.app/home",
        github: "https://github.com/Kazuo-Mikara/zenix",
        color: "#f472b6",
        images: seq("Zenix", "Zenix", 8),
    },
    {
        id: "crestview",
        title: "Crestview Pro",
        kind: "Geospatial Property Management",
        description:
            "A high-performance location-based management tool combining secure data handling with geospatial visualization — manage properties and inspect data points on a custom-styled map.",
        stack: ["next", "mongodb", "tailwind", "auth", "leaflet", "react"],
        live: null,
        github: "https://github.com/Kazuo-Mikara/crestview_pro",
        color: "#60a5fa",
        images: seq("Crestview", "Crestview", 7),
    },
    {
        id: "kazuo-travels",
        title: "Kazuo Travels",
        kind: "Interactive Travel Explorer",
        description:
            "A travel exploration platform with interactive mapping. Discover hidden gems and plan journeys with real-time geographic data visualization powered by Leaflet and OpenStreetMap.",
        stack: ["react", "leaflet", "tailwind", "js"],
        live: "https://kazuo-travels.vercel.app/",
        github: "https://github.com/Kazuo-Mikara/kazuo-travels",
        color: "#a78bfa",
        images: seq("Kazuo_Travels", "Kazuo_Travels", 5),
    },
    {
        id: "pharmacy-php",
        title: "Pharmacy E-commerce",
        kind: "E-commerce · PHP",
        description:
            "A dynamic e-commerce platform for browsing and purchasing products, with a user-friendly interface, secure checkout flow and a robust PHP/MySQL backend.",
        stack: ["php", "mysql", "bootstrap", "tailwind", "html", "css", "js"],
        live: null,
        github: "https://github.com/Kazuo-Mikara/phamarcy_Ecommerce",
        color: "#22d3ee",
        images: seq("Pharmacy", "Pharmacy", 9),
    },
];

/* --------------------------------- Education -------------------------------- */
export const EDUCATION = [
    {
        id: "yu",
        degree: "B.Sc. Computer Studies",
        school: "University of Yangon",
        location: "Yangon, Myanmar",
        start: 2019,
        end: 2026,
        note: "Third Year · Graduating 2026",
        logo: "yu",
        color: "#22d3ee",
        highlights: ["COE Student"],
    },
    {
        id: "uopeople",
        degree: "B.Sc. Computer Science",
        school: "University of the People",
        location: "Pasadena, California, USA (Online)",
        start: 2023,
        end: 2027,
        note: "First Year · Graduating 2027",
        logo: "uopeople",
        color: "#a78bfa",
        highlights: ["Dean's List – Fall 2023", "GPA: 3.85 / 4.0", "Scholarship Recipient"],
    },
];

/* ------------------------------ Derived helpers ----------------------------- */
export const usageFor = (techId) => ({
    projects: PROJECTS.filter((p) => p.stack.includes(techId)),
    roles: EXPERIENCE.filter((e) => e.stack.includes(techId)),
});

export const ALL_TECH_IDS = Object.keys(TECH);

export const STATS = [
    { value: new Date().getFullYear() - 2022, suffix: "+", label: "Years in tech" },
    { value: PROJECTS.length, suffix: "", label: "Featured builds" },
    { value: ALL_TECH_IDS.length, suffix: "+", label: "Technologies applied" },
    { value: EXPERIENCE.length, suffix: "", label: "Professional roles" },
];

export const MARQUEE_TECH = [
    "react", "next", "ts", "tailwind", "reactnative", "expo", "node", "graphql", "postgres",
    "prisma", "mongodb", "docker", "nginx", "gha", "jest", "vitest", "pytorch", "figma", "wordpress", "jira",
];
