import { Decimal } from "decimal.js";

export interface IToken {
  id: number;
  name: string;
  symbol: string;
  decimals: number;
  balance: Decimal; // usually a stringified number for precision
  lockedBalance: Decimal;
}

export class Token implements IToken {
  id: number;
  name: string;
  symbol: string;
  decimals: number;
  balance: Decimal;
  lockedBalance: Decimal;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.symbol = data.symbol;
    this.decimals = data.decimals;
    this.balance = new Decimal(data.balance);
    this.lockedBalance = new Decimal(data.lockedBalance);
  }

  // Convert to JSON
  toJSON(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      symbol: this.symbol,
      decimals: this.decimals,
      balance: this.balance.toString(),
      lockedBalance: this.lockedBalance.toString(),
    };
  }

  // Construct from JSON
  static fromJSON(json: any): Token {
    return new Token(json);
  }
}
