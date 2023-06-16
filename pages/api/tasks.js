import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await prisma.task.findMany({
      where: { userId: req.query.id },
    });
    if (data === null)
      return res.status(404).json({ message: "No tasks found" });
    return res.status(200).json(data);
  }
}
