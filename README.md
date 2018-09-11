# Password Breach Checker
## A small unofficial extension to check passwords you type in against the database at HaveIBeenPwned (Chrome only for now)

![Screenshot of Password Breach Checker at work](https://i.imgur.com/MCdv0JD.png)

The other day, GitHub was kind enough to tell me that my password appeared in [HaveIBeenPwned's Pwned Passwords database](https://haveibeenpwned.com/Passwords), which was completely new information to me. It was a 15-character password which consisted of both uppercase, lowercase, and numerical characters. As you may have guessed, I reuse passwords (or used to, now that I've been warned), which is where the breach must have come from. And that got me thinking: how many people are like me, and reuse passwords or sign up to a service with a woefully inadequate password _without knowing that it's insecure_?

That's what this little, simple Chrome extension does - tell you if your password has been leaked online before. [Yes, Chrome for now. God knows why I decided to develop for Chrome when Firefox is my primary browser. (If you want to port it, I'd really appreciate it!)]. Password Breach Checker will, as you type in passwords, check them against the Pwned Passwords database and then very simply show you if the password has been leaked or not, through colour.

A huge amount of credit goes (obviously) to Troy Hunt, the fantastic developer who started HaveIBeenPwned. None of this would be possible without his hard work on the website (the actual hard bit), and the world of account security is a better place for it.

## But does that mean you're sending somebody my passwords? That's unacceptable!
I totally agree, which is why Password Breach Checker doesn't do that. Password Breach Checker checks if your password has been leaked online using the [HIBP API](https://haveibeenpwned.com/API/v2#PwnedPasswords). PBC will find the SHA-1 hashsum of your password and then send the first 5 characters to the HIBP server (and those 5 characters cannot be used to 'decrypt' your password). Then, HIBP will send back all matches which start with those 5 characters, and any further filtering (comparing the hundreds of matches with the actual SHA-1 checksum) is done by the extension, client-side.

Of course, I may also be lying and be sending your passwords to some fishy server. You don't happen to care about your credit card details, do you?

## Installation
No compilation. No command line. No need to spend hours wondering why `apt install <package>` is telling me `Sub-process /usr/bin/dpkg returned an error code(2)`.
Simply clone this repo (`git clone https://github.com/denosawr/PasswordBreachChecker.git` or `hub clone denosawr/PasswordBreachChecker`), or download and extract it (the big green "Clone and download" button, then "Download ZIP"). Then, fire up Chrome, look in disgust at the new UI and then go to `chrome://extensions/`. From there, proceed to flick the Developer Mode toggle up the top right, and click Load Unpacked. Go to the folder you unzipped/cloned the repo, click Select... and you're done. 

If you didn't screw up, it should look like this now:
![Screenshot of `chrome://extensions/`](https://i.imgur.com/FkIzJ5A.png)

## Credit / acknowledgements
* GitHub. Your "Enforcing stronger passwords" initative is excellent - if only more websites would listen.
* Troy Hunt. Read the above.
* https://github.com/emn178/js-sha1 - I suck and couldn't do it myself, so I just decided to blatantly copy someone else's work and not give them credit. Oh, don't look at me like that. You know you do it _all_ the time with StackOverflow.

## Sidenote
I'm a terrible programmer. If you have any suggestions, be it "Update jQuery! You're using 2.1.4 and the latest version is 3.3.1!" or "Stop using JavaScript, obviously C++ is the future of front-end web development", I'm happy to hear them! Likewise, pull requests to make my code legible or to add functionality are both accepted.
