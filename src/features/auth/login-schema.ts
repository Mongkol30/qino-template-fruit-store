import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  phoneOrUsername: Yup.string().required('Phone number or username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export interface LoginFormValues {
  phoneOrUsername: string;
  password: string;
}

export const initialLoginValues: LoginFormValues = {
  phoneOrUsername: '',
  password: '',
};
