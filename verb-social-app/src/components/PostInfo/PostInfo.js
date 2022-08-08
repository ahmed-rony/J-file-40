import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostInfo = () => {
    const [postInfo, setPostInfo] = useState({});
    const [postComment, setPostComment] = useState([])

    let params = useParams();

    const getPostInfo = async (post) => {
        const api = await fetch(`https://jsonplaceholder.typicode.com/posts/${post}`);
        const data = await api.json();
        setPostInfo(data);
        console.log(postInfo);
    }
    const getComment = async (comment) => {
        const api2 = await fetch(`https://jsonplaceholder.typicode.com/comments/${comment}`);
        const data2 = await api2.json();
        setPostComment(data2);
        
    }
    useEffect( () =>{
        getPostInfo(params.id);
        getComment(params.id)
    },[params.id]);

    return (
        <div>
            <h1>{postInfo.title}</h1>
            <h4>{postInfo.body}</h4>
            <p style={{background:'red'}}>{postComment.name}</p>
        </div>
    )
};

export default PostInfo;