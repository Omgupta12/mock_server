const express = require("express");
const productsModel = require("../model/products.model");
const app = express.Router();

app.get("/", async (request, response) => {
  const { page, limit } = request.query;

  try {
    const total = await productsModel.find({}).count();

    const data = await productsModel
      .find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPage = Math.floor(total / limit);

    return response.status(200).send(data);
  } catch (error) {
    return response.status(500).send({ error: error.message });
  }
});

module.exports = app;
