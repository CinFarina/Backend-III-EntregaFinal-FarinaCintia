import chai from "chai";
import request from "supertest";
import app from "../src/app.js";

const expect = chai.expect;

describe("Adoptions Router", () => {
  it("GET /api/adoptions", async () => {
    const res = await request(app).get("/api/adoptions");
    expect([200, 204]).to.include(res.status);
  });

  it("POST /api/adoptions/:uid/:pid", async () => {
    const res = await request(app).post("/api/adoptions/000000000000000000000001/000000000000000000000002");
    expect([201, 400, 404]).to.include(res.status);
  });

  it("GET /api/adoptions/:aid", async () => {
    const res = await request(app).get("/api/adoptions/000000000000000000000010");
    expect([200, 404]).to.include(res.status);
  });

  it("DELETE /api/adoptions/:aid", async () => {
    const res = await request(app).delete("/api/adoptions/000000000000000000000010");
    expect([200, 404]).to.include(res.status);
  });
});
