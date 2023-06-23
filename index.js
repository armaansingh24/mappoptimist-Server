const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const config = require("./config");
const cors = require("cors");
const app = express();
const fs = require("fs");
app.use(express.json());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use(cors());
const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  auth: {
    user: config.email1,
    pass: config.pass1,
  },
});

// Endpoint for handling the form submission
app.post("/send-email-hire", upload.single("file"), (req, res) => {
  const { name, contact, email, expertise, experience, bio } = req.body;
  const attachment = req.file;
  const message = {
    from: `${name} <${email}>`,
    to: config.email1,
    subject: "New Job Application",
    text: `
      Name: ${name}
      Contact: ${contact}
      Email: ${email}
      Expertise: ${expertise}
      Experience: ${experience}
      Bio: ${bio}
    `,
    attachments: attachment ? [{ path: attachment.path }] : [],
  };

  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ yo: "error" });
      res.sendStatus(500);
    } else {
      console.log("Message sent: " + info.response);
      res.status(200).json({ msg: "mesage  has been sent" });
    }
     fs.unlinkSync(attachment.path);
  });
});
app.post("/send-email-hire-team", upload.single("file"), (req, res) => {
  const { name, contact, email, type, duration, summery } = req.body;
  const attachment = req.file;
  message = {
    from: `${name} <${email}>`,
    to: config.email1,
    subject: "want to hire a team",
    text: `
      Name: ${name}
      Contact: ${contact}
      email: ${email}
      Project Type: ${type}
      Project Duration: ${duration}
      Project Summery: ${summery}
      `,
    attachments: attachment ? [{ path: attachment.path }] : [],
  };

  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ yo: "error" });
      res.sendStatus(500);
    } else {
      console.log("Message sent: " + info.response);
      res.status(200).json({ msg: "mesage  has been sent" });
    }
     fs.unlinkSync(attachment.path);
  });
});

app.post("/send-email-contact", (req, res) => {
  const { name, email, idea } = req.body;

  const message = {
    from: `${name} <${email}>`,
    to: config.email1,
    subject: `Contacted by <${name}>`,
    text: `
      Name: ${name}
      email: ${email}
      Idea: ${idea}
      `,
  };

  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ yo: "error" });
      res.sendStatus(500);
    } else {
      console.log("Message sent: " + info.response);
      res.status(200).json({ msg: "mesage  has been sent" });
    }
     fs.unlinkSync(attachment.path);
  });
});
app.post("/send-email-individual", (req, res) => {
  const { name, contact, email, required, summery } = req.body;
  message = {
    from: `${name} <${email}>`,
    to: config.email1,
    subject: "want to hire a individual developer",
    text: `
    Name: ${name}
    Contact: ${contact}
    email: ${email}
    Required Skills: ${required}
    Project Summery: ${summery}
    `,
  };

  transporter.sendMail(message, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ yo: "error" });
      res.sendStatus(500);
    } else {
      console.log("Message sent: " + info.response);
      res.status(200).json({ msg: "mesage  has been sent" });
    }
     fs.unlinkSync(attachment.path);
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
