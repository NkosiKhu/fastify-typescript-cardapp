-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scheduled_for" DATETIME,
    "created_at" DATETIME NOT NULL
);
INSERT INTO "new_Entry" ("created_at", "description", "id", "scheduled_for", "title") SELECT "created_at", "description", "id", "scheduled_for", "title" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
