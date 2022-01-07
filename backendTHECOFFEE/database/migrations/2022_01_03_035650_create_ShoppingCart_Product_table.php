<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShoppingCartProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ShoppingCart_Product', function (Blueprint $table) {
            $table->integer('ProductId')->index('IX_ShoppingCart_Product_ProductId');
            $table->integer('ShoppingCartId');
            $table->string('TilteSize', 100)->nullable()->default('Nhỏ');
            $table->integer('Count')->default(0);
            $table->dateTime('CreatedDate')->default('2021-12-30 18:45:13');

            $table->primary(['ShoppingCartId', 'ProductId']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ShoppingCart_Product');
    }
}
