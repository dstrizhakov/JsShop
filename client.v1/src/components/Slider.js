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
                <Carousel.Item className="slider">
                    <img
                        className="d-block m-auto rounded-3"
                        src={process.env.REACT_APP_IMG_URL + item.image}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                            <h4>{item.name}</h4>
                    </Carousel.Caption>
                </Carousel.Item>
            )
            }
        </Carousel>
    );
}

export default Slider;