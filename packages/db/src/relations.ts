import * as schema from "./schema/index";
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations(schema, (r) => ({}));
