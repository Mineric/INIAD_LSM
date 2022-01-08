import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../comps/Layout'
import { AuthProvider } from '../firebase/contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
<<<<<<< HEAD
   </AuthProvider>
=======
    </AuthProvider>
>>>>>>> 4e7326a97b435e5706043f631464b76aedb4ff04
  )
}
export default MyApp;
