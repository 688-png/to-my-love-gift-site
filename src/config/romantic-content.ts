export interface Milestone {
  id: string;
  date: string;
  title: string;
  shortStory: string;
  detailedMemory?: string;
  iconName: string;
  location?: string;
  tag?: string;
}

export interface SpecialReason {
  id: number;
  teaser: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  date: string;
  caption: string;
  imageUrl: string;
  rotationDeg: number;
  note?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  consensusAnswer: number;
  playfulResponse: string;
}

export interface OpenWhenLetter {
  id: string;
  prompt: string;
  title: string;
  date?: string;
  letter: string;
  signature: string;
  accentIcon: string;
}

export interface JarNote {
  id: string;
  type: 'compliment' | 'memory' | 'joke' | 'sweet';
  text: string;
}

export interface BucketListItem {
  id: string;
  title: string;
  category: 'adventure' | 'cozy' | 'travel' | 'creative';
  completed: boolean;
  completedDate?: string;
  notes?: string;
}

export interface RomanticContentConfig {
  partner1: {
    name: string;
    nickname: string;
  };
  partner2: {
    name: string;
    nickname: string;
  };
  relationshipStatus: string;
  anniversaryDate: string; // YYYY-MM-DD or readable
  anniversaryFormatted: string;
  hero: {
    kicker: string;
    greetingPrefix: string;
    headline: string;
    subtitle: string;
    ctaText: string;
  };
  loveLetter: {
    salutation: string;
    date: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    psNote?: string;
  };
  milestones: Milestone[];
  reasons: SpecialReason[];
  gallery: GalleryPhoto[];
  quiz: QuizQuestion[];
  scratchCard: {
    hiddenMessage: string;
    scratchPrompt: string;
    subtitle: string;
  };
  openWhenLetters: OpenWhenLetter[];
  jarNotes: JarNote[];
  bucketList: BucketListItem[];
  finalSurprise: {
    kicker: string;
    headline: string;
    bodyParagraphs: string[];
    question: string;
    yesButtonText: string;
    alwaysButtonText: string;
    celebrationMessage: string;
    signature: string;
  };
  music: {
    enabled: boolean;
    customUrl?: string;
    trackTitle: string;
  };
  theme: {
    bgCream: string;
    primaryRose: string;
    accentBurgundy: string;
    secondaryBlush: string;
    textCharcoal: string;
  };
}

export const defaultRomanticContent: RomanticContentConfig = {
  partner1: {
    name: "Julian",
    nickname: "Jules",
  },
  partner2: {
    name: "Elena",
    nickname: "Ellie",
  },
  relationshipStatus: "Together & growing stronger every single day",
  anniversaryDate: "2023-10-14",
  anniversaryFormatted: "October 14, 2023",
  hero: {
    kicker: "A LITTLE WORLD FOR TWO",
    greetingPrefix: "Hey, my favorite person",
    headline: "In a world full of ordinary things, you became my favorite extraordinary one.",
    subtitle: "A private corner of the universe dedicated to our laughs, quiet Sunday mornings, spontaneous adventures, and every sweet memory in between.",
    ctaText: "Enter Our Little World",
  },
  loveLetter: {
    salutation: "My dearest Ellie,",
    date: "A quiet evening just for us",
    paragraphs: [
      "I was thinking about how quickly the noise of everyday life moves, and how remarkably everything softens whenever you walk into the room. Before you, days had their rhythm, but with you, they carry genuine melody.",
      "Thank you for being the person who understands my unsaid thoughts, who laughs at my worst jokes before I even finish telling them, and who makes a simple grocery run feel like a cherished chapter in our story. Loving you isn't just a feeling; it is the most effortless choice I make every morning.",
      "No matter where life takes us next or how busy the world gets, this little space and my whole heart will always belong right beside you."
    ],
    closing: "Forever and always yours,",
    signature: "Jules",
    psNote: "P.S. I still get butterflies every single time your name flashes on my phone."
  },
  milestones: [
    {
      id: "1",
      date: "October 14, 2023",
      title: "The First Hello",
      shortStory: "A rainy Thursday evening at the little corner coffee shop. Neither of us expected that sharing an umbrella would change everything.",
      detailedMemory: "You ordered a spiced honey latte and accidentally spilled a few drops on your book. When we both reached for the napkins at the exact same moment, you smiled with that crinkle around your eyes. We stayed talking until the barista started stacking chairs around us.",
      iconName: "Coffee",
      location: "Oak & Hearth Cafe",
      tag: "The Spark"
    },
    {
      id: "2",
      date: "November 03, 2023",
      title: "The Conversation That Never Ended",
      shortStory: "Our first real dinner date turned into a four-hour walk under streetlamps, talking about childhood dreams and strange theories.",
      detailedMemory: "It was freezing outside, but neither of us wanted to say goodbye or call a cab. We shared a pair of oversized headphones and listened to old acoustic playlists while kicking through autumn leaves.",
      iconName: "MessageCircleHeart",
      location: "Riverside Promenade",
      tag: "Late Night Talks"
    },
    {
      id: "3",
      date: "December 22, 2023",
      title: "The Moment Everything Shifted",
      shortStory: "Sitting on the kitchen counter while you made hot chocolate with tiny marshmallows. In that quiet pause, I knew I was in love.",
      detailedMemory: "No fireworks, no big spectacle — just soft indie music in the background, your flour-dusted hands, and this profound, quiet certainty that I had found my home in another human being.",
      iconName: "Flame",
      location: "Our First Kitchen",
      tag: "The Realization"
    },
    {
      id: "4",
      date: "May 18, 2024",
      title: "Our Spontaneous Coast Road Trip",
      shortStory: "No itinerary, one duffel bag, and endless ocean views. We chased the sunset all the way to the cliffs.",
      detailedMemory: "We got lost twice, ate cherries out of a paper bag on the hood of the car, and watched the Pacific turn violet and gold. That sunset is still framed on our dresser.",
      iconName: "Compass",
      location: "Big Sur Coastal Highway",
      tag: "Adventure"
    },
    {
      id: "5",
      date: "Today & Beyond",
      title: "Building Our Beautiful Tomorrow",
      shortStory: "Here we are — stronger, softer, and still choosing each other through every season of life.",
      detailedMemory: "Every ordinary Sunday morning, every supportive hug after a long workday, and every shared dream reminds me that the best parts of our story are still being written.",
      iconName: "HeartHandshake",
      location: "Everywhere With You",
      tag: "Our Future"
    }
  ],
  reasons: [
    {
      id: 1,
      teaser: "The genuine laughter",
      title: "Your Unfiltered Laugh",
      description: "That full-hearted, eye-crinkling laugh you let out when something is truly funny. It instantly lights up whatever room we're in.",
      iconName: "Music"
    },
    {
      id: 2,
      teaser: "How you make ordinary days special",
      title: "Turning Mundane into Magic",
      description: "How grocery shopping, cooking pasta on a Tuesday, or folding laundry somehow becomes a cozy, romantic adventure with you.",
      iconName: "Coffee"
    },
    {
      id: 3,
      teaser: "Your gentle kindness",
      title: "Your Boundless Compassion",
      description: "The gentle empathy you show to strangers, street animals, and the people you love. Your kindness is a steady anchor.",
      iconName: "Heart"
    },
    {
      id: 4,
      teaser: "The way your mind works",
      title: "Your Brilliant Curiosity",
      description: "The thoughtful, unexpected questions you ask, and how passionately you talk about the things you are fascinated by.",
      iconName: "Lightbulb"
    },
    {
      id: 5,
      teaser: "Your quiet support",
      title: "My Safe Harbor",
      description: "How one hug from you after an exhausting, stressful day can make all the tension and noise completely disappear.",
      iconName: "Shield"
    },
    {
      id: 6,
      teaser: "The little morning rituals",
      title: "Sleepy Morning Kisses",
      description: "That half-awake, warm sleepy smile you give before you even have your morning coffee.",
      iconName: "Sun"
    },
    {
      id: 7,
      teaser: "How you believe in me",
      title: "My Biggest Supporter",
      description: "You believe in my dreams even when I doubt myself, reminding me of who I am with so much faith and grace.",
      iconName: "Star"
    },
    {
      id: 8,
      teaser: "Your infectious warmth",
      title: "Warmth That Heals",
      description: "You have an innate ability to make anyone feel heard, valued, and welcome. Being near you feels like wrapping up in a cashmere blanket.",
      iconName: "Flame"
    },
    {
      id: 9,
      teaser: "Our inside jokes",
      title: "Our Secret Language",
      description: "The glances we exchange across a crowded room that speak paragraphs without uttering a single word.",
      iconName: "Eye"
    },
    {
      id: 10,
      teaser: "The playlists we share",
      title: "Our Shared Soundtrack",
      description: "How songs become time capsules of car rides, cooking dinners, and dancing barefoot in our living room.",
      iconName: "Music"
    },
    {
      id: 11,
      teaser: "Your fierce determination",
      title: "Your Tenacious Spirit",
      description: "When you set your mind to something you care about, your resilience and grace inspire me to be a better person.",
      iconName: "Award"
    },
    {
      id: 12,
      teaser: "Simply being you",
      title: "Just You, Unconditionally",
      description: "Out of eight billion people on this planet, nobody has your heart, your mind, or your soul. I would choose you in every lifetime.",
      iconName: "Infinity"
    }
  ],
  gallery: [
    {
      id: "photo-1",
      title: "Golden Hour on the Bluffs",
      date: "May 2024",
      caption: "Wind in our hair and the ocean glowing warm rose gold. One of my favorite days ever.",
      imageUrl: "/src/assets/images/polaroid_golden_hour_sunset_1790660576336.jpg",
      rotationDeg: -2,
      note: "That salt air smell"
    },
    {
      id: "photo-2",
      title: "Lazy Sunday Roast & Journal",
      date: "January 2024",
      caption: "Two mugs, cold rain against the glass, and nowhere else we had to be.",
      imageUrl: "/src/assets/images/polaroid_cozy_coffee_morning_1790660589039.jpg",
      rotationDeg: 2.5,
      note: "Your latte art was cute"
    },
    {
      id: "photo-3",
      title: "Under the Sierra Stars",
      date: "July 2024",
      caption: "Wrapped in blankets by the warm campfire, counting shooting stars until 2 AM.",
      imageUrl: "/src/assets/images/polaroid_stargazing_camp_1790660600447.jpg",
      rotationDeg: -1.8,
      note: "We saw three meteors!"
    },
    {
      id: "photo-4",
      title: "Autumn Leaves & Old Bicycles",
      date: "November 2023",
      caption: "Crunching through fallen maple leaves and laughing when the chain slipped.",
      imageUrl: "/src/assets/images/polaroid_autumn_park_walk_1790660611843.jpg",
      rotationDeg: 1.5,
      note: "The season we fell"
    }
  ],
  quiz: [
    {
      id: "q1",
      question: "Who caught feelings first?",
      options: ["Julian, definitely!", "Elena, without a doubt!", "It was mutual at the exact same moment", "The universe decided for both"],
      consensusAnswer: 0,
      playfulResponse: "Let's be honest — Julian was completely smitten from the second you spilled that coffee! ❤️"
    },
    {
      id: "q2",
      question: "Who takes longer to reply to a text?",
      options: ["Julian (lost in thought)", "Elena (typing in her head)", "Both reply within 3 seconds", "Depends on if snacks are involved"],
      consensusAnswer: 1,
      playfulResponse: "Thinking of the reply definitely counts as sending it in Elena's book! 😉"
    },
    {
      id: "q3",
      question: "Who is more likely to suggest a late-night snack run?",
      options: ["Elena for something sweet", "Julian for something savory", "Both in matching pajama pants", "Neither, we raid our fridge"],
      consensusAnswer: 2,
      playfulResponse: "Matching pajama pants and driving to get ice cream at 11 PM is our official sport!"
    },
    {
      id: "q4",
      question: "What is our absolute favorite shared memory?",
      options: ["The cliffside sunset walk", "The cozy rainy coffee morning", "Singing terribly in the car", "All of the above combined"],
      consensusAnswer: 3,
      playfulResponse: "Every single memory with you holds a permanent trophy in my heart."
    },
    {
      id: "q5",
      question: "Who is the hopeless romantic in this relationship?",
      options: ["Julian with grand letters", "Elena with thoughtful gestures", "Secretly both of us equally", "The dog / cat"],
      consensusAnswer: 2,
      playfulResponse: "We are both certified softies when it comes to each other, and that's our superpower!"
    }
  ],
  scratchCard: {
    hiddenMessage: "I would choose you over and over, in a hundred lifetimes, in every universe.",
    scratchPrompt: "Scratch with your finger or mouse to uncover a little secret...",
    subtitle: "A private whisper hidden beneath the surface"
  },
  openWhenLetters: [
    {
      id: "letter-1",
      prompt: "Open when you miss me",
      title: "When distance feels too quiet...",
      date: "Always here",
      letter: "Remember that distance is only physical. Every thought, every quiet breath, and every heartbeat carries your name. Close your eyes, take a deep breath, and remember the warmth of my arms around you. I am already counting the seconds until I get to hold you again.",
      signature: "Your biggest fan & eternal partner",
      accentIcon: "HeartHandshake"
    },
    {
      id: "letter-2",
      prompt: "Open when you're having a difficult day",
      title: "When the weight feels too heavy...",
      date: "Take a breath",
      letter: "You don't have to be strong all the time. It is okay to be tired, overwhelmed, or frustrated. Please give yourself the exact same gentle grace you give everyone else. Tonight, let the chores wait. Wrap yourself in your softest blanket, know that I am so proud of you, and remember that tomorrow is a clean slate.",
      signature: "Always in your corner",
      accentIcon: "Shield"
    },
    {
      id: "letter-3",
      prompt: "Open when you need a good laugh",
      title: "When you need a quick laugh...",
      date: "A quick laugh!",
      letter: "Do you remember when I tried to cook that fancy risotto and set off the smoke detector three times, while you danced with the kitchen towel trying to fan the ceiling? Or that terrible karaoke performance where neither of us knew the second verse? If you're not smiling right now, imagine me doing that ridiculous victory dance in socks on the hardwood floor. There — that's better!",
      signature: "Your personal comedian",
      accentIcon: "Music"
    },
    {
      id: "letter-4",
      prompt: "Open when you can't fall asleep",
      title: "When the midnight hours linger...",
      date: "Sleep tight",
      letter: "Let go of all the thoughts running through your mind. You did enough today. You are enough. Picture us walking along the shore at dusk, with the rhythmic sound of waves gently rolling onto the sand. Match your breathing to that calm tide. Rest your eyes, my love; tomorrow has beautiful things waiting for you.",
      signature: "Sweet dreams, always",
      accentIcon: "Clock"
    },
    {
      id: "letter-5",
      prompt: "Open when you need a reminder of how special you are",
      title: "In case you ever forget...",
      date: "A timeless truth",
      letter: "If you could see yourself through my eyes for just five seconds, you would never doubt your worth again. You are radiant, intelligent, wildly funny, and so deeply loved. The world is undeniably softer and brighter because you are in it, and I am the luckiest soul alive to walk beside you.",
      signature: "Adoringly and endlessly",
      accentIcon: "Crown"
    }
  ],
  jarNotes: [
    { id: "note-1", type: "compliment", text: "Your smile has the magical power to cure my gloomiest days." },
    { id: "note-2", type: "sweet", text: "I love how warm your hands are when we walk outside in the cold." },
    { id: "note-3", type: "memory", text: "Remember that rainy afternoon we ate takeout on the floor and laughed until our stomachs hurt?" },
    { id: "note-4", type: "joke", text: "You're the only person I would share my fries with (and that is true, profound love)." },
    { id: "note-5", type: "compliment", text: "You have the most captivating mind of anyone I've ever known." },
    { id: "note-6", type: "sweet", text: "Thank you for being my peace at the end of every chaotic day." },
    { id: "note-7", type: "memory", text: "The way you looked back at me at the airport gate — I knew right then." },
    { id: "note-8", type: "joke", text: "I love you even when you steal 80% of the duvet and claim you're cold." },
    { id: "note-9", type: "compliment", text: "You carry grace and resilience like a crown. I admire you endlessly." },
    { id: "note-10", type: "sweet", text: "Waking up knowing you're in my life makes every sunrise exciting." },
    { id: "note-11", type: "memory", text: "Dancing barefoot in the dark kitchen to that acoustic jazz album." },
    { id: "note-12", type: "joke", text: "I love you more than coffee... okay, at least tied with coffee!" },
    { id: "note-13", type: "sweet", text: "You make me feel completely safe to be my genuine, silly self." },
    { id: "note-14", type: "compliment", text: "Your voice is my favorite sound in any room, no matter how loud." },
    { id: "note-15", type: "sweet", text: "Whatever the next decade brings, having you makes me fearless." },
    { id: "note-16", type: "memory", text: "When we drove through the fog and suddenly the stars burst open above us." }
  ],
  bucketList: [
    { id: "b1", title: "Watch the sunrise from a seaside cliff with warm thermos tea", category: "adventure", completed: true, completedDate: "May 2024", notes: "At Big Sur, wrapped in our favorite plaid blanket" },
    { id: "b2", title: "Take a handmade pasta cooking class in a tiny kitchen", category: "cozy", completed: true, completedDate: "Feb 2024", notes: "Flour ended up in our hair, best ravioli ever" },
    { id: "b3", title: "Rent a secluded cabin in the snowy pines with a real stone fireplace", category: "travel", completed: false },
    { id: "b4", title: "Build a cozy blanket fort in the living room and watch childhood movies", category: "cozy", completed: true, completedDate: "Dec 2023", notes: "Popcorn everywhere, 10/10 comfort" },
    { id: "b5", title: "Adopt a rescue puppy and take them on hiking trails together", category: "adventure", completed: false },
    { id: "b6", title: "Go stargazing in an official International Dark Sky park", category: "adventure", completed: true, completedDate: "July 2024", notes: "We saw the Milky Way with our bare eyes!" },
    { id: "b7", title: "Write letters to our future selves to open in ten years", category: "creative", completed: false },
    { id: "b8", title: "Spend a week in a coastal Mediterranean cottage eating fresh olives and bread", category: "travel", completed: false }
  ],
  finalSurprise: {
    kicker: "ONE LAST THING BEFORE YOU GO",
    headline: "You are my favorite story, and we are still on the early chapters.",
    bodyParagraphs: [
      "Thank you for taking this gentle walk through our little world. Everything here — every word, every memory, every reason — is just a small reflection of what you bring into my life every day.",
      "The universe is immense, full of billions of stars and infinite paths. But finding you and building this life alongside you is the greatest miracle I will ever know."
    ],
    question: "Will you keep making extraordinary memories with me?",
    yesButtonText: "Yes, forever and ever",
    alwaysButtonText: "Always & without hesitation",
    celebrationMessage: "Here's to a lifetime of love, laughter, and our little world. I love you!",
    signature: "Yours endlessly, Jules"
  },
  music: {
    enabled: false,
    trackTitle: "Ambient Romance (Lullaby Chords)"
  },
  theme: {
    bgCream: "#FFF9F5",
    primaryRose: "#B94F68",
    accentBurgundy: "#702D40",
    secondaryBlush: "#F3E1E5",
    textCharcoal: "#302329",
  }
};
