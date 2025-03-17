import React from 'react'
import MenuItem from './MenuItem'

const Menulist = ({ arr }) => {
  return (
    <>
      <ul className="flex flex-col w-full ">
        {arr.map((menu, index) => (
          <li key={index} className="w-[full] mt-10  ">
            <MenuItem id={menu.id} heading={menu.heading} text={menu.text} bg={menu.bg} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Menulist