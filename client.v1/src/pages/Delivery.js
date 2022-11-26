import Container from 'react-bootstrap/Container'
import React from "react";

const Delivery = () => {
    return (
        <Container className="page-header d-flex align-items-center">
            <div className="container position-relative">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10 text-center">
                        <h1>Shipping Policy</h1>
                        <p>Shipping is included in the price of the goods. I ship the goods within 1-3 business days
                            after payment. Delivery times depend on the country and the workload of postal services.
                            Usually delivery around the world takes from 2 to 4 weeks. During the holiday months,
                            sometimes parcels are delayed for another week.</p>
                        <p>You can always contact me to clarify the status of the shipment, I track all my shipments. In
                            case of mail errors and the loss of the parcel, I will refund you the paid cost in full.</p>
                    </div>
                </div>
            </div>

        </Container>
    )
}

export default Delivery