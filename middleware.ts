import { auth } from "./lib/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname === "/dashboard") {
    const newUrl = new URL("/?auth=false", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
