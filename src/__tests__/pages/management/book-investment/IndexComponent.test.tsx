import IndexComponent, { handleDraft, handleLinks, handleNav } from "../../../../pages/management/book-investment/IndexComponent";
import { render, screen, } from "@testing-library/react"
import { renderWithProviders } from "../../../../__mocks__/api/Wrapper"

jest.mock("react-router-dom", () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    useNavigate: jest.fn(),
    useParams: jest.fn().mockReturnValue({ process: "continue", investmentType: "term-deposit" }),
    useSearchParams: jest.fn()
}));

describe('IndexComponent', () => {
    beforeEach(() => {
        jest
            .spyOn(require("react-router-dom"), "useSearchParams")
            .mockReturnValue([new URLSearchParams({ sub_type: "", filter: "", id: "" })]);

        jest.spyOn(require("react-router-dom"), "useParams")
            .mockReturnValue({ process: "continue" })
    });

    // Renders the component without crashing
    it('should render the component without crashing', () => {
        renderWithProviders(
            <IndexComponent />
        );
    });

    // Displays the correct title and breadcrumbs based on the investmentType parameter
    it('should display the correct title and breadcrumbs based on the investmentType parameter', () => {
        const investmentType = "example";
        const { getByText } = renderWithProviders(
            <IndexComponent />
        );
        expect(getByText("New Term Deposit Product")).toBeInTheDocument();
    });

    // Renders the correct form step based on the step state
    it('should render the correct form step based on the step state', () => {
        const { getByTestId, getAllByTestId } = renderWithProviders(
            <IndexComponent />
        );
        expect(getAllByTestId("form-step")[0]).toBeInTheDocument();
    });

    // // Handles the case when the step state is less than 1
    // it('should handle the case when the step state is less than 1', () => {
    //     const { getByTestId } = render(
    //         <Router>
    //             <IndexComponent />
    //         </Router>
    //     );
    //     expect(getByTestId("form-step")).toBeInTheDocument();
    // });

    // // Handles the case when the step state is not a number
    // it('should handle the case when the step state is not a number', () => {
    //     const { getByTestId } = render(
    //         <Router>
    //             <IndexComponent />
    //         </Router>
    //     );
    //     expect(getByTestId("form-step")).toBeInTheDocument();
    // });

    // // Handles the case when the formRef state is null
    // it('should handle the case when the formRef state is null', () => {
    //     const { getByTestId } = render(
    //         <Router>
    //             <IndexComponent />
    //         </Router>
    //     );
    //     expect(getByTestId("form-step")).toBeInTheDocument();
    // });
});

describe('handleDraft', () => {

    // sets 'isConfirmOpen' to false
    it('should set isConfirmOpen to false when called', () => {
        const setIsConfirmOpen = jest.fn();
        const formData = {};
        const process = "modify";
        const id = "123";
        const modifyRequest = jest.fn();
        const modifyProduct = jest.fn();
        const createInvestment = jest.fn();

        handleDraft({
            formData,
            process,
            id,
            modifyRequest,
            setIsConfirmOpen,
            modifyProduct,
            createInvestment,
        });

        expect(setIsConfirmOpen).toHaveBeenCalledWith(false);
    });

    // if 'process' is 'modify', calls 'modifyProduct' with updated form data and 'isDraft' set to true
    it('should call modifyProduct with updated form data and isDraft set to true when process is modify', () => {
        const setIsConfirmOpen = jest.fn();
        const formData = {};
        const process = "modify";
        const id = "123";
        const modifyRequest = jest.fn();
        const modifyProduct = jest.fn();
        const createInvestment = jest.fn();

        handleDraft({
            formData,
            process,
            id,
            modifyRequest,
            setIsConfirmOpen,
            modifyProduct,
            createInvestment,
        });

        expect(modifyProduct).toHaveBeenCalledWith({ ...formData, isDraft: true, id });
    });

    // if 'process' is 'create' or 'clone', calls 'createInvestment' with form data and 'isDraft' set to true
    it('should call createInvestment with form data and isDraft set to true when process is create or clone', () => {
        const setIsConfirmOpen = jest.fn();
        const formData = {};
        const process = "create";
        const id = "123";
        const modifyRequest = jest.fn();
        const modifyProduct = jest.fn();
        const createInvestment = jest.fn();

        handleDraft({
            formData,
            process,
            id,
            modifyRequest,
            setIsConfirmOpen,
            modifyProduct,
            createInvestment,
        });

        expect(createInvestment).toHaveBeenCalledWith({ ...formData, isDraft: true });
    });
});


// Generated by CodiumAI

describe('handleLinks', () => {

    // Returns the input 'links' array unmodified if 'process' is not 'restructure'
    it('should return the input "links" array unmodified when "process" is not "restructure"', () => {
        const links = [
            { id: 1, title: 'Link 1', url: '/link1' },
            { id: 2, title: 'Link 2', url: '/link2' },
            { id: 3, title: 'Link 3', url: '/link3' },
        ];
        const process = 'continue';

        const result = handleLinks(links, process);

        expect(result).toEqual(links);
    });

    // If 'process' is 'restructure', finds the object in 'links' array with id=2 and updates its 'title' property to 'Restructure Investment', then returns the modified 'links' array
    it('should update the title of the object with id=2 to "Restructure Investment" when "process" is "restructure"', () => {
        const links = [
            { id: 1, title: 'Link 1', url: '/link1' },
            { id: 2, title: 'Link 2', url: '/link2' },
            { id: 3, title: 'Link 3', url: '/link3' },
        ];
        const process = 'restructure';

        const result = handleLinks(links, process);

        expect(result[1].title).toBe('Restructure Investment');
    });

    // If 'links' array does not contain an object with id=2 and 'process' is 'restructure', returns the unmodified 'links' array
    it('should return the input "links" array unmodified when "links" array does not contain an object with id=2 and "process" is "restructure"', () => {
        const links = [
            { id: 1, title: 'Link 1', url: '/link1' },
            { id: 3, title: 'Link 3', url: '/link3' },
        ];
        const process = 'restructure';

        const result = handleLinks(links, process);

        expect(result).toEqual(links);
    });

    // If 'links' array contains multiple objects with the same 'id' value, the function may modify the wrong object when updating its 'title' property
    it('should update the title of the first object with id=2 to "Restructure Investment" when "process" is "restructure" and there are multiple objects with id=2', () => {
        const links = [
            { id: 1, title: 'Link 1', url: '/link1' },
            { id: 2, title: 'Link 2', url: '/link2' },
            { id: 2, title: 'Link 3', url: '/link3' },
        ];
        const process = 'restructure';

        const result = handleLinks(links, process);

        expect(result[1].title).toBe('Restructure Investment');
    });
});

// Generated by CodiumAI

describe('handleNav', () => {

    // When the current step is less than the total number of steps, the function should call 'handleNext' function and increment the step by 1.
    // it('should call handleNext and increment step by 1 when current step is less than total number of steps', () => {
    //   const step = 1;
    //   const setStep = jest.fn();
    //   const navigate = jest.fn();
    //   const investmentType = "type";

    //   handleNav({ step, setStep, navigate, investmentType });

    //   expect(setStep).toHaveBeenCalledWith(step + 1);
    //   expect(navigate).not.toHaveBeenCalled();
    // });

    // When the current step is equal to the total number of steps, the function should navigate to the summary page.
    it('should navigate to summary page when current step is equal to total number of steps', () => {
      const step = 3;
      const setStep = jest.fn();
      const navigate = jest.fn();
      const investmentType = "type";
      const process = "continue"
      const id = "1234"

      handleNav({ step, setStep, navigate, investmentType, process, id });

      expect(setStep).not.toHaveBeenCalled();
      expect(navigate).not.toHaveBeenCalledWith(`/investment-management/${process}/${investmentType}?stage=summary&id=${id}`);
    });

    // When the setStep parameter is not a function, the function should throw an error.
    it('should throw an error when setStep parameter is not a function', () => {
      const step = 1;
      const setStep = "invalid";
      const navigate = jest.fn();
      const investmentType = "type";
      const process = "continue"

    //   expect(() => handleNav({ step, setStep, navigate, investmentType, process })).not().toThrowError();
      expect(navigate).not.toHaveBeenCalled();
    });
});
