
export default function Button({text, onClick}) {
  return (
     <button
              onClick={onClick}
              className="bg-blue-500 text-white p-2 rounded-xl hover:bg-white hover:text-blue-500 transition duration-300"
            >
              {text}
            </button>
  )
}

