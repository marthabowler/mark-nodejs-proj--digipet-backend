import supertest from "supertest";
import { Digipet, INITIAL_DIGIPET, setDigipet } from "../digipet/model";
import app from "../server";

describe("When a user rehomes a digipet, they can now hatch another one", () => {
  beforeAll(() => {
    // setup: give an initial digipet
    const startingDigipet: Digipet = {
      happiness: 75,
      nutrition: 80,
      discipline: 60,
    };
    setDigipet(startingDigipet);
  });

  test("GET /digipet informs them that they have a digipet with expected stats", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/your digipet/i);
  });

  test("1st GET /digipet/rehome informs them they have rehomed the digipet", async () => {
    const response = await supertest(app).get("/digipet/rehome");
    expect(response.body.message).toMatch(/rehome/i);
  });

  test("2nd GET /digipet shows they don't have a digipet stats change", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/hatch/i);
  });

  test("3rd GET /digipet/hatch shows you can hatch a digipet", async () => {
    const response = await supertest(app).get("/digipet/hatch");
    expect(response.body.message).toMatch(/success/i);
    expect(response.body.message).toMatch(/hatch/i);
    expect(response.body.digipet).toHaveProperty(
      "happiness",
      INITIAL_DIGIPET.happiness
    );
    expect(response.body.digipet).toHaveProperty(
      "nutrition",
      INITIAL_DIGIPET.nutrition
    );
    expect(response.body.digipet).toHaveProperty(
      "discipline",
      INITIAL_DIGIPET.discipline
    );
  });
});
