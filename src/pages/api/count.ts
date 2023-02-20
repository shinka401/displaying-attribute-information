// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import images from "./images";

type Data = {
  count: {
    male: number;
    female: number;
  };
  image?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({
    count: {
      male: Math.floor(Math.random() * 20),
      female: Math.floor(Math.random() * 20),
    },
    image: images[Math.floor(Math.random() * 4)],
  });
}
