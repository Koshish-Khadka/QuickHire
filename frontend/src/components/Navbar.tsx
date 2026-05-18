const Navbar = () => {
  return (
    <nav className="flex justify-around items-center p-4 border border-gray-200 border-b fixed top-0 left-0 right-0 bg-white z-10">
      <h1 className="text-2xl font-bold text-[#1B7B6F]">QuickHire</h1>
      <ul className="flex gap-x-6 text-sm text-slate-600">
        <li className="hover:text-[#1B7B6F] cursor-pointer">Services</li>
        <li className="hover:text-[#1B7B6F] cursor-pointer">How it Works</li>
        <li className="hover:text-[#1B7B6F] cursor-pointer">About</li>
      </ul>
      <div className="flex gap-x-4">
        <button className="text-sm border border-[#1B7B6F] text-[#1B7B6F] px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out">
          Sign up / Login
        </button>
        <button className="text-sm bg-[#1B7B6F] text-white px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out">
          Become a Worker
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
