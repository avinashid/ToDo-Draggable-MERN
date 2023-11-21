import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);
  // setTimeout(() => {
  //   navigate("/");
  // }, 2000);
  return (
    <div className="errorPage flex gap-5 h-screen justify-center items-center flex-col">
      <h1 className="text-6xl font-serif">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
