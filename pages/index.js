import Head from 'next/head'
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from 'next/router'

function Component() {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    return (
      <>
        Oi, {session.user.name} <br />
        <button className="mt-4 px-4 py-2 rounded-md bg-green-500 text-white" onClick={() => router.push('/dashboard')}>Personalizar sua página</button>
        <button className="mt-8 px-4 py-2 rounded-md bg-red-500 text-white" onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Clica no botão de Login pra começar<br />
      <button
        className="mt-4 px-4 py-2 rounded-md bg-red-500 text-white"
        onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/dashboard` })}
      >
        Login com google
      </button>
    </>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>mepaga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Component />
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}
