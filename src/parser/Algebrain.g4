grammar Algebrain;


stat
  : command
  | transformation
  | rewriting
  | booleanExpr
  | expr
	;

command
  : COMMAND (COLON ID (COMMA ID)*)?
  ;

transformation
  : ID EQUALS LSQPAREN rewriting (COMMA rewriting)* RSQPAREN
  ;

rewriting
  : expr EQUALS expr (SPACE IF SPACE booleanExpr )?
  ;


booleanExpr
  : booleanAtom (SPACE op=(AND | OR) SPACE booleanAtom)*
	;

equation
  : expr EQUALS EQUALS expr
  ;

booleanAtom
   : func # Operator
   | TRUE # True
   | FALSE # False
   | equation # BooleanAtomEquation
   | LPAREN booleanExpr RPAREN # BooleanExprParens
   ;

expr
  : expr POW expr # powExpr
	| expr op=(MUL|DIV) expr # multiplyingExpr
	| expr op=(PLUS|MINUS) expr # additionExpr
	| signedAtom # atomExpr
  ;

signedAtom
   : MINUS signedAtom
   | func
   | atom
   ;

func
  : ID LPAREN expr (COMMA expr)* RPAREN
  ;

atom
  : REWRITABLE_PREFIX ID # Rewritable
	| NUMBER # Number
	| ID # Id
  | LPAREN expr RPAREN # ExprParens
  ;


REWRITABLE_PREFIX: '$';
SPACE: ' ';

COMMAND
  : 'transform'
  | 'evaluate'
  | 'rules'
  ;
TRUE: 'true';
FALSE: 'false';

IF: 'if';
AND: 'and';
OR: 'or';

ID  : [a-zA-Z_]+ ;
POINT: '.';
COLON: ':';
NOT: 'not';
NUMBER: [0-9]+ (POINT [0-9]+)? ;
POW : '^' ;
MUL : '*' ;
DIV : '/' ;
PLUS : '+' ;
MINUS : '-' ;
LPAREN: '(';
RPAREN: ')';
LSQPAREN: '[';
RSQPAREN: ']';
COMMA: ',';
EQUALS: '=';

NEWLINE:'\r'? '\n' ;
WS : [ \t]+ -> skip ;
