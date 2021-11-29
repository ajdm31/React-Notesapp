import React, { useState, useEffect } from 'react';
// import notes from '../assets/data';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrrowLeft } from '../assets/arrow-left.svg'; //import the image as a React Component

const NotePage = ({ match, history }) => {
    let noteId = match.params.id
    // let note = notes.find(note => note.id === Number(noteId))
    let [note, setNotes] = useState(null)

    //execute when "noteId" changes, thanks to the dependency array
    useEffect(() => {
        //Execute the following function
        getNote()
    }, [noteId])

    //function we want to put inside 'useEffect'
    let getNote = async () => {
        if (noteId === 'new') return
        //fetch the data from the API, in this case our local JS server
        let response = await fetch(`http://localhost:8000/notes/${noteId}`)
        let data = await response.json()//this is to parse the data in json format
        setNotes(data)//to render the data, we pass it to 'setNotes' of the "useState"
    }

    //function to create a new note
    let createNote = async () => {
        //we have to specify that it is a POST method, by default it is a GET method
        await fetch(`http://127.0.0.1:8000/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })
    }


    //function that will save the updates we do to the notes
    let updateNote = async () => {
        //we have to specify that it is a PUT method, not GET or POST
        //because remeber, we want to update the note body and save in the server
        await fetch(`http://127.0.0.1:8000/notes/${noteId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })
    }

    //function to handle the submit action to updateNote
    let handleSubmit = () => {

        if (noteId !== 'new' && !note.body) {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note != null) {
            createNote()
        }

        history.push('/')
    }



    //function to handle the action to delete a note
    const deleteNote = async () => {
        await fetch(`http://127.0.0.1:8000/notes/${noteId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        history.push('/')
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <Link to="/" >
                        <ArrrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>

                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}

            </div>
            <textarea onChange={(e) => { setNotes({ ...note, 'body': e.target.value }) }} value={note?.body}>

            </textarea>
        </div>
    )
}

export default NotePage
