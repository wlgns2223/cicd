import "@testing-library/jest-dom";
import User from "@testing-library/user-event";
import { render, screen, waitFor, within } from "@testing-library/react";
import Home from "./page";
import {
  fetchAllTodosFromCloud,
  saveToCloud,
  saveToStorage,
} from "../lib/storage-api";

jest.mock("../lib/storage-api", () => ({
  saveToStorage: jest.fn(),
  saveToCloud: jest.fn(),
  fetchAllTodosFromCloud: jest.fn().mockResolvedValue([]),
  fetchAllTodos: jest.fn().mockResolvedValue([]),
}));

describe("page test suite", () => {
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  const addTodo = async () => {
    const input = screen.getByRole("textbox");
    await User.click(input);
    await User.keyboard("todo");

    const submitButton = screen.getByRole("button", { name: /생성/gi });
    await User.click(submitButton);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the page", async () => {
    render(<Home />);

    await addTodo();

    const listItem = screen.getByRole("listitem");
    const paragraph = within(listItem).getByText("todo");
    expect(paragraph).toBeInTheDocument();
  });

  it("should save to cloud storage", async () => {
    render(<Home />);

    const saveToCloudMock = jest.mocked(saveToCloud);

    await addTodo();

    const saveButton = screen.getByLabelText(/save-to-cloud/i);
    await User.click(saveButton);

    expect(saveToCloudMock).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledTimes(0);
  });

  it("should fetch from cloud storage", async () => {
    render(<Home />);
    const fetchAllTodosFromCloudMock = jest.mocked(fetchAllTodosFromCloud);
    const saveToStorageMock = jest.mocked(saveToStorage);

    const button = screen.getByRole("button", {
      name: /클라우드에서 불러오기/i,
    });
    await User.click(button);

    expect(fetchAllTodosFromCloudMock).toHaveBeenCalledTimes(1);
    expect(saveToStorageMock).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  it("should delete from all storages", async () => {
    render(<Home />);
    const saveToStorageMock = jest.mocked(saveToStorage);
    const saveToCloudMock = jest.mocked(saveToCloud);

    const button = screen.getByRole("button", {
      name: /모든 저장소에서 삭제/i,
    });
    await User.click(button);

    expect(saveToStorageMock).toHaveBeenCalledTimes(1);
    expect(saveToCloudMock).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });
});
