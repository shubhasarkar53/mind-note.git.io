import mongoose from "mongoose";



const ContentSchema = new mongoose.Schema(
  {
    link: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String },
    shared: { type: Boolean, default: false },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    color:{ type: String,default:""},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Content", ContentSchema);
