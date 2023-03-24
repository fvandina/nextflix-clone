import bcrypt from 'bcrypt';
import {NextApiRequest, NextApiResponse} from 'next';
import prismadb from '@/lib/prismadb';
import { STATUS_CODES } from 'http';

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST'){
    return res.status(405).end();
  }

  try {
    const {email, username, password} = req.body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      }
    });
    
    if (existingUser){
      return res.status(409).json({error: 'Email taken'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismadb.user.create({
      data: {
        email,
        username,
        hashedPassword,
        
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
