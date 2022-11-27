import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {AppContext} from "./AppContext";
import {createSearchParams, useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import {Button, Col, Container} from "react-bootstrap";

const CategoryFilter = observer(() => {

    const { catalog } = useContext(AppContext)
    const navigate = useNavigate()
    console.log(navigate)

    const onClickCategory = (id) => {
        if (id === catalog.category) {
            catalog.category = null
        } else {
            catalog.category = id
        }
        // при каждом клике добавляем в историю браузера новый элемент
        const params = {}
        if (catalog.category) params.category = catalog.category
        if (catalog.brand) params.brand = catalog.brand
        if (catalog.page > 1) params.page = catalog.page
        if (params.category == 0) {
            navigate({
                pathname: '/catalog'
            })
        } else {
            navigate({
                pathname: '/catalog',
                search: '?' + createSearchParams(params),
            })
        }

    }
    const onClickType = (id) => {
        if (id === catalog.brand) {
            catalog.brand = null
        } else {
            catalog.brand = id
        }
        // при каждом клике добавляем в историю браузера новый элемент
        const params = {}
        if (catalog.category) params.category = catalog.category
        if (catalog.brand) params.brand = catalog.brand
        if (catalog.page > 1) params.page = catalog.page
        console.log(params.brand)
        if (params.brand == 0) {
            navigate({
                pathname: '/catalog',
            })
        } else {
            navigate({
                pathname: '/catalog',
                search: '?' + createSearchParams(params),
            })
        }

    }

    return (
        <Container>
            <Form className="d-flex justify-content-center align-items-center justify-content-sm-start">
                <Form.Group as={Col} lg="2" md="3" sm="4" controlId="categorySelect">
                    <Form.Select size="sm" aria-label="Category" onChange={(e)=>onClickCategory(e.target.value)}>
                        <option defaultChecked value={0}>All categories</option>
                        {catalog.categories.map (item => <option
                            key={item.id}
                            value = {item.id}
                        >{item.name}</option>)
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} lg="2" md="3" sm="4" className="mx-3" controlId="typeSelect">
                    <Form.Select size="sm" aria-label="Type" onChange={(e)=>onClickType(e.target.value)}>
                        <option defaultChecked value={0} >All types</option>
                        {catalog.brands.map (item => <option
                            key={item.id}
                            value = {item.id}
                        >{item.name}</option>)
                        }
                    </Form.Select>
                </Form.Group>
            </Form>
        </Container>

    );
});

export default CategoryFilter;