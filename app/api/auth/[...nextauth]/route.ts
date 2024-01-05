import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [CredentialsProvider({
        name: "Credentials",

        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied

            const res = await fetch("http://localhost:8000/api/auth/login", {
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
                return user;
            } else {
                return null;
            }
        },
    }),],
    pages: {
        signIn: "/login"
    }
})

export { handler as GET, handler as POST }