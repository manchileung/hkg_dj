/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * TERMS OF REPRODUCTION USE
 *
 * 1. Provide a link back to the original repository (this repository), as
 *     	in, https://github.com/ConnerGDavis/Plugbot, that is well-visible
 * 		wherever the source is being reproduced.  For example, should you
 * 		display it on a website, you should provide a link above/below that
 *		which the users use, titled something such as "ORIGINAL AUTHOR".
 *
 * 2. Retain these three comments:  the GNU GPL license statement, this comment,
 * 		and that below it, that details the author and purpose.
 *
 * Failure to follow these terms will result in me getting very angry at you
 * and having your software tweaked or removed if possible.  Either way, you're
 * still an idiot for not following such a basic rule, so at least I'll have
 * that going for me.
 */
 
/*
 * @author  Conner Davis (Fugitive. on Plug.dj) <connergdavis@gmail.com>
 */

/**
 * The root path to our JS files.
 */
var path = 'https://raw.github.com/manchileung/hkg_dj/master';

/**
 * Print a message out to the chatbox on plug.dj, displayed locally.
 *
 * @param msg  The message to print.
 */
function print(msg)
{
  $('#chat-messages').append('<div class="chat-update"><span class="chat-text" style="color:#ffd900;font-weight:bold">' + msg + '</span></div>');
}

/*
 * Since jQuery fail() calls don't work for code run in bookmarklets,
 * we get a little hacky.  Here's the approach: set a 2 second timeout
 * delay on an error message.  If the script loads successfully, this
 * timeout is cancelled, so the error message isn't displayed, but the
 * success one is.  If it fails, the timeout won't be deleted, so only
 * the fail message will display.
 */

var scriptFail = window.setTimeout(function() {
  print('載入失敗，搵返高登POST問人吧。');
}, 2000);

$.getScript(path + '/plugbot.js', function() {
  print('HKG Plug DJ已載入');
  window.clearTimeout(scriptFail);
});
 
