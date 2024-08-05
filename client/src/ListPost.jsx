import React, {
    useState,
    useEffect
} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import useFetch from "./shared/useFetch";
import { constants } from './shared/Constants';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { io } from "socket.io-client";
import './custom.css';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const ListPost = () => {
    const POST_URL = constants.POST_URL();
    const POST_URL_BY_BLOG = constants.POST_URL_BY_BLOG();

    let { id } = useParams();

    const { isLoading, serverError, apiData } = useFetch(
        id ? POST_URL_BY_BLOG + id : POST_URL
    );
    const [posts, setPosts] = useState([]);
    const [newPostAdded, setNewPostAdded] = useState(false);
    const [socket, setSocket] = useState(null);
    const toastId = React.useRef(null);

    useEffect(() => {
        const newSocket = io(constants.BASE_URL, { transports: ['websocket'] });
        setSocket(newSocket);
        newSocket.on("connect", () => {
            //console.log(socket.id);
        });
    }, [])

    useEffect(() => {
        if (!socket) return;
        socket.on("NewPostAdded", (newData) => {
            let message = "New Post has been added!";
            if (id === newData.blog_id) {
                let data = [...posts];
                data.unshift(newData); // Add new post on top
                setNewPostAdded(true);
                setTimeout(() => {
                    setNewPostAdded(false);
                }, 5000)
                setPosts(data);
            } else {
                message = "New Post has been added to another blog!";
            }
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.info(message, {
                    position: "top-right",
                    autoClose: false
                });
            }
        });
    }, [posts])

    useEffect(() => {
        if (apiData.length > 0) setPosts(apiData);
    }, [apiData]);

    return (
        <div className='mt-3'>
            <Breadcrumb>
                <Breadcrumb.Item href="#"><Link to={`/blogs`}>Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item active>Blog Posts</Breadcrumb.Item>
            </Breadcrumb>
            {isLoading && <Row><Col>Loading.....</Col></Row>}
            {!isLoading && serverError ? (
                <Row><Col>Error in fetching data ...</Col></Row>
            ) : (
                <>
                    {posts && posts.length > 0 ?
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                        >
                            <Masonry gutter="10px">
                                {posts && posts.map((post, index) => {
                                    return (
                                        <Card className={newPostAdded && index === 0 ? 'blinking-text' : ''}>
                                            {post.image && <Card.Img variant="top" src={`${constants.BASE_URL}/uploads/${post.image}`} />}
                                            {post.facebook_post && <div className='social-media' width="100%" dangerouslySetInnerHTML={{ __html: post.facebook_post }} />}
                                            {post.twitter_post && <div className='social-media' width="100%" dangerouslySetInnerHTML={{ __html: post.twitter_post }} />}
                                            <Card.Body>
                                                <Card.Title >{post.title}</Card.Title>
                                                <Card.Text>
                                                    {post.desc}
                                                </Card.Text>
                                            </Card.Body>
                                            {post.metadata && (
                                                <>
                                                    <ListGroup className="list-group-flush">
                                                        {Object.keys(constants.METADATA_KEYS).map((key, index) => {
                                                            return (
                                                                post.metadata[key] ? (<ListGroup.Item>{constants.METADATA_KEYS[key]} : {post.metadata[key]}</ListGroup.Item>) : ''
                                                            )
                                                        })}
                                                    </ListGroup>
                                                    <Card.Body>
                                                        <Card.Link href={post.url} target='_blank'>Explore More</Card.Link>
                                                    </Card.Body>
                                                </>)}
                                        </Card>
                                    )
                                })}
                            </Masonry>
                        </ResponsiveMasonry> : <h4 className='mt-3'>No Posts added yet</h4>}
                </>
            )}
            <ToastContainer />
        </div>
    )
};

export default React.memo(ListPost);