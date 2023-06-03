import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditEmployeeMutation, useGetEmployeeQuery } from "../../app/services/employees";
import Layout from "../../components/Layout/Layout";
import { Row } from "antd";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import { Employee } from "@prisma/client";
import { routes } from "../../routes/routes";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [editEmployee] = useEditEmployeeMutation();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  if (isLoading) {
    return <span>Загрузка</span>;
  }
  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };
      await editEmployee(editedEmployee).unwrap();
      navigate(`${routes.status}/updated`);
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
        <EmployeeForm
          title="Редактировать сотрудника"
          btnText="Редактировать"
          error={error}
          employee={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  );
};

export default EditEmployee;
