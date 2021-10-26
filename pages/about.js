import Head from "next/head";
import {useSession, signIn} from "next-auth/react";
import Link from "next/link";

export default function About() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>sobre</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="top-0 w-full z-50 bg-white">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/">
            <a className="text-2xl font-bold">mepaga</a>
          </Link>
          {
            session
            ? (<button
              type="button"
              className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-pink-700 to-purple-700"
            >
              <Link href="/dashboard">
                <a>Personalizar sua página</a>
              </Link>
            </button>)
            : (<button
              className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-pink-700 to-purple-700"
              onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/dashboard` })}
            >
              Personalizar sua página
            </button>)
          }
        </div>
      </nav>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <p>Esse projeto se tornou possível graças a fantásticas ferramentas e produtos como:</p>
        <ul className="mt-4">
          <li><a href="https://nextjs.org" className="mt-4 underline">Next.js</a></li>
          <li className="mt-4"><a href="https://tailwindcss.com" className="mt-4 underline">Tailwind css</a></li>
          <li className="mt-4"><a href="https://darklang.com" className="mt-4 underline">Dark</a></li>
          <li className="mt-4"><a href="https://vercel.com" className="mt-4 underline">Vercel</a></li>
        </ul>
        <p className="mt-8">
          Ele também teve grande inspiração no projeto <a href="https://venme.at" className="no-underline hover:underline">venme.at</a>, criado por <a href="https://twitter.com/thingsinmotion" className="no-underline hover:underline">@thingsinmotion</a>
        </p>
      </main>
    </div>
  )
}
