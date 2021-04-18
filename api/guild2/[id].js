/* eslint-disable no-unreachable */
const axios = require("axios");

const allowCors = fn => async (request, response) => {
  response.setHeader("Access-Control-Allow-Credentials", true);
  response.setHeader("Access-Control-Allow-Origin", "*");
  // another option
  // response.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  response.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (request.method === "OPTIONS") {
    response.status(200).end();
    return;
  }
  return await fn(request, response);
};

const handler = async (request, response) => {
  console.log("------------------------");
  console.log("------------------------");
  console.log("------------------------");
  console.log("------------------------");
  console.log("------------------------");
  console.log("------------------------");
  try {
    const { id } = request.query;
    const url = `https://swgoh.gg/api/guild/${id}`;
    console.log(url);
    const resp = await axios.get(url);
    console.log("deu erro");
    response.statusCode = 200;
    response.setHeader("Content-Type", `application/json`);
    response.end(JSON.stringify({ ...resp.data }));
  } catch (err) {
    console.error(err);
    response.statusCode = 200;
    response.setHeader("Content-Type", `application/json`);
    response.end(JSON.stringify(err));
  }
};

export default allowCors(handler);
