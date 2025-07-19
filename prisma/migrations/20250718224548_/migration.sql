/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the `CategoriaProduto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TipoProduto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `corteId` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoriaProduto" DROP CONSTRAINT "CategoriaProduto_tipoProdutoid_fkey";

-- DropForeignKey
ALTER TABLE "Produto" DROP CONSTRAINT "Produto_categoriaId_fkey";

-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "categoriaId",
ADD COLUMN     "corteId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CategoriaProduto";

-- DropTable
DROP TABLE "TipoProduto";

-- CreateTable
CREATE TABLE "CorteProduto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tipoProdutoid" INTEGER NOT NULL,

    CONSTRAINT "CorteProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EspecieProduto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EspecieProduto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CorteProduto_nome_key" ON "CorteProduto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "EspecieProduto_nome_key" ON "EspecieProduto"("nome");

-- AddForeignKey
ALTER TABLE "CorteProduto" ADD CONSTRAINT "CorteProduto_tipoProdutoid_fkey" FOREIGN KEY ("tipoProdutoid") REFERENCES "EspecieProduto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_corteId_fkey" FOREIGN KEY ("corteId") REFERENCES "CorteProduto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
