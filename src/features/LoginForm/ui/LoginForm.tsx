import { userApi } from '@entities/User/model/api/userApi';
import { UserShema } from '@entities/User/model/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginShema } from '../model/shema';
import { useAppDispatch } from '@shared/hooks';
import { setAuthData } from '@entities/Auth/AuthSlice';
import { DataLoginAuth } from '@entities/Auth/model/types';

export const LoginForm = () => {
   const [triggerLogin, { isLoading: isLoadingLogin }] = userApi.useLazyLoginQuery();

   const dispatch = useAppDispatch();

   const form = useForm<Pick<UserShema, 'email' | 'password'>>({
      defaultValues: {
         password: '',
         email: '',
      },
      resolver: yupResolver(loginShema),
      mode: 'onChange',
      reValidateMode: 'onChange',
   });

   const { register, formState, handleSubmit } = form;
   const { errors } = formState;

   const onSubmit: SubmitHandler<Pick<UserShema, 'email' | 'password'>> = async (data) => {
      try {
         const loginResponse = await triggerLogin(data);
         if (loginResponse.data) {
            dispatch(setAuthData(loginResponse.data.data as DataLoginAuth));
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='flex flex-col gap-4 p-6 bg-white rounded-xl shadow-xl/15 max-w-xs border-1 border-blue-200'>
            <p className='self-center text-xl'>Вход</p>
            <Input
               {...register('email')}
               error={!!errors.email}
               helperText={errors.email?.message}
               label='Email'
            />
            <Input
               {...register('password')}
               error={!!errors.password}
               helperText={errors.password?.message}
               label='Password'
               type='password'
            />
            <Button
               type='submit'
               children={<>Войти</>}
               loading={isLoadingLogin}
               disabled={Object.keys(errors).length > 0}
            />
         </div>
      </form>
   );
};
