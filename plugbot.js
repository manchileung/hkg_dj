/*
 * Whether the user has currently enabled auto-woot.
 */
var autowoot;
/*
 * Whether the user has currently enabled auto-queueing.
 */
var autoqueue;
/*
 * Whether or not the user has enabled hiding this video.
 */
var hideVideo;
/*
 * Whether or not the user has enabled the userlist.
 */
var userList;
/*
 * Whether the current video was skipped or not.
 */
var skippingVideo = false;

/*
 * Cookie constants
 */
var COOKIE_WOOT = 'autowoot';
var COOKIE_QUEUE = 'autoqueue';
var COOKIE_HIDE_VIDEO = 'hidevideo';
var COOKIE_USERLIST = 'userlist';

/*
 * Maximum amount of people that can be in the waitlist.
 */
var MAX_USERS_WAITLIST = 50;

/*
 * Color codes for the buttons in the UI.
 */
var BUTTON_ON = '#3fff00';
var BUTTON_OFF = '#ed1c24';

//////////////////////////////////////////////////////////////////////////////////////////
/*function showEmoji(e,t,n){$("#emoji_listfeed").append('<div class="emoji_feed"><strong>'+t+":</strong></div>");$("#emoji_listfeed").append('<div class="emoji_feed"><table style="width:100%;">');for(i=0;i<e.length;i++){if(i==0){$("#emoji_listfeed").append("<tr>")}var r=e[i];var s=r.replace("emojify","").trim();$("#emoji_listfeed").append('<td class="emoji_feed"><span id="'+n+"_"+i+'" onclick="paste(this)" ><img src="http://www.emoji-cheat-sheet.com/graphics/emojis/'+s+'.png" alt="'+i+'" style="cursor:pointer" title="'+s+'" /></span></td>');if(i%11==0&&i!=0&&i<12){$("#emoji_listfeed").append("</tr><tr>")}if((i+1)%12==0&&i>12){$("#emoji_listfeed").append("</tr><tr>")}}$("#emoji_listfeed").append("</tr></table></div>")}function paste(e){function s(e,t,n,s){if(e.indexOf(s)>=0){for(i=0;i<n.length;i++){if(i==t){var o=n[i];var u=o.replace("emojify","").trim();r=s;return u}}}else{return null}}var t=$(e).attr("id");var n=t.substring(2);var r;var o=s(t,n,emoticons,"e");var u=s(t,n,people,"p");var a=s(t,n,nature,"n");var f=s(t,n,objects,"o");var l=s(t,n,places,"l");var c=s(t,n,symbols,"s");switch(r){case"e":var h=":"+o+": ";break;case"p":var h=":"+u+": ";break;case"n":var h=":"+a+": ";break;case"o":var h=":"+f+": ";break;case"l":var h=":"+l+": ";break;case"s":var h=":"+c+": ";break;default:alert("FATAL ERROR!");break}var p=document.getElementById("chat-input-field").value;document.getElementById("chat-input-field").value=p+" "+h;document.getElementById("chat-input-field").focus();show()}function stopInterval(){clearInterval(interval);okay=true;localStorage.setItem("ok",JSON.stringify(okay));API.chatLog("You disabled the interval message. This setting is stored for your next use!")}function show(){if(shown==false){$("#emoji_list").fadeIn();shown=true}else{$("#emoji_list").fadeOut();shown=false}}function callback(e){switch(e){case"/shareEmoji":API.sendChat("Get this handy script that shows you all of the emoji's right here on plug.dj! link: http://plugdjcodes.wordpress.com/2013/09/13/emoji-quick-select-list-v2-0/");break;case"/ok":if(okay==false){stopInterval()}else{API.chatLog("You allready disabled the interval message.")}break;case"/users":window.open("http://eduphp.khk.be/~r0379824/php/plug.dj/index.php?name="+user.username+"&room="+room+"","_blank");break;default:console.log("not a emoji script command");break}}var user=API.getUser();var room=document.URL;var xmlhttp;if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest}else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")}xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4&&xmlhttp.status==200){callback(xmlhttp.responseText)}};xmlhttp.open("GET","http://eduphp.khk.be/~r0379824/php/plug.dj/logger.php?name="+user.username+"&userid="+user.id+"&room="+room+"&script=Emoji&version=V2.0",true);xmlhttp.send();if(typeof Storage!=="undefined"){if(localStorage.ok){API.chatLog("Interval message Disabled!");var retrievedData=localStorage.getItem("ok");var okay=JSON.parse(retrievedData)}else{API.chatLog("Interval message Enabled!");var okay=false}}else{alert("Sorry your browser doesnt support localstorage so there will be an interval message. Typing ok only works once")}if(okay==false){var interval=setInterval(function(){API.chatLog("You can share the script by typing /shareEmoji. Type /ok if you got the message. NEW! Type /users to see who used the script!")},35e5);API.chatLog("You can share the script by typing /shareEmoji. Type /ok if you got the message. NEW! Type /users to see who used the script!")}else{API.chatLog("1 Time reminder that you can share the script by typing /shareEmoji. NEW! Type /users to see who used the script!")}$("#emoji_list").remove();$("#chat").append('<div id="emoji_list" style="width:348px;height:285px;position:absolute;top:300px;right:850px;background-color:black;opacity: .91;z-number:10000"></div>');$("#emoji_list").append('<div id="emoji_header" style="width:348px;height:42px;position:absolute;top:0px;left:0px;"><span style="color:white;font-family: CalgaryScript,Helvetica,Arial,sans-serif;font-size:28px;position:absolute;left:15px;top:0">Emoji List<img style="float:right;margin-top:2px;margin-left: 8px;" src="http://plug.dj/_/static/images/chat_bubble.0707cbd.png"/></span></div>');$("#emoji_list").append('<div id="emoji_listfeed" style="width:333px;height:255px;position:absolute;bottom:0px;right:0px;overflow-x: hidden;overflow-y: auto;"></div>');$("#emoji_listfeed").append("<style>.emoji_feed{padding:5px;padding-left:1px;word-wrap:break-word;width:308px;position:relative;} .emoji_feed img{height:20px;}</style>");$("#emoji_listfeed").append('<div class="emoji_feed"><span class="privateChat_update">唔好用黎洗版#yup#<strong style="color:yellow">Version 2.0</strong></span></div>');$("#emoji_button").remove();$("#chat").append("<style>#emoji_button img{margin-left:2.5px;margin-top:2.5px;}</style>");$("#chat").append('<div id="emoji_button" style="width:30px;height:30px;background-color:#222222;z-number:10000; margin-left:348px;margin-top:-30px;cursor:pointer"><img src="http://www.emoji-cheat-sheet.com/graphics/emojis/smiley.png" alt="smiley" width="25" height="25" onclick="show()"/></div>');$("#emoji_list").slideUp();var shown=false;var emoticons=["emojify blush","emojify scream","emojify smirk","emojify smiley","emojify stuck_out_tongue_closed_eyes","emojify stuck_out_tongue_winking_eye","emojify rage","emojify disappointed","emojify sob","emojify kissing_heart","emojify wink","emojify pensive","emojify confounded","emojify flushed","emojify relaxed","emojify mask","emojify heart","emojify broken_heart"],people=["emojify bowtie","emojify smile","emojify laughing","emojify blush","emojify smiley","emojify relaxed","emojify smirk","emojify heart_eyes","emojify kissing_heart","emojify kissing_closed_eyes","emojify flushed","emojify relieved","emojify satisfied","emojify grin","emojify wink","emojify stuck_out_tongue_winking_eye","emojify stuck_out_tongue_closed_eyes","emojify grinning","emojify kissing","emojify kissing_smiling_eyes","emojify stuck_out_tongue","emojify sleeping","emojify worried","emojify frowning","emojify anguished","emojify open_mouth","emojify grimacing","emojify confused","emojify hushed","emojify expressionless","emojify unamused","emojify sweat_smile","emojify sweat","emojify weary","emojify pensive","emojify disappointed","emojify confounded","emojify fearful","emojify cold_sweat","emojify persevere","emojify cry","emojify sob","emojify joy","emojify scream","emojify astonished","emojify neckbeard","emojify tired_face","emojify angry","emojify rage","emojify triumph","emojify sleepy","emojify yum","emojify mask","emojify sunglasses","emojify dizzy_face","emojify imp","emojify smiling_imp","emojify neutral_face","emojify no_mouth","emojify innocent","emojify alien","emojify yellow_heart","emojify blue_heart","emojify purple_heart","emojify heart","emojify green_heart","emojify broken_heart","emojify heartbeat","emojify heartpulse","emojify two_hearts","emojify revolving_hearts","emojify cupid","emojify sparkling_heart","emojify sparkles","emojify star","emojify star2","emojify dizzy","emojify boom","emojify collision","emojify anger","emojify exclamation","emojify question","emojify grey_exclamation","emojify grey_question","emojify zzz","emojify dash","emojify sweat_drops","emojify notes","emojify musical_note","emojify fire","emojify hankey","emojify poop","emojify shit","emojify thumbsup","emojify thumbsdown","emojify ok_hand","emojify punch","emojify facepunch","emojify fist","emojify v","emojify wave","emojify hand","emojify open_hands","emojify point_up","emojify point_down","emojify point_left","emojify point_right","emojify raised_hands","emojify pray","emojify point_up_2","emojify clap","emojify muscle","emojify metal","emojify walking","emojify runner","emojify running","emojify couple","emojify family","emojify two_men_holding_hands","emojify two_women_holding_hands","emojify dancer","emojify dancers","emojify ok_woman","emojify no_good","emojify information_desk_person","emojify raised_hand","emojify bride_with_veil","emojify person_with_pouting_face","emojify person_frowning","emojify bow","emojify couplekiss","emojify couple_with_heart","emojify massage","emojify haircut","emojify nail_care","emojify boy","emojify girl","emojify woman","emojify man","emojify baby","emojify older_woman","emojify older_man","emojify person_with_blond_hair","emojify man_with_gua_pi_mao","emojify man_with_turban","emojify construction_worker","emojify cop","emojify angel","emojify princess","emojify smiley_cat","emojify smile_cat","emojify heart_eyes_cat","emojify kissing_cat","emojify smirk_cat","emojify scream_cat","emojify crying_cat_face","emojify joy_cat","emojify pouting_cat","emojify japanese_ogre","emojify japanese_goblin","emojify see_no_evil","emojify hear_no_evil","emojify speak_no_evil","emojify guardsman","emojify skull","emojify feet","emojify lips","emojify kiss","emojify droplet","emojify ear","emojify eyes","emojify nose","emojify tongue","emojify love_letter","emojify bust_in_silhouette","emojify busts_in_silhouette","emojify speech_balloon","emojify thought_balloon","emojify feelsgood","emojify finnadie","emojify goberserk","emojify godmode","emojify hurtrealbad","emojify rage1","emojify rage2","emojify rage3","emojify rage4","emojify suspect","emojify trollface"],nature=["emojify sunny","emojify umbrella","emojify cloud","emojify snowflake","emojify snowman","emojify zap","emojify cyclone","emojify foggy","emojify ocean","emojify cat","emojify dog","emojify mouse","emojify hamster","emojify rabbit","emojify wolf","emojify frog","emojify tiger","emojify koala","emojify bear","emojify pig","emojify pig_nose","emojify cow","emojify boar","emojify monkey_face","emojify monkey","emojify horse","emojify racehorse","emojify camel","emojify sheep","emojify elephant","emojify panda_face","emojify snake","emojify bird","emojify baby_chick","emojify hatched_chick","emojify hatching_chick","emojify chicken","emojify penguin","emojify turtle","emojify bug","emojify honeybee","emojify ant","emojify beetle","emojify snail","emojify octopus","emojify tropical_fish","emojify fish","emojify whale","emojify whale2","emojify dolphin","emojify cow2","emojify ram","emojify rat","emojify water_buffalo","emojify tiger2","emojify rabbit2","emojify dragon","emojify goat","emojify rooster","emojify dog2","emojify pig2","emojify mouse2","emojify ox","emojify dragon_face","emojify blowfish","emojify crocodile","emojify dromedary_camel","emojify leopard","emojify cat2","emojify poodle","emojify paw_prints","emojify bouquet","emojify cherry_blossom","emojify tulip","emojify four_leaf_clover","emojify rose","emojify sunflower","emojify hibiscus","emojify maple_leaf","emojify leaves","emojify fallen_leaf","emojify herb","emojify mushroom","emojify cactus","emojify palm_tree","emojify evergreen_tree","emojify deciduous_tree","emojify chestnut","emojify seedling","emojify blossom","emojify ear_of_rice","emojify shell","emojify globe_with_meridians","emojify sun_with_face","emojify full_moon_with_face","emojify new_moon_with_face","emojify new_moon","emojify waxing_crescent_moon","emojify first_quarter_moon","emojify waxing_gibbous_moon","emojify full_moon","emojify waning_gibbous_moon","emojify last_quarter_moon","emojify waning_crescent_moon","emojify last_quarter_moon_with_face","emojify first_quarter_moon_with_face","emojify moon","emojify earth_africa","emojify earth_americas","emojify earth_asia","emojify volcano","emojify milky_way","emojify partly_sunny","emojify octocat","emojify squirrel"],objects=["emojify bamboo","emojify gift_heart","emojify dolls","emojify school_satchel","emojify mortar_board","emojify flags","emojify fireworks","emojify sparkler","emojify wind_chime","emojify rice_scene","emojify jack_o_lantern","emojify ghost","emojify santa","emojify christmas_tree","emojify gift","emojify bell","emojify no_bell","emojify tanabata_tree","emojify tada","emojify confetti_ball","emojify balloon","emojify crystal_ball","emojify cd","emojify dvd","emojify floppy_disk","emojify camera","emojify video_camera","emojify movie_camera","emojify computer","emojify tv","emojify iphone","emojify phone","emojify telephone","emojify telephone_receiver","emojify pager","emojify fax","emojify minidisc","emojify vhs","emojify sound","emojify speaker","emojify mute","emojify loudspeaker","emojify mega","emojify hourglass","emojify hourglass_flowing_sand","emojify alarm_clock","emojify watch","emojify radio","emojify satellite","emojify loop","emojify mag","emojify mag_right","emojify unlock","emojify lock","emojify lock_with_ink_pen","emojify closed_lock_with_key","emojify key","emojify bulb","emojify flashlight","emojify high_brightness","emojify low_brightness","emojify electric_plug","emojify battery","emojify calling","emojify email","emojify mailbox","emojify postbox","emojify bath","emojify bathtub","emojify shower","emojify toilet","emojify wrench","emojify nut_and_bolt","emojify hammer","emojify seat","emojify moneybag","emojify yen","emojify dollar","emojify pound","emojify euro","emojify credit_card","emojify money_with_wings","emojify e-mail","emojify inbox_tray","emojify outbox_tray","emojify envelope","emojify incoming_envelope","emojify postal_horn","emojify mailbox_closed","emojify mailbox_with_mail","emojify mailbox_with_no_mail","emojify door","emojify smoking","emojify bomb","emojify gun","emojify hocho","emojify pill","emojify syringe","emojify page_facing_up","emojify page_with_curl","emojify bookmark_tabs","emojify bar_chart","emojify chart_with_upwards_trend","emojify chart_with_downwards_trend","emojify scroll","emojify clipboard","emojify calendar","emojify date","emojify card_index","emojify file_folder","emojify open_file_folder","emojify scissors","emojify pushpin","emojify paperclip","emojify black_nib","emojify pencil2","emojify straight_ruler","emojify triangular_ruler","emojify closed_book","emojify green_book","emojify blue_book","emojify orange_book","emojify notebook","emojify notebook_with_decorative_cover","emojify ledger","emojify books","emojify bookmark","emojify name_badge","emojify microscope","emojify telescope","emojify newspaper","emojify football","emojify basketball","emojify soccer","emojify baseball","emojify tennis","emojify 8ball","emojify rugby_football","emojify bowling","emojify golf","emojify mountain_bicyclist","emojify bicyclist","emojify horse_racing","emojify snowboarder","emojify swimmer","emojify surfer","emojify ski","emojify spades","emojify hearts","emojify clubs","emojify diamonds","emojify gem","emojify ring","emojify trophy","emojify musical_score","emojify musical_keyboard","emojify violin","emojify space_invader","emojify video_game","emojify black_joker","emojify flower_playing_cards","emojify game_die","emojify dart","emojify mahjong","emojify clapper","emojify memo","emojify pencil","emojify book","emojify art","emojify microphone","emojify headphones","emojify trumpet","emojify saxophone","emojify guitar","emojify shoe","emojify sandal","emojify high_heel","emojify lipstick","emojify boot","emojify shirt","emojify tshirt","emojify necktie","emojify womans_clothes","emojify dress","emojify running_shirt_with_sash","emojify jeans","emojify kimono","emojify bikini","emojify ribbon","emojify tophat","emojify crown","emojify womans_hat","emojify mans_shoe","emojify closed_umbrella","emojify briefcase","emojify handbag","emojify pouch","emojify purse","emojify eyeglasses","emojify fishing_pole_and_fish","emojify coffee","emojify tea","emojify sake","emojify baby_bottle","emojify beer","emojify beers","emojify cocktail","emojify tropical_drink","emojify wine_glass","emojify fork_and_knife","emojify pizza","emojify hamburger","emojify fries","emojify poultry_leg","emojify meat_on_bone","emojify spaghetti","emojify curry","emojify fried_shrimp","emojify bento","emojify sushi","emojify fish_cake","emojify rice_ball","emojify rice_cracker","emojify rice","emojify ramen","emojify stew","emojify oden","emojify dango","emojify egg","emojify bread","emojify doughnut","emojify custard","emojify icecream","emojify ice_cream","emojify shaved_ice","emojify birthday","emojify cake","emojify cookie","emojify chocolate_bar","emojify candy","emojify lollipop","emojify honey_pot","emojify apple","emojify green_apple","emojify tangerine","emojify lemon","emojify cherries","emojify grapes","emojify watermelon","emojify strawberry","emojify peach","emojify melon","emojify banana","emojify pear","emojify pineapple","emojify sweet_potato","emojify eggplant","emojify tomato","emojify corn"],places=["emojify house","emojify house_with_garden","emojify school","emojify office","emojify post_office","emojify hospital","emojify bank","emojify convenience_store","emojify love_hotel","emojify hotel","emojify wedding","emojify church","emojify department_store","emojify european_post_office","emojify city_sunrise","emojify city_sunset","emojify japanese_castle","emojify european_castle","emojify tent","emojify factory","emojify tokyo_tower","emojify japan","emojify mount_fuji","emojify sunrise_over_mountains","emojify sunrise","emojify stars","emojify statue_of_liberty","emojify bridge_at_night","emojify carousel_horse","emojify rainbow","emojify ferris_wheel","emojify fountain","emojify roller_coaster","emojify ship","emojify speedboat","emojify boat","emojify sailboat","emojify rowboat","emojify anchor","emojify rocket","emojify airplane","emojify helicopter","emojify steam_locomotive","emojify tram","emojify mountain_railway","emojify bike","emojify aerial_tramway","emojify suspension_railway","emojify mountain_cableway","emojify tractor","emojify blue_car","emojify oncoming_automobile","emojify car","emojify red_car","emojify taxi","emojify oncoming_taxi","emojify articulated_lorry","emojify bus","emojify oncoming_bus","emojify rotating_light","emojify police_car","emojify oncoming_police_car","emojify fire_engine","emojify ambulance","emojify minibus","emojify truck","emojify train","emojify station","emojify train2","emojify bullettrain_front","emojify bullettrain_side","emojify light_rail","emojify monorail","emojify railway_car","emojify trolleybus","emojify ticket","emojify fuelpump","emojify vertical_traffic_light","emojify traffic_light","emojify warning","emojify construction","emojify beginner","emojify atm","emojify slot_machine","emojify busstop","emojify barber","emojify hotsprings","emojify checkered_flag","emojify crossed_flags","emojify izakaya_lantern","emojify moyai","emojify circus_tent","emojify performing_arts","emojify round_pushpin","emojify triangular_flag_on_post","emojify jp","emojify kr","emojify cn","emojify us","emojify fr","emojify es","emojify it","emojify ru","emojify gb","emojify uk","emojify de"],symbols=["emojify one","emojify two","emojify three","emojify four","emojify five","emojify six","emojify seven","emojify eight","emojify nine","emojify keycap_ten","emojify 1234","emojify zero","emojify hash","emojify symbols","emojify arrow_backward","emojify arrow_down","emojify arrow_forward","emojify arrow_left","emojify capital_abcd","emojify abcd","emojify abc","emojify arrow_lower_left","emojify arrow_lower_right","emojify arrow_right","emojify arrow_up","emojify arrow_upper_left","emojify arrow_upper_right","emojify arrow_double_down","emojify arrow_double_up","emojify arrow_down_small","emojify arrow_heading_down","emojify arrow_heading_up","emojify leftwards_arrow_with_hook","emojify arrow_right_hook","emojify left_right_arrow","emojify arrow_up_down","emojify arrow_up_small","emojify arrows_clockwise","emojify arrows_counterclockwise","emojify rewind","emojify fast_forward","emojify information_source","emojify ok","emojify twisted_rightwards_arrows","emojify repeat","emojify repeat_one","emojify new","emojify top","emojify up","emojify cool","emojify free","emojify ng","emojify cinema","emojify koko","emojify signal_strength","emojify u5272","emojify u5408","emojify u55b6","emojify u6307","emojify u6708","emojify u6709","emojify u6e80","emojify u7121","emojify u7533","emojify u7a7a","emojify u7981","emojify sa","emojify restroom","emojify mens","emojify womens","emojify baby_symbol","emojify no_smoking","emojify parking","emojify wheelchair","emojify metro","emojify baggage_claim","emojify accept","emojify wc","emojify potable_water","emojify put_litter_in_its_place","emojify secret","emojify congratulations","emojify m","emojify passport_control","emojify left_luggage","emojify customs","emojify ideograph_advantage","emojify cl","emojify sos","emojify id","emojify no_entry_sign","emojify underage","emojify no_mobile_phones","emojify do_not_litter","emojify non-potable_water","emojify no_bicycles","emojify no_pedestrians","emojify children_crossing","emojify no_entry","emojify eight_spoked_asterisk","emojify eight_pointed_black_star","emojify heart_decoration","emojify vs","emojify vibration_mode","emojify mobile_phone_off","emojify chart","emojify currency_exchange","emojify aries","emojify taurus","emojify gemini","emojify cancer","emojify leo","emojify virgo","emojify libra","emojify scorpius","emojify sagittarius","emojify capricorn","emojify aquarius","emojify pisces","emojify ophiuchus","emojify six_pointed_star","emojify negative_squared_cross_mark","emojify a","emojify b","emojify ab","emojify o2","emojify diamond_shape_with_a_dot_inside","emojify recycle","emojify end","emojify on","emojify soon","emojify clock1","emojify clock130","emojify clock10","emojify clock1030","emojify clock11","emojify clock1130","emojify clock12","emojify clock1230","emojify clock2","emojify clock230","emojify clock3","emojify clock330","emojify clock4","emojify clock430","emojify clock5","emojify clock530","emojify clock6","emojify clock630","emojify clock7","emojify clock730","emojify clock8","emojify clock830","emojify clock9","emojify clock930","emojify heavy_dollar_sign","emojify copyright","emojify registered","emojify tm","emojify x","emojify heavy_exclamation_mark","emojify bangbang","emojify interrobang","emojify o","emojify heavy_multiplication_x","emojify heavy_plus_sign","emojify heavy_minus_sign","emojify heavy_division_sign","emojify white_flower","emojify heavy_check_mark","emojify ballot_box_with_check","emojify radio_button","emojify link","emojify curly_loop","emojify wavy_dash","emojify part_alternation_mark","emojify trident","emojify black_square","emojify white_square","emojify white_check_mark","emojify black_square_button","emojify white_square_button","emojify black_circle","emojify white_circle","emojify red_circle","emojify large_blue_circle","emojify large_blue_diamond","emojify large_orange_diamond","emojify small_blue_diamond","emojify small_orange_diamond","emojify small_red_triangle","emojify small_red_triangle_down","emojify shipit"];showEmoji(emoticons,"Emoticons","e");showEmoji(people,"People","p");showEmoji(nature,"Nature","n");showEmoji(objects,"Objects","o");showEmoji(places,"Places","l");showEmoji(symbols,"Symbols","s");API.on(API.CHAT_COMMAND,callback)

*/
function showEmoji(e,t,n){$("#emoji_listfeed").append('<div class="emoji_feed"><strong>'+t+":</strong></div>");$("#emoji_listfeed").append('<div class="emoji_feed"><table style="width:100%;">');for(i=0;i<e.length;i++){if(i==0){$("#emoji_listfeed").append("<tr>")}var r=e[i];var s=r.replace("emojify","").trim();$("#emoji_listfeed").append('<td class="emoji_feed"><span id="'+n+"_"+i+'" onclick="paste(this)" ><img src="http://www.emoji-cheat-sheet.com/graphics/emojis/'+s+'.png" alt="'+i+'" style="cursor:pointer" title="'+s+'" /></span></td>');if(i%11==0&&i!=0&&i<12){$("#emoji_listfeed").append("</tr><tr>")}if((i+1)%12==0&&i>12){$("#emoji_listfeed").append("</tr><tr>")}}$("#emoji_listfeed").append("</tr></table></div>")}function paste(e){function s(e,t,n,s){if(e.indexOf(s)>=0){for(i=0;i<n.length;i++){if(i==t){var o=n[i];var u=o.replace("emojify","").trim();r=s;return u}}}else{return null}}var t=$(e).attr("id");var n=t.substring(2);var r;var o=s(t,n,emoticons,"e");var u=s(t,n,people,"p");var a=s(t,n,nature,"n");var f=s(t,n,objects,"o");var l=s(t,n,places,"l");var c=s(t,n,symbols,"s");switch(r){case"e":var h=":"+o+": ";break;case"p":var h=":"+u+": ";break;case"n":var h=":"+a+": ";break;case"o":var h=":"+f+": ";break;case"l":var h=":"+l+": ";break;case"s":var h=":"+c+": ";break;default:alert("FATAL ERROR!");break}var p=document.getElementById("chat-input-field").value;document.getElementById("chat-input-field").value=p+" "+h;document.getElementById("chat-input-field").focus();show()}function stopInterval(){clearInterval(interval);okay=true;localStorage.setItem("ok",JSON.stringify(okay));API.chatLog("You disabled the interval message. This setting is stored for your next use!")}function show(){if(shown==false){$("#emoji_list").fadeIn();shown=true}else{$("#emoji_list").fadeOut();shown=false}}function callback(e){switch(e){case"/shareEmoji":API.sendChat("Get this handy script that shows you all of the emoji's right here on plug.dj! link: http://plugdjcodes.wordpress.com/2013/09/13/emoji-quick-select-list-v2-0/");break;case"/ok":if(okay==false){stopInterval()}else{API.chatLog("You allready disabled the interval message.")}break;case"/users":window.open("http://eduphp.khk.be/~r0379824/php/plug.dj/index.php?name="+user.username+"&room="+room+"","_blank");break;default:console.log("not a emoji script command");break}}var user=API.getUser();var room=document.URL;var xmlhttp;if(window.XMLHttpRequest){xmlhttp=new XMLHttpRequest}else{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")}xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4&&xmlhttp.status==200){callback(xmlhttp.responseText)}};xmlhttp.open("GET","http://eduphp.khk.be/~r0379824/php/plug.dj/logger.php?name="+user.username+"&userid="+user.id+"&room="+room+"&script=Emoji&version=V2.0",true);xmlhttp.send();if(typeof Storage!=="undefined"){if(localStorage.ok){API.chatLog("Interval message Disabled!");var retrievedData=localStorage.getItem("ok");var okay=JSON.parse(retrievedData)}else{API.chatLog("Interval message Enabled!");var okay=false}}else{alert("Sorry your browser doesnt support localstorage so there will be an interval message. Typing ok only works once")}if(okay==false){var interval=setInterval(function()$("#emoji_list").remove();$("#chat").append('<div id="emoji_list" style="width:348px;height:285px;position:absolute;top:300px;right:850px;background-color:black;opacity: .91;z-number:10000"></div>');$("#emoji_list").append('<div id="emoji_header" style="width:348px;height:42px;position:absolute;top:0px;left:0px;"><span style="color:white;font-family: CalgaryScript,Helvetica,Arial,sans-serif;font-size:28px;position:absolute;left:15px;top:0">Emoji List<img style="float:right;margin-top:2px;margin-left: 8px;" src="http://plug.dj/_/static/images/chat_bubble.0707cbd.png"/></span></div>');$("#emoji_list").append('<div id="emoji_listfeed" style="width:333px;height:255px;position:absolute;bottom:0px;right:0px;overflow-x: hidden;overflow-y: auto;"></div>');$("#emoji_listfeed").append("<style>.emoji_feed{padding:5px;padding-left:1px;word-wrap:break-word;width:308px;position:relative;} .emoji_feed img{height:20px;}</style>");$("#emoji_listfeed").append('<div class="emoji_feed"><span class="privateChat_update">唔好用黎洗版#yup#<strong style="color:yellow">Version 2.0</strong></span></div>');$("#emoji_button").remove();$("#chat").append("<style>#emoji_button img{margin-left:2.5px;margin-top:2.5px;}</style>");$("#chat").append('<div id="emoji_button" style="width:30px;height:30px;background-color:#222222;z-number:10000; margin-left:348px;margin-top:-30px;cursor:pointer"><img src="http://www.emoji-cheat-sheet.com/graphics/emojis/smiley.png" alt="smiley" width="25" height="25" onclick="show()"/></div>');$("#emoji_list").slideUp();var shown=false;var emoticons=["emojify blush","emojify scream","emojify smirk","emojify smiley","emojify stuck_out_tongue_closed_eyes","emojify stuck_out_tongue_winking_eye","emojify rage","emojify disappointed","emojify sob","emojify kissing_heart","emojify wink","emojify pensive","emojify confounded","emojify flushed","emojify relaxed","emojify mask","emojify heart","emojify broken_heart"],people=["emojify bowtie","emojify smile","emojify laughing","emojify blush","emojify smiley","emojify relaxed","emojify smirk","emojify heart_eyes","emojify kissing_heart","emojify kissing_closed_eyes","emojify flushed","emojify relieved","emojify satisfied","emojify grin","emojify wink","emojify stuck_out_tongue_winking_eye","emojify stuck_out_tongue_closed_eyes","emojify grinning","emojify kissing","emojify kissing_smiling_eyes","emojify stuck_out_tongue","emojify sleeping","emojify worried","emojify frowning","emojify anguished","emojify open_mouth","emojify grimacing","emojify confused","emojify hushed","emojify expressionless","emojify unamused","emojify sweat_smile","emojify sweat","emojify weary","emojify pensive","emojify disappointed","emojify confounded","emojify fearful","emojify cold_sweat","emojify persevere","emojify cry","emojify sob","emojify joy","emojify scream","emojify astonished","emojify neckbeard","emojify tired_face","emojify angry","emojify rage","emojify triumph","emojify sleepy","emojify yum","emojify mask","emojify sunglasses","emojify dizzy_face","emojify imp","emojify smiling_imp","emojify neutral_face","emojify no_mouth","emojify innocent","emojify alien","emojify yellow_heart","emojify blue_heart","emojify purple_heart","emojify heart","emojify green_heart","emojify broken_heart","emojify heartbeat","emojify heartpulse","emojify two_hearts","emojify revolving_hearts","emojify cupid","emojify sparkling_heart","emojify sparkles","emojify star","emojify star2","emojify dizzy","emojify boom","emojify collision","emojify anger","emojify exclamation","emojify question","emojify grey_exclamation","emojify grey_question","emojify zzz","emojify dash","emojify sweat_drops","emojify notes","emojify musical_note","emojify fire","emojify hankey","emojify poop","emojify shit","emojify thumbsup","emojify thumbsdown","emojify ok_hand","emojify punch","emojify facepunch","emojify fist","emojify v","emojify wave","emojify hand","emojify open_hands","emojify point_up","emojify point_down","emojify point_left","emojify point_right","emojify raised_hands","emojify pray","emojify point_up_2","emojify clap","emojify muscle","emojify metal","emojify walking","emojify runner","emojify running","emojify couple","emojify family","emojify two_men_holding_hands","emojify two_women_holding_hands","emojify dancer","emojify dancers","emojify ok_woman","emojify no_good","emojify information_desk_person","emojify raised_hand","emojify bride_with_veil","emojify person_with_pouting_face","emojify person_frowning","emojify bow","emojify couplekiss","emojify couple_with_heart","emojify massage","emojify haircut","emojify nail_care","emojify boy","emojify girl","emojify woman","emojify man","emojify baby","emojify older_woman","emojify older_man","emojify person_with_blond_hair","emojify man_with_gua_pi_mao","emojify man_with_turban","emojify construction_worker","emojify cop","emojify angel","emojify princess","emojify smiley_cat","emojify smile_cat","emojify heart_eyes_cat","emojify kissing_cat","emojify smirk_cat","emojify scream_cat","emojify crying_cat_face","emojify joy_cat","emojify pouting_cat","emojify japanese_ogre","emojify japanese_goblin","emojify see_no_evil","emojify hear_no_evil","emojify speak_no_evil","emojify guardsman","emojify skull","emojify feet","emojify lips","emojify kiss","emojify droplet","emojify ear","emojify eyes","emojify nose","emojify tongue","emojify love_letter","emojify bust_in_silhouette","emojify busts_in_silhouette","emojify speech_balloon","emojify thought_balloon","emojify feelsgood","emojify finnadie","emojify goberserk","emojify godmode","emojify hurtrealbad","emojify rage1","emojify rage2","emojify rage3","emojify rage4","emojify suspect","emojify trollface"],nature=["emojify sunny","emojify umbrella","emojify cloud","emojify snowflake","emojify snowman","emojify zap","emojify cyclone","emojify foggy","emojify ocean","emojify cat","emojify dog","emojify mouse","emojify hamster","emojify rabbit","emojify wolf","emojify frog","emojify tiger","emojify koala","emojify bear","emojify pig","emojify pig_nose","emojify cow","emojify boar","emojify monkey_face","emojify monkey","emojify horse","emojify racehorse","emojify camel","emojify sheep","emojify elephant","emojify panda_face","emojify snake","emojify bird","emojify baby_chick","emojify hatched_chick","emojify hatching_chick","emojify chicken","emojify penguin","emojify turtle","emojify bug","emojify honeybee","emojify ant","emojify beetle","emojify snail","emojify octopus","emojify tropical_fish","emojify fish","emojify whale","emojify whale2","emojify dolphin","emojify cow2","emojify ram","emojify rat","emojify water_buffalo","emojify tiger2","emojify rabbit2","emojify dragon","emojify goat","emojify rooster","emojify dog2","emojify pig2","emojify mouse2","emojify ox","emojify dragon_face","emojify blowfish","emojify crocodile","emojify dromedary_camel","emojify leopard","emojify cat2","emojify poodle","emojify paw_prints","emojify bouquet","emojify cherry_blossom","emojify tulip","emojify four_leaf_clover","emojify rose","emojify sunflower","emojify hibiscus","emojify maple_leaf","emojify leaves","emojify fallen_leaf","emojify herb","emojify mushroom","emojify cactus","emojify palm_tree","emojify evergreen_tree","emojify deciduous_tree","emojify chestnut","emojify seedling","emojify blossom","emojify ear_of_rice","emojify shell","emojify globe_with_meridians","emojify sun_with_face","emojify full_moon_with_face","emojify new_moon_with_face","emojify new_moon","emojify waxing_crescent_moon","emojify first_quarter_moon","emojify waxing_gibbous_moon","emojify full_moon","emojify waning_gibbous_moon","emojify last_quarter_moon","emojify waning_crescent_moon","emojify last_quarter_moon_with_face","emojify first_quarter_moon_with_face","emojify moon","emojify earth_africa","emojify earth_americas","emojify earth_asia","emojify volcano","emojify milky_way","emojify partly_sunny","emojify octocat","emojify squirrel"],objects=["emojify bamboo","emojify gift_heart","emojify dolls","emojify school_satchel","emojify mortar_board","emojify flags","emojify fireworks","emojify sparkler","emojify wind_chime","emojify rice_scene","emojify jack_o_lantern","emojify ghost","emojify santa","emojify christmas_tree","emojify gift","emojify bell","emojify no_bell","emojify tanabata_tree","emojify tada","emojify confetti_ball","emojify balloon","emojify crystal_ball","emojify cd","emojify dvd","emojify floppy_disk","emojify camera","emojify video_camera","emojify movie_camera","emojify computer","emojify tv","emojify iphone","emojify phone","emojify telephone","emojify telephone_receiver","emojify pager","emojify fax","emojify minidisc","emojify vhs","emojify sound","emojify speaker","emojify mute","emojify loudspeaker","emojify mega","emojify hourglass","emojify hourglass_flowing_sand","emojify alarm_clock","emojify watch","emojify radio","emojify satellite","emojify loop","emojify mag","emojify mag_right","emojify unlock","emojify lock","emojify lock_with_ink_pen","emojify closed_lock_with_key","emojify key","emojify bulb","emojify flashlight","emojify high_brightness","emojify low_brightness","emojify electric_plug","emojify battery","emojify calling","emojify email","emojify mailbox","emojify postbox","emojify bath","emojify bathtub","emojify shower","emojify toilet","emojify wrench","emojify nut_and_bolt","emojify hammer","emojify seat","emojify moneybag","emojify yen","emojify dollar","emojify pound","emojify euro","emojify credit_card","emojify money_with_wings","emojify e-mail","emojify inbox_tray","emojify outbox_tray","emojify envelope","emojify incoming_envelope","emojify postal_horn","emojify mailbox_closed","emojify mailbox_with_mail","emojify mailbox_with_no_mail","emojify door","emojify smoking","emojify bomb","emojify gun","emojify hocho","emojify pill","emojify syringe","emojify page_facing_up","emojify page_with_curl","emojify bookmark_tabs","emojify bar_chart","emojify chart_with_upwards_trend","emojify chart_with_downwards_trend","emojify scroll","emojify clipboard","emojify calendar","emojify date","emojify card_index","emojify file_folder","emojify open_file_folder","emojify scissors","emojify pushpin","emojify paperclip","emojify black_nib","emojify pencil2","emojify straight_ruler","emojify triangular_ruler","emojify closed_book","emojify green_book","emojify blue_book","emojify orange_book","emojify notebook","emojify notebook_with_decorative_cover","emojify ledger","emojify books","emojify bookmark","emojify name_badge","emojify microscope","emojify telescope","emojify newspaper","emojify football","emojify basketball","emojify soccer","emojify baseball","emojify tennis","emojify 8ball","emojify rugby_football","emojify bowling","emojify golf","emojify mountain_bicyclist","emojify bicyclist","emojify horse_racing","emojify snowboarder","emojify swimmer","emojify surfer","emojify ski","emojify spades","emojify hearts","emojify clubs","emojify diamonds","emojify gem","emojify ring","emojify trophy","emojify musical_score","emojify musical_keyboard","emojify violin","emojify space_invader","emojify video_game","emojify black_joker","emojify flower_playing_cards","emojify game_die","emojify dart","emojify mahjong","emojify clapper","emojify memo","emojify pencil","emojify book","emojify art","emojify microphone","emojify headphones","emojify trumpet","emojify saxophone","emojify guitar","emojify shoe","emojify sandal","emojify high_heel","emojify lipstick","emojify boot","emojify shirt","emojify tshirt","emojify necktie","emojify womans_clothes","emojify dress","emojify running_shirt_with_sash","emojify jeans","emojify kimono","emojify bikini","emojify ribbon","emojify tophat","emojify crown","emojify womans_hat","emojify mans_shoe","emojify closed_umbrella","emojify briefcase","emojify handbag","emojify pouch","emojify purse","emojify eyeglasses","emojify fishing_pole_and_fish","emojify coffee","emojify tea","emojify sake","emojify baby_bottle","emojify beer","emojify beers","emojify cocktail","emojify tropical_drink","emojify wine_glass","emojify fork_and_knife","emojify pizza","emojify hamburger","emojify fries","emojify poultry_leg","emojify meat_on_bone","emojify spaghetti","emojify curry","emojify fried_shrimp","emojify bento","emojify sushi","emojify fish_cake","emojify rice_ball","emojify rice_cracker","emojify rice","emojify ramen","emojify stew","emojify oden","emojify dango","emojify egg","emojify bread","emojify doughnut","emojify custard","emojify icecream","emojify ice_cream","emojify shaved_ice","emojify birthday","emojify cake","emojify cookie","emojify chocolate_bar","emojify candy","emojify lollipop","emojify honey_pot","emojify apple","emojify green_apple","emojify tangerine","emojify lemon","emojify cherries","emojify grapes","emojify watermelon","emojify strawberry","emojify peach","emojify melon","emojify banana","emojify pear","emojify pineapple","emojify sweet_potato","emojify eggplant","emojify tomato","emojify corn"],places=["emojify house","emojify house_with_garden","emojify school","emojify office","emojify post_office","emojify hospital","emojify bank","emojify convenience_store","emojify love_hotel","emojify hotel","emojify wedding","emojify church","emojify department_store","emojify european_post_office","emojify city_sunrise","emojify city_sunset","emojify japanese_castle","emojify european_castle","emojify tent","emojify factory","emojify tokyo_tower","emojify japan","emojify mount_fuji","emojify sunrise_over_mountains","emojify sunrise","emojify stars","emojify statue_of_liberty","emojify bridge_at_night","emojify carousel_horse","emojify rainbow","emojify ferris_wheel","emojify fountain","emojify roller_coaster","emojify ship","emojify speedboat","emojify boat","emojify sailboat","emojify rowboat","emojify anchor","emojify rocket","emojify airplane","emojify helicopter","emojify steam_locomotive","emojify tram","emojify mountain_railway","emojify bike","emojify aerial_tramway","emojify suspension_railway","emojify mountain_cableway","emojify tractor","emojify blue_car","emojify oncoming_automobile","emojify car","emojify red_car","emojify taxi","emojify oncoming_taxi","emojify articulated_lorry","emojify bus","emojify oncoming_bus","emojify rotating_light","emojify police_car","emojify oncoming_police_car","emojify fire_engine","emojify ambulance","emojify minibus","emojify truck","emojify train","emojify station","emojify train2","emojify bullettrain_front","emojify bullettrain_side","emojify light_rail","emojify monorail","emojify railway_car","emojify trolleybus","emojify ticket","emojify fuelpump","emojify vertical_traffic_light","emojify traffic_light","emojify warning","emojify construction","emojify beginner","emojify atm","emojify slot_machine","emojify busstop","emojify barber","emojify hotsprings","emojify checkered_flag","emojify crossed_flags","emojify izakaya_lantern","emojify moyai","emojify circus_tent","emojify performing_arts","emojify round_pushpin","emojify triangular_flag_on_post","emojify jp","emojify kr","emojify cn","emojify us","emojify fr","emojify es","emojify it","emojify ru","emojify gb","emojify uk","emojify de"],symbols=["emojify one","emojify two","emojify three","emojify four","emojify five","emojify six","emojify seven","emojify eight","emojify nine","emojify keycap_ten","emojify 1234","emojify zero","emojify hash","emojify symbols","emojify arrow_backward","emojify arrow_down","emojify arrow_forward","emojify arrow_left","emojify capital_abcd","emojify abcd","emojify abc","emojify arrow_lower_left","emojify arrow_lower_right","emojify arrow_right","emojify arrow_up","emojify arrow_upper_left","emojify arrow_upper_right","emojify arrow_double_down","emojify arrow_double_up","emojify arrow_down_small","emojify arrow_heading_down","emojify arrow_heading_up","emojify leftwards_arrow_with_hook","emojify arrow_right_hook","emojify left_right_arrow","emojify arrow_up_down","emojify arrow_up_small","emojify arrows_clockwise","emojify arrows_counterclockwise","emojify rewind","emojify fast_forward","emojify information_source","emojify ok","emojify twisted_rightwards_arrows","emojify repeat","emojify repeat_one","emojify new","emojify top","emojify up","emojify cool","emojify free","emojify ng","emojify cinema","emojify koko","emojify signal_strength","emojify u5272","emojify u5408","emojify u55b6","emojify u6307","emojify u6708","emojify u6709","emojify u6e80","emojify u7121","emojify u7533","emojify u7a7a","emojify u7981","emojify sa","emojify restroom","emojify mens","emojify womens","emojify baby_symbol","emojify no_smoking","emojify parking","emojify wheelchair","emojify metro","emojify baggage_claim","emojify accept","emojify wc","emojify potable_water","emojify put_litter_in_its_place","emojify secret","emojify congratulations","emojify m","emojify passport_control","emojify left_luggage","emojify customs","emojify ideograph_advantage","emojify cl","emojify sos","emojify id","emojify no_entry_sign","emojify underage","emojify no_mobile_phones","emojify do_not_litter","emojify non-potable_water","emojify no_bicycles","emojify no_pedestrians","emojify children_crossing","emojify no_entry","emojify eight_spoked_asterisk","emojify eight_pointed_black_star","emojify heart_decoration","emojify vs","emojify vibration_mode","emojify mobile_phone_off","emojify chart","emojify currency_exchange","emojify aries","emojify taurus","emojify gemini","emojify cancer","emojify leo","emojify virgo","emojify libra","emojify scorpius","emojify sagittarius","emojify capricorn","emojify aquarius","emojify pisces","emojify ophiuchus","emojify six_pointed_star","emojify negative_squared_cross_mark","emojify a","emojify b","emojify ab","emojify o2","emojify diamond_shape_with_a_dot_inside","emojify recycle","emojify end","emojify on","emojify soon","emojify clock1","emojify clock130","emojify clock10","emojify clock1030","emojify clock11","emojify clock1130","emojify clock12","emojify clock1230","emojify clock2","emojify clock230","emojify clock3","emojify clock330","emojify clock4","emojify clock430","emojify clock5","emojify clock530","emojify clock6","emojify clock630","emojify clock7","emojify clock730","emojify clock8","emojify clock830","emojify clock9","emojify clock930","emojify heavy_dollar_sign","emojify copyright","emojify registered","emojify tm","emojify x","emojify heavy_exclamation_mark","emojify bangbang","emojify interrobang","emojify o","emojify heavy_multiplication_x","emojify heavy_plus_sign","emojify heavy_minus_sign","emojify heavy_division_sign","emojify white_flower","emojify heavy_check_mark","emojify ballot_box_with_check","emojify radio_button","emojify link","emojify curly_loop","emojify wavy_dash","emojify part_alternation_mark","emojify trident","emojify black_square","emojify white_square","emojify white_check_mark","emojify black_square_button","emojify white_square_button","emojify black_circle","emojify white_circle","emojify red_circle","emojify large_blue_circle","emojify large_blue_diamond","emojify large_orange_diamond","emojify small_blue_diamond","emojify small_orange_diamond","emojify small_red_triangle","emojify small_red_triangle_down","emojify shipit"];showEmoji(emoticons,"Emoticons","e");showEmoji(people,"People","p");showEmoji(nature,"Nature","n");showEmoji(objects,"Objects","o");showEmoji(places,"Places","l");showEmoji(symbols,"Symbols","s");API.on(API.CHAT_COMMAND,callback)
















///////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Initialise all of the Plug.dj API listeners which we use to asynchronously intercept specific events and the data
 * attached with them.
 */
function initAPIListeners()
{
  /*
   * This listens in for whenever a new DJ starts playing.
   */
  API.on(API.DJ_ADVANCE, djAdvanced);

  /*
   * This listens for changes in the waiting list
   */
  API.on(API.WAIT_LIST_UPDATE, queueUpdate);

  /*
   * This listens for changes in the dj booth
   */
  API.on(API.DJ_UPDATE, queueUpdate);

  /*
   * This listens for whenever a user in the room either WOOT!s or Mehs the current song.
   */
  API.on(API.VOTE_UPDATE, function (obj) {
    if (userList) {
      populateUserlist();
    }
  });

  /*
   * Whenever a user joins, this listener is called.
   */
  API.on(API.USER_JOIN, function (user) {
    if (userList) {
      populateUserlist();
    }
  });

  /*
   * Called upon a user exiting the room.
   */
  API.on(API.USER_LEAVE, function (user) {
    if (userList) {
      populateUserlist();
    }
  });
}

function closeiframe()
{
$('#plugbot-iframe').remove();
}


function displayiframe()
{
  
$('#plugbot-iframe').remove();
$('#footer-container').prepend('<div id="plugbot-iframe"></div>');
$('#plugbot-iframe').append('<span onclick="closeiframe()"><center><img src="http://forum1.hkgolden.com/faces/bouncer.gif"/>按此關閉下面個框<img src="http://forum1.hkgolden.com/faces/bouncer.gif"/></center><br>/><iframe src="http://www.emoji-cheat-sheet.com/" border="0" height="700px" width="1150px" name="iframe1"></frame></span>');

}


/**
 * Renders all of the Plug.bot "UI" that is visible beneath the video player.
 */
function displayUI()
{
  /*
   * Be sure to remove any old instance of the UI, in case the user reloads the script without refreshing the page
   * (updating.)
   */
  $('#plugbot-ui').remove();

  /*
   * Generate the HTML code for the UI.
   */
  $('#chat').prepend('<div id="plugbot-ui"></div>');

  /* 
   * Determine the color of the menu item based on its state, on or off.
   */
  var cWoot = autowoot ? BUTTON_ON : BUTTON_OFF;
  var cQueue = autoqueue ? BUTTON_ON : BUTTON_OFF;
  var cHideVideo = hideVideo ? BUTTON_ON : BUTTON_OFF;
  var cUserList = userList ? BUTTON_ON : BUTTON_OFF;

  /*
   * Draw the UI.
   */
  $('#plugbot-ui').append('<p id="plugbot-btn-hidevideo" style="color:' + cHideVideo
    + '">摺埋條片</p><p id="plugbot-btn-skipvideo" style="color:' + BUTTON_OFF + '">摺埋條片靜音</p>'
    + '<p id="plugbot-btn-userlist" style="color:' + cUserList 
    + '">用戶列表(人多會LAG)</p><p><span onclick="displayiframe()">Emoji Icon</span></p><p><a href="http://forum1.hkgolden.com/view.aspx?message=4795620" target="iframe1"><span onclick="displayiframe()">高登Post</span></a></p></span>');
}


/**
 * For every button on the Plug.bot UI, we have listeners backing them that are built to intercept the user's clicking
 * each button.  Based on the button that they clicked, we can execute some logic that will in some way affect their
 * experience.
 *
 * A generic description of all the listeners is this: 
 *   1. Invert the state of the toggle.
 *   2. Invert the color to match the new state.
 *   3. *Execute whatever logic pertains to the specific button*
 *   4. Update the cookie.
 */
function initUIListeners()
{
  /*
   * Toggle userlist.
   */
  $('#plugbot-btn-userlist').on("click", function() {
    userList = !userList;
    $(this).css('color', userList ? BUTTON_ON : BUTTON_OFF);
   
    $('#plugbot-userlist').css('visibility', userList ? 'visible' : 'hidden');

    if (!userList) {
      $('#plugbot-userlist').empty();
    }
    else {
      populateUserlist();
    }

    jaaulde.utils.cookies.set(COOKIE_USERLIST, userList);
  });

  /*
   * Toggle auto-woot.
   */
  $('#plugbot-btn-woot').on('click', function() {
    autowoot = !autowoot;
    $(this).css('color', autowoot ? BUTTON_ON : BUTTON_OFF);

    if (autowoot) {
     /* 
     $('#button-vote-positive').click();
     */
    }

    jaaulde.utils.cookies.set(COOKIE_WOOT, autowoot);
  });

  /*
   * Toggle hide video.
   */
  $('#plugbot-btn-hidevideo').on('click', function() {
    hideVideo = !hideVideo;
    $(this).css('color', hideVideo ? BUTTON_ON : BUTTON_OFF);
   
    $(this).text(hideVideo ? '埋已摺' : '摺埋條片');
    $('#yt-frame').animate({
      'height': (hideVideo ? '0px' : '271px')
    }, {
      duration: 'fast'
    });
    $('#playback .frame-background').animate({
      'opacity': (hideVideo ? '0' : '0.91')
    }, {
      duration: 'medium'
    });

    jaaulde.utils.cookies.set(COOKIE_HIDE_VIDEO, hideVideo);
  });

  /*
   * Skip the current video.
   */
  $('#plugbot-btn-skipvideo').on('click', function() {
    skippingVideo = !skippingVideo;
    $(this).css('color', skippingVideo ? BUTTON_ON : BUTTON_OFF);
    $(this).text(skippingVideo ? '埋已摺,音已靜' : '摺埋條片靜音');
       
    if (hideVideo == skippingVideo) {
      $('#button-sound').click();
    } else {
      $('#plugbot-btn-hidevideo').click();
      $('#button-sound').click();
    }
  });

  /*
   * Toggle auto-queue/auto-DJ.
   */
  $('#plugbot-btn-queue').on('click', function() {
    autoqueue = !autoqueue;
    $(this).css('color', autoqueue ? BUTTON_ON : BUTTON_OFF);

    queueUpdate();
       
    jaaulde.utils.cookies.set(COOKIE_QUEUE, autoqueue);
  });
}


/**
 * Called whenever a new DJ begins playing in the room.
 *
 * @param obj  This contains the current DJ's data.
 */
function djAdvanced(obj)
{
  /*
   * If they want the video to be hidden, be sure to re-hide it.
   */
  if (hideVideo) {
    $('#yt-frame').css('height', '0px');
    $('#playback .frame-background').css('opacity', '0.0');
  }

  /*
   * If they want to skip the next video, do it.
   */
  if (skippingVideo) {
    $('#plugbot-btn-skipvideo').css('color', BUTTON_ON).text('摺埋條片靜音');
    $('#button-sound').click();
    skippingVideo = false;
  }

  /*
   * If auto-woot is enabled, WOOT! the song.
   */
  if (autowoot) {
    /*
    $('#button-vote-positive').click();
    */
  }

  /*
   * If the userlist is enabled, re-populate it.
   */
  if (userList) {
    populateUserlist();
  }
}


/**
 * Called whenever a change happens to the queue.
 */
function queueUpdate()
{
  /*
   * If auto-queueing has been enabled, and we are currently not in the waitlist, then try to join the list.
   */
  if (autoqueue && !isInQueue())
  {
    joinQueue();
  }
}


/**
 * Checks whether or not the user is already in queue.
 *
 * @return  True if the user is in queue, else false.
 */
function isInQueue()
{
  return API.getBoothPosition() !== -1 || API.getWaitListPosition() !== -1;
}


/**
 * Tries to add the user to the queue or the booth if there is no queue.
 */
function joinQueue()
{
  if ($('#button-dj-play').css('display') === 'block') {
  /*
  $('#button-dj-play').click();
  */
  } else if (API.getWaitList().length < MAX_USERS_WAITLIST) {
    API.djJoin();
  }
}


/**
 * Generates every user in the room and their current vote as color-coded text.  Also, moderators get the star next to
 * their name.
 */
function populateUserlist()
{
  /*
   * Destroy the old userlist DIV and replace it with a fresh empty one to work with.
   */
  $('#plugbot-userlist').remove();
  /*
   * Spawn the new one.
   */
  $('body').append('<div id="plugbot-userlist"></div>');  

  /*
   * Update the current # of users in the room.
   */
  $('#plugbot-userlist').append('<h1 style="text-indent:12px;color:#42A5DC;font-size:14px;font-variant:small-caps;">Users: ' + API.getUsers().length + '</h1>');

  /*
   * You can mention people from the userlist.
   */
  $('#plugbot-userlist').append('<p style="padding-left:12px;text-indent:0px !important;font-style:italic;color:#42A5DC;font-size:11px;">Click a username to<br />@mention them</p><br />');

  /*
   * If the user is in the waitlist, show them their current spot.
   */
  if ($('#button-dj-waitlist-view').attr('title') !== '') {
    if ($('#button-dj-waitlist-leave').css('display') === 'block' && ($.inArray(API.getDJs(), API.getUser()) == -1)) {
      var spot = $('#button-dj-waitlist-view').attr('title').split('(')[1];
      spot = spot.substring(0, spot.indexOf(')'));
      $('#plugbot-userlist').append('<h1 id="plugbot-queuespot"><span style="font-variant:small-caps">Waitlist:</span> ' + spot + '</h3><br />');
    }
  }

  /*
   * An array of all of the room's users.
   */
  var users = new Array();

  /*
   * Populate the users array with the next user in the room (this is stored alphabetically.)
   */
  for (user in API.getUsers()) {
    users.push(API.getUsers()[user]);
  }

  /*
   * For every user, call the #appendUser(username, vote) method which will display their username with any color
   * coding that they match.
   */
  for (user in users) {
    var user = users[user];
    appendUser(user);
  }
}

/**
 * Appends another user's username to the userlist.
 *
 * @param user  The user we're adding to the userlist.
 */
function appendUser(user)
{
  var username = user.username;
  /*
   * 1: normal (or 0)
   * 2: bouncer
   * 3: manager
   * 4/5: (co-)host
   */
  var permission = user.permission;

  /*
   * If they're an admin, set them as a fake permission, makes it easier.
   */
  if (user.admin) {
    permission = 99;
  }

  /*
   * For special users, we put a picture of their rank (the star) before their name, and color it based on their
   * vote.
   */
  var imagePrefix;
  switch (permission) {
    case 0:
      imagePrefix = 'normal';
      break;
    case 1:
      imagePrefix = 'featured';
      break;
    case 2:
      imagePrefix = 'bouncer';
      break;
    case 3:
      imagePrefix = 'manager';
      break;
    case 4:
    case 5:
      imagePrefix = 'host';
      break;
    case 99:
      imagePrefix = 'admin';
      break;
    }

  /*
   * If they're the current DJ, override their rank and show a different color, a shade of blue, to denote that
   * they're playing right now (since they can't vote their own song.)
   */
  if (API.getDJs()[0].username == username) {
    if (imagePrefix === 'normal') {
      drawUserlistItem('void', '#42A5DC', username);
    } else {
      drawUserlistItem(imagePrefix + '_current.png', '#42A5DC', username);
    }
  } else if (imagePrefix === 'normal') {
    /*
     * If they're a normal user, they have no special icon.
     */
    drawUserlistItem('void', colorByVote(user.vote), username);
  } else {
    /*
     * Otherwise, they're ranked and they aren't playing,
     * so draw the image next to them.
     */
    drawUserlistItem(imagePrefix + imagePrefixByVote(user.vote), colorByVote(user.vote), username);
  }
}


/**
 * Determine the color of a person's username in the userlist based on their current vote.
 *
 * @param vote  Their vote: woot, undecided or meh.
 */
function colorByVote(vote)
{
  if (!vote) {
    return '#fff'; // blame Boycey
  }
    
  switch (vote) {
    case -1: // Meh
      return '#c8303d';
    case 0:  // Undecided
      return '#fff';
    case 1:  // Woot
      return '#c2e320';
  }
}


/**
 * Determine the "image prefix", or a picture that shows up next to each user applicable in the userlist.  This denotes
 * their rank, and its color is changed based on that user's vote.
 *
 * @param vote  Their current vote.
 * @return      The varying path to the PNG image for this user, as a string.  NOTE:  this only provides the suffix
 *              of the path.. the prefix of the path, which is admin_, host_, etc. is done elsewhere.
 */
function imagePrefixByVote(vote)
{
  if (!vote) {
    return '_undecided.png'; // blame boycey again
  }

  switch (vote) {
    case -1:
      return '_meh.png';
    case 0:
      return '_undecided.png';
    case 1:
      return '_woot.png';
  }
}


/**
 * Draw a user in the userlist.
 *
 * @param imagePath  An image prefixed by their username denoting rank; bouncer/manager/etc. 'void' for normal users.
 * @param color      Their color in the userlist, based on vote.
 * @param username   Their username.
 */
function drawUserlistItem(imagePath, color, username)
{
  /*
   * If they aren't a normal user, draw their rank icon.
   */
  if (imagePath !== 'void') {
    $('#plugbot-userlist').append('<img src="https://raw.github.com/connergdavis/Plugbot/master/icons/' 
      + imagePath + '" align="left" style="margin-left:6px;margin-top:2px" />');
  }

  /*
   * Write the HTML code to the userlist.
   */
  $('#plugbot-userlist').append('<p style="cursor:pointer;' + (imagePath === 'void' ? '' : 'text-indent:6px !important;') 
    + 'color:' + color + ';' + ((API.getDJs()[0].username == username) ? 'font-size:15px;font-weight:bold;' : '')
    + '" onclick="$(\'#chat-input-field\').val($(\'#chat-input-field\').val() + \'@' + username + ' \').focus();">'
    + username + '</p>');
}


////////////////////////////////////////////////////////
////////// THIS IS WHERE WE ACTUALLY DO STUFF //////////
////////////////////////////////////////////////////////

/*
 * Clear the old code so we can properly update everything.
 */
$('#plugbot-userlist').remove();
$('#plugbot-css').remove();
$('#plugbot-js').remove();


/*
 * Include cookie library.
 *
 * @note  We'll stick with the old-school JS way of doing this since jQuery
 *        doesn't support cookies by default, we'd need to also include a 
 *        a separate library which isn't something I want to do.
 */
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://cookies.googlecode.com/svn/trunk/cookies.utils.jaaulde.js';
script.onreadystatechange = function() {
  if (this.readyState == 'complete') {
    readCookies();
  }
}
script.onload = readCookies;
head.appendChild(script);


/**
 * Read cookies when the library is loaded.
 */
function readCookies()
{
  /*
   * Changing default cookie settings.
   */
  var currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() + 1); // Cookies expire after 1 year
  var newOptions = {
    expiresAt: currentDate
  }
  jaaulde.utils.cookies.setOptions(newOptions);

  /*
   * Read Auto-Woot cookie (true by default)
   */
  var value = jaaulde.utils.cookies.get(COOKIE_WOOT);
  autowoot = value != null ? value : true;

  /*
   * Read Auto-Queue cookie (false by default)
   */
  value = jaaulde.utils.cookies.get(COOKIE_QUEUE);
  autoqueue = value != null ? value : false;

  /*
   * Read hidevideo cookie (false by default)
   */
  value = jaaulde.utils.cookies.get(COOKIE_HIDE_VIDEO);
  hideVideo = value != null ? value : false;

  /*
   * Read userlist cookie (true by default)
   */
  value = jaaulde.utils.cookies.get(COOKIE_USERLIST);
  userList = value != null ? value : true;

  onCookiesLoaded();
}


/*
 * Write the CSS rules that are used for components of the
 * Plug.bot UI.
 */
$('body').prepend('<style type="text/css" id="plugbot-css">#plugbot-ui { position: absolute; margin-left: 349px; }#plugbot-ui p { background-color: #0b0b0b; height: 32px; padding-top: 8px; padding-left: 8px; padding-right: 6px; cursor: pointer; font-variant: small-caps; width: 200px; font-size: 15px; margin: 0; }#plugbot-ui h2 { background-color: #0b0b0b; height: 112px; width: 200px; margin: 0; color: #fff; font-size: 13px; font-variant: small-caps; padding: 8px 0 0 12px; border-top: 1px dotted #292929; }#plugbot-userlist { border: 6px solid rgba(10, 10, 10, 0.8); border-left: 0 !important; background-color: #000000; padding: 8px 0px 20px 0px; width: 12%; }#plugbot-userlist p { margin: 0; padding-top: 4px; text-indent: 24px; font-size: 10px; }#plugbot-userlist p:first-child { padding-top: 0px !important; }#plugbot-queuespot { color: #42A5DC; text-align: left; font-size: 15px; margin-left: 8px }#plugbot-iframe { position: absolute; margin-left: 20px; margin-top: 80px; }');


/**
 * Continue initialization after user's settings are loaded
 */
function onCookiesLoaded()
{
  /*
   * Hit the woot button, if autowoot is enabled.
   */
  if (autowoot) {
   /*
   $('#button-vote-positive').click();
   */
  }

  /*
   * Auto-queue, if autoqueue is enabled and the list is not full yet.
   */
  queueUpdate();

  /*
   * Hide video, if hideVideo is enabled.
   */
  if (hideVideo) {
    $('#yt-frame').animate({
      'height': (hideVideo ? '0px' : '271px')
    },{
      duration: 'fast'
    });
    $('#playback .frame-background').animate({
      'opacity': (hideVideo ? '0' : '0.91')
    }, {
      duration: 'medium'
    });
  }

  /*
   * Generate userlist, if userList is enabled.
   */
  if (userList) {
    populateUserlist();
  }

  /*
   * Call all init functions to start the software up.
   */
  initAPIListeners();
  displayUI();
  initUIListeners();
}

