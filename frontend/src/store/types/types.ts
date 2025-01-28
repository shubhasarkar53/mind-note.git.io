export interface INotes {
  _id?: string;
  link?: string;
  type?: string;
  color?: string;
  title?: string;
  text?: string;
  shared?: boolean;
  tags?: Array<string>;
  userId?: { fullname: string; _id: string };
  updatedAt?: string;
  createdAt?: string;
}

export interface ILinks {
  hash: string;
  noteId: string;
  userId: string;
}

export interface ITags {
  title?: string;
}
export interface IUser {
  fullname: string;
  username: string;
  password: string;
  isPremium?: boolean;
}

export interface Note {
  id: string;
  content: string;
  color: string;
  createdAt: Date;
}