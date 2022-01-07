<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToStoreTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('Store', function (Blueprint $table) {
            $table->foreign(['ManagerId'], 'FK_Store_Manager_ManagerId')->references(['Id'])->on('Manager')->onUpdate('NO ACTION')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Store', function (Blueprint $table) {
            $table->dropForeign('FK_Store_Manager_ManagerId');
        });
    }
}
