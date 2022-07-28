export interface Comment {
  id: number;
  postId: number;
  posterId: number;
  postDate: number;
  body: string;
  likes: number;
  username: string;
  avatar: string;
}
