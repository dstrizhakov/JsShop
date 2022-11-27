import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const ProductItem = ({data}) => {
    const navigate = useNavigate()
    return (
        <Col xl={4} lg={6} sm={12} className="mb-3" onClick={() => navigate(`/product/${data.id}`)}>
            <Card style={{cursor: "pointer"}}>
                {data.image ? (
                    <>
                        <Card.Header>{data.name}</Card.Header>
                        <Card.Img className="d-block w-100" variant="bottom" src={process.env.REACT_APP_IMG_URL + data.image} />
                    </>

                ) : (
                    <Card.Img variant="top" src="http://via.placeholder.com/200" />
                )}
               {/* <Card.Body style={{ overflow: 'hidden', padding: "5px"}}>
                    <p style={{ fontSize: 13, marginBottom: "0px", textTransform: "uppercase", textAlign:"center"}}>{data.name}</p>
                </Card.Body>*/}
                {/*<Card.Body style={{ overflow: 'hidden'}}>
                    <p>Type: {data.brand.name}</p>
                    <strong>{data.name}</strong>
                </Card.Body>*/}
            </Card>
        </Col>
    )
}

export default ProductItem