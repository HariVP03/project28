import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
    if (req.method === "POST") {
        const { email } = req.body;
        const count = await prisma.user.findUnique({ where: { email } });
        let createdUser;
        if (!count) {
            createdUser = await prisma.user.create({ data: { email } });
        } else {
            createdUser = count;
        }
        res.send(createdUser || {});
    }
};

export default handler;
