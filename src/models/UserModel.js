import { mongoose ,configs} from "../exports.js";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select : false
        },
        pinned_note: {
            type: 'ObjectId',
            ref: "Notes",
            default: null,
            required:false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        avatarUrl: {
            type: String,
            default: 'http://defaultavatar.url',
        },
    },
    {
        timestamps: true,

    }
);

userSchema.methods = {
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    },
};

const UserModel = mongoose.model(configs.dbModelNames.user, userSchema);

export default UserModel;
