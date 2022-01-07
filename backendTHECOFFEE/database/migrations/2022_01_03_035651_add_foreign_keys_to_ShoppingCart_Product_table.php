<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToShoppingCartProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ShoppingCart_Product', function (Blueprint $table) {
            $table->foreign(['ProductId'], 'FK_ShoppingCart_Product_Product_ProductId')->references(['Id'])->on('Product')->onUpdate('NO ACTION')->onDelete('CASCADE');
            $table->foreign(['ShoppingCartId'], 'FK_ShoppingCart_Product_ShoppingCart_ShoppingCartId')->references(['Id'])->on('ShoppingCart')->onUpdate('NO ACTION')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ShoppingCart_Product', function (Blueprint $table) {
            $table->dropForeign('FK_ShoppingCart_Product_Product_ProductId');
            $table->dropForeign('FK_ShoppingCart_Product_ShoppingCart_ShoppingCartId');
        });
    }
}
