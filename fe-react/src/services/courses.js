import axiosInstance from "./AxiosInstance"

export const getCourses = async() => {
    const response = await axiosInstance.get('api/courses');
    const courses = response.data;
    return courses;
};

export const addCourse = async(courseName) => {
    const response = await axiosInstance({
        method: "POST",
        url: "api/courses",
        data: {
            'name': courseName
        }
    });
    return response;
}