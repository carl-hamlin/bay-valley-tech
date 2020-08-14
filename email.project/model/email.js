/******************************************************************************
 *  displayEmailMeta
 *
 *  Indexing for displayEmail function. This dataset essentially defines the
 *  categorization for the nav and allows for nav to dispatch on the basis of
 *  definitions in the JSON outline for each piece of mail.
 *
 *  As an added bonus, it provides an anchor for pinching read totals on nav
 *  items that track read / unread status.
 *
 *  Outline as follows:
 *  [0] - JSON meta data upon which to key
 *  [1] - ID for nav item associated with prior key
 *  [2] - Front loaded text content for nav, defaults to read / unread tracking
 *  [3] - Num unread mails in key category.
 *
 *  There's definitely room for improvement here, lots of unanswered assumptions;
 *  refactor recommended.
 *
 */

var displayEmailMeta  = [
  ['received',  'navinbox',     'Inbox',      0],
  ['tagged',    'navtagged',    'Tagged',     0],
  ['important', 'navimportant', 'Important',  0],
  ['sent',      'navsent',      'Sent Mail',  0],
  ['draft',     'navdrafts',    'Drafts',     0],
  ['trash',     'navtrash',     'Trash',      0]
]

/******************************************************************************
 *  inbox
 *
 *  JSON magic that simulates an inbox. No server involved, so we have to
 *  fudge. Hopefully, the JSON is self-documenting, but if not, please send
 *  mail to hamlin.carlisle@gmx.com for details.
 *
 */

var inbox = [
  {
    read: 0,
    received: 1,
    senderEName: 'LinkedIn',
    senderProper: 'do-not-reply@linkedin.com',
    recvBy: 'hamlin.carlisle@gmx.com',
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
    read: 0,
    received: 1,
    senderEName: 'Michael Scott Daily Quotes',
    senderProper: 're-reply@theofficenbc.com',
    recvBy: 'hamlin.carlisle@gmx.com',
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
    read: 0,
    received: 1,
    senderEName: 'Lamar Software',
    senderProper: 'taylor@lamarsoftware.io',
    recvBy: 'hamlin.carlisle@gmx.com',
    time: '02.09.2020 21:31',
    subject: 'Learn how you can give us money by calling (209) 322 7593',
    content: 'Hi, I\'m Taylor Lamar, and I want your money.<br><br>If you\'re interested in giving me your money, and I know you are, call me at the number specififed in the subject of this email, and we\'ll have a chat about how we can make that happen. Tootles!',
    tagged: 0,
    important: 0,
    sent: 0,
    replied: 0,
    draft: 0,
    trash: 0
  } 
];

/******************************************************************************
 *  displayEmail
 *
 *  Args:
 *    displayType   - Numeric category identifier used to determine which nav
 *                    category we're displaying.
 *    id            - Old argument used for id assignment during read / unread
 *                    tracking. Retained for posterity.
 *    interfaceText - Old argument used for interface test assignment during
 *                    read / unread tracking. Retained for posterity.
 *
 *  Takes a display type and uses it to populate the roster container with
 *  email objects whose keys match the given type.
 *
 *  Additionally, adds an anonymous event listener to each displayed object which
 *  allows for the associated contents to be displayed in the econtent element,
 *  and tracks read / unread status using indexed object keys and the
 *  displayEmailMeta indexing array.
 */

var displayEmail      = function(displayType, id, interfaceText) {
  var emails = 0;

  document.getElementById('ereply-element').style.visibility = 'hidden';

  document.getElementById('rostercontainer').innerHTML = '';
  document.getElementById('rostercontainer').setAttribute('displaytype', displayType);
  
  for (i = 0; i < inbox.length; i++) {
    if (inbox[i][displayEmailMeta[displayType][0]]) {
      var a = document.createElement('div');
      a.classList.add('roster-element');
      a.setAttribute('index', i);

      a.addEventListener('click', function(e) {
        toggleContent('visible');

        document.getElementById('ereply-element').style.visibility = 'hidden';
        
        document.getElementById('eheader').innerHTML = '<div>To: ' + inbox[this.getAttribute('index')].recvBy + '</div><div>From: ' + inbox[this.getAttribute('index')].senderProper + '</div>';
        document.getElementById('etitle').innerHTML = inbox[this.getAttribute('index')].senderEName;
        document.getElementById('econtent').innerHTML = inbox[this.getAttribute('index')].content;
        document.getElementById('econtent').setAttribute('index', this.getAttribute('index'));

        inbox[this.getAttribute('index')].read = 1;

        this.classList.add('read');

        displayEmailMeta[document.getElementById('rostercontainer').getAttribute('displaytype')][3]--
        if (displayEmailMeta[document.getElementById('rostercontainer').getAttribute('displaytype')][3] > 0) {
          document.getElementById(displayEmailMeta[document.getElementById('rostercontainer').getAttribute('displaytype')][1]).innerHTML = displayEmailMeta[document.getElementById('rostercontainer').getAttribute('displaytype')][2] + ' (' + displayEmailMeta[document.getElementById('rostercontainer').getAttribute('displaytype')][3] + ')';
        } else {
          document.getElementById(displayEmailMeta[document.getElementById('rostercontainer').getAttribute('displaytype')][1]).innerHTML = displayEmailMeta[document.getElementById('rostercontainer').getAttribute('displaytype')][2];
        }
      });

      if (!inbox[i].read) {
        emails++;
      } else {
        a.classList.add('read');
      }

      a.innerHTML = "<div class = 'roster-row'><div class = 'esender'>" + inbox[i].senderEName + "</div><div class = 'etime'>" + inbox[i].time + "</div></div><div class = 'roster-row'><div class = 'esubject'>" + inbox[i].subject + "</div></div>";
      document.getElementById('rostercontainer').appendChild(a);
    }
  }

  displayEmailMeta[displayType][3] = emails;

  if (displayEmailMeta[displayType][3] > 0) {
    document.getElementById(displayEmailMeta[displayType][1]).innerHTML = displayEmailMeta[displayType][2] + ' (' + displayEmailMeta[displayType][3] + ')';
  } else {
    document.getElementById(displayEmailMeta[displayType][1]).innerHTML = displayEmailMeta[displayType][2];
  }
};

/******************************************************************************
 *  composeEmail
 *
 *  STUB: Should enable email composition functionality.
 *
 */

var composeEmail      = function() {};

/******************************************************************************
 *  enableReply
 *
 *  Args: none
 *
 *  Composes a reply to the currently selected email object, makes the reply
 *  apparatus visible to the user, and provides focus to the reply apparatus.
 *
 */

var enableReply       = function() {
  document.getElementById('ereply-element').style.visibility  = 'visible';
  document.getElementById('ereplytext').focus();
  document.getElementById('ereplytext').innerText             = 'At ' + inbox[document.getElementById('econtent').getAttribute('index')].time + ', ' + inbox[document.getElementById('econtent').getAttribute('index')].senderProper + ' wrote: \n> ' + inbox[document.getElementById('econtent').getAttribute('index')].content.split('<br>').join('\n').split('&gt;').join('>') + '\n\n\n';
  document.getElementById('ereplytext').value                 = 'At ' + inbox[document.getElementById('econtent').getAttribute('index')].time + ', ' + inbox[document.getElementById('econtent').getAttribute('index')].senderProper + ' wrote: \n> ' + inbox[document.getElementById('econtent').getAttribute('index')].content.split('<br>').join('\n').split('&gt;').join('>') + '\n\n\n';
};

/******************************************************************************
 *  etdots
 *
 *  STUB: Function of etdots left as exercise for the reviewer.
 *
 */

var etdots            = function() {};

/******************************************************************************
 *  postReply
 *
 *  Args: none
 *
 *  Gathers a composed reply from the reply apparatus and uses it to create a
 *  new email object in the inbox collection, correctly categorized as a sent
 *  email, with correct subject, content, sender, receiver, and timestamp.
 *
 *  Additionally, hides reply apparatus and informs user that the reply has
 *  been sent.
 *
 */

var postReply         = function() {
  document.getElementById('ereply-element').style.visibility  = 'hidden';

  inbox[document.getElementById('econtent').getAttribute('index')].replied = 1;

  var eNow = new Date();

  inbox.push({
    read: 1,
    received: 0,
    senderEName: 'Carl Hamlin',
    senderProper: 'hamlin.carlisle@gmx.com',
    recvBy: inbox[document.getElementById('econtent').getAttribute('index')].senderProper,
    time: ((eNow.getMonth().length > 1) ? eNow.getMonth() : '0' + eNow.getMonth()) + '.' + ((eNow.getDate() > 9) ? eNow.getDate() : '0' + eNow.getDate()) + '.' + eNow.getFullYear() + ' ' + eNow.getHours() + ':' + eNow.getMinutes(),
    subject: 'RE: ' + inbox[document.getElementById('econtent').getAttribute('index')].subject,
    content: document.getElementById('ereplytext').innerHTML,
    tagged: 0,
    important: 0,
    sent: 1,
    replied: 0,
    draft: 0,
    trash: 0
  });

  alert('Reply sent!');
};

/******************************************************************************
 *  searchEmail
 *
 *  STUB: Should enable search functionality within displayed email objects.
 *
 */

var searchEmail       = function(searchText) {};

/******************************************************************************
 *  trashEmail
 *
 *  Args: none
 *
 *  Marks selected email object as trash.
 *
 *  Additionally hides econtent element and re-displays current content
 *  category, so as to visually remove trashed mail. Mail trashed in the manner
 *  may be revisited in the 'Trash' nav category.
 *
 */

var trashEmail        = function() {
  inbox[document.getElementById('econtent').getAttribute('index')].received = 0;
  inbox[document.getElementById('econtent').getAttribute('index')].trash = 1;
  toggleContent('hidden');
  displayEmail(document.getElementById('rostercontainer').getAttribute('displaytype'));
};

/******************************************************************************
 *  toggleContent
 *
 *  Args:
 *    toggle - values used to specifiy visibility of dependent content
 *
 *  This function is poorly named because it was originally going to be
 *  considerably more widely used. As it stands, it is only used to toggle the
 *  visibility of elements with a class of 'dependent-content', i.e. those
 *  elements responsible for displaying the content of selected email objects.
 *
 */

var toggleContent     = function(toggle) {
  var b = document.getElementsByClassName('dependent-content');

  for (j = 0; j < b.length; j++) { b[j].style.visibility = toggle; }
}