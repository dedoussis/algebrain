grammar Algebrain;


prog: stat+ ;


stat
  : expr NEWLINE # printExpr
	| NEWLINE # blank
	;


expr
  : expr POW expr # Pow
	| expr op=(MUL|DIV) expr # MulDiv
	| expr op=(PLUS|MINUS) expr # AddSub
  | expr EQUALS expr ( IF bexp )? # RewritingRule
	| LPARENS expr RPARENS # Parens
	| MINUS val=(ID|NUMBER|REWRITABLE) # Unary
	| ID LPARENS expr (COMMA expr)* RPARENS # Operator
	| REWRITABLE # Rewritable
	| NUMBER # Number
	| ID # Id
	;


bexp
  : bexp op=(AND|OR|NOT) bexp # Logical
	| ID LPARENS expr (COMMA expr)* RPARENS # BooleanOperator
	| NOT LPARENS bexp RPARENS # Negation
	| expr EQUALS EQUALS expr # Equality
	| (TRUE|FALSE) # Flag
	;


ID  : [a-zA-Z_]+ ; // match identifiers
NUMBER: [0-9]+ (POINT [0-9]+)? ; // match numbers

REWRITABLE: DOLLAR ID;
POW : '^' ;
MUL : '*' ;
DIV : '/' ;
PLUS : '+' ;
MINUS : '-' ;
DOLLAR: '$';
LPARENS: '(';
RPARENS: ')';
COMMA: ',';
EQUALS: '=';
TRUE: 'True';
FALSE: 'False';
SPACE: ' ';
IF: ' if ';
AND: 'and';
NOT: 'not';
OR: 'or';
POINT: '.';


NEWLINE:'\r'? '\n' ; // return newlines to parser (is end-statement signal)
WS : [ \t]+ -> skip ;
