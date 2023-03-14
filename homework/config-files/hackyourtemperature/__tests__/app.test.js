import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("Test the root path", () => {
  it("should be running and listening on the correct port", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Sorry, we cannot find the city!");
  });

  it("It should respond to the POST method", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "London" });
    expect(response.statusCode).toBe(200);
  });

  it("It should respond with an error message for an invalid city name", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName: "InvalidCityName" });
    expect(response.statusCode).toBe(200);
    expect(response.body.weatherText).toBe("City is not found!");
  });
});
