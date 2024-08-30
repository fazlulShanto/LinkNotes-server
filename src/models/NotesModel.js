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
        ref: configs.dbModelNames.user,
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
    },
    isPinned:{
        type: Boolean,
        default:false,
    }

}, { timestamps : true });

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
  
  // Helper function to escape special characters in regex
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

export const _filterNotes =  (filterObject,userId) => {
    let query = {
        user: userId
    };
    // Example for type field
    if (filterObject.type) {
        query.type = filterObject.type;
    }

    if (filterObject.title) {
      switch (filterObject.titleCondition) {
        case 'contains':
          query.noteTitle = { $regex: new RegExp(escapeRegExp(filterObject.title), 'i') };
          break;
        case 'not-contains':
          query.noteTitle = { $not: { $regex: new RegExp(escapeRegExp(filterObject.title), 'i') } };
          break;
        case 'is':
          query.noteTitle = filterObject.title;
          break;
          default:
          query.noteTitle = { $regex: new RegExp(escapeRegExp(filterObject.title), 'i') };
      }
    }

    if (filterObject.tag) {
        switch (filterObject.tagCondition) {
          case 'contains':
            query.tags = { $elemMatch: { $regex: new RegExp(escapeRegExp(filterObject.tag), 'i') } };
            break;
          case 'not-contains':
            query.tags = { $not: { $elemMatch: { $regex: new RegExp(escapeRegExp(filterObject.tag), 'i') } } };
            break;
          case 'is':
            query.tags = filterObject.tag;
            break;
          default:
            // If no method is specified, default to 'contains'
            query.tags = { $elemMatch: { $regex: new RegExp(escapeRegExp(filterObject.tag), 'i') } };
        }
      }
  
    // Example for isPinned field
    if (filterObject.isPinned ) {
      query.isPinned = filterObject.isPinned;
    }
  
   return query;
  };


const NoteModel = mongoose.model(configs.dbModelNames.note, NoteSchema);
export default NoteModel;
