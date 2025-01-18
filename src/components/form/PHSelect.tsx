import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type THSelectProps = {
  label: string;
  name: string;
  option: {
    value: string;
    label: string;
    disabled?: boolean
  } []
}

const PHSelect = ({ label, name, option }: THSelectProps) => {
  return (
    <Controller
    name={name}
      render={({field, fieldState: {error}}) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={option}
            size="large"
          />
          {error && <small style={{color: 'red'}}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
