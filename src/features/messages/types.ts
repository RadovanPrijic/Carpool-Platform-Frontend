export interface Message {
  id: number;
  content: string;
  readStatus: boolean;
  createdAt: Date;
  senderId: string;
  receiverId: string;
}

export interface MessageCreateDTO {
  content: string;
  senderId: string;
  receiverId: string;
}

export interface MessageUpdateDTO {
  content?: string;
  readStatus: boolean;
}
