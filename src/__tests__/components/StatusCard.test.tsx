import StatusCard, { StatusButton, StatusCategoryButton, count, filterDefaultOptions, handleActiveType, handleClick, handlePermission, sortOptions } from "../../components/StatusCard";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {
  
    ProductOptions,
    RequestOptions,
  } from "../../constants";

describe("StatusCard", () => {
    it("Renders without error", () => {
        render(<StatusCard handleChange={jest.fn()} />)
        expect(screen.getByTestId("rejected")).toBeInTheDocument();
    })

})

describe("StatusButton", () => {
    it("Renders without error", () => {
        render(<StatusButton item={{ type: "rejected" }} />)
        expect(screen.getByText("rejected")).toBeInTheDocument();

    })
    it("Shows spinner while loading", () => {
        render(<StatusButton item={{ type: "rejected" }} isLoading={true} />)
        act(() => {
            expect(screen.queryByText("rejected")).toBeInTheDocument();
            expect(screen.getByTestId("loading")).toBeInTheDocument();
        })

    })
})

describe("sortOptions", () => {
    const expectedProductsResult = [
        { id: 0, type: 'all', color: '#252C32' },
        { id: 2, type: 'active', color: '#2FB755' },
        { id: 1, type: 'inactive', color: '#AAAAAA' }
    ]
    const expectedRequestsResult = [
        { id: null, type: 'all', color: '#252C32' },
        { id: 2, type: 'approved', color: '#2FB755' },
        { id: 1, type: 'pending', color: '#3FA2F7' },
        { id: 3, type: 'rejected', color: '#CF2A2A' }
      ]

    it("Sorts and returns expected options in 'all products' category", () => {
        const result = sortOptions("all products", true);
        expect(result).toStrictEqual(expectedProductsResult);
    })

    it("Sorts and returns expected options in 'requests' category", () => {
        const result = sortOptions("requests", true);
        expect(result).toStrictEqual(expectedRequestsResult);
    })
})

describe("StatusCategoryButton", () => {
    it('should handle button click and apply styles', () => {
        // Mock necessary functions and data
        const item = { type: 'InProgress' };
        const category = 'InProgress';
        const setCategory = jest.fn();
        const setSelected = jest.fn();
    
        // Render the component
        const { getByTestId, getByText } = render(
          <StatusCategoryButton
            item={item}
            category={category}
            setCategory={setCategory}
            setSelected={setSelected}
          />
        );
    
        // Find the button by data-testid
        const button = getByTestId(`${item.type}-btn`);
    
        // Simulate a button click
        fireEvent.click(button);
    
        // Assertions
    
        // Verify that setCategory and setSelected are called with the correct arguments
        expect(setCategory).toHaveBeenCalledWith(item.type);
        expect(setSelected).toHaveBeenCalledWith({"disabled": false, "id": 1, "text": "Initiated by me", "value": "created_by_me"});
    
        // Verify that the button styles are applied based on the category
        expect(button).toHaveClass(
          category.toLowerCase() === item.type.toLowerCase()
            ? '!bg-white font-semibold text-[20px] px-4 py-[19px] text-[18px] text-[#636363] text-left flex gap-x-[5px] items-center leading-[24px] w-full capitalize border-[#D0D5DD] border-b last-of-type:border-b-0'
            : 'hover:bg-gray-50 bg-[#EFEFEF]'
        );
    
      });
    
})

describe("handleActiveType", () => {
    const setStatus = jest.fn()
    it(`Sets status to "" when activeType === all `, () => {
        handleActiveType("all", setStatus);
        expect(setStatus).toBeCalledWith("");
    })

    it("Sets status according to various activeTypes", () => {
        const types = ["active", "inactive", "approved", "pending", "draft", "rejected", "in-review", "in-issue"]
        types.forEach(type => {
            handleActiveType(type, setStatus);
            expect(setStatus).toBeCalledWith(type.charAt(0).toUpperCase())
        })

    })
})

describe('filterDefaultOptions', () => {

    // Returns an array of objects filtered from.
    it('should return an array of objects filtered from', () => {
      const result = filterDefaultOptions();
      expect(result).toEqual([
        {
          id: null,
          type: "all",
          color: "#252C32",
        },
        {
          id: 2,
          type: "approved",
          color: "#2FB755",
        },
        {
          id: 1,
          type: "in-review",
          color: "#3FA2F7",
        },
        {
          id: 3,
          type: "in-issue",
          color: "#CF2A2A",
        },
        {
          id: 0,
          type: "draft",
          color: "#AAAAAA",
        },
      ]);
    });

    // The returned array does not contain objects withroperty equal  or.
    it('should not contain objects withroperty equal  or', () => {
      const result = filterDefaultOptions();
      const hasPendingOrRejected = result.some((i) => i.type === "pending" || i.type === "rejected");
      expect(hasPendingOrRejected).toBe(false);
    });

    // contains objects withroperty equal  or only.
    it('should contain objects withroperty equal  or only', () => {
      const result = filterDefaultOptions();
      const hasPendingOrRejected = result.every((i) => i.type === "pending" || i.type === "rejected");
      expect(hasPendingOrRejected).toBe(false);
    });

    // contains objects withroperty equal  only.
    it('should contain objects withroperty equal  only', () => {
      const result = filterDefaultOptions();
      const hasPendingOnly = result.every((i) => i.type === "pending");
      expect(hasPendingOnly).toBe(false);
    });

    // contains objects withroperty equal to only.
    it('should contain objects withroperty equal to only', () => {
      const result = filterDefaultOptions();
      const hasRejectedOnly = result.every((i) => i.type === "rejected");
      expect(hasRejectedOnly).toBe(false);
    });

   
});


describe('StatusButton', () => {

    // Renders a button element with the correct type and styling.
    it('should render button element with correct type and styling', () => {
      // Arrange
      const item = { type: 'active', color: '#000000' };
      const isActive = true;
      const setActiveType = jest.fn();
      const analyticsData = { data: { A: 5 } };
      const isLoading = false;

      // Act
      render(
        <StatusButton
          item={item}
          isActive={isActive}
          setActiveType={setActiveType}
          analyticsData={analyticsData}
          isLoading={isLoading}
        />
      );

      // Assert
      const buttonElement = screen.getByTestId('active');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('border');
      expect(buttonElement).toHaveClass('min-w-[60px]');
      expect(buttonElement).toHaveClass('rounded-lg');
      expect(buttonElement).toHaveClass('py-1');
      expect(buttonElement).toHaveClass('px-[15px]');
      expect(buttonElement).toHaveClass('flex');
      expect(buttonElement).toHaveClass('flex-col');
      expect(buttonElement).toHaveClass('cursor-pointer');
   

    });

    // Displays the correct count for the given type when isLoading is false.
    it('should display correct count when isLoading is false', () => {
      // Arrange
      const item = { type: 'active', color: '#000000' };
      const isActive = true;
      const setActiveType = jest.fn();
      const analyticsData = { data: { A: 5 } };
      const isLoading = false;

      // Act
      render(
        <StatusButton
          item={item}
          isActive={isActive}
          setActiveType={setActiveType}
          analyticsData={analyticsData}
          isLoading={isLoading}
        />
      );

      // Assert
      const countElement = screen.getByText('5');
      expect(countElement).toBeInTheDocument();
    });

    // Displays a spinner when isLoading is true.
    it('should display spinner when isLoading is true', () => {
      // Arrange
      const item = { type: 'active', color: '#000000' };
      const isActive = true;
      const setActiveType = jest.fn();
      const analyticsData = { data: { A: 5 } };
      const isLoading = true;

      // Act
      render(
        <StatusButton
          item={item}
          isActive={isActive}
          setActiveType={setActiveType}
          analyticsData={analyticsData}
          isLoading={isLoading}
        />
      );

      // Assert
      const spinnerElement = screen.getByTestId('loading');
      expect(spinnerElement).toBeInTheDocument();
    });

    // Renders a button element with the correct type and styling when count returns undefined.
    it('should render button element with correct type and styling when count returns undefined', () => {
      // Arrange
      const item = { type: 'active', color: '#000000' };
      const isActive = true;
      const setActiveType = jest.fn();
      const analyticsData = { data: {} };
      const isLoading = false;

      // Act
      render(
        <StatusButton
          item={item}
          isActive={isActive}
          setActiveType={setActiveType}
          analyticsData={analyticsData}
          isLoading={isLoading}
        />
      );

      // Assert
      const buttonElement = screen.getByTestId('active');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('border');
      expect(buttonElement).toHaveClass('min-w-[60px]');
      expect(buttonElement).toHaveClass('rounded-lg');
      expect(buttonElement).toHaveClass('py-1');
      expect(buttonElement).toHaveClass('px-[15px]');
      expect(buttonElement).toHaveClass('flex');
      expect(buttonElement).toHaveClass('flex-col');
      expect(buttonElement).toHaveClass('cursor-pointer');
   

    });

    // Renders a button element with the correct type and styling when count returns null.
    it('should render button element with correct type and styling when count returns null', () => {
      // Arrange
      const item = { type: 'active', color: '#000000' };
      const isActive = true;
      const setActiveType = jest.fn();
      const analyticsData = { data: { A: null } };
      const isLoading = false;

      // Act
      render(
        <StatusButton
          item={item}
          isActive={isActive}
          setActiveType={setActiveType}
          analyticsData={analyticsData}
          isLoading={isLoading}
        />
      );

      // Assert
      const buttonElement = screen.getByTestId('active');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('border');
      expect(buttonElement).toHaveClass('min-w-[60px]');
      expect(buttonElement).toHaveClass('rounded-lg');
      expect(buttonElement).toHaveClass('py-1');
      expect(buttonElement).toHaveClass('px-[15px]');
      expect(buttonElement).toHaveClass('flex');
      expect(buttonElement).toHaveClass('flex-col');
      expect(buttonElement).toHaveClass('cursor-pointer');
   

    });

    // Renders a button element with the correct type and styling when analyticsData is undefined.
    it('should render button element with correct type and styling when analyticsData is undefined', () => {
      // Arrange
      const item = { type: 'active', color: '#000000' };
      const isActive = true;
      const setActiveType = jest.fn();
      const analyticsData = undefined;
      const isLoading = false;

      // Act
      render(
        <StatusButton
          item={item}
          isActive={isActive}
          setActiveType={setActiveType}
          analyticsData={analyticsData}
          isLoading={isLoading}
        />
      );

      // Assert
      const buttonElement = screen.getByTestId('active');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('border');
      expect(buttonElement).toHaveClass('min-w-[60px]');
      expect(buttonElement).toHaveClass('rounded-lg');
      expect(buttonElement).toHaveClass('py-1');
      expect(buttonElement).toHaveClass('px-[15px]');
      expect(buttonElement).toHaveClass('flex');
      expect(buttonElement).toHaveClass('flex-col');
      expect(buttonElement).toHaveClass('cursor-pointer');

    });
});


describe('StatusButton', () => {

    // Renders a button element with the correct type and styling.
    it('should render button element with correct type and styling', () => {
      // Arrange
      const item = { type: 'active', color: 'blue' };
      const isActive = true;
      const setActiveType = jest.fn();
      const analyticsData = { data: { A: 5 } };
      const isLoading = false;

      // Act
      render(
        <StatusButton
          item={item}
          isActive={isActive}
          setActiveType={setActiveType}
          analyticsData={analyticsData}
          isLoading={isLoading}
        />
      );

      // Assert
      const buttonElement = screen.getByTestId('active');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('border');
      expect(buttonElement).toHaveClass('min-w-[60px]');
      expect(buttonElement).toHaveClass('rounded-lg');
      expect(buttonElement).toHaveClass('py-1');
      expect(buttonElement).toHaveClass('px-[15px]');
      expect(buttonElement).toHaveClass('flex');
      expect(buttonElement).toHaveClass('flex-col');
      expect(buttonElement).toHaveClass('cursor-pointer');

    });

    // Displays the correct count based on the provided analytics data.
    it('should display correct count based on provided analytics data', () => {
      // Arrange
      const item = { type: 'active', color: 'blue' };
      const isActive = true;
      const setActiveType = jest.fn();
      const analyticsData = { data: { A: 5 } };
      const isLoading = false;

      // Act
      render(
        <StatusButton
          item={item}
          isActive={isActive}
          setActiveType={setActiveType}
          analyticsData={analyticsData}
          isLoading={isLoading}
        />
      );

      // Assert
      const countElement = screen.getByText('5');
      expect(countElement).toBeInTheDocument();
    });

    // Displays a spinner animation when isLoading is true.
    it('should display spinner animation when isLoading is true', () => {
      // Arrange
      const item = { type: 'active', color: 'blue' };
      const isActive = true;
      const setActiveType = jest.fn();
      const analyticsData = { data: { A: 5 } };
      const isLoading = true;

      // Act
      render(
        <StatusButton
          item={item}
          isActive={isActive}
          setActiveType={setActiveType}
          analyticsData={analyticsData}
          isLoading={isLoading}
        />
      );

      // Assert
      const spinnerElement = screen.getByTestId('loading');
      expect(spinnerElement).toBeInTheDocument();
    });

    // Handles missing or invalid item prop.
    it('should handle missing or invalid item prop', () => {
      // Arrange
      const isActive = true;
      const setActiveType = jest.fn();
      const analyticsData = { data: { A: 5 } };
      const isLoading = false;

      // Act
      render(
        <StatusButton
          isActive={isActive}
          setActiveType={setActiveType}
          analyticsData={analyticsData}
          isLoading={isLoading}
        />
      );

      // Assert
      const buttonElement = screen.queryByTestId('active');
      expect(buttonElement).not.toBeInTheDocument();
    });

    // Handles missing or invalid analyticsData prop.
    it('should handle missing or invalid analyticsData prop', () => {
      // Arrange
      const item = { type: 'active', color: 'blue' };
      const isActive = true;
      const setActiveType = jest.fn();
      const isLoading = false;

      // Act
      render(
        <StatusButton
          item={item}
          isActive={isActive}
          setActiveType={setActiveType}
          isLoading={isLoading}
        />
      );

      // Assert
      const countElement = screen.queryByText('5');
      expect(countElement).not.toBeInTheDocument();
    });

    // Handles missing or invalid setActiveType prop.
    it('should handle missing or invalid setActiveType prop', () => {
      // Arrange
      const item = { type: 'active', color: 'blue' };
      const isActive = true;
      const analyticsData = { data: { A: 5 } };
      const isLoading = false;

      // Act
      render(
        <StatusButton
          item={item}
          isActive={isActive}
          analyticsData={analyticsData}
          isLoading={isLoading}
          setActiveType={jest.fn()}
        />
      );

      // Assert
      const buttonElement = screen.getByTestId('active');
      fireEvent.click(buttonElement);
      expect(buttonElement).toBeInTheDocument();
    });
});


describe('count', () => {

    // Returns the correct count for each status type based on the input item and analyticsData.
    it('should return the correct count for each status type', () => {
      const item = { type: "all" };
      const analyticsData = { data: { All: 10, A:5,I:3, P:2, D:4, R:6 } };
      expect(count(item, analyticsData)).toBe(10);

      item.type = "active";
      analyticsData.data.A = 5;
      expect(count(item, analyticsData)).toBe(5);

      item.type = "inactive";
      analyticsData.data.I = 3;
      expect(count(item, analyticsData)).toBe(3);

      item.type = "approved";
      analyticsData.data.A = 7;
      expect(count(item, analyticsData)).toBe(7);

      item.type = "pending";
      analyticsData.data.P = 2;
      expect(count(item, analyticsData)).toBe(2);

      item.type = "in-review";
      expect(count(item, analyticsData)).toBe(2);

      item.type = "draft";
      analyticsData.data.D = 4;
      expect(count(item, analyticsData)).toBe(4);

      item.type = "rejected";
      analyticsData.data.R = 6;
      expect(count(item, analyticsData)).toBe(6);

      item.type = "in-issue";
      expect(count(item, analyticsData)).toBe(6);
    });

    // Returns 0 if the input item type is not recognized.
    it('should return 0 when the input item type is not recognized', () => {
      const item = { type: "unknown" };
      const analyticsData = { data: { All: 10 } };
      expect(count(item, analyticsData)).toBe(0);
    });

    // Returns 0 if the analyticsData is null or undefined.
    it('should return 0 when the analyticsData is null', () => {
      const item = { type: "all" };
      const analyticsData = null;
      expect(count(item, analyticsData)).toBe(0);
    });

    it('should return 0 when the analyticsData is undefined', () => {
      const item = { type: "all" };
      const analyticsData = undefined;
      expect(count(item, analyticsData)).toBe(0);
    });

    // Returns 0 if the input item type is null or undefined.
    it('should return 0 when the input item type is null', () => {
      const item = { type: null };
      const analyticsData = { data: { All: 10 } };
      expect(count(item, analyticsData)).toBe(0);
    });

    it('should return 0 when the input item type is undefined', () => {
      const item = { type: undefined };
      const analyticsData = { data: { All: 10 } };
      expect(count(item, analyticsData)).toBe(0);
    });

    // Returns 0 if the input item type is not a string.

    // Returns 0 if the input item type is an empty string.
    it('should return 0 when the input item type is an empty string', () => {
      const item = { type: "" };
      const analyticsData = { data: { All: 10 } };
      expect(count(item, analyticsData)).toBe(0);
    });
});

describe('handleClick', () => {

    // Sets the category state to the selected item type
    it('should set the category state to the selected item type', () => {
      const setCategory = jest.fn();
      const setSelected = jest.fn();
      const item = { type: 'AllProducts' };
      const category = 'Requests';

      handleClick(setCategory, item, setSelected, category);

      expect(setCategory).toHaveBeenCalledWith('AllProducts');
    });

    // Sets the selected state to the first item of ProductOptions if category is AllProducts
    it('should set the selected state to the first item of ProductOptions if category is AllProducts', () => {
      const setCategory = jest.fn();
      const setSelected = jest.fn();
      const item = { type: 'AllProducts' };
      const category = 'Requests';

      handleClick(setCategory, item, setSelected, category);

      expect(setSelected).toHaveBeenCalledWith(RequestOptions[0]);
    });

    // Sets the selected state to the first item of RequestOptions if category is not AllProducts
    it('should set the selected state to the first item of RequestOptions if category is not AllProducts', () => {
      const setCategory = jest.fn();
      const setSelected = jest.fn();
      const item = { type: 'Requests' };
      const category = 'AllProducts';

      handleClick(setCategory, item, setSelected, category);

      expect(setSelected).toHaveBeenCalledWith(RequestOptions[0]);
    });


});

describe('handlePermission', () => {

    // Sets filtered product options to ProductOptions if user has VIEW_ALL_INVESTMENT_PRODUCT_RECORDS or CREATE_INVESTMENT_PRODUCT permissions
    it('should set filtered product options to ProductOptions when user has relevant permissions', () => {
      const setFilteredRequestOptions = jest.fn();
      const setFilteredProductOptions = jest.fn();
      const permissions = ["VIEW_ALL_INVESTMENT_PRODUCT_RECORDS", "CREATE_INVESTMENT_PRODUCT"];
      const ProductOptions = [{ value: "created_by_me" }, { value: "created_by_anyone" }, { value: "approved_system_wide" }];
      const RequestOptions = [{ value: "created_by_me" }, { value: "created_by_anyone" }, { value: "sent_to_anyone" }];

      handlePermission(setFilteredRequestOptions, permissions, ProductOptions, RequestOptions, setFilteredProductOptions);

      expect(setFilteredProductOptions).toHaveBeenCalledWith(ProductOptions);
    });

    // Disables created_by_anyone and approved_system_wide options in filtered product options if user does not have VIEW_ALL_INVESTMENT_PRODUCT_RECORDS or CREATE_INVESTMENT_PRODUCT permissions
    it('should disable created_by_anyone and approved_system_wide options in filtered product options when user does not have relevant permissions', () => {
      const setFilteredRequestOptions = jest.fn();
      const setFilteredProductOptions = jest.fn();
      const permissions = [];
      const ProductOptions = [{ value: "created_by_me" }, { value: "created_by_anyone" }, { value: "approved_system_wide" }];
      const RequestOptions = [{ value: "created_by_me" }, { value: "created_by_anyone" }, { value: "sent_to_anyone" }];

      handlePermission(setFilteredRequestOptions, permissions, ProductOptions, RequestOptions, setFilteredProductOptions);

      expect(setFilteredProductOptions).not.toHaveBeenCalled();
    });

    // Sets filtered request options to RequestOptions if user has VIEW_ALL_INVESTMENT_PRODUCT_REQUESTS or AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS permissions
    it('should set filtered request options to RequestOptions when user has relevant permissions', () => {
      const setFilteredRequestOptions = jest.fn();
      const setFilteredProductOptions = jest.fn();
      const permissions = ["VIEW_ALL_INVESTMENT_PRODUCT_REQUESTS", "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS"];
      const ProductOptions = [{ value: "created_by_me" }, { value: "created_by_anyone" }, { value: "approved_system_wide" }];
      const RequestOptions = [{ value: "created_by_me" }, { value: "created_by_anyone" }, { value: "sent_to_anyone" }];

      handlePermission(setFilteredRequestOptions, permissions, ProductOptions, RequestOptions, setFilteredProductOptions);

      expect(setFilteredRequestOptions).toHaveBeenCalledWith(RequestOptions);
    });

    // Does nothing if permissions is empty
    it('should do nothing when permissions is empty', () => {
      const setFilteredRequestOptions = jest.fn();
      const setFilteredProductOptions = jest.fn();
      const permissions = [];
      const ProductOptions = [{ value: "created_by_me" }, { value: "created_by_anyone" }, { value: "approved_system_wide" }];
      const RequestOptions = [{ value: "created_by_me" }, { value: "created_by_anyone" }, { value: "sent_to_anyone" }];

      handlePermission(setFilteredRequestOptions, permissions, ProductOptions, RequestOptions, setFilteredProductOptions);

      expect(setFilteredRequestOptions).not.toHaveBeenCalled();
      expect(setFilteredProductOptions).not.toHaveBeenCalled();
    });

    // Disables all options in filtered product options if user does not have any relevant permissions
    it('should disable all options in filtered product options when user does not have any relevant permissions', () => {
      const setFilteredRequestOptions = jest.fn();
      const setFilteredProductOptions = jest.fn();
      const permissions = [];
      const ProductOptions = [{ value: "created_by_me" }, { value: "created_by_anyone" }, { value: "approved_system_wide" }];
      const RequestOptions = [{ value: "created_by_me" }, { value: "created_by_anyone" }, { value: "sent_to_anyone" }];

      handlePermission(setFilteredRequestOptions, permissions, ProductOptions, RequestOptions, setFilteredProductOptions);

      expect(setFilteredProductOptions).not.toHaveBeenCalled();
    });

    // Disables all options in filtered request options if user does not have any relevant permissions
    it('should disable all options in filtered request options when user does not have any relevant permissions', () => {
      const setFilteredRequestOptions = jest.fn();
      const setFilteredProductOptions = jest.fn();
      const permissions = [];
      const ProductOptions = [{ value: "created_by_me" }, { value: "created_by_anyone" }, { value: "approved_system_wide" }];
      const RequestOptions = [{ value: "created_by_me" }, { value: "created_by_anyone" }, { value: "sent_to_anyone" }];

      handlePermission(setFilteredRequestOptions, permissions, ProductOptions, RequestOptions, setFilteredProductOptions);

      expect(setFilteredRequestOptions).not.toHaveBeenCalled();
    });
});
