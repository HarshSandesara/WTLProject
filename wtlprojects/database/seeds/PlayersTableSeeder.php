<?php

use Illuminate\Database\Seeder;
use App\Player;

class PlayersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Player::truncate();
        $faker = \Faker\Factory::create();
        for ($i=0; $i < 5; $i++) {
            Player::create([
                'name' => $faker->firstName,
                'answers' => $faker->randomDigit,
                'points' => $faker->randomDigit
            ]);
        }
    }
}
