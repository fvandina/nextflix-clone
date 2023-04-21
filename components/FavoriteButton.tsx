import { useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import useFavorites from "@/hooks/useFavorites";
import useCurrentUser from "@/hooks/useCurrentUser";

interface FavoriteProps {
  movieId: string;
}
const FavoriteButton: React.FC<FavoriteProps> = ({ movieId }) => {

  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);

  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {

    let response;

    if (isFavorite) {
      response = await axios.delete("/api/favorite", {
        data: {
          movieId
        }
      });
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }
    const updatedFavorites = response?.data?.favoriteIds;


    mutate({
      ...currentUser,
      favoriteIds: updatedFavorites
    });

    mutateFavorites();

  }, [currentUser, isFavorite, movieId, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-white
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-neutral-300
      ">
      <Icon size={25} className="text-white" />
    </div>
  );
}

export default FavoriteButton;