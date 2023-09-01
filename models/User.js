import mongoose from "mongoose";
import validator from "validator";

import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        required: [true, "first name is required"],
        minlength: [3, "first name should have 3 characters"],
        maxlength: [50, "first name should not have more than 50 characters"],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, "last name is required"],
        minlength: [3, "last name should have 3 characters"],
        maxlength: [50, "last name should not have more than 50 characters"],
        trim: true,
      },
    },
    address: {
      type: String,
      required: [true, "Please provide your address"],
      minlength: [6, "minimum 10 characters required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide your phone number"],
      /* validate: {
        validator: function(v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: props =>{ 
          return`${props.value} is not a valid phone number!`}
      }, */
    },
    email: {
      type: String,
      required: [true, "Please provide your email Id"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    role:{
      type:String,
      required:true,
      default:'user',
      enum:{
        values:['admin','user']},
        message: '{VALUE} is not supported'
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minlength: [6, "minimum of 6 characters required"],
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
  },
  { timestamps: true }
);


UserSchema.pre("save", async function () {
  if (!this.isModified('password')) {
    return ;
  }
  const salt = await bcrypt.genSalt(16);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
