<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Committee extends Authenticatable
{

    protected $guard = 'committee';

    protected $fillable = ['title', 'body', 'name', 'email', 'password',];
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function followedBy()
    {
       return $this->belongsToMany('App\User', 'committee_user');
    }

    public function event()
    {
        return $this->hasMany('App\Event');
    }
}
