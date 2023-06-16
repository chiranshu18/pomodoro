import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await prisma.task.findFirstOrThrow({
      where: { id: req.query.id },
    });
    if (data === null)
      return res.status(404).json({ message: "task not found" });
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const body = req.body;
    const data =  await prisma.task.create({ data: body });
    return res.status(200).json(data);
  } else if (req.method === "PATCH") {
    const body = req.body;
    const data = await prisma.task.update({
      where: { id: req.query.id },
      data: body,
    });
    return res.status(200).json(data);
  } else if (req.method === "DELETE") {
    const data = await prisma.task.delete({ where: { id: req.query.id } });
    return res.status(200).json(data);
  }
}
