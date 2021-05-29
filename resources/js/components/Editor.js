import {Editor} from "@tinymce/tinymce-react";
import React from 'react';

export default function ({body, handleChange, loading}) {
    return (
        <>
            <Editor
                tinymceScriptSrc="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js"
                disabled={loading}
                init={{
                    height: 450,
                    menubar: false,
                    plugins: "lists",
                    toolbar:
                        "undo redo | formatselect | " +
                        "bold italic backcolor | " +
                        "bullist numlist outdent indent | " +
                        "removeformat | help",
                }}
                value={body}
                onEditorChange={handleChange}
            />
        </>
    );
}
