import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "POST") {
        const { email } = req.body;
        const paintings = await prisma.paintingsOfUser.findMany({
            where: { user: { email } },
        });

        res.send(paintings);
    }
};

export default handler;
