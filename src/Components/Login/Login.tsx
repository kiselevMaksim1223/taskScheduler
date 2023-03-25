import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validationSchema

        ,
        onSubmit: values => {
            alert(JSON.stringify(values));
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
                                       onChange={formik.handleChange}
                            />
                            <TextField type="password" label="Password"
                                       margin="normal" name="password" value={formik.values.password}
                                       onChange={formik.handleChange}
                            />
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

