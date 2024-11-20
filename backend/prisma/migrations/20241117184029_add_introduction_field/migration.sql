/*
  Warnings:

  - Added the required column `introduction` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "introduction" TEXT NOT NULL;
