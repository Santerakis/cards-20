import { authThunks } from "features/auth/auth.slice";
import s from "features/auth/Register/styles.module.css";
import { useActions } from "common/hooks";
import { useEffect } from "react";
import { commonActions } from "common/actions/unhandle.action";
import { appActions } from "app/app.slice";

export const Register = () => {
  // const { register } = useActions(authThunks);
  // const { unHandleAction } = useActions(commonActions);

  const { register, unHandleAction } = useActions({
    ...commonActions,
    ...authThunks,
  });

  useEffect(() => {
    const res = unHandleAction();
  }, []);

  const registerHandler = () => {
    const payload = {
      email: "safrondev2@gmail.com",
      password: "12345678",
    };
    const res = register(payload).unwrap();
  };

  return (
    <div className={s.container}>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};
