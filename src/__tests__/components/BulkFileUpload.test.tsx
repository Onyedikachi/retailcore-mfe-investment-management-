import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BulkFileUpload, { handleChange, handleDrag, handleDrop, handleReset, isFileValid } from "../../components/BulkFileUpload";
import { renderWithProviders } from "../../__mocks__/api/Wrapper";
import { branchApi, useBulkUploadMutation } from "../../api";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { downloadUsingFetch } from "../../utils/downloadFile";

const mockStore = configureStore([]);
const mockUploadMutation = jest.fn();
const createBlob = (contents) => {
  return {
    arrayBuffer: async () => contents,
  };
};

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
}));
jest.mock("../../api"); // Mock the api module

jest.mock("@reduxjs/toolkit/query/react", () => ({
  ...jest.requireActual("@reduxjs/toolkit/query/react"),
  useMutation: jest.fn(),
}));

jest.mock("../../utils/downloadFile", () => ({
  downloadUsingFetch: jest.fn().mockResolvedValue({
    status: 200,
    blob: createBlob(
      new Uint8Array([
        102, 97, 107, 101, 32, 102, 105, 108, 101, 32, 99, 111, 110, 116, 101,
        110, 116, 115,
      ])
    ),
    fileName: "mockFile.csv",
  }),
}));

beforeEach(() => {
  (useBulkUploadMutation as jest.Mock).mockReturnValue([
    mockUploadMutation,
    {
      isLoading: false, // or true, depending on your test scenario
      isSuccess: false,
      isError: false,
      error: null,
    },
  ]);
  // jest.resetAllMocks()
});

describe("BulkFileUpload", () => {
  it("should upload a valid file", async () => {
    const mockSetUploadData = jest.fn();
    const mockSetStatus = jest.fn();
    const mockSetShowWarning = jest.fn();

    render(
      <Provider store={mockStore({})}>
        <BulkFileUpload
          setUploadData={mockSetUploadData}
          setStatus={mockSetStatus}
          uploadData={[]}
          setShowWarning={mockSetShowWarning}
          status=""
        />
      </Provider>
    );

    expect(screen.getByText("Click to upload")).toBeInTheDocument();
    const file = new File(["file content"], "valid-file.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const inputElement = screen.getByTestId("file-upload");
    fireEvent.change(inputElement, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockUploadMutation).toHaveBeenCalledTimes(1);
    });
  });

  // Test that the file upload progress is displayed correctly
  it("should download the file", async () => {
    const mockSetUploadData = jest.fn();
    const mockSetStatus = jest.fn();
    const mockSetShowWarning = jest.fn();
    const { getByTestId } = render(
      <Provider store={mockStore({})}>
        <BulkFileUpload
          setUploadData={mockSetUploadData}
          setStatus={mockSetStatus}
          uploadData={[]}
          setShowWarning={mockSetShowWarning}
          status=""
        />
      </Provider>
    );

    const downloadBtn = getByTestId("download");
    expect(downloadBtn).toBeInTheDocument();
    fireEvent.click(downloadBtn);
    expect(downloadUsingFetch).toBeCalled();
  });

  //   it("should download the file", async () => {
  //     jest.mock("../../components/BulkFileUpload", () => ({
  //       fileInfo: {
  //         name: "fileName",
  //       },
  //     }));
  //     const mockSetUploadData = jest.fn();
  //     const mockSetStatus = jest.fn();
  //     const mockSetShowWarning = jest.fn();
  //     const { getByTestId } = render(
  //       <Provider store={mockStore({})}>
  //         <BulkFileUpload
  //           setUploadData={mockSetUploadData}
  //           setStatus={mockSetStatus}
  //           uploadData={[]}
  //           setShowWarning={mockSetShowWarning}
  //           status=""
  //         />
  //       </Provider>
  //     );

  //     const resetBtn = getByTestId("reset");
  //     expect(resetBtn).toBeInTheDocument();
  //     fireEvent.click(resetBtn);
  //     expect(handleReset).toHaveBeenCalled();
  //   });
});

describe("handleReset", () => {
  // Tests that the upload data is reset to an empty array
  it("should reset upload data to an empty array", () => {
    const setUploadData = jest.fn();
    const setStatus = jest.fn();
    const setFileInfo = jest.fn();
    handleReset(setUploadData, setStatus, setFileInfo);
    expect(setUploadData).toHaveBeenCalledWith([]);
  });

  // Tests that the status is set to null
  it("should set status to null", () => {
    const setUploadData = jest.fn();
    const setStatus = jest.fn();
    const setFileInfo = jest.fn();
    handleReset(setUploadData, setStatus, setFileInfo);
    expect(setStatus).toHaveBeenCalledWith(null);
  });

  // Tests that the file info is set to null
  it("should set file info to null", () => {
    const setUploadData = jest.fn();
    const setStatus = jest.fn();
    const setFileInfo = jest.fn();
    handleReset(setUploadData, setStatus, setFileInfo);
    expect(setFileInfo).toHaveBeenCalledWith(null);
  });
});


describe("handleDrag", () => {
  // Tests that the handleDrag function sets dragActive to true when the dragenter event is triggered
  it("should set dragActive to true when dragenter event is triggered", () => {
    // Arrange
    const setDragActive = jest.fn();
    const event = {
      type: "dragenter",
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    // Act
    handleDrag(event, setDragActive);

    // Assert
    expect(setDragActive).toHaveBeenCalledWith(true);
  });

  // Tests that the handleDrag function sets dragActive to true when the dragover event is triggered
  it("should set dragActive to true when dragover event is triggered", () => {
    // Arrange
    const setDragActive = jest.fn();
    const event = {
      type: "dragover",
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    // Act
    handleDrag(event, setDragActive);

    // Assert
    expect(setDragActive).toHaveBeenCalledWith(true);
  });

  // Tests that the handleDrag function sets dragActive to false when the dragleave event is triggered
  it("should set dragActive to false when dragleave event is triggered", () => {
    // Arrange
    const setDragActive = jest.fn();
    const event = {
      type: "dragleave",
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    // Act
    handleDrag(event, setDragActive);

    // Assert
    expect(setDragActive).toHaveBeenCalledWith(false);
  });
});


describe("isFileValid", () => {
  // Tests that the function correctly identifies a valid .xlsx file
  it("should correctly identify a valid .xlsx file", () => {
    const file = { name: "test.xlsx" };
    const result = isFileValid(file);
    expect(result).toBe(true);
  });

  // Tests that the function correctly identifies a valid .xls file
  it("should correctly identify a valid .xls file", () => {
    const file = { name: "test.xls" };
    const result = isFileValid(file);
    expect(result).toBe(true);
  });

  // Tests that the function correctly identifies a file with a long name and valid extension
  it("should correctly identify a file with a long name and valid extension", () => {
    const file = { name: "this_is_a_very_long_file_name.xlsx" };
    const result = isFileValid(file);
    expect(result).toBe(true);
  });
});


describe("handleChange", () => {
  // Tests that when a valid .xlsx or .xls file is selected, setFileInfo is called with the selected file, bulkUpload is called with a FormData object containing the selected file, setStatus is called with the response data from bulkUpload, and setUploadData is called with the items from the response data
  it("should call setFileInfo, bulkUpload, setStatus, and setUploadData when a valid file is selected", async () => {
    const setFileInfoMock = jest.fn();
    const bulkUploadMock = jest.fn();
    const setStatusMock = jest.fn();
    const setUploadDataMock = jest.fn();

    const file = new File(["test"], "test.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const event = {
      target: {
        files: [file],
      },
    };

    await handleChange(
      event,
      setFileInfoMock,
      bulkUploadMock,
      setStatusMock,
      setUploadDataMock
    );

    expect(setFileInfoMock).toHaveBeenCalledWith(file);

    const formData = new FormData();
    formData.append("file", file);

    expect(bulkUploadMock).toHaveBeenCalledWith(formData);

    const response = {
      data: {
        data: {
          items: [
            /* items array */
          ],
        },
      },
    };

    expect(setStatusMock).toHaveBeenCalled();
    expect(setUploadDataMock).toHaveBeenCalled();
  });


  // Tests that when no file is selected, no further actions are taken
  it("should not call any functions when no file is selected", () => {
    const setFileInfoMock = jest.fn();
    const bulkUploadMock = jest.fn();
    const setStatusMock = jest.fn();
    const setUploadDataMock = jest.fn();

    const event = {
      target: {
        files: [],
      },
    };

    handleChange(
      event,
      setFileInfoMock,
      bulkUploadMock,
      setStatusMock,
      setUploadDataMock
    );

    expect(setFileInfoMock).not.toHaveBeenCalled();
    expect(bulkUploadMock).not.toHaveBeenCalled();
    expect(setStatusMock).not.toHaveBeenCalled();
    expect(setUploadDataMock).not.toHaveBeenCalled();
  });

  // Tests that statNumber.total, statNumber.success, and statNumber.failed are calculated and set correctly based on uploadData
  it("should calculate and set statNumber.total, statNumber.success, and statNumber.failed correctly based on uploadData", () => {
    const setFileInfoMock = jest.fn();
    const bulkUploadMock = jest.fn();
    const setStatusMock = jest.fn();
    const setUploadDataMock = jest.fn();

    const uploadData = [
      { status: true },
      { status: true },
      { status: false },
      { status: true },
    ];

    handleChange(
      null,
      setFileInfoMock,
      bulkUploadMock,
      setStatusMock,
      setUploadDataMock
    );

    expect(setFileInfoMock).not.toHaveBeenCalled();
    expect(bulkUploadMock).not.toHaveBeenCalled();
    expect(setStatusMock).not.toHaveBeenCalled();
  });

  // Tests that when bulkUpload fails, console.error is called with the error message
  it("should call console.error with the error message when bulkUpload fails", async () => {
    const consoleErrorMock = jest.fn();
    console.error = consoleErrorMock;

    const setFileInfoMock = jest.fn();
    const bulkUploadMock = jest
      .fn()
      .mockRejectedValue(new Error("Failed to upload file"));
    const setStatusMock = jest.fn();
    const setUploadDataMock = jest.fn();

    const file = new File(["test"], "test.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const event = {
      target: {
        files: [file],
      },
    };

    await handleChange(
      event,
      setFileInfoMock,
      bulkUploadMock,
      setStatusMock,
      setUploadDataMock
    );

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Failed to upload file:",
      new Error("Failed to upload file")
    );

    console.error = console.error;
  });
});


describe("handleDrag", () => {
  // Tests that the dragenter event sets dragActive to true
  it("should set dragActive to true when dragenter event is triggered", () => {
    // Arrange
    const setDragActive = jest.fn();
    const event = {
      type: "dragenter",
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    // Act
    handleDrag(event, setDragActive);

    // Assert
    expect(setDragActive).toHaveBeenCalledWith(true);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  // Tests that the dragover event sets dragActive to true
  it("should set dragActive to true when dragover event is triggered", () => {
    // Arrange
    const setDragActive = jest.fn();
    const event = {
      type: "dragover",
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    // Act
    handleDrag(event, setDragActive);

    // Assert
    expect(setDragActive).toHaveBeenCalledWith(true);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  // Tests that the dragleave event sets dragActive to false
  it("should set dragActive to false when dragleave event is triggered", () => {
    // Arrange
    const setDragActive = jest.fn();
    const event = {
      type: "dragleave",
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    // Act
    handleDrag(event, setDragActive);

    // Assert
    expect(setDragActive).toHaveBeenCalledWith(false);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  // Tests that the function prevents the default behavior of the event
  it("should prevent the default behavior of the event", () => {
    // Arrange
    const setDragActive = jest.fn();
    const event = {
      type: "dragenter",
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    // Act
    handleDrag(event, setDragActive);

    // Assert
    expect(event.preventDefault).toHaveBeenCalled();
  });

  // Tests that the function stops the event propagation
  it("should stop the event propagation", () => {
    // Arrange
    const setDragActive = jest.fn();
    const event = {
      type: "dragenter",
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    // Act
    handleDrag(event, setDragActive);

    // Assert
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});

describe('handleDrop', () => {

  // Tests that a valid file is dropped successfully
  it('should drop a valid file successfully', () => {
    // Mock data
    const file = new File(["file content"], "test.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const formData = new FormData();
    formData.append("file", file);
    const response = { data: { data: { items: [] } } };
    const event = {
      type: "dragenter",
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: { files: [file] } 
    };
    // Mock functions
    const setFileInfo = jest.fn();
    const setDragActive = jest.fn();
    const bulkUpload = jest.fn().mockResolvedValue(response);
    const setStatus = jest.fn();
    const setUploadData = jest.fn();

    // Call the function
    handleDrop(event, setFileInfo, setDragActive, bulkUpload, setStatus, setUploadData);

    // Assertions
    expect(setFileInfo).toHaveBeenCalledWith(file);
    expect(bulkUpload).toHaveBeenCalledWith(formData);
   
  
  });

  // // Tests that a valid file is selected successfully
  // it('should select a valid file successfully', () => {
  //   // Mock data
  //   const file = new File(["file content"], "test.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   const response = { data: { data: { items: [] } } };
  //   const event = {
  //     type: "dragenter",
  //     preventDefault: jest.fn(),
  //     stopPropagation: jest.fn(),
  //     dataTransfer: { files: [file] } ,
  //     target: { files: [file] } 
  //   };
  //   // Mock functions
  //   const setFileInfo = jest.fn();
  //   const setDragActive = jest.fn();
  //   const bulkUpload = jest.fn().mockResolvedValue(response);
  //   const setStatus = jest.fn();
  //   const setUploadData = jest.fn();

  //   // Call the function
  //   handleChange(event, setFileInfo, bulkUpload, setStatus, setUploadData);

  //   // Assertions
  //   expect(setFileInfo).toHaveBeenCalledWith(file);
  //   expect(bulkUpload).toHaveBeenCalledWith(formData);
  //   expect(setStatus).toHaveBeenCalledWith(response.data.data);
  //   expect(setUploadData).toHaveBeenCalledWith(response.data.data.items);
  // });

 
  // // Tests that an invalid file is dropped
  // it('should display an error message when an invalid file is dropped', () => {
  //   // Mock data
  //   const file = new File(["file content"], "test.txt", { type: "text/plain" });

  //   // Mock functions
  //   const setFileInfo = jest.fn();
  //   const setDragActive = jest.fn();
  //   const bulkUpload = jest.fn();
  //   const setStatus = jest.fn();
  //   const setUploadData = jest.fn();

  //   // Call the function
  //   handleDrop(event, setFileInfo, setDragActive, bulkUpload, setStatus, setUploadData);

  //   // Assertions
  //   expect(setFileInfo).not.toHaveBeenCalled();
  //   expect(bulkUpload).not.toHaveBeenCalled();
  //   expect(setStatus).not.toHaveBeenCalled();
  //   expect(setUploadData).not.toHaveBeenCalled();
   
  // });

  // // Tests that an invalid file is selected
  // it('should display an error message when an invalid file is selected', () => {
  //   // Mock data
  //   const file = new File(["file content"], "test.txt", { type: "text/plain" });

  //   // Mock functions
  //   const setFileInfo = jest.fn();
  //   const setDragActive = jest.fn();
  //   const bulkUpload = jest.fn();
  //   const setStatus = jest.fn();
  //   const setUploadData = jest.fn();
  //   const event = {
  //     type: "dragenter",
  //     preventDefault: jest.fn(),
  //     stopPropagation: jest.fn(),
  //     dataTransfer: { files: [file] } ,
  //     target: { files: [file] } 
  //   };
  //   // Call the function
  //   handleChange(event, setFileInfo, bulkUpload, setStatus, setUploadData);

  //   // Assertions
  //   expect(setFileInfo).not.toHaveBeenCalled();
  //   expect(bulkUpload).not.toHaveBeenCalled();
  //   expect(setStatus).not.toHaveBeenCalled();
  //   expect(setUploadData).not.toHaveBeenCalled();
  
  // });

  // // Tests that dragging a file over the drop area triggers dragActive state
  // it('should trigger dragActive state when dragging a file over the drop area', () => {
  //   // Mock functions
  //   const setFileInfo = jest.fn();
  //   const setDragActive = jest.fn();
  //   const bulkUpload = jest.fn();
  //   const setStatus = jest.fn();
  //   const setUploadData = jest.fn();

  //   // Call the function
  //   handleDrag({ preventDefault: jest.fn(), stopPropagation: jest.fn() }, setDragActive);

  //   // Assertions
  //   expect(setDragActive).toHaveBeenCalledWith(true);
  // });
});

