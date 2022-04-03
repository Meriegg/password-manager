import instance from "./index";

// Types and type checking
import axios from "axios";
import * as ts from "../types/index";

type GetPasswordsResponse = ts.BasicApiResponse & {
  data: {
    passwords: Array<ts.UserPassword>;
  };
};

export const getPasswords = async () => {
  try {
    const { data }: GetPasswordsResponse = await instance.get(
      "/api/user/getPasswords"
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

export const createPassword = async (formData: ts.UserFormData) => {
  try {
    const { data }: GetPasswordsResponse = await instance.post(
      "/api/user/createPassword",
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

export const deletePassword = async (idx: number) => {
  try {
    const { data }: ts.BasicApiResponse = await instance.post(
      "/api/user/deletePassword",
      { idx }
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

type ShowPasswordResponse = ts.BasicApiResponse & {
  data: {
    password: string;
  };
};

export const showPassword = async (idx: number) => {
  try {
    const { data }: ShowPasswordResponse = await instance.post(
      "/api/user/showPassword",
      { idx }
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
