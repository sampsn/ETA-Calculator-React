'use client';
import * as React from 'react';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function Calculator() {

  const { setTheme } = useTheme()
  const [clicked, setClicked] = useState(false);

  const toggleTheme = () => {
    if (clicked === false) {
      setClicked(true);
      setTheme("light");
    } else {
      setClicked(false);
      setTheme("dark");
    }

  }

  const [speed, setSpeed] = useState<number | undefined>(undefined);
  const [distance, setDistance] = useState<number | undefined>(undefined);

  const [result, setResult] = useState<number>(0);

  const updateSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(event.target.value))

  }
  const updateDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(Number(event.target.value))

  }
  const calculateResults = () => {
    setResult(Number((Number(distance) / Number(speed)).toFixed(2)));
  }

  const resetFields = () => {
    setSpeed(undefined)
    setDistance(undefined)
    setResult(0)
  }

  return (
    <div className="flex flex-row relative">
      <Card className="w-90 h-fit">
        <CardHeader className="flex flex-col justify-center items-center">
          <CardTitle>ETA Calculator</CardTitle>
          <CardDescription>Calculate your estimated time of arrival</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h1 className="text-5xl font-bold mt-4 text-center">{String(result)}</h1>
            <p className="mt-2 text-md opacity-90 font-thin text-center m-0">hours remain</p>
          </div>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="speed">Speed</Label>
                <Input type="number" value={speed ?? ''} id="speed" placeholder="What speed are you going?" onChange={updateSpeed} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="distance">Distance</Label>
                <Input type="number" value={distance ?? ''} id="distance" placeholder="How much farther do you have?" onChange={updateDistance} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-around gap-4">
          <Button className="w-full" onClick={calculateResults}>Calculate</Button>
          <Button variant="outline" onClick={resetFields}>Reset</Button>
        </CardFooter>
      </Card>
      <Button className="absolute right-[-50px]" variant="outline" size="icon" onClick={toggleTheme}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

    </div>
  )
}
