import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { FaSearch } from "react-icons/fa";
import { tabLinks } from "@app/constants";
import { useGetGlClassQuery, useGetAccountsQuery } from "@app/api";

export function closeDropdown(setIsOpen) {
    setIsOpen(false);
}

const LedgerItem = ({
    menu,
    query,
    handleClick,
    inputName,
    setQuery,
    setOpen,
    trigger,
}) => {
    return (
        <div
            className={`flex flex-col text-xs  cursor-pointer py-[3px] rounded hover:bg-[#E8C8C85E]  px-1 ${query === menu.accountName ? "bg-[#E8C8C85E]" : ""
                } `}
            onKeyDown={() => { }}
            onClick={() => {
                handleClick(inputName, menu);
                setQuery(menu.accountName);
                setOpen(false);
                trigger(inputName);
            }}
        >
            <span className="font-medium text-sm block">{menu.accountName}</span>
            <span className="block text-xs">Code: {menu.accountNo}</span>
            <span className="block text-xs">Parent: {menu.parentLedgerName}</span>
        </div>
    );
};

export default function ({
    placeholder,
    handleClick,
    inputName,
    register,
    trigger,
    errors,
    error,
    defaultValue,
    clearFields,
    formData,
}: any) {
    const [query, setQuery] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [glClass, setGlass] = useState([]);
    const [classId, setClassId] = useState(null);
    const [ledgers, setLedgers] = useState([]);
    const [toggleMenu, setMenus] = useState(null);
    const { data, isLoading, isSuccess, isError } = useGetGlClassQuery();
    const {
        data: ledgerData,
        isFetching: ledgerIsLoading,
        isSuccess: ledgerIsSuccess,
        isError: ledgerIsError,
        refetch,
    } = useGetAccountsQuery(
        {
            Q: query,
            AccountType: [classId?.toUpperCase()],
            currencyCode: formData?.productInfo?.currencyCode,
            AccountCategory: 1,
        },
        { skip: !classId }
    );

    useEffect(() => {
        console.log(query);
    }, [query]);

    useEffect(() => {
        if (isSuccess) {
            setGlass(data);
        }
    }, [isSuccess, isError]);

    useEffect(() => {
        if (ledgerIsSuccess) {
            setLedgers(ledgerData?.value?.items);
        }
    }, [ledgerIsSuccess, ledgerIsError, ledgerIsLoading]);
    useEffect(() => {
        if (classId) {
            refetch();
        }
    }, [classId]);

    const togglemenu = (menuIndex) => {
        //get the index of the menu on click
        setMenus(menuIndex);
    };
    useEffect(() => {
        if (defaultValue) {
            setQuery(defaultValue);
        }
    }, [defaultValue]);

    useEffect(() => {
        clearFields && setQuery("");
    }, [clearFields]);

    const debitLedgerOptions = [
        {
            name: "Current Account balances",
            id: "767t98099df",
            glClass: "LIABILITY",
            type: "Customer",
            accountNumber: "1097398425",
            priceImpact: true,
        },
        {
            name: "Cash Receivable balances",
            id: "767t980df",
            glClass: "LIABILITY",
            type: "Internal",
            accountNumber: "ASTCAS23421",
            priceImpact: true,
        },
    ]

    return (
        <OutsideClickHandler onOutsideClick={() => closeDropdown(setOpen)}>
            <div className="w-full" data-testid="gli">
                <div className="relative bg-[#fff] w-full">
                    <div
                        onKeyDown={() => { }}
                        role="button"
                        tabIndex={0}
                        data-testid="open-button"
                        className="flex items-center  border-b border-[#8F8F8F]"
                        onClick={() => setOpen(true)}
                    >
                        <span className="w-8 h-8 flex items-center justify-center">
                            <FaSearch className="text-[#48535B] text-lg" />
                        </span>{" "}
                        <input
                            placeholder={placeholder}
                            data-testid="gli-input"
                            className="w-full min-w-[360px]  ring-0 outline-none bg-transparent"
                            onChange={(event) => setQuery(event.target.value)}
                            value={query}
                        />
                    </div>
                    {isOpen && (
                        <div className="flex flex-col shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]  pt-2 min-h-[54px] max-h-[216px] overflow-y-auto rounded-b-lg top-[35px] bg-white z-[400] absolute w-full min-w-[360px] items-center">
                            {
                                [1, 2, 3, 4, 5].map((i) => (
                                    <div className="w-[94%] min-h-[38px] mb-2 hover:bg-[#F6EBEB] flex flex-col justify-around">
                                        <span className="text-[14px] h-[15px]">
                                            Chukwuebuka Chisom
                                        </span>
                                        <span className="flex text-sm flex-row text-[12px] h-[12px] leading-[12px] text-[#8F8F8F]">
                                            <span className="border-r-2 border-[#8F8F8F] pr-2 mr-2">
                                                Customer
                                            </span>
                                            <span>
                                                45203928360
                                            </span>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </OutsideClickHandler>
    );
}
