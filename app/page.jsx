"use client";
import { login } from "./action";
import { useFormState } from "react-dom";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

export default function Page() {
  try {
    const router = useRouter();
    const cookies = useCookies();
    if (cookies.get("token") != null) {
      router.push("/users/admin");
    }
  } catch (error) {
    console.log(error);
  }
  const initState = {
    massage: "",
  };
  const [state, formAction] = useFormState(login, initState);
  return (
    <div className="container">
      <div className="w-full flex flex-col justify-center">
        <div className="text-center text-6xl">Tokoderu Foods</div>
        <p className="mt-3 text-center">Product Management web-application</p>
        <form action={formAction} className="flex flex-col my-3 items-center">
          <div className="mt-2 flex flex-col justify-center">
            <p>Username : </p>
            <input
              name="username"
              className="input input-bordered input-info w-full max-w-xs mt-3"
            />
          </div>
          <div className="mt-2 flex flex-col justify-center">
            <p>Password : </p>
            <input
              name="password"
              className="input input-bordered input-info w-full max-w-xs mt-3"
            />
          </div>
          <button className="btn btn-info text-white mt-3">Submit</button>
          <div className="text-red-600">{state.massage}</div>
        </form>
      </div>
    </div>
  );
}