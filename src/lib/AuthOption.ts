import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GitHubProvider from 'next-auth/providers/github'
import { AuthOptions } from 'next-auth'

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
        return {
          id: profile.id.toString(),
          name: profile.login,
          displayName: profile.name ?? null,
          email: profile.email ?? null,
          image: profile.avatar_url,
          role: isAdmin ? 'admin' : 'user',
        }
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
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
      session.user.name = token.name
      session.user.displayName = token.displayName
      session.user.id = token.id
      session.user.role = token.role
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
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
