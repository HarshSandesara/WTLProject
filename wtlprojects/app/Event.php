<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    function committee()
    {
        return $this->belongsTo('App\Committee');
    }
}
