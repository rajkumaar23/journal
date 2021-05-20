import React, {useEffect, useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {format} from "date-fns";

export default function () {
    const editorRef = useRef(null)
    const [selectedDay, setSelectedDay] = useState(new Date())
    const [loading, setLoading] = useState(true)
    const [body, setBody] = useState('')

    const fetchJournalEntries = async (day) => {
        try {
            setLoading(true);
            const {data} = await axios.get(`/api/entries/${format(day, 'yyyy-MM-dd')}`);
            if (data.data) {
                const {body} = data.data;
                setBody(body);
            } else {
                setBody('');
            }
        } catch (e) {
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }

    const saveBody = async () => {
        if (editorRef.current) {
            try {
                setLoading(true);
                await axios.post(
                    `/api/entries/${format(selectedDay, 'yyyy-MM-dd')}`,
                    {body: editorRef.current.getContent() || ''}
                );
            } catch (e) {
                alert(e.message)
            } finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        fetchJournalEntries(selectedDay)
    }, [])

    return (
        <div className="columns">
            <div className="column is-one-quarter m-6 has-text-centered">
                <DayPicker
                    onDayClick={(day) => {
                        if (loading) return
                        setSelectedDay(day)
                        fetchJournalEntries(day)
                    }}
                    selectedDays={selectedDay}
                />
            </div>
            <div className="column m-6">
                <>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey={"jk971c6bc7lw2xxzsvykyz36mtoasawuwhmfyv5nmqbhb88l"}
                        disabled={loading}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: 'lists',
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | ' +
                                'bullist numlist outdent indent | ' +
                                'removeformat | help',
                        }}
                        initialValue={body}
                    />
                    <button
                        className={"button is-fullwidth is-dark mt-3 " + (loading ? 'is-loading' : '')}
                        onClick={saveBody}
                    >
                        {loading ? '' : 'Save'}
                    </button>
                </>
            </div>
        </div>
    )
}
