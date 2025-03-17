import Image from 'next/image';
import cake from '../public/cake.png';
import Button from './Button';

const MenuItem = ({ id, heading, text, bg }) => {
  const bgClass = bg === "blueOverlay" ? "bg-blueOverlay" : 'transparent';
  const order = () => {
  };

  const isOdd = id % 2 === 1;

  return (
    <div
      style={{
        border: '0.89px solid #000000',
        borderRadius: '30px',
      }}
      className={`w-full h-[380px] flex justify-center items-center px-10 py-5 ${bgClass}`}
    >
      {isOdd ? (
        <>
          {/* Image on Left */}
          <div className="w-[50%] h-full px-5 flex justify-center items-center">
            <Image width={560} height={340} src={cake} alt="Cake" />
          </div>
          <div className="w-[50%] h-full px-5 flex flex-col justify-center">
            <h1 className="text-[85px] font-bold">{heading}</h1>
            <p className="mt-5">{text}</p>
            <div className="flex gap-5 mt-7">
              <Button
                onClick={order}
                txt="Read More"
                br="6.6px"
                bg="transparent"
                color="rgba(0, 0, 0, 1)"
                bc="black"
                w="156"
                h="50"
              />
              <Button
                onClick={order}
                txt="Order Now"
                br="6.6px"
                bg="rgba(0, 0, 0, 1)"
                color="rgba(255, 255, 255, 1)"
                bc="none"
                w="156"
                h="50"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Text on Left */}
          <div className="w-[50%] h-full px-5 flex flex-col justify-center">
            <h1 className="text-[85px] font-bold">{heading}</h1>
            <p className="mt-5">{text}</p>
            <div className="flex gap-5 mt-7">
              <Button
                onClick={order}
                txt="Read More"
                br="6.6px"
                bg="transparent"
                color="rgba(0, 0, 0, 1)"
                bc="black"
                w="156"
                h="50"
              />
              <Button
                onClick={order}
                txt="Order Now"
                br="6.6px"
                bg="rgba(0, 0, 0, 1)"
                color="rgba(255, 255, 255, 1)"
                bc="none"
                w="156"
                h="50"
              />
            </div>
          </div>
          <div className="w-[50%] h-full px-5 flex justify-center items-center">
            <Image width={560} height={340} src={cake} alt="Cake" />
          </div>
        </>
      )}
    </div>
  );
};

export default MenuItem;
