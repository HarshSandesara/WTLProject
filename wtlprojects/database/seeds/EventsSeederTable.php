<?php

use Illuminate\Database\Seeder;
use App\Event;
use App\Committee;

class EventsSeederTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Event::truncate();
        $faker = \Faker\Factory::create();
        for ($i=0; $i < 10; $i++) {
            Event::create([
                'name' => $faker->name,
                'from' => $faker->dateTimeBetween('now', '+3 days'),
                'to' => $faker->dateTimeBetween('+3 days', '+6 days'),
                'price' => $faker->numberBetween($min = 10, $max = 500),
                'committee_id' => $this->getRandomCommitteeId()
            ]);
        }
    }
    private function getRandomCommitteeId() {
        $committee = Committee::inRandomOrder()->first();
        return $committee->id;
    }
}
