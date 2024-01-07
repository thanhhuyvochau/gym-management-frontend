import { AccountResponse } from "@/app/_models/account-response";
import { ApiResponse } from "@/types/api-response";
import { log } from "console";
import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { useSession } from "next-auth/react";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
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
                    console.log("USER LOGIN:" + JSON.stringify(user));

                    return user.data;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            //TODO 
            // Mapping response data to user session
            // Currently problem is that is lose data after refresh because user only return 
            // after login and session is set to user , so when request session get empty
            if (user) {
                token.user = user;
            }
            // console.log("jwt.token:" + JSON.stringify(token));
            return token;
        },
        async session({ session, token, user }) {
            if (token && token.user) {
                session.user = { ...token.user };
            }
            console.log("SESSION CONVERTER:" + JSON.stringify(session));
            return session;
        },
    },
    pages: {
        signIn: "/login"
    }
})

export { handler as GET, handler as POST }