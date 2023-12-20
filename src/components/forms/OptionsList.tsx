import { Listbox } from "@headlessui/react";
import { Fragment } from "react";

export default (({options}) => {
    return (
        <Fragment>

            {options?.map(
                (
                    option: {
                        id: number;
                        text: string;
                        value?: string;
                        disabled?: boolean;
                    },
                    optionIdx: number
                ) => (
                    <Listbox.Option
                        key={`${optionIdx.toString()}-index`}
                        disabled={option?.disabled}
                        className={({ active }) =>
                            `relative  select-none py-2 px-6  text-[#636363] hover:bg-gray-50  ${active ? "bg-red-50" : ""
                            } ${option?.disabled
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`
                        }
                        value={option}
                    >
                        {({ selected }) => (
                            <>
                                <span data-testid="select-option"
                                    className={`block whitespace-nowrap  ${selected ? "font-medium" : "font-normal"
                                        }`}
                                >
                                    {option?.text}
                                </span>
                            </>
                        )}
                    </Listbox.Option>
                )
            )}
        </Fragment>
    )
})