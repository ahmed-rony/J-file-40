import React, { useState, useEffect } from 'react';
import PostCard from '../PostCard/PostCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const HomePage = () => {
    const [userPost, setUserPost] = useState([]);

    const getPost = async () => {
        const api = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const data = await api.json();
        setUserPost(data);
        console.log(userPost.title);
    }
    useEffect( () =>{
        getPost();
    },[]);


    return (
    
        <Grid container spacing={4}>
            {
                userPost.map((post)=> <PostCard key={post.id}></PostCard>)
            }
            
        </Grid>
    
        // <div>
        //     <h2>momo</h2>
        //     {userPost.map(post =>{
        //         return(
        //             <h3>{post.title}</h3>
        //         )
        //     })}
        // </div>
    )
};

export default HomePage;