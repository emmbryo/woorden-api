# Testing of the module

## Test Cases 1
### 1.1
Initiating an object of the class Word with an empty string should result in a RangeError: Input must be between 1 and 35 characters long.

### 1.2
Initiating an object of the class Word with a string of more than 35 characters should result in a RangeError: Input must between 1 and 35 characters long.

### 1.3
Initiating an object of the class Word with no input should result in a Error: Input must be a String.

### 1.4 
Initiating an object of the class Word with integer input should result in a Error: Input must be a String.

### 1.5 
Initiating an object of the class Word with the input 'belangrijk' should be silent. 

## Test Cases 2

### 2.1
Here, use the word *belangrijk* (eng. *important*). Search for the word at woorden.org to obtain the following info:
![belangrijk](/img/belangrijk_woorden.png)
Compare the info presented on woorden.org with what the methods in the word class returns.

#### 2.1.1
Calling the method <span style="color:#FFFF99">getWordInfo()</span>
Should give the following result:
![belangrijk](/img/belangrijk_objekt.png)

#### 2.1.2
Calling the method <span style="color:#FFFF99">getSynonyms()</span>
Should give the following result:
![belangrijk](/img/belangrijk_syn.png)

#### 2.1.3
Calling the method <span style="color:#FFFF99">getAntonyms()</span>
Should give the following result:
![belangrijk](/img/belangrijk_ant.png)