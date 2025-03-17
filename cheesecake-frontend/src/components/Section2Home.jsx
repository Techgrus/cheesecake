import React from 'react';
import Optionlist from './Optionlist';

const Section2Home = () => {
  const options = [
    { text: "Pick Up/ Shop", bg: "pinkOverlay", height: 500, to:"/pickup",img:"img7.png" },
    { text: "Catering", bg: "pinkOverlay", height: 500,to:"/catering",img:"img7.png" },
    { text: "Shipping", bg: "blueOverlay", height: 350 ,to:"/",img:"img1.png"},
    { text: "Our Story", bg: "blueOverlay", height: 350 ,to:"/ourstory",img:"img1.png"},
    { text: "Partner/Wholesale", bg: "pinkOverlay", height: 350,to:"/partner",img:"img7.png" },
    { text: "Merch", bg: "pinkOverlay", height: 350 ,to:"/merch",img:"img7.png"},
    { text: "Contact Us", bg: "blueOverlay", height: 350,to:"/contact",img:"img1.png" },
  ];

  // return (
  //   <>
  //     <div className="w-full mt-20">
  //       <div className="pl-9 pr-9 w-full">
  //         <div className="flex flex-col">
  //           <div>
  //             <h1 className="text-[96px] font-black">Choose Option</h1>
  //           </div>
  //           <div>
  //             <Optionlist arr={options} />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div className="w-full mt-8 md:mt-12 lg:mt-20">
        <div className="px-4 md:px-6 lg:px-9 w-full">
          <div className="flex flex-col">
            <div>
              <h1 className="text-4xl mb-10 md:text-6xl lg:text-[96px] text-center lg:text-left figtree-900">
                Choose Option
              </h1>
            </div>
            <div>
              <Optionlist arr={options} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Section2Home;
