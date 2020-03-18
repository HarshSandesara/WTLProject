<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Event extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'committee_id' => $this->name,
            'answers'    => (int) $this->answers,
            'points'     => (int) $this->points,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
