"use client";

import React, { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

export default function Edit() {

    const editorRef = useRef(null);
    
    const [postId, setPostId] = React.useState(null);

    const [postText, setPostText] = React.useState(null);

    const [editedPostIsPublic, setEditedPostIsPublic] = React.useState(true);

    const [titleState, setTitleState] = React.useState(null);

    const [isAdmin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
        setIsAdmin(localStorage.getItem('is_admin') === 'true')
        const params = new URLSearchParams(window.location.search);
        const postIdParam = params.get("postid");
        setPostId(postIdParam);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postIdParam}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setTitleState(data.post.title);
                setPostText(data.post.text);
                setEditedPostIsPublic(data.post.is_public);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleEditSubmit = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/edit`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postid: postId,
                title: titleState,
                textcontent: editorRef.current.getContent(),
                isPublic: editedPostIsPublic
            })
        }).then(response => {
            return response
        }).then(data => {
            
        }).then(error => {
            console.error(error);
        })
    }

    function deletePost() {
        if (confirm("Are you sure you want to delete this post?") === true) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postid: postId
                })
            }).then(response => {
                if (response.ok) {
                    window.location.href = '/';
                }
            })
        }
    }

    return (
        <div>
            <h1 className='text-center font-bold text-2xl m-10'><a href="/">nagyb3&apos;s blog</a></h1>
            {
                isAdmin ? 
                <div>
                    <div className="flex flex-col items-center">
                        <h1 className='font-bold text-2xl m-6 mt-0'>EDIT POST</h1>
                        <button className="text-white m-5 p-3 bg-cyan-800 w-fit rounded-2xl text-base text-base" onClick={deletePost}>DELETE THIS POST</button>
                        <div className="m-5 text-center flex gap-3">
                            <label htmlFor="ispublic">Post is public:</label>
                            <input onChange={() => setEditedPostIsPublic(!editedPostIsPublic)} type="checkbox" name="ispublic" id="ispublic" checked={editedPostIsPublic} />                   
                        </div>
                    </div>
                    <div className="mx-7">
                        <Editor
                            apiKey='9utnb2ang81zj7r55a0smpbengk80fx7utcnliw8bielweiy'
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={postText}
                            init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button onClick={handleEditSubmit} className="text-white m-5 p-3 bg-cyan-800 w-fit rounded-2xl font-bold">
                            SAVE EDITED POST
                        </button>
                    </div>
                </div>
                :
                <p className="text-center text-3xl">YOU ARE NOT ADMIN!</p>
            }
        </div>
    )
}