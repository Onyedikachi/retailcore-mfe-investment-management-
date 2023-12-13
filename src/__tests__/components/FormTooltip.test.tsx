import React from "react";
import { render, fireEvent, screen, getByTestId, waitFor } from "@testing-library/react";
import FormToolTip from "../../components/FormToolTip"
import { act } from "react-dom/test-utils";
import {renderWithProviders} from "../../utils/test-util"

describe("FormToolTip", () => {
    it("Renders without errors", () => {
        render(<FormToolTip tip="You can change value by typing"/>);
    })
})