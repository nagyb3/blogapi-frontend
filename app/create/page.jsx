"use client"

import React, { useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

export default function Create() {
    
    const editorRef = useRef(null);
    
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    
    React.useEffect(() => {
        
    }, [])

    const submitPost = () => {
        fetch("http://localhost:5000/posts/create", { 
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            body: {
                'Post-Text': editorRef.current.getContent()
            }
        }).then((response) => {
            return response;
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.error(error);
        })
    };

    const login = () => {
        fetch('http://localhost:5000/login', {
            method: "POST"
        }).then(response => {
            return response.json();
        }).then(data => {
            // console.log(data.token);
            localStorage.setItem('access_token', data.token)
        }).catch(error => {
            console.error(error)
        })
    }

    return (
        <div className="flex flex-col items-center justify-center min-w-full p-10 gap-5">
            <h1 className="font-bold text-2xl">Make Blog Post</h1>
            <div className="max-w-7xl flex flex-col items-center justify-center gap-5">
                <Editor
                    apiKey='9utnb2ang81zj7r55a0smpbengk80fx7utcnliw8bielweiy'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue="<p>This is the initial content of the editor.</p>"
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
                <button className="m-2 p-3 bg-cyan-800 w-fit rounded-2xl font-bold" onClick={submitPost}>Log editor content</button>
                <button onClick={login}>LOGIN</button>
            </div>
        </div>
    )
}