import * as yup from 'yup';

export const registerVerifyShema = yup.object({
   code: yup.string().required('Код обязателен'),
   email: yup.string().email('Некорректный email').required('Email обязателен'),
});
