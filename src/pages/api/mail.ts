// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { formSchema } from "@/schemas";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
type Data = {
  message: string;
};
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: true,
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const parsedBody = formSchema.safeParse(req.body);
  if (parsedBody.success) {
    const mailData = {
      from: process.env.EMAIL,
      to: parsedBody.data.email,
      subject: `Your ride request is being processed`,
      text: `
        Pickup location: ${parsedBody.data.pickupLocation}
        Drop location: ${parsedBody.data.dropLocation}
        Number of passenger: ${parsedBody.data.numberOfPassenger}
        Datetime : ${parsedBody.data.datetime}
        Special Requirements : ${parsedBody.data.specialRequirements}
      `,
    };
    transporter.sendMail(mailData, function (err, info) {
      if (err) res.status(404).send({ message: err.message });
      else res.status(200).send({ message: info.response });
    });
  } else {
    res.status(404).send({ message: parsedBody.error.errors.toString() });
  }
}
