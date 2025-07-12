const request = require("supertest");
const app = require("../server"); // Make sure your server exports the app
require("dotenv").config();

describe("GET /api/crops", () => {
  it("should return 200 and an array of crops", async () => {
    const res = await request("http://localhost:5000").get("/api/crops");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should filter crops by crop name", async () => {
    const res = await request("http://localhost:5000").get("/api/crops?crop=barley");
    expect(res.statusCode).toBe(200);
    expect(res.body.some(node =>
      node.crops.some(crop => crop.name === "barley")
    )).toBe(true);
  });
});
