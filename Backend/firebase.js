const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/* ==============================
   COLLECTION REFERENCES
================================*/

const locationsRef = db.collection("locations");
const beneficiariesRef = db.collection("beneficiaries");
const grainsRef = db.collection("grains");
const transactionsRef = db.collection("transactions");

/* ==============================
   EXPORT EVERYTHING
================================*/

module.exports = {
  db,
  locationsRef,
  beneficiariesRef,
  grainsRef,
  transactionsRef
};
