import React from 'react'
import MenuItem from './MenuItem';
import Menulist from './Menulist';
import cake from '../public/cake.png'

const Section3Home = () => {
  const list = [{
    id: 1,
    heading: 'peanut butter .',
    img: cake,
    text: "The classic—you can't go wrong. Thick, soft, and packed with milk chocolate chips.",
    bg: 'blueOverlay'

  },
  {
    id: 2,
    heading: 'peanut butter .',
    img: cake,
    text: "The classic—you can't go wrong. Thick, soft, and packed with milk chocolate chips."

  },
  {
    id: 3,
    heading: 'peanut butter .',
    img: cake,
    text: "The classic—you can't go wrong. Thick, soft, and packed with milk chocolate chips."

  },
  {
    id: 4,
    heading: 'peanut butter .',
    img: cake,
    text: "The classic—you can't go wrong. Thick, soft, and packed with milk chocolate chips."

  },


  ]
  return (
    <>
      <div className='w-full mt-20 '>
        <div className='px-9 w-full '>
          <div className='  flex flex-col'>
            <div>
              <h1 className="text-[96px] font-black">Seasonal Menu</h1>
            </div>
            <div>
              <Menulist arr={list} />

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default Section3Home;