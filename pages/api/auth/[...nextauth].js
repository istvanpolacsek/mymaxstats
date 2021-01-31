import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
    providers: [
        Providers.Google({
            clientId: process.env.NEXTAUTH_GOOGLE_ID,
            clientSecret: process.env.NEXTAUTH_GOOGLE_SECRET,
          })
    ],

    database: process.env.NEXTAUTH_DATABASE_URL,

    session: {},

    jwt: {},

    callbacks: {
        signIn: async (user, account, profile) => {
            return true
          },

        session: async (session, user) => {
            return Promise.resolve(session)
            },

        jwt: async (token, user, account, profile, isNewUser) => {
            return Promise.resolve(token)
          },
    },

    pages: {}
}

const Auth = (req, res) => NextAuth(req, res, options)

export default Auth