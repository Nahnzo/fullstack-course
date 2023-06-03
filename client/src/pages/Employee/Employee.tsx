import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from "../../app/services/employees";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import Layout from "../../components/Layout/Layout";
import { Descriptions, Divider, Modal, Space } from "antd";
import CustomButton from "../../components/CustomButton/CustomButton";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { routes } from "../../routes/routes";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

const Employee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <span>Идет загрузка</span>;
  }
  if (!data) {
    return <Navigate to="/" />;
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteUser = async () => {
    hideModal();
    try {
      await removeEmployee(data.id).unwrap();
      navigate(`${routes.status}/deleted`);
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
      <Descriptions title="Информация о сотруднике" bordered={true}>
        <Descriptions.Item
          label="Имя"
          span={3}
        >{`${data.firstName} ${data.lastName}`}</Descriptions.Item>
        <Descriptions.Item label="Возраст" span={3}>{`${data.age} `}</Descriptions.Item>
        <Descriptions.Item label="Адрес" span={3}>{`${data.address} `}</Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <CustomButton shape="round" type="default" icon={<EditOutlined />}>
                Редактировать
              </CustomButton>
            </Link>
            <CustomButton shape="round" danger onClick={showModal} icon={<DeleteOutlined />}>
              Удалить
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Подтвердите удаление"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        Вы дейстивтельно хотите удалить сотрудника из таблицы?
      </Modal>
    </Layout>
  );
};

export default Employee;
