---
title: "Vertie's Revenge — Console C# RPG"
summary: "A retro text-adventure Jedi RPG I'm building in console C#: an auto-battling gauntlet, a weighted loot table with a pity counter, and a maze where Vertie's Shadow hunts you down."
year: 2026
cover: ../../assets/projects/verties-revenge/01-maze-vertie-hunts.jpg
coverAlt: "Terminal output of Vertie's Maze — a dotted 12 by 6 grid with a robot, a column of brick walls, a ninja, a police sentry, a smiley-face player and Vertie's eye closing in, under the message 'Vertie's Shadow has entered the maze...'"
role: "Solo developer and designer"
engine: "C# / .NET (console)"
platforms: ["Windows terminal"]
teamSize: 1
status: "in-development"
tags: ["C#", ".NET", "Console", "Game systems", "RPG", "Learning project"]
featured: false
order: 0
draft: false
gallery:
  - src: ../../assets/projects/verties-revenge/00-playthrough.webp
    alt: "Animated playthrough: the gauntlet prints fight by fight, with the player beating Rusty Probe, Mark II Remote and then Vertie's Shadow on 3 HP. After a keypress, Vertie's Maze runs for 40 steps as the droids patrol and Vertie's Shadow enters halfway and hunts down the player."
    caption: "A full run, from the gauntlet to the maze. The maze plays at the game's real speed. The gauntlet is shown a line at a time so it can be read, but in the game it prints all at once."
  - src: ../../assets/projects/verties-revenge/01-maze-vertie-hunts.jpg
    alt: "Vertie's Maze mid-run: the Linear Droid is stuck against the brick wall, the Wander Droid has drifted to the top right, the Sentry stands guard beside the player, and Vertie's eye is two cells away and closing."
    caption: "Vertie's Shadow arrives halfway through the run and heads straight for the player."
  - src: ../../assets/projects/verties-revenge/02-maze-patrols.jpg
    alt: "Vertie's Maze early in the run: a robot on the top patrol route, a column of three brick walls, a ninja wandering beside them, and a police sentry next to the player."
    caption: "Three patrol behaviours: the Linear Droid walks a set route, the Wander Droid moves at random, and the Sentry holds its post. Walls block all of them."
  - src: ../../assets/projects/verties-revenge/03-gauntlet-vertie.jpg
    alt: "Terminal output of the final gauntlet fight against Vertie's Shadow over seven rounds, with hits, misses and both health totals each round, ending with the player on 2 HP and a prompt to enter Vertie's Maze."
    caption: "The gauntlet: both sides roll to hit every round, and the trash talk is part of the game."
  - src: ../../assets/projects/verties-revenge/04-mockup-title.jpg
    alt: "Title screen mockup with the 'Verties Final Revenge' logo — a red V and silver lettering over a purple shape with a single red eye — above a Continue, Start, Load and Exit menu."
    caption: "Title screen mockup for Vertie's Final Revenge, the planned finished game. I drew most of the logo, used ChatGPT to finish the colouring, then vectorised it."
  - src: ../../assets/projects/verties-revenge/05-mockup-character-creator.jpg
    alt: "Character creator layout: an ASCII art banner, a panel for player name, species, attunement and pet, a player and pet emote box, a starting stats box and an action bar."
    caption: "Character creator layout. The Force or Saber choice will set your starting stats."
  - src: ../../assets/projects/verties-revenge/06-mockup-main-screen.jpg
    alt: "Main screen layout: a player HUD for health and Force points, a box for maze, world and round or opponent HP, a large maze area and an action bar."
    caption: "Main screen layout."
  - src: ../../assets/projects/verties-revenge/07-mockup-battle.jpg
    alt: "Battle screen layout: an ASCII art banner above stacked player and opponent info bars, a combat log and an action bar."
    caption: "Battle screen layout."
---

## What it is

Vertie's Revenge is a retro text-adventure Jedi RPG that runs in the terminal. It started life as
Vertie's Great Trial and became Vertie's Revenge as I added more to it. Vertie's Final Revenge is
the finished game I'm working toward, which is on hold while I do my MSc.

Vertie is an
AI who's tired of training Padawans and wants to become the Master herself, so the trials stop
being friendly. In the full game you create a Padawan, choose whether they lean toward the Force or the Saber,
and that choice keeps mattering for the rest of the game. The core systems are built, and the character creator and story come next.

It's my capstone for Zero to Programmer, an eight-week C# course Tim tutored me through before
starting my MSc. Console first, on purpose: no engine to hide behind, just the systems.

## What's built so far

The working pieces run together as one .NET project.

- **The gauntlet.** The player auto-battles a roster of three opponents in turn: Rusty Probe,
  Mark II Remote and Vertie's Shadow. Both sides roll against their accuracy each round, and
  health carries over from one fight to the next.
- **Loot with a pity counter.** A weighted drop table of kyber crystals, from a 60% Cracked
  Shard down to a 1% Vertie's Own Crystal. I tested it with a harness that ran 10,000 attempts per
  setting. With no pity counter, the legendary took 102 pulls on average and 931 at worst. A pity
  counter at 50 guarantees it by pull 50.
- **Vertie's Maze.** A 12 by 6 grid with walls and three patrol behaviours: a Linear Droid on a
  fixed route, a Wander Droid that moves at random and a Sentry that stays put. Every move is
  proposed first, checked against the walls, then accepted or rejected. Halfway through, Vertie's
  Shadow enters and closes in on the player one step at a time.

## The design

Before writing the full game, I broke it down into twelve subsystems, each with its own job,
and ranked them. Padawan creation and stats come first, since every other system reads the
player's state. Presentation comes next, because the terminal is the whole interface, followed by
combat. A race challenge, Vertie's Gambit, got cut to the icebox: a good idea with too many moving
parts for now. I also mocked up the main screens in Illustrator, from the title screen to the
character creator and battle layout.

## What I learned

- **One front door.** A C# project can hold lots of files, but only one should run first. Turning
  loose lesson files into a single project, with `maze.cs` running the show and separate files for
  the trials and the gacha, is when it started to feel like a game rather than exercises.
- **Don't hard-code the legendary.** The pity counter finds the legendary by its weight, the
  lowest in the table, rather than by its name. New items can be swapped in without touching
  the code.
- **Propose, check, then move.** Separating where something wants to go from whether it's allowed
  to go there made walls simple, and it works the same for every kind of droid.

## How it was made

I wrote the code myself across the course, building on Tim's lesson starters and taking them
further. Tim tutored the course, and an AI assistant (Claude) reviewed my code and asked questions
as I worked, rather than writing the game for me. I drew most of the title logo myself, used
ChatGPT to finish the colouring while I was sick, and then vectorised it. The terminal screenshots
are real output from the current build, shown in a terminal-style frame.
