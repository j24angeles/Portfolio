import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
    return (
        <div style={{ scrollBehavior: 'smooth' }}>
            <Navbar />
            <section id="home">
                <Home />
            </section>
            <section id="about">
                <AboutMe />
            </section>
            <section id="skills">
                <Skills />
            </section>
            <section id="projects">
                <Projects />
            </section>
            <section id="contact">
                <Contact />
            </section>
            <Footer />
        </div>
    );
};

export default App;