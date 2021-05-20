import React, {useRef} from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function () {
    const editorRef = useRef(null)

    return (
        <div className="columns">
            <div className="column">
                First column
            </div>
            <div className="column m-6">
                <>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey={"jk971c6bc7lw2xxzsvykyz36mtoasawuwhmfyv5nmqbhb88l"}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: 'lists',
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | ' +
                                'bullist numlist outdent indent | ' +
                                'removeformat | help',
                        }}
                    />
                    <button className="button is-info is-fullwidth mt-3">Save</button>
                </>
            </div>
        </div>
    )
}
