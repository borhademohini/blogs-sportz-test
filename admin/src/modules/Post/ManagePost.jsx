import React, {
    useState,
    useEffect
} from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { constants } from '../../services/Constants';
const AddPost = ({ show, closeNewPostModal, mode, currentPost, postHandler }) => {

    const defaultTitle = constants.POST_PAGE_TITLES[mode];
    const [title, setTitle] = useState(defaultTitle);
    const [postType, setPostType] = useState(currentPost ? currentPost.post_type : 'simple_post');

    return (
        <div>

            <Modal show={show} onHide={closeNewPostModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => postHandler(e, mode)} encType="multipart/form-data">
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Post Type</Form.Label>
                            <Form.Select aria-label="Default select example" name="post_type" onChange={(e) => setPostType(e.target.value)}>
                                {Object.keys(constants.POST_TYPES).map((key, index) => {
                                    return <option value={key} selected={currentPost && currentPost.post_type === key }>{constants.POST_TYPES[key]}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" type="text" placeholder="" required defaultValue={currentPost ? currentPost.title : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="desc" as="textarea" rows={5} defaultValue={currentPost ? currentPost.desc : ''} />
                        </Form.Group>
                        {postType === 'image_post' && <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Image</Form.Label>
                            {mode === 'view' ? <a href={`${constants.BASE_URL}/uploads/${currentPost.image}`} rel="noreferrer" target='_blank'><img width="50%" src={`${constants.BASE_URL}/uploads/${currentPost.image}`} alt="post" /></a> : <Form.Control name="image" type="file" />}
                        </Form.Group>}

                        {postType === 'metadata_post' && <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Meta Url</Form.Label>
                            <Form.Control name="url" type="text" placeholder="" defaultValue={currentPost ? currentPost.url : ''} />
                        </Form.Group>}

                        {postType === 'facebook_post' && <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Embed Facebook Post</Form.Label>
                            <Form.Control name="facebook_post" as="textarea" rows={5} defaultValue={currentPost ? currentPost.facebook_post : ''} />
                        </Form.Group>}

                        {postType === 'twitter_post' && <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Embed Twitter Post</Form.Label>
                            <Form.Control name="twitter_post" as="textarea" rows={5} defaultValue={currentPost ? currentPost.twitter_post : ''} />
                        </Form.Group>}

                        {mode !== 'view' && <Button className="mt-3" variant="primary" type="submit">
                            Submit
                        </Button>}
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
};

export default AddPost;