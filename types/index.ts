export interface AuthFormData {
  username: string;
  email: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  passwords: Array<UserPassword>;
}

export interface UserPassword {
  idx: number;
  username: string;
  website: string;
  password: string;
}

export type UserFormData = Omit<UserPassword, "idx">;

export interface BasicApiResponse {
  data: { status: number; message: string };
}

export interface JwtToken {
  id: string;
  username: string;
  exp: Date;
}
