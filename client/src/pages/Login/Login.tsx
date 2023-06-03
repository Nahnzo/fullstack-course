import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import CustomInput from "../../components/CustomInput/CustomInput";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { Card, Form, Row, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, SetError] = useState("");
  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate("/");
    } catch (error) {
      const isError = isErrorWithMessage(error);
      if (isError) {
        SetError(error.data.message);
      } else {
        SetError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <CustomButton type="primary" htmlType="submit" loading={false}>
              Войти
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={routes.register}>Зарегистрируйтесь</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
