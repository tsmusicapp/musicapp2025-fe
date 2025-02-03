// src/types/chat.ts
export interface IMessage {
  id : number | undefined;
  _id: string | undefined;
  sender: number;
  // receiverId: number | undefined;
  text: string;
  createdAt: string;
  isCard?: boolean ;
  cardType?: string ;
  currentUser: string | undefined ;
}

export interface IChatRoom {
  chatId: number;
  data: IMessage[];
}

export interface IChatUser {
  id: string;
  chatId: string;
  avatar: string;
  userName: string;
  latestMessage: string;
  unreadCount: number;
}
