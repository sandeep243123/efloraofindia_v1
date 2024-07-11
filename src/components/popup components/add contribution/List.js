import React from 'react'
import chImg from './check.png'
function List(props) {

    const contributionList = props.contributionList;
    console.log("HI", contributionList)
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

                    {
                        contributionList?.map((eachContribution) => (
                            <tr>
                                <td className="py-4 px-6 border-b border-gray-200">{eachContribution.partName}</td>
                                <td className="py-4 px-6 border-b border-gray-200 truncate">{eachContribution.FeatureName}</td>
                                <td className="py-4 px-6 border-b border-gray-200">
                                    <div className='flex gap-4'>
                                        <h1>{eachContribution.FeaturePropertyName}</h1>
                                        <img src={chImg} alt="" style={{ height: '1.5vh', width: '1.5vw' }} className='mt-1' />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    );
}

export default List;