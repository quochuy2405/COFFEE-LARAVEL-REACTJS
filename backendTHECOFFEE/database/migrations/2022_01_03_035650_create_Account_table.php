<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Account', function (Blueprint $table) {
            $table->integer('Id', true);
            $table->string('Username', 100)->unique('IX_Account_Username');
            $table->string('Password', 100);
            $table->integer('RoleId')->nullable()->index('IX_Account_RoleId');
            $table->string('Name', 100)->nullable();
            $table->string('Avatar', 100)->nullable();
            $table->integer('ManagerId')->nullable()->unique('IX_Account_ManagerId');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Account');
    }
}
