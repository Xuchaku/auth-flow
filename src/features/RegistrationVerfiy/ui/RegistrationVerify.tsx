import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterVerifyForm } from '../model/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerVerifyShema } from '../model/shema';
import { Input } from '@shared/ui/Input';
import { Button } from '@shared/ui/Button';
import { registrationVerifyApi } from '../model/api/registrationVerifyApi';
import { useAppSelector } from '@shared/hooks';
import { getUserEmail } from '@entities/User/model/selectors/userSelectors';

export const RegistrationVerify = () => {
   const email = useAppSelector(getUserEmail);

   const [triggerRegisterVerify, { isLoading: isLoadingRegisterVerify }] =
      registrationVerifyApi.useLazyRegisterVerifyQuery();

   const form = useForm<RegisterVerifyForm>({
      defaultValues: {
         email,
         code: '',
      },
      resolver: yupResolver(registerVerifyShema),
      mode: 'onChange',
      reValidateMode: 'onChange',
   });

   const { register, formState, handleSubmit } = form;
   const { errors } = formState;

   const onSubmit: SubmitHandler<RegisterVerifyForm> = async (data) => {
      try {
         const response = await triggerRegisterVerify(data);
         console.log(response.status);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='flex flex-col gap-4 p-6 bg-white rounded-xl shadow-xl/15 max-w-xs border-1 border-blue-200'>
            <p className='self-center text-xl'>Подтверждение регистрации</p>
            <Input
               {...register('email')}
               error={!!errors.email}
               helperText={errors.email?.message}
               label='Email'
            />
            <Input
               {...register('code')}
               error={!!errors.code}
               helperText={errors.code?.message}
               label='Code'
            />
            <Button
               type='submit'
               children={<>Подтвердить</>}
               loading={isLoadingRegisterVerify}
               disabled={Object.keys(errors).length > 0}
            />
         </div>
      </form>
   );
};
