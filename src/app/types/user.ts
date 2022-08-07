export interface User {
  id: number;
  username: string;
  emailAddress: string;
  avatar: string;
  badge: string;
  birthday: number;
  accountCreation: number;
  isMuted: boolean;
  isBanned: boolean;
  isModerator: boolean;
  isAdmin: boolean;
}
