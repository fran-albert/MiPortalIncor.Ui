export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/usuarios/:path*", "/inicio", "/mi-perfil", "/mis-laboratorios"],
};
