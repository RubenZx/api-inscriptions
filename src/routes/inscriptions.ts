import express from "express";
import inscriptionModel from "../models/Inscription";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const inscriptions = await inscriptionModel.find();
    res.status(201).send(inscriptions);
  } catch (e) {
    res.status(500).send({ msg: e.errmsg });
  }
});

router.post("/", async (req, res) => {
  const newInscription = new inscriptionModel(req.body);
  const error = newInscription.validateSync();
  if (error) {
    res.status(400).send(error);
  } else {
    try {
      await newInscription.save();
      res.status(201).send({ msg: "Inscription created correctly." });
    } catch (e) {
      res.status(500).send({ msg: e.errmsg });
    }
  }
});

router.delete("/", async (req, res) => {
  try {
    await inscriptionModel.deleteMany({});
    res.status(200).send({ msg: "Inscriptions deleted correctly." });
  } catch (e) {
    res.status(500).send({ msg: e.errmsg });
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const inscription = await inscriptionModel.findById(req.params._id);
    res.status(201).send(inscription);
  } catch (e) {
    res.status(500).send({ msg: e.errmsg });
  }
});

router.put("/:_id", async (req, res) => {
  const error = new inscriptionModel(req.body).validateSync();
  if (error) {
    res.status(400).send(error);
  } else {
    try {
      await inscriptionModel.findByIdAndUpdate(req.params._id, req.body);
      res.status(201).send({ msg: "Inscription updated correctly" });
    } catch (e) {
      res.status(500).send({ msg: e.errmsg });
    }
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    await inscriptionModel.findByIdAndDelete(req.params._id);
    res.status(201).send({ msg: "Inscription removed correctly." });
  } catch (e) {
    res.status(500).send({ msg: e.errmsg });
  }
});

export default router;
