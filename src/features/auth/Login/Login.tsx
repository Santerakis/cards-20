import { authThunks } from "features/auth/auth.slice";
import s from "features/auth/Register/styles.module.css";
import { useActions } from "common/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useActions(authThunks);
  const navigate = useNavigate();

  const loginHandler = () => {
    const payload = {
      email: "safrondev1@gmail.com",
      password: "1qazxcvBG",
      rememberMe: false,
    };
    login(payload)
      .unwrap()
      .then((res) => {
        toast.success("Вы успешно залогинились");
        navigate("/packs");
      })
      .catch((err) => {
        toast.error(err.e.response.data.error);
      });
  };

  return (
    <div className={s.container}>
      🔄
      <span style={{ fontSize: "50px" }}>♻ &#128260; &#128580;</span>
      <h1>Login</h1>
      <button onClick={loginHandler}>login</button>
    </div>
  );
};
