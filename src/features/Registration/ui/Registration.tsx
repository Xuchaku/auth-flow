import { SubmitHandler, useForm } from 'react-hook-form';
import { registrationApi } from '../model/api/registrationApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterExtendForm } from '../model/types';
import { registerShema } from '../model/shema';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { useAppDispatch } from '@shared/hooks';
import { setUserMainInfo } from '@entities/User/UserSlice';

export const Registration = () => {
   const [triggerRegister, { isLoading: isLoadingRegister }] =
      registrationApi.useLazyRegisterQuery();

   const dispatch = useAppDispatch();

   const form = useForm<RegisterExtendForm>({
      defaultValues: {
         name: '',
         password: '',
         username: '',
         email: '',
         repassword: '',
      },
      resolver: yupResolver(registerShema),
      mode: 'onChange',
      reValidateMode: 'onChange',
   });

   const { register, formState, handleSubmit } = form;
   const { errors } = formState;

   const onSubmit: SubmitHandler<RegisterExtendForm> = async (data) => {
      try {
         const { repassword, ...otherData } = data;
         await triggerRegister(otherData);
         dispatch(setUserMainInfo({ email: data.email, password: data.password }));
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='flex flex-col gap-4 p-6 bg-white rounded-xl shadow-xl/15 max-w-xs border-1 border-blue-200'>
            <p className='self-center text-xl'>Регистрация</p>
            <Input
               {...register('name')}
               error={!!errors.name}
               helperText={errors.name?.message}
               label='Name'
            />
            <Input
               {...register('username')}
               error={!!errors.username}
               helperText={errors.username?.message}
               label='Nickname'
            />
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
            <Input
               {...register('repassword')}
               error={!!errors.repassword}
               helperText={errors.repassword?.message}
               label='Re-password'
               type='password'
            />
            <Button
               type='submit'
               children={<>Зарегистрироваться</>}
               loading={isLoadingRegister}
               disabled={Object.keys(errors).length > 0}
            />
         </div>
      </form>
   );
};
