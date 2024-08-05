import React, {
    useState
} from 'react';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddBlog = ({ show, closeNewBlogModal, mode, currentBlog, addBlogHandler }) => {

    const defaultTitle = mode === 'add' ? 'Add New Blog' : 'View Blog';
    const [title, setTitle] = useState(defaultTitle); 

    return (
        <div>           

            <Modal show={show} onHide={closeNewBlogModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form  onSubmit={addBlogHandler}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="" defaultValue={currentBlog ? currentBlog.name : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="desc" as="textarea" rows={3}  defaultValue={currentBlog ? currentBlog.desc : ''} />
                        </Form.Group>
                        {mode === 'add' && <Button variant="primary" type="submit">
                            Submit
                        </Button> }
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default AddBlog;