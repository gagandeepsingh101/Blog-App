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

export const BlogSchema = yup.object().shape({
    title: yup.string()
        .required('Title is required'),
    description: yup.string()
        .required('Description is required'),
});
