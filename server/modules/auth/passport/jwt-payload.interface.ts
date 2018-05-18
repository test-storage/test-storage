export interface JwtPayload {
  email: string;
  userId: string;
  roles: Array<string>;
}
