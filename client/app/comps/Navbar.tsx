import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { Badge } from '@mui/material';
// import MailIcon from '@mui/icons-material/Notifications'
import { purple, red } from '@mui/material/colors';

const Navbar = () => {

    const primary = red[500]; // #f44336
    const accent = purple.A200; // #e040fb (alternative method)

    return (

        <>  
            <Head>
                <title>NextType | Home</title>
                <meta name = 'keywords' content="NextType"/>
            </Head>       
            <nav>
                <div className="logo">
                    <Image src='/vercel.svg' width={80} height={30}/>
                </div>
                    <Badge color="secondary" badgeContent={12}>
                        <NotificationsNoneRoundedIcon  style={{color: accent}}/>
                    </Badge>
                <Link href="/accounts/RegisterForm"><a>LogIn</a></Link>
                <Link href="/">Profile</Link>
            </nav>
        </>
     
    );
}


export default Navbar;