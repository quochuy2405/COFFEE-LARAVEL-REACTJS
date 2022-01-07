<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoreTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Store', function (Blueprint $table) {
            $table->integer('Id', true);
            $table->string('StoreName', 150);
            $table->text('Description')->nullable();
            $table->string('Address', 500)->unique('IX_Store_Address');
            $table->string('Country', 100);
            $table->string('Phone', 11)->unique('IX_Store_Phone');
            $table->text('Photo')->nullable();
            $table->text('LinkGG')->nullable();
            $table->text('District')->nullable();
            $table->integer('ManagerId')->nullable()->unique('IX_Store_ManagerId');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Store');
    }
}
