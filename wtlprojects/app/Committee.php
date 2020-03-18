<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Committee extends Model
{
    protected $fillable = ['title', 'body'];

    public function followedBy()
    {
       return $this->belongsToMany('App\User', 'commitee_user');
    }

    public function event()
    {
        return $this->hasMany('App\Event');
    }
}
