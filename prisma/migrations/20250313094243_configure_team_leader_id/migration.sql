/*
  Warnings:

  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "progress" REAL NOT NULL DEFAULT 0.0,
    "deadline" DATETIME NOT NULL,
    "teamLeaderId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Project_teamLeaderId_fkey" FOREIGN KEY ("teamLeaderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("createdAt", "deadline", "description", "id", "name", "progress", "teamLeaderId") SELECT "createdAt", "deadline", "description", "id", "name", "progress", "teamLeaderId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
