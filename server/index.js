const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

require("dotenv").config();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/api/sendMessage", async (req, res) => {
  const { name, email, message } = req.body;

  // Configuración de nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.PORT,
      pass: "tu-contraseña",
    },
  });

  // Configuración del correo
  const mailOptions = {
    from: email,
    to: "tu-email@gmail.com",
    subject: `Mensaje de ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mensaje enviado correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al enviar el mensaje." });
  }
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
