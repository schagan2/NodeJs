var runObjects = [{
   connectionID : 'S001',
   connectionName : 'Base Run',
   category: 'Simple',
   date :  'Saturday October 17 2020',
   time : '8AM - 9AM',
   eventArea : 'UNCC Trail',
   eventHost : 'UNCC',
   description : 'A base run is a relatively short to moderate-length run undertaken at a runner’s natural pace. While individual base runs are not meant to be challenging, they are meant to be done frequently. Base runs will make up a bulk of your weekly training mileage.',
   benefits : ['Allows a runner to work on form for more efficient running',
   'Allows a runner to develop speed and endurance slowly without the risk of injury',
   'Allows a runner to increase mental toughness gradually',
   'Allows the body to adapt slowly to increased stress']
},
{
    connectionID : 'S002',
    connectionName : 'Progression Run',
    category: 'Simple',
    date :  'Sunday October 18 2020',
    time : '7AM - 8AM',
    eventArea : 'UNCC Trail',
    eventHost : 'UNCC',
    description : 'A progression run is a run with structured pace increases from beginning to end. The distance and pace will vary based on your specific training goals.'+
    'They are great for building stamina, mental strength, and teaching the body to run increasingly faster at the end of a race.',
    benefits : ['Allows a runner to increase the stamina and fitness.',
    'Allows runners mental patience and allows the body to fully warm-up.',
    'Allosw you to insert fast running into your training runs']
 },
 {
    connectionID : 'S003',
    connectionName : 'Intervals Run',
    category: 'Simple',
    date :  'Saturday October 24 2020',
    time : '7AM - 8AM',
    eventArea : 'UNCC Trail',
    eventHost : 'UNCC',
    description : 'An interval running plan alternates between periods of intense, fast paces followed by less intense recovery periods.'+
    'You push yourself close to your peak heart rate during a brief sprint, then allow it to fall back down as you slow to a jog.',
    benefits : ['Will have greater anaerobic capacity.',
    'To improve your cardiovascular system and speed up your metabolism, you need to incorporate new challenges into your workout, and interval running is the perfect fit.',
    'Boosts weight loss.']
 },
 {
    connectionID : 'E001',
    connectionName : 'Long Run',
    category: 'Extensive',
    date :  'Sunday October 25 2020',
    time : '7AM - 8AM',
    eventArea : 'UNCC Trail',
    eventHost : 'UNCC',
    description : 'As the name implies, a long run is a prolonged effort run with the main purpose of increasing endurance and stamina.'+
    'These 60 to 120 minutes (even more) runs are all about running at an easy pace— one that’s slow enough that you could carry on a conversation without huffing and puffing.',
    benefits : ['Gives stronger muscles, bone strength, stronger capillaries.',
    'Improved aerobic system.',
    'Helps to make your running more efficient, improving your speed and reducing injury risk.']
 },
 {
    connectionID : 'E002',
    connectionName : 'Hill Repeat Run',
    category: 'Extensive',
    date :  'Sunday October 25 2020',
    time : '7AM - 8AM',
    eventArea : 'UNCC Trail',
    eventHost : 'UNCC',
    description : 'Although hills come in all different lengths and degrees of incline, the basic concept of a hill repeat is usually the same.'+ 
    'You run up the hill fast and then recover by jogging or walking down.',
    benefits : ['Hill repeats are an excellent way for runners to build strength, improve their speed, and build their mental strength and confidence in hill running',
    'Bust boredom.',
    'Helps to make your running more efficient, improving your speed and reducing injury risk.']
 },
 {
    connectionID : 'E003',
    connectionName : 'Recovery Run',
    category: 'Extensive',
    date :  'Sunday October 25 2020',
    time : '7AM - 8AM',
    eventArea : 'UNCC Trail',
    eventHost : 'UNCC',
    description : 'Basically, a recovery run is a short, slow run, completed within 24 hours after a hard session, usually an interval workout or a long run.'+
    'A recovery run can be of any distance, but as a rule shorter than your base sessions, and performed at a pace 60 to 90 seconds slower than your average run.',
    benefits : ['Improved recovery, fatigue restitance, bloof flow',
    'Prevents soreness.',
    'Adds volume and improves form.']
 }];

 function getConnections(){
     return runObjects;
 } 

 function getConnection(connectionID){
     return runObjects.findIndex(element => element.connectionID === connectionID);
 }

 module.exports = {
     runObjects,
     getConnections,
     getConnection
 };