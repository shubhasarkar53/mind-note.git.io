export interface INotes {
  _id?: string;
  link?: string;
  type?: string;
  title?: string;
  text?: string;
  shared?: boolean;
  tags?: Array<string>;
  userId?: string;
  timestamps?: boolean;
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
