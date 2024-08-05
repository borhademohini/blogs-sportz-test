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
import './animation.css';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const ListPost = () => {
    const POST_URL = constants.POST_URL();
    const POST_URL_BY_BLOG = constants.POST_URL_BY_BLOG();

    let { id } = useParams();

    const { isLoading, serverError, apiData } = useFetch(
        id ? POST_URL_BY_BLOG + id : POST_URL
    );
    const [posts, setPosts] = useState([]);
    const [newPostAdded, setNewPostAdded] = useState(false)

    useEffect(() => {
        const socket = io(constants.BASE_URL, { transports: ['websocket'] });
        socket.on("connect", () => {
            //console.log(socket.id);
        });
        socket.on("NewPostAdded", (newData) => {
            let data = [...posts];
            data.unshift(newData);
            setNewPostAdded(true);
            setTimeout(() => {
                setNewPostAdded(false);
            }, 5000)
            setPosts(data);
        });
    }, [posts])

    useEffect(() => {
        if (apiData.length > 0) setPosts(apiData);
    }, [apiData]);

    return (
        <div className='mt-3'>
            <h1>Blog Post</h1>
            <Link to={`/blogs`}>Go Back to Blog List</Link>
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
        </div>
    )
};

export default React.memo(ListPost);