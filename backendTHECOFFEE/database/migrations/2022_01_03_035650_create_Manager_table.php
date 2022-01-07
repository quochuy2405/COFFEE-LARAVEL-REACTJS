<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateManagerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Manager', function (Blueprint $table) {
            $table->integer('Id', true);
            $table->string('Name', 150);
            $table->integer('Age');
            $table->integer('Gender')->nullable();
            $table->string('Email', 100)->unique('IX_Manager_Email');
            $table->string('Phone', 11)->unique('IX_Manager_Phone');
            $table->string('Address', 500);
            $table->string('City', 100);
            $table->string('Country', 100);
            $table->bigInteger('Salary')->default(0);
            $table->string('Status', 100)->nullable()->default('Hoạt động');
            $table->integer('Bonus')->default(0);
            $table->integer('StoreId')->nullable();
            $table->integer('AccountId')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Manager');
    }
}
