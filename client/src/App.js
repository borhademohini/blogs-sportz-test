import React, {
	useState,
	useEffect
} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import ListPost from './ListPost';
import ListBlog from './ListBlog'

const App = () => {

	console.log("App ::");

	return (
		<Container>
            <Row>
                <Col>
                    <Router>
                        <Routes>
                            <Route path="/" element={<ListBlog />} />
                            <Route path="/blogs" element={<ListBlog />} />
                            <Route path="/posts/:id" element={<ListPost />} />
                            <Route path="/posts" element={<ListPost />} />
                        </Routes>
                    </Router>
                </Col>
            </Row>
        </Container>
	);
};

export default App;
