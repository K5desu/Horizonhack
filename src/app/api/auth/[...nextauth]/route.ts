import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      authorization: {
        params: {
          scope: 'read:user user:email read:org',
        },
      },
      profile(profile) {
        const adminUserIds = process.env.ADMIN_USER_IDS?.split(',') ?? []
        const isAdmin = adminUserIds.includes(profile.id.toString())
        console.log(isAdmin)
        console.log(isAdmin ? 'admin' : 'user')
        console.log(profile)
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email ?? null,
          image: profile.avatar_url,
          role: isAdmin ? 'admin' : 'user',
        }
      },
    }),
  ],
  callbacks: {
    // サインイン時の例外処理
    async signIn({ user, account, profile }) {
      if (account?.access_token) {
        const resp = await getGitHubOrganizations(account.access_token)
        const hasorg = resp.find((org: any) => org.login === process.env.GITHUB_ORG)
        if (hasorg) {
          return true
        }
      }
      return false
    },
    async jwt({ token, user, account }) {
      return { ...token, ...user, ...account }
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      return session
    },
  },
}

async function getGitHubOrganizations(accessToken: string) {
  const resp = await fetch(`https://api.github.com/user/orgs`, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
    }),
  }).then((res) => res.json())

  return resp
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
