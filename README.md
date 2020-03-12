# tmUp

_This is a multiplatform aplication to manage your sports team._


# Front end best practices


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
