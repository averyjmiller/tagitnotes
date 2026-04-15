import NotesList from './NotesList';
import TagUI from './UI/TagUI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';

export default function NotesNav({ notes, tags, isOpen, setIsOpen, setTags, onSelectNote, onCreateNote }) {
    function handleForm(e) {
        e.preventDefault();

        const value = e.target.search.value
                .replaceAll(' ', '')
                .toLowerCase();

        setTags(prevTags => [...prevTags, value]);

        e.target.search.value = "";
    }

    function removeTag(tagToRemove) {
        setTags(prev => prev.filter(tag => tag !== tagToRemove));
    }

    function handleSetIsOpen() {
        if(isOpen) setIsOpen(false);
        else setIsOpen(true);
    }

    return (
        <aside className={`note-nav ${isOpen ? 'open' : ''}
                flex flex-col 
                w-0 md:w-80 
                fixed md:static
                top-0 left-0
                h-screen md:h-full 
                border border-y-0 border-l-0 border-gray-300`}>

            <div className='flex items-center h-10 bg-gray-200'>

                <div className='flex justify-center items-center flex-1 text-center'>

                    <form onSubmit={handleForm}>
                        <button className='cursor-pointer' type='submit'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <input className='border border-gray-300 rounded-full px-3' type='text' name='search' placeholder='Search a tag...' />
                    </form>

                    <button className='m-2 cursor-pointer' 
                        onClick={onCreateNote}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>

                </div>

                <button className={`mr-2 cursor-pointer ${isOpen ? 'md:hidden' : 'hidden'}`} onClick={handleSetIsOpen}>
                    <FontAwesomeIcon icon={faBars} />
                </button>

            </div>

            <ul className='my-2'>
                {tags.map(e => (
                    <TagUI key={e} name={e} onRemove={() => removeTag(e)} />
                ))}
            </ul>

            <NotesList 
                notes={notes}
                setIsOpen={setIsOpen}
                onSelectNote={onSelectNote}
            />

        </aside>
    )
}