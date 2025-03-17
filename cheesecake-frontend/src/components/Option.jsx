import { Link } from "react-router-dom";

const Option = ({ h, bg, btnContent, to, img }) => {
  const bgClass = bg === "pinkOverlay" ? "bg-[#ff0099]/15  " : " bg-[#0072ff]/15 ";

  return (
    <Link to={to}>
      <div
        style={{
          backgroundImage:
            "url(/assets/" +
            img +
            ")",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
        className={` ${bgClass} bg-blend-overlay rounded-[18.82px] w-full flex flex-col pink justify-between items-center`}
      >
        <div
          className={`rounded-[18.82px] w-full flex justify-center items-center `}
        >
          <h2 className="figtree-700 text-2xl p-6 sm:text-3xl md:text-4xl lg:text-[51px]">
            {btnContent}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Option;
