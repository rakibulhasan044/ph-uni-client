import { useGetAllSemesterQuery } from "../../../redux/feature/academicSemester/academicSemesterApi";

const AcademicSemester = () => {

    const {data} = useGetAllSemesterQuery(undefined)
    return (
        <div>
            <h1>academic semester</h1>
        </div>
    );
};

export default AcademicSemester;