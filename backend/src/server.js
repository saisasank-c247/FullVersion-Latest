/** @format */
import "regenerator-runtime/runtime";
import http from "http";
import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import router from "./routes";
import { connect } from "mongoose";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
const session = require("express-session");
import passport from "passport";
import { SuperAdminSeeder } from "./seeder";
dotenv.config();
const app = express();

const url = process.env.DATABASE_URI;

connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected successfully.");
    // Adding default data to the database, like default Super Admin use, Default Plans data
    SuperAdminSeeder.addSuperAdmin();
  })
  .catch((err) => {
    console.log("Error in database connection - ", err.message);
  });

app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json({ limit: "100mb" }));

// resolution of cross origin issues
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token", "authorization"],
};
app.use(cors(corsOption));

// Binding Image Path
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "..", "assets")));
app.use(express.static(path.join(__dirname, "..", "build")));

// routes purpose
app.use("/", router);
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Admin panel build
app.use("**", (_, res) => {
  return res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// create server
const server = http.createServer(app);

const port = process.env.PORT || 8000;
server.listen(port, function () {
  console.log(`LMS app listening on port ${port}!`);
});
