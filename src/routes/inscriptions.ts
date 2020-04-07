import express from "express";
import inscriptionModel from "../models/Inscription";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const inscriptions = await inscriptionModel.find();
    res.status(201).send(inscriptions);
  } catch (e) {
    res.status(500).send({ msg: "Cannot find any inscriptions." });
  }
});

router.post("/", async (req, res) => {
  const newInscription = new inscriptionModel(req.body);
  try {
    await newInscription.save();
    res.status(201).send({ msg: "Inscription created correctly." });
  } catch (e) {
    res.status(500).send({ msg: "Error creating inscription." });
  }
});

router.delete("/", async (req, res) => {
  try {
    await inscriptionModel.remove({});
    res.status(200).send({ msg: "Inscriptions deleted correctly." });
  } catch (e) {
    res.status(500).send({ msg: "Error removing inscriptions." });
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const inscription = await inscriptionModel.findById(req.params._id);
    res.status(201).send(inscription);
  } catch (e) {
    res
      .status(500)
      .send({ msg: "There is no inscription with _id: " + req.params._id });
  }
});

router.put("/:_id", async (req, res) => {
  try {
    const inscriptionUpdated = await inscriptionModel.findByIdAndUpdate(
      req.params._id,
      req.body
    );
    res.status(201).send(inscriptionUpdated);
  } catch (e) {
    res
      .status(500)
      .send({ msg: "There is no inscription with _id: " + req.params._id });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    await inscriptionModel.findByIdAndDelete(req.params._id);
    res.status(201).send({ msg: "Inscription removed correctly." });
  } catch (e) {
    res
      .status(500)
      .send({ msg: "There is no inscription with _id: " + req.params._id });
  }
});

export default router;
