import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { authorEmail } = req.query;
    const result = await prisma.message.findMany({
      where: {
        author: {
          email: authorEmail as string,
        },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log("Error:", error);
    res.status(500);
  }
}
