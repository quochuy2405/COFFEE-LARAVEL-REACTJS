<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;

use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
class ExportExcelMonth implements FromCollection, WithHeadings, ShouldAutoSize, WithEvents
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public int $year;
    public int $month;
    public function __construct(int $month, int $year)
    {
        $this->year = $year;
        $this->month = $month;
    }
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {

                $cellRange = 'A1:D1'; // All headers
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
            'Ngày',
            'Số lượng',
            'Tổng doanh thu',

        ];
    }
    public function collection()
    {
        $list = DB::select("
      SELECT DAY(CreatedDate), COUNT(*), SUM(TotalPrice)
      FROM Bill WHERE MONTH(CreatedDate) =  $this->month AND YEAR(CreatedDate) = $this->year 
      AND Validated = 1
      GROUP BY DAY(CreatedDate)
      ORDER BY DAY(CreatedDate)", [1]);
        return collect($list);
    }
}
