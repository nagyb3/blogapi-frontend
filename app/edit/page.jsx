"use client"

import React, { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

export default function Edit() {

    const editorRef = useRef(null);
    
    const [postId, setPostId] = React.useState(null);

    const [postText, setPostText] = React.useState(null);

    const [editedPostIsPublic, setEditedPostIsPublic] = React.useState(true);

    const [titleState, setTitleState] = React.useState(null);

    React.useEffect(() => {
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
                console.error(error)
            });
    }, []);

    const putRequest = () => {
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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postid: postId
            })
        });
    }

    return (
        <div>
            <h1 className='text-center font-bold text-2xl m-10'><a href="/">nagyb3&apos;s blog EDIT POST</a></h1>
            <button className="bg-white text-black p-3 font-bold rounded block" onClick={deletePost}>DELETE THIS POST</button>
            <label htmlFor="ispublic">Post is public:</label>
            <input onChange={() => setEditedPostIsPublic(!editedPostIsPublic)} type="checkbox" name="ispublic" id="ispublic" checked={editedPostIsPublic} />               
            <div>
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
            <button onClick={putRequest} className="m-10 bg-white text-black p-3 rounded font-bold">
                PUT REQUEST
            </button>
        </div>
    )
}