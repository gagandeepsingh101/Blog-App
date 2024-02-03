import * as yup from "yup";
import { emailValidate, passwordValidate } from "./constant";


export const LoginSchema = yup.object().shape({
    email: yup.string().email().required().matches(emailValidate, {
        message: "Please write a valid email address"
    }),
    password: yup
        .string()
        .required()
        .matches(passwordValidate, {
            message: 'Please write a valid password',
        })
});

export const RegisterSchema = yup.object().shape({
    username: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required().matches(emailValidate, {
        message: "Please write a valid email address"
    }),
    password: yup
        .string()
        .required()
        .matches(passwordValidate, {
            message: 'Please write a valid password',
        })
});