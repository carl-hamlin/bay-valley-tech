var displayEmailMeta  = [
  ['received',  'navinbox',     'Inbox'     ],
  ['tagged',    'navtagged',    'Tagged'    ],
  ['important', 'navimportant', 'Important' ],
  ['sent',      'navsent',      'Sent'      ],
  ['draft',     'navdrafts',    'Drafts'    ],
  ['trash',     'navtrash',     'Trash'     ]
]

var inbox = [
  {
    received: 1,
    senderEName: 'LinkedIn',
    senderProper: 'do-not-reply@linkedin.com',
    time: '08.15.2020 14:45',
    subject: 'You have a new connection request.',
    content: 'Hey! You! Someone\'s trying to scam your ass on LinkedIn!',
    tagged: 0,
    important: 0,
    sent: 0,
    replied: 0,
    draft: 0,
    trash: 0
  }, {
    received: 1,
    senderEName: 'Michael Scott Daily Quotes',
    senderProper: 're-reply@theofficenbc.com',
    time: '06.03.2020 12:28',
    subject: "I'm optimistic because every day I get a little more desperate.",
    content: '"Friends joke with one another. \'Hey, you\'re poor.\' \'Hey, your momma\'s dead.\' That\'s what friends do.\"<br><br>\"It\'s a good thing Russia doesn\'t exist anymore.\"<br><br>\"You cheated on me? When I specifically asked you not to?\"<br><br>\"It just seems awfully mean. But sometimes the ends justify the mean.\"<br><br>\"Reverse psychology is an awesome tool. I don\'t know if you guys know about it, but basically you make someone think the opposite of what you believe, and that tricks them into doing something stupid. Works like a charm.\"',
    tagged: 0,
    important: 0,
    sent: 0,
    replied: 0,
    draft: 0,
    trash: 0
  }, {
    received: 1,
    senderEName: 'Lamar Software',
    senderProper: 'taylor@lamarsoftware.io',
    time: '02.09.2020 21:31',
    subject: 'Learn how you can give us money by calling (209) 322 7593',
    content: 'Hi, I\'m Taylor Lamar, and I want your money. If you\'re interested in giving me your money, and I know you are, call me at the number specififed in the subject of this email, and we\'ll have a chat about how we can make that happen. Tootles!',
    tagged: 0,
    important: 0,
    sent: 0,
    replied: 0,
    draft: 0,
    trash: 0
  } 
];

var displayEmail      = function(displayType, id, interfaceText) {
  var emails = 0;

  document.getElementById('rostercontainer').innerHTML = '';
  document.getElementById('rostercontainer').setAttribute('displaytype', displayType);
  
  for (i = 0; i < inbox.length; i++) {
    if (inbox[i][displayEmailMeta[displayType][0]]) {
      var a = document.createElement('div');
      a.classList.add('roster-element');
      a.setAttribute('index', i);

      a.addEventListener('click', function(e) {
        toggleContent('visible');
        
        document.getElementById('eheader').innerHTML = "<div>To: hamlin.carlisle@gmx.com</div><div>From: " + inbox[this.getAttribute('index')].senderProper + "</div>";
        document.getElementById('etitle').innerHTML = inbox[this.getAttribute('index')].senderEName;
        document.getElementById('econtent').innerHTML = inbox[this.getAttribute('index')].content;
        document.getElementById('econtent').setAttribute('index', this.getAttribute('index'));
      });

      a.innerHTML = "<div class = 'roster-row'><div class = 'esender'>" + inbox[i].senderEName + "</div><div class = 'etime'>" + inbox[i].time + "</div></div><div class = 'roster-row'><div class = 'esubject'>" + inbox[i].subject + "</div></div>";
      document.getElementById('rostercontainer').appendChild(a);

      emails++;
    }
  }

  document.getElementById(displayEmailMeta[displayType][1]).innerHTML = displayEmailMeta[displayType][2] + ' (' + emails + ')';
};

var composeEmail      = function() {};

var dispatch          = function(category) {};

var enableReply       = function() {};

var etdots            = function() {};

var postReply         = function() {};

var searchEmail       = function(searchText) {};

var trashEmail        = function() {
  inbox[document.getElementById('econtent').getAttribute('index')].received = 0;
  inbox[document.getElementById('econtent').getAttribute('index')].trash = 1;
  toggleContent('hidden');
  displayEmail(document.getElementById('rostercontainer').getAttribute('displaytype'));
};

var toggleContent     = function(toggle) {
  var b = document.getElementsByClassName('dependent-content');

  for (j = 0; j < b.length; j++) { b[j].style.visibility = toggle; }
}