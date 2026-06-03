import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../store/authSlice";
import type { RootState } from "store/store";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit } = useForm<Inputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }
  
  const handleLogin = useMutation({
    mutationFn: async (data: Inputs) => {
      const response = await api.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      // console.log("Login data", data);
      localStorage.setItem("token", data.token);
      dispatch(
        setCredentials({
          user: data.data,
          token: data.token,
        }),
      );
      toast.success("Login successful!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error);

      toast.error(error?.response?.data?.message || "Login failed");
    },
  });

  const onSubmit = (data: Inputs) => {
    handleLogin.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex justify-center items-center">
      <div className="bg-white w-full max-w-96 rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center text-[#1B7B6F]">
          QuickHire
        </h2>
        <h3 className="text-center mt-6 text-xl font-semibold">
          Login into your account
        </h3>
        <p className="text-center text-sm text-gray-400 mt-2">
          Enter your credentials below
        </p>
        {/* forms */}
        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1B7B6F] focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1B7B6F] focus:border-transparent"
            />
            <a
              href="/forgot-password"
              className="text-[12px] text-[#1B7B6F] font-semibold hover:underline block text-end mt-2"
            >
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#1B7B6F] text-white py-2 rounded-md hover:bg-[#16695e] transition duration-300 hover:scale-[1.02]"
          >
            {handleLogin.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <a
          href="/signup"
          className="text-sm text-slate-600 block text-center mt-4"
        >
          Don't have an account?{" "}
          <span className="text-[#1B7B6F] hover:underline">Sign up</span>
        </a>
      </div>
    </div>
  );
};

export default Login;
