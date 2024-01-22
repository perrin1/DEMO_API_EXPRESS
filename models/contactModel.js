const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var contactSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users"
    },
    name: {
      type: String,
      required: [true, "please add name "],
    },
    email: {
      type: String,
      required: [true, "please add email"],
    },
    phone: {
      type: String,
      required: [true, "please add phone number"],
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Contacts", contactSchema);
