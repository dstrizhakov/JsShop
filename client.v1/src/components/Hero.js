import React from 'react';

const Hero = () => {
    return (
        <section id="hero" className="hero d-flex flex-column justify-content-center align-items-center" data-aos="fade" data-aos-delay="1500">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                        <h2>I'm <span>Arina Yastrebova</span> an artist from Russia</h2>
                        <p>Let me introduce you my paintings.</p>
                       {/* <a href="#" className="btn-get-started">Available for hire</a>*/}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;