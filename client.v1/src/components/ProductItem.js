import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



const ProductItem = ({data}) => {
    const navigate = useNavigate()
    return (
        <Col xl={4} lg={6} sm={12} className="mb-3" onClick={() => navigate(`/product/${data.id}`)}>
            <Card style={{cursor: "pointer"}}>
                {data.image ? (
                        <Card.Img className="item-image d-block w-100" variant="bottom" src={process.env.REACT_APP_IMG_URL + data.image} />
                ) : (
                    <Card.Img variant="top" src="http://via.placeholder.com/200" />
                )}
                <Card.Body style={{ overflow: 'hidden'}}>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>{data.brand.name}, {data.price} USD</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductItem