const NewsLetter = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 30% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, nulla!
      </p>
      <form className="w-full sm:w-1/2 flex items-center gap-3 mx-1 md:mx-auto my-6 border border-gray-400 rounded pl-3">
        <input
          className="w-full sm:flex-1 outline-none"
          required
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          onClick={onSubmitHandler}
          className="bg-black text-white text-xs px-10 py-4 "
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
