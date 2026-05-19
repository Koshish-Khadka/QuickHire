const Login = () => {
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
        <form className="mt-6 space-y-6">
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
            Login
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
