import express from "express";
import clientsRouter from "./routes/clients.routes";


const app = express();
app.use(express.json());

// Ruta básica 
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.use("/clients", clientsRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});