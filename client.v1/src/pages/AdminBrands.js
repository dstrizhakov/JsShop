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
                    alert(`Тип «${data.name}» удален`)
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
        <Container>
            <h1>Типы</h1>
            <Button onClick={() => setCreateShow(true)}>Создать тип</Button>
            <CreateBrand show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateBrand id={brand} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {brands.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                                    Редактировать
                                </Button>
                            </td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
                </Table>
            ) : (
                <p>Список типов пустой</p>
            )}
        </Container>
    )
}

export default AdminBrands