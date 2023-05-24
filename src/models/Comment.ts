export interface Comment {
  id: string;
  description: string;
  userId: string;
  likes: string[];
  userProfile: {
    name: string,
    photoUri: string,
    following: string[],
    followers: string[],
    createdAt: Date,
    updatedAt: Date,
  }
  createdAt: Date;
  updatedAt: Date;
}
