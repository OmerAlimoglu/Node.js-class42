import request from "supertest";
import app from "../app.js";

describe("Test the root path", () => {
  test("It should respond to the POST method", async () => {
    const response = await request(app)
      .post("/weather")
      .send({ cityName: "London" });
    expect(response.statusCode).toBe(200);
  });

  test("It should respond with an error message for an invalid city name", async () => {
    const response = await request(app)
      .post("/weather")
      .send({ cityName: "InvalidCityName" });
    expect(response.statusCode).toBe(200);
    expect(response.body.weatherText).toBe("City is not found!");
  });
});
