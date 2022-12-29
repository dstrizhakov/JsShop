import { Button } from 'react-bootstrap'
import { propTypes } from 'react-bootstrap/esm/Image';

const BasketItem = (props) => {

	return (
		<tr>
			<td>{props.name}</td>
			<td>
				<Button variant="primary" size="sm" onClick={() => props.decrement(props.id)}>-</Button>
				{' '}<strong>{props.quantity}</strong>{' '}
				<Button variant="primary" size="sm" onClick={() => props.increment(props.id)}>+</Button>
			</td>
			<td>{props.price}</td>
			<td>{props.price * props.quantity}</td>
			<td>
				<Button variant="link" onClick={() => props.remove(props.id)}>
					Delete
				</Button>
			</td>
		</tr>
	);
}

export default BasketItem