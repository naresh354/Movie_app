
import { app } from './firebase';
import { getDatabase, ref, push, remove, DataSnapshot, DatabaseReference, set } from 'firebase/database';

const db = getDatabase(app);

export const addMovieToFavorites = async (userId: string, movie: any): Promise<DatabaseReference> => {
  const userRef = ref(db, `favorites/${userId}`);
  const newMovieRef = push(userRef);
  await set(newMovieRef, movie);
  return newMovieRef;
};

export const removeMovieFromFavorites = async (userId: string, movieId: string): Promise<void> => {
  const movieRef = ref(db, `favorites/${userId}`);
  await remove(movieRef);
}
