-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_testSeriesId_fkey" FOREIGN KEY ("testSeriesId") REFERENCES "TestSeries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
