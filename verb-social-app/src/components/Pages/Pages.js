import { Container } from '@mui/system';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import PostInfo from '../PostInfo/PostInfo';

const Pages = () => {
    return (
        
        <Container sx={{marginTop: '40px', background: '#EEEDE7'}}>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/post/:id' element={<PostInfo />}></Route>
                </Routes>
            </Router>

        </Container>
        
        
    )
};

export default Pages;