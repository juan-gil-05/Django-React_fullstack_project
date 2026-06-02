/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {

    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data); console.log(data) })
            .catch((err) => alert(err))
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Note deleted!")
                } else {
                    alert("Failed to delete the note")
                }
                getNotes()
            })
            .catch((err) => alert(err))
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", { title, content })
            .then((res) => {
                if (res.status === 201) {
                    alert("Note created!")
                } else {
                    alert("Failed to create the note")
                }
                getNotes()
            })
            .catch((err) => alert(err))
    }

    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
        </div>
        <div>
            <h3>Create a Note</h3>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title</label>
                <br />
                <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label htmlFor="content">Content</label>
                <br />
                <textarea type="text" name="content" id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
}

export default Home