import { act, render, screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from "../../__mocks__/api/Wrapper"
import ProductDetail from "../../components/modals/ProductDetail"
import { InvestmentContext, AppContext } from "../../utils/context";

const details = {
  "id": "0192e82c-3784-4dee-a113-6d113d33eb01",
  
}

class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
}

describe("ProductDetail", () => {
  beforeEach(() => {
    window.ResizeObserver = ResizeObserver
  })
  it("Should show product data when available", async () => {
    const val = renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider
          value={{
            permissions: [
              "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS",
              "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"
            ],
            role: "superadmin",
            setRole: jest.fn(),
          }}
        >
          <ProductDetail handleClick={jest.fn()} setIsOpen={jest.fn()} isOpen={true} detail={details} />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    )
    expect(await screen.findByText("Free Loan")).toBeInTheDocument();
    expect(await screen.findByText("LOADNF")).toBeInTheDocument();
    expect(await screen.findByText("tHIS IS A FREE LOAN")).toBeInTheDocument();
    expect(await screen.findByText("NGN")).toBeInTheDocument();
  })
  

  it("Show spinner when loading", async () => {
    const val = renderWithProviders(
      <ProductDetail handleClick={jest.fn()} setIsOpen={jest.fn()} isOpen={true} detail={details} />
    )
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  })
  
  it ("Shows nothng when setOpen is false", () => {
    const val = renderWithProviders(
      <ProductDetail handleClick={jest.fn()} setIsOpen={jest.fn()} isOpen={false} detail={details} />
    )

    expect(val).toMatchSnapshot();
  })

})

describe("Deactivate button", () => {
  it("Should show activate button when permissions includes 'RE_OR_DEACTIVATE_INVESTMENT_PRODUCT' and state == 2", async () => {
    renderWithProviders(
      <InvestmentContext.Provider value={{}}>
        <AppContext.Provider
          value={{
            permissions: [
              "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS",
              "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"
            ],
            role: "superadmin",
            setRole: jest.fn(),
          }}
        >
          <ProductDetail handleClick={jest.fn()} setIsOpen={jest.fn()} isOpen={true} detail={details} />
        </AppContext.Provider>
      </InvestmentContext.Provider>
    )
    expect(await screen.findByText("Deactivate")).toBeInTheDocument();
  })
})

// describe("Activate button", () => {
//   it("Should show activate button when permissions includes 'RE_OR_DEACTIVATE_INVESTMENT_PRODUCT' and state == 2", async () => {
//     renderWithProviders(
//       <InvestmentContext.Provider value={{}}>
//         <AppContext.Provider
//           value={{
//             permissions: [
//               "AUTHORIZE_INVESTMENT_PRODUCT_CREATION_OR_MODIFICATION_REQUESTS",
//               "RE_OR_DEACTIVATE_INVESTMENT_PRODUCT"
//             ],
//             role: "superadmin",
//             setRole: jest.fn(),
//           }}
//         >
//           <ProductDetail handleClick={jest.fn()} setIsOpen={jest.fn()} isOpen={true} detail={{id : "randomidp"}} />
//         </AppContext.Provider>
//       </InvestmentContext.Provider>
//     )
//     expect(await screen.findByText("Deactivate")).toBeInTheDocument();
//   })
// })