import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import Excel from "@app/assets/images/excel";
import { toast } from "react-toastify";
import { FaFile } from "react-icons/fa";
import { useUploadDocumentMutation } from "@app/api";

const MAX_FILE_SIZE_MB = 5; // Maximum file size in megabytes
interface FileProp {
  name: string;
}
// handle drag events
export const handleDrag = function (e, setDragActive) {
  e.preventDefault();
  e.stopPropagation();
  if (e.type === "dragenter" || e.type === "dragover") {
    setDragActive(true);
  } else if (e.type === "dragleave") {
    setDragActive(false);
  }
};
export const handleDrop = async function (
  e,
  setFileInfo,
  setDragActive,
  setFileType,
  setError,
  setHasError,
  accept,
  setSelectedFile,
  setBase64Image
) {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);

  // at least one file has been dropped so do somethin
  // @ts-ignore
  const file: any = e?.dataTransfer?.files[0];

  if (!file) {
    setError("No file selected");
    return;
  }
  setFileInfo(file);
  const type = file?.name?.split(".").pop();
  const fileName = file?.name;
  const lastDotIndex = fileName?.lastIndexOf(".");
  const fileType = lastDotIndex !== -1 ? fileName?.slice(lastDotIndex + 1) : "";

  setFileType(fileType);
  // Check file size
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    setError("File size exceeds the maximum allowed size.");
    return;
  }

  // if (accept.length > 0 && !accept?.includes(fileType)) {
  //   setError("File type not supported , please delete and upload another file");
  //   setHasError(true);
  // }

  const reader = new FileReader();
  reader.onload = () => {
    const base64Data = reader?.result as string;
    setSelectedFile(file);
    setBase64Image(base64Data);
  };
  reader?.readAsDataURL(file);
};

export function handleReset(
  setFileInfo,
  setError,
  setHasError,
  reset,
  setBase64Image
) {
  setFileInfo(null);
  setError("");
  setHasError(false);
  reset();
  setBase64Image("");
}

export const handleFileChange = (
  event: any,
  setFileType,
  setError,
  setHasError,
  accept,
  setSelectedFile,
  setBase64Image
) => {
  const file = event?.target?.files?.[0];
  const type = file?.name?.split(".").pop();
  const fileName = file?.name;
  const lastDotIndex = fileName?.lastIndexOf(".");
  const fileType = lastDotIndex !== -1 ? fileName?.slice(lastDotIndex + 1) : "";

  setFileType(fileType);

  if (!file) {
    setError("No file selected");
    return;
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    setError("File size exceeds the maximum allowed size.");
    return;
  }

  // if (!accept?.includes(fileType)) {
  //   setError("File type not supported , please delete and upload another file");
  //   setHasError(true);
  // }

  const reader = new FileReader();
  reader.onload = () => {
    const base64Data = reader?.result as string;
    setSelectedFile(file);
    setBase64Image(base64Data.split(",")[1]); // Extract the base64 string by splitting at the comma
  };
  reader?.readAsDataURL(file);
};

// export const handleUpload = (
//   uploadDocument,
//   onUploadComplete,
//   base64Image,
//   fileType
// ) => {
//   if (base64Image) {
//     // Send the base64 image data to the API
//     // Replace 'yourApiEndpoint' with the actual API endpoint
//     uploadDocument({
//       ext: `.${fileType}`,
//       base64: base64Image,
//     });
//   }
// };
const FormUpload = ({
  label,
  accept,
  onUploadComplete,
}: {
  label?: string;
  accept?: string[];
  onUploadComplete: (imageUrl: string) => void;
}): React.JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("");
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = React.useState(false);
  const [hasError, setHasError] = useState(false);
  const [fileInfo, setFileInfo] = useState<FileProp | null>(null);

  const [uploadDocument, { data, isLoading, isError, isSuccess, reset }] =
    useUploadDocumentMutation();

  React.useEffect(() => {
    if (isSuccess) {
      onUploadComplete(data.data);
    }
  }, [isSuccess, isError]);

  React.useEffect(() => {
    if (base64Image && fileType && !hasError && !error) {
      uploadDocument({
        ext: `.${fileType}`,
        base64: base64Image,
      });
    }
  }, [base64Image, fileType, hasError, error]);
  return (
    <div>
      <div
        className={`border-[0.5px] bg-white ${
          hasError ? "border-danger-500 " : "border-[#C4C4C4]"
        } rounded-lg max-w-[392px] px-4 py-[11px] relative  ${
          dragActive ? "opacity-50" : ""
        } ${isSuccess ? "border-green-500 " : "border-[#C4C4C4]"}`}
        onDragEnter={(e) => handleDrag(e, setDragActive)}
        onDragLeave={(e) => handleDrag(e, setDragActive)}
        onDragOver={(e) => handleDrag(e, setDragActive)}
        onDrop={(e) =>
          handleDrop(
            e,
            setFileInfo,
            setDragActive,
            setFileType,
            setError,
            setHasError,
            accept,
            setSelectedFile,
            setBase64Image
          )
        }
      >
        {!selectedFile && (
          <label
            data-testid="upload-btn"
            className="flex gap-x-12 items-center text-[#636363] text-sm cursor-pointer font-normal capitalize"
          >
            <input
              type="file"
              data-testid="input"
              accept={accept?.join(",")}
              className="accent-sterling-red-800 hidden"
              onChange={(e) =>
                handleFileChange(
                  e,
                  setFileType,
                  setError,
                  setHasError,
                  accept,
                  setSelectedFile,
                  setBase64Image
                )
              }
            />
            {/* {base64Image ? (
          <img
            src={base64Image}
            alt="Uploaded"
            style={{ maxWidth: "100px" }}
          />
        ) : ( */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
            >
              <path
                d="M44 22C44 34.1503 34.1503 44 22 44C9.84974 44 0 34.1503 0 22C0 9.84974 9.84974 0 22 0C34.1503 0 44 9.84974 44 22Z"
                fill="#F9FAFB"
              />
              <path
                d="M39.8749 22.105C39.8749 32.1042 31.7694 40.21 21.7708 40.21C11.7721 40.21 3.6666 32.1042 3.6666 22.105C3.6666 12.1059 11.7721 4.00004 21.7708 4.00004C31.7694 4.00004 39.8749 12.1059 39.8749 22.105Z"
                fill="#F2F4F7"
              />
              <path
                d="M21.9475 20.9754C21.9272 20.9469 21.9012 20.9239 21.8716 20.9081C21.842 20.8923 21.8095 20.884 21.7766 20.884C21.7436 20.884 21.7111 20.8923 21.6815 20.9081C21.6519 20.9239 21.626 20.9469 21.6057 20.9754L18.5677 25.1931C18.5427 25.2282 18.5271 25.2704 18.5229 25.3147C18.5186 25.359 18.5258 25.4038 18.5437 25.4438C18.5615 25.4839 18.5892 25.5176 18.6237 25.5412C18.6582 25.5648 18.698 25.5772 18.7386 25.5771C19.8457 25.5771 20.7431 26.4746 20.7431 27.5816V32.7922C20.7431 32.9232 20.8408 33.0303 20.9601 33.0303H22.5876C22.707 33.0303 22.8046 32.9232 22.8046 32.7922V27.59C22.8046 26.48 23.7045 25.5801 24.8145 25.5801C24.9963 25.5801 25.0966 25.3509 24.9854 25.1961L21.9475 20.9754Z"
                fill="#5C6879"
              />
              <path
                d="M33.9282 24.9061C33.9282 20.1851 29.3415 15.6018 25.0255 13.6887C24.0233 13.2445 22.9285 13 21.7818 13C20.6394 13 19.5484 13.2424 18.5493 13.6831C14.2247 15.5905 9.62451 20.1795 9.62451 24.9061C9.62451 28.1952 12.0522 30.8592 15.0467 30.8592H16.1344C16.2538 30.8592 16.3514 30.752 16.3514 30.6211V28.8351C16.3514 28.7042 16.2538 28.597 16.1344 28.597H15.0467C14.1326 28.597 13.2728 28.1982 12.6326 27.4749C11.9952 26.7546 11.6562 25.7842 11.686 24.7781C11.7104 23.9923 11.9545 23.2542 12.3967 22.6321C12.8496 21.9981 13.4844 21.5367 14.1896 21.3313C14.834 21.1466 15.3481 20.6595 15.5674 20.026L15.5947 19.9472C15.8279 19.2686 16.1534 18.6346 16.563 18.0601C16.9674 17.4907 17.4463 16.9902 17.9843 16.5748C19.0992 15.7146 20.412 15.2592 21.7818 15.2592C23.1516 15.2592 24.4644 15.7146 25.5793 16.5748C26.119 16.9915 26.5964 17.4916 27.0006 18.0601C27.4102 18.6346 27.7357 19.2716 27.9689 19.9472L27.9955 20.0242C28.2135 20.6572 28.7256 21.1447 29.3686 21.3313C30.8387 21.7659 31.8668 23.2333 31.8668 24.9061C31.8668 25.8914 31.5168 26.82 30.8821 27.5165C30.5709 27.8601 30.2006 28.1325 29.7927 28.318C29.3848 28.5035 28.9475 28.5983 28.506 28.597H27.4183C27.299 28.597 27.2013 28.7042 27.2013 28.8351V30.6211C27.2013 30.752 27.299 30.8592 27.4183 30.8592H28.506C31.5006 30.8592 33.9282 28.1952 33.9282 24.9061Z"
                fill="#5C6879"
              />
            </svg>
            {/* // )} */}
            <span className="text-sm text-center">
              <span className="text-sterling-red-800 font-semibold">
                Click to upload
              </span>{" "}
              or drag and drop .extension
            </span>
          </label>
        )}
        {selectedFile && (
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-x-2 text-sm text-[#636363]">
              <span className="w-11 h-11 bg-[#F9FAFB] rounded-full flex items-center justify-center">
                <FaFile className="text-xl text-[#5C6879]" />
              </span>{" "}
              {selectedFile?.name}
            </div>
            <span
              className="absolute bottom-2 right-3 cursor-pointer"
              data-testid="reset"
              onClick={() =>
                handleReset(
                  setSelectedFile,
                  setError,
                  setHasError,
                  reset,
                  setBase64Image
                )
              }
            >
              <HiOutlineTrash className="text-lg text-[#96989A]" />
            </span>
          </div>
        )}
      </div>
      {hasError && (
        <span className="block py-1  text-danger-500 text-xs pl-4">
          {error}
        </span>
      )}
      {isSuccess && (
        <span className="block py-1  text-green-500 text-xs pl-4">
          File uploaded successfully
        </span>
      )}
      {/* {base64Image && (
        <button
          onClick={() =>
            handleUpload(
              uploadDocument,
              onUploadComplete,
              base64Image,
              fileType
            )
          }
          className="bg-sterling-red-800 text-white px-2 py-1 rounded-md text-sm my-6"
        >
          Upload
        </button>
      )} */}
    </div>
  );
};

export default FormUpload;
