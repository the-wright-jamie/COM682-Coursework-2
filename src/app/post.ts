export interface Post {
  id: number;
  posterId: string;
  poster: string;
  avatar: string;
  badge: string;
  postType: string;
  postDate: number;
  header: string;
  body: string;
  media: string;
  comments: number;
  likes: number;
}
