const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  imgName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  linkURL: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    default: "FREE",
  },
  isUnpublish: {
    type: Boolean,
    default: false,
  },
  isDuplicate: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("store", StoreSchema);
