import BasketList from '../components/BasketList.js'
import { Container } from 'react-bootstrap'

const Basket = () => {
    return (
        <Container className="page-header">
            <div className="container position-relative">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10 text-center">
            <h1>Basket</h1>
            <BasketList />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Basket