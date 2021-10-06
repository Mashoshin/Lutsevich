<?php

namespace src;

class Lutsevich implements FistingLover, TupaGay
{
    public function putInAss(BodyPart $bodyPart): string
    {
        if ($bodyPart->getSize() > 18) {
            return  'Ohh yeeee';
        } else {
            return 'So small';
        }
    }

    public function sayMyName(): string
    {
        return 'I am gAy';
    }
}
