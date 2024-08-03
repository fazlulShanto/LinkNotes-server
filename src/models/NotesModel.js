import { mongoose, configs } from "../exports.js";
const Schema = mongoose.Schema;

const NoteContentSchema = new Schema({
    title: { type: String },
    value: Schema.Types.Mixed
}, { _id: false });

// const TodoItemSchema = new Schema({
//     isChecked: { type: Boolean, default: false },
//     text: { type: String, required: true }
// }, { _id: false });

// main schema
const NoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: configs.dbModelNames.note,
        required: true
      },
    noteTitle: {
        type: String,
        required: true
    }, 
    type: {
        type: String,
        enum: ['url', 'text', 'checkList'],
        required: true
    },
    noteContent: {
        type: NoteContentSchema,
        required: true
    },
    tags:{
        type: [String],
        default: [],
        required: true
    }

}, { timestamps: true });

// Validation for different note types
NoteSchema.pre('validate', function (next) {
    if (this.type === 'url') {
        if ( !this.noteContent.value) {
            return next(new Error('URL notes must have a title and value'));
        }
    } else if (this.type === 'text') {
        if (!this.noteContent.value) {
            return next(new Error('Text notes must have a value'));
        }
    } else if (this.type === 'checkList') {
        if (!Array.isArray(this.noteContent.value)) {
            return next(new Error('Checkbox list must have an array value'));
        }
        const isValid = this.noteContent.value.every(item =>
            typeof item.isChecked === 'boolean' && typeof item.text === 'string'
        );
        if (!isValid) {
            return next(new Error('Invalid checkbox list item'));
        }
    }
    next();
});

// noteSchema.methods = {
// };

const NoteModel = mongoose.model(configs.dbModelNames.note, NoteSchema);
export default NoteModel;
