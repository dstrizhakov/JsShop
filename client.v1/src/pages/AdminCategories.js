// import { useState, useEffect } from 'react'
// import { fetchCategories, deleteCategory } from '../http/catalogAPI.js'
// import { Button, Container, Table } from 'react-bootstrap'
// import CreateCategory from '../components/CreateCategory.js'
// import UpdateCategory from '../components/UpdateCategory.js'
// import Loading from '../components/Loading.js'

// const AdminCategories = () => {
//     const [categories, setCategories] = useState(null) // список загруженных категорий
//     const [fetching, setFetching] = useState(true) // загрузка списка категорий с сервера
//     const [createShow, setCreateShow] = useState(false) // модальное окно создания категории
//     const [updateShow, setUpdateShow] = useState(false) // модальное окно редактирования
//     // для обновления списка после добавления, редактирования, удаления — изменяем состояние
//     const [change, setChange] = useState(false)
//     // id категории, которую будем редактировать — для передачи в <UpdateCategory id={…} />
//     const [category, setCategory] = useState(null)

//     const handleUpdateClick = (id) => {
//         setCategory(id)
//         setUpdateShow(true)
//     }

//     const handleDeleteClick = (id) => {
//         deleteCategory(id)
//             .then(
//                 data => {
//                     setChange(!change)
//                     alert(`Categoru «${data.name}» was deleted`)
//                 }
//             )
//             .catch(
//                 error => alert(error.response.data.message)
//             )
//     }

//     useEffect(() => {
//         fetchCategories()
//             .then(
//                 data => setCategories(data)
//             )
//             .finally(
//                 () => setFetching(false)
//             )
//     }, [change])

//     if (fetching) {
//         return <Loading />
//     }

//     return (
//         <Container className="page-header">
//             <h1>Categories</h1>
//             <Button onClick={() => setCreateShow(true)}>Create category</Button>
//             <CreateCategory show={createShow} setShow={setCreateShow} setChange={setChange} />
//             <UpdateCategory id={category} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
//             {categories.length > 0 ? (
//                 <Table bordered hover size="sm" className="mt-3">
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Manage</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {categories.map(item => 
//                             <tr key={item.id}>
//                                 <td>{item.name}</td>
//                                 <td>
//                                     <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
//                                         Manage
//                                     </Button>
//                                 </td>
//                                 <td>
//                                     <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
//                                         Delete
//                                     </Button>
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </Table>
//             ) : (
//                 <p>Category list is empty</p>
//             )}
//         </Container>
//     )
// }

// export default AdminCategories

import { useState, useEffect } from 'react'
import { fetchCategories, deleteCategory } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditCategory from '../components/EditCategory.js'

const AdminCategories = () => {
    const [categories, setCategories] = useState(null) // список загруженных категорий
    const [fetching, setFetching] = useState(true) // загрузка списка категорий с сервера
    const [show, setShow] = useState(false) // модальное окно создания-редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id категории, которую будем редактировать — для передачи в <EditCategory id={…} />
    const [categoryId, setCategoryId] = useState(null)

    const handleCreateClick = () => {
        setCategoryId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setCategoryId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteCategory(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Категория «${data.name}» удалена`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchCategories()
            .then(
                data => setCategories(data)
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
            <h1>Categories</h1>
            <Button onClick={() => handleCreateClick()}>Create category</Button>
            <EditCategory id={categoryId} show={show} setShow={setShow} setChange={setChange} />
            {categories.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Manage</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(item => 
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
                <p>Список категорий пустой</p>
            )}
        </Container>
    )
}

export default AdminCategories