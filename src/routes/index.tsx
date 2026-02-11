import { convexQuery } from "@convex-dev/react-query";
import { formOptions } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form-start";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { api } from "../../convex/_generated/api";

const options = formOptions({
  defaultValues: {
    text: "",
  },
});

const handleForm = createServerFn({ method: "POST" })
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
      throw redirect({ href: "/" });
    }
    return { text: data.get("text") };
  })
  .handler(async ({ data }) => {
    console.log("data", data);
    throw redirect({ href: "/" });
  });

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data } = useSuspenseQuery(convexQuery(api.function.listTable));
  const { Field, Subscribe } = useForm(options);
  return (
    <main>
      <ul>
        {data.map(({ _id, text }) => (
          <li key={_id}>{text}</li>
        ))}
      </ul>
      <form action={handleForm.url} method="post">
        <Field name="text">
          {({ handleChange, state }) => (
            <input
              className="border"
              name="text"
              onChange={(event) => handleChange(event.target.value)}
              type="text"
              value={state.value}
            />
          )}
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
