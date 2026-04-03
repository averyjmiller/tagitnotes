import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "Untitled Note"
        },
        content: {
            type: String,
            default: ""
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        tags: {
            type: [String],
            validate: {
                validator: function(arr) {
                    return arr
                        .map(e => e.replaceAll(' ', ''))
                        .filter(e => e.trim())
                        .length <= 5;
                },
                message: 'You can only have up to 5 tags'
            },
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

function modifyTags(tags) {
    return tags
        .map(e => e.replaceAll(' ', ''))
        .map(e => e.toLowerCase())
        .filter(e => e.trim());
}

function createPreviews(s) {
    if(!s) return "";

    return s.trim().length > 40
        ? s.substring(0, 40).trim() + "..."
        : s.trim();
}

NoteSchema.virtual('titlePreview').get(function() {
    return createPreviews(this.title);
});

NoteSchema.virtual('contentPreview').get(function() {
    return createPreviews(this.content);
});

NoteSchema.pre('save', async function() {
    if(!this.tags) return;
    if(!this.isModified('tags')) return;

    this.tags = await modifyTags(this.tags);
});

export default mongoose.model('Note', NoteSchema);