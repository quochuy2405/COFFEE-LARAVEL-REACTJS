<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToShoppingCartTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ShoppingCart', function (Blueprint $table) {
            $table->foreign(['CustomerId'], 'FK_ShoppingCart_Customer_CustomerId')->references(['Id'])->on('users')->onUpdate('NO ACTION')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ShoppingCart', function (Blueprint $table) {
            $table->dropForeign('FK_ShoppingCart_Customer_CustomerId');
        });
    }
}
