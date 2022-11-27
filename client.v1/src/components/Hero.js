import React from 'react';
import {NavLink} from "react-router-dom";

const Hero = () => {
    return (
        <section id="hero" className="hero d-flex flex-column justify-content-center align-items-center" data-aos="fade" data-aos-delay="1500">
                <div className="row justify-content-center">
                    <div className="text-center">
                        <h2>I'm <span>Arina Yastrebova</span> an artist from Russia</h2>
                        <p>Let me introduce you my paintings.</p>
                        <NavLink to="/catalog" className="nav-link"> Go to Catalog</NavLink>
                    </div>
                </div>
        </section>
    );
};

export default Hero;