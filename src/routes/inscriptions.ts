import { DocumentType } from "@typegoose/typegoose";
import express from "express";
import inscriptionModel, { Inscription } from "../models/Inscription";

const checkId = (inscription: DocumentType<Inscription> | null, id: string) =>
  inscription
    ? {
        status: 200,
        response: inscription,
      }
    : {
        status: 400,
        response: { msg: `Inscription with id: ${id} doesn't exit.` },
      };

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const inscriptions = await inscriptionModel.find();
    res.status(200).send(inscriptions);
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
    const { status, response } = checkId(inscription, req.params._id);
    res.status(status).send(response);
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
      const inscriptionToUpdate = await inscriptionModel.findByIdAndUpdate(
        req.params._id,
        req.body
      );
      const { status, response } = checkId(inscriptionToUpdate, req.params._id);
      res
        .status(status)
        .send(
          status === 400 ? response : { msg: "Inscription updated correctly." }
        );
    } catch (e) {
      res.status(500).send({ msg: e.errmsg });
    }
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const inscriptionToDelete = await inscriptionModel.findByIdAndDelete(
      req.params._id
    );
    const { status, response } = checkId(inscriptionToDelete, req.params._id);
    res
      .status(status)
      .send(
        status === 400 ? response : { msg: "Inscription updated correctly." }
      );
  } catch (e) {
    res.status(500).send({ msg: e.errmsg });
  }
});

export default router;
