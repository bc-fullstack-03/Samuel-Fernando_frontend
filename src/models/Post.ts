export interface Post {
  id: string,
  title: string,
  description: string,
  userId: string,
  userProfile: {
    name: string,
    photoUri: string,
    following: string[],
    followers: string[],
    createdAt: Date,
    updatedAt: Date,
  },
  likes: string[],
  isImage: boolean,
  createdAt: Date,
  updatedAt: Date,
  comments: [],
}
