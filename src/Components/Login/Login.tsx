import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {authApi} from "../../api/auth-api";

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validationSchema:Yup.object({
            email: Yup.string().email("Invalid email address").required("Required field"),
            password:Yup.string().min(4, "Password should be at least 4 characters").required("Required field"),
        }),
        onSubmit: values => {
            // alert(JSON.stringify(values));
            authApi.login(values)
                .then(res => {

                })
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>

                            <TextField label="Email" margin="normal"
                                       name="email" value={formik.values.email} //необходимые данные для Formik (name, value, onChange)
                                       onChange={formik.handleChange} onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && formik.touched.email && <div style={{color:"red"}}>{formik.errors.email}</div>}
                            <TextField type="password" label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps("password")} // функция заменяющая (name, onChange, value, checked)
                            />
                            {formik.errors.password && formik.touched.password && <div style={{color:"red"}}>{formik.errors.password}</div>}
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

