"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { useState } from "react";
import { useFetchTodos } from "./useFetchUsers";

const Page: NextPage = () => {
  const { data, isLoading } = useFetchTodos();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
