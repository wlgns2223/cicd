import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./fetchUsers";

export const useFetchTodos = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
