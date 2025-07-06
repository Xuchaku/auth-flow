import { getIsToken } from '@entities/Auth/model/selectors/authSelectors';
import { userApi } from '@entities/User/model/api/userApi';
import { useAppSelector } from '@shared/hooks';

export const UserForm = () => {
   const isToken = useAppSelector(getIsToken);
   const { data } = userApi.useBasicInfoQuery(null, { skip: !isToken });

   // TODO непонятно как выглядит ответ юзера... бек не отвечает
   return (
      <div>
         {data && (
            <>
               <p>{data.data.email}</p>
               <p>{data.data.name}</p>
               <img src={data.data.photo} />
               <p>{data.data.username}</p>
            </>
         )}
      </div>
   );
};
