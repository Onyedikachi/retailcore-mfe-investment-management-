import { downloadUsingFetch } from "../../utils/downloadFile";

describe("downloadUsingFetch", () => {
  let mockBlob;
  let mockResponse;
  let mockFetch;

  beforeEach(() => {
    mockBlob = new Blob(["fake file contents"], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    mockResponse = {
      blob: jest.fn(() => Promise.resolve(mockBlob)),
    };

    mockFetch = jest.fn(() => Promise.resolve(mockResponse));

    global.fetch = mockFetch;

    global.URL.createObjectURL = jest.fn(() => "mocked-object-url");
    global.URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should download file", async () => {
    await downloadUsingFetch("https://retailcore-teams-management-api.dev.bepeerless.co/v1/Product/template");

    expect(mockFetch).toHaveBeenCalledWith(
      "https://retailcore-teams-management-api.dev.bepeerless.co/v1/Product/template"
    );

    expect(mockResponse.blob).toHaveBeenCalled();

    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith(
      "mocked-object-url"
    );
  });
});
