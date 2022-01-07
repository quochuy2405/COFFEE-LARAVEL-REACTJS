<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBillTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Bill', function (Blueprint $table) {
            $table->integer('Id', true);
            $table->integer('CustomerId')->nullable()->index('IX_Bill_CustomerId');
            $table->integer('Validated')->default(0);
            $table->string('Status', 100)->nullable()->default('Đang chờ thanh toán');
            $table->bigInteger('TotalPrice');
            $table->text('Address');
            $table->text('Name');
            $table->text('Phone');
            $table->string('Time', 100)->nullable()->default('15-20 phút');
            $table->text('PayBy');
            $table->text('Note')->nullable();
            $table->dateTime('CreatedDate')->default('2021-12-30 18:45:13');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Bill');
    }
}
