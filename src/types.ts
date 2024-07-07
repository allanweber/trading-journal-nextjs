export type UserId = string;

export interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export interface UserDisplay {
  userId: string;
  displayName?: string;
  pictureUrl?: string | undefined;
}
