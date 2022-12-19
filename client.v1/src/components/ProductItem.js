import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



const ProductItem = ({data}) => {
    const navigate = useNavigate()
    return (
        <Col xl={4} lg={6} sm={12} className="mb-3" onClick={() => navigate(`/product/${data.id}`)}>
            <Card style={{cursor: "pointer"}}>
                {data.image ? (
                    <>
                        {/* <Card.Header style={{ overflow: 'hidden', padding: "5px"}}>
                            <p style={{ fontSize: 13, marginBottom: "0px", textTransform: "uppercase", textAlign:"center"}}>{data.name}</p>
                            </Card.Header> */}
                        <Card.Img className="item-image d-block w-100" variant="bottom" src={process.env.REACT_APP_IMG_URL + data.image} />
                    </>

                ) : (
                    <Card.Img variant="top" src="http://via.placeholder.com/200" />
                )}
               {/* <Card.Footer style={{ overflow: 'hidden', padding: "5px"}}>
                    <p style={{ fontSize: 13, marginBottom: "0px", textTransform: "uppercase", textAlign:"center"}}>{data.brand.name}</p>
                </Card.Footer> */}
                {/*<Card.Body style={{ overflow: 'hidden'}}>
                    <p>Type: {data.brand.name}</p>
                    <strong>{data.name}</strong>
                </Card.Body>*/}
            </Card>
        </Col>
    )
}

export default ProductItem