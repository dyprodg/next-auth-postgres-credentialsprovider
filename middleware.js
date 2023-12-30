import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // URL der Anfrage
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Keine Authentifizierung für die Startseite und die Redirect-Seite erforderlich
  if (pathname === '/' || pathname === '/redirect') {
    return NextResponse.next();
  }

  // Token aus den NextAuth-Cookies abrufen
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Wenn der Benutzer nicht authentifiziert ist, umleiten zur Startseite
  if (!session) {
    url.pathname = '/';  // Oder zu einer anderen Anmeldeseite umleiten
    return NextResponse.redirect(url);
  }

  // Der Benutzer ist authentifiziert, fortfahren mit der Anfrage
  return NextResponse.next();
}
