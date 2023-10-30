import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide product name"],
      minlength: 6,
      maxlength: [25, "Name cannot be more than 25 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Provide product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Provide product description"],
      trim: true,
      minlength: 6,
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    flavour: {
      type: String,
      required: [true, "Please provide the flavour"],
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: [true, "Please provide product type"],
      enum: {
        values: ["cake", "milkshake"],
        message: "{VALUE} is not supported",
      },
    },
    category: {
      type: String,
      required: [true, "Provide product category"],
      enum: {
        values: [
          "birthday-cake",
          "anniversary-cake",
          "kids-cake",
          "general",
          "milkshake",
        ],
        message: "{VALUE} is not supported",
      },
    },
    freeDelivery: {
      type: Boolean,
      required: true,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type:Number,
      required: true,
      default: 0,
    },
    ratingCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);



export default new mongoose.model("Product", ProductSchema);
