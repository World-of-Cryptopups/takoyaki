export interface GETRAM {
  base: RAMSUPPLYBASE;
  quote: RAMSUPPLYBASE;
}

export interface RAMSUPPLYBASE {
  balance: string;
  weight: string;
}
