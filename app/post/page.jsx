"use client"

import React from "react";
import HtmlReactParser from "html-react-parser";

export default function Post(props) {
    
    const [postData, setPostData] = React.useState(null);

    const [newCommentEmail, setNewCommentEmail] = React.useState("");

    const [newCommentText, setNewCommentText] = React.useState("");

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const [isAdmin, setIsAdmin] = React.useState(false);

    const fetchData = async() => {
        setIsAdmin(localStorage.getItem('is_admin') === 'true');
        setIsLoggedIn(localStorage.getItem('access_token') !== null);
        const params = new URLSearchParams(window.location.search);
        const postId = params.get("postid");
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`)
            .then(response => {
                return response.json();
            }).then(data => {
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

    function handleSignOut() {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
    }

    return (
        <div className="min-h-screen">
            <div className='flex justify-between items-center border-black border-b-2 dark:border-white'>
                <h1 className='text-center font-bold text-xl md:text-2xl p-4 md:p-12 pr-0'><a href="/">nagyb3&apos;s blog</a></h1>
                {isLoggedIn ? 
                <div>
                { isAdmin ? <button className='mr-6'><a href="/admin">Admin</a></button> : undefined }
                <button className='my-10 mx-3 md:mx-12' onClick={handleSignOut}>
                    Sign Out
                </button>
                </div>
                
                : 
                <div>
                <button className='h-min mx-3 md:mx-10 bg-white p-3 rounded text-black font-bold'><a href="/signup">Sign Up</a></button>
                <button className='my-10 mx-6 md:mx-12 font-bold'><a href="/login">Log In</a></button>
                </div>
            }
            </div>
            {postData && 
                <div>
                    {isAdmin ? <button className="font-semibold mt-8 ml-8">
                        <a href={`/edit?postid=${postData.post._id}`}>Edit Post-&gt;</a>
                        </button> : undefined}
                    <div className="border-2 border-black dark:border-white p-5 bg-white dark:bg-black rounded my-8 mx-4">
                        <h1 className="font-bold text-3xl m-5">{postData.post.title}</h1>
                        {HtmlReactParser(postData.post.text)}
                    </div>
                    <div>
                        {isLoggedIn ? 
                        <div>
                            <form onSubmit={e => handleSubmit(e)}>
                                <p className="m-5 text-lg font-bold">Comments: </p>
                                <div className="mb-2 ml-2 flex items-center flex-wrap">
                                    <label className="m-2" htmlFor="comment">Leave a comment:</label>
                                    <input className="text-black p-2 rounded" onChange={e => setNewCommentText(e.target.value)} type="text" name="text" id="text" value={newCommentText} />
                                    <input className="font-bold text-lg dark:bg-white bg-gray-700 text-white dark:text-black
                                    px-4 py-2 m-3 rounded" type="submit" value="SEND-&gt;" />
                                </div>
                            </form>
                        </div>    
                    : 
                        <p className="m-5"><a href="/login">Log in to leave a comment!</a></p>
                    }
                        <div className="ml-12">
                            { postData.comments.length === 0 ? 
                                <p>There are no comments yet!</p>
                            :
                            <ul className="list-disc">
                                {postData.comments.map(comment => {
                                    return <li className="p-3 pl-0" key={comment._id}>
                                        {comment.user_email}: {comment.text}
                                    </li>
                                })}
                            </ul>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )   
}