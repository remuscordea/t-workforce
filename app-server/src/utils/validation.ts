export function validateAgainstSchema(input: any, schema: any) {
  if (!input) {
    console.warn("Validation error: Missing input");
    throw new Error("Validation error: Missing input");
  }

  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    const errorMessages = parsed.error.errors
      .map((e: any) => e.message)
      .join(", ");
    console.error("Validation error:", errorMessages);
    throw new Error("Validation error: " + errorMessages);
  }

  return parsed;
}
