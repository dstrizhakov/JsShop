import React from 'react';
import {Container} from "react-bootstrap";

const Footer = () => {
    return (
        <Container fluid className="footer"  style={{backgroundColor: "#f1f1f1"}}>
                <div className="footer-social-links">
                    <a href="https://twitter.com/arinayastrebova" target="_blank" className="twitter"><i className="bi bi-twitter"></i></a>
                    <a href="https://www.facebook.com/ArinaYastrebovaStore/" target="_blank" className="facebook"><i className="bi bi-facebook"></i></a>
                    <a href="https://www.instagram.com/arinasfinearts/" target="_blank" className="instagram"><i className="bi bi-instagram"></i></a>
                    <a href="https://ge.linkedin.com/in/arina-iastrebova-39a907253" target="_blank" className="linkedin"><i className="bi bi-linkedin"></i></a>
                </div>
        </Container>
    );
};

export default Footer;