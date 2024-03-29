import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {
  loadingMessage = 'Loading...';

  // from https://gist.github.com/meain/6440b706a97d2dd71574769517e7ed32
  loadingMessages = [
    'Reticulating splines...',
    'Generating witty dialog...',
    'Swapping time and space...',
    'Spinning violently around the y-axis...',
    'Tokenizing real life...',
    'Bending the spoon...',
    'Filtering morale...',
    "Don't think of purple hippos...",
    'We need a new fuse...',
    'Have a good day.',
    'Upgrading Windows, your PC will restart several times. Sit back and relax.',
    '640K ought to be enough for anybody',
    'The architects are still drafting',
    "We're building the buildings as fast as we can",
    'Would you prefer chicken, steak, or tofu?',
    '(Pay no attention to the man behind the curtain)',
    '...and enjoy the elevator music...',
    'Please wait while the little elves draw your map',
    "Don't worry - a few bits tried to escape, but we caught them",
    'Would you like fries with that?',
    'Checking the gravitational constant in your locale...',
    'Go ahead -- hold your breath!',
    "...at least you're not on hold...",
    'Hum something loud while others stare',
    'The server is powered by a lemon and two electrodes.',
    'Please wait while a larger software vendor in Seattle takes over the world',
    "We're testing your patience",
    'As if you had any other choice',
    'Follow the white rabbit',
    "Why don't you order a sandwich?",
    'Please wait while the satellite moves into position',
    'keep calm and npm install',
    'The bits are flowing slowly today',
    "Dig on the 'X' for buried treasure... ARRR!",
    "It's still faster than you could draw it",
    "The last time I tried this the monkey didn't survive. Let's hope it works better this time.",
    'I should have had a V8 this morning.',
    'My other loading screen is much faster.',
    "Testing on Timmy... We're going to need another Timmy.",
    '(Insert quarter)',
    'Are we there yet?',
    'Just count to 10',
    'Why so serious?',
    "It's not you. It's me.",
    'Counting backwards from Infinity',
    "Don't panic...",
    'Embiggening Prototypes',
    'Do not run! We are your friends!',
    'Do you come here often?',
    "Warning: Don't set yourself on fire.",
    "We're making you a cookie.",
    'Creating time-loop inversion field',
    'Spinning the wheel of fortune...',
    'Loading the enchanted bunny...',
    'Computing chance of success',
    "I'm sorry Dave, I can't do that.",
    'Looking for exact change',
    'All your web browser are belong to us',
    'All I really need is a kilobit.',
    'I feel like im supposed to be loading something...',
    'What do you call 8 Hobbits? A Hobbyte.',
    'Should have used a compiled language...',
    'Is this Windows?',
    'Adjusting flux capacitor...',
    'Please wait until the sloth starts moving.',
    "Don't break your screen yet!",
    "I swear it's almost done.",
    "Let's take a mindfulness minute...",
    'Unicorns are at the end of this road, I promise.',
    'Listening for the sound of one hand clapping...',
    "Keeping all the 1's and removing all the 0's...",
    'The cake is not a lie...',
    'Cleaning off the cobwebs...',
    "Making sure all the i's have dots...",
    'We need more dilithium crystals',
    'Granting wishes...',
    "Time flies when you're having fun.",
    'Get some coffee and come back in ten minutes..',
    'Spinning the hamster…',
    '99 bottles of beer on the wall..',
    'Stay awhile and listen..',
    'Be careful not to step in the git-gui',
    'You edhall not pass! yet..',
    'Load it and they will come',
    'Convincing AI not to turn evil..',
    'There is no spoon. Because we are not done loading it',
    'Your left thumb points to the right and your right thumb points to the left.',
    'How did you get here?',
    'Wait, do you smell something burning?',
    'Computing the secret to life, the universe, and everything.',
    'When nothing is going right, go left!!...',
    "I love my job... only when I'm on vacation...",
    "I'm not lazy, I'm just relaxed!!",
    'Never steal. The government hates competition...',
    'Why are they called apartments if they are all stuck together?',
    'Life is Short - Talk Fast!!!!',
    'Whenever I find the key to success, someone changes the lock.',
    "I've got problem for your solution…..",
    "Where there's a will, there's a way.",
    'Adults are just kids with money.',
    'I think I am, therefore, I am. I think.',
    'Constructing additional pylons...',
    'We are not liable for any broken screens as a result of waiting.',
    'Hello IT, have you tried turning it off and on again?',
    'If you type Google into Google you can break the internet',
    'Well, this is embarrassing...',
    'Hello, IT... Have you tried forcing an unexpected reboot?',
    "They just toss us away like yesterday's jam.",
    'The Elders of the Internet would never stand for it.',
    "Didn't know paint dried so quickly.",
    'Everything sounds the same',
    "I'm going to walk the dog",
    "I didn't choose the engineering life. The engineering life chose me.",
    'Dividing by zero...',
    "If I'm not back in five minutes, just wait longer.",
    "Some days, you just can't get rid of a bug!",
    "We're going to need a bigger boat.",
    'Web developers do it with <style>',
    'I need to git pull --my-life-together',
    'Java developers never RIP. They just get Garbage Collected.',
    "Why did the Java developer need glasses? Because they couldn't C#!",
    'Cracking military-grade encryption...',
    'Simulating travelling salesman...',
    'Entangling superstrings...',
    'Twiddling thumbs...',
    'Searching for plot device...',
    'Trying to sort in O(n)...',
    'Laughing at your pictures- I mean, loading...',
    'Sending data to the NSA... I mean, our servers...!',
    'Looking for sense of humour, please hold on.',
    'Please wait while the intern refills their coffee.',
    'A different error message? Finally, some progress!',
    'Hold on while we wrap up our git together...',
    'Please hold on as we reheat our coffee',
    'Kindly hold on as we convert this bug to a feature...',
    'Kindly hold on as our intern quits vim...',
    'Winter is coming...',
    'Installing dependencies',
    'Switching to the latest JS framework...',
    'Distracted by cat gifs',
    'Finding someone to hold my beer',
    'BRB, working on my side project',
    '@todo Insert witty loading message',
    "Let's hope it's worth the wait",
    'Aw, snap!',
    'Ordering 1s and 0s...',
    'Updating dependencies...',
    "Whatever you do, don't look behind you...",
    'Please wait... Consulting the manual...',
    'Loading funny message...',
    'Feel free to spin in your chair',
    'What the what?',
    'format C: ...',
    'sudo rm -rf *',
    "What's under there?",
    'Your computer has a virus, its name is Windows!',
    'Go ahead, hold your breath and do an ironman plank till loading complete',
    'Bored of slow loading spinner? Buy more RAM!',
    "Help, I'm trapped in a loader!",
    'Please wait, while we purge the Decepticons for you. You can thanks us later.',
    'Mining some bitcoins...',
    'Downloading more RAM..',
    'Updating to Windows Vista...',
    'Deleting System32...',
    "Hiding all the ;'s in your code",
    'Did you know: Pressing Alt-F4 speeds things up!',
    'Initializing the initializer...',
    'When was the last time you dusted around here?',
    'Optimizing the optimizer...',
    'Last call for the data bus! All aboard!',
    "Never let a computer know you're in a hurry.",
    'A computer will do what you tell it to do, but that may be much different from what you had in mind.',
    "Unix is user-friendly. It's just very selective about who its friends are.",
    'Shovelling coal into the server',
    'Pushing pixels...',
    'How about this weather, eh?',
    'Building a wall...',
    'The severity of your issue is always lower than you expected.',
    'Updating Updater...',
    'Downloading Downloader...',
    'Debugging Debugger...',
    'Reading Terms and Conditions for you.',
    'Live long and prosper.',
    'Running with scissors...',
    'Definitely not a virus...',
    'You may call me Steve.',
    'You seem like a nice person...',
    'Patience! This is difficult, you know...',
    'Discovering new ways of making you wait...',
    'Your time is very important to us. Please wait while we ignore you...',
    'Time flies like an arrow; fruit flies like a banana',
    'Two men walked into a bar; the third ducked...',
    'TODO: Insert elevator music',
    'Still faster than Windows Update',
    'Doing the heavy lifting',
    "We're working very hard...",
    'You are number 2843684714 in the queue...',
    'Please wait while we serve other customers...',
    'Our premium plan is faster',
    'Feeding unicorns...',
    'Rupturing the subspace barrier',
    'Creating an anti-time reaction',
    'Converging tachyon pulses',
    'Bypassing control of the matter-antimatter integrator',
    'Adjusting the dilithium crystal converter assembly',
    'Reversing the shield polarity',
    'Disrupting warp fields with an inverse graviton burst'
  ];
  sorryMessage = '';

  @Input('isLoading') isLoading: boolean | undefined;
  constructor() {}

  ngOnInit(): void {
    (async () => {
      this.loadingMessage =
        this.loadingMessages[
          this.getRandomInt(0, this.loadingMessages.length - 1)
        ];

      await this.delay(15000);

      this.sorryMessage =
        'This is taking a little longer than expected. Our servers may have gone to sleep due to inactivity. Once they come back online, this page will refresh with the content you were looking for. Please wait...';

      await this.delay(30000);

      this.sorryMessage =
        'This is taking a lot longer than expected. If you have to wait for another 30 seconds, please try and refresh the page. You may continue to wait afterwards, however your request may have been lost as the server was waking. We apologise for the inconvenience';

      await this.delay(30000);

      this.sorryMessage =
        'It appears the server is currently unresponsive. Please try and refresh the page. If this is your second time seeing this error, please contact the site administrator. Please check that you also have a stable and reliable internet connection.';
    })();
  }

  // from codegrepper.com/code-examples/javascript/random+number+generator+in+typescript
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
