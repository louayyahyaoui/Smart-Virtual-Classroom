const express = require("express");
const morgan = require("morgan");
require("./config/db");
const bodyParser = require("body-parser");
const SeanceController = require("./routes/SeanceController");
const courses_route = require("./routes/Courses.route");
const Task = require("./routes/Task.js");
const Quiz = require("./routes/Quiz.js");
const Grade = require("./routes/Grade.js");
//Omar
var questionRouter = require("./routes/question");
var anwerRouter = require("./routes/answer");
var CommentCourse = require("./routes/CommentCourse");
var Notification = require("./routes/notification");

//Hamza routes
const ClassRouter = require("./routes/Class.js");
const SchedulerRouter = require("./routes/Scheduler.js");
const InvitationClassRouter = require("./routes/InvitationClass.js");

const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
//   });
// }
// Config dotev
require("dotenv").config({
  path: ".env",
});
// Dev Logginf Middleware
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(morgan("dev"));
}
// Load routes
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

app.enable("trust proxy");
app.use(cors());
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dev Logginf Middleware

// Use Routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/seance", SeanceController);
app.use("/uploads", express.static("uploads"));
app.use(express.static("uploads"));
app.use("/file", express.static("file"));
app.use("/courses", courses_route);
app.use("/task", Task);
app.use("/quiz", Quiz);
app.use("/grade", Grade);
//My route
app.use("/question", questionRouter);
app.use("/answer", anwerRouter);
app.use("/coursesComment", CommentCourse);
app.use("/notification", Notification);

//Hamza routes:
app.use("/class", ClassRouter);
app.use("/scheduler", SchedulerRouter);
app.use("/invitationclass", InvitationClassRouter);

app.use((req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
let socketList = {};

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("User disconnected!");
  });
  //question
  socket.on("send_question", function (data) {
    io.emit("new-question", data);
  });
  //answer
  socket.on("send_answer", function (data) {
    io.emit("new-answer", data);
  });
  //test if user exist or not
  console.log(`New User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("User disconnected!");
  });

  socket.on("BE-check-user", ({ roomId, userName }) => {
    let error = false;

    io.sockets.in(roomId).clients((err, clients) => {
      clients.forEach((client) => {
        if (socketList[client] == userName) {
          error = true;
        }
      });
      socket.emit("FE-error-user-exist", { error });
    });
  });

  /**
   * Join Room
   */
  socket.on("BE-join-room", ({ roomId, userName }) => {
    // Socket Join RoomName
    socket.join(roomId);
    socketList[socket.id] = { userName, video: true, audio: true };

    // Set User List
    io.sockets.in(roomId).clients((err, clients) => {
      try {
        const users = [];
        clients.forEach((client) => {
          // Add User List
          users.push({ userId: client, info: socketList[client] });
        });
        socket.broadcast.to(roomId).emit("FE-user-join", users);
        // io.sockets.in(roomId).emit('FE-user-join', users);
      } catch (e) {
        io.sockets.in(roomId).emit("FE-error-user-exist", { err: true });
      }
    });
  });

  socket.on("BE-call-user", ({ userToCall, from, signal }) => {
    io.to(userToCall).emit("FE-receive-call", {
      signal,
      from,
      info: socketList[socket.id],
    });
  });

  socket.on("BE-accept-call", ({ signal, to }) => {
    io.to(to).emit("FE-call-accepted", {
      signal,
      answerId: socket.id,
    });
  });

  socket.on("BE-send-message", ({ roomId, msg, sender }) => {
    io.sockets.in(roomId).emit("FE-receive-message", { msg, sender });
  });

  socket.on("BE-leave-room", ({ roomId, leaver }) => {
    delete socketList[socket.id];
    socket.broadcast
      .to(roomId)
      .emit("FE-user-leave", { userId: socket.id, userName: [socket.id] });
    io.sockets.sockets[socket.id].leave(roomId);
  });

  socket.on("BE-toggle-camera-audio", ({ roomId, switchTarget }) => {
    if (switchTarget === "video") {
      socketList[socket.id].video = !socketList[socket.id].video;
    } else {
      socketList[socket.id].audio = !socketList[socket.id].audio;
    }
    socket.broadcast
      .to(roomId)
      .emit("FE-toggle-camera", { userId: socket.id, switchTarget });
  });
  socket.on("add-new-notification", function (data) {
    io.emit("new-notification", data);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
