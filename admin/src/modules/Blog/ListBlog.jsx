import React, {
    useState,
    useEffect
} from 'react';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import AddBlog from "./AddBlog";
import useFetch from "../../services/useFetch";
import Alert from "../../services/CustomAlert";
import axios from "axios";
import { constants } from '../../services/Constants';
import { Link } from "react-router-dom";

const ListBlog = () => {
    const DEFAULT_MODE = constants.DEFAULT_MODE;
    const BLOG_URL = constants.BLOG_URL();

    

    //const favoriteFruit = searchParams.get("fruit");

    const { isLoading, serverError, apiData } = useFetch(
        BLOG_URL
    );
    const [blogs, setBlogs] = useState([...apiData] || []);
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [mode, setMode] = useState(DEFAULT_MODE);
    const [currentBlog, setCurrentBlog] = useState({});    

    useEffect(() => {
        setBlogs(apiData);
    }, [apiData]);

    const closeNewBlogModal = () => {
        setShow(false);
        setMode(DEFAULT_MODE);
        setCurrentBlog({});
    }
    const openNewBlogModal = () => setShow(true);

    const openBlogDetails = (blog) => {
        setShow(true);
        setMode('view');
        setCurrentBlog(blog);
    }

    const deleteBlog = (id) => {
        let endpoint = BLOG_URL + '/' + id;

        axios.delete(endpoint)
            .then(response => {
                setBlogs((state) => state.filter((item) => item._id !== id))
            })
            .catch(error => {
                console.log("Blog not deleted :: ", error);

            });

        //setShowAlert(true);
    }

    const updateBlog = (blog) => {
        let endpoint = BLOG_URL + '/' + blog._id;

        let publish = blog.publish ? false : true;
        let formData = { ...blog };
        formData.publish = publish;

        axios.put(endpoint, formData)
            .then(response => {
                let items = [...blogs];
                items = items.map((item) => {
                    return item._id === blog._id ? formData : item;
                })
                setBlogs(items);
            })
            .catch(error => {
                console.log("Blog not deleted :: ", error);
            });
    }

    const addBlogHandler = (event) => {

        event.preventDefault();
        const blog = new FormData(event.target);
        const blogDetails = Object.fromEntries(blog);

        axios.post(BLOG_URL, blogDetails)
            .then(response => {
                setBlogs([...blogs, response.data]);
                closeNewBlogModal();
            })
            .catch(error => {
                closeNewBlogModal();
                console.log("API error response :: ", error);
            });
    }

    console.log("mode :: ", mode);
    return (
        <div>
            <div className='mt-2 mb-2 clearfix'>
                <Button variant="primary" className="float-end"  onClick={openNewBlogModal}>Add New Blog</Button>
            </div>
            <div>

                {isLoading && <span>Loading.....</span>}
                {!isLoading && serverError ? (
                    <span>Error in fetching data ...</span>
                ) : (
                    <ListGroup as="ol" numbered>
                        {blogs && blogs.map((blog, index) => {
                            return (

                                <ListGroup.Item
                                    key={blog._id}
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">
                                        <Link to={`/posts/${blog._id}`}>{blog.name}</Link>
                                           
                                        </div>
                                        {blog.desc}
                                    </div>
                                    <Button onClick={() => updateBlog(blog)}>
                                        {blog.publish ? "Unpublish" : "Publish"}
                                    </Button>
                                    <Button variant="danger" className="ms-2" onClick={() => deleteBlog(blog._id)}>
                                        Delete
                                    </Button>
                                </ListGroup.Item>

                            )
                        })}
                    </ListGroup>
                )}
            </div>

            {show && <AddBlog mode={mode} show={show} currentBlog={currentBlog} closeNewBlogModal={closeNewBlogModal} addBlogHandler={addBlogHandler} />}
            {showAlert && <Alert showAlert={showAlert} closeAlertModal={() => setShowAlert(false)} proceed={deleteBlog} />}

        </div >
    )
};

export default React.memo(ListBlog);