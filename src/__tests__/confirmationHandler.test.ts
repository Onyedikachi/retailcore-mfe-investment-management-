import { confirmationHandler } from "../components/table/confirmationHandler"

describe("confirmationHandler", () => {
    const deleteRequest = jest.fn();
    const setIsDeactivationOpen = jest.fn();
    const activateProduct = jest.fn();
    const notify = jest.fn();
    const navigate = jest.fn();
    const detail = { id: 1 };
    it("should call deleteRequest when action includes the word 'delete '", () => {

        const action = "Delete Draft";

        confirmationHandler({ action, detail, deleteRequest, setIsDeactivationOpen, activateProduct, notify, navigate });

        expect(deleteRequest).toHaveBeenCalledWith(detail.id);
        expect(setIsDeactivationOpen).not.toHaveBeenCalled();
        expect(activateProduct).not.toHaveBeenCalled();
        expect(notify).not.toHaveBeenCalled();
        expect(navigate).not.toHaveBeenCalled();
    });

    
    it("Should run if action == 'deactivate'", () => {
        const action = "deactivate"
        confirmationHandler({ action, detail, deleteRequest, setIsDeactivationOpen, activateProduct, notify, navigate });
        expect(setIsDeactivationOpen).toBeCalledWith(true);
    })

    it("Should run if action == 'activate'", () => {
        const action = "activate"
        confirmationHandler({ action, detail, deleteRequest, setIsDeactivationOpen, activateProduct, notify, navigate });
        expect(activateProduct).toBeCalledWith(detail);
    })

    it("Should run if action == 'modify'", () => {
        const action = "modify"
        confirmationHandler({ action, detail, deleteRequest, setIsDeactivationOpen, activateProduct, notify, navigate });
        expect(activateProduct).toBeCalledWith(detail);
    })

    it("Should run if action == 'withdraw-modify'", () => {
        const action = "withdraw-modify"
        confirmationHandler({ action, detail, deleteRequest, setIsDeactivationOpen, activateProduct, notify, navigate });
        expect(activateProduct).toBeCalledWith(detail);
    })

})