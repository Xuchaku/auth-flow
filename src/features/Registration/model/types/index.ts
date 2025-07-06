export type RegisterForm = {
   password: string;
   name: string;
   username: string;
   email: string;
};

export type RegisterExtendForm = RegisterForm & {
   repassword: string;
};
