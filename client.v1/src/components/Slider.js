import React, { useState } from 'react';
import { Carousel, Container } from "react-bootstrap";

const Slider = ({ products }) => {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	}
	return (
		<Carousel variant="dark" indicators={false} controls={false} interval={6000} activeIndex={index} onSelect={handleSelect}>
			{products.map(item =>
				<Carousel.Item key={item.id} className="slider">
					<img
						className="d-block m-auto"
						src={process.env.REACT_APP_IMG_URL + item.image}
						alt="First slide"
					/>
				</Carousel.Item>
			)
			}
		</Carousel>
	);
}

export default Slider;