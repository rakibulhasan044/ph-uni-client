import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/feature/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/feature/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const defaultValues = {
    id: "A-0001",
    password: "admin123"
  }


  const [login, { error, data }] = useLoginMutation();
  console.log("error=>", error, data);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success('Logged in', {id: toastId, duration: 2000});
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error('Something went wrong', {id: toastId, duration: 2000})
      console.log(error);
    }
  };

  return (
    <Row
      justify="center"
      align={"middle"}
      style={{ height: "100vh", backgroundColor: "gray" }}
    >
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type={"text"} name={"id"} label={"ID: "} />
        <PHInput type={"text"} name={"password"} label={"Password:"} />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
