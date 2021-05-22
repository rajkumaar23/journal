import {Editor} from "@tinymce/tinymce-react";
import React from 'react';

export default function ({body, handleChange, loading}) {
    return (
        <>
            <Editor
                apiKey={"jk971c6bc7lw2xxzsvykyz36mtoasawuwhmfyv5nmqbhb88l"}
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
