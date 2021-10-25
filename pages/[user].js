import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import * as themes from '../utils/themes'

export default function User({ config }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>mepaga - {config.picpayHandle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${themes.bgSelector(config.theme)} min-h-screen h-full w-full flex flex-col items-center`}>
        <div className="justify-center px-4 m-auto block w-full">
          <main className={`w-full max-w-screen-sm m-auto p-8 ${themes.nmInsetSelector(config.theme)} rounded-3xl`}>
            <div className="pb-10 flex items-start">
              {config.picture &&
              <div>
                <img className="inline-block h-9 w-9 rounded-full" src={config.picture} alt="foto do perfil" />
              </div>
              }
              <div className="ml-3 flex-1">
                <p className="text-xl font-bold text-gray-100">{config.title}</p>
              </div>
            </div>
            <div className="whitespace-pre-line text-lg font-medium text-gray-100">{config.message}</div>
          </main>
          <div className="max-w-screen-sm w-full m-auto mt-12">
              <button
                type="button"
                className={`w-full py-6 text-lg text-gray-100 active:outline-none ${themes.nmFlatSelector(config.theme)} rounded-3xl ${themes.nmActiveSelector(config.theme)}`}
                onClick={() => router.push(`https://picpay.me/${config.picpayHandle}/${config.value}`)}
              >
                Pagar R$ {config.value}
              </button>
          </div>
        </div>
    <Link href="/">
        <a
          className="block flex-none text-center z-10 right-0 left-0 bottom-0 items-center p-8 rounded-lg border-0 text-white opacity-60 text-lg focus:outline-none ring-0 focus:ring-0 border-0"
          target="_blank"
        >
          mepaga
        </a>
    </Link>
      </div>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const res = await fetch(`https://fmilani-mepaga.builtwithdark.com/${query.user}/config`, {
    method: 'GET',
  })
  if (res.status === 404) return { notFound: true }
  const config = await res.json()
  return {
    props: { config }
  }
}
