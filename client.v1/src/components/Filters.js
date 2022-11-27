import React from 'react';
import CategoryBar from "./CategoryBar";
import BrandBar from "./BrandBar";
import {Accordion, Button, Form} from "react-bootstrap";

const Filters = () => {
    return (
        <>
            <Accordion style={{minWidth: '150px'}} defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Category</Accordion.Header>
                    <Accordion.Body>
                        <CategoryBar/>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Type</Accordion.Header>
                    <Accordion.Body>
                        <BrandBar/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
    </>
    );
};

export default Filters;