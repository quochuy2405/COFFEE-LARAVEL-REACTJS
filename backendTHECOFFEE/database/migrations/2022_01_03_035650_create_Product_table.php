<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Product', function (Blueprint $table) {
            $table->integer('Id', true);
            $table->string('Name', 150);
            $table->text('Description')->nullable();
            $table->integer('Price')->default(0);
            $table->date('CreatedDate');
            $table->text('Photo')->nullable();
            $table->integer('Size')->default(0);
            $table->integer('ProductTypeId')->nullable()->index('IX_Product_ProductTypeId');
            $table->integer('SupplierId')->nullable()->index('IX_Product_SupplierId');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Product');
    }
}
