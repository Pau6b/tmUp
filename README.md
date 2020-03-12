# tmUp

_This is a multiplatform aplication to manage your sports team._


# Front end best practices

## SCSS

### <u> Document Organization </u>

_Document should have the following structure:_

* generic
* header
* main content
* footer

_Each section should be started by a comment with **30 dashes** on top and bottom of the centered section name:_

```
/* ------------------------------
               HEADER 
   ------------------------------ */
```  

_**Comments should be short** and shouldn't be longer than a line_

### <u> Element Style Definition </u>

_The opening bracket should be in the **same line** as the element:_

```
h1 {

}
```

_Properties of an element should be **ordered alphabetically**_  

_The style of an element shouldn't have any blank lines_  

_There should be a **space** between the property's double dots and the value:_

```
  color: black;
```

_not like this:_

```
  color:black;
  color : black;
```  

_Use **general properties** to keep the code simple:_

```
  margin: 20em 10em 5em 10em;
```

_instead of specific ones:_

```
  margin-top: 20em;
  margin-right: 10em;
  margin-bottom: 5em;
  margin-left: 10em;
```  

_**ALWAYS** define margin and padding (even if it's 0) to prevent difference between devices_

### <u> Measure Units </u>

* _Use **percentages (%)** for containers_
* _Use **em** for letters and distances_

# Back end best practices

## Variables
_Variables have to be written in lowerCamelCase:_
```
var thisIsAVariable = 4;
```

_Not like this:_
```
var ThisIsAVariable = 4;
var thisisavariable = 4;
var this_is_a_variable = 4;
```

## Functions

_Functions should be written in UpperCamelCase:_
```
ThisIsAFunction() {
/* code */
}
```

_Function parameters should start with_ **i_** _if they are_ **input parameters**, **o_** _if they are_ **output parameters** _or_ **io_** _if they are_ **both input and output parameters** _and the type has to_ **ALWAYS** _be specified_

```


ThisIsAFunction(i_input: String, o_output: String, io_inOut: String) {
/* code */
}
```

## Classes
_Classes should be written in UpperCamelCase_
```
class ClassName {

}
```

_Class member variables have to start with a_ **m_** _and its type has to_ **ALWAYS** _be specified_
```
class ClassName {
  var m_classMember : String;
  var m_classMember2: Photo;
}
```
