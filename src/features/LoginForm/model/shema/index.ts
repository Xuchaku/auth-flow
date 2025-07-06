import * as yup from 'yup';

export const loginShema = yup.object({
   email: yup.string().email('Некорректный email').required('Email обязателен'),
   password: yup
      .string()
      .min(8, 'Пароль должен содержать не менее 8 символов')
      .required('Пароль обязателен'),
});
