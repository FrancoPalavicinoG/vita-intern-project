import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import clientsRouter from "./routes/clients.routes";
import appointmentsRouter from "./routes/appointments.routes";
import summaryRouter from "./routes/summary.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Ruta básica 
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.use("/clients", clientsRouter);
app.use("/appointments", appointmentsRouter);
app.use("/summary", summaryRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});