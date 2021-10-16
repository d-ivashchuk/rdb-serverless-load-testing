import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { content } = req.query;
    const result = await prisma.message.create({
      data: {
        content: content as string,
        author: { connect: { email: "dimitri@stackonfire.dev" } },
      },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log("Error:", error);
  }
}
