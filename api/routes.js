const express = require("express");
const UserRouter = express.Router();
const UserController = require("./controller");

UserRouter.post("/signup", UserController.registerUser);
UserRouter.post("/signin", UserController.signinUser);
UserRouter.get("/getallpatients", UserController.getpatients);

UserRouter.get("/getallbookings", UserController.getbook);
UserRouter.get("/getalldoctors", UserController.getdoctors);

UserRouter.get("/:email", UserController.getUser);
UserRouter.post("/book", UserController.book);
UserRouter.delete("/deletebook", UserController.deletebook);
UserRouter.put("/approvebook", UserController.approvebook);
UserRouter.get("/getbook/:userid", UserController.getmybook);

UserRouter.get("/getdocbook/:docname", UserController.getdocbook);
UserRouter.get("/getbookbyid/:bookid", UserController.getbookById);
UserRouter.put("/updateProfile", UserController.updateProfile);
UserRouter.put("/forgetPassword", UserController.forgetPassword);

module.exports = UserRouter;
