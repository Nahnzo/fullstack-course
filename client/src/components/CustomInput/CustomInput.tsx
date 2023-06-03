import React from "react";
import { Form, Input } from "antd";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
};

const CustomInput = ({ placeholder, name, type = "text" }: Props) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      rules={[{ required: true, message: "Обязательное поле" }]}
    >
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  );
};

export default CustomInput;
