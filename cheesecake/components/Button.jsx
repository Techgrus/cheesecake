import Link from "next/link";


export default function Button(props) {
  const w = props.w + "px"
  const h = props.h + "px"
  if (props.lnk) {
    return <Link href={props.lnk}>{props.txt}</Link>
  }
  else {
    return <button
      style={{
        background: props.bg,
        borderRadius: props.br,
        border: `1px solid ${props.bc}`,
        height: h,
        width: w


      }}
      className={` py-[15px] px-[15px] flex justify-center items-center `} onClick={props.onClick}

    >
      <p style={{ color: props.color }}>{props.txt}</p></button>
  }
}