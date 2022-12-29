import { Modal } from 'react-bootstrap'

const SendMessage = (props) => {
	const { show } = props
	return (
		<Modal show={show} >
			<Modal.Body>
				<p className='text-center mb-0'>Your message was sended, we will contact you soon.</p>
			</Modal.Body>
		</Modal>
	)
}

export default SendMessage