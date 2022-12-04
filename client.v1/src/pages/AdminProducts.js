import { useState, useEffect } from 'react'
import { fetchAllProducts, deleteProduct } from '../http/catalogAPI.js'
import {Button, Container, Table, Pagination} from 'react-bootstrap'
import CreateProduct from '../components/CreateProduct.js'
import UpdateProduct from '../components/UpdateProduct.js'
import Loading from '../components/Loading.js'

// количество товаров на страницу
const ADMIN_PER_PAGE = 6

const AdminProducts = () => {
    const [products, setProducts] = useState([]) // список загруженных товаров
    const [fetching, setFetching] = useState(true) // загрузка списка товаров с сервера
    const [createShow, setCreateShow] = useState(false) // модальное окно создания товара
    const [updateShow, setUpdateShow] = useState(false) // модальное окно редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id товара, который будем редактировать — для передачи в <UpdateProduct id={…} />
    const [product, setProduct] = useState(null)

    // текущая страница списка товаров
    const [currentPage, setCurrentPage] = useState(1)
    // сколько всего страниц списка товаров
    const [totalPages, setTotalPages] = useState(1)

    // обработчик клика по номеру страницы
    const handlePageClick = (page) => {
        setCurrentPage(page)
        setFetching(true)
    }

    // содержимое компонента <Pagination>
    const pages = []
    for (let page = 1; page <= totalPages; page++) {
        pages.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                activeLabel=""
                onClick={() => handlePageClick(page)}
            >
                {page}
            </Pagination.Item>
        )
    }

    const handleUpdateClick = (id) => {
        setProduct(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteProduct(id)
            .then(
                data => {
                    // если это последняя страница и мы удаляем на ней единственный
                    // оставшийся товар — то надо перейти к предыдущей странице
                    if (totalPages > 1 && products.length === 1 && currentPage === totalPages) {
                        setCurrentPage(currentPage - 1)
                    } else {
                        setChange(!change)
                    }
                    console.log(`Item «${data.name}» was deleted`)
                   /* alert(`Item «${data.name}» was deleted`)*/
                }
            )
            .catch(
                error => {
                    console.log(error.response.data.message)
                    /*alert(error.response.data.message)*/
                }
            )
    }

    useEffect(() => {
        fetchAllProducts(null, null, currentPage, ADMIN_PER_PAGE)
            .then(
                data => {
                    setProducts(data.rows)
                    setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE))
                }
            )
            .finally(
                () => setFetching(false)
            )
    }, [change, currentPage])

    if (fetching) {
        return <Loading />
    }

    return (
        <Container className="page-header">
            <h1>Items</h1>
            <Button onClick={() => setCreateShow(true)}>Create item</Button>
            <CreateProduct show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateProduct id={product} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {products.length > 0 ? (
                <>
                    <Table bordered hover size="sm" className="mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Manage</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(item => 
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    {item.image &&
                                        <a href={process.env.REACT_APP_IMG_URL + item.image} target="_blank">Photo</a>
                                        }
                                </td>
                                <td>{item.category?.name || 'NULL'}</td>
                                <td>{item.brand?.name || 'NULL'}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                                        Manage
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </Table>
                    {totalPages > 1 && <Pagination>{pages}</Pagination>}
                </>
            ) : (
                <p>Items list is empty</p>
            )}
        </Container>
    )
}

export default AdminProducts