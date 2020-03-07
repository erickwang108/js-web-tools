# Javascript web tools

Helper utils for web developters.

# Install
```bash
$ npm install js-web-tools
$ yarn add js-web-tools
```
# 1. isValidPath / isInvalidPath

#### Test path is valid or invalid. 
```
  import { isValidPath, isInvalidPath } from 'js-web-tools/lib/isValidPath';
  isValidPath(path);
  isInvalidPath(path);
```

valid paths: `/usr/local` or `/folder/files`.

invalid paths: 
 
```
    .
    <abc
    :abc
    |abc
    ?abc
    *abc
    a\\bc
    !fool
    +abc
    ^abc
    [abc]
    @abc
    {ab}bc
    (a)
    ...
```

# 2. DOM
#### 2.1 css(node, propertyName)
```
  import css from 'js-web-tools/lib/domElementStyle';
```
Get the value of a computed style property for the first element in the set of matched elements or set one or more CSS properties for every matched element.

* `node`: DOM node
* `propertyName`: A string containing a CSS property.

#### 2.2 element
```
  import {
    closest,
    contains,
    getActiveElement,
    querySelectorAll,
  } from 'js-web-tools/lib/domElement';
```
##### closest(node, selector)
* `node`: DOM element
* `selector`: A string containing a selector expression to match elements against.

##### contains(context, node)
Check to see if a DOM element is a descendant of another DOM element.

* `context`: The DOM element that may contain the other element.
* `node`: The DOM element that may be contained by (a descendant of) the other element.

##### getActiveElement(node)
Get focused element safely, use document if `node` is not set. 

##### querySelectorAll(selector)
Select all elements that match selector, like h1, h2, h3 and so on.

#### 2.3 elementClass
```
  import {
    hasClass,
    addClass,
    removeClass,
    toggleClass,
  } from 'js-web-tools/lib/dom/elementClass';
```
##### hasClass(node, className)
Determine whether any of the matched elements are assigned the given class.

* `node`: DOM element
* `className`: The class name to search for.

##### addClass(node, className)
Remove a single class, multiple classes, or all classes from each element in the set of matched elements.

* `node`: DOM element
* `className`: One or more space-separated classes to be added to the class attribute of each matched element.

##### removeClass(node, className)
Remove a single class, multiple classes, or all classes from each element in the set of matched elements.

* `node`: DOM element
* `className`: One or more space-separated classes to be removed from the class attribute of each matched element.

##### toggleClass(node, className)
Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the state argument.

* `node`: DOM element
* `className`: One or more class names (separated by spaces) to be toggled for each element in the matched set.

#### 2.4 event
```
  import Events from 'js-web-tools/lib/domEvent';
```
##### Events.on(el, eventType, callback)
Register a callback.

* `el`: the element to bind event to.
* `eventType`: event type, can with namesapce.
* `callback`: callback to invoke.

##### Events.off(el, eventType, callback)
Unregister a callback.

* `el`: the element to bind event to.
* `eventType`: event type, can with namesapce.
* `callback`: callback to invoke.

##### Events.once(el, eventType, callback)
Register a callback that will execute exactly once.

* `el`: the element to bind event to.
* `eventType`: event type, can with namesapce.
* `callback`: callback to invoke.

##### Events.delegate(el, selector, eventType, callback)
Delegate a callback to selector under el.

* `el`: the element to bind event to.
* `selector`: A string containing a selector expression.
* `eventType`: event type, can with namesapce.
* `callback`: callback to invoke.

##### Events.undelegate(el, selector, eventType, callback)
Undelegate a callback to selector under el.

* `el`: the element to bind event to.
* `selector`: A string containing a selector expression.
* `eventType`: event type, can with namesapce.
* `callback`: callback to invoke.

##### Events.trigger(el, eventType, callback)
Dispatch an event with props to el.

* `el`: the element to bind event to.
* `eventType`: event type, can with namesapce.
* `callback`: callback to invoke.

#### 2.5 position
```
  import {
    scrollLeft,
    scrollTop,
    offsetParent,
    getOffset,
    scrollPrarent,
    position,
  } from 'js-web-tools/lib/domElementPosition';
```
##### scrollLeft(el)
Get the current horizontal position of the scroll bar for the element.

* `el`: DOM element.

##### scrollTop(el)
Get the current vertical position of the scroll bar for the element.

* `el`: DOM element.

##### offsetParent(el)
Get the closest ancestor element that is positioned.

* `el`: DOM element.

##### getOffset(el)
Get the current coordinates of the first element in the set of matched elements, relative to the document.

* `el`: DOM element.

##### scrollPrarent(el, firstPossible)
Find the first scrollable parent of an element.

* `el`: Starting element.
* `firstPossible `: Stop at the first scrollable parent, even if it's not currently scrollable.

##### position(el)
Get the current coordinates of the first element in the set of matched elements, relative to the document.
> The position() method allows us to retrieve the current position of an element (specifically its margin box) relative to the offset parent (specifically its padding box, which excludes margins and borders). Contrast this with offset(), which retrieves the current position relative to the document. When positioning a new element near another one and within the same containing DOM element, position() is the more useful.

* `el`: DOM element.

# 3. JWT
An [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) wrapper to easy usage.

```
  import JWT from 'js-web-tools/lib/jwt';
  const jwt = new JWT();
  ...
```
#### Constructor an instance: `JWT(config, options)`

`config`:

* `authSchema` (default: `Bearer`)
* `privateKey` (default: `37LvDSm4XvjYOh9Y`) :
`privateKey ` is a string, buffer, or object containing either the secret for HMAC algorithms or the PEM
encoded private key for RSA and ECDSA. In case of a private key with passphrase an object `{ key, passphrase }` can be used (based on [crypto documentation](https://nodejs.org/api/crypto.html#crypto_sign_sign_private_key_output_format)), in this case be sure you pass the `algorithm` option.
* `algorithm`  (default: `aes-256-ctr`)

`options`:

* `algorithm` (default: `HS256`)
* `expiresIn`: expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms). 
  > Eg: `60`, `"2 days"`, `"10h"`, `"7d"`. A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default (`"120"` is equal to `"120ms"`).
* `notBefore`: expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms). 
  > Eg: `60`, `"2 days"`, `"10h"`, `"7d"`. A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default (`"120"` is equal to `"120ms"`).
* `mutatePayload`: if true, the sign function will modify the payload object directly. This is useful if you need a raw reference to the payload after claims have been applied to it but before it has been encoded into a token.

#### jwt.sign(payload)
`payload` could be an object literal, buffer or string representing valid JSON. 
> **Please _note_ that** `exp` or any other claim is only set if the payload is an object literal. Buffer or string payloads are not checked for JSON validity.

> If `payload` is not a buffer or a string, it will be coerced into a string using `JSON.stringify`.
> 

#### jwt.verify(token) / jwt.isExpire(token)

(Asynchronous) If a callback is supplied, function acts asynchronously. The callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will be called with the error.

(Synchronous) If a callback is not supplied, function acts synchronously. Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.

> __Warning:__ When the token comes from an untrusted source (e.g. user input or external requests), the returned decoded payload should be treated like any other user input; please make sure to sanitize and only work with properties that are expected

* `token` is the JsonWebToken string 

#### jwt.get(token) / jwt.get(key, token)

Verify first and if token is valid, then get object or value with specify key.

# 4. balancer
An util to balance number list.

```
  import balancer from 'js-web-tools/lib/balancer';
  
  const result = balancer([10, 30, 20, 30]);
  expect(result).toMatchObject([11.11, 33.34, 22.22, 33.33]);
  ...
```
#### Usage 
`balancer(list, goal, places)`

* `list`: number array list
* `goal`: target goal you want. (default: 100)
* `places`: number fixed. (default: 2)

# TODO

* react-components

## Author

[Erick Wang](https://github.com/erickwang108)

## License

This project is licensed under the MIT license.
