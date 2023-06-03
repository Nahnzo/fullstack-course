import Layout from "../../components/Layout/Layout";
import CustomInput from "../../components/CustomInput/CustomInput";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Card, Form, Row, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useState } from "react";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

type RegisterD = Omit<User, "id"> & { confirmPassword: string };

const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();
  const register = async (data: RegisterD) => {
    try {
      await registerUser(data).unwrap();
      navigate("/");
    } catch (error) {
      const isError = isErrorWithMessage(error);
      if (isError) {
        setError(error.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Регистрация" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <CustomInput name="name" placeholder="Имя" />
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput name="confirmPassword" placeholder="Повторите пароль" />
            <CustomButton type="primary" htmlType="submit" loading={false}>
              Зарегистрироваться
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Есть аккаунт? <Link to={routes.login}>Войдите</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Register;
