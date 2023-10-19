import { renderHowToast } from "src/helpers/Toast/ToastNotif";
import { UseQueryResult } from "@tanstack/react-query/build/legacy/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

//* api call function start ***************************************************

const fetchCategories = async (): Promise<any> => {
  const request = await fetch(
    "https://lamtakam-server.iran.liara.run/categories"
  );
  return await request.json();
};

const postCategories = async (value: string): Promise<Response | undefined> => {
  if (!value || (value && value.trim().length <= 0)) return;
  return await fetch("https://lamtakam-server.iran.liara.run/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category: { value: value, label: value } }),
  });
};

const deleteCategories = async (categoryId: any): Promise<void> => {
  await fetch(
    `https://lamtakam-server.iran.liara.run/categories/${categoryId}`,
    {
      method: "DELETE",
    }
  );
};

const updateCategories = async (categoryValue: any): Promise<void> => {
  if (!categoryValue || (categoryValue && categoryValue.trim().length <= 0))
    return;

  const categories = await fetchCategories();
  const filterCategoryShouldBeUpdate = categories.data.find((cat: any) => cat);

  await fetch(
    `https://lamtakam-server.iran.liara.run/${filterCategoryShouldBeUpdate._id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: { value: categoryValue, label: categoryValue },
      }),
    }
  );
};

//* api call function end ***************************************************

//* custom hooks start ***************************************************

export const useGetCategories: Function = (): UseQueryResult<any, unknown> => {
  return useQuery({
    queryKey: ["GET_CATEGORIES"],
    queryFn: fetchCategories,
    staleTime: 50000,
  });
};

export const usePostCategories: Function = (): any => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCategories,
    onMutate: () => {
      const previousData = queryClient.getQueryData(["GET_CATEGORIES"]);
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
      renderHowToast("عملیات با موفقیت انجام شد", "success");
    },
    onError: (_error, data, context: any) => {
      queryClient.setQueryData(["GET_CATEGORIES"], context.previousData);
      renderHowToast("عملیات با خطا مواجه شد", "error");
    },
  });
};

export const useDeleteCategory: Function = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategories,
    onMutate: () => {
      const previousData = queryClient.getQueryData(["GET_CATEGORIES"]);
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
      renderHowToast("عملیات با موفقیت انجام شد", "success");
    },
    onError: (_error, data, context: any) => {
      queryClient.setQueryData(["GET_CATEGORIES"], context.previousData);
      renderHowToast("عملیات با خطا مواجه شد", "error");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategories,
    onMutate: () => {
      const previousData = queryClient.getQueryData(["GET_CATEGORIES"]);
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
      renderHowToast("عملیات با موفقیت انجام شد", "success");
    },
    onError: (_error, data, context: any) => {
      queryClient.setQueryData(["GET_CATEGORIES"], context.previousData);
      renderHowToast("عملیات با خطا مواجه شد", "error");
    },
  });
};

//* custom hooks end ***************************************************
