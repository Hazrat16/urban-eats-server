const express = require("express");
const jwt = require("jsonwebtoken");
const request = require("supertest");

const authRoute = require("../routes/Auth");

jest.mock("jsonwebtoken");

describe("JWT Route", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/", authRoute);
  });

  it("should return a JWT token when valid user data is provided", async () => {
    const user = { username: "testUser", id: 1 };
    const mockToken = "mockJwtToken";

    jwt.sign.mockReturnValue(mockToken);

    const response = await request(app).post("/jwt").send(user);

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe(mockToken);
    expect(jwt.sign).toHaveBeenCalledWith(
      user,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" },
    );
  });

  it("should handle errors during JWT generation", async () => {
    const user = { username: "testUser", id: 1 };

    jwt.sign.mockImplementation(() => {
      throw new Error("JWT generation error");
    });

    const response = await request(app).post("/jwt").send(user);

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe("JWT generation error");
  });
});
