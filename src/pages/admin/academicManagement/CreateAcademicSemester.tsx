import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constant/semester";
import { monthOptions } from "../../../constant/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagementSchema";
import { useAddAcademicSemesterMutation } from "../../../redux/feature/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";


const currentYear = new Date().getFullYear();
const yearOption = [0, 1, 2, 3, 4].map(number => ({
  value: String(currentYear + number),
  label: String(currentYear + number)
}))

const CreateAcademicSemester = () => {

  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth
    }
    try {
      console.log(semesterData);
      const res = await addAcademicSemester(semesterData) as TResponse;
      if(res.error) {
        toast.error(res?.error?.data?.message, { id: toastId })
      } else {
        toast.success(res?.data?.message, { id: toastId })
      }
      console.log(res);
    } catch (error) {
      toast.error('something went wrong', { id: toastId })
    }
  };

  return (
    <Flex justify="center" align="center" style={{height: "100vh"}}>
      <Col span={6}>
        <PHForm onSubmit={onSubmit} resolver = {zodResolver(academicSemesterSchema)}>
          <PHSelect label={"Name"} name={"name"} option={semesterOptions}/>
          <PHSelect label={"Year"} name={"year"} option={yearOption}/>
          <PHSelect label={"Start Month"} name={"startMonth"} option={monthOptions}/>
          <PHSelect label={"End Month"} name={"endMonth"} option={monthOptions}/>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
