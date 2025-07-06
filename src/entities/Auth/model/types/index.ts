export type AuthSchema = {
   isToken: boolean;
};

export type DataLoginAuth = {
   token_type: string;
   expires_in: number;
   access_token: string;
   refresh_token: string;
};
