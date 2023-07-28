"use client"

import React, { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { sign } from "crypto";

export default function Create() {
    
    const editorRef = useRef(null);

    const [newTitleState, setNewTitleState] = React.useState("");

    const [isAdmin, setIsAdmin] = React.useState(false);

    React.useEffect(() => {
        setIsAdmin(localStorage.getItem('is_admin') === 'true');
    }, [])

    const submitPost = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/create`, { 
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'postcontent': editorRef.current.getContent(),
                'title': newTitleState
            })
        }).then((response) => {
            if (response.ok) {
                window.location.href = '/';
            }
            return response;
        }).then(data => {
            
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <div className={isAdmin ? "min-h-screen justify-center min-w-full" : "flex flex-col items-center"}>
            <h1 className='text-center font-bold text-2xl p-10'><a href="/">nagyb3&apos;s blog</a></h1>
            {
                isAdmin ?
                <div>
                    <h1 className="font-bold text-2xl text-center mb-12">Make Blog Post</h1>
                    <div className="max-w-7xl flex flex-col items-center justify-center gap-5">
                        <div className="flex gap-5">
                            <label className="font-semibold text-lg" htmlFor="title">Title:</label>
                            <input className="text-black" onChange={e => setNewTitleState(e.target.value)} value={newTitleState} type="text" name="title" id="title" />
                        </div>
                        <div>
                            <Editor
                                apiKey='9utnb2ang81zj7r55a0smpbengk80fx7utcnliw8bielweiy'
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue=""
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
                        <button className="text-white m-2 p-3 bg-cyan-800 w-fit rounded-2xl font-bold" onClick={submitPost}>SUBMIT POST</button>
                    </div>
                </div>
                : 
                <p className="text-center text-3xl">YOU ARE NOT ADMIN!</p>
            }
        </div>
    )
}