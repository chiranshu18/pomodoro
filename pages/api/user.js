import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.user.findFirstOrThrow({
        where: { id: req.query.id },
        include: { tasks: true },
      });
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json({ message: "user not found" });
    }
  } else if (req.method === "POST") {
    const body = req.body;
    const data = await prisma.user.create({ data: body });
    return res.status(200).json(data);
  }
}
