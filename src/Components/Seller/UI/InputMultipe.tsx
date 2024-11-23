"use client";
import React, {useEffect, useState} from "react";

import { X } from "lucide-react";

interface MultipleInputProps{
    defaultValue:string[]|undefined,
    placeholder:string;
    inputClassName:string|undefined,
    ValueClassName:string|undefined,
    DateValue:(Data:string[])=>void,
}

const Multitext: React.FC<MultipleInputProps> = (({placeholder, inputClassName, ValueClassName,defaultValue,DateValue}) => {
    const [Value, setValue] = useState<string[]|undefined>([]);
    const [inputvalue, setInputvalue] = useState<string>("");
    useEffect(() => {
        setValue(defaultValue);
    }, []);
    const ADDTEXTE = (item: string) => {
        const curentValue: string[] = Value || [];
        curentValue.push(item);
        setValue(curentValue);
        ReturnData(curentValue)


    };
    const remove = (items: string) =>
    {
        setValue((prevState) => {
            const filteredState = prevState?.filter((item: string) => item !== items);
            DateValue(filteredState);
            return filteredState;
        });

    };
    const ReturnData=(Values:string[])=>{
DateValue(Values);
    }
    return (
        <>
            <input
                placeholder={placeholder}
                value={inputvalue}
                onChange={(e) => {
                    setInputvalue(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        ADDTEXTE(inputvalue);
                        setInputvalue("");
                    }
                }}
                className={`${inputClassName ? " " : " p-2 rounded-lg bg-gray-300"}`}
            />
            <div className="flex gap-2 flex-wrap w-[100%]">
                {(Array.isArray(Value) ? Value : []).map((item, index) => (
                    <div key={index} className="">
                        <div
                            className={`${ValueClassName} `
                                + " text-sm capitalize flex  gap-1 items-center justify-center w-[80px] font-normal bg-orange-500 p-1 px-2 rounded-full text-white "
                            }
                        >
                            <span>{item}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    remove(item);
                                }}
                            >
                                <X className="w-[20px] cursor-pointer hover:bg-red-200 rounded-full h-[20px] "/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
});

export default Multitext;
