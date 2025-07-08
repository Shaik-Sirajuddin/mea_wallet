export interface TwoFADetails {
  qrUrl: string;
  secretCode: string;
  isRegistered: boolean;
}

export interface UserDetails {
  image: string;
}
export interface RegistrationResponse {
  status: string;
  message: string;
}
