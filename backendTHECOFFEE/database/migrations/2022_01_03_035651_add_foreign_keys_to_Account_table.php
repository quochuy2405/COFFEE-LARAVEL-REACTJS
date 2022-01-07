<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('Account', function (Blueprint $table) {
            $table->foreign(['ManagerId'], 'FK_Account_Manager_ManagerId')->references(['Id'])->on('Manager')->onUpdate('NO ACTION')->onDelete('CASCADE');
            $table->foreign(['RoleId'], 'FK_Account_Role_RoleId')->references(['Id'])->on('Role')->onUpdate('NO ACTION')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Account', function (Blueprint $table) {
            $table->dropForeign('FK_Account_Manager_ManagerId');
            $table->dropForeign('FK_Account_Role_RoleId');
        });
    }
}
