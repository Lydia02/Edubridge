/*
  Warnings:

  - Added the required column `enrolledStudents` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructor` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructorImage` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lectures` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "enrolledStudents" TEXT NOT NULL,
ADD COLUMN     "instructor" TEXT NOT NULL,
ADD COLUMN     "instructorImage" TEXT NOT NULL,
ADD COLUMN     "lectures" INTEGER NOT NULL;
