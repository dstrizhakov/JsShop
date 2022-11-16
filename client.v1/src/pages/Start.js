import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Col, Container, Pagination, Row, Spinner} from "react-bootstrap";
import Slider from "../components/Slider";
import {AppContext} from "../components/AppContext";
import {fetchAllProducts, fetchBrands, fetchCategories} from "../http/catalogAPI";
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
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="mt-5 m-auto bg-dark">
                <Slider products={catalog.products}/>
            </div>
            <div className="bg-light">
                <Hero/>
            </div>
        </>
    );
});

export default Start;