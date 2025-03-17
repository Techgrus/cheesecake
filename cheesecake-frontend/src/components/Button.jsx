export default function Button(props) {
  const w = props.w + "px";
  const h = props.h + "px";

  if (props.lnk) {
    return (
      <a
        href={props.lnk}
        style={{
          textDecoration: "none",
          display: "inline-block",
          textAlign: "center",
        }}
      >
        {props.txt}
      </a>
    );
  } else {
    // return (
    //   <button
    //     style={{
    //       background: props.bg,
    //       borderRadius: props.br,
    //       border: `1px solid ${props.bc}`,
    //       height: h,
    //       width: w,
    //     }}
    //     className={`py-[15px] px-[15px] flex justify-center items-center`}
    //     onClick={props.onClick}
    //   >
    //     <p style={{ color: props.color }}>{props.txt}</p>
    //   </button>
    // );

    return (
      <button
        style={{
          background: props.bg,
          borderRadius: props.br,
          border: `1px solid ${props.bc}`,
        }}
        className={`h-[50px] w-[156px] py-3 px-4 flex justify-center items-center text-sm sm:text-base transition-all duration-300 hover:opacity-90`}
        onClick={props.onClick}
      >
        <p style={{ color: props.color }} className="font-medium">
          {props.txt}
        </p>
      </button>
    );
  }
}
