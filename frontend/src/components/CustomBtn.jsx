/* eslint-disable react/prop-types */


export default function CustomBtn({onClick,title}) {
  return (
      <button onClick={onClick} className=" p-2 m-2 shadow-md font-extrabold border-2 rounded border-red-600">
          {title}
    </button>
  )
}
