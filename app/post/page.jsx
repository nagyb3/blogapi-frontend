"use client"

import React from "react";

export default function Post(props) {
    
    const [postData, setPostData] = React.useState(null);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get("postid");
        console.log('postId');
        fetch(`http://localhost:5000/posts/${postId}`)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log('data', data);
                setPostData(data);
            }).catch(error => {
                console.error(error);
            })
    }, []);

    return (
        <div className="min-h-full m-5">
            <h1 className='text-center font-bold text-2xl m-10'><a href="/">nagyb3's blog</a></h1>
            {postData && 
                <div>
                    <div className="border-2 border-black dark:border-white p-5">
                        <h1 className="font-bold text-3xl m-5">{postData.post.title}</h1>
                        <p>{postData.post.text}</p>
                    </div>
                    <div>
                        <p>comments: </p>
                        {postData.comments.map(comment => {
                            return <div key={comment._id}>
                                <p>{comment.user_email}: {comment.text}</p>
                            </div>
                        })}
                    </div>
                </div>
            }
        </div>
    )   
}