Chrome_Extension
================
It can recognize line, L, triangle and rectangular. I created canvas on websites html and sampled the users mouse movement for recognition. I use simple algorithm to recognize different shapes and it performs really well. I was considering using the SVM or other method from CV to improve the program. However, the limitation of library we have and performance we need, I gave up this idea. 

After you press the middle button of your mouse and make movement and then mouse up, in user mode, the short key will be immediately activated and you will see the results of your gesture recognition. While in debug mode, the short key will be activated after we click "find word" in pop up window, it will return the result of the recognized pattern in popup window and we could find if its recognized results is good. This is better for me to debug and I am still considering adding new features to this extension.

The gesture’s meaning is listed as followed:
Line: refresh the website
L: Go back
Triangle: Go forward
Rectangular: Have not defined yet

Also, some part of code is about find the number of specific strings in the webpage, if you enter something in the first blank of the popup window and click find word, it will return how many times the word appear in the webpage.

Thanks ^_^
