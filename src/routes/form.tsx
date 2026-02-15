import {
  createServerValidate,
  formOptions,
  getFormData,
  mergeForm,
  ServerValidateError,
  useForm,
  useTransform,
} from "@tanstack/react-form-start";
import { createFileRoute } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { z } from "zod";

const options = formOptions({
  defaultValues: {
    text: "",
  },
});

const schema = z.object({
  text: z.string().min(1),
});

const serverValidate = createServerValidate({
  ...options,
  onServerValidate: schema,
});

const handleForm = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) {
      throw redirect({ href: "/form" });
    }
    return data;
  })
  .handler(async ({ data }) => {
    try {
      const { data: validated } = schema.safeParse(await serverValidate(data));
      console.log("validated\n", validated);
    } catch (error) {
      if (error instanceof ServerValidateError) {
        console.log(error);
        return error.response;
      }
      console.error(error);
      setResponseStatus(500);
    }
    throw redirect({ href: "/form" });
  });

const getFormDataFromServer = createServerFn().handler(async () => getFormData());

export const Route = createFileRoute("/form")({
  component: Page,
  loader: async () => ({ state: await getFormDataFromServer() }),
});

function Page() {
  const { state } = Route.useLoaderData();
  const { Field, Subscribe } = useForm({
    ...options,
    transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
    validators: { onSubmit: schema },
  });
  return (
    <main>
      <form action={handleForm.url} method="post">
        <Field name="text">
          {({ handleChange, state }) => {
            const message = state.meta.errors.at(0)?.message;
            return (
              <div>
                <input
                  className="border"
                  name="text"
                  onChange={(event) => handleChange(event.target.value)}
                  value={state.value}
                  type="text"
                />
                {message && <p>{message}</p>}
              </div>
            );
          }}
        </Field>
        <Subscribe>
          {({ isSubmitting }) => {
            return <input disabled={isSubmitting} type="submit" />;
          }}
        </Subscribe>
      </form>
    </main>
  );
}
