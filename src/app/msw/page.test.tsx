import "@testing-library/jest-dom/";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import Page from "./page";

const handlers = [
  http.get("https://jsonplaceholder.typicode.com/users", () => {
    const fakeUsers = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
      { id: 3, name: "Jordan Doe" },
      { id: 4, name: "Jasmine Doe" },
    ];

    return HttpResponse.json(fakeUsers);
  }),
];

describe("msw test suites", () => {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  const renderWithQueryClient = () => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: Infinity,
        },
      },
    });

    return render(
      <QueryClientProvider client={client}>
        <Page />
      </QueryClientProvider>
    );
  };

  it("should fetch users", async () => {
    renderWithQueryClient();

    const listItems = await screen.findAllByRole("listitem");

    expect(listItems).toHaveLength(3);
  });
});
