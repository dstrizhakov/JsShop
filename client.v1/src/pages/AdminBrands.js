import { useState, useEffect } from 'react'
import { fetchBrands, deleteBrand } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import CreateBrand from '../components/CreateBrand.js'
import UpdateBrand from '../components/UpdateBrand.js'

const AdminBrands = () => {
    const [brands, setBrands] = useState(null) // список загруженных типов
    const [fetching, setFetching] = useState(true) // загрузка списка типов с сервера
    const [createShow, setCreateShow] = useState(false) // модальное окно создания типа
    const [updateShow, setUpdateShow] = useState(false) // модальное окно редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id типа, который будем редактировать — для передачи в <UpdateBrand id={…} />
    const [brand, setBrand] = useState(null)

    const handleUpdateClick = (id) => {
        setBrand(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteBrand(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Type «${data.name}» was deleted`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchBrands()
            .then(
                data => setBrands(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container className="page-header">
            <h1>Types</h1>
            <Button onClick={() => setCreateShow(true)}>Create type</Button>
            <CreateBrand show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateBrand id={brand} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {brands.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manage</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
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
            ) : (
                <p>Types list is empty</p>
            )}
        </Container>
    )
}

export default AdminBrands