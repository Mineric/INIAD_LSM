import Link from 'next/Link'
import {useRouter} from 'next/router'
import { useEffect } from 'react';

const NotFound = () => {

    let router = useRouter();

    useEffect(() => {
        setTimeout(()=>{
            router.push('/');
        }, 5000)
    }, [])

    return ( 
        <div className="not-found">
            <h1>Ooops...</h1>
            <h2> That page cannot be found.</h2>
             <p >Go Back to the <Link href="/">home page</Link>.</p>
        </div>
     );
}
 
export default NotFound;