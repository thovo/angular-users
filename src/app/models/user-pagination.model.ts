import { User } from '@models/user.model';

export type UserPagination = {
  total: number;
  skip: number;
  limit: number;
  users: User[];
};
