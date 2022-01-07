<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ProductType', function (Blueprint $table) {
            $table->integer('Id', true);
            $table->string('Name', 150)->unique('IX_ProductType_Name');
            $table->text('Description')->nullable();
            $table->text('Photo')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ProductType');
    }
}
