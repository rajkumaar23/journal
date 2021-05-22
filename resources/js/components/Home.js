import React, {useEffect, useState} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {format} from "date-fns";
import Editor from "./Editor";

export default function () {
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
        try {
            setLoading(true);
            await axios.post(
                `/api/entries/${format(selectedDay, 'yyyy-MM-dd')}`,
                {body}
            );
        } catch (e) {
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchJournalEntries(selectedDay)
    }, [])

    return (
        <div className="columns">
            <div className="column is-one-quarter m-5 has-text-centered">
                <DayPicker
                    onDayClick={async (day) => {
                        if (loading) return
                        setSelectedDay(day)
                        await fetchJournalEntries(day)
                    }}
                    selectedDays={selectedDay}
                />
            </div>
            <div className="column m-6">
                <Editor body={body} handleChange={setBody} loading={loading} />
                <button
                    className={
                        "button is-fullwidth is-dark mt-3 " +
                        (loading ? "is-loading" : "")
                    }
                    onClick={saveBody}
                >
                    {loading ? "" : "Save"}
                </button>
            </div>
        </div>
    )
}
