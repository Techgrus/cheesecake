import mongoose from "mongoose";
import CarouselProduct from "./carouselProduct.model.js";

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mandatory: {
    type: Boolean,
    required: true,
  },
});

const productSchema = mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [tagSchema],
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

productSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await CarouselProduct.deleteMany({ product: doc._id });
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
