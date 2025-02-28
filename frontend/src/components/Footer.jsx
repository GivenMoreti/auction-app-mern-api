

export default function Footer() {
  const year = new Date().getFullYear();
  return (
      <div className="bg-gray-100 flex justify-center">
        <h1 className="text-center mt-10 text-gray-400">Copyright Reserved to C-unit <br></br>{year}</h1>
      </div>
  )
}
