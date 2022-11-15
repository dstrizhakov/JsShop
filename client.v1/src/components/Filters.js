import React from 'react';
import CategoryBar from "./CategoryBar";
import BrandBar from "./BrandBar";
import {Accordion} from "react-bootstrap";

const Filters = () => {
    return (
        <>
        {/*<div className="mt-0 p-0 w-auto">
            <p className="mt-1 mb-1 text-center">Category filter</p>
            <CategoryBar/>
            <p className="mt-3 mb-1 text-center">Type filter</p>
            <BrandBar/>
        </div>*/}
            <Accordion defaultActiveKey={['0']} alwaysOpen>
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