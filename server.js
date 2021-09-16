const figlet = require("figlet");
const colors = require("colors");
const Request = require("request");
const Discord = require("discord.js");
const Omegle = require("omegle-node");

var fs = require("fs");
var date = require("unix-date");
var om = new Omegle();

// BOT SETTINGS //

var STAFF = "FOUNDER";
var USER = "USER";
var command_prefix = "!";
var BotNAME = "OmegleCord";
var URL ="https://i.imgur.com";
var IMG = "/TIVeIa1.png";
var embedcolour = `#82a1af`; // Set message colour throughout embed content.

const bot = new Discord.Client();
const token = ""; // Enter discord token if blank.

figlet.text(

  "OmegleCord .", {
	  
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default"
	
  },
  
	function(err, data) {
	  
		if (err) {
			
		  console.log("[OmegleCord]".yellow + " An error has occurred...");
		  console.dir(err);
		  
		  return;
		  
		}

	console.log(data.yellow + "\n");
	
  }
  
);

bot.on("ready", function() {
	
  console.log(
  
	`[OmegleCord]`.yellow +
	` INTERGRATION => ` +
	`OmegleCord BOT is now LIVE.`.green
	  
  );
  
});

bot.on("message", function(message) {
  
// OMEGLE CHAT //

om.on('omerror', function(err) {

    console.log('Error: ' + err);

});

om.on('recaptchaRequired', function(challenge) {
    
    //challenge is the link to the recaptcha image.
    console.log(challenge);
    //after solving the captcha, send the answer to omegle by calling
    om.solveReCAPTCHA(answer);

});        
    
var standard = ['bored', 'fun', 'movies']
    
var special = ['coding', 'games', 'consoles'];
    
	if (message.content === command_prefix + "connect") {

		if (message.member.roles.find(x => x.name === STAFF)) {
			
			om.on('gotID', function(id) {
                
				console.log('Connected to server as: ' + id);
                
				setTimeout(function() {
                    
					if(!om.connected()) {
                        
						om.stopLookingForCommonLikes(); // or you could call om.slfcl()
						message.channel.send('*Could not find anyone with common likes, connecting to a random stranger instead...*').catch(err => err);
					}
                    
				}, 7500);
                
			});

			om.on('waiting', function() {
                
				message.channel.send('*Waiting for a stranger to connect...*').catch(err => err);
                
			});

			om.on('connected', function() {
                
				message.channel.send('`You have connected to a stranger!`').catch(err => err);
                
			});

			om.on('commonLikes', function(likes) {
                
				message.channel.send('`Common likes:`  ' + likes).catch(err => err);
                
			});
			
			om.on('typing', function() {
                
				message.channel.send('*Stranger is typing...*').catch(err => err);
                message.delete(250);
                
			});

			om.on('stoppedTyping', function() {
                
				console.log('Stranger stopped typing!');
                
			});
            
			om.on('gotMessage', function(msg) {
				
				message.channel.send('`Stranger has messaged:`  ' + msg).catch(err => err);

			});

			om.on('strangerDisconnected', function() {
                				
				message.channel.send('*Stranger has disconnected...*').catch(err => err);	
				
		     	om.connect(standard);
				
            });

            om.on('disconnected', function() {

				console.log('Connect to a new server.');
                message.channel.send('`You have been disconnected!`').catch(err => err);	
			
		    });             
            
            om.on('connectionDied', function() {
                
                message.channel.send('`There has been a server error!`').catch(err => err);
                
            });
            
		om.connect(standard);		
		
	} else if (message.member.roles.find(x => x.name === USER)) {    
        
			om.on('gotID', function(id) {
                
				console.log('Connected to server as: ' + id);
                
				setTimeout(function() {
                    
					if(!om.connected()) {
                        
						om.stopLookingForCommonLikes(); // or you could call om.slfcl()
						message.channel.send('*Could not find anyone with common likes, connecting to a random stranger instead...*').catch(err => err);
					}
                    
				}, 7500);
                
			});

			om.on('waiting', function() {
                
				message.channel.send('*Waiting for a stranger to connect...*').catch(err => err);
                
			});

			om.on('connected', function() {
                
				message.channel.send('`You have connected to a stranger!`').catch(err => err);
                
			});

			om.on('commonLikes', function(likes) {
                
				message.channel.send('`Common likes:`  ' + likes).catch(err => err);
                
			});
			
			om.on('typing', function() {
                
				message.channel.send('*Stranger is typing...*').catch(err => err);
                message.delete(250);
                
			});

			om.on('stoppedTyping', function() {
                
				console.log('Stranger stopped typing!');
				
			});

			om.on('gotMessage', function(msg) {
				
				message.channel.send('`Stranger has messaged:`  ' + msg).catch(err => err);

			});

			om.on('strangerDisconnected', function() {
                
				message.channel.send('*Stranger has disconnected...*').catch(err => err);
								
				om.connect(standard);
				
			});

            om.on('disconnected', function() {

				console.log('Connect to a new server.');
                message.channel.send('`You have been disconnected!`').catch(err => err);	
			
		    });            

            om.on('connectionDied', function() {
                
                message.channel.send('`There has been a server error!`').catch(err => err);
                
            });
        
		om.connect(standard);		
		
	} else
			
		message.author.send(
		  `You have insufficient permissions to use this command.`
		);					

	}	
		
	if (message.content.startsWith(command_prefix + "msg ")) {
		
		if (message.member.roles.find(x => x.name === STAFF || USER)) {
		
			var msg = message.content.substr(`${command_prefix}msg `.length);
            
            message.delete(1);

            om.startTyping();
            
			setTimeout(function() {

				om.send(`${msg}`);
				om.stopTyping();
			
			}, 3210);

			message.channel.send('`You messaged:`  ' + msg).catch(err => err); 
	
		}
		
		else
			
            message.author.send(
              `You have insufficient permissions to use this command.`
            );					

	}
	
	if (message.content === command_prefix + "disconnect") {

		if (message.member.roles.find(x => x.name === STAFF || USER)) {	
            
            om.disconnect();	   
		
        } else
			
            message.author.send(
              `You have insufficient permissions to use this command.`
            );					

	}	

	if (message.content === command_prefix + "reconnect") {

		if (message.member.roles.find(x => x.name === STAFF)) {
            
            om.connect(standard);	   
		
        } else
			
		message.author.send(
		  `You have insufficient permissions to use this command.`
		);					

	}    
    
});

bot.login(token); // Your bot token.