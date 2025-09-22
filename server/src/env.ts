import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    PORT:z.coerce.number().default(3000),
    MONGO_URI: z.url(),
  },
 
  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});