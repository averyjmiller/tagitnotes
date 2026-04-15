import Note from '../models/Note.js';

export const createNote = async (req, res) => {
    try {
        const { user } = req;
        const {
            title,
            content,
            tags
        } = req.body;

        const note = await Note.create({
            title: title === "" ? "Untitled Note" : title,
            content: content,
            author: user,
            tags: tags
        });

        return res.status(201).json({
            success: true,
            message: 'Created a new note',
            note
        });
    } catch(err) {
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors)
                .map(e => e.message)
                .join(', ');
            
            return res.status(400).json({ error: message });
        }

        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};

export const getNoteDetails = async (req, res) => {
    try {
        const note = await Note.findById(req.query.noteId);
        
        if(!note) {
            return res.status(400).json({ error: 'Unable to find note' });
        }

        return res.status(200).json({
            success: true,
            message: 'Found note details',
            note
        });
    } catch(err) {
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};

export const getUserNotes = async (req, res) => {
    try {
        const { user } = req;
        const notes = await Note.find({ author: user }).sort({ updatedAt: 'desc' }).populate('author');

        return res.status(200).json({
            success: true,
            message: 'Found all user\'s notes',
            notes
        });
    } catch(err) {
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};

export const searchByTag = async (req, res) => {
    try {
        const { user } = req;
        let tags = req.query['tags[]'];

        if(typeof tags === 'string') {
            tags = [tags];
        }

        const modifiedTags = tags
                .map(e => e.replaceAll(' ', ''))
                .map(e => e.toLowerCase());

        const notes = await Note.find({
            author: user, 
            tags: {
                $all: modifiedTags
        }})
            .sort({ updatedAt: 'desc' })
            .populate('author');
        
        if(notes.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No notes were found with those tags',
                notes: []
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Search by tag successful',
            notes
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};

export const getTopTags = async (req, res) => {
    try {
        const { user } = req;

        const tags = await Note.aggregate([
            { $match: { author: user._id } },
            { $unwind: "$tags" },
            { $group: {
                _id: "$tags",
                count: { $sum: 1 }
            }},
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        if(tags.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No tags were found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User\'s top tags were returned',
            tags
        });
    } catch(err) {
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};

export const updateNoteDetails = async (req, res) => {
    try {
        const note = await Note.findById(req.body.noteId);

        if(!note) {
            return res.status(400).json({ error: 'Unable to find note' });
        }

        const {
            title,
            content,
            tags
        } = req.body;

        if(title   === undefined &&
           content === undefined &&
           tags    === undefined) {
            return res.status(400).json({ error: 'Parameters are undefined' });
        }

        note.title = title !== undefined ? (title === "" ? "Untitled Note" : title) : note.title;
        note.content = content !== undefined ? content : note.content;
        note.tags = tags !== undefined ? tags : note.tags;
        note.updatedAt = Date.now();

        await note.save();

        return res.status(200).json({
            success: true,
            message: 'Updated note details',
            note
        });
    } catch(err) {
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors)
                .map(e => e.message)
                .join(', ');
            
            return res.status(400).json({ error: message });
        }

        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.query.noteId);

        if(!note) {
            return res.status(400).json({ error: 'Unable to find note' });
        }

        await Note.deleteOne({ _id: note._id });

        res.status(200).json({
            success: true,
            message: 'Note has been deleted',
            note
        });
    } catch(err) {
        return res.status(500).json({ 
            message: 'Internal server error', 
            error: err.message 
        });
    }
};