const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// definisci lo schema del record da leggere o scrivere
const ItemSchema = new Schema({
  name: { type: String },
});
const Item = mongoose.model("item", ItemSchema);
module.exports = Item;
