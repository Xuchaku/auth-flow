import { getIsToken } from '@entities/Auth/model/selectors/authSelectors';
import { LoginForm } from '@features/LoginForm';
import { Registration } from '@features/Registration';
import { RegistrationVerify } from '@features/RegistrationVerfiy';
import { UserForm } from '@features/UserForm';
import { useAppSelector } from '@shared/hooks';
import { Button } from '@shared/ui/Button';
import { ModalWithButton } from '@shared/ui/ModalWithButton';

export const HomePage = () => {
   const isToken = useAppSelector(getIsToken);

   return (
      <div className='flex flex-row bg-blue-500 p-4 text-white gap-2 justify-end shadow-xl/10'>
         <ModalWithButton trigger={<Button>Вход</Button>}>
            <LoginForm />
         </ModalWithButton>
         {isToken && <Button>Выход</Button>}
         {isToken && (
            <ModalWithButton trigger={<Button>Базовая информация</Button>}>
               <UserForm />
            </ModalWithButton>
         )}
         <ModalWithButton trigger={<Button>Регистрация</Button>}>
            <Registration />
         </ModalWithButton>
         <ModalWithButton trigger={<Button>Подтверждение регистрации</Button>}>
            <RegistrationVerify />
         </ModalWithButton>
      </div>
   );
};
