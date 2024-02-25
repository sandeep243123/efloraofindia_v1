import React from 'react'
import styles from '../view contribution/style.module.css'
import img from './user.png'
import img1 from './check.png'
import { useEffect } from 'react'

export default function ViewContribution(props) {
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
                            <details className="mb-2">
                                <summary className="flex gap-1 bg-gray-200 pt-4 pb-4 pl-2 rounded-lg cursor-pointer shadow-md mb-4 w-60 mt-2">
                                    <span className="font-semibold -mt-1">Leaf</span>
                                    <div className='-mt-3'>
                                        <h1 className='text-green-500 font-bold'>12</h1>
                                    </div>
                                </summary>
                                <ul className="ml-8 space-y-4 max-h-52 overflow-y-scroll">
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>



                                </ul>
                            </details>
                            <details className="mb-2">
                                <summary className="flex gap-1 bg-gray-200 pt-4 pb-4 pl-2 rounded-lg cursor-pointer shadow-md mb-4 w-60 mt-2">
                                    <span className="font-semibold -mt-1">Root</span>
                                    <div className='-mt-3'>
                                        <h1 className='text-green-500 font-bold'>12</h1>
                                    </div>
                                </summary>
                                <ul className="ml-8 space-y-4 max-h-52 overflow-y-scroll">
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                </ul>
                            </details>
                            <details className="mb-2">
                                <summary className="flex gap-1 bg-gray-200 pt-4 pb-4 pl-2 rounded-lg cursor-pointer shadow-md mb-4 w-60 mt-2">
                                    <span className="font-semibold -mt-1">Stem</span>
                                    <div className='-mt-3'>
                                        <h1 className='text-green-500 font-bold'>12</h1>
                                    </div>
                                </summary>
                                <ul className="ml-8 space-y-4 max-h-52 overflow-y-scroll">
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                </ul>
                            </details>
                            <details className="mb-2">
                                <summary className="flex gap-1 bg-gray-200 pt-4 pb-4 pl-2 rounded-lg cursor-pointer shadow-md mb-4 w-60 mt-2">
                                    <span className="font-semibold -mt-1">Flower</span>
                                    <div className='-mt-3'>
                                        <h1 className='text-green-500 font-bold'>12</h1>
                                    </div>
                                </summary>
                                <ul className="ml-8 space-y-4 max-h-52 overflow-y-scroll">
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="bg-white p-3  bg-blue-50 font-bold rounded-md flex gap-20">
                                            <p className="text-gray-800">Option 1</p>
                                            <h1 className='text-green-500'>11</h1>
                                        </div>
                                    </li>
                                </ul>
                            </details>


                        </div>
                    </div>
                    <div className={styles.rightSection}>
                        <h1 className={styles.rightTitle}>Contribution</h1>
                        <div className={styles.rightListContainer}>
                            <div className={styles.rightList}>
                                <div className={styles.rightListT1}>
                                    <img src={img} alt="" />
                                    <h1>Brown</h1>
                                </div>
                                <div className={styles.rightListT2}>
                                    <img src={img1} alt="" />
                                    <p>12</p>
                                </div>
                            </div>
                            <div className={styles.rightList}>
                                <div className={styles.rightListT1}>
                                    <img src={img} alt="" />
                                    <h1>Brown</h1>
                                </div>
                                <div className={styles.rightListT2}>
                                    <img src={img1} alt="" />
                                    <p>12</p>
                                </div>
                            </div>
                            <div className={styles.rightList}>
                                <div className={styles.rightListT1}>
                                    <img src={img} alt="" />
                                    <h1>Brown</h1>
                                </div>
                                <div className={styles.rightListT2}>
                                    <img src={img1} alt="" />
                                    <p>12</p>
                                </div>
                            </div>
                            <div className={styles.rightList}>
                                <div className={styles.rightListT1}>
                                    <img src={img} alt="" />
                                    <h1>Brown</h1>
                                </div>
                                <div className={styles.rightListT2}>
                                    <img src={img1} alt="" />
                                    <p>12</p>
                                </div>
                            </div>
                            <div className={styles.rightList}>
                                <div className={styles.rightListT1}>
                                    <img src={img} alt="" />
                                    <h1>Brown</h1>
                                </div>
                                <div className={styles.rightListT2}>
                                    <img src={img1} alt="" />
                                    <p>12</p>
                                </div>
                            </div>
                            <div className={styles.rightList}>
                                <div className={styles.rightListT1}>
                                    <img src={img} alt="" />
                                    <h1>Brown</h1>
                                </div>
                                <div className={styles.rightListT2}>
                                    <img src={img1} alt="" />
                                    <p>12</p>
                                </div>
                            </div>
                            <div className={styles.rightList}>
                                <div className={styles.rightListT1}>
                                    <img src={img} alt="" />
                                    <h1>Brown</h1>
                                </div>
                                <div className={styles.rightListT2}>
                                    <img src={img1} alt="" />
                                    <p>12</p>
                                </div>
                            </div>
                            <div className={styles.rightList}>
                                <div className={styles.rightListT1}>
                                    <img src={img} alt="" />
                                    <h1>Brown</h1>
                                </div>
                                <div className={styles.rightListT2}>
                                    <img src={img1} alt="" />
                                    <p>12</p>
                                </div>
                            </div>
                            <div className={styles.rightList}>
                                <div className={styles.rightListT1}>
                                    <img src={img} alt="" />
                                    <h1>Brown</h1>
                                </div>
                                <div className={styles.rightListT2}>
                                    <img src={img1} alt="" />
                                    <p>12</p>
                                </div>
                            </div>
                            <div className={styles.rightList}>
                                <div className={styles.rightListT1}>
                                    <img src={img} alt="" />
                                    <h1>Brown</h1>
                                </div>
                                <div className={styles.rightListT2}>
                                    <img src={img1} alt="" />
                                    <p>12</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
