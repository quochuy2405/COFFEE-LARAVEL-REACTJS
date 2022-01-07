<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShoppingCartTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ShoppingCart', function (Blueprint $table) {
            $table->integer('Id', true);
            $table->integer('CustomerId')->nullable()->index('IX_ShoppingCart_CustomerId');
            $table->integer('ProductQuantity')->default(0);
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
        Schema::dropIfExists('ShoppingCart');
    }
}
