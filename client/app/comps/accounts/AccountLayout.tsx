import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { userService } from '../../services';

export { AccountLayout };

import bg from "../../public/assets/login-bg.png";

function AccountLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(`url(${bg})`)

    return (
        <div style={{
            backgroundImage: `url(${require("../../public/assets/login-bg.png")})`,
            // backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: "absolute",
            width: "100vw",
            height: "100vh"
        }}>
            <div className="offset-md-3 mt-5" >
                {children}
            </div>
        </div>

    );
}