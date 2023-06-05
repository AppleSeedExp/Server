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
});

module.exports = mongoose.model("store", StoreSchema);
