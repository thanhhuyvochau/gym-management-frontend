import { getServerSession } from "next-auth";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {

  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (token) {
          let accessToken = (token.user as any).token;
          let userRole = (token.user as any).role;
        } else {
          return false;
        }
        return true;
      },
    },
  }
)
export const config = { matcher: ["/daskboard/:path*"] }

