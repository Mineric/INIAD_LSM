import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { LinkNext } from '../../comps/LinkNext';
import { AccountLayout } from '../../comps/accounts/AccountLayout';
import { userService, alertService } from '../../services';
import { useAuth } from "../../firebase/contexts/AuthContext"
import { fetchWrapper } from "../../helpers"

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
            const URL = "http://127.0.0.1:8000/api/whoami/";
            fetchWrapper.get(URL).then(data => {
                console.log("Done fetching data");
                console.log(data);
            });
            const returnUrl = router.query.returnUrl || '/';
            router.push(returnUrl[0]); // why [0] ?
        } catch {
            alertService.error("Failed to login")
          }
        /*    
        userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                
            })
            .catch(alertService.error);
        */ 
    }

    return (
        <AccountLayout>
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
                        <LinkNext href="/account/register" className="btn btn-link">Register</LinkNext>
                    </form>
                </div>
            </div>
        </AccountLayout>
    );
}