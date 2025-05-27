
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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('numero', 50);
            $table->integer('espaco')->default(0);
            $table->enum('disponibilidade', ['livre', 'reservada'])->default('livre');
            $table->text('descricao')->nullable();
            $table->string('sede');
            $table->json('recursos')->nullable();
            $table->timestamps();

            // Indexes
            $table->index('disponibilidade');
            $table->index('sede');
            $table->unique(['numero', 'sede']); // Room number should be unique per sede
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
