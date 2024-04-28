import styles from '../view contribution/style.module.css'
import img from './user.png'
import img1 from './check.png'
import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { propTypeChildren } from '@material-tailwind/react/types/components/timeline';

export default function ViewContribution(props) {


    const [PropertyList, setProperty] = useState([]);
    const [nestedList, setNestedList] = useState([]);

    const [cList, setcList] = useState([]);
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
        variables: {
            details: {
                "postID": props.postID,
                "showMyContribution": false
            }
        },
        onCompleted: (data) => {
            //setcList(data["getContribution"])
            getList(data["getContribution"]);
        },
        onError: (error) => {
            console.error('Error signing up:', error.message);

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
        onCompleted: (data) => {
            //setcList(data["getContribution"])
            getList(data["getContribution"]);
        },
        onError: (error) => {
            console.error('Error signing up:', error.message);

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
                                                <h1 className='text-green-500 font-bold'>12</h1>
                                            </div>
                                        </summary>
                                        {
                                            selectedPart === partName && (
                                                <ul className="ml-8 space-y-4 max-h-52 overflow-y-scroll">
                                                    {
                                                        Object.keys(nestedList[partName]).map((featureName) => (
                                                            <li key={featureName} onClick={() => setProperty(nestedList[partName][featureName])}>
                                                                <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20 cursor-pointer">
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
                                            <img src={img1} alt="" />
                                            <p>12</p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}