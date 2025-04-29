import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: [true, "Password is reuired"],
        minilength: [6, "Password must leat at 6 characters long"]
    },
    cartItem:[
        {
            quantity:{
                type: Number,
                default: 1
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        }
    ],
    role:{
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
}, 
{
    timestamps: true,    
})




// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next()
    } catch (error){
        next(error)
    }
})

userSchema.methods.comparePassword = await function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;