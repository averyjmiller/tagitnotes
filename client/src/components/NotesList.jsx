export default function NotesList({ notes, setIsOpen, onSelectNote }) {

    const isMd = window.innerWidth >= 768;
    
    const notesList = (notes === undefined) ? "" : notes.map(note =>
        <li 
            className='m-2 cursor-pointer'
            key={note._id} 
            onClick={() => {
                onSelectNote(note);
                if(!isMd)
                    setIsOpen(false);
            }}
        >
            <h2>{note.titlePreview}</h2>
            <p>{note.contentPreview}</p>
            <ul>
                {note.tags.map(e => (
                    <li 
                        className='inline-block'
                        key={e}
                    >
                        •&nbsp;{e}&nbsp;
                    </li>
                ))}
            </ul>
            <hr />
        </li>
    );

    return (
        <ul className='overflow-y-auto'>
            {notesList}
        </ul>
    )
}