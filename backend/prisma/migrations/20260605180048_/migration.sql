-- CreateEnum
CREATE TYPE "RegistrationLevel" AS ENUM ('SMP', 'SMA');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "AcademicLevel" AS ENUM ('SMP', 'SMA', 'MTS', 'MA');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('MENUNGGU_VERIFIKASI', 'BERKAS_KURANG', 'MENUNGGU_PEMBAYARAN', 'PEMBAYARAN_TERVERIFIKASI', 'DITERIMA', 'DITOLAK');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('KARTU_KELUARGA', 'KARTU_NISN', 'AKTA_KELAHIRAN', 'KTP_ORANG_TUA', 'TRANSKRIP_NILAI', 'IJAZAH', 'SKL_MUTASI');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('BELUM_DICEK', 'VALID', 'TIDAK_VALID', 'PERLU_REVISI');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('MENUNGGU_VERIFIKASI', 'VALID', 'TIDAK_VALID');

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registrations" (
    "id" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "accessCode" TEXT NOT NULL,
    "registrationLevel" "RegistrationLevel" NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'MENUNGGU_VERIFIKASI',
    "adminNote" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "childOrder" INTEGER NOT NULL,
    "nisn" TEXT NOT NULL,
    "academicLevel" "AcademicLevel",
    "entryClass" TEXT NOT NULL,
    "previousSchool" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parents" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "fatherJob" TEXT NOT NULL,
    "fatherBirthPlace" TEXT NOT NULL,
    "fatherBirthDate" TIMESTAMP(3) NOT NULL,
    "fatherPhone" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "motherJob" TEXT NOT NULL,
    "motherBirthPlace" TEXT NOT NULL,
    "motherBirthDate" TIMESTAMP(3) NOT NULL,
    "motherPhone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileOriginalName" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "fileMimeType" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "verificationStatus" "DocumentStatus" NOT NULL DEFAULT 'BELUM_DICEK',
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "senderAccountName" TEXT NOT NULL,
    "transferDate" TIMESTAMP(3) NOT NULL,
    "paymentProofPath" TEXT NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'MENUNGGU_VERIFIKASI',
    "adminNote" TEXT,
    "verifiedById" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_registrationNumber_key" ON "registrations"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "students_registrationId_key" ON "students"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "parents_registrationId_key" ON "parents"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "documents_registrationId_documentType_key" ON "documents"("registrationId", "documentType");

-- CreateIndex
CREATE UNIQUE INDEX "payments_registrationId_key" ON "payments"("registrationId");

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
