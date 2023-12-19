import handleVerdict from "../../../components/summary/handleVerdict"
import { Prompts } from "../../../constants/enums"
describe('handleVerdict', () => {
    const setConfirmText = jest.fn();
    const setAction = jest.fn();
    const setIsConfirmOpen = jest.fn();
    it(`should call setConfirmText with "${Prompts.PRODUCT_CREATION_APPROVE}" if value === approve and sub_type == null`, () => {
        const value = "approve";
        const sub_type = null;
        const process = "create";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.PRODUCT_CREATION_APPROVE)
    })
    it(`should call setConfirmText with "${Prompts.PRODUCT_CREATION_REJECT}" if value === reject and sub_type == null`, () => {
        const value = "reject";
        const sub_type = null;
        const process = "create";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.PRODUCT_CREATION_REJECT)
    })

    it(`should call setConfirmText with "${Prompts.PRODUCT_ACTIVATION_APPROVE}" if value === approve and sub_type == 'activate'`, () => {
        const value = "approve";
        const sub_type = "activation";
        const process = "create";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.PRODUCT_ACTIVATION_APPROVE)
    })
    it(`should call setConfirmText with "${Prompts.PRODUCT_ACTIVATION_REJECT}" if value === reject and sub_type == 'activate'`, () => {
        const value = "reject";
        const sub_type = "activation";
        const process = "create";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.PRODUCT_ACTIVATION_REJECT)
    })
    it(`should call setConfirmText with "${Prompts.PRODUCT_DEACTIVATION_APPROVE}" if value === approve and sub_type == 'deactivation'`, () => {
        const value = "approve";
        const sub_type = "deactivation";
        const process = "create";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.PRODUCT_DEACTIVATION_APPROVE)
    })
    it(`should call setConfirmText with "${Prompts.PRODUCT_ACTIVATION_REJECT}" if value === reject and sub_type == 'activate'`, () => {
        const value = "reject";
        const sub_type = "deactivation";
        const process = "create";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.PRODUCT_DEACTIVATION_REJECT)
    })
    it(`should call setConfirmText with "${Prompts.PRODUCT_MODIFY_APPROVE}" if value === approve and sub_type == 'modify'`, () => {
        const value = "approve";
        const sub_type = "modification";
        const process = "create";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.PRODUCT_MODIFY_APPROVE)
    })
    it(`should call setConfirmText with "${Prompts.PRODUCT_ACTIVATION_REJECT} "if value === reject and sub_type == 'modify'`, () => {
        const value = "reject";
        const sub_type = "modification";
        const process = "create";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.PRODUCT_DEACTIVATION_REJECT)
    })

    it(`should call setConfirmText with "${Prompts.CANCEL_CREATION}" if value === cancel and process == 'create'`, () => {
        const value = "cancel";
        const sub_type = "modification";
        const process = "create";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.CANCEL_CREATION)
    })
    it(`should call setConfirmText with "${Prompts.CANCEL_CREATION}" if value === cancel and process == 'clone'`, () => {
        const value = "cancel";
        const sub_type = "modification";
        const process = "clone";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.CANCEL_CREATION)
    })
    it(`should call setConfirmText with "${Prompts.CANCEL_CREATION}" if value === cancel and process == 'continue'`, () => {
        const value = "cancel";
        const sub_type = "modification";
        const process = "continue";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.CANCEL_CREATION)
    })
    it(`should call setConfirmText with "${Prompts.CANCEL_MODIFICATION}" if value === cancel and process == 'modify'`, () => {
        const value = "cancel";
        const sub_type = "modification";
        const process = "modify";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.CANCEL_MODIFICATION)
    })
    it(`should call setConfirmText with "${Prompts.CANCEL_MODIFICATION}" if value === cancel and process == 'withdraw_modify'`, () => {
        const value = "cancel";
        const sub_type = "modification";
        const process = "withdraw_modify";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.CANCEL_MODIFICATION)
    })
    it(`should call setConfirmText with "${Prompts.CANCEL_PROCESS}" if value === cancel and process == 'verdict'`, () => {
        const value = "cancel";
        const sub_type = "modification";
        const process = "verdict";
        handleVerdict({ value, sub_type, process, setAction, setIsConfirmOpen, setConfirmText });
        expect(setConfirmText).toBeCalledWith(Prompts.CANCEL_PROCESS)
    })
    
});
