const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_EMAIL,
    pass: process.env.NODE_PASSWORD,
  },
});

// Función para enviar correo
const enviarCorreo = async (email, name, message) => {
  const mailOptions = {
    from: `"CRONIS" <${process.env.NODE_EMAIL}>`,
    to: "reruaarr@gmail.com",
    subject: `Mensaje de ${name} con correo ${email}`,
    text: message,
  };

  return transporter.sendMail(mailOptions);
};

// Rutas
app.get("/", (req, res) => {
  res.send("Email service running!");
});

app.post("/sendMessage", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await enviarCorreo(email, name, message);
    res
      .status(200)
      .json({ success: true, message: "Mensaje enviado correctamente." });
  } catch (error) {
    console.error("Error al enviar el mensaje:", error.message, error.stack);
    res
      .status(500)
      .json({ success: false, message: "Hubo un error al enviar el mensaje." });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
