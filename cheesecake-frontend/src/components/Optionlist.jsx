// import React from 'react';
// import Option from "./Option";

// const Optionlist = ({ arr }) => {
//   return (
//     <ul className="flex flex-wrap gap-x-10 w-full justify-center">
//       {arr.map((option, index) => (
//         <li key={index} className="w-[48.5%] mt-10">
//           <Option h={option.height} btnContent={option.text} bg={option.bg} to={option.to}  />
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Optionlist;



import React from 'react';
import Option from "./Option";

const Optionlist = ({ arr }) => {
  return (
    <ul className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-x-6 lg:gap-x-6 w-full justify-center">
      {arr.map((option, index) => (
        <li key={index} className={(index==0 ? "lg:w-full " : "lg:w-[49%] ") + "w-full "}>
          <Option h={option.height} btnContent={option.text} bg={option.bg} to={option.to} img={option.img}/>
        </li>
      ))}
    </ul>
  );
};

export default Optionlist;