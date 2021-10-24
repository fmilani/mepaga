import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    signIn: async function({user, account, profile, email, credentials}) {
      // TODO: implementar geracao de JWT no server
      const res = await fetch('https://fmilani-mepaga.builtwithdark.com/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ user })
      })
      user.accessToken = await res.json()
      console.log({user, account, profile, email, credentials})
      return true
    },
    jwt: async function({token, user}) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    session: async function({session, token}) {
      session.accessToken = token.accessToken
      return session
    }
  }
})
