import Hero from "../assets/Hero.jpg";

const Herosection = () => {
  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      <div className="w-1/2 px-16 flex flex-col justify-center items-start gap-y-6">
        <div className="space-y-2">
          {" "}
          <h1 className="text-6xl font-bold text-[#1B7B6F] max-w-xl leading-tight">
            Book trusted helpers for any task
          </h1>
          <p className="text-slate-600 text-lg max-w-lg">
            Find trusted local workers for cleaning, repairs, moving, gardening,
            and more.
          </p>
        </div>

        <input
          type="search"
          placeholder="What service are you looking for?"
          className="border border-slate-300 p-3 rounded-3xl max-w-xl w-full focus:outline-none focus:ring-2 focus:ring-[#1B7B6F] focus:border-transparent"
        />
      </div>
      <div className="flex-1 bg-[#1B7B6F] p-8 text-white">
        <img src={Hero} alt="Hero" className="object-contain h-full" />
      </div>
    </div>
  );
};

export default Herosection;
