import mongoose from "mongoose";

const carouselProductSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CarouselProduct = mongoose.model(
  "CarouselProduct",
  carouselProductSchema
);
export default CarouselProduct;
