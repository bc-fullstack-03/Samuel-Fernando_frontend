export interface Profile {
  idUser: string;
  name: string;
  photoUri: string;
  followers: string[];
  following: string[];
  createdAt: Date;
  updatedAt: Date;
}
