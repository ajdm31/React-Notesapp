import React, { useState, useEffect } from 'react';
// import notes from '../assets/data';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

const NotesListPages = () => {
    //useState is mutable, meaning we can change it thanks to the second parameter
    //in this case we called it "setNotes"
    let [notes, setNotes] = useState([]) //by default, an empty array

    //execute on the first render, thanks to the dependency array
    useEffect(() => {
        //Execute the following function
        getNotes()
    }, [])

    //function we want to put inside 'useEffect'
    let getNotes = async () => {
        //fetch the data from the API, in this case our local JS server
        let response = await fetch('http://localhost:8000/notes')
        let data = await response.json()//this is to parse the data in json format
        setNotes(data)//to render the data, we pass it to 'setNotes' of the "useState"
    }

    return (
        <div className="notes">

            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>

            <div className="notes-list">
                {notes.map((note, index) => (
                    <ListItem key={index} note={note} />
                ))}
            </div>
            <AddButton />
        </div>
    )
}

export default NotesListPages
