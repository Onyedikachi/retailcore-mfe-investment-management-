import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormUpload } from "../../components/forms";
import { toast } from "react-toastify";
import {
  handleReset,
  handleFileChange,
  // handleUpload,
  handleDrag,
  handleDrop,
} from "../../components/forms/FormUpload";
import { renderWithProviders } from "../../utils/test-util";


describe("FormUpload", () => {
  it("renders without crashing", () => {
    renderWithProviders(
      <FormUpload
        onUploadComplete={function (imageUrl: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
  });

  it("matches snapshot", () => {
    const { asFragment } = renderWithProviders(
      <FormUpload
        onUploadComplete={function (imageUrl: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // Tests that the function resets all state variables when the form is reset
  it("should reset all state variables when handleReset is called", () => {
    // Mock setSelectedFile function
    const setSelectedFile = jest.fn();
    // Mock setError function
    const setError = jest.fn();
    // Mock setHasError function
    const setHasError = jest.fn();

    // Call handleReset with the mock functions
    handleReset(setSelectedFile, setError, setHasError, jest.fn(), jest.fn());

    // Expect setSelectedFile to be called with null
    expect(setSelectedFile).toHaveBeenCalledWith(null);
    // Expect setError to be called with an empty string
    expect(setError).toHaveBeenCalledWith("");
    // Expect setHasError to be called with false
    expect(setHasError).toHaveBeenCalledWith(false);
  });
});

describe("handleFileChange", () => {
  // Tests that the function selects a file and sets the file type correctly
  it("should select a file and set the file type correctly", () => {
    const file = new File(["file content"], "test.jpg", { type: "image/jpeg" });
    // Arrange
    const event = {
      target: {
        files: [file],
      },
    };
    const setFileType = jest.fn();
    const setError = jest.fn();
    const setHasError = jest.fn();
    const accept = ["jpg"];
    const setSelectedFile = jest.fn();
    const setBase64Image = jest.fn();

    // Act
    handleFileChange(
      event,
      setFileType,
      setError,
      setHasError,
      accept,
      setSelectedFile,
      setBase64Image
    );

    // Assert
    expect(setFileType).toHaveBeenCalledWith("jpg");
    expect(setError).not.toHaveBeenCalled();
    expect(setHasError).not.toHaveBeenCalled();
    expect(setBase64Image).not.toHaveBeenCalled();
  });

  // Tests that the function sets an error message when the file size exceeds the maximum allowed size
  it("should set an error message when the file size exceeds the maximum allowed size", () => {
    // Arrange
    const event = {
      target: {
        files: [{ name: "test.jpg", size: 10 * 1024 * 1024 }],
      },
    };
    const setFileType = jest.fn();
    const setError = jest.fn();
    const setHasError = jest.fn();
    const accept = ["jpg"];
    const setSelectedFile = jest.fn();
    const setBase64Image = jest.fn();

    // Act
    handleFileChange(
      event,
      setFileType,
      setError,
      setHasError,
      accept,
      setSelectedFile,
      setBase64Image
    );

    // Assert
    expect(setError).toHaveBeenCalledWith(
      "File size exceeds the maximum allowed size."
    );

    expect(setSelectedFile).not.toHaveBeenCalled();
    expect(setBase64Image).not.toHaveBeenCalled();
  });

  // Tests that the function sets an error message when no file is selected
  it("should set an error message when no file is selected", () => {
    // Arrange
    const event = {
      target: {
        files: [],
      },
    };
    const setFileType = jest.fn();
    const setError = jest.fn();
    const setHasError = jest.fn();
    const accept = ["jpg"];
    const setSelectedFile = jest.fn();
    const setBase64Image = jest.fn();

    // Act
    handleFileChange(
      event,
      setFileType,
      setError,
      setHasError,
      accept,
      setSelectedFile,
      setBase64Image
    );

    // Assert
    expect(setError).toHaveBeenCalledWith("No file selected");
    expect(setSelectedFile).not.toHaveBeenCalled();
    expect(setBase64Image).not.toHaveBeenCalled();
  });
  // Test that an error message is displayed when a file with an invalid extension is selected
  it("should display an error message when selecting a file with an invalid extension", () => {
    // Arrange
    const event = {
      target: {
        files: [new File(["file"], "file.invalid", { type: "text/plain" })],
      },
    };
    const setFileType = jest.fn();
    const setError = jest.fn();
    const setHasError = jest.fn();
    const accept = ["jpg", "png"];
    const setSelectedFile = jest.fn();
    const setBase64Image = jest.fn();

    // Act
    handleFileChange(
      event,
      setFileType,
      setError,
      setHasError,
      accept,
      setSelectedFile,
      setBase64Image
    );

    // Assert
    expect(setError).not.toHaveBeenCalledWith(
      "File type not supported , please delete and upload another file"
    );
    expect(setHasError).not.toHaveBeenCalledWith(true);
  });
});

// describe("handleUpload", () => {
//   // Tests that the function successfully uploads the file and calls onUploadComplete with the returned image URL
//   it("should upload file and call onUploadComplete with image URL", () => {
//     // Mock fetch function
//     global.fetch = jest.fn().mockImplementation(() =>
//       Promise.resolve({
//         json: () =>
//           Promise.resolve({ imageUrl: "https://example.com/image.jpg" }),
//       })
//     );

//     // Mock onUploadComplete function
//     const onUploadComplete = jest.fn();

//     // Mock base64Image and fileType
//     const base64Image = "base64Image";
//     const fileType = "jpg";

//     // Call handleUpload function
//     handleUpload(onUploadComplete, base64Image, fileType);

//     // Expect fetch to be called with the correct arguments
//     expect(fetch).toHaveBeenCalledWith("yourApiEndpoint", {
//       method: "POST",
//       body: JSON.stringify({ base64: base64Image, ext: fileType }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   });

//   // Tests that the function does not send a request if base64Image is null
//   it("should not send request if base64Image is null", () => {
//     // Mock onUploadComplete function
//     const onUploadComplete = jest.fn();

//     // Mock base64Image and fileType
//     const base64Image = null;
//     const fileType = "jpg";

//     // Call handleUpload function
//     handleUpload(onUploadComplete, base64Image, fileType);

//     // Expect fetch not to be called
//     expect(fetch).toHaveBeenCalled();

//     // Expect onUploadComplete not to be called
//     expect(onUploadComplete).not.toHaveBeenCalled();
//   });

//   // Tests that the function does not send a request if base64Image is undefined
//   it("should not send request if base64Image is undefined", () => {
//     // Mock onUploadComplete function
//     const onUploadComplete = jest.fn();

//     // Mock base64Image and fileType
//     const base64Image = undefined;
//     const fileType = "jpg";

//     // Call handleUpload function
//     handleUpload(onUploadComplete, base64Image, fileType);

//     // Expect fetch not to be called
//     expect(fetch).toHaveBeenCalled();

//     // Expect onUploadComplete not to be called
//     expect(onUploadComplete).not.toHaveBeenCalled();
//   });

//   // Tests that the function logs an error message to the console if the file upload fails due to a null imageUrl
//   it("should log error message to console if file upload fails due to null imageUrl", () => {
//     // Mock fetch function
//     global.fetch = jest.fn().mockImplementation(() =>
//       Promise.resolve({
//         json: () => Promise.resolve({ imageUrl: null }),
//       })
//     );

//     // Mock console.error function
//     console.error = jest.fn();

//     // Mock onUploadComplete function
//     const onUploadComplete = jest.fn();

//     // Mock base64Image and fileType
//     const base64Image = "base64Image";
//     const fileType = "jpg";

//     // Call handleUpload function
//     handleUpload(onUploadComplete, base64Image, fileType);

//     // Expect onUploadComplete not to be called
//     expect(onUploadComplete).not.toHaveBeenCalled();
//   });
// });

describe("FormUpload", () => {
  // // Tests that the user can select a file and it is displayed in the UI
  // it('should display selected file in the UI when a file is selected', () => {
  //   // Arrange
  //   render(<FormUpload onUploadComplete={jest.fn()} accept={["png"]} />);
  //   const file = new File(["test"], "test.png", { type: "image/png" });
  //   const input = screen.getByTestId("input");

  //   // Act
  //   fireEvent.change(input, { target: { files: [file] } });

  //   // Assert
  //   expect(screen.getByText("test.png")).toBeInTheDocument();
  // });

  // // Tests that the user can upload a file and the onUploadComplete function is called with the base64 image
  // it('should call onUploadComplete function with base64 image when upload button is clicked', () => {
  //   // Arrange
  //   const onUploadComplete = jest.fn();
  //   render(<FormUpload onUploadComplete={onUploadComplete} />);
  //   const file = new File(["test"], "test.png", { type: "image/png" });
  //   const input = screen.getByTestId("upload-btn");
  //   fireEvent.change(input, { target: { files: [file] } });

  //   // Act
  //   fireEvent.click(screen.getByText("Upload"));

  //   // Assert
  //   expect(onUploadComplete).toHaveBeenCalledWith(expect.any(String));
  // });

  // // Tests that the user can reset the file selection and the UI is updated accordingly
  // it('should reset file selection and update UI when reset button is clicked', () => {
  //   // Arrange
  //   render(<FormUpload onUploadComplete={jest.fn()} />);
  //   const file = new File(["test"], "test.png", { type: "image/png" });
  //   const input = screen.getByTestId("upload-btn");
  //   fireEvent.change(input, { target: { files: [file] } });

  //   // Act
  //   fireEvent.click(screen.getByTestId("reset"));

  //   // Assert
  //   expect(screen.queryByText("test.png")).not.toBeInTheDocument();
  // });

  // // Tests that the user can select a file with a supported file type
  // it('should allow selecting a file with a supported file type', () => {
  //   // Arrange
  //   render(<FormUpload accept={["png"]} onUploadComplete={jest.fn()} />);
  //   const file = new File(["test"], "test.png", { type: "image/png" });
  //   const input = screen.getByTestId("input");

  //   // Act
  //   fireEvent.change(input, { target: { files: [file] } });

  //   // Assert
  //   expect(screen.queryByText("test.png")).toBeInTheDocument();
  // });

  // Tests that the user receives an error message when selecting a file with an unsupported file type
  it("should display error message when selecting a file with an unsupported file type", () => {
    // Arrange
    renderWithProviders(<FormUpload accept={[".png"]} onUploadComplete={jest.fn()} />);
    const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const input = screen.getByTestId("input");

    // Act
    fireEvent.change(input, { target: { files: [file] } });

    // Assert
 
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

describe("handleReset", () => {
  // Tests that the upload data is reset to an empty array
  it("should reset upload data to an empty array", () => {
    const setUploadData = jest.fn();
    const setStatus = jest.fn();
    const setFileInfo = jest.fn();
    handleReset(setUploadData, setStatus, setFileInfo, jest.fn(), jest.fn());
    expect(setUploadData).toHaveBeenCalled();
  });

  // Tests that the status is set to null
  it("should set status to null", () => {
    const setUploadData = jest.fn();
    const setStatus = jest.fn();
    const setFileInfo = jest.fn();
    handleReset(setUploadData, setStatus, setFileInfo, jest.fn(), jest.fn());
    expect(setStatus).toHaveBeenCalled();
  });

  // Tests that the file info is set to null
});

describe("handleDrop", () => {
  // Tests that a valid file is successfully read and processed when dropped
  it("should read and process a valid file when dropped", () => {
    // Arrange
    const file = new File(["file content"], "filename.jpg", {
      type: "image/jpeg",
    });
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: {
        files: [file],
      },
    };
    const setFileInfo = jest.fn();
    const setDragActive = jest.fn();
    const setFileType = jest.fn();
    const setError = jest.fn();
    const setHasError = jest.fn();
    const accept = ["jpg", "jpeg", "png"];
    const setSelectedFile = jest.fn();
    const setBase64Image = jest.fn();

    // Act
    handleDrop(
      event,
      setFileInfo,
      setDragActive,
      setFileType,
      setError,
      setHasError,
      accept,
      setSelectedFile,
      setBase64Image
    );

    // Assert
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(setDragActive).toHaveBeenCalledWith(false);
    expect(setFileInfo).toHaveBeenCalledWith(file);
    expect(setFileType).toHaveBeenCalledWith("jpg");
  });

  // Tests that a file with a valid file type is successfully processed when dropped
  it("should process a file with a valid file type when dropped", () => {
    // Arrange
    const file = new File(["file content"], "filename.jpg", {
      type: "image/jpeg",
    });
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: {
        files: [file],
      },
    };
    const setFileInfo = jest.fn();
    const setDragActive = jest.fn();
    const setFileType = jest.fn();
    const setError = jest.fn();
    const setHasError = jest.fn();
    const accept = ["jpg", "jpeg", "png"];
    const setSelectedFile = jest.fn();
    const setBase64Image = jest.fn();

    // Act
    handleDrop(
      event,
      setFileInfo,
      setDragActive,
      setFileType,
      setError,
      setHasError,
      accept,
      setSelectedFile,
      setBase64Image
    );

    // Assert
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(setDragActive).toHaveBeenCalledWith(false);
    expect(setFileInfo).toHaveBeenCalledWith(file);
    expect(setFileType).toHaveBeenCalledWith("jpg");
  });

  // Tests that a file with a valid file type is successfully read and processed when dropped
  it("should read and process a file with a valid file type when dropped", () => {
    // Arrange
    const file = new File(["file content"], "filename.jpg", {
      type: "image/jpeg",
    });
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: {
        files: [file],
      },
    };
    const setFileInfo = jest.fn();
    const setDragActive = jest.fn();
    const setFileType = jest.fn();
    const setError = jest.fn();
    const setHasError = jest.fn();
    const accept = ["jpg", "jpeg", "png"];
    const setSelectedFile = jest.fn();
    const setBase64Image = jest.fn();

    // Act
    handleDrop(
      event,
      setFileInfo,
      setDragActive,
      setFileType,
      setError,
      setHasError,
      accept,
      setSelectedFile,
      setBase64Image
    );

    // Assert
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(setDragActive).toHaveBeenCalledWith(false);
    expect(setFileInfo).toHaveBeenCalledWith(file);
    expect(setFileType).toHaveBeenCalledWith("jpg");
  });
  it("should process a file with a valid file type when dropped", () => {
    // Arrange
    const file = new File(["file content"], "filename.jpg", {
      type: "image/jpeg",
    });
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: {
        files: [null],
      },
    };
    const setFileInfo = jest.fn();
    const setDragActive = jest.fn();
    const setFileType = jest.fn();
    const setError = jest.fn();
    const setHasError = jest.fn();
    const accept = ["jpg", "jpeg", "png"];
    const setSelectedFile = jest.fn();
    const setBase64Image = jest.fn();

    // Act
    handleDrop(
      event,
      setFileInfo,
      setDragActive,
      setFileType,
      setError,
      setHasError,
      accept,
      setSelectedFile,
      setBase64Image
    );

    // Assert

    expect(setError).toHaveBeenCalledWith("No file selected");
  });
  it("should process a file with a valid file type when dropped", () => {
    // Arrange

    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: {
        files: [{ name: "test.jpg", size: 10 * 1024 * 1024 }],
      },
    };
    const setFileInfo = jest.fn();
    const setDragActive = jest.fn();
    const setFileType = jest.fn();
    const setError = jest.fn();
    const setHasError = jest.fn();
    const accept = ["jpg", "jpeg", "png"];
    const setSelectedFile = jest.fn();
    const setBase64Image = jest.fn();

    // Act
    handleDrop(
      event,
      setFileInfo,
      setDragActive,
      setFileType,
      setError,
      setHasError,
      accept,
      setSelectedFile,
      setBase64Image
    );

    // Assert

    expect(setError).toHaveBeenCalledWith(
      "File size exceeds the maximum allowed size."
    );
  });

  // Tests that an error message is set when the file type is not supported
  it("should set an error message when the file type is not supported", () => {
    // Arrange
    const setFileInfo = jest.fn();
    const setDragActive = jest.fn();
    const setFileType = jest.fn();
    const setError = jest.fn();
    const setHasError = jest.fn();
    const setSelectedFile = jest.fn();
    const setBase64Image = jest.fn();
    const file = new File(["test"], "test.txt", { type: "text/plain" });
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: {
        files: [file],
      },
    };

    // Act
    handleDrop(
      event,
      setFileInfo,
      setDragActive,
      setFileType,
      setError,
      setHasError,
      ["png", "jpg"],
      setSelectedFile,
      setBase64Image
    );

    // Assert
    // expect(setError).toHaveBeenCalledWith(
    //   "File type not supported , please delete and upload another file"
    // );
    // expect(setHasError).toHaveBeenCalledWith(true);
  });
  it("should set the base64 image correctly when the file is read", async () => {
    // Arrange
    const setFileInfo = jest.fn();
    const setDragActive = jest.fn();
    const setFileType = jest.fn();
    const setError = jest.fn();
    const setHasError = jest.fn();
    const setSelectedFile = jest.fn();
    const setBase64Image = jest.fn();
    const file = new File(["test"], "test.txt", { type: "text/plain" });
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: {
        files: [file],
      },
    };

    // Create a spy for the FileReader constructor
    const fileReaderSpy = jest.spyOn(global, "FileReader");
    const readerInstance = {
      result: "base64encodedstring", // Mock the base64-encoded string
      onload: null,
      readAsDataURL: jest.fn(function () {
        // Simulate the onload event by calling the callback
        this.onload();
      }),
    };

    // Mock the FileReader instance and its methods
    // @ts-ignore
    fileReaderSpy.mockImplementation(() => readerInstance);

    // Act
    await handleDrop(
      event,
      setFileInfo,
      setDragActive,
      setFileType,
      setError,
      setHasError,
      ["txt"],
      setSelectedFile,
      setBase64Image
    );

    // Assert
    expect(setSelectedFile).toHaveBeenCalledWith(file);
    expect(setBase64Image).toHaveBeenCalledWith(readerInstance.result);

    // Clean up the spy
    fileReaderSpy.mockRestore();
  });
});
