import { fireEvent, render, waitFor } from "@testing-library/react";
import CredentialInputComponent from "./CredentialInputComponent";
import axios from "axios";
import { MockedFunction } from "vitest";

vi.mock("axios");
const mockAxiosRequest = axios.request as MockedFunction<typeof axios.request>;

describe("test CredentialInput component", () => {
  it("renders the form", () => {
    const { getByLabelText, getByText } = render(<CredentialInputComponent />);
    expect(getByLabelText(/host/i)).toBeDefined();
    expect(getByLabelText(/port/i)).toBeDefined();
    expect(getByLabelText(/environment/i)).toBeDefined();
    expect(getByLabelText(/username/i)).toBeDefined();
    expect(getByLabelText(/password/i)).toBeDefined();
    expect(getByText(/execute/i)).toBeDefined();
  });

  it("submits form successfully", async () => {
    const { getByLabelText, getByText } = render(<CredentialInputComponent />);
    const mockResponse = {
      data: {
        executeid: 0,
      },
    };
    mockAxiosRequest.mockResolvedValue(mockResponse);
    fireEvent.change(getByLabelText(/host/i), {
      target: {
        value: "host",
      },
    });
    fireEvent.change(getByLabelText(/port/i), {
      target: {
        value: 0,
      },
    });
    fireEvent.change(getByLabelText(/environment/i), {
      target: {
        value: "sys0",
      },
    });
    fireEvent.change(getByLabelText(/username/i), {
      target: {
        value: "username",
      },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: {
        value: "password",
      },
    });

    fireEvent.click(getByText(/execute/i));

    const mockConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://host:0/ae/api/v1/0/executions",
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "username",
        password: "password",
      },
      data: '{"object_name":"SCRI.EXECUTE.WITH.JSON.INPUT.JSON","execution_option":"execute"}',
    };

    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith(mockConfig);
    });
  });

  it("submits form - sending post api failed with message string", async () => {
    const { getByLabelText, getByText } = render(<CredentialInputComponent />);
    const mockError = {
      message: "Unauthorized",
    };
    mockAxiosRequest.mockRejectedValue(mockError);
    fireEvent.change(getByLabelText(/host/i), {
      target: {
        value: "host",
      },
    });
    fireEvent.change(getByLabelText(/port/i), {
      target: {
        value: 0,
      },
    });
    fireEvent.change(getByLabelText(/environment/i), {
      target: {
        value: "sys0",
      },
    });
    fireEvent.change(getByLabelText(/username/i), {
      target: {
        value: "username",
      },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: {
        value: "password",
      },
    });

    fireEvent.click(getByText(/execute/i));

    const mockConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://host:0/ae/api/v1/0/executions",
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "username",
        password: "password",
      },
      data: '{"object_name":"SCRI.EXECUTE.WITH.JSON.INPUT.JSON","execution_option":"execute"}',
    };

    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith(mockConfig);
    });
  });

  it("submits form - sending post api failed with message string", async () => {
    const { getByLabelText, getByText } = render(<CredentialInputComponent />);
    const mockError = {
      response: {
        data: {
          message: "Unauthorized",
        },
      },
    };
    mockAxiosRequest.mockRejectedValue(mockError);
    fireEvent.change(getByLabelText(/host/i), {
      target: {
        value: "host",
      },
    });
    fireEvent.change(getByLabelText(/port/i), {
      target: {
        value: 0,
      },
    });
    fireEvent.change(getByLabelText(/environment/i), {
      target: {
        value: "sys0",
      },
    });
    fireEvent.change(getByLabelText(/username/i), {
      target: {
        value: "username",
      },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: {
        value: "password",
      },
    });

    fireEvent.click(getByText(/execute/i));

    const mockConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://host:0/ae/api/v1/0/executions",
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "username",
        password: "password",
      },
      data: '{"object_name":"SCRI.EXECUTE.WITH.JSON.INPUT.JSON","execution_option":"execute"}',
    };

    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith(mockConfig);
    });
  });
});
