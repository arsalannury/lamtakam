import { useQuery, useMutation, useQueryClient } from "react-query";
import { UseQueryResult } from "react-query/types/react";
import { renderHowToast } from "src/helpers/Toast/ToastNotif";

const fetchCategories = async (): Promise<any> => {
  const request = await fetch("http://127.0.0.1:8000/categories");
  return await request.json();
};

const postCategories = async (value: string) => {
  if (!value || (value && value.trim().length <= 0)) return;
  return await fetch("http://127.0.0.1:8000/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category: { value: value, label: value } }),
  });
};

const deleteCategories = async (categoryId: any) => {
  await fetch(`http://127.0.0.1:8000/categories/${categoryId}`, {
    method: "DELETE",
  });
};

export const useGetCategories: Function = (): UseQueryResult<any, unknown> => {
  return useQuery("GET_CATEGORIES", fetchCategories, {
    staleTime: 50000,
  });
};

export const usePostCategories: Function = (): any => {
  const queryClient = useQueryClient();
  return useMutation(postCategories, {
    onMutate: () => {
      const previousData = queryClient.getQueryData("GET_CATEGORIES");
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries("GET_CATEGORIES");
      renderHowToast("عملیات با موفقیت انجام شد", "success");
    },
    onError: (_error, data, context: any) => {
      queryClient.setQueryData("GET_CATEGORIES", context.previousData);
      renderHowToast("عملیات با خطا مواجه شد", "error");
    },
  });
};

export const useDeleteCategory: Function = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCategories, {
    onMutate: () => {
      const previousData = queryClient.getQueryData("GET_CATEGORIES");
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries("GET_CATEGORIES");
      renderHowToast("عملیات با موفقیت انجام شد", "success");
    },
    onError: (_error, data, context: any) => {
      queryClient.setQueryData("GET_CATEGORIES", context.previousData);
      renderHowToast("عملیات با خطا مواجه شد", "error");
    },
  });
};
