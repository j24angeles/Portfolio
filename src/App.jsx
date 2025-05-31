import React from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

const App = () => {
    return (
        <div>
            <Navbar />
            <Home />
            <AboutMe />
            <Skills />
            <Projects />
            <Contact />
        </div>
    );
};

export default App;