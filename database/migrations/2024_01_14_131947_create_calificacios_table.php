<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('calificacios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('itinerari_id')->constrained('itineraris')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('puntuacio');
            $table->text('comentari')->nullable();
            $table->boolean('completat')->default(false);
            $table->foreignId('usuari_id')->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calificacions');
    }
};
