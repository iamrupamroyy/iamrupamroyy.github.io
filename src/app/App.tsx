import React, { Suspense } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { ThemeProvider } from "./components/ThemeProvider";
import { LoadingSpinner } from "./components/LoadingSpinner";

const About = React.lazy(() => import("./components/About").then(module => ({ default: module.About })));
const Timeline = React.lazy(() => import("./components/Timeline").then(module => ({ default: module.Timeline })));
const CodingProfiles = React.lazy(() => import("./components/CodingProfiles").then(module => ({ default: module.CodingProfiles })));
const Skills = React.lazy(() => import("./components/Skills").then(module => ({ default: module.Skills })));
const Projects = React.lazy(() => import("./components/Projects").then(module => ({ default: module.Projects })));
const Contact = React.lazy(() => import("./components/Contact").then(module => ({ default: module.Contact })));
const Footer = React.lazy(() => import("./components/Footer").then(module => ({ default: module.Footer })));


export default function App() {
  return (
    <ThemeProvider>
      <div className="size-full bg-white dark:bg-slate-950 transition-colors">
        <Navigation />
        <Hero />
        <Suspense fallback={<LoadingSpinner />}>
          <About />
          <Timeline />
          <CodingProfiles />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}