import * as yup from 'yup';

export const registerShema = yup.object({
   name: yup.string().required('Имя для отображения обязательно'),
   username: yup
      .string()
      .matches(
         /^[A-Za-z][A-Za-z0-9_]*$/,
         'Никнейм должен начинаться с буквы и содержать только латинские буквы, цифры и подчёркивание',
      )
      .required('Никнейм обязателен'),
   email: yup.string().email('Некорректный email').required('Email обязателен'),
   password: yup
      .string()
      .min(8, 'Пароль должен содержать не менее 8 символов')
      .matches(/[A-Za-z]/, 'Пароль должен содержать буквы')
      .matches(/[0-9]/, 'Пароль должен содержать цифры')
      .required('Пароль обязателен'),
   repassword: yup
      .string()
      .test('passwords-match', 'Пароли должны совпадать', function (value) {
         return value === this.parent.password;
      })
      .required('Поле не должно быть пустым'),
});
