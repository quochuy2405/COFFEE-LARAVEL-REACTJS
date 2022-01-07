<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiscountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Discount', function (Blueprint $table) {
            $table->integer('Id', true);
            $table->string('Name', 150);
            $table->integer('Value')->default(0);
            $table->integer('Quantity')->default(0);
            $table->dateTime('ExpiredDate')->default('2021-01-01 00:00:00');
            $table->string('Photo', 250)->nullable();
            $table->integer('MinPrice')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Discount');
    }
}
