import axiosInstance from "./AxiosInstance";

export const getUsers = async () => {
    const response = await axiosInstance.get('api/users/all');
    const users = response.data.filter((item) => item.role === "student");
    return users;

}

export const getProffesors = async () => {
    const response = await axiosInstance.get('api/users/all');
    const users = response.data.filter((item) => item.role === "profesor");
    console.log(response.data)
    return users;

}

export const updateUser = async (user) => {
    console.log(user)
    const response = await axiosInstance({
        method: 'PUT',
        url: 'api/users',
        data: {
            "id": user.id,
            "numeFam": user.numeFam,
            "prenume": user.prenume,
            "email": user.email,
            "role": user.role,
            "nrMat": user.nrMat,
            "parola": user.parola
        }
      });
    return response;
}