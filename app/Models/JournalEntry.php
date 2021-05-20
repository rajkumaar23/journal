<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static where(string $string, $date)
 * @method static updateOrInsert(array $array, array $array1)
 * @method static updateOrCreate(array $array, array $array1)
 * @method static create(array $array)
 */
class JournalEntry extends Model
{
    use HasFactory;

    protected $primaryKey = 'date';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'date', 'body',
    ];
}
