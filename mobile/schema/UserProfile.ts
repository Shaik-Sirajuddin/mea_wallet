export interface IUserProfile {
  username: string;
  email: string;
  email_verified: boolean;
  twofa_completed: boolean;
  emoji: string;
}

export class UserProfile implements IUserProfile {
  username: string;
  email: string;
  email_verified: boolean;
  twofa_completed: boolean;
  emoji: string;

  constructor(data: any) {
    this.username = data.username || "";
    this.email = data.email || "";
    this.email_verified = !!data.email_verified;
    this.twofa_completed = !!data.twofa_completed;
    this.emoji = data.emoji || "🙂";
  }

  toJSON(): Record<string, any> {
    return {
      username: this.username,
      email: this.email,
      email_verified: this.email_verified,
      twofa_completed: this.twofa_completed,
      emoji: this.emoji,
    };
  }

  static fromJSON(json: any): UserProfile {
    return new UserProfile(json);
  }
}
