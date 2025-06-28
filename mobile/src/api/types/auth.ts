// api/types/auth.ts

export interface StatusResponse {
  status: "succ" | string;
}

export interface AuthResponse {
  status: "succ" | string;
  token : string;
}

export interface CsrfTokenResponse {
  csrfToken: string;
}

export interface LoginStatusResponse {
  loggedIn: boolean;
}

export interface LogoutResponse {
  logout: string;
}

export interface ForgetPasswordResponse {
  status: "Temporary password" | string;
}
