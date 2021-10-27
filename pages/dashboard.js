import Head from 'next/head'
import { useState, useRef } from 'react'
import { getSession, useSession, signOut } from 'next-auth/react'
import * as themeSelectors from '../utils/themes'
import Link from 'next/link'

export default function dashboard({ config }) {
  const session = useSession()
  const picpayHandleInputRef = useRef(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [picpayHandle, setPicpayHandle] = useState(config.picpayHandle)
  const [value, setValue] = useState(config.value)
  const [title, setTitle] = useState(config.title)
  const [message, setMessage] = useState(config.message)
  const [buttonText, setButtonText] = useState(config.buttonText)
  const [theme, setTheme] = useState(config.theme)
  const [savedConfig, setSavedConfig] = useState(config)
  const themes = ['pink', 'yellow', 'purple']

  return (
    <>
      <Head>
        <title>dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="shadow sticky top-0 w-full z-50 bg-white">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/">
            <a className="text-2xl font-bold">
              mepaga
            </a>
          </Link>
          {
            config.picpayHandle || savedConfig.picpayHandle
            ? (<button
              type="button"
              className={`px-4 py-2 rounded-md text-white ${themeSelectors.bgSelector(theme)}`}
            >
              <a href={`/${config.picpayHandle || savedConfig.picpayHandle}`} target="_blank">Ver sua página</a>
            </button>)
            : ""
          }
        </div>
      </nav>
      <main className="p-4 max-w-lg mx-auto">
        <div className="flex flex-col justify-between shadow-lg rounded-md">
          <div className="py-6 px-6 top-16 border-b-2 border-gray-100 bg-white z-20">
            <h1 className="text-lg leading-6 font-medium text-gray-900">Personalize sua página</h1>
            <p className="mt-1 text-sm text-gray-500">
              Preencha os campos abaixo para personalizar sua página.
            </p>
          </div>
          <div className="px-6 bg-white divide-y-2 divide-gray-100">
            <div className="py-6">
              <div className="sm:col-span-12">
                <label htmlFor="picpayHandle" className="block text-sm font-medium text-gray-700">
                  Nome de usuário no Picpay
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">@</span>
                  <input type="text" name="picpayHandle" id="picpayHandle" autoComplete="picpayHandle" className="flex-1 focus:outline-none focus:ring-blue-500 border-2 focus:border-green-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 p-2" ref={picpayHandleInputRef} value={picpayHandle}
                     onChange={e => {
                       setPicpayHandle(e.target.value)
                       if (e.target.value) setError('')
                     }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Esse é seu nome de usuário cadastrado no Picpay. Certifique-se de colocar o nome correto para que os pagamentos caiam no lugar certo.
                </p>
              </div>
              <div className="mt-6 sm:col-span-12">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Valor do pagamento no Picpay<span className="ml-1 text-gray-400">(Opcional)</span>
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input type="number" pattern="[0-9]*" min="0.0" inputMode="numeric" name="amount" id="amount" className="focus:outline-none focus:ring-blue-500 border-2 focus:border-green-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2" placeholder="0.00" aria-describedby="price-currency" value={value}
                    onChange={e => {
                      setValue(e.target.value)
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Você tem a opção de especificar o valor que deseja receber.
                </p>
              </div>
              <div className="mt-6 sm:col-span-12">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Título
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <input name="title" id="title" className="focus:outline-none focus:ring-blue-500 border-2 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md p-2" placeholder="Um título daora" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
              </div>
              <div className="mt-6 sm:col-span-12">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mensagem
                </label>
                <div className="mt-2">
                  <textarea id="message" name="message" rows="5" className="max-w-lg shadow-sm block w-full focus:outline-none focus:ring-blue-500 border-2 focus:border-green-500 sm:text-sm border-gray-300 rounded-md p-2" value={message} onChange={e => setMessage(e.target.value)}>
                  </textarea>
                </div>
              </div>
              <div className="mt-6 sm:col-span-12">
                <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700">
                  Texto do Botão<span className="ml-1 text-gray-400">(Opcional)</span>
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <input name="buttonText" id="buttonText" className="focus:outline-none focus:ring-blue-500 border-2 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md p-2" placeholder="Pagar R$1,99" value={buttonText} onChange={e => setButtonText(e.target.value)} />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {`Se deixar em branco, o texto do botão vai ser "Pagar R$<valor>"`}
                </p>
              </div>
            </div>
            <div className="py-6">
              <div className="sm:col-span-12">
                <label htmlFor="tema" className="block text-sm font-medium text-gray-700">
                  Tema
                </label>
                <p className="mt-2 text-xs text-gray-500">
                  Personalize sua página escolhendo um dos temas abaixo
                </p>
                <div className="mt-4 inline-flex space-x-4 space-y-0 flex-wrap">
                    {
                      themes.map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTheme(t)}
                          className={`${themeSelectors.bgSelector(t)} p-6 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${theme === t ? 'ring-2 ring-offset-2 ring-green-500' : null}`}></button>
                      ))
                    }
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto py-6">
            <button
              type="button"
              className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-pink-700 to-purple-700"
              onClick={async () => {
                if (!picpayHandle) {
                  setError('Tá faltando o nome de usuário no Picpay')
                  return 
                }
                setLoading(true)
                const response = await fetch('https://fmilani-mepaga.builtwithdark.com/config', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${session.data.accessToken}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ picpayHandle, value: Number(value), title, message, buttonText, theme }),
                })
                setLoading(false)
                if (response.status !== 200) alert('Algo deu errado.')
                const data = await response.json()
                setSavedConfig(data)
              }}
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
        { error &&
        <div className="p-6 sticky bottom-0 border-t-4 border-red-300 bg-red-50 shadow-2xl">
          <div className="flex flex-auto sm:items-center">
            <div className="max-w-prose sm:pr-4">
              <p className="text-xs text-red-800">
                {error}
              </p>
            </div>
            <div className="items-end sm:w-1/2">
              <button
                type="button"
                className="block w-full items-center p-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:bg-red-700"
                onClick={() => {
                  picpayHandleInputRef.current.focus()
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                }}
              >
                Corrigir
              </button>
            </div>
          </div>
        </div>
        }
      </main>
      <footer>
        <div className="float-right px-4 py-2"><button onClick={() => signOut()}>sair</button></div>
      </footer>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const res = await fetch('https://fmilani-mepaga.builtwithdark.com/config',{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${session.accessToken}`
    }
  })
  const config = await res.json()
  return {
    props: { config },
  }
}
