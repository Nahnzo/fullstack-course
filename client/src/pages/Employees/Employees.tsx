import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import { Employee } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton";
import Layout from "../../components/Layout/Layout";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
];
const Employees = () => {
  const goToAddUser = () => navigate(routes.employeeAdd);
  const { data, isLoading } = useGetAllEmployeesQuery();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);
  return (
    <Layout>
      <CustomButton type="primary" onClick={goToAddUser} icon={<PlusCircleOutlined />}>
        Добавить
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${routes.employee}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};

export default Employees;
