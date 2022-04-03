export const isInProd: boolean = true;

export const apiUrl = isInProd
  ? "https://password-manager-psi.vercel.app"
  : "http://localhost:3000";
