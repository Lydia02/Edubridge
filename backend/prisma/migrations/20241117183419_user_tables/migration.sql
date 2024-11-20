/*
  Warnings:

  - You are about to drop the column `certificateId` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `customMessage` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `instructorId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `introduction` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `instructorId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the `CourseContent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enrolledStudents` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instructor` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `instructorImage` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lectures` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CourseContent" DROP CONSTRAINT "CourseContent_courseId_fkey";

-- DropIndex
DROP INDEX "Certificate_certificateId_key";

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "certificateId",
DROP COLUMN "customMessage";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "instructorId",
DROP COLUMN "introduction",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "enrolledStudents" SET NOT NULL,
ALTER COLUMN "instructor" SET NOT NULL,
ALTER COLUMN "instructorImage" SET NOT NULL,
ALTER COLUMN "lectures" SET NOT NULL;

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "instructorId";

-- DropTable
DROP TABLE "CourseContent";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
