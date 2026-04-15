import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import auth from '../utils/auth';
import NotesNav from '../components/NotesNav';
import SelectedNoteEditor from '../components/SelectedNoteEditor';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [tags, setTags] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    const navigate = useNavigate();

    const token = auth.getToken();

    const fetchData = async (tags) => {
        try {
            let res;

            if(tags.length === 0) {
                res = await axios.get(`${__API_URL__}/note/userNotes`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                res = await axios.get(`${__API_URL__}/note/searchByTag`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { tags: tags }
                });
            }

            setNotes(res.data.notes);
        } catch(err) {
            alert(err);
        }
    }

    const handleUpdateNote = async (noteId, updatedFields) => {
        try {
            const body = { noteId, ...updatedFields };

            const res = await axios.patch(`${__API_URL__}/note/updateNote`, body, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setNotes(prevNotes => {
                const updatedNote = {
                    ...prevNotes.find(n => n._id === noteId),
                    ...res.data.note
                };

                return [
                    updatedNote,
                    ...prevNotes.filter(n => n._id !== noteId)
                ];
            });
        } catch(err) {
            console.error(err);
        }
    }

    const handleCreateNote = async () => {
        try {
            const body = {
                title: "",
                content: "",
                tags: []
            }

            const res = await axios.post(`${__API_URL__}/note/createNote`, body, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setNotes(prevNotes => [ res.data.note, ...prevNotes]);
            setSelectedNote(res.data.note);
        } catch(err) {
            console.error(err);
        }
    }

    const handleDeleteNote = async (e, noteId) => {
        e.preventDefault();
        
        try {
            await axios.delete(`${__API_URL__}/note/deleteNote`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { noteId: noteId },
            });

            setNotes(prevNotes => prevNotes.filter(n => n._id !== noteId));
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if(!auth.loggedIn()) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if(!auth.loggedIn()) {
            navigate('/login');
        }
        fetchData(tags);
    }, [tags, token]);

    useEffect(() => {
        if(!auth.loggedIn()) {
            navigate('/login');
        }
        
        if(notes?.length === 0) {
            setSelectedNote(null);
            return;
        }

        setSelectedNote(prev => {
            if(!prev) return notes[0];

            const exists = notes.some(n => n._id === prev._id);
            return exists ? prev : notes[0];
        });
    }, [notes]);

    return (
        <div className='flex h-full'>

            <NotesNav
                notes={notes}
                tags={tags}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setTags={setTags}
                onSelectNote={note => setSelectedNote(note)}
                onCreateNote={handleCreateNote}
            />

            <SelectedNoteEditor
                note={selectedNote}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onUpdateNote={handleUpdateNote}
                onDeleteNote={handleDeleteNote}
            />

        </div>
    )
}