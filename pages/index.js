import Head from 'next/head'
import { useSession, signIn } from "next-auth/react"
import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>mepaga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="top-0 w-full z-50 bg-white">
        <div className="flex items-center justify-between px-4 h-16">
          <span className="text-2xl font-bold">
            mepaga
          </span>
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
        <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 via-yellow-700 to-purple-700">
          <span className="block">Tenha uma página personalizada</span>
          <span className="block py-4">para receber pagamentos do Picpay</span>
        </span>
        <a href="/felipe.milani" target="_blank" className="no-underline hover:underline text-xl font-light">Ver um exemplo →</a>
      </main>

      <footer className="flex items-center justify-between w-full h-12 px-2 border-t text-sm">
        <span>Criado com ❤️ por <a href="https://www.fmilani.dev" className="no-underline hover:underline">Felipe</a></span>
        <Link href="/about"><a className="no-underline hover:underline">Sobre</a></Link>
      </footer>
    </div>
  )
}
