# <a href="https://github.com/rhildred/ES6OrderBot" target="_blank">ES6 Order Bot</a>

I got the user interface for the web from a student of mine, Pat Wilken.

To run:

1. The first time run `npm install`
2. Press ctrl-f5 while your focus is in one of the files that starts with a number and is all lower case.
3. run `npm start` 
4. go to browser and write "Localhost:(port name)"
5. If you want to run through nodemon just type `nodemon run-script dev` instead of `npm start` 

## Assignment 1 Steps (Welcome To Raahi Restaurant)

1. First of all on initial stage write "Hello or a greeting" in a chat and press enter
2. It will provide you with menu. choose one of the item from the menu by replying with a number provided on side like 
(1 or 2 or 3 or 4). if you input other than that it will show you the message that please select valid input.
3. then it will ask you about the size of that specific item that you have choosen. reply with (Small or Medium or Large) other than    that will show you an error message.
4. then it will ask you about toppings that you want to include in your item. give input with a string. if multiple items divide names with space and if it is a two word item use "-" (Hyphen) for that.
5. After that it will ask you if you want to include a up-sell item "Muffin". I you say yes it will say a muffin in your order and if you say no it will not add.
6. Next question for you will be if you want to add drinks or not? if yes what drink would you want to add? reply with yes and then name.
7. after that it will ask you if you want to add another item to the order or not? if yes it will make sure again by asking you "are you sure?"
8. if yes it will show the menu again and if no it will show you the overall order Summary and order total. It will also include pickup time with the order at last.