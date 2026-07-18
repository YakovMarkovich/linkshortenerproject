DROP INDEX "idx_user_id";--> statement-breakpoint
CREATE INDEX "idx_user_id" ON "links" ("user_id");