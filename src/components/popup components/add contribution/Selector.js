import React, { useEffect, useState,useContext } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import List from "./List";
import addImg from "./add.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

import { AuthContext } from '../../../services/AuthContext.js';
function Selector(props) {

    const { logout} = useContext(AuthContext);
    const [inputValue, setInputValue] = useState("");
    const [inputPart, setInputPart] = useState("");
    const [inputFeature, setInputFeature] = useState("");
    const [partStatus, setPartStatus] = useState(true);
    const [valueStatus, setValueStatus] = useState(true);
    const [featureStatus, setFeatureStatus] = useState(true);
    const [part, setpart] = useState(null)
    const [selected, setSelected] = useState("Select Item")
    const [selected1, setSelected1] = useState("Select Item")
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [show, setShow] = useState(false);
    const [partFeatures, setpartFeatures] = useState([]);
    const [featureID, setfeatureID] = useState("");
    const [partID, setPartID] = useState("");

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
        
        errorPolicy: "all",

        onCompleted: (data) => {
            setpart(data.getPlantParts);
        },
        onError: (errors) => {
                console.error('Error:', errors.message);
                if(errors.graphQLErrors[0].code===601)
                    {
                        notifyError(errors.message)
                        setTimeout(() => {
                            logout();
                        }, 1000)
                    }
                else
                {
                    notifyWarning("please enter all the details")
                }
        }
    }
    );

    const [getPlantPartInfo] = useLazyQuery(gql`
    query GetPartsFeature($partId: MongoID!) {
        getPartsFeature(partID: $partId) {
          partID
          featureID
          name
          isPending
        }
      }
    `, {
        
    errorPolicy: "all",

        onCompleted: (plantPartInfo) => {
            setpartFeatures(plantPartInfo.getPartsFeature)
        },
        onError: (errors) => {
            console.error('Error:', errors.message);
            if(errors.graphQLErrors[0].code===601)
                {
                    notifyError(errors.message)
                    setTimeout(() => {
                        logout();
                    }, 1000)
                }
                else
                {
                    notifyWarning("please enter all the details")
                }
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
        
    errorPolicy: "all",

        onCompleted: (data) => {
            setsearchArray(data["getFeatureProperty"])
        },
        onError: (errors) => {
            console.error('Error:', errors.message);
            if(errors.graphQLErrors[0].code===601)
                {
                    notifyError(errors.message)
                    setTimeout(() => {
                        logout();
                    }, 1000)
                }
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
        
    errorPolicy: "all",

        onCompleted: (data) => {
            setcList(data["getContribution"].reverse())
        },
        onError: (errors) => {
            
            console.error('Error:', errors.message);
            if(errors.graphQLErrors[0].code===601)
                {
                    notifyError(errors.message)
                    setTimeout(() => {
                        logout();
                    }, 1000)
                }
            else
            {
                notifyWarning("please enter all the details")
            }
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


    const handleItemClick = (partdetail) => {
        if (partdetail.name.toLowerCase() !== selected.toLowerCase()) {
            setSelected(partdetail.name);

            setOpen1(false);
            setPartID(partdetail.partID)
            getPlantPartInfo({ variables: { partId: partdetail.partID } });
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
            
            errorPolicy: "all",
            onCompleted: (data) => {

                getcList({
                    variables: {
                        details: {
                            "postID": props.postID,
                            "showMyContribution": true
                        }
                    }
                })
            },
            onError: (errors) => {
                console.error('Error:', errors.message);
                if(errors.graphQLErrors[0].code===601)
                    {
                        notifyError(errors.message)
                        setTimeout(() => {
                            logout();
                        }, 1000)
                    }
                else
                {
                    notifyWarning("please enter all the details")
                }
            }
        })


    const addPlantPartMutation = gql`
    mutation AddPlantPart($partName: nonEmptyString!) {
        addPlantPart(partName: $partName)
      }`

    const [addPlantPart] =
        useMutation(addPlantPartMutation, {
            
            errorPolicy: "all",
            onCompleted: (data) => {
                setOpen1(false);
                setPartID(data.addPlantPart)
                getPlantPartInfo({ variables: { partId: data.addPlantPart } });
                getPlantPartsList();

            },
            onError: (errors) => {
                console.error('Error:', errors.message);
                if(errors.graphQLErrors[0].code===601)
                    {
                        notifyError(errors.message)
                        setTimeout(() => {
                            logout();
                        }, 1000)
                    }
                else
                {
                    notifyWarning("please enter all the details")
                }
            }
        })


    const addPartFeatureMutation = gql`
    mutation AddPartFeature($details: AddPartFeatureRequest!) {
        addPartFeature(details: $details)
      }
    `
    const [addPartFeature] =
        useMutation(addPartFeatureMutation, {
            
            errorPolicy: "all",
            onCompleted: (data) => {
                getPlantPartInfo({ variables: { partId: partID } });

                setfeatureID(data.addPartFeature)
            },
            onError: (errors) => {
                console.error('Error:', errors.message);
                if(errors.graphQLErrors[0].code===601)
                    {
                        notifyError(errors.message)
                        setTimeout(() => {
                            logout();
                        }, 1000)
                    }
                else
                {
                    notifyWarning("please enter all the details")
                }
            }
        })

    const addFeaturePropertyMutation = gql`
    mutation AddFeatureProperty($details: AddFeaturePropertyRequest) {
        addFeatureProperty(details: $details)
      }
    `
    const [addFeatureProperty] =
        useMutation(addFeaturePropertyMutation, {
            
            errorPolicy: "all",
            onCompleted: (data) => {
                setpropertyID(data["addFeatureProperty"])

            },
            onError: (errors) => {
                console.error('Error:', errors.message);
                if(errors.graphQLErrors[0].code===601)
                    {
                        notifyError(errors.message)
                        setTimeout(() => {
                            logout();
                        }, 1000)
                    }
                else
                {
                    notifyWarning("please enter all the details")
                }
            }
        })





    const notifyError = (msg) => {
        toast.error(`${msg}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            containerId: 'Error'
        });
    }
    const notifyWarning = (msg) => {
        toast.warning(` ${msg}!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            containerId: 'Warning'
        });
    }



    return (
        <div>
        <div className='flex flex-col gap-6'>
            <div className='flex gap-2'>
                <div className='w-72 font-medium h-80 z-10'>
                    <div onClick={() => setOpen1(!open1)}
                        className='bg-white text-black w-full  p-2 flex  item-center justify-between rounded'>
                        {selected ? selected.length > 25 ? selected?.substring(0, 25) + "..." : selected : "Select partdetail"}
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
                                    async () => {
                                        await addPlantPart({ variables: { partName: inputPart } })
                                        setInputPart('');
                                        setSelected(inputPart);
                                        setSelected1('');

                                    }
                                }>
                                    {partStatus && <abbr title="Create new part" style={{ cursor: "pointer" }}><img src={addImg} style={{ height: '3vh', width: '2vw' }} className='mt-2 mx-2' /></abbr>}
                                </div>
                            </div>
                        </div>

                        {part?.map((partdetail, index) => (
                            <li
                                key={part[part.length - index - 1]?.name}
                                className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${part[part.length - index - 1]?.name?.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}
                            `}
                                onClick={() => {
                                    handleItemClick(part[part.length - index - 1])
                                    setSelected1('');
                                    // setPartStatus(false);
                                }}
                            >
                                {part[part.length - index - 1]?.name}
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
                        {selected1 ? selected1.length > 25 ? selected1?.substring(0, 25) + "..." : selected1 : "Select partdetail"}
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
                                    }}
                                />
                                <div onClick={
                                    () => {
                                        // setFeatureStatus(false);
                                        addPartFeature({ variables: { details: { "partID": partID, featureName: inputFeature } } })
                                        setInputFeature('');
                                        setSelected1(inputFeature);
                                        setOpen2(false);
                                    }
                                }>
                                    {featureStatus && <abbr title="Create new Property" style={{ cursor: "pointer" }}><img src={addImg} style={{ height: '3vh', width: '2vw' }} className='mt-2 mx-2' /></abbr>}
                                </div>
                            </div>
                        </div>
                        {partFeatures?.map((eachPart, index) => (
                            <li
                                key={partFeatures[partFeatures.length - index - 1]?.name}
                                className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${partFeatures[partFeatures.length - index - 1]?.name?.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}
                            `}
                                onClick={() => {
                                    if (partFeatures[partFeatures.length - index - 1]?.name?.toLowerCase() !== selected.toLocaleLowerCase()) {
                                        setSelected1(partFeatures[partFeatures.length - index - 1]?.name);
                                        setfeatureID(partFeatures[partFeatures.length - index - 1].featureID)
                                        setOpen2(false);
                                    }
                                }}
                            >
                                {partFeatures[partFeatures.length - index - 1]?.name}
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
                                        // setValueStatus(false);
                                    }
                                }>
                                {valueStatus && <abbr title="Create Value" style={{ cursor: "pointer" }}><img src={addImg} style={{ height: '3vh', width: '2vw' }} className='mt-2 mx-2' /></abbr>}
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

        <ToastContainer containerId="Error" />
        <ToastContainer containerId="Warning" />
        </div>
    );
}

export default Selector;