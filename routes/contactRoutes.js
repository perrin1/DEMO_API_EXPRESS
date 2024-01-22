const express = require("express");
const {
  getContact,
  createContact,
  getContacts,
  updateContat,
  deleteContat,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokeneHandler");
const router = express.Router();


router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContat).delete(deleteContat);

module.exports = router;
