import React, {
    useState,
    useEffect
} from 'react';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import AddPost from "./AddPost";
import useFetch from "../../services/useFetch";
import Alert from "../../services/CustomAlert";
import axios from "axios";
import { constants } from '../../services/Constants';
import { useParams } from 'react-router-dom';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListPost = () => {
    const DEFAULT_MODE = constants.DEFAULT_MODE;
    const POST_URL = constants.POST_URL();
    const POST_URL_BY_BLOG = constants.POST_URL_BY_BLOG();

    let { id } = useParams();

    const { isLoading, serverError, apiData } = useFetch(
        id ? POST_URL_BY_BLOG + id : POST_URL
    );
    const [posts, setPosts] = useState([...apiData] || []);
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [mode, setMode] = useState(DEFAULT_MODE);
    const [currentPost, setCurrentPost] = useState({});

    useEffect(() => {
        setPosts(apiData);
    }, [apiData]);

    const closeNewPostModal = () => {
        setShow(false);
        setMode(DEFAULT_MODE);
        setCurrentPost({});
    }
    const openNewpostModal = () => setShow(true);

    const openPostDetails = (post, view) => {
        setShow(true);
        setMode(view);
        setCurrentPost(post);
    }

    const deletePost = (id) => {
        let endpoint = POST_URL + '/' + id;

        axios.delete(endpoint)
            .then(response => {
                toast.success("Post has been deleted successfully.");
                setPosts((state) => state.filter((item) => item._id !== id))
            })
            .catch(error => {
                console.log("post not deleted :: ", error);

            });

        //setShowAlert(true);
    }

    const updatePost = (post, formData) => {
        let items = [...posts];
        items = items.map((item) => {
            return item._id === post._id ? formData : item;
        })
        setPosts(items);
    }

    const postHandler = (event, actionMode) => {

        event.preventDefault();
        const post = new FormData(event.target);
        let postDetails = Object.fromEntries(post);
        postDetails = Object.assign(currentPost, postDetails)
        const params = mode === 'edit' ? '/' + postDetails._id : '';
        postDetails.blog_id = id;

        axios({
            // Endpoint to send files
            url: POST_URL + params,
            method: constants.API_METHOD[mode],
            // Attaching the form data
            data: postDetails,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            // Handle the response from backend here
            .then((response) => {
                
                if (mode === 'edit') {
                    toast.success("Post has been updated successfully.");
                    updatePost(currentPost, postDetails);
                }
                else {
                    toast.success("Post has been added successfully.");
                    setPosts([...posts, response.data]);
                }
            })
            // Catch errors if any
            .catch((err) => {
            })
            .finally(() => {
                closeNewPostModal();
            });

    }

    return (
        <div>
            {id && <div className='mt-2 mb-2 clearfix'>
                <Button variant="primary" className="float-end" onClick={openNewpostModal}>Add New Post</Button>
            </div> }
            <div className='mt-2'>

                {isLoading && <span>Loading.....</span>}
                {!isLoading && serverError ? (
                    <span>Error in fetching data ...</span>
                ) : (
                    <ListGroup as="ol" numbered>
                        {posts && posts.map((post, index) => {
                            return (

                                <ListGroup.Item
                                    key={post._id}
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold"><a href="javascript:void(0)" onClick={() => openPostDetails(post, 'view')}>{post.title}</a></div>
                                        <span className='limited-text'>{post.desc}</span>
                                    </div>
                                    <Button onClick={() => openPostDetails(post, 'edit')}>
                                        Update
                                    </Button>
                                    <Button variant="danger" className="ms-2" onClick={() => deletePost(post._id)}>
                                        Delete
                                    </Button>
                                </ListGroup.Item>

                            )
                        })}
                    </ListGroup>
                )}
            </div>

            {show && <AddPost mode={mode} show={show} currentPost={currentPost} closeNewPostModal={closeNewPostModal} postHandler={postHandler} />}
            {showAlert && <Alert showAlert={showAlert} closeAlertModal={() => setShowAlert(false)} proceed={deletePost} />}
            <ToastContainer />
        </div >
    )
};

export default React.memo(ListPost);