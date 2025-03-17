// import React from 'react'
// import MenuItem from './MenuItem'

// const Menulist = ({ arr }) => {
//   return (
//     <>
//       <ul className="flex flex-col w-full ">
//         {arr.map((menu, index) => (
//           <li key={index} className="w-[full] mt-10">
//             <MenuItem id={menu.id} heading={menu.heading} text={menu.text} bg={menu.bg} />
//           </li>
//         ))}
//       </ul>
//     </>
//   )
// }

// export default Menulist

// import React from 'react';
// import MenuItem from './MenuItem';

// const Menulist = ({ arr }) => {
//   return (
//     <ul className="flex flex-col w-full">
//       {arr.map((menu, index) => (
//         <li key={index} className="w-full mt-10">
//           <MenuItem 
//             countId={menu.countId} 
//             id={menu.id}
//             heading={menu.heading} 
//             text={menu.text} 
//             bg={menu.bg} 
//             img={menu.img} // Pass image to MenuItem
//           />
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Menulist;


// import React from 'react';
// import MenuItem from './MenuItem';

// const Menulist = ({ arr }) => {
//   return (
//     <ul className="flex flex-col w-full">
//       {arr.map((menu, index) => (
//         <li key={menu.id} className="w-full mt-10"> {/* Use product.id as the unique key */}
//           <MenuItem 
//             countId={menu.countId} 
//             id={menu.id} // Pass original product ID
//             heading={menu.heading} 
//             text={menu.text} 
//             bg={menu.bg} 
//             img={menu.img} // Pass image to MenuItem
//           />
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Menulist;


import React from 'react';
import MenuItem from './MenuItem';

const Menulist = ({ arr }) => {
  return (
    <ul className="flex flex-col w-full">
      {arr.map((menu, index) => (
        <li key={menu.id} className="w-full mt-4 sm:mt-6 lg:mt-10">
          <MenuItem 
            countId={menu.countId} 
            id={menu.id}
            heading={menu.heading} 
            text={menu.text} 
            bg={menu.bg} 
            img={menu.img}
          />
        </li>
      ))}
    </ul>
  );
};

export default Menulist;