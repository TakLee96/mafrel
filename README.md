# MaFrel

## What is MaFrel?
MaFrel stands for MAthematical Formula REpresentation Language. It is designed to make the task of writing complicated mathematical formula much simplier and more comprehensible. Try it out! http://mafrel.herokuapp.com

## Quick Language Guide
### Limit
```
lim( f(x), x, l )
  f(x) -> a function of x (e.g. x^2+2*x+1)
  x -> the variable that approaches the limit
  l -> the limit we are approaching
```
### Sum
```
sum( f(x), x, a, b )
  f(x) -> a function of x
  x -> the variable that is changed
  a -> lower bound of sum
  b -> upper bound of sum
```
### Product
```
product( f(x), x, a, b )
  f(x) -> a function of x
  x -> the variable that is changed
  a -> lower bound of product
  b -> upper bound of product
```
### Integral
```
integral( f(x), x, a, b )
  f(x) -> a function of x
  x -> the variable in which we are interested
  a -> lower bound of integration
  b -> upper bound of integration
```
### Choose
```
choose( n, k )
  n -> from n elements
  k -> choose k elements
```
### Divide
```
divide( n, d )
  n -> numerator
  d -> denominator
```
### Chaining Commands
```
  lim( sum(x^2, x, 1, k), k, infinity )
```
