import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Spinner from 'react-bootstrap/Spinner';

const Contacts = () => {

    const [show, setShow] = useState(false)

    const form = useRef()


    const sendEmail = (e) => {
        e.preventDefault();
        setShow(true);
        emailjs.sendForm('service_tcsx0kl', 'template_rl570yq', form.current, 'pCf5VA8ZP_d0yukgB')
          .then((result) => {
            setShow(false);
              
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
      };

    return (
        <Container>
             <div className="page-header d-flex align-items-center">
                <div className="container position-relative">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-10 text-center">
                            <h1>Contact</h1>
                            <p>For any inquiries, feel free to contact us using the form below or drop us an email:
                            </p>
                            <p><a href="mailto:arina.yastrebova@mail.ru">arina.yastrebova@mail.ru</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <Form ref={form} onSubmit={sendEmail} className='mt-2 mb-4 container text-center col-lg-9'>
                <Row className="align-items-center">
                    <Col xs="12" md="6" >
                        <Form.Control
                            required
                            name="user_name"
                            type="text"
                            className="mb-3"
                            placeholder="Full Name" 
                          />
                    </Col>
                    <Col xs="12" md="6" >
                        <Form.Control 
                        required
                        name="user_email"
                        type="email" 
                        placeholder="Your Email"
                        className="mb-3" 
                        />
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Control 
                        required
                        name="subject"
                        type="text" 
                        placeholder="Subject"
                      
                     />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea"
                        name="message"
                        rows={5}
                        required
                        placeholder="Message"
                        />
                </Form.Group>
                <Button type="submit" disabled={show} >
                    {show 
                    ? <>
                        <Spinner
                        as="span"
                         animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                        <span> </span>
                        Sending...
                    </>
                    : <span>Send message</span>
                    }
                    
                </Button>
            </Form>
        </Container>
    )
}

export default Contacts