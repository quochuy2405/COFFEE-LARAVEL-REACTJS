<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;

use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
class ExportExcelDate implements FromCollection, WithHeadings, ShouldAutoSize, WithEvents
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public int $year;
    public int $month;
    public int $day;
    public function __construct(int $month, int $day,int $year)
    {
        $this->year = $year;
        $this->month = $month;
        $this->day = $day;
    }
    public function registerEvents(): array
    {
        return [
            AfterSheet::class=> function (AfterSheet $event) {
        
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
            'Mã số',
            'Giờ',
            'Doanh thu',
            'Phương thức'
        ];
    }
    public function collection()
    {
        $list = DB::select("
       SELECT Id, TIME(CreatedDate), TotalPrice, PayBy
    FROM Bill 
    WHERE DAY(CreatedDate) =$this->day and
    MONTH(CreatedDate) =$this->month and
    YEAR(CreatedDate) =$this->year and Validated = 1
    ORDER BY TIME(CreatedDate)", [1]);
        return collect($list);
    }
}
