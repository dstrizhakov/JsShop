import { Container, Row, Col, Button, Image, Spinner, Table } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import { fetchOneProduct, fetchProdRating } from '../http/catalogAPI.js'
import { useParams } from 'react-router-dom'
import { append } from '../http/basketAPI.js'
import { AppContext } from '../components/AppContext.js'

const Product = () => {
    const { id } = useParams()
    const { basket } = useContext(AppContext)
    const [product, setProduct] = useState(null)
    const [rating, setRating] = useState(null)

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
        fetchProdRating(id).then(data => setRating(data))
    }, [id])

    const handleClick = (productId) => {
        append(productId).then(data => {
            basket.products = data.products
        })
    }

    if (!product) {
        return <Spinner animation="border" />
    }

    return (
        <Container className="section">
            <Row className="mt-3 mb-3">
                <Col xs={12} md={8}>
                    {product.image ? (
                        <Image width={650}  src={process.env.REACT_APP_IMG_URL + product.image} />
                    ) : (
                        <Image width={650} height={450} src="http://via.placeholder.com/300" />
                    )}
                </Col>
                <Col xs={6} md={4}>
                    <h1>{product.name}</h1>
                    <h3>{product.price} USD</h3>
                    <p>Type: {product.brand.name}</p>
                    <p>Category: {product.category.name}</p>
                    <div>
                        {rating ? (
                            <p>Rating: {rating.rating}, голосов {rating.votes}</p>
                        ) : (
                            <Spinner animation="border" />
                        )}
                    </div>
                    <Button className="me-2" variant="warning">Buy on Etsy</Button>{' '}
                    <Button onClick={() => handleClick(product.id)}>Add to basket</Button>
                </Col>
            </Row>
            {!!product.props.length &&
                <Row>
                    <Col>
                        <h3>Details:</h3>
                            <Table bordered hover size="sm">
                                <tbody>
                                    {product.props.map(item => 
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.value}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                    </Col>
                </Row>
            }
        </Container>
    )
}

export default Product