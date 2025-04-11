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
        Schema::create('itineraris', function (Blueprint $table) {
            $table->id();
            $table->string('foto')->nullable();
            $table->foreignId('viatge_id')->constrained('viatges')->onDelete('cascade')->onUpdate('cascade');
            $table->string('nomItinerari');
            $table->text('descripcio')->nullable();
            $table->text('pais')->nullable();
            $table->string('latitud');
            $table->string('longitud');
            $table->boolean('completat')->default(false);
            $table->string('transport');
            $table->string('durada');
            $table->integer('visites');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itineraris');
    }
};