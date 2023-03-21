const Input = () => {
  return (
    <div className="relative">
      <input
        id="email"
        className="
            block
            rounded-md
            px-6
            pt-6
            pb-1
            w-full
            text-md
            text-white
            bg-neutral-700
            appearance-none
            focus:outline-none
            focus:ring-0
            peer
        "
        placeholder=" "
      />
      <label
        className="
            absolute
            text-lg
            font-semibold
            text-zinc-400
            duration-150
            transform
            -translate-y-0
            scale-75
            top-1
            z-10
            origin-[0]
            left-6
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-2
            peer-focus:scale-75
            peer-focus:translate-y-0
      "
        htmlFor="email"
      >Email 
      </label>
    </div>
  );
};
export default Input;
