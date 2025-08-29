export interface TwoFADetails {
  qrUrl: string;
  secretCode: string;
  isRegistered: boolean;
}

export interface UserDetails {
  image: string;
  twoFACompleted: boolean;
}
export interface RegistrationResponse {
  status: string;
  message: string;
}
