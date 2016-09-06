/* eslint-disable max-len, no-unused-vars */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Projects } from '../../api/projects/projects';

// Fixture data
Meteor.startup(() => {
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: 'rdagger',
      email: 'rdagger68@gmail.com',
      password: 'password',
    });

    Accounts.createUser({
      username: 'dchang',
      email: 'dchang68@hotmail.com',
      password: 'password',
    });
  }

  if (Projects.find().count() === 0) {
    console.log('Adding Project Fixture data..');
    // let timeStamp = new Date('1970-01-01T00:00:00.000Z');
    const timeStamp = new Date('2016-01-01T00:00:00.000Z');
    // create two users
    const rdaggerId = Meteor.users.findOne({ username: 'rdagger' })._id;
    const dchangId = Meteor.users.findOne({ username: 'dchang' })._id;

    const quetzalcoatlusId = Projects.insert({
      _id: 'j3LFvSeQZ7tkeRKWS',
      title: 'Quetzalcoatlus',
      authorName: 'rdagger',
      authorId: rdaggerId,
      category: 'Action',
      coverUploaded: timeStamp,
      description: 'Control the largest known flying animal of all time.',
    });

    const bionicDogSleddingId = Projects.insert({
      _id: 'TiT9JDArfFiqg8DCk',
      title: 'Bionic Dog Sledding',
      authorName: 'rdagger',
      authorId: rdaggerId,
      category: 'Sports',
      coverUploaded: timeStamp,
      description: 'You race bionic dogs across the Alaskan tundra at supersonic speeds.',
    });

    const journeyToTheCenterOfMarsId = Projects.insert({
      _id: 'm7tJfqJobhfTjRyWr',
      title: 'Journey to the Center of Mars',
      authorName: 'rdagger',
      authorId: rdaggerId,
      category: 'Adventure',
      coverUploaded: timeStamp,
      description: 'The story involves Japanese professor Hero Lidenmoto who believes there are volcanic tubes going toward the center of the Mars. He, his nephew Akira, and their guide Jules descend into the Olympus Mons volcano, encountering many adventures, including prehistoric animals and natural hazards, before eventually coming to the surface again at the south pole.',
      gamePlay: 'the game begins when your spaceship lands at Tranqulity base located at the caldera of Olympus Mons.  A recently uncovered volcanic shaft leaves you a room with long hallway...',
    });


    const badDudesRebootedId = Projects.insert({
      _id: 'q9G33nKEs5tFkmiYY',
      title: 'Bad Dudes Rebooted',
      authorName: 'dchang',
      authorId: dchangId,
      category: 'Casual',
      coverUploaded: timeStamp,
      description: 'President Obama has been kidnapped by Ninjas. Are you a bad enough dude to rescue Barack?',
      gamePlay: 'scrolling fighter',
    });

    const radikalPizzaId = Projects.insert({
      _id: 'qYEuy4xC83s4Zaj33',
      title: 'Radikal Pizza',
      authorName: 'dchang',
      authorId: dchangId,
      category: 'Racing',
      coverUploaded: timeStamp,
      description: 'Radikal pizza is set in a Mediterranean environment, and is based on delivering pizza on a rare Italian scooter called Italjet Dragster in heavy traffic before your AI opponent does, while getting points.',
      gamePlay: 'Motorcycle Controls: Throttle, Brake',
    });

    const alienAlligators = Projects.insert({
      _id: 'T7BirzreAX4Ttd7oo',
      title: 'Alien Alligators',
      authorName: 'rdagger',
      authorId: rdaggerId,
      category: 'Shooter',
      coverUploaded: timeStamp,
      description: 'Reptilian-looking aliens are invading earth and is up to the bravest soldiers (skateboarding kids!) to stop the invasion and destroy the enemy base',
      gamePlay: 'The players characters are seen from behind. Some screens feature protective walls (which can get damaged and shattered by enemy fire). The players have limitless ammunition for their primary gun, but a limited number of sticks of dynamite.',
    });

    const chess4DId = Projects.insert({
      _id: 'FoCEMs59oW9xevTw9',
      title: 'Chess 4d',
      authorName: 'Donna Chang',
      authorId: dchangId,
      category: 'Strategy',
      coverUploaded: timeStamp,
      description: '4 dimensional chess moving pieces along the surface of a four-dimensional hypercube.',
      gamePlay: 'Living in more dimensions means having more directions you can move in.  There are many weird physical consequences of playing chess in more dimensions.',
    });

    const cyborgSamuraiId = Projects.insert({
      _id: 'KHsBknzgyBMyhu4K7',
      title: 'Cyborg Samurai',
      authorName: 'dchang',
      authorId: dchangId,
      category: 'Action',
      coverUploaded: timeStamp,
      description: 'Battle T-800 cybernetic samurais sent back in time from the year 2029.',
      gamePlay: 'You have been targeted for termination by a Japenese super computer from the future.',
    });

    const donkeyKongRebootedId = Projects.insert({
      _id: '6REgu7cPwCEwpDEpE',
      title: 'Donkey Kong Rebooted',
      authorName: 'dchang',
      authorId: dchangId,
      category: 'Platformer',
      coverUploaded: timeStamp,
      description: 'Rescue Pauline from a giant ape.',
      gamePlay: 'You are a workman named Mario who climbs girders and ladders and will stop at nothing to save his stolen love from the clutches of the giant ape. Using the joystick and the Jump button, you maneuver Mario over rolling barrels, away from falling barrels, over or away from fireballs and cement tubs, away from bouncing rivets, up and down ladders, along girders and conveyor belts, onto elevators, over rivets to remove them and over dangerous crevices, to get to where the ape holds the girl captive.',
    });

    const dungeonsOfEnceladusId = Projects.insert({
      _id: 'gX87L4gjSZDM42Y85',
      title: 'Dungeons of Enceladus',
      authorName: 'dchang',
      authorId: dchangId,
      category: 'RPG',
      coverUploaded: timeStamp,
      description: 'A fantasy role-playing game set deep below the surface of the sixth-largest moon of Saturn',
      gamePlay: 'The players are adventurers: a human fighter, a human Cleric, a female Elf warrior-mage and a Dwarven warrior. They explore the off-world dungeons performing heroic deeds and making the solar system safe from the forces of darkness, all the while fighting monsters, gathering treasure and advancing in power.',
    });

    const laserTangramId = Projects.insert({
      _id: 'mHGEpXAfFYTGmZvQ3',
      title: 'Laser Tangram',
      authorName: 'dchang',
      authorId: dchangId,
      category: 'Puzzle',
      coverUploaded: timeStamp,
      description: 'Use lasers to cut and destroy geometric puzzles.',
      gamePlay: 'A highly addictive, challenging and seriously fun experience that is captivating gamers around the globe.  Use the many awesome objects including TNT, balls, wormholes, elevators, magnets and more to direct your laser beam at the target. Smash, burn and blast your way to victory. The possibilities are endless!  Features many amazing levels ranging from simple to incredibly challenging.',
    });

    const lunarRaceId = Projects.insert({
      _id: 'nKpLxK6J7uTxD62Bg',
      title: 'Lunar Race',
      authorName: 'rdagger',
      authorId: rdaggerId,
      category: 'Racing',
      coverUploaded: timeStamp,
      description: '3D third-person racing game on the moon. The player controls a fusion powered space car racing through Mare Serenitatis.',
      gamePlay: 'The player must race to the end of each stage as fast as possible against a time limit while avoiding traffic and obstacles. At the end of each stage, the player is presented with a fork in the road where the player must choose one of two stages. The left route presents an easier stage, while the right offers a greater challenge. Passing through checkpoints awards the player with extra time. Once the timer reaches zero or the player completes the race, the game ends.',
    });

    const penguinWarfareId = Projects.insert({
      _id: '7zvbD5Wxyjfi7bsNE',
      title: 'Penguin Warfare',
      authorName: 'dchang',
      authorId: dchangId,
      category: 'MMO',
      coverUploaded: timeStamp,
      description: 'Players battle armies of penguins against each other for control of the frozen throne.',
      gamePlay: 'Real-time strategy MMO where penguins interact in a virtual world that is very cold.',
    });

    const simJengaId = Projects.insert({
      _id: 'JoGW9qn9yPnXyW8v5',
      title: 'Sim Jenga',
      authorName: 'dchang',
      authorId: dchangId,
      category: 'Simulation',
      coverUploaded: timeStamp,
      description: 'Players are given the task of building a city where all buildings are composed of 54 wooden blocks.',
      gamePlay: 'The happiness of the citizens demands taller buildings.  State budget does not afford more than 54 blocks per building so blocks must be removed from lower levels to achieve greater heights.',
    });

    const spaceshipConstructionYardId = Projects.insert({
      _id: 'pximmFFf9APDXLbme',
      title: 'Spaceship Construction Yard',
      authorName: 'dchang',
      authorId: dchangId,
      category: 'Simulation',
      coverUploaded: timeStamp,
      description: 'Design and supervise the construction of spaceships.',
      gamePlay: 'You are the top engineer at the Utopia Planitia shipyards, a key Starfleet vessel construction and design facility in the 24th century. The facility includes a number of drydocks and space stations, as well as several large drafting rooms for starship design and planetary facilities on the surface of Mars.',
    });


    const starTrainId = Projects.insert({
      _id: 'sZCKQzxwQ8WsJ5YMj',
      title: 'Star Train',
      authorName: 'rdagger',
      authorId: rdaggerId,
      category: 'Action',
      coverUploaded: timeStamp,
      description: 'A 3d space combat game on a train.',
      gamePlay: 'You navigate and defend a space-bound train escaping the invading fleet of alien Zylon vessels.',
    });

    const voodooIslandId = Projects.insert({
      _id: 'XStPHxT4nQLnR773a',
      title: 'Voodoo Island',
      authorName: 'rdagger',
      authorId: rdaggerId,
      category: 'Adventure',
      coverUploaded: timeStamp,
      description: 'Explore the jungle of evil on Voodoo island.',
      gamePlay: 'Avoid monstrous man eating plants that devour human beings alive.  Battle the zombie victims of black magic and defeat the tribe of natives with bizarre powers. ',
    });

    const zombieTreesId = Projects.insert({
      _id: 'vf5oy2RrtXxXdxPPk',
      title: 'Zombie Trees',
      authorName: 'rdagger',
      authorId: rdaggerId,
      category: 'Shooter',
      coverUploaded: timeStamp,
      description: 'Battle zombie trees.',
      gamePlay: 'Arborists accidently unleash a deadly tree blight that causes trees to die and fall over.  Free from the soil, the trees become animated with a hunger for human brains.  Armed with only a chainsaw you must cut the roots off the undead trees to kill them permanently. ',
    });
  }
});
