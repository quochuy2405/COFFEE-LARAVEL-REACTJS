<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;

use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
class ExportExcel implements FromCollection, WithHeadings, ShouldAutoSize, WithEvents
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public int $year;
    public function __construct(int $year)
    {
        $this->year = $year;
    }
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {

                $cellRange = 'A1:C1'; // All headers
                $event->sheet->getDelegate()->getStyle('A1:D1000')->getFont()->setSize(14);
                $event->sheet->getStyle($cellRange)->getFont()
                    ->setSize(16)
                    ->setBold(true)
                    ->getColor()->setRGB('ffffff');
                $event->sheet->getStyle($cellRange)->getFill()
                    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                    ->getStartColor()->setARGB('495BAEED');
        
            },
        ];
    }
     public function headings(): array
    {
        return [
            'Tháng',
            'Số lượng',
            'Tổng doanh thu'
        ];
    }
    public function collection()
    {   $list= DB::select("
       SELECT MONTH(CreatedDate) AS Month,COUNT(*) AS SLHD, SUM(TotalPrice) AS Revenue 
       FROM Bill WHERE YEAR(CreatedDate) = $this->year and Validated = 1
      GROUP BY MONTH(CreatedDate)
      ORDER BY MONTH(CreatedDate)", [1]);
        return collect($list);
    }
}
