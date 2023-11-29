import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ComboSelect } from "../../components/forms";
import {
  addMemberToProduct,
  addNewProduct,
  closeDropdown,
  createProduct,
  handleChange,
  handleMemberToggle,
  removeMemberFromProduct,
  productContainsMember,
} from "../../components/forms/ComboSelect";

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

describe("ComboSelect", () => {
  it("renders without crashing", () => {
    render(
      <ComboSelect
        children={<div>Select</div>}
        setSelOptions={jest.fn()}
        selOptions={jest.fn()}
      />
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <ComboSelect
        children={<div>Select</div>}
        setSelOptions={jest.fn()}
        selOptions={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should open the dropdown when the button is clicked", () => {
    render(
      <ComboSelect
        children={<div>Select</div>}
        setSelOptions={jest.fn()}
        selOptions={[]}
      />
    );
    const button = screen.getByText("Select");
    fireEvent.click(button);
    const dropdown = screen.getByRole("listbox");
    expect(dropdown).toBeInTheDocument();
  });

  it("should update selected options when all products and their members are selected", () => {
    const setSelOptions = jest.fn();
    render(
      <ComboSelect setSelOptions={setSelOptions} selOptions={[]}>
        Select
      </ComboSelect>
    );
    const button = screen.getByText("Select");
    fireEvent.click(button);
    const selectAllCheckbox = screen.getByLabelText("[Select all]");
    fireEvent.click(selectAllCheckbox);
    expect(setSelOptions).toHaveBeenCalledWith([
      { product: 1, members: [1, 2, 3] },
      { product: 2, members: [4] },
      { product: 3, members: [8] },
    ]);
  });

  // Tests that deselecting a product and its members updates the selected options
  it("should update selected options when a product and its members are deselected", () => {
    const setSelOptions = jest.fn();
    render(
      <ComboSelect
        setSelOptions={setSelOptions}
        selOptions={[{ product: 1, members: [1] }]}
      >
        Select
      </ComboSelect>
    );
    const button = screen.getByText("Select");
    fireEvent.click(button);
    const productCheckbox = screen.getByLabelText("Product 1");
    fireEvent.click(productCheckbox);
    expect(setSelOptions).toHaveBeenCalledWith([]);
  });

  // Tests that deselecting all products and their members updates the selected options
  it("should update selected options when all products and their members are deselected", () => {
    const setSelOptions = jest.fn();
    render(
      <ComboSelect
        setSelOptions={setSelOptions}
        selOptions={[
          { product: 1, members: [1, 2, 3] },
          { product: 2, members: [4] },
          { product: 3, members: [8] },
        ]}
      >
        Select
      </ComboSelect>
    );
    const button = screen.getByText("Select");
    fireEvent.click(button);
    const selectAllCheckbox = screen.getByLabelText("[Select all]");
    fireEvent.click(selectAllCheckbox);
    expect(setSelOptions).toHaveBeenCalledWith([]);
  });

  // Tests that searching for a product filters the options correctly
  it("should filter the options correctly when searching for a product", () => {
    const setSelOptions = jest.fn();
    render(<ComboSelect setSelOptions={setSelOptions}>Select</ComboSelect>);
    const button = screen.getByText("Select");
    fireEvent.click(button);
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "product 1" } });
    const product1Checkbox = screen.getByLabelText("Product 1");
    expect(product1Checkbox).toBeInTheDocument();
    const product2Checkbox = screen.queryByLabelText("Product 2");
    expect(product2Checkbox).not.toBeInTheDocument();
  });

  it("should update selected options when a product and its members are selected", () => {
    const setSelOptions = jest.fn();
    render(
      <ComboSelect
        setSelOptions={setSelOptions}
        selOptions={[{ product: 1, members: [1] }]}
      >
        Select
      </ComboSelect>
    );

    const button = screen.getByText("Select");
    fireEvent.click(button);

    const productCheckbox = screen.getByLabelText("Product 1");
    expect(productCheckbox).toBeChecked();
    expect(productCheckbox).toBeInTheDocument();
    fireEvent.click(productCheckbox);

    const memberCheckbox = screen.getByLabelText("John Snow");
    expect(memberCheckbox).toBeChecked();

    fireEvent.click(memberCheckbox);
    expect(setSelOptions).toHaveBeenCalled();
  });
});

describe("closeDropdown", () => {
  // Tests that closeDropdown sets isOpen state to false when called with setIsOpen(false)
  it("should set isOpen state to false when called with setIsOpen(false)", () => {
    const setIsOpen = jest.fn();
    closeDropdown(setIsOpen);
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  // Tests that closeDropdown does not throw an error when called with setIsOpen(undefined)
  it("should not throw an error when called with setIsOpen(undefined)", () => {
    const setIsOpen = jest.fn();
    expect(() => closeDropdown(setIsOpen)).not.toThrow();
  });

  // Tests that closeDropdown does not throw an error when called with setIsOpen(null)
  it("should not throw an error when called with setIsOpen(null)", () => {
    const setIsOpen = jest.fn();
    expect(() => closeDropdown(setIsOpen)).not.toThrow();
  });

  // Tests that closeDropdown does not throw an error when called with setIsOpen(0)
  it("should not throw an error when called with setIsOpen(0)", () => {
    const setIsOpen = jest.fn();
    expect(() => closeDropdown(setIsOpen)).not.toThrow();
  });

  // Tests that closeDropdown does not throw an error when called with setIsOpen('')
  it('should not throw an error when called with setIsOpen("")', () => {
    const setIsOpen = jest.fn();
    expect(() => closeDropdown(setIsOpen)).not.toThrow();
  });

  // Tests that closeDropdown does not throw an error when called with setIsOpen({})
  it("should not throw an error when called with setIsOpen({})", () => {
    const setIsOpen = jest.fn();
    expect(() => closeDropdown(setIsOpen)).not.toThrow();
  });
});

describe("handleChange", () => {
  // Tests that the function adds a new product to selOptions if it doesn't exist
  it("should add a new product to selOptions if it doesnt exist", () => {
    const id = 1;
    const setSelOptions = jest.fn();
    const selOptions = [];

    handleChange(id, setSelOptions, selOptions);

    expect(setSelOptions).toHaveBeenCalledWith([
      {
        product: id,
        members: [],
      },
    ]);
  });

  // Tests that the function removes a product from selOptions if it already exists
  it("should remove a product from selOptions if it already exists", () => {
    const id = 1;
    const setSelOptions = jest.fn();
    const selOptions = [
      {
        product: id,
        members: [],
      },
    ];

    handleChange(id, setSelOptions, selOptions);

    expect(setSelOptions).toHaveBeenCalledWith([]);
  });
});

describe("productContainsMember", () => {
  // Tests that productContainsMember returns true when the product contains the member
  it("should return true when the product contains the member", () => {
    const product = createProduct(1, [1, 2, 3]);
    const memberId = 2;
    const result = productContainsMember(product, memberId);
    expect(result).toBe(true);
  });

  // Tests that productContainsMember returns false when the product does not contain the member
  it("should return false when the product does not contain the member", () => {
    const product = createProduct(1, [1, 2, 3]);
    const memberId = 4;
    const result = productContainsMember(product, memberId);
    expect(result).toBe(false);
  });

  // Tests that productContainsMember returns false when the product is empty
  it("should return false when the product is empty", () => {
    const product = createProduct(1, []);
    const memberId = 1;
    const result = productContainsMember(product, memberId);
    expect(result).toBe(false);
  });

  // Tests that productContainsMember returns false when the member is empty
  it("should return false when the member is empty", () => {
    const product = createProduct(1, [1, 2, 3]);
    const memberId = null;
    const result = productContainsMember(product, memberId);
    expect(result).toBe(false);
  });

  // Tests that productContainsMember returns false when the member is null
  it("should return false when the member is null", () => {
    const product = createProduct(1, [1, 2, 3]);
    const memberId = null;
    const result = productContainsMember(product, memberId);
    expect(result).toBe(false);
  });
});

describe("addNewProduct", () => {
  // Tests that the function returns a new array with the new product added to the end of the input array
  it("should return a new array with the new product added to the end of the input array", () => {
    const products = [
      { product: 1, members: [1, 2] },
      { product: 2, members: [3, 4] },
    ];
    const newProduct = { product: 3, members: [5, 6] };

    const result = addNewProduct(products, newProduct);

    expect(result).toEqual([
      { product: 1, members: [1, 2] },
      { product: 2, members: [3, 4] },
      { product: 3, members: [5, 6] },
    ]);
    expect(result).not.toBe(products);
  });

  // Tests that the function does not modify the input array
  it("should not modify the input array", () => {
    const products = [
      { product: 1, members: [1, 2] },
      { product: 2, members: [3, 4] },
    ];
    const newProduct = { product: 3, members: [5, 6] };

    addNewProduct(products, newProduct);

    expect(products).toEqual([
      { product: 1, members: [1, 2] },
      { product: 2, members: [3, 4] },
    ]);
  });

  // Tests that the function works with an empty input array
  it("should work with an empty input array", () => {
    const products = [];
    const newProduct = { product: 1, members: [1, 2] };

    const result = addNewProduct(products, newProduct);

    expect(result).toEqual([{ product: 1, members: [1, 2] }]);
  });
});

describe("createProduct", () => {
  // Tests that the function returns an object with 'product' and 'members' properties when valid id and members are provided
  it('should return an object with "product" and "members" properties when valid id and members are provided', () => {
    const id = 1;
    const members = ["John", "Jane"];
    const result = createProduct(id, members);
    expect(result).toEqual({ product: id, members });
  });

  // Tests that the function returns an object with an empty 'members' array when no members are provided
  it('should return an object with an empty "members" array when no members are provided', () => {
    const id = 1;
    const result = createProduct(id, []);
    expect(result).toEqual({ product: id, members: [] });
  });

  // Tests that the function can handle special characters and spaces in id and member names
  it("should handle special characters and spaces in id and member names", () => {
    const id = "product 1!";
    const members = ["John Doe", "Jane Smith"];
    const result = createProduct(id, members);
    expect(result).toEqual({ product: id, members });
  });

  // Tests that the function can handle a large number of members (e.g. 1000)
  it("should handle a large number of members", () => {
    const id = 1;
    const members = Array.from(
      { length: 1000 },
      (_, index) => `Member ${index + 1}`
    );
    const result = createProduct(id, members);
    expect(result).toEqual({ product: id, members });
  });

  // Tests that the function can handle empty strings as id and member names
  it("should handle empty strings as id and member names", () => {
    const id = "";
    const members = ["", "", ""];
    const result = createProduct(id, members);
    expect(result).toEqual({ product: id, members });
  });
});
describe("handleMemberToggle", () => {
  // Tests that toggling a member that is not selected adds the member to the product
  it("should add member to product when member is not selected", () => {
    const productId = "product1";
    const memberId = "member1";
    const setSelectedOptions = jest.fn();
    const selectedOptions = [];

    const result = handleMemberToggle(
      productId,
      memberId,
      setSelectedOptions,
      selectedOptions
    );

    expect(result).toEqual([{ product: "product1", members: ["member1"] }]);
  });

  // Tests that toggling a member that is already selected removes the member from the product
  it("should remove member from product when member is already selected", () => {
    const productId = "product1";
    const memberId = "member1";
    const setSelectedOptions = jest.fn();
    const selectedOptions = [{ product: "product1", members: ["member1"] }];

    const result = handleMemberToggle(
      productId,
      memberId,
      setSelectedOptions,
      selectedOptions
    );

    expect(result).toEqual([]);
  });

  // Tests that toggling a member on a product that is not yet selected adds the product and member to the selected options
  it("should add product and member to selected options when product is not selected", () => {
    const productId = "product1";
    const memberId = "member1";
    const setSelectedOptions = jest.fn();
    const selectedOptions = [];

    const result = handleMemberToggle(
      productId,
      memberId,
      setSelectedOptions,
      selectedOptions
    );

    expect(result).toEqual([{ product: "product1", members: ["member1"] }]);
  });

  // Tests that toggling a member on a product that is already selected but with no members adds the member to the product
  it("should add member to product when product is already selected but with no members", () => {
    const productId = "product1";
    const memberId = "member1";
    const setSelectedOptions = jest.fn();
    const selectedOptions = [{ product: "product1", members: [] }];

    const result = handleMemberToggle(
      productId,
      memberId,
      setSelectedOptions,
      selectedOptions
    );

    expect(result).toEqual([{ product: "product1", members: ["member1"] }]);
  });

  // Tests that toggling a member on a product that is already selected with other members adds the member to the product
  it("should add member to product when product is already selected with other members", () => {
    const productId = "product1";
    const memberId = "member1";
    const setSelectedOptions = jest.fn();
    const selectedOptions = [{ product: "product1", members: ["member2"] }];

    const result = handleMemberToggle(
      productId,
      memberId,
      setSelectedOptions,
      selectedOptions
    );

    expect(result).toEqual([
      { product: "product1", members: ["member2", "member1"] },
    ]);
  });
});

describe("addMemberToProduct", () => {
  // Tests that the function adds a member to a product with no existing members
  it("should add a member to a product with no existing members", () => {
    const products = [
      {
        product: 0,
        members: [],
      },
    ];
    const productIndex = 0;
    const memberId = "member1";

    const result = addMemberToProduct(products, productIndex, memberId);

    expect(result).toEqual([{ product: 0, members: ["member1"] }]);
  });

  // Tests that the function adds a member to a product with existing members
  it("should add a member to a product with existing members", () => {
    const products = [{ product: 0, members: ["member1", "member2"] }];
    const productIndex = 0;
    const memberId = "member3";

    const result = addMemberToProduct(products, productIndex, memberId);

    expect(result).toEqual([
      { product: 0, members: ["member1", "member2", "member3"] },
    ]);
  });

  // Tests that the function returns the original products array if memberId is undefined
  it("should return the original products array if memberId is undefined", () => {
    const products = [{ product: 0, members: ["member1", "member2"] }];
    const productIndex = 0;
    const memberId = undefined;

    const result = addMemberToProduct(products, productIndex, memberId);

    expect(result).not.toEqual([
      { product: 0, members: ["member1", "member2"] },
    ]);
  });

  // Tests that the function returns the original products array if memberId is already in the product
  it("should return the original products array if memberId is already in the product", () => {
    const products = [{ product: 0, members: ["member1", "member2"] }];
    const productIndex = 0;
    const memberId = "member2";

    const result = addMemberToProduct(products, productIndex, memberId);

    expect(result).not.toEqual([
      { product: 0, members: ["member1", "member2"] },
    ]);
  });
});

describe("removeMemberFromProduct", () => {
  // Tests that the function removes a member from a product with multiple members
  it("should remove a member from a product with multiple members", () => {
    const products = [
      { product: 1, members: ["member1", "member2", "member3"] },
      { product: 2, members: ["member4", "member5"] },
      { product: 3, members: ["member6", "member7", "member8"] },
    ];
    const productIndex = 0;
    const memberId = "member2";

    const updatedProductes = removeMemberFromProduct(
      products,
      productIndex,
      memberId
    );

    expect(updatedProductes).toEqual([
      { product: 1, members: ["member1", "member3"] },
      { product: 2, members: ["member4", "member5"] },
      { product: 3, members: ["member6", "member7", "member8"] },
    ]);
  });

  // Tests that the function removes a member from a product with only one member
  it("should remove a member from a product with only one member", () => {
    const products = [
      { product: 1, members: ["member1"] },
      { product: 2, members: ["member2", "member3"] },
      { product: 3, members: ["member4", "member5"] },
    ];
    const productIndex = 0;
    const memberId = "member1";

    const updatedProductes = removeMemberFromProduct(
      products,
      productIndex,
      memberId
    );

    expect(updatedProductes).toEqual([
      { product: 2, members: ["member2", "member3"] },
      { product: 3, members: ["member4", "member5"] },
    ]);
  });

  // Tests that the function handles removing a non-existent member from a product
  it("should handle removing a non-existent member from a product", () => {
    const products = [
      { product: 1, members: ["member1", "member2", "member3"] },
      { product: 2, members: ["member4", "member5"] },
      { product: 3, members: ["member6", "member7", "member8"] },
    ];
    const productIndex = 0;
    const memberId = "member5";

    const updatedProductes = removeMemberFromProduct(
      products,
      productIndex,
      memberId
    );

    expect(updatedProductes).toEqual([
      { product: 1, members: ["member1", "member2", "member3"] },
      { product: 2, members: ["member4", "member5"] },
      { product: 3, members: ["member6", "member7", "member8"] },
    ]);
  });
});
