import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'

const Orders = (props) => {

    if (props.items.length === 0) {
        return <p>Orders list is empty</p>
    }

    return (
        
        <Table bordered hover size="sm" className="mt-3">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Date</th>
                    <th>Buyer</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map(item => 
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.prettyCreatedAt}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.status}</td>
                        <td>{item.amount}</td>
                        <td>
                            {props.admin ? (
                                <Link to={`/admin/order/${item.id}`}>Details</Link>
                            ) : (
                                <Link to={`/user/order/${item.id}`}>Details</Link>
                            )}
                            
                        </td>
                    </tr>
                )}
            </tbody>
            
        </Table>
    
    )
}

export default Orders