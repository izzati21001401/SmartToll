require("dotenv").config(); 

export default {
  expo: {
    extra: {
      USER_EMAIL: process.env.USER_EMAIL || "user@example.com",
      USER_PASSWORD: process.env.USER_PASSWORD || "password123",
    },
  },
};