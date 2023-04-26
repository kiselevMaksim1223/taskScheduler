import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Navigate} from "react-router-dom";
import {selectIsLoginIn} from "../../State/auth/auth-selectors";
import {authThunks} from "../../State/auth/auth-reducer";
import {useAppSelector} from "../../Utils/hooks/useAppSelector";
import {useActions} from "../../Utils/hooks/useActions";

export const Login = () => {
    console.log("login")

    const isLoginIn = useAppSelector(selectIsLoginIn)

    const {LoginIn} = useActions(authThunks)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validationSchema: Yup.object({           // библиотека yup для валидации формы
            email: Yup.string().email("Invalid email address").required("Required field"),
            password: Yup.string().min(4, "Password should be at least 4 characters").required("Required field"),
        }),
        onSubmit: values => {
            LoginIn({data:values})
        },
    });

    if (isLoginIn) {                  //если логинизация успешная то перенаправить на главную
        return <Navigate to={"/"}/>
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <FormControl>
                        <FormLabel>
                            <p>You can registered <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>here</a></p>
                            <p>or use common test account</p>
                            <p>Email: <span>free@samuraijs.com</span></p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>

                            <TextField label="Email" margin="normal"
                                       name="email"
                                       value={formik.values.email} //необходимые данные для Formik (name, value, onChange)
                                       onChange={formik.handleChange} onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && formik.touched.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}
                            <TextField type="password" label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps("password")} // функция заменяющая (name, onChange, value, checked)
                            />
                            {formik.errors.password && formik.touched.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}
                            <FormControlLabel label={'Remember me'} control={<Checkbox/>}
                                              name="rememberMe" checked={formik.values.rememberMe}
                                              onChange={formik.handleChange}
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>

                        </FormGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
};

