import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { userService } from '../../services';

export { AccountLayout };

function AccountLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const bgURL = "../../public/assets/login-bg.png";
    console.log(`url(${bgURL})`)
    return (
        <div className="offset-md-3 mt-5" styles={{backgroundImage: `${bgURL}` }}>
            {children}
        </div>
    );
}