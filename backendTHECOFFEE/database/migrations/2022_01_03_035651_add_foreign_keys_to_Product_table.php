<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('Product', function (Blueprint $table) {
            $table->foreign(['ProductTypeId'], 'FK_Product_ProductType_ProductTypeId')->references(['Id'])->on('ProductType')->onUpdate('NO ACTION')->onDelete('SET NULL');
            $table->foreign(['SupplierId'], 'FK_Product_Supplier_SupplierId')->references(['Id'])->on('Supplier')->onUpdate('NO ACTION')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Product', function (Blueprint $table) {
            $table->dropForeign('FK_Product_ProductType_ProductTypeId');
            $table->dropForeign('FK_Product_Supplier_SupplierId');
        });
    }
}
