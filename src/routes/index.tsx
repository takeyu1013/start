import { convexQuery } from "@convex-dev/react-query";
import {
  createServerValidate,
  formOptions,
  getFormData,
  mergeForm,
  ServerValidateError,
  useForm,
  useTransform,
} from "@tanstack/react-form-start";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { z } from "zod";

import { api } from "../../convex/_generated/api";

const options = formOptions({
  defaultValues: {
    text: "",
  },
});

const serverValidate = createServerValidate({
  ...options,
  onServerValidate: z.object({
    text: z.string().min(1),
  }),
});

const handleForm = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) {
      throw redirect({ href: "/" });
    }
    return data;
  })
  .handler(async ({ data }) => {
    try {
      const validatedData = await serverValidate(data);
      console.log("validatedData\n", validatedData);
    } catch (error) {
      if (error instanceof ServerValidateError) {
        return error.response;
      }
      console.error("error\n", error);
      setResponseStatus(500);
    }
    throw redirect({ href: "/" });
  });

const getFormDataFromServer = createServerFn({ method: "GET" }).handler(
  async () => await getFormData(),
);

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => ({
    state: await getFormDataFromServer(),
  }),
});

function Home() {
  const { state } = Route.useLoaderData();
  const { data } = useSuspenseQuery(convexQuery(api.function.listTable));
  const { Field, Subscribe } = useForm({
    ...options,
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
  });
  return (
    <main>
      <ul>
        {data.map(({ _id, text }) => (
          <li key={_id}>{text}</li>
        ))}
      </ul>
      <form action={handleForm.url} method="post">
        <Field name="text">
          {({ handleChange, state }) => {
            return (
              <div>
                <input
                  className="border"
                  name="text"
                  onChange={(event) => handleChange(event.target.value)}
                  type="text"
                  value={state.value}
                />
              </div>
            );
          }}
        </Field>
        <Subscribe>
          {({ canSubmit, isSubmitting }) => (
            <button disabled={!canSubmit} type="submit">
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        </Subscribe>
      </form>
    </main>
  );
}
