import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import Slider from "../components/Slider";
import {AppContext} from "../components/AppContext";
import {fetchAllProducts} from "../http/catalogAPI";
import Hero from "../components/Hero";



const Start = observer(() => {
    const { catalog } = useContext(AppContext)
    const [productsFetching, setProductsFetching] = useState(true)

    useEffect(() => {
        fetchAllProducts(catalog.category, catalog.brand, catalog.page, catalog.limit)
            .then(data => {
                catalog.products = data.rows
                catalog.count = data.count
            })
            .finally(() => setProductsFetching(false))
    }, [])
    
    return (
        <div className='page-header'>
            <Slider products={catalog.products}/>
            <Container>
                <Hero/>
            </Container>
        </div>
    );
});

export default Start;