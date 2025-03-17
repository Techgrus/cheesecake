const Option = ({ h, bg, btnContent }) => {
  // Map bg to actual class names
  const bgClass = bg === "pinkOverlay" ? "bg-pinkOverlay" : "bg-blueOverlay";

  return (
    <div
      style={{
        height: `${h}px`,
        borderRadius: "25.58px",
        border: '0.84px solid rgba(0, 0, 0, 1)',
      }}
      className={`w-[100%] ${bgClass} flex flex-col justify-between py-5 items-center px-14`}
    >
      <div className="w-full flex justify-center items-center h-[70%]">
        <div
          style={{
            background: "rgba(0, 0, 0, 0.07)",
            borderRadius: "13px",
            backgroundImage: `url("https://i.pinimg.com/736x/6b/4a/8c/6b4a8c5f828b772e68c357d52eccb8f3.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="w-[240px] h-[180px]"
        ></div>

      </div>
      <div className="w-full flex justify-center items-center h-[30%]">
        <h2 className="font-black text-[64px]">{btnContent}</h2>
      </div>
    </div>
  );
};

export default Option;
