import { useEffect, useState } from "react";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import Layout from "../../components/Layout/Layout";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useAddEmployeeMutation } from "../../app/services/employees";
import { Employee } from "@prisma/client";
import { routes } from "../../routes/routes";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

const AddEmployee = () => {
  const [error, setError] = useState("");
  const [AddEmployee] = useAddEmployeeMutation();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const handleAddEmployee = async (data: Employee) => {
    try {
      await AddEmployee(data).unwrap;
      navigate(`${routes.status}/created`);
    } catch (error) {
      const isError = isErrorWithMessage(error);
      if (isError) {
        setError(error.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);
  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Добавить сотрудника"
          btnText="Добавить"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  );
};

export default AddEmployee;
