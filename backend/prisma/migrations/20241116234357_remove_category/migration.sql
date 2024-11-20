/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[certificateId]` on the table `Certificate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `certificateId` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructorId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_categoryId_fkey";

-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "certificateId" TEXT NOT NULL,
ADD COLUMN     "customMessage" TEXT;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "categoryId",
ADD COLUMN     "instructorId" INTEGER NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "enrolledStudents" DROP NOT NULL,
ALTER COLUMN "instructor" DROP NOT NULL,
ALTER COLUMN "instructorImage" DROP NOT NULL,
ALTER COLUMN "lectures" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "instructorId" INTEGER;

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "CourseContent" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT,
    "materialUrl" TEXT,
    "order" INTEGER NOT NULL,

    CONSTRAINT "CourseContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_certificateId_key" ON "Certificate"("certificateId");

-- AddForeignKey
ALTER TABLE "CourseContent" ADD CONSTRAINT "CourseContent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
