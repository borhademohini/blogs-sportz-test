// src/App.js

import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
} from "react-router-dom";

import Blog from "./modules/Blog";
import Post from "./modules/Post";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'; 
import './App.css';


function App() {
    return (
        <Container>
            <Row>
                <Col>
                    <Router>
                        <Navbar bg="dark" data-bs-theme="dark">
                            <Container>
                                <Navbar.Brand href="/">ADMIN PANEL</Navbar.Brand>
                                <Nav className="me-auto">
                                    <Nav.Link><Link to="/blogs">Blogs</Link></Nav.Link>
                                    <Nav.Link><Link to="/posts">Posts</Link></Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                        <Routes>
                            <Route path="/" element={<Blog />} />
                            <Route path="/blogs" element={<Blog />} />
                            <Route path="/posts/:id" element={<Post />} />
                            <Route path="/posts" element={<Post />} />
                        </Routes>
                    </Router>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
