var express = require("express");
var router = express.Router();
var vakschain = require("../services/vakschain");

router.get("/list", async (req, res) => {
  try {
    var result = await vakschain.getAllAssets();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/get", async (req, res, next) => {
  try {
    var result = await vakschain.readAsset(req.query.nik);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    var record = {
      nik: `${req.body.nik}`,
      date: `${req.body.date}`,
      gender: `${req.body.gender}`,
      age: `${req.body.age}`,
      location: `${req.body.location}`,
      healthRecord: `${req.body.health_record}`,
      status: `${req.body.status}`,
    };

    console.log(record);

    await vakschain.createAsset(record);
    res.status(200);
    res.send("OK");
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

router.post("/delete", async (req, res) => {
  try {
    await vakschain.deleteAsset(req.body.nik);
    res.status(200);
    res.send("OK");
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

router.get("/exist", async (req, res) => {
  try {
    result = await vakschain.isExist(req.query.nik);
    console.log(`${result}`);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    var record = {
      nik: `${req.body.nik}`,
      date: `${req.body.date}`,
      gender: `${req.body.gender}`,
      age: `${req.body.age}`,
      location: `${req.body.location}`,
      healthRecord: `${req.body.health_record}`,
      status: `${req.body.status}`,
    };

    console.log(record);

    await vakschain.updateAsset(record);
    res.status(200);
    res.send("OK");
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

module.exports = router;
