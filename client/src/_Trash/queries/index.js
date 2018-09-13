import axios from "./axiosInstance";
import { getAccessToken } from "../modules/AuthHelpers";
//NOMINATIONS
export const getNominations = () => axios.get("/api/nominations");
export const addNomination = data => axios.post("/api/nominations", data);
export const updateNomination = (id, data) => {
  console.log("[Update Nom Q] ", id, data);
  return axios.put(`/api/nominations/${id}`, data);
};
export const deleteNomination = id => axios.delete(`/api/nominations/${id}`);

//CARS
export const getCars = () => axios.get("/api/cars");
export const getCarById = id => axios.get(`/api/cars/${id}`);
export const addCar = data => axios.post("/api/cars", data);
export const updateCar = (id, data) => axios.put(`/api/cars/${id}`, data);
export const deleteCar = id => axios.delete(`/api/cars/${id}`);

//VOTES
export const getVotes = () => axios.get("/api/votes");
export const addVote = data => axios.post("/api/votes", data);
export const deleteVote = id => axios.delete(`/api/votes/${id}`);

//COSTUM QUERIES
export const getInitialData = () => {
  return Promise.all([getNominations(), getCars()]).then(([nom, cars]) => {
    const poll = {};
    nom.data.forEach(nomination => {
      poll[nomination.name] = cars.data.filter(car => {
        return car.nominations.includes(nomination.name);
      });
    });
    return {
      poll: poll,
      nominations: nom.data,
      cars: cars.data
    };
  });
};

//AUTH
export const onRegister = data => axios.post("/auth/signup", data);
export const onLogin = data => axios.post("/auth/login", data);
//USER DATA
export const getUserData = () =>
  axios.get("/api/user", {
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization: "bearer " + getAccessToken()
    }
  });
//USERS
export const getUsers = () => axios.get("/api/users");
export const updateUser = id => axios.put(`/api/users/${id}`);
export const deleteUser = id => axios.delete(`/api/users/${id}`);
