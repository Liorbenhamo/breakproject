import { React, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../usecontext/Usecontext";
import { login } from "../utils/AuthService";

axios.defaults.withCredentials = true;

function LoginPage() {
  const { setUseronline } = useContext(Context);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await login(data);
      let userloged = response.data.user;
      console.log(response);
      console.log(userloged);
      if (!userloged.themeimgurl) {
        console.log(userloged.themeimgurl);
        userloged.themeimgurl =
          "https://www.solidbackgrounds.com/images/1920x1080/1920x1080-gray-solid-color-background.jpg";
        console.log(userloged.themeimgurl);
      }
      if (!userloged.userimgurl) {
        console.log("hi");
        userloged.userimgurl =
          "data:image/png;base64,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";
      }
      console.log(userloged);
      setUseronline(userloged);
      navigate("/connected");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="bg-gray-600 flex w-screen h-screen flex-col justify-center items-center">
      <div className=" w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-black dark:border-gray-700">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 mr-7"
          action="#"
        >
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to break
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              placeholder="email"
              {...register("email", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          {errors.email && (
            <span className="text-gray-900 dark:text-white">
              This field is required
            </span>
          )}
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          {errors.password && (
            <span className="text-gray-900 dark:text-white">
              This field is required
            </span>
          )}
          <button
            type="submit"
            className="w-full text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link
              className="text-white hover:underline dark:text-white"
              to={"/register"}
            >
              create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
