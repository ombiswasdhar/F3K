import { NextResponse } from "next/server";

export async function auth() {
  return {
    userId: "user_mock_preview_01",
    sessionId: "sess_mock_preview_01",
    getToken: async () => null,
    protect: async () => {},
    redirectToSignIn: () => {},
  };
}

export async function currentUser() {
  return {
    id: "user_mock_preview_01",
    firstName: "Preview",
    lastName: "Collector",
    emailAddresses: [{ emailAddress: "collector@f3k.com" }],
    primaryEmailAddress: { emailAddress: "collector@f3k.com" },
  };
}

export function clerkMiddleware(handler?: any) {
  return (req: any, ev: any) => {
    return NextResponse.next();
  };
}

export function createRouteMatcher(routes: string[]) {
  return (req: any) => false;
}

export const clerkClient = {
  users: {
    getUser: async (id: string) => ({
      id,
      firstName: "Preview",
      lastName: "Collector",
      emailAddresses: [{ emailAddress: "collector@f3k.com" }],
    }),
  },
};

export function getAuth(req: any) {
  return {
    userId: "user_mock_preview_01",
    sessionId: "sess_mock_preview_01",
    getToken: async () => null,
  };
}
