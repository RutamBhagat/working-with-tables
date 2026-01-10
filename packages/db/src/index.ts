import { env } from "@working-with-tables/env/server";
import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations";

export const db = drizzle(env.DATABASE_URL, {
  relations,
  casing: "snake_case",
});

export {
  eq,
  gt,
  gte,
  lt,
  lte,
  and,
  or,
  inArray,
  sql,
  count,
  avg,
  asc,
  desc,
  sum,
  max,
} from "drizzle-orm";
