import express from "express";
import taskRouter from "./routes/task.routes.js";

const app = express();
const PORT = 3333;

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API funcionando aparentemente",
  });
});

app.use("/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});