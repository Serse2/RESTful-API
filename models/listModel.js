const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// definisci lo schema del singolo item contenuto in items nella lista
const ItemSchema = new Schema({
  name: { type: String },
  quantity: { type: Number },
  brand: { type: String },
  state: { type: Boolean },
});

// definisci lo schema della lista
const ListSchema = new Schema({
  title: { type: String },
  description: { type: String },
  userId: { type: String },
  items: { type: [ItemSchema] },
});
const List = mongoose.model("list", ListSchema);
module.exports = List;
