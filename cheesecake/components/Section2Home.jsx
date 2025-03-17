
import Optionlist from "./Optionlist";
const Section2Home = () => {
  const options = [
    { text: "Pick Up", bg: "pinkOverlay", height: 450 },
    { text: "Catering", bg: "blueOverlay", height: 450 }, // Fixed space
    { text: "Partner/Wholesale", bg: "blueOverlay", height: 350 },
    { text: "Our Story", bg: "pinkOverlay", height: 350 },
    { text: "Merch", bg: "pinkOverlay", height: 350 },
    { text: "Contact Us", bg: "blueOverlay", height: 350 },
  ];

  return (
    <>
      <div className=" w-full mt-20">
        <div className="pl-9 pr-9 w-full ">
          <div className="  flex flex-col">
            <div>
              <h1 className="text-[96px] font-black">Choose Option</h1>
            </div>
            <div>
              <Optionlist arr={options} />
            </div>



          </div>

        </div>


      </div>
    </>
  )

};
export default Section2Home;