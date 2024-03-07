import styles from '../view contribution/style.module.css'
import img from './user.png'
import img1 from './check.png'
import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

export default function ViewContribution(props) {
    const [plantPartInfo, setplantPart] = useState([])
    const [show, setShow] = useState(false);
    const [partFeaturesInfo, SetpartFeature] = useState(null);
    const [PropertyList, setProperty] = useState(null);
    const { data } = useQuery(gql`
    {
        getPlantParts {
                partID
                name
            }
        }
    `, {
        onCompleted: (data) => {
            setplantPart(data.getPlantParts);
        }
    });
    const [cList, setcList] = useState([]);
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
            setcList(data["getContribution"])

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


    const [getPlantPartsList] = useLazyQuery(gql`
    query Query {
        getPlantParts {
            partID
            name
        }
      }
    `, {
        onCompleted: (data) => {
            setplantPart(data.getPlantParts);
        }
    }
    );


    const [getPlantPlantFeature] = useLazyQuery(gql`
    query GetPartsFeature($partId: ID!) {
        getPartsFeature(partID: $partId) {
          featureID
          name
        }
      }
    `, {
        onCompleted: (data) => {
            SetpartFeature(data["getPartsFeature"]);
        }
    })



    const getPartFeature = (partdetails) => {
        setShow(true);
        console.log(partdetails)
        getPlantPlantFeature({ variables: { partId: partdetails } })
    }


    const getProperty = (featureName) => {
        console.log(featureName)
        const filteredFeatures = cList.filter(feature => feature.FeatureName === featureName);
        const propertyNames = filteredFeatures.map(feature => feature.FeaturePropertyName);
        console.log(propertyNames)
        setProperty(propertyNames)
    }

    const [expandedPart, setExpandedPart] = useState(null);

    const togglePartExpansion = async (partID) => {
        if (expandedPart === partID) {
            setExpandedPart(null);
        } else {

            getPartFeature(partID);

            setExpandedPart(partID);
        }
    };


    return (
        // onClick={() => props.closeViewContribution(false)}
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
                                plantPartInfo.length > 0 &&
                                plantPartInfo?.map((eachPart) => (
                                    <details className="mb-2" onClick={async () => togglePartExpansion(eachPart.partID)}
                                        aria-expanded={expandedPart === eachPart.partID} >
                                        <summary className={styles.leftList}>
                                            <span className={styles.leftListTitle}>{eachPart?.name}</span>
                                            {/* <div className=''> */}
                                            <h1 className={styles.listCount}>12</h1>
                                            {/* </div> */}
                                        </summary>
                                        <ul className="ml-8 space-y-4 max-h-52 overflow-y-scroll">
                                            {
                                                partFeaturesInfo?.map((FeatureInfo) => (
                                                    <li key={FeatureInfo?.featureID} onClick={async () => {
                                                        await getProperty(FeatureInfo?.name)
                                                    }}>
                                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                                            <p className="text-gray-800">{FeatureInfo?.name}</p>
                                                            {/* <h1 className='text-green-500'>11</h1> */}
                                                        </div>
                                                    </li>
                                                ))}
                                        </ul>

                                    </details>
                                ))
                            }

                        </div>
                    </div>
                    <div className={styles.rightSection}>
                        <h1 className={styles.rightTitle}>Contribution</h1>
                        <div className={styles.rightListContainer}>
                            {
                                PropertyList?.map((eachproperty) => (
                                    <div className={styles.rightList}>
                                        <div className={styles.rightListT1}>
                                            <img src={img} alt="" />
                                            <h1>{eachproperty}</h1>
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
    )
}