import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    pic: {
      type: String,
    
      default:
        "https://th.bing.com/th/id/R.dc8b1732c919ca17845aab44dc3afb27?rik=cV%2b6wvH3pV874w&pid=ImgRaw&r=0",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
