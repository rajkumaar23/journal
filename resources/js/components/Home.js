import React, {useEffect, useState} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {format} from "date-fns";
import Editor from "./Editor";

const SavingState = Object.freeze({
    NOT_SAVED: 0,
    SAVING: 1,
    SAVED: 2
});

export const AutoSaveDisplay = ({saving}) => {
    let display;
    switch (saving) {
        case SavingState.SAVING:
            display = <em>saving...</em>;
            break;
        case SavingState.SAVED:
            display = (
                <>
                    &#10004; <em>saved!</em>
                </>
            );
            break;
        default:
            display = <br/>;
    }
    return <div style={{display: 'block', height: '25px'}}>{display}</div>;
};


export default function () {
    const [selectedDay, setSelectedDay] = useState(new Date())
    const [loading, setLoading] = useState(true)
    const [body, setBody] = useState('')
    const [saving, setSaving] = useState(SavingState.NOT_SAVED)
    const [timer, setTimer] = useState(null)

    const fetchJournalEntries = async (day) => {
        try {
            const {data} = await axios.get(
                `/api/entries/${format(day, 'yyyy-MM-dd')}`
            );
            setBody((data.data && data.data.body) || '');
        } catch (e) {
            alert(e.message)
            setBody('');
        } finally {
            setLoading(false)
        }
    }

    const saveBody = async (text) => {
        timer && clearTimeout(timer);
        setBody(text);
        setSaving(SavingState.SAVING);
        setTimer(
            setTimeout(() => {
                axios.post(
                    `/api/entries/${format(selectedDay, 'yyyy-MM-dd')}`,
                    {body: text}
                )
                    .then(() => setSaving(SavingState.SAVED))
                    .catch((e) => alert(e.message))
            }, 500)
        )
    }

    useEffect(() => {
        fetchJournalEntries(selectedDay)
    }, [])

    return (
        <div className="columns">
            <div className="column is-one-quarter m-5 has-text-centered">
                <DayPicker
                    onDayClick={async (day) => {
                        if (loading || saving === SavingState.SAVING) return
                        setSelectedDay(day)
                        await fetchJournalEntries(day)
                    }}
                    selectedDays={selectedDay}
                />
            </div>
            <div className="column m-6">
                <Editor body={body} handleChange={saveBody} loading={loading}/>
                <AutoSaveDisplay saving={saving}/>
            </div>
        </div>
    )
}
