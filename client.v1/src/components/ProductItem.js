import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const ProductItem = ({data}) => {
    const navigate = useNavigate()
    return (
        <Col xl={4} lg={5} sm={7} className="mt-1" onClick={() => navigate(`/product/${data.id}`)}>
            <Card style={{width: 280, cursor: 'pointer'}}>
                {data.image ? (
                    <Card.Img variant="top" src={process.env.REACT_APP_IMG_URL + data.image} />
                ) : (
                    <Card.Img variant="top" src="http://via.placeholder.com/200" />
                )}
                <Card.Body style={{ overflow: 'hidden', padding: "5px"}}>
                    <p style={{ fontSize: 13, marginBottom: "0px", textTransform: "uppercase", textAlign:"center"}}>{data.name}</p>
                </Card.Body>
                {/*<Card.Body style={{ overflow: 'hidden'}}>
                    <p>Type: {data.brand.name}</p>
                    <strong>{data.name}</strong>
                </Card.Body>*/}
            </Card>
        </Col>
    )
}

export default ProductItem