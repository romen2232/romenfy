import { Song } from '@/types';

import usePlayer from './usePlayer';
import useAuthModal from './useAuthModal';
import { useUser } from './useUser';

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const user = useUser();

  //   const shuffleSongs = () => {
  //     let shuffledArray = [...songs];
  //     for (let i = shuffledArray.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [shuffledArray[i], shuffledArray[j]] = [
  //         shuffledArray[j],
  //         shuffledArray[i],
  //       ];
  //     }
  //     player.setIds(shuffledArray.map((song) => song.id));
  //   };

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;

  //   return {
  //     onPlay,
  //     shuffleSongs,
  //   };
};

export default useOnPlay;
