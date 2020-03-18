<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['name', 'when', 'committee_id'];

    function committee()
    {
        return $this->belongsTo('App\Committee');
    }
}
