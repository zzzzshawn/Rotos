import { authMiddleware } from "@clerk/nextjs";

// this middleware protects all routes including api routes. Edit this to allow routes to be public

export default authMiddleware({
    publicRoutes: [ // publicRoutes is used to specify public routes
        '/',
        '/api/webhook',        // / route is now public
        '/question/:id',
        '/tags',
        '/tags/:id',
        '/profile/:id',
        '/community',
    ],
    ignoredRoutes: [
      '/api/webhook', '/api/chatgpt'
    ]
});
// export const config = {
//   matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
}; 