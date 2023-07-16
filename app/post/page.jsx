"use client"

import React from "react";
import HtmlReactParser from "html-react-parser";

export default function Post(props) {
    
    const [postData, setPostData] = React.useState(null);

    const [newCommentEmail, setNewCommentEmail] = React.useState("");

    const [newCommentText, setNewCommentText] = React.useState("");

    const fetchData = async() => {
        const params = new URLSearchParams(window.location.search);
        const postId = params.get("postid");
        // console.log('postId');
        fetch(`http://localhost:5000/posts/${postId}`)
            .then(response => {
                return response.json();
            }).then(data => {
                console.log('data', data);
                setPostData(data);
            }).catch(error => {
                console.error(error);
            })
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setNewCommentEmail('');
        setNewCommentText('');
        await fetch("http://localhost:5000/comments/create", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: newCommentEmail,
                comment: newCommentText,
                postid: postData.post._id
            })
        });
        fetchData();
    };

    console.log(newCommentEmail)
    console.log(newCommentText)

    return (
        <div className="min-h-screen p-5">
            <h1 className='text-center font-bold text-2xl m-10'><a href="/">nagyb3's blog</a></h1>
            {postData && 
                <div>
                    <div className="border-2 border-black dark:border-white p-5">
                        <h1 className="font-bold text-3xl m-5">{postData.post.title}</h1>
                        <p>{HtmlReactParser(postData.post.text)}</p>
                    </div>
                    <div>
                        <p className="text-lg m-3">Leave a comment:</p>
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="m-3">
                                <label className="m-3" htmlFor="email">Email:</label>
                                <input className="text-black" onChange={e => setNewCommentEmail(e.target.value)} 
                                type="email" name="email" id="email" value={newCommentEmail}/>    
                            </div>
                            <div className="m-3">
                                <label className="m-3" htmlFor="comment">Your Comment:</label>
                                <input className="text-black" onChange={e => setNewCommentText(e.target.value)} type="text" name="text" id="text" value={newCommentText} />
                            </div>
                            <input className="font-bold text-lg dark:bg-white dark:text-black
                             px-4 py-2 m-3 rounded" type="submit" value="SEND" />
                        </form>
                        <p className="m-5 text-lg font-bold">Comments: </p>
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