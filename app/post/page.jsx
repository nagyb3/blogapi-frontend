"use client"

import React from "react";
import HtmlReactParser from "html-react-parser";

export default function Post(props) {
    
    const [postData, setPostData] = React.useState(null);

    const [newCommentEmail, setNewCommentEmail] = React.useState("");

    const [newCommentText, setNewCommentText] = React.useState("");

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const fetchData = async() => {
        setIsLoggedIn(localStorage.getItem('access_token') !== null);
        const params = new URLSearchParams(window.location.search);
        const postId = params.get("postid");
        // console.log('postId');
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`)
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
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create`, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: localStorage.getItem('username'),
                comment: newCommentText,
                postid: postData.post._id
            })
        });
        fetchData();
    };

    // console.log(newCommentEmail)
    // console.log(newCommentText)

    function handleSignOut() {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
    }

    return (
        <div className="min-h-screen">
            <div className='flex justify-between items-center border-black border-b-2 dark:border-white'>
                <h1 className='text-center font-bold text-2xl p-12'><a href="/">nagyb3's blog</a></h1>
                {isLoggedIn ? 
                <button className='m-12' onClick={handleSignOut}>
                    Sign Out
                </button>
                
                : 
                <div>
                    <button className='h-min m-10 bg-white p-3 rounded text-black font-bold'><a href="/signup">Sign Up</a></button>
                    <button className='m-12 font-bold'><a href="/login">Log In</a></button>
                </div>
            }
            </div>
            {postData && 
                <div>
                    <div className="border-2 border-black dark:border-white p-5 bg-white dark:bg-black rounded my-8 mx-4">
                        <h1 className="font-bold text-3xl m-5">{postData.post.title}</h1>
                        <p>{HtmlReactParser(postData.post.text)}</p>
                    </div>
                    <div>
                        {isLoggedIn ? 
                        <div>
                            <p className="text-lg m-3 font-semibold">Leave a comment:</p>
                            <form onSubmit={e => handleSubmit(e)}>
                                {/* <div className="m-3">
                                    <label className="m-3" htmlFor="email">Email:</label>
                                    <input className="text-black" onChange={e => setNewCommentEmail(e.target.value)} 
                                    type="email" name="email" id="email" value={newCommentEmail}/>    
                                </div> */}
                                <div className="m-3 flex items-center">
                                    <label className="m-3" htmlFor="comment">Your Comment:</label>
                                    <input className="text-black p-2 rounded" onChange={e => setNewCommentText(e.target.value)} type="text" name="text" id="text" value={newCommentText} />
                                    <input className="font-bold text-lg dark:bg-white bg-gray-700 text-white dark:text-black
                                    px-4 py-2 m-3 rounded" type="submit" value="SEND" />
                                </div>
                            </form>
                        </div>    
                    : 
                        <p className="m-5"><a href="/login">Log in to leave a comment!</a></p>
                    }
                        <p className="m-5 text-lg font-bold">Comments: </p>
                        <div className="ml-12">
                            {postData.comments.map(comment => {
                                return <div className="p-3" key={comment._id}>
                                    <p>{comment.user_email}: {comment.text}</p>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    )   
}