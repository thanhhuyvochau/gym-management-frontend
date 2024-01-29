import { AccountResponse } from "@/app/_models/AccountResponse";
import { ApiResponse } from "@/app/_models/ApiResponse";
import { isTokenExpired, parseJwtToken } from "@/app/_ultils/jwt";
import { log } from "console";
import NextAuth, { User } from "next-auth"
import { decode } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied

                const res = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.username,
                        password: credentials?.password,
                    }),
                });
                const user = await res.json();

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user.data;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 86400000 // 24 hours
    },
    callbacks: {
        async jwt({ token, user }) {
            //TODO 
            // Mapping response data to user session
            // Currently problem is that is lose data after refresh because user only return 
            // after login and session is set to user , so when request session get empty
            if (user) {
                token.user = user;


            }
            return token;
        },
        async session({ session, token }) {
            if (isTokenExpired(parseJwtToken((token.user as any).token))) {
                console.log("SESSION:" + JSON.stringify(session));
                // session.expires = token.exp;
                return session;
            } else if (token && token.user) {
                session.user = { ...token.user } as any;
            }
            // console.log("SESSION:" + JSON.stringify(session));

            return session;
        },
    },
    pages: {
        signIn: "/login"
    }
})

export { handler as GET, handler as POST }