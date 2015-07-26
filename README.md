LifeSim
=======

6/8/15
------

- How to make a cool ecosystem? What are the things that make it cool?
	- The ecosystem displays emergent behavior not predicted by the ecosystem's creator
	- The ecosystem changes over time and is in a constant state of flux
	- The ecosystem is complex and has a wide range of lifeforms
	- The ecosystem is long-running and stable (i.e. no "end state" that always occurs)

So these are my basic requirements, what are some other requirements/nice to haves:

	- Some way to visually view the ecosystem online
	- Some way to see the ecosystem history over time (stats, etc.)
	- Ecosystem behavior should sometimes mimic that seen in the real world. This may seem like a random condition, but I think that seeing some of the kinds of population swings and species behaviors mirror that seen in the real world indicates that the ecosystem simulation is indeed stable.
	- I really want to see emergent swarming behavior. Not sure if I can make that happen though
	- I think it would be cool to see creatures (what I call individuals of a species in the ecosystem) band together to form larger "organisms". This is similar to the swarm idea, but slightly different in that in this case different creatures would all be together forming a more robust meta creature (like how humans are made up of specialized cells)


- What will the mechanics be?

	- Grid based: all creatures are on a grid, each individual grid can be filled by only one (or maybe multiple?) creatures. In my original ecosystem simulation, there was no grid, and no demand that the creatures occupy different spots. This led to some cool behavior, so no guarantee that the rule of all creatures having their own grid and not being able to share may change. However, I will stick with a grid as it will allow much larger simulations
	- Creature movement should be vector-based, in that the surrounding grid cells inform the next move. All neighboring grid cells will be assessed and a set of if-statements will determine the vector each neighboring cell provides to the creature. All vectors are summed up, giving the creature its final movement vector

Starting off I think I will stick with this. A grid that I can display in the browser, and creatures that I can experiment with to determine different rules to allow for an optimally cool ecosystem

6/9/15
------

How the heck do I implement all of this? I think I am going to go a little crazy and try multiple new technologies at once. This might be a horrible idea, but oh well. So the plan is to use Julia, Docker, WebSockets, and Amazon EC2.

My current thoughts (and understanding) are that I can run a Docker container on an EC2 instance, the docker container will have the backend Julia code running the ecosystem simulation. This backend will then communicate through WebSockets some kind of information (json?) which will be displayed by a browser. Makes sense? Sort of?


6/30
----

Need to create a slider bar so you can see the whole history

7/1
---
Decision factors vs. attributes:

Attributes: These determine what the creature can do (attack, speed, etc)

Decision factors: These determine how the creature will act (aggression, mating, etc)