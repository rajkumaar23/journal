import React, {useRef, useState} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default function () {
    const editorRef = useRef(null)
    const [selectedDay, setSelectedDay] = useState()

    return (
        <div className="columns">
            <div className="column is-one-quarter m-6 has-text-centered">
                <DayPicker
                    onDayClick={setSelectedDay}
                    selectedDays={selectedDay}
                />
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
                    <button className="button is-dark is-fullwidth mt-3">Save</button>
                </>
            </div>
        </div>
    )
}
