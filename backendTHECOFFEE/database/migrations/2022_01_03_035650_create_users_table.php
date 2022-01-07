<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->integer('Id', true);
            $table->string('Username', 100)->unique('IX_Customer_Username');
            $table->string('password', 100);
            $table->string('email', 100)->unique('IX_Customer_Email');
            $table->string('Phone', 11)->unique('IX_Customer_Phone');
            $table->string('Name', 100);
            $table->string('Avata')->nullable();
            $table->text('Address')->nullable();
            $table->string('City', 100)->nullable();
            $table->string('Country', 100)->nullable();
            $table->integer('Gender')->nullable();
            $table->text('Role')->nullable();

            $table->unique(['Username', 'email', 'Phone'], 'IX_Customer_Username_Email_Phone');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
