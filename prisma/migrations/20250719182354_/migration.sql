/*
  Warnings:

  - You are about to drop the column `nome` on the `Produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "nome",
ALTER COLUMN "unidadeMedida" SET DEFAULT 'g';
