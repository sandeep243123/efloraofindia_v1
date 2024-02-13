import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import List from "./List";
import addImg from "./add.png";
function Selector() {
    const [inputValue, setInputValue] = useState("");
    const [countries, setCountries] = useState(null);
    const [selected, setSelected] = useState("Select Item");
    const [selected1, setSelected1] = useState("Select Item");
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [show, setShow] = useState(false);
    const [inputValue2, setInputValue2] = useState("");
    useEffect(() => {
        fetch("https://restcountries.com/v2/all?fields=name")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
            });
    }, []);
    return (
        <div className="flex flex-col gap-6 m-6">
            <div className="flex gap-2">
                <div className="w-72 font-medium h-80 z-10">
                    <div
                        onClick={() => setOpen1(!open1)}
                        className="bg-white text-black w-full  p-2 flex  item-center justify-between rounded"
                    >
                        {selected
                            ? selected.length > 25
                                ? selected?.substring(0, 25) + "..."
                                : selected
                            : "Select Country"}
                        <BiChevronDown
                            size={20}
                            className={`${open1 && "rotate-180"}`}
                        ></BiChevronDown>
                    </div>
                    <ul
                        className={`bg-white text-black  mt-2 overflow-y-auto   ${open1 ? "max-h-80" : "max-h-0"
                            }`}
                    >
                        <div className="flex items-center px-2 sticky top-0 bg-white">
                            <AiOutlineSearch size={18} className=" text-gray-700" />
                            <div className="flex ">
                                <input
                                    type="text"
                                    placeholder="Enter the text to search"
                                    className="placeholder:text-gray-700 p-2 w-full outline-none"
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value.toLowerCase());
                                    }}
                                />
                                <div>
                                    <img
                                        src={addImg}
                                        style={{ height: "3vh", width: "2vw" }}
                                        className="mt-2 mx-2"
                                    />
                                </div>
                            </div>
                        </div>
                        {countries?.map((country) => (
                            <li
                                key={country?.name}
                                className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${country?.name?.toLowerCase().startsWith(inputValue)
                                    ? "block"
                                    : "hidden"
                                    }
                            `}
                                onClick={() => {
                                    if (
                                        country?.name?.toLowerCase() !==
                                        selected.toLocaleLowerCase()
                                    ) {
                                        setSelected(country?.name);
                                        setOpen1(false);
                                    }
                                }}
                            >
                                {country?.name}
                            </li>
                        ))}
                    </ul>
                    <div>{show}</div>
                </div>
                {/* second list */}
                <div className="w-72 font-medium h-80 z-10">
                    <div
                        onClick={() => setOpen2(!open2)}
                        className="bg-white text-black w-full  p-2 flex  item-center justify-between rounded"
                    >
                        {selected1
                            ? selected1.length > 25
                                ? selected1?.substring(0, 25) + "..."
                                : selected1
                            : "Select Country"}
                        <BiChevronDown
                            size={20}
                            className={`${open2 && "rotate-180"}`}
                        ></BiChevronDown>
                    </div>
                    <ul
                        className={`bg-white text-black  mt-2 overflow-y-auto   ${open2 ? "max-h-80" : "max-h-0"
                            }`}
                    >
                        <div className="flex items-center px-2 sticky top-0 bg-white">
                            <AiOutlineSearch size={18} className=" text-gray-700" />
                            <div className="flex ">
                                <input
                                    type="text"
                                    placeholder="Enter the text to search"
                                    className="placeholder:text-gray-700 p-2 w-full outline-none"
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value.toLowerCase());
                                    }}
                                />
                                <div>
                                    <img
                                        src={addImg}
                                        style={{ height: "3vh", width: "2vw" }}
                                        className="mt-2 mx-2"
                                    />
                                </div>
                            </div>
                        </div>
                        {countries?.map((country) => (
                            <li
                                key={country?.name}
                                className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${country?.name?.toLowerCase().startsWith(inputValue)
                                    ? "block"
                                    : "hidden"
                                    }
                            `}
                                onClick={() => {
                                    if (
                                        country?.name?.toLowerCase() !==
                                        selected.toLocaleLowerCase()
                                    ) {
                                        setSelected1(country?.name);
                                        setOpen2(false);
                                    }
                                }}
                            >
                                {country?.name}
                            </li>
                        ))}
                    </ul>
                    <div>{show}</div>
                </div>

                <div className="flex gap-2">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="Value"
                            className="h-10 w-32 px-2 rounded-md outline-none text-black"
                            onChange={(e) => {
                                setInputValue2(e.target.value.toLowerCase());
                                setOpen3(true);

                            }}
                        />
                        <div className="z-10 bg-gray-200 max-w-32 overflow-x-hidden rounded-md max-h-52 overflow-auto">
                            <ul>
                                <li>Hello</li>
                            </ul>
                        </div>
                    </div>
                    <button className="bg-green-600 text-zinc-100 h-10 w-32 px-2 rounded-md font-bold">
                        Add
                    </button>
                </div>
            </div>
            <div className="-mt-72 py-5 flex flex-col justify-end gap-6 w-full">
                <List />
            </div>
        </div>
    );
}

export default Selector;
