export interface LoginCredentials {
  username: string;
  password: string;
}

export type UserRoles = 'admin' | 'user' | 'customer';

export interface User {
  username: string;
  roles: string[];
}
