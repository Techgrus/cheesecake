import Option from "./Option";
const Optionlist = ({ arr }) => {
  return (
    <ul className="flex flex-wrap gap-x-10 w-full  justify-center">
      {arr.map((option, index) => (
        <li key={index} className="w-[48.5%] mt-10   ">
          <Option h={option.height} btnContent={option.text} bg={option.bg} />
        </li>
      ))}
    </ul>
  );
};

export default Optionlist;
