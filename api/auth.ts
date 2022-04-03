import instance from "./index";

// Types
import axios from "axios";
import * as ts from "../types/index";

export const login = async (formData: ts.AuthFormData) => {
  try {
    const { data }: ts.BasicApiResponse = await instance.post(
      "/api/auth/login",
      formData
    );

    return data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      return "We could not identify the cause of this error :(";
    }
  }
};

export const register = async (formData: ts.AuthFormData) => {
  try {
    const { data }: ts.BasicApiResponse = await instance.post(
      "/api/auth/register",
      formData
    );

    return data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      return "We could not identify the cause of this error :(";
    }
  }
};

export const isLoggedIn = async () => {
  try {
    const { data }: ts.BasicApiResponse = await instance.get(
      "/api/auth/isLoggedIn"
    );

    return data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      return "We could not identify the cause of this error :(";
    }
  }
};
