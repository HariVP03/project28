import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "POST") {
        const { name, url, email } = req.body;
        const date = new Date().toDateString();
        const { id: paintingId } = await prisma.painting.create({
            data: { name, date, url },
        });
        const user = await prisma.user.findUnique({
            where: { email },
        });
        const userId = user?.id || "";
        const paintingOfUser = await prisma.paintingsOfUser.create({
            data: { paintingId, userId },
        });
        res.send(paintingOfUser);
    }
};

export default handler;
