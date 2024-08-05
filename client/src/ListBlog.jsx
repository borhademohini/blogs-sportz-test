import React, {
    useState,
    useEffect
} from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import useFetch from "./shared/useFetch";
import { constants } from './shared/Constants';
import { Link } from "react-router-dom";

const ListBlog = () => {
    const BLOG_URL = constants.BLOG_URL();
    const { isLoading, serverError, apiData } = useFetch(
        BLOG_URL
    );
    const [blogs, setBlogs] = useState([...apiData] || []);

    useEffect(() => {
        setBlogs(apiData);
    }, [apiData]);


    return (
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
                            </ListGroup.Item>

                        )
                    })}
                </ListGroup>
            )}
        </div>

    )
};

export default React.memo(ListBlog);