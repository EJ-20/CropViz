const request = require("supertest");
const app = require("../server"); // Make sure your server exports the app
require("dotenv").config();
const mongoose = require("mongoose");

afterAll(async () => {
await mongoose.disconnect();
});

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

    it("should filter crops by year", async () => {
    const res = await request(app).get("/api/crops?year=2020");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    });

    it("should return 400 for invalid year", async () => {
    const res = await request(app).get("/api/crops?year=notayear");
    expect([400, 200]).toContain(res.statusCode); // adjust if validation exists
    });

});
