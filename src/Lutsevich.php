<?php

namespace src;

class Lutsevich implements FistingLover, TupaGay
{
    public function putInAss(BodyPart $bodyPart): string
    {
        if ($bodyPart->getSize() > 18) {
            return  'ohh yeeee';
        } else {
            return 'so small';
        }
    }

    public function sayMyName()
    {
        return 'I am tupa gAy';
    }
}
