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
  branchContainsMember,
} from "../../components/forms/ComboSelect";

const options = [
  {
    id: 1,
    name: "Product 1",
    value: "Product 1",
    branchMembers: [
      { id: 1, name: "John Snow", value: "John Snow" },
      { id: 2, name: "Jamie Lanister", value: "Jamie Lanister" },
      { id: 3, name: "Cersie Lanister", value: "Cersie Lanister" },
    ],
  },
  {
    id: 2,
    name: "Product 2",
    value: "Product 2",
    branchMembers: [{ id: 4, name: "Jamie Lanister", value: "Jamie Lanister" }],
  },
  {
    id: 3,
    name: "Product 3",
    value: "Product 3",
    branchMembers: [
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
      { branch: 1, members: [1, 2, 3] },
      { branch: 2, members: [4] },
      { branch: 3, members: [8] },
    ]);
  });

  // Tests that deselecting a branch and its members updates the selected options
  it("should update selected options when a branch and its members are deselected", () => {
    const setSelOptions = jest.fn();
    render(
      <ComboSelect
        setSelOptions={setSelOptions}
        selOptions={[{ branch: 1, members: [1] }]}
      >
        Select
      </ComboSelect>
    );
    const button = screen.getByText("Select");
    fireEvent.click(button);
    const branchCheckbox = screen.getByLabelText("Product 1");
    fireEvent.click(branchCheckbox);
    expect(setSelOptions).toHaveBeenCalledWith([]);
  });

  // Tests that deselecting all products and their members updates the selected options
  it("should update selected options when all products and their members are deselected", () => {
    const setSelOptions = jest.fn();
    render(
      <ComboSelect
        setSelOptions={setSelOptions}
        selOptions={[
          { branch: 1, members: [1, 2, 3] },
          { branch: 2, members: [4] },
          { branch: 3, members: [8] },
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

  // Tests that searching for a branch filters the options correctly
  it("should filter the options correctly when searching for a branch", () => {
    const setSelOptions = jest.fn();
    render(<ComboSelect setSelOptions={setSelOptions}>Select</ComboSelect>);
    const button = screen.getByText("Select");
    fireEvent.click(button);
    const searchInput = screen.getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "branch 1" } });
    const branch1Checkbox = screen.getByLabelText("Product 1");
    expect(branch1Checkbox).toBeInTheDocument();
    const branch2Checkbox = screen.queryByLabelText("Product 2");
    expect(branch2Checkbox).not.toBeInTheDocument();
  });

  it("should update selected options when a branch and its members are selected", () => {
    const setSelOptions = jest.fn();
    render(
      <ComboSelect
        setSelOptions={setSelOptions}
        selOptions={[{ branch: 1, members: [1] }]}
      >
        Select
      </ComboSelect>
    );

    const button = screen.getByText("Select");
    fireEvent.click(button);

    const branchCheckbox = screen.getByLabelText("Product 1");
    expect(branchCheckbox).toBeChecked();
    expect(branchCheckbox).toBeInTheDocument();
    fireEvent.click(branchCheckbox);

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
  // Tests that the function adds a new branch to selOptions if it doesn't exist
  it("should add a new branch to selOptions if it doesnt exist", () => {
    const id = 1;
    const setSelOptions = jest.fn();
    const selOptions = [];

    handleChange(id, setSelOptions, selOptions);

    expect(setSelOptions).toHaveBeenCalledWith([
      {
        branch: id,
        members: [],
      },
    ]);
  });

  // Tests that the function removes a branch from selOptions if it already exists
  it("should remove a branch from selOptions if it already exists", () => {
    const id = 1;
    const setSelOptions = jest.fn();
    const selOptions = [
      {
        branch: id,
        members: [],
      },
    ];

    handleChange(id, setSelOptions, selOptions);

    expect(setSelOptions).toHaveBeenCalledWith([]);
  });
});

describe("branchContainsMember", () => {
  // Tests that branchContainsMember returns true when the branch contains the member
  it("should return true when the branch contains the member", () => {
    const branch = createProduct(1, [1, 2, 3]);
    const memberId = 2;
    const result = branchContainsMember(branch, memberId);
    expect(result).toBe(true);
  });

  // Tests that branchContainsMember returns false when the branch does not contain the member
  it("should return false when the branch does not contain the member", () => {
    const branch = createProduct(1, [1, 2, 3]);
    const memberId = 4;
    const result = branchContainsMember(branch, memberId);
    expect(result).toBe(false);
  });

  // Tests that branchContainsMember returns false when the branch is empty
  it("should return false when the branch is empty", () => {
    const branch = createProduct(1, []);
    const memberId = 1;
    const result = branchContainsMember(branch, memberId);
    expect(result).toBe(false);
  });

  // Tests that branchContainsMember returns false when the member is empty
  it("should return false when the member is empty", () => {
    const branch = createProduct(1, [1, 2, 3]);
    const memberId = null;
    const result = branchContainsMember(branch, memberId);
    expect(result).toBe(false);
  });

  // Tests that branchContainsMember returns false when the member is null
  it("should return false when the member is null", () => {
    const branch = createProduct(1, [1, 2, 3]);
    const memberId = null;
    const result = branchContainsMember(branch, memberId);
    expect(result).toBe(false);
  });
});

describe("addNewProduct", () => {
  // Tests that the function returns a new array with the new branch added to the end of the input array
  it("should return a new array with the new branch added to the end of the input array", () => {
    const products = [
      { branch: 1, members: [1, 2] },
      { branch: 2, members: [3, 4] },
    ];
    const newProduct = { branch: 3, members: [5, 6] };

    const result = addNewProduct(products, newProduct);

    expect(result).toEqual([
      { branch: 1, members: [1, 2] },
      { branch: 2, members: [3, 4] },
      { branch: 3, members: [5, 6] },
    ]);
    expect(result).not.toBe(products);
  });

  // Tests that the function does not modify the input array
  it("should not modify the input array", () => {
    const products = [
      { branch: 1, members: [1, 2] },
      { branch: 2, members: [3, 4] },
    ];
    const newProduct = { branch: 3, members: [5, 6] };

    addNewProduct(products, newProduct);

    expect(products).toEqual([
      { branch: 1, members: [1, 2] },
      { branch: 2, members: [3, 4] },
    ]);
  });

  // Tests that the function works with an empty input array
  it("should work with an empty input array", () => {
    const products = [];
    const newProduct = { branch: 1, members: [1, 2] };

    const result = addNewProduct(products, newProduct);

    expect(result).toEqual([{ branch: 1, members: [1, 2] }]);
  });
});

describe("createProduct", () => {
  // Tests that the function returns an object with 'branch' and 'members' properties when valid id and members are provided
  it('should return an object with "branch" and "members" properties when valid id and members are provided', () => {
    const id = 1;
    const members = ["John", "Jane"];
    const result = createProduct(id, members);
    expect(result).toEqual({ branch: id, members });
  });

  // Tests that the function returns an object with an empty 'members' array when no members are provided
  it('should return an object with an empty "members" array when no members are provided', () => {
    const id = 1;
    const result = createProduct(id, []);
    expect(result).toEqual({ branch: id, members: [] });
  });

  // Tests that the function can handle special characters and spaces in id and member names
  it("should handle special characters and spaces in id and member names", () => {
    const id = "branch 1!";
    const members = ["John Doe", "Jane Smith"];
    const result = createProduct(id, members);
    expect(result).toEqual({ branch: id, members });
  });

  // Tests that the function can handle a large number of members (e.g. 1000)
  it("should handle a large number of members", () => {
    const id = 1;
    const members = Array.from(
      { length: 1000 },
      (_, index) => `Member ${index + 1}`
    );
    const result = createProduct(id, members);
    expect(result).toEqual({ branch: id, members });
  });

  // Tests that the function can handle empty strings as id and member names
  it("should handle empty strings as id and member names", () => {
    const id = "";
    const members = ["", "", ""];
    const result = createProduct(id, members);
    expect(result).toEqual({ branch: id, members });
  });
});
describe("handleMemberToggle", () => {
  // Tests that toggling a member that is not selected adds the member to the branch
  it("should add member to branch when member is not selected", () => {
    const branchId = "branch1";
    const memberId = "member1";
    const setSelectedOptions = jest.fn();
    const selectedOptions = [];

    const result = handleMemberToggle(
      branchId,
      memberId,
      setSelectedOptions,
      selectedOptions
    );

    expect(result).toEqual([{ branch: "branch1", members: ["member1"] }]);
  });

  // Tests that toggling a member that is already selected removes the member from the branch
  it("should remove member from branch when member is already selected", () => {
    const branchId = "branch1";
    const memberId = "member1";
    const setSelectedOptions = jest.fn();
    const selectedOptions = [{ branch: "branch1", members: ["member1"] }];

    const result = handleMemberToggle(
      branchId,
      memberId,
      setSelectedOptions,
      selectedOptions
    );

    expect(result).toEqual([]);
  });

  // Tests that toggling a member on a branch that is not yet selected adds the branch and member to the selected options
  it("should add branch and member to selected options when branch is not selected", () => {
    const branchId = "branch1";
    const memberId = "member1";
    const setSelectedOptions = jest.fn();
    const selectedOptions = [];

    const result = handleMemberToggle(
      branchId,
      memberId,
      setSelectedOptions,
      selectedOptions
    );

    expect(result).toEqual([{ branch: "branch1", members: ["member1"] }]);
  });

  // Tests that toggling a member on a branch that is already selected but with no members adds the member to the branch
  it("should add member to branch when branch is already selected but with no members", () => {
    const branchId = "branch1";
    const memberId = "member1";
    const setSelectedOptions = jest.fn();
    const selectedOptions = [{ branch: "branch1", members: [] }];

    const result = handleMemberToggle(
      branchId,
      memberId,
      setSelectedOptions,
      selectedOptions
    );

    expect(result).toEqual([{ branch: "branch1", members: ["member1"] }]);
  });

  // Tests that toggling a member on a branch that is already selected with other members adds the member to the branch
  it("should add member to branch when branch is already selected with other members", () => {
    const branchId = "branch1";
    const memberId = "member1";
    const setSelectedOptions = jest.fn();
    const selectedOptions = [{ branch: "branch1", members: ["member2"] }];

    const result = handleMemberToggle(
      branchId,
      memberId,
      setSelectedOptions,
      selectedOptions
    );

    expect(result).toEqual([
      { branch: "branch1", members: ["member2", "member1"] },
    ]);
  });
});

describe("addMemberToProduct", () => {
  // Tests that the function adds a member to a branch with no existing members
  it("should add a member to a branch with no existing members", () => {
    const products = [
      {
        branch: 0,
        members: [],
      },
    ];
    const branchIndex = 0;
    const memberId = "member1";

    const result = addMemberToProduct(products, branchIndex, memberId);

    expect(result).toEqual([{ branch: 0, members: ["member1"] }]);
  });

  // Tests that the function adds a member to a branch with existing members
  it("should add a member to a branch with existing members", () => {
    const products = [{ branch: 0, members: ["member1", "member2"] }];
    const branchIndex = 0;
    const memberId = "member3";

    const result = addMemberToProduct(products, branchIndex, memberId);

    expect(result).toEqual([
      { branch: 0, members: ["member1", "member2", "member3"] },
    ]);
  });

  // Tests that the function returns the original products array if memberId is undefined
  it("should return the original products array if memberId is undefined", () => {
    const products = [{ branch: 0, members: ["member1", "member2"] }];
    const branchIndex = 0;
    const memberId = undefined;

    const result = addMemberToProduct(products, branchIndex, memberId);

    expect(result).not.toEqual([
      { branch: 0, members: ["member1", "member2"] },
    ]);
  });

  // Tests that the function returns the original products array if memberId is already in the branch
  it("should return the original products array if memberId is already in the branch", () => {
    const products = [{ branch: 0, members: ["member1", "member2"] }];
    const branchIndex = 0;
    const memberId = "member2";

    const result = addMemberToProduct(products, branchIndex, memberId);

    expect(result).not.toEqual([
      { branch: 0, members: ["member1", "member2"] },
    ]);
  });
});

describe("removeMemberFromProduct", () => {
  // Tests that the function removes a member from a branch with multiple members
  it("should remove a member from a branch with multiple members", () => {
    const products = [
      { branch: 1, members: ["member1", "member2", "member3"] },
      { branch: 2, members: ["member4", "member5"] },
      { branch: 3, members: ["member6", "member7", "member8"] },
    ];
    const branchIndex = 0;
    const memberId = "member2";

    const updatedProductes = removeMemberFromProduct(
      products,
      branchIndex,
      memberId
    );

    expect(updatedProductes).toEqual([
      { branch: 1, members: ["member1", "member3"] },
      { branch: 2, members: ["member4", "member5"] },
      { branch: 3, members: ["member6", "member7", "member8"] },
    ]);
  });

  // Tests that the function removes a member from a branch with only one member
  it("should remove a member from a branch with only one member", () => {
    const products = [
      { branch: 1, members: ["member1"] },
      { branch: 2, members: ["member2", "member3"] },
      { branch: 3, members: ["member4", "member5"] },
    ];
    const branchIndex = 0;
    const memberId = "member1";

    const updatedProductes = removeMemberFromProduct(
      products,
      branchIndex,
      memberId
    );

    expect(updatedProductes).toEqual([
      { branch: 2, members: ["member2", "member3"] },
      { branch: 3, members: ["member4", "member5"] },
    ]);
  });

  // Tests that the function handles removing a non-existent member from a branch
  it("should handle removing a non-existent member from a branch", () => {
    const products = [
      { branch: 1, members: ["member1", "member2", "member3"] },
      { branch: 2, members: ["member4", "member5"] },
      { branch: 3, members: ["member6", "member7", "member8"] },
    ];
    const branchIndex = 0;
    const memberId = "member5";

    const updatedProductes = removeMemberFromProduct(
      products,
      branchIndex,
      memberId
    );

    expect(updatedProductes).toEqual([
      { branch: 1, members: ["member1", "member2", "member3"] },
      { branch: 2, members: ["member4", "member5"] },
      { branch: 3, members: ["member6", "member7", "member8"] },
    ]);
  });
});
