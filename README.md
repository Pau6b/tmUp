# tmUp

_This is a multiplatform aplication to manage your sports team._


# Front end best practices

## HTML

### Style
_Style of HTML in SCSS stylsheet like this_
```
div{
  padding: 0;
}
```

_and_ **NOT** _like this:_
```
<div style="padding:0"></div>
```

### Code organitzation
_Tags should be close correctly like this:_
```
<div></div>
```

_And_ **NOT** _like this:_
```
<div/>
```

_Any Tag inside another Tag will go in a new line with tabulation (line break + tabulation). Follow the_ **TREE** _structure._
```
<div>
  <p>
    Texto del parrafo
  </p>
</div>
```

### Comments

**Comments should be** _writte in a single line if its possible. If comments are longs can be written in differents lines_.
```
<!-- Linea del comentario corto -->

<!-- 
  Linea del comentario largo 1
  Linea del comentario largo 2
-->
```

### Syntax
_Name of tags and attribute in lower case_
```
<div id="texto"></div>
```

**NOT** _like this:_
```
<Div ID="texto"></Div>
```

_Signifiactive name of elements and name of type at the final of the name_
```
<button name="registroButton">Registrarse</button>
```

**ALWAYS** _use " to the values of the differents attributes instead of '_
```
<button value="reset">Reset</button> 
```

**NEVER** _use_ **space** _between '=' and the value of the attributes_
```
<p id="parrafoLargo">Parrafo largo que tiene mucho texto</p>
```

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

## CRUDS
_Each crud has to be in a separate file, referenced in index or other cruds_

## DB Fields
_**ALL** fields must be written in lowerCamelCase_
_like:_
```
statistics {
  team{
    football{
      wonMatches : 0,
      lostMatches : 0
    }
  }
}
```

_not in UpperCamelCase or snake_case like:_
```
statistics {
  team{
    Football{
      won_matches : 0,
      LostMatches : 0
    }
  }
}
```
