import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    if (req.method!=="DELETE" && req.method!== "POST"){
      return res.status(405).end();
    }
    
    const { currentUser } = await serverAuth(req);
    const { movieId } = req.body;

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId
      }
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    
    if (req.method === 'POST') {

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || ""
        },
        data:{
          favoriteIds:{
            push: movieId
          }
        }       
      });

      res.status(200).json(user);
    }
    
    
    if (req.method === 'DELETE') {
      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || ""
        },
        data: {
          favoriteIds: updatedFavoriteIds
        }
      });

      res.status(200).json(user);

    }
    
    
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

