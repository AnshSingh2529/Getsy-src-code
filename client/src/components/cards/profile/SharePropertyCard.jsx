import React from 'react'
import { Upload } from 'lucide-react'

const SharePropertyCard = () => {
  return (
    <div className="relative w-full max-w-md mx-auto md:mt-5 mt-2 p-4 border-2 border-green-400 rounded-lg shadow-lg bg-white">
    <h2 className="text-xl font-semibold text-gray-800 text-center mb-3">Share Your Property with Us!</h2>
    <p className="text-gray-600 text-center mb-3">
        If you want to post your property for sale or rent, let us help you reach potential clients. Click below to add your property details easily!
    </p>
    <button className="flex justify-center w-full py-3 mt-2 bg-green-300 border border-green-400 text-zinc-800 font-bold rounded-lg hover:bg-green-400 transition duration-300">
        Add Your Property <Upload className='ml-3' />
    </button>
</div>
  )
}

export default SharePropertyCard
