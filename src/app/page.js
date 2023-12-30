import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { RedirectType, redirect, useRouter } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import RegisterButton from "./components/RegisterButton";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if(session) redirect('/timeline');

  return(
    <div className="relative">
      <div className="fixed top-0 right-0">
        <RegisterButton />
      </div>
      <div className="fixed top-0 left-0">
        <div>Logo</div>
      </div>
      <div>
        <LoginForm classname='' />
      </div>
    </div>
  );
}
