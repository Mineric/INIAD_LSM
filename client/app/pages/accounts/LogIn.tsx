import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { LinkNext } from '../../comps/LinkNext';
import { AccountLayout } from '../../comps/accounts/AccountLayout';
import { userService, alertService } from '../../services';
import { useAuth } from "../../firebase/contexts/AuthContext"
import { fetchWrapper } from "../../helpers"
import { Grid } from '@material-ui/core';
export default Login;

function Login() {
    const router = useRouter();
    const { login } = useAuth();
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }: {username: string, password: string}) {
        try {
            login(username, password);
            
            const returnUrl = '/dashboard';
            console.log("Return url: ", returnUrl);
            console.log(router.query.returnUrl);
            router.push(returnUrl); // why [0] ?
            // const URL = "http://127.0.0.1:8000/api/whoami/";
            // fetchWrapper.get(URL).then(data => {
            //     console.log("Done fetching data");
            //     console.log(data);
                
            // });
            
            // const returnUrl = router.query.returnUrl || '/dashboard';
            
        } catch {
            alertService.error("Failed to login");
          }
    }

    return (
        <AccountLayout style={{backgroundColor:'black'}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid  item xs={3} > 
                <div className="card">
                    <h4 className="card-header">Login</h4>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>Username</label>
                                <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.username?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                            <button disabled={formState.isSubmitting} className="btn btn-primary">
                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Login
                            </button>
                            <LinkNext href="/accounts/RegisterForm" className="btn btn-link">Register</LinkNext>
                        </form>
                    </div>
                </div>
            </Grid>

                <Grid sx={{alignItem:'left', marginTop: '0px'}} item xs={3} style={{alignItem:'left', marginTop: '0px'}}>
                    <img src="../assets/logo.png" alt="logo" style={{height:'150px'}} />
                </Grid>


            </Grid>
            
 
      
        </AccountLayout>
    );
}