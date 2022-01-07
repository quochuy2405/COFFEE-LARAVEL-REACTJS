<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSupplierTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Supplier', function (Blueprint $table) {
            $table->integer('Id', true);
            $table->string('Name', 150);
            $table->text('Description')->nullable();
            $table->text('Address');
            $table->string('City', 100);
            $table->string('Country', 100);
            $table->string('Phone', 100)->unique('IX_Supplier_Phone');
            $table->string('Url', 500);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Supplier');
    }
}
