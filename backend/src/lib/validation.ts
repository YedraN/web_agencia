import { ZodError, type ZodSchema } from "zod";

export class RequestValidationError extends Error {
  constructor(public readonly issues: ZodError["issues"]) {
    super("Validation failed");
    this.name = "RequestValidationError";
  }
}

export function validateOrThrow<T>(schema: ZodSchema<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) {
    throw new RequestValidationError(result.error.issues);
  }

  return result.data;
}
