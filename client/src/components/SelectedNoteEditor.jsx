import { useState, useEffect, useRef } from 'react';
import TagUI from './UI/TagUI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck, faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

export default function SelectedNote({ note, isOpen, setIsOpen, onUpdateNote, onDeleteNote }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const tagForm = useRef(null);
    const tagModal = useRef(null);
    const inputRef = useRef(null);
    const deleteForm = useRef(null);
    const deleteModal = useRef(null);

    function handleForm(e) {
        e.preventDefault();

        const value = e.target.tagInput.value
                .replaceAll(' ', '')
                .toLowerCase();

        if(value !== '') {
            setTags(prevTags => [...prevTags, value]);
        }

        e.target.tagInput.value = '';
        tagForm.current.classList.remove('active');
        tagModal.current.classList.remove('active');
    }

    function handleDeleteModal() {
        deleteForm.current.classList.add('active');
        deleteModal.current.classList.add('active');
    }

    function handleCancelDelete() {
        deleteForm.current.classList.remove('active');
        deleteModal.current.classList.remove('active');
    }

    function handleFormReset(e) {
        e.preventDefault();

        e.target.tagInput.value = '';
        tagForm.current.classList.remove('active');
        tagModal.current.classList.remove('active');
    }

    function handleAddTag() {
        tagForm.current.classList.add('active');
        tagModal.current.classList.add('active');
        inputRef.current.focus();
    }

    function handleSetIsOpen() {
        if(isOpen) setIsOpen(false);
        else setIsOpen(true);
    }

    useEffect(() => {
        if(note) {
            setTitle(note.title || '');
            setContent(note.content || '');
            setTags(note.tags || []);
        } else {
            setTitle('');
            setContent('');
            setTags([]);
        }
    }, [note?._id]);

    useEffect(() => {
        if(!note) return;

        let isActive = true;

        const handler = setTimeout(() => {
            if(!isActive) return;

            if(
                title !== note.title ||
                content !== note.content ||
                JSON.stringify(tags) !== JSON.stringify(note.tags)
            ) {
                onUpdateNote(note._id, { title, content, tags });
            }
        }, 500);

        return () => {
            isActive = false;
            clearTimeout(handler);
        };
    }, [title, content, tags, note]);

    return (
        <main className='flex flex-col flex-grow h-full'>

            <div className='flex items-center h-10 bg-gray-200'>
                
                <button className='ml-2 cursor-pointer' onClick={handleSetIsOpen}>
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <h1 className='flex-1 text-center text-xl'>Tag-it Notes</h1>
                {note?.title && (
                    <>
                        <button 
                            className='m-2 cursor-pointer' 
                            onClick={handleDeleteModal}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>

                        <form className='modal-overlay' ref={deleteForm} onSubmit={(e) => onDeleteNote(e, note._id)}>
                            <div className='flex flex-col justify-center items-center delete-modal modal' ref={deleteModal}>
                                <h2 className='self-start text-xl font-medium'>Confirm delete</h2>
                                <hr />
                                <p>Are you sure you want to delete this note?</p>
                                <hr />
                                <div className='flex w-full justify-end mt-3'>
                                    <input className='btn bg-gray-200! text-black!' type="button" name='cancel' onClick={handleCancelDelete} value="Cancel" />
                                    <input className='btn ml-3 bg-red-600!' type="submit" name='delete' value="Delete" />
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>

        {note?.title && (
            <>

                <form className='modal-overlay' ref={tagForm} onSubmit={handleForm} onReset={handleFormReset}>
                    <div className='tag-modal modal' ref={tagModal}>
                        <input className='focus:outline-none' ref={inputRef} type='text' name='tagInput' placeholder='Enter a new tag...' />
                        <button className='cursor-pointer text-green-600 m-1' type='submit'>
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button className='cursor-pointer text-red-600 m-1' type='reset'>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </form>

                <div className='flex flex-col flex-grow p-5'>

                    <input
                        className='text-2xl focus:outline-none'
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <hr />

                    <ul className='mb-2'>
                        {tags.map(tag => (
                            <TagUI
                                key={tag}
                                name={tag}
                                onRemove={() => setTags(tags.filter(t => t !== tag))}
                            />
                        ))}
                        <li className='tag add'>
                            <button onClick={handleAddTag}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </li>
                    </ul>

                    <textarea
                        className='flex-grow resize-none overflow-auto focus:outline-none'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />

                </div>
                
            </>
        )}

    </main>
    );
}