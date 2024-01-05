import LoginForm from "./components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import RegisterButton from "./components/RegisterButton";

// Define an async function named 'Register'
export default async function Register() {
  // Fetch the user session from the server using 'getServerSession'
  const session = await getServerSession(authOptions);

  // If a session exists, redirect the user to the '/timeline' page
  if (session) redirect('/timeline');

  // Render the registration page with components
  return (
    <div className="relative">
      <div className="fixed top-0 right-0">
        {/* Render the 'RegisterButton' component */}
        <RegisterButton />
      </div>
      <div className="fixed top-0 left-0">
        {/* Placeholder for a logo */}
        <div>Logo</div>
      </div>
      <div>
        {/* Render the 'LoginForm' component */}
        <LoginForm classname='' />
      </div>
    </div>
  );
}
