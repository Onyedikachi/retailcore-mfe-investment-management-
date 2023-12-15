// @ts-nocheck
import { useState, useEffect, ReactNode } from "react";
import { FaSearch } from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";

import Checkbox from "./Checkbox";
const options = [
  {
    id: 1,
    name: "Product 1",
    value: "Product 1",
    productMembers: [
      { id: 1, name: "John Snow", value: "John Snow" },
      { id: 2, name: "Jamie Lanister", value: "Jamie Lanister" },
      { id: 3, name: "Cersie Lanister", value: "Cersie Lanister" },
    ],
  },
  {
    id: 2,
    name: "Product 2",
    value: "Product 2",
    productMembers: [{ id: 4, name: "Jamie Lanister", value: "Jamie Lanister" }],
  },
  {
    id: 3,
    name: "Product 3",
    value: "Product 3",
    productMembers: [
      { id: 8, name: "Cersie Lanister", value: "Cersie Lanister" },
    ],
  },
];

interface ComboSelectProps {
  children: ReactNode;
  setSelOptions?: any;
  selOptions?: any;
}

export function closeDropdown(setIsOpen) {
  setIsOpen(false);
}
export function handleChange(id, setSelOptions, selOptions) {
  if (!selOptions?.some((i) => i.product === id)) {
    setSelOptions([
      ...selOptions,
      {
        product: id,
        members: [],
      },
    ]);
  } else {
    const arrOptions = selOptions?.filter((i) => i?.product !== id);
    setSelOptions(arrOptions);
  }
}
/**
 * Handles updating the selected options when a member is toggled.
 * @param {string} productId - The id of the product being updated
 * @param {string} memberId - The id of the member being toggled
 * @param {Function} setSelectedOptions - Callback to update the selected options state
 * @param {Array} selectedOptions - The current selected options state
 */
export function handleMemberToggle(
  productId,
  memberId,
  setSelectedOptions,
  selectedOptions
) {
  // Get index of the product to update
  const productIndex = getProductIndex(selectedOptions, productId);

  if (productIndex === -1) {
    // Product not found - add new product with member
    const newProduct = createProduct(productId, [memberId]);
    return addNewProduct(selectedOptions, newProduct);
  } else {
    // Product found - update members

    const productToUpdate = selectedOptions[productIndex];

    if (productContainsMember(productToUpdate, memberId)) {
      // Member already selected, remove member
      return removeMemberFromProduct(selectedOptions, productIndex, memberId);
    } else {
      // Member not selected, add member
      return addMemberToProduct(selectedOptions, productIndex, memberId);
    }
  }
}

// Helper functions

export function getProductIndex(products, productId) {
  return products.findIndex((t) => t.product === productId);
}

export function createProduct(id, members) {
  return {
    product: id,
    members,
  };
}

export function addNewProduct(products, newProduct) {
  return [...products, newProduct];
}

export function productContainsMember(product, memberId) {
  return product.members.includes(memberId);
}

/**
 * Adds a member to a product in the selected options array
 * @param {Array} products
 * @param {number} productIndex
 * @param {string} memberId
 * @returns {Array} updated products array
 */
export function addMemberToProduct(products, productIndex, memberId) {
  const productToUpdate = products[productIndex];

  const updatedProduct = {
    ...productToUpdate,
    members: [...productToUpdate.members, memberId],
  };

  return [
    ...products.slice(0, productIndex),
    updatedProduct,
    ...products.slice(productIndex + 1),
  ];
}

/**
 * Removes a member from a product in the selected options array
 * @param {Array} products
 * @param {number} productIndex
 * @param {string} memberId
 * @returns {Array} updated products array
 */
export function removeMemberFromProduct(products, productIndex, memberId) {
  const productToUpdate = products[productIndex];

  const updatedMembers = productToUpdate.members.filter((id) => id !== memberId);

  const updatedProduct = {
    ...productToUpdate,
    members: updatedMembers,
  };

  if (updatedMembers.length === 0) {
    // Last member removed, remove product
    return [
      ...products.slice(0, productIndex),
      ...products.slice(productIndex + 1),
    ];
  } else {
    // Update product in place
    return [
      ...products.slice(0, productIndex),
      updatedProduct,
      ...products.slice(productIndex + 1),
    ];
  }
}
export default function ComboSelect({
  children,
  setSelOptions,
  selOptions,
}: ComboSelectProps): React.JSX.Element {
  const [isSelectAll, setSelectAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    if (!search) {
      setFilteredOptions(options);
      return;
    }
    setFilteredOptions(
      options?.filter((i) =>
        i.value.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    isSelectAll
      ? setSelOptions(
          filteredOptions?.map((i) => {
            return {
              product: i.id,
              members: i.productMembers.map((m) => m.id),
            };
          })
        )
      : setSelOptions([]);

    return () => {
      setSelOptions([]);
    };
  }, [isSelectAll]);

  return (
    <div className="relative max-w-max">
      <OutsideClickHandler onOutsideClick={() => closeDropdown(setIsOpen)}>
        <button
          className="outline-none bg-transparent cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {children}
        </button>
        {isOpen && (
          <div
            role="listbox"
            className="z-[90] transition-all duration-300 absolute right-0 top-12 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] bg-white py-3 px-4 w-[300px] h-[336px] rounded-b-lg"
          >
            <div className="border-b border-[#8F8F8F] flex items-center relative py-1 mb-4">
              <span className="w-8 h-8 flex items-center justify-center">
                <FaSearch className="text-[#000000C4]" />
              </span>
              <input
                type="search"
                placeholder="Search"
                defaultValue={""}
                onChange={(e) => setSearch(e.target.value)}
                className="placeholder:text-base placeholder:text-[#AAAAAA] h-8  pl-1 pr-4 w-full outline-none text-[#48535B] placeholder:font-normal"
              />
            </div>
            <div>
              <ul className="grid gap-y-3 max-h-[346px] overflow-y-auto pb-5">
                <li className="px-6">
                  <Checkbox
                    label="[Select all]"
                    onChange={() => {
                      setSelectAll(!isSelectAll);
                    }}
                    checked={isSelectAll}
                  />
                </li>
                {filteredOptions?.map((item) => (
                  <li key={item.id} className="px-6">
                    <Checkbox
                      data-testid={item.name}
                      label={item.name}
                      checked={() =>
                        selOptions?.some((i) => i.product === item.id)
                      }
                      onChange={() =>
                        handleChange(
                          item.id,

                          setSelOptions,
                          selOptions
                        )
                      }
                    />
                    {selOptions?.some((i) => i.product === item.id) && (
                      <ul className="pl-6 pt-2">
                        {item.productMembers.map((itx) => (
                          <li key={itx.id}>
                            {" "}
                            <Checkbox
                              label={itx.name}
                              data-testid={itx.name}
                              checked={() =>
                                selOptions
                                  ?.find((i) => i.product === item.id)
                                  ?.members?.includes(itx.id)
                              }
                              onChange={() =>
                                handleMemberToggle(
                                  item.id,
                                  itx.id,
                                  setSelOptions,
                                  selOptions
                                )
                              }
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
}
