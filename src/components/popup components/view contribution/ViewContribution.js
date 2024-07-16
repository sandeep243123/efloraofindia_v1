import styles from '../view contribution/style.module.css'
import img from './user.png'
import img1 from './check.png'
import React, { useEffect, useState ,useContext} from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { propTypeChildren } from '@material-tailwind/react/types/components/timeline';
import like from '../../assets/like.png';
import dislike from '../../assets/dont-like.png';
import { AuthContext } from '../../../services/AuthContext';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function ViewContribution(props) {


    const [PropertyList, setProperty] = useState([]);
    const [nestedList, setNestedList] = useState([]);

    const {logout} = useContext(AuthContext);
    const [cList, setcList] = useState([]);

    const notifyError = (msg) => {
        toast.error(` ${msg}!`, {
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
    const { data } = useQuery(gql`
    query GetContribution($details: GetContributionRequest!) {
        getContribution(details: $details) {
          FeatureName
          FeaturePropertyName
          contributionID
          partName
        }
      }
    `, {
        
        errorPolicy: "all",

        variables: {
            details: {
                "postID": props.postID,
                "showMyContribution": false
            }
        },

        onCompleted: (data) => {
            getList(data["getContribution"]);
        },
        onError: (error) => {
            console.error('Error:', error.message);
                notifyError(error.message)
                if(error.graphQLErrors[0].code===601)
                    {
                        setTimeout(() => {
                            logout();
                        }, 1000)
                    }
        }


    });



    const [getcList] = useLazyQuery(gql`
    query GetContribution($details: GetContributionRequest!) {
        getContribution(details: $details) {
          FeatureName
          FeaturePropertyName
          contributionID
          partName
        }
      }
    `, {
        
    errorPolicy: "all",
        onCompleted: (data) => {
            getList(data["getContribution"]);
        },
        onError: (error) => {
            console.error('Error:', error.message);
                notifyError(error.message)
                if(error.graphQLErrors[0].code===601)
                    {
                        setTimeout(() => {
                            logout();
                        }, 1000)
                    }
        }

    })



    useEffect(() => {
        if (data) {
            getcList({
                variables: {
                    details: {
                        "postID": props.postID,
                        "showMyContribution": false
                    }
                }
            })
        }
    }, [data]);


    function getList(data) {
        const mainDict = {}
        for (let eachInfo of data) {
            if (mainDict[eachInfo.partName] == undefined) {
                mainDict[eachInfo.partName] = {};
            }

            if (mainDict[eachInfo.partName][eachInfo.FeatureName] == undefined) {
                mainDict[eachInfo.partName][eachInfo.FeatureName] = []
            }
            mainDict[eachInfo.partName][eachInfo.FeatureName].push(eachInfo)
        }
        setNestedList(mainDict)
    }

    const [selectedPart, setSelectedPart] = useState(null);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const handlePartClick = (partName) => {
        setSelectedPart(partName);
        setSelectedFeature(null);
    };

    const handleFeatureClick = (featureName) => {
        setSelectedFeature(featureName);

    };

    return (
        <div className={styles.modalWrapper} >
            <div className={styles.modalContainer}>
                <div className={styles.topSection}>
                    <h1 className={styles.title}>View Contribution</h1>
                    <button className={styles.btn} onClick={() => props.closeViewContribution(false)}>X</button>
                </div>
                <hr />
                <div className={styles.bottomSection}>
                    <div className={styles.leftSection}>
                        <h1 className={styles.liTitle}>Plant Category</h1>
                        <div className={`${styles['listContainer']} p-4 max-w-lg mx-auto mt-4 border-y-4`}>
                            {

                                Object.keys(nestedList).length > 0 &&
                                Object.keys(nestedList).map((partName) => (
                                    <details className="mb-2" onClick={() => handlePartClick(partName)} >
                                        <summary className="flex gap-1 bg-gray-200 pt-4 pb-4 pl-2 rounded-lg cursor-pointer shadow-md mb-4 w-60 mt-2">
                                            <span className="-mt-1">{partName}</span>
                                            <div className='-mt-3'>
                                                <h1 className='text-green-500 font-bold'>{Object.keys(nestedList[partName]).length}</h1>
                                            </div>
                                        </summary>
                                        {
                                            selectedPart === partName && (
                                                <ul className="ml-8 space-y-4 max-h-52 overflow-y-scroll">
                                                    {
                                                        Object.keys(nestedList[partName]).map((featureName) => (
                                                            <li key={featureName} onClick={() => setProperty(nestedList[partName][featureName])}>
                                                                <div className="bg-gray-200 p-3  bg-blue-50 font-bold rounded-md flex gap-20 cursor-pointer">
                                                                    <p className="text-gray-800">{featureName}</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                </ul>
                                            )}
                                    </details>
                                ))
                            }

                        </div>
                    </div>
                    <div className={styles.rightSection}>
                        <h1 className={styles.rightTitle}>Contribution</h1>
                        <div className={styles.rightListContainer}>
                            {
                                PropertyList.map((property) => (
                                    <div className={styles.rightList}>
                                        <div className={styles.rightListT1}>
                                            <img src={img} alt="" />
                                            <h1>{property.FeaturePropertyName}</h1>
                                        </div>
                                        <div className={styles.rightListT2}>
                                            {/* <img src={img1} alt="" /> */}
                                            {/* like and dislike button */}

                                            <div className={styles.vote}>
                                                <div className={styles.upvote}>
                                                <img src={like} alt="like" name="vote" onClick={() => {}} />
                                                <p>12</p>
                                                 </div>
                                                <div className={styles.downvote}>
                                                <img src={dislike} alt="dislike" name="vote" onClick={() => {}} />
                                                <p>12</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
            
            <ToastContainer containerId="Error" />
        </div>
    );

}