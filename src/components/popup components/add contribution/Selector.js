import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import List from "./List";
import addImg from "./add.png";

import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

function Selector(props) {
    console.log(props.postID)

    const [inputValue, setInputValue] = useState("");
    const [inputPart, setInputPart] = useState("");
    const [inputFeature, setInputFeature] = useState("");
    const [part, setpart] = useState(null)
    const [selected, setSelected] = useState("Select Item")
    const [selected1, setSelected1] = useState("Select Item")
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [show, setShow] = useState(false);


    const [partFeatures, setpartFeatures] = useState([]);
    const [featureID, setfeatureID] = useState("");
    const [partID, setPartID] = useState("");
    const [inputProperty, setInputProperty] = useState("");

    const [searchArray, setsearchArray] = useState([]);

    const [showList, setShowList] = useState(false);

    const { data } = useQuery(gql`
        {
            getPlantParts {
                partID
                name
            }
        }
    `);

    const [getPlantPartsList] = useLazyQuery(gql`
    query Query {
        getPlantParts {
            partID
            name
        }
      }
    `, {
        onCompleted: (data) => {
            setpart(data.getPlantParts);
        }
    }
    );

    const [getPlantPartInfo] = useLazyQuery(gql`
        query GetPlantPartInfo($partID: ID!) {
            getPartsFeature(partID: $partID){
                name
                featureID
            }
        }
    `, {
        onCompleted: (plantPartInfo) => {
            setpartFeatures(plantPartInfo.getPartsFeature)
        }
    }
    );

    const [getAutoSuggestion] = useLazyQuery(gql`
    query GetFeatureProperty($details: GetFeaturePropertyRequest) {
        getFeatureProperty(details: $details) {
          featurePropertyID
          value
        }
      }
    `, {
        onCompleted: (data) => {
            setsearchArray(data["getFeatureProperty"])
        }
    })

    const [cList, setcList] = useState([]);

    const [getcList] = useLazyQuery(gql`
    query GetContribution($details: GetContributionRequest!) {
        getContribution(details: $details) {
          contributionID
          partName
          FeatureName
          FeaturePropertyName
        }
      }
    `, {
        onCompleted: (data) => {
            setcList(data["getContribution"])
        }

    })
    useEffect(() => {
        if (data) {
            setpart(data.getPlantParts);
            getcList({
                variables: {
                    details: {
                        "postID": props.postID,
                        "showMyContribution": true
                    }
                }
            })
        }
    }, [data]);


    const handleItemClick = (country) => {
        if (country.name.toLowerCase() !== selected.toLowerCase()) {
            setSelected(country.name);

            setOpen1(false);
            setPartID(country.partID)
            // setPartID(country.partID);
            // Trigger the GraphQL query for additional information
            getPlantPartInfo({ variables: { partID: country.partID } });
        }
    };

    const [inputString, setinputString] = useState("")
    const updateSearch = (searchText) => {
        getAutoSuggestion({
            variables: {
                details: {
                    featureID,
                    searchText
                }
            }
        })
    }


    const [propertyID, setpropertyID] = useState("");



    const contributionMutation = gql`
    mutation AddContribution($details: AddContributionRequest!) {
        addContribution(details: $details)
      }
    `
    const [addContribution] =
        useMutation(contributionMutation, {
            onCompleted: (data) => {

                getcList({
                    variables: {
                        details: {
                            "postID": props.postID,//"65c4d17fece4f07550c6b3c0",
                            "showMyContribution": true
                        }
                    }
                })
            },
            onError: (error) => {
                console.error('Error signing up:', error.message);

            }
        })


    const addPlantPartMutation = gql`
    mutation AddPlantPart($partName: nonEmptyString!) {
        addPlantPart(partName: $partName)
      }`

    const [addPlantPart] =
        useMutation(addPlantPartMutation, {
            onCompleted: (data) => {
                getPlantPartsList();
            },
            onError: (error) => {
                console.error('Error signing up:', error.message);

            }
        })


    const addPartFeatureMutation = gql`
    mutation AddPartFeature($details: AddPartFeatureRequest!) {
        addPartFeature(details: $details)
      }
    `
    const [addPartFeature] =
        useMutation(addPartFeatureMutation, {
            onCompleted: (data) => {
                getPlantPartInfo({ variables: { partID: partID } });
            },
            onError: (error) => {
                console.error('Error signing up:', error.message);

            }
        })

    const addFeaturePropertyMutation = gql`
    mutation AddFeatureProperty($details: AddFeaturePropertyRequest) {
        addFeatureProperty(details: $details)
      }
    `
    const [addFeatureProperty] =
        useMutation(addFeaturePropertyMutation, {
            onCompleted: (data) => {
                console.log(data)
                setpropertyID(data["addFeatureProperty"])
                
            },
            onError: (error) => {
                console.error('Error signing up:', error.message);

            }
        })


    return (
        <div className='flex flex-col gap-6'>
            <div className='flex gap-2'>
                <div className='w-72 font-medium h-80 z-10'>
                    <div onClick={() => setOpen1(!open1)}
                        className='bg-white text-black w-full  p-2 flex  item-center justify-between rounded'>
                        {selected ? selected.length > 25 ? selected?.substring(0, 25) + "..." : selected : "Select Country"}
                        <BiChevronDown size={20} className={`${open1 && "rotate-180"}`}></BiChevronDown>
                    </div>
                    <ul className={`bg-white text-black  mt-2 overflow-y-auto   ${open1 ? 'max-h-80' : 'max-h-0'}`}>
                        <div className='flex items-center px-2 sticky top-0 bg-white'>
                            <AiOutlineSearch size={18} className=' text-gray-700' />
                            <div className='flex '>
                                <input type="text" placeholder='Enter the text to search' className='placeholder:text-gray-700 p-2 w-full outline-none'
                                    value={inputPart}
                                    onChange={(e) => {
                                        setInputPart(e.target.value.toLowerCase());
                                    }}


                                />
                                <div onClick={
                                    () => {
                                        addPlantPart({ variables: { partName: inputPart } })
                                        setInputPart('');
                                    }
                                }>
                                    <img src={addImg} style={{ height: '3vh', width: '2vw' }} className='mt-2 mx-2' />
                                </div>
                            </div>
                        </div>

                        {part?.map((country) => (
                            <li
                                key={country?.name}
                                className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${country?.name?.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}
                            `}
                                onClick={() => {
                                    handleItemClick(country)
                                }}
                            >
                                {country?.name}
                            </li>
                        ))}
                    </ul>
                    <div>
                        {show}
                    </div>
                </div>
                {/* second list */}
                <div className='w-72 font-medium h-80 z-10'>
                    <div onClick={() => setOpen2(!open2)}
                        className='bg-white text-black w-full  p-2 flex  item-center justify-between rounded'>
                        {selected1 ? selected1.length > 25 ? selected1?.substring(0, 25) + "..." : selected1 : "Select Country"}
                        <BiChevronDown size={20} className={`${open2 && "rotate-180"}`}></BiChevronDown>
                    </div>
                    <ul className={`bg-white text-black  mt-2 overflow-y-auto   ${open2 ? 'max-h-80' : 'max-h-0'}`}>
                        <div className='flex items-center px-2 sticky top-0 bg-white'>
                            <AiOutlineSearch size={18} className=' text-gray-700' />
                            <div className='flex '>
                                <input type="text" placeholder='Enter the text to search' className='placeholder:text-gray-700 p-2 w-full outline-none'
                                    value={inputFeature}
                                    onChange={(e) => {
                                        setInputFeature(e.target.value.toLowerCase());
                                        getPlantPartInfo({ variables: { partID } })
                                    }}
                                />
                                <div onClick={
                                    () => {
                                        addPartFeature({ variables: { details: { "partID": partID, featureName: inputFeature } } })
                                        setInputFeature('');
                                    }
                                }>
                                    <img src={addImg} style={{ height: '3vh', width: '2vw' }} className='mt-2 mx-2' />
                                </div>
                            </div>
                        </div>
                        {partFeatures?.map((eachPart) => (
                            <li
                                key={eachPart?.name}
                                className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${eachPart?.name?.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}
                            `}
                                onClick={() => {
                                    if (eachPart?.name?.toLowerCase() !== selected.toLocaleLowerCase()) {
                                        setSelected1(eachPart?.name);
                                        setfeatureID(eachPart.featureID)
                                        console.log(eachPart.featureID)
                                        setOpen2(false);
                                    }
                                }}
                            >
                                {eachPart?.name}
                            </li>
                        ))}
                    </ul>
                    <div>
                        {show}
                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="flex flex-col">
                        <div className='flex'>
                            <input
                                type="text"
                                placeholder="Value"
                                className="h-10 w-32 px-2 rounded-tl-lg rounded-bl-lg outline-none text-black"
                                value={inputString}

                                onChange={(e) => {
                                    updateSearch(e.target.value);
                                    setShowList(e.target.value.length != 0);
                                    setinputString(e.target.value)

                                }}
                            />
                            <div className='bg-white rounded-tr-lg rounded-br-lg'
                                onClick={
                                    () => {
                                        addFeatureProperty({
                                            variables: {
                                                
                                                details: {
                                                    featureID: featureID,
                                                    value: inputString
                                                }
                                            }
                                        })
                                        setInputPart('');
                                    }
                                }>
                                <img src={addImg} style={{ height: '3vh', width: '2vw' }} className='mt-2 mx-2' />
                            </div>

                        </div>


                        <div className={`z-10 bg-gray-200 max-w-32 overflow-x-hidden rounded-md max-h-52 overflow-auto ${showList ? '' : 'hidden'}`}>
                            <ul>
                                {
                                    searchArray?.map((eachProperty) => (
                                        <li key={eachProperty.featurePropertyID} onClick={() => {
                                            setpropertyID(eachProperty.featurePropertyID)
                                            setShowList(false)
                                            setinputString(eachProperty.value)

                                        }}>
                                            {eachProperty.value}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <button className="bg-green-600 text-zinc-100 h-10 w-32 px-2 rounded-md font-bold" onClick={
                        () => {
                            addContribution({ variables: { details: { "postID": props.postID, "featurePropertyID": propertyID } } })
                        }
                    }>
                        Add
                    </button>
                </div>
            </div>
            <div className='-mt-72 py-5 flex flex-col justify-end gap-6 w-full'>
                
                <List contributionList={cList} />
            </div>
        </div>
    );
}

export default Selector;