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
   : func # booleanAtomFunc_
   | TRUE # true
   | FALSE # false
   | equation # booleanAtomEquation_
   | LPAREN booleanExpr RPAREN # booleanExprParens
   ;

expr
  : expr POW expr # powExpr
	| expr op=(MUL|DIV) expr # multiplyingExpr
	| expr op=(PLUS|MINUS) expr # additionExpr
	| signedAtom # exprSignedAtom_
  ;

signedAtom
   : MINUS signedAtom # unary
   | func # signedAtomFunc_
   | atom # signedAtomAtom_
   ;

func
  : ID LPAREN expr (COMMA expr)* RPAREN
  ;

atom
  : REWRITABLE_PREFIX ID # rewritable
	| NUMBER # number
	| ID # id
  | LPAREN expr RPAREN # exprParens
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
