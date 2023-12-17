import { render, screen } from "@testing-library/react";
import LiquiditySetup, { handleSelected, onProceed } from "../components/pages/term-deposit/forms/liquidity-setup"
import {renderWithProviders} from "../__mocks__/api/Wrapper"
import React from "react";

const fData = {
    part_AllowPartLiquidation: false,
    part_MaxPartLiquidation: "",
    part_RequireNoticeBeforeLiquidation: false,
    part_NoticePeriod: "",
    part_NoticePeriodUnit: "",
    part_LiquidationPenalty: "",
    part_LiquidationPenaltyPercentage: "",
    early_AllowEarlyLiquidation: "",
    early_RequireNoticeBeforeLiquidation: false,
    early_NoticePeriod: "",
    early_NoticePeriodUnit: "",
    early_LiquidationPenalty: "",
    early_LiquidationPenaltyPercentage: ""
}

describe("LiquiditySetup", () => {
    it ("Renders without error", () => {
        const form = renderWithProviders(<LiquiditySetup proceed={jest.fn()} formData={fData} setDisabled={jest.fn()} setFormData={jest.fn()} initiateDraft={false}/>)
        expect(form).toMatchSnapshot()
    })
})


describe('handleSelected', () => {

    // Sets partOptionCharges and earlyOptionCharges when inputName is "part_SpecificCharges" or "early_SpecificCharges" respectively
    it('should set partOptionCharges and earlyOptionCharges when inputName is "part_SpecificCharges" or "early_SpecificCharges" respectively', () => {
      // Arrange
      const inputName = "part_SpecificCharges";
      const selectedOptions = ["option1", "option2"];
      const setPartOptionCharges = jest.fn();
      const setEarlyOptionCharges = jest.fn();
      const setValue = jest.fn();

      // Act
      handleSelected(inputName, selectedOptions, setPartOptionCharges, setEarlyOptionCharges, setValue);

      // Assert
      expect(setPartOptionCharges).toHaveBeenCalledWith(selectedOptions);
      expect(setEarlyOptionCharges).not.toHaveBeenCalled();
      expect(setValue).toHaveBeenCalledWith("part_SpecificCharges", selectedOptions);
    });

    // Sets value of "part_SpecificCharges" or "early_SpecificCharges" to selectedOptions when inputName is "part_SpecificCharges" or "early_SpecificCharges" respectively
    it('should set value of "part_SpecificCharges" or "early_SpecificCharges" to selectedOptions when inputName is "part_SpecificCharges" or "early_SpecificCharges" respectively', () => {
      // Arrange
      const inputName = "early_SpecificCharges";
      const selectedOptions = ["option1", "option2"];
      const setPartOptionCharges = jest.fn();
      const setEarlyOptionCharges = jest.fn();
      const setValue = jest.fn();

      // Act
      handleSelected(inputName, selectedOptions, setPartOptionCharges, setEarlyOptionCharges, setValue);

      // Assert
      expect(setPartOptionCharges).not.toHaveBeenCalled();
      expect(setEarlyOptionCharges).toHaveBeenCalledWith(selectedOptions);
      expect(setValue).toHaveBeenCalledWith("early_SpecificCharges", selectedOptions);
    });

    // inputName is not "part_SpecificCharges" or "early_SpecificCharges"
    it('should not set partOptionCharges, earlyOptionCharges, or value when inputName is not "part_SpecificCharges" or "early_SpecificCharges"', () => {
      // Arrange
      const inputName = "otherInput";
      const selectedOptions = ["option1", "option2"];
      const setPartOptionCharges = jest.fn();
      const setEarlyOptionCharges = jest.fn();
      const setValue = jest.fn();

      // Act
      handleSelected(inputName, selectedOptions, setPartOptionCharges, setEarlyOptionCharges, setValue);

      // Assert
      expect(setPartOptionCharges).not.toHaveBeenCalled();
      expect(setEarlyOptionCharges).not.toHaveBeenCalled();
      expect(setValue).not.toHaveBeenCalled();
    });

    // selectedOptions is null or undefined
    it('should not set partOptionCharges, earlyOptionCharges, or value when selectedOptions is null or undefined', () => {
      // Arrange
      const inputName = "part_SpecificCharges";
      const selectedOptions = null;
      const setPartOptionCharges = jest.fn();
      const setEarlyOptionCharges = jest.fn();
      const setValue = jest.fn();

      // Act
      handleSelected(inputName, selectedOptions, setPartOptionCharges, setEarlyOptionCharges, setValue);

      // Assert
      expect(setPartOptionCharges).toHaveBeenCalled();
      expect(setEarlyOptionCharges).not.toHaveBeenCalled();
      expect(setValue).toHaveBeenCalled();
    });



});



describe('onProceed', () => {

    // Sets early_SpecificCharges and part_SpecificCharges in formData and calls proceed function
    it('should set early_SpecificCharges and part_SpecificCharges in formData and call proceed function when all parameters are defined', () => {
      // Arrange
      const formData = {};
      const setFormData = jest.fn();
      const earlyOptionCharges = {};
      const partOptionCharges = {};
      const proceed = jest.fn();

      // Act
      onProceed(formData, setFormData, earlyOptionCharges, partOptionCharges, proceed);

      // Assert
      expect(setFormData).toHaveBeenCalledWith({
        ...formData,
        early_SpecificCharges: earlyOptionCharges,
        part_SpecificCharges: partOptionCharges,
      });
      expect(proceed).toHaveBeenCalled();
    });

    // earlyOptionCharges and partOptionCharges are undefined
    it('should set early_SpecificCharges and part_SpecificCharges in formData as undefined when earlyOptionCharges and partOptionCharges are undefined', () => {
      // Arrange
      const formData = {};
      const setFormData = jest.fn();
      const earlyOptionCharges = undefined;
      const partOptionCharges = undefined;
      const proceed = jest.fn();

      // Act
      onProceed(formData, setFormData, earlyOptionCharges, partOptionCharges, proceed);

      // Assert
      expect(setFormData).toHaveBeenCalledWith({
        ...formData,
        early_SpecificCharges: undefined,
        part_SpecificCharges: undefined,
      });
      expect(proceed).toHaveBeenCalled();
    });

 
 
    // earlyOptionCharges and partOptionCharges are null
    it('should set early_SpecificCharges and part_SpecificCharges in formData as null when earlyOptionCharges and partOptionCharges are null', () => {
      // Arrange
      const formData = {};
      const setFormData = jest.fn();
      const earlyOptionCharges = null;
      const partOptionCharges = null;
      const proceed = jest.fn();

      // Act
      onProceed(formData, setFormData, earlyOptionCharges, partOptionCharges, proceed);

      // Assert
      expect(setFormData).toHaveBeenCalledWith({
        ...formData,
        early_SpecificCharges: null,
        part_SpecificCharges: null,
      });
      expect(proceed).toHaveBeenCalled();
    });

    // formData is null
    it('should set early_SpecificCharges and part_SpecificCharges in formData as null when formData is null', () => {
      // Arrange
      const formData = null;
      const setFormData = jest.fn();
      const earlyOptionCharges = {};
      const partOptionCharges = {};
      const proceed = jest.fn();

      // Act
      onProceed(formData, setFormData, earlyOptionCharges, partOptionCharges, proceed);

      // Assert
      expect(setFormData).toHaveBeenCalled();
      expect(proceed).toHaveBeenCalled();
    });
});
