import React, { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

const PostCard = () => {
    const [userPost, setUserPost] = useState([]);
    // const [postImg, setPostImg] = useState([]);

    const getUserPost = async () => {
        const api = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const data = await api.json();
        setUserPost(data);
        
    }
    // const getAvater = async () => {
    //     const api2 = await fetch(`https://avatars.dicebear.com/api/male/.svg?mood[]=happy`);
    //     const data2 = await api2.json();
    //     setUserPost(data2);
    //     console.log(userPost);
        
    // }
    // const getPostImg = async () => {
    //     const api = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    //     const data = await api.json();
    //     setPostImg(data);
        
    // }
    useEffect(() =>{
        getUserPost();
        
    },[]);

    return (
        <>
        {
            userPost.map(details =>{
                return(
                    <Grid key={details.id} item xs={4}>
                        <Link to={'/post/' + details.id}>
                        <Card sx={{ maxWidth: 345, height: 400, border: '2px solid gold', borderRadius: '5px' }}>
                            <CardHeader
                                avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                                }
                                // action={
                                // <IconButton aria-label="settings">
                                //     <MoreVertIcon />
                                // </IconButton>
                                // }
                                title={details.title}
                                subheader="September 14, 2016"
                            />
                            
                            <CardMedia
                                component="img"
                                height="194"
                                // image={details.url}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="#333">
                                {details.body}
                                </Typography>
                            </CardContent>
                                    
                        </Card>
                        </Link>
                        
                        
                        
                    </Grid>
                )
            })
        }
        </>
    );
};

export default PostCard;