import {Button, ListGroup} from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from './AppContext.js'
import { observer } from 'mobx-react-lite'
import { useNavigate, createSearchParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';

const CategoryBar = observer(() => {
    const { catalog } = useContext(AppContext)
    const navigate = useNavigate()

    const handleClick = (id) => {
        if (id === catalog.category) {
            catalog.category = null
        } else {
            catalog.category = id
        }
        // при каждом клике добавляем в историю браузера новый элемент
        const params = {}
        if (catalog.category) params.category = catalog.category
        if (catalog.brand) params.brand = catalog.brand
        if (catalog.page > 1) params.page = catalog.page
        if (params.category === 0) {
            navigate({
                pathname: '/catalog'
            })
        } else {
            navigate({
                pathname: '/catalog',
                search: '?' + createSearchParams(params),
            })
        }

    }

    return (
        <>
               {/* <Form.Select aria-label="Category">
                <option defaultChecked >All</option>
                {catalog.categories.map (item => <option
                    key={item.id}
                    value = {`${item.name}`}
                    onChange={() => handleClick(item.id)}
                >{item.name}</option>)
                }

            </Form.Select>*/}

            <p style={{cursor: 'pointer'}} onClick={() => handleClick(0)}>All</p>
            {catalog.categories.map(item =>
                <p
                    key={item.id}
                    active={item.id === catalog.category}
                    onClick={() => handleClick(item.id)}
                    style={{cursor: 'pointer'}}
                >
                    {item.name}
                </p>
            )}
        </>
    )
})

export default CategoryBar