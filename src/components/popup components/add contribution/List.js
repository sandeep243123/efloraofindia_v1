import React from 'react'
import chImg from './check.png'
import penImg from './expired.png'
function List() {
    return (
        <div className='max-h-96 overflow-y-scroll rounded-md'>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100 sticky top-0">
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Plant Property</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Plant Feature</th>
                        <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">Value</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr>
                        <td className="py-4 px-6 border-b border-gray-200">John Doe</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">johndoe@gmail.com</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <div className='flex gap-4'>
                                <h1>555-555-5555</h1>
                                <img src={chImg} alt="" style={{ height: '1.5vh', width: '1.5vw' }} className='mt-1' />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-4 px-6 border-b border-gray-200">John Doe</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">johndoe@gmail.com</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <div className='flex gap-4'>
                                <h1>555-555-5555</h1>
                                <img src={penImg} alt="" style={{ height: '2vh', width: '2vw' }} className='mt-1' />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-4 px-6 border-b border-gray-200">John Doe</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">johndoe@gmail.com</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <div className='flex gap-4'>
                                <h1>555-555-5555</h1>
                                <img src={penImg} alt="" style={{ height: '2vh', width: '2vw' }} className='mt-1' />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-4 px-6 border-b border-gray-200">John Doe</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">johndoe@gmail.com</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <div className='flex gap-4'>
                                <h1>555-555-5555</h1>
                                <img src={chImg} alt="" style={{ height: '1.5vh', width: '1.5vw' }} className='mt-1' />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-4 px-6 border-b border-gray-200">John Doe</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">johndoe@gmail.com</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <div className='flex gap-4'>
                                <h1>555-555-5555</h1>
                                <img src={chImg} alt="" style={{ height: '1.5vh', width: '1.5vw' }} className='mt-1' />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-4 px-6 border-b border-gray-200">John Doe</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">johndoe@gmail.com</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <div className='flex gap-4'>
                                <h1>555-555-5555</h1>
                                <img src={chImg} alt="" style={{ height: '1.5vh', width: '1.5vw' }} className='mt-1' />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-4 px-6 border-b border-gray-200">John Doe</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">johndoe@gmail.com</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <div className='flex gap-4'>
                                <h1>555-555-5555</h1>
                                <img src={chImg} alt="" style={{ height: '1.5vh', width: '1.5vw' }} className='mt-1' />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-4 px-6 border-b border-gray-200">John Doe</td>
                        <td className="py-4 px-6 border-b border-gray-200 truncate">johndoe@gmail.com</td>
                        <td className="py-4 px-6 border-b border-gray-200">
                            <div className='flex gap-4'>
                                <h1>555-555-5555</h1>
                                <img src={chImg} alt="" style={{ height: '1.5vh', width: '1.5vw' }} className='mt-1' />
                            </div>
                        </td>
                    </tr>


                </tbody>
            </table>
        </div>
    )
}

export default List;