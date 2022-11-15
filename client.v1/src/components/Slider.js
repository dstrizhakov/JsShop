import React, {useState} from 'react';
import {Carousel} from "react-bootstrap";

const Slider = ({products}) => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {products.map(item=>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={process.env.REACT_APP_IMG_URL + item.image}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>{item.name}</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            )
            }
        </Carousel>
    );
}

export default Slider;