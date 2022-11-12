import React from 'react';
import CategoryBar from "./CategoryBar";
import BrandBar from "./BrandBar";

const Filters = () => {
    return (
        <div className="mt-0 p-0 w-auto">
            <p className="mt-1 mb-1 text-center">Category filter</p>
            <CategoryBar/>
            <p className="mt-3 mb-1 text-center">Type filter</p>
            <BrandBar/>
        </div>
    );
};

export default Filters;