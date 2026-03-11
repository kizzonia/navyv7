/*!
 * jQuery JavaScript Library v2.2.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:23Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var arr = [];

var document = window.document;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "2.2.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isPlainObject: function( obj ) {
		var key;

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Not own constructor property must be Object
		if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {

			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf( "use strict" ) === 1 ) {
				script = document.createElement( "script" );
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {

				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval

				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {

						// Inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE9-10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	register: function( owner, initial ) {
		var value = initial || {};

		// If it is a node unlikely to be stringify-ed or looped over
		// use plain assignment
		if ( owner.nodeType ) {
			owner[ this.expando ] = value;

		// Otherwise secure it in a non-enumerable, non-writable property
		// configurability must be true to allow the property to be
		// deleted with the delete operator
		} else {
			Object.defineProperty( owner, this.expando, {
				value: value,
				writable: true,
				configurable: true
			} );
		}
		return owner[ this.expando ];
	},
	cache: function( owner ) {

		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return an empty object.
		if ( !acceptData( owner ) ) {
			return {};
		}

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ prop ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :
			owner[ this.expando ] && owner[ this.expando ][ key ];
	},
	access: function( owner, key, value ) {
		var stored;

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase( key ) );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key === undefined ) {
			this.register( owner );

		} else {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );

				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;

			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <= 35-45+
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://code.google.com/p/chromium/issues/detail?id=378607
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data, camelKey;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// with the key as-is
				data = dataUser.get( elem, key ) ||

					// Try to find dashed key if it exists (gh-2779)
					// This is for 2.2.x only
					dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

				if ( data !== undefined ) {
					return data;
				}

				camelKey = jQuery.camelCase( key );

				// Attempt to get data from the cache
				// with the key camelized
				data = dataUser.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			camelKey = jQuery.camelCase( key );
			this.each( function() {

				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = dataUser.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				dataUser.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
					dataUser.set( this, key, value );
				}
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE9
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE9-11+
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android<4.1, PhantomJS<2
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0-4.3, Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
			"screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {
	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <= 35-45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {
		div.style.cssText =

			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );
	}

	jQuery.extend( support, {
		pixelPosition: function() {

			// This test is executed only once but we still do memoizing
			// since we can use the boxSizingReliable pre-computing.
			// No need to check if the test was already performed, though.
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
			// since that compresses better and they're computed together anyway.
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		},
		reliableMarginRight: function() {

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// This support function is only executed once so no memoizing is needed.
			var ret,
				marginDiv = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			marginDiv.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;margin:0;border:0;padding:0";
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			documentElement.appendChild( container );

			ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

			documentElement.removeChild( container );
			div.removeChild( marginDiv );

			return ret;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );
	ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

	// Support: Opera 12.1x only
	// Fall back to style even without computed
	// computed is undefined for elems on document fragments
	if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
		ret = jQuery.style( elem, name );
	}

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// http://dev.w3.org/csswg/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE9-11+
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = dataPriv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = dataPriv.access(
					elem,
					"olddisplay",
					defaultDisplay( elem.nodeName )
				);
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				dataPriv.set(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = dataPriv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;

			dataPriv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
		opt.duration : opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// Handle most common string cases
					ret.replace( rreturn, "" ) :

					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE8-11+
			// IE throws exception if url is malformed, e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE8-11+
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


jQuery.expr.filters.hidden = function( elem ) {
	return !jQuery.expr.filters.visible( elem );
};
jQuery.expr.filters.visible = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	// Use OR instead of AND as the element is not visible if either is true
	// See tickets #10406 and #13132
	return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE9
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE9
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		box = elem.getBoundingClientRect();
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},
	size: function() {
		return this.length;
	}
} );

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("jquery")):"function"==typeof define&&define.amd?define(["exports","jquery"],e):e((t=t||self).bootstrap={},t.jQuery)}(this,function(t,p){"use strict";function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function s(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}function l(o){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},e=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.forEach(function(t){var e,n,i;e=o,i=r[n=t],n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i})}return o}p=p&&p.hasOwnProperty("default")?p.default:p;var e="transitionend";function n(t){var e=this,n=!1;return p(this).one(m.TRANSITION_END,function(){n=!0}),setTimeout(function(){n||m.triggerTransitionEnd(e)},t),this}var m={TRANSITION_END:"bsTransitionEnd",getUID:function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},getSelectorFromElement:function(t){var e=t.getAttribute("data-target");if(!e||"#"===e){var n=t.getAttribute("href");e=n&&"#"!==n?n.trim():""}try{return document.querySelector(e)?e:null}catch(t){return null}},getTransitionDurationFromElement:function(t){if(!t)return 0;var e=p(t).css("transition-duration"),n=p(t).css("transition-delay"),i=parseFloat(e),o=parseFloat(n);return i||o?(e=e.split(",")[0],n=n.split(",")[0],1e3*(parseFloat(e)+parseFloat(n))):0},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(t){p(t).trigger(e)},supportsTransitionEnd:function(){return Boolean(e)},isElement:function(t){return(t[0]||t).nodeType},typeCheckConfig:function(t,e,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var o=n[i],r=e[i],s=r&&m.isElement(r)?"element":(a=r,{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());if(!new RegExp(o).test(s))throw new Error(t.toUpperCase()+': Option "'+i+'" provided type "'+s+'" but expected type "'+o+'".')}var a},findShadowRoot:function(t){if(!document.documentElement.attachShadow)return null;if("function"!=typeof t.getRootNode)return t instanceof ShadowRoot?t:t.parentNode?m.findShadowRoot(t.parentNode):null;var e=t.getRootNode();return e instanceof ShadowRoot?e:null}};p.fn.emulateTransitionEnd=n,p.event.special[m.TRANSITION_END]={bindType:e,delegateType:e,handle:function(t){if(p(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}};var o="alert",r="bs.alert",a="."+r,c=p.fn[o],h={CLOSE:"close"+a,CLOSED:"closed"+a,CLICK_DATA_API:"click"+a+".data-api"},u="alert",f="fade",d="show",g=function(){function i(t){this._element=t}var t=i.prototype;return t.close=function(t){var e=this._element;t&&(e=this._getRootElement(t)),this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},t.dispose=function(){p.removeData(this._element,r),this._element=null},t._getRootElement=function(t){var e=m.getSelectorFromElement(t),n=!1;return e&&(n=document.querySelector(e)),n||(n=p(t).closest("."+u)[0]),n},t._triggerCloseEvent=function(t){var e=p.Event(h.CLOSE);return p(t).trigger(e),e},t._removeElement=function(e){var n=this;if(p(e).removeClass(d),p(e).hasClass(f)){var t=m.getTransitionDurationFromElement(e);p(e).one(m.TRANSITION_END,function(t){return n._destroyElement(e,t)}).emulateTransitionEnd(t)}else this._destroyElement(e)},t._destroyElement=function(t){p(t).detach().trigger(h.CLOSED).remove()},i._jQueryInterface=function(n){return this.each(function(){var t=p(this),e=t.data(r);e||(e=new i(this),t.data(r,e)),"close"===n&&e[n](this)})},i._handleDismiss=function(e){return function(t){t&&t.preventDefault(),e.close(this)}},s(i,null,[{key:"VERSION",get:function(){return"4.3.1"}}]),i}();p(document).on(h.CLICK_DATA_API,'[data-dismiss="alert"]',g._handleDismiss(new g)),p.fn[o]=g._jQueryInterface,p.fn[o].Constructor=g,p.fn[o].noConflict=function(){return p.fn[o]=c,g._jQueryInterface};var _="button",v="bs.button",y="."+v,E=".data-api",b=p.fn[_],w="active",C="btn",T="focus",S='[data-toggle^="button"]',D='[data-toggle="buttons"]',I='input:not([type="hidden"])',A=".active",O=".btn",N={CLICK_DATA_API:"click"+y+E,FOCUS_BLUR_DATA_API:"focus"+y+E+" blur"+y+E},k=function(){function n(t){this._element=t}var t=n.prototype;return t.toggle=function(){var t=!0,e=!0,n=p(this._element).closest(D)[0];if(n){var i=this._element.querySelector(I);if(i){if("radio"===i.type)if(i.checked&&this._element.classList.contains(w))t=!1;else{var o=n.querySelector(A);o&&p(o).removeClass(w)}if(t){if(i.hasAttribute("disabled")||n.hasAttribute("disabled")||i.classList.contains("disabled")||n.classList.contains("disabled"))return;i.checked=!this._element.classList.contains(w),p(i).trigger("change")}i.focus(),e=!1}}e&&this._element.setAttribute("aria-pressed",!this._element.classList.contains(w)),t&&p(this._element).toggleClass(w)},t.dispose=function(){p.removeData(this._element,v),this._element=null},n._jQueryInterface=function(e){return this.each(function(){var t=p(this).data(v);t||(t=new n(this),p(this).data(v,t)),"toggle"===e&&t[e]()})},s(n,null,[{key:"VERSION",get:function(){return"4.3.1"}}]),n}();p(document).on(N.CLICK_DATA_API,S,function(t){t.preventDefault();var e=t.target;p(e).hasClass(C)||(e=p(e).closest(O)),k._jQueryInterface.call(p(e),"toggle")}).on(N.FOCUS_BLUR_DATA_API,S,function(t){var e=p(t.target).closest(O)[0];p(e).toggleClass(T,/^focus(in)?$/.test(t.type))}),p.fn[_]=k._jQueryInterface,p.fn[_].Constructor=k,p.fn[_].noConflict=function(){return p.fn[_]=b,k._jQueryInterface};var L="carousel",x="bs.carousel",P="."+x,H=".data-api",j=p.fn[L],R={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},F={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},M="next",W="prev",U="left",B="right",q={SLIDE:"slide"+P,SLID:"slid"+P,KEYDOWN:"keydown"+P,MOUSEENTER:"mouseenter"+P,MOUSELEAVE:"mouseleave"+P,TOUCHSTART:"touchstart"+P,TOUCHMOVE:"touchmove"+P,TOUCHEND:"touchend"+P,POINTERDOWN:"pointerdown"+P,POINTERUP:"pointerup"+P,DRAG_START:"dragstart"+P,LOAD_DATA_API:"load"+P+H,CLICK_DATA_API:"click"+P+H},K="carousel",Q="active",V="slide",Y="carousel-item-right",z="carousel-item-left",X="carousel-item-next",G="carousel-item-prev",$="pointer-event",J=".active",Z=".active.carousel-item",tt=".carousel-item",et=".carousel-item img",nt=".carousel-item-next, .carousel-item-prev",it=".carousel-indicators",ot="[data-slide], [data-slide-to]",rt='[data-ride="carousel"]',st={TOUCH:"touch",PEN:"pen"},at=function(){function r(t,e){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(e),this._element=t,this._indicatorsElement=this._element.querySelector(it),this._touchSupported="ontouchstart"in document.documentElement||0<navigator.maxTouchPoints,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var t=r.prototype;return t.next=function(){this._isSliding||this._slide(M)},t.nextWhenVisible=function(){!document.hidden&&p(this._element).is(":visible")&&"hidden"!==p(this._element).css("visibility")&&this.next()},t.prev=function(){this._isSliding||this._slide(W)},t.pause=function(t){t||(this._isPaused=!0),this._element.querySelector(nt)&&(m.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},t.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},t.to=function(t){var e=this;this._activeElement=this._element.querySelector(Z);var n=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)p(this._element).one(q.SLID,function(){return e.to(t)});else{if(n===t)return this.pause(),void this.cycle();var i=n<t?M:W;this._slide(i,this._items[t])}},t.dispose=function(){p(this._element).off(P),p.removeData(this._element,x),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},t._getConfig=function(t){return t=l({},R,t),m.typeCheckConfig(L,t,F),t},t._handleSwipe=function(){var t=Math.abs(this.touchDeltaX);if(!(t<=40)){var e=t/this.touchDeltaX;0<e&&this.prev(),e<0&&this.next()}},t._addEventListeners=function(){var e=this;this._config.keyboard&&p(this._element).on(q.KEYDOWN,function(t){return e._keydown(t)}),"hover"===this._config.pause&&p(this._element).on(q.MOUSEENTER,function(t){return e.pause(t)}).on(q.MOUSELEAVE,function(t){return e.cycle(t)}),this._config.touch&&this._addTouchEventListeners()},t._addTouchEventListeners=function(){var n=this;if(this._touchSupported){var e=function(t){n._pointerEvent&&st[t.originalEvent.pointerType.toUpperCase()]?n.touchStartX=t.originalEvent.clientX:n._pointerEvent||(n.touchStartX=t.originalEvent.touches[0].clientX)},i=function(t){n._pointerEvent&&st[t.originalEvent.pointerType.toUpperCase()]&&(n.touchDeltaX=t.originalEvent.clientX-n.touchStartX),n._handleSwipe(),"hover"===n._config.pause&&(n.pause(),n.touchTimeout&&clearTimeout(n.touchTimeout),n.touchTimeout=setTimeout(function(t){return n.cycle(t)},500+n._config.interval))};p(this._element.querySelectorAll(et)).on(q.DRAG_START,function(t){return t.preventDefault()}),this._pointerEvent?(p(this._element).on(q.POINTERDOWN,function(t){return e(t)}),p(this._element).on(q.POINTERUP,function(t){return i(t)}),this._element.classList.add($)):(p(this._element).on(q.TOUCHSTART,function(t){return e(t)}),p(this._element).on(q.TOUCHMOVE,function(t){var e;(e=t).originalEvent.touches&&1<e.originalEvent.touches.length?n.touchDeltaX=0:n.touchDeltaX=e.originalEvent.touches[0].clientX-n.touchStartX}),p(this._element).on(q.TOUCHEND,function(t){return i(t)}))}},t._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next()}},t._getItemIndex=function(t){return this._items=t&&t.parentNode?[].slice.call(t.parentNode.querySelectorAll(tt)):[],this._items.indexOf(t)},t._getItemByDirection=function(t,e){var n=t===M,i=t===W,o=this._getItemIndex(e),r=this._items.length-1;if((i&&0===o||n&&o===r)&&!this._config.wrap)return e;var s=(o+(t===W?-1:1))%this._items.length;return-1===s?this._items[this._items.length-1]:this._items[s]},t._triggerSlideEvent=function(t,e){var n=this._getItemIndex(t),i=this._getItemIndex(this._element.querySelector(Z)),o=p.Event(q.SLIDE,{relatedTarget:t,direction:e,from:i,to:n});return p(this._element).trigger(o),o},t._setActiveIndicatorElement=function(t){if(this._indicatorsElement){var e=[].slice.call(this._indicatorsElement.querySelectorAll(J));p(e).removeClass(Q);var n=this._indicatorsElement.children[this._getItemIndex(t)];n&&p(n).addClass(Q)}},t._slide=function(t,e){var n,i,o,r=this,s=this._element.querySelector(Z),a=this._getItemIndex(s),l=e||s&&this._getItemByDirection(t,s),c=this._getItemIndex(l),h=Boolean(this._interval);if(o=t===M?(n=z,i=X,U):(n=Y,i=G,B),l&&p(l).hasClass(Q))this._isSliding=!1;else if(!this._triggerSlideEvent(l,o).isDefaultPrevented()&&s&&l){this._isSliding=!0,h&&this.pause(),this._setActiveIndicatorElement(l);var u=p.Event(q.SLID,{relatedTarget:l,direction:o,from:a,to:c});if(p(this._element).hasClass(V)){p(l).addClass(i),m.reflow(l),p(s).addClass(n),p(l).addClass(n);var f=parseInt(l.getAttribute("data-interval"),10);this._config.interval=f?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,f):this._config.defaultInterval||this._config.interval;var d=m.getTransitionDurationFromElement(s);p(s).one(m.TRANSITION_END,function(){p(l).removeClass(n+" "+i).addClass(Q),p(s).removeClass(Q+" "+i+" "+n),r._isSliding=!1,setTimeout(function(){return p(r._element).trigger(u)},0)}).emulateTransitionEnd(d)}else p(s).removeClass(Q),p(l).addClass(Q),this._isSliding=!1,p(this._element).trigger(u);h&&this.cycle()}},r._jQueryInterface=function(i){return this.each(function(){var t=p(this).data(x),e=l({},R,p(this).data());"object"==typeof i&&(e=l({},e,i));var n="string"==typeof i?i:e.slide;if(t||(t=new r(this,e),p(this).data(x,t)),"number"==typeof i)t.to(i);else if("string"==typeof n){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n]()}else e.interval&&e.ride&&(t.pause(),t.cycle())})},r._dataApiClickHandler=function(t){var e=m.getSelectorFromElement(this);if(e){var n=p(e)[0];if(n&&p(n).hasClass(K)){var i=l({},p(n).data(),p(this).data()),o=this.getAttribute("data-slide-to");o&&(i.interval=!1),r._jQueryInterface.call(p(n),i),o&&p(n).data(x).to(o),t.preventDefault()}}},s(r,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return R}}]),r}();p(document).on(q.CLICK_DATA_API,ot,at._dataApiClickHandler),p(window).on(q.LOAD_DATA_API,function(){for(var t=[].slice.call(document.querySelectorAll(rt)),e=0,n=t.length;e<n;e++){var i=p(t[e]);at._jQueryInterface.call(i,i.data())}}),p.fn[L]=at._jQueryInterface,p.fn[L].Constructor=at,p.fn[L].noConflict=function(){return p.fn[L]=j,at._jQueryInterface};var lt="collapse",ct="bs.collapse",ht="."+ct,ut=p.fn[lt],ft={toggle:!0,parent:""},dt={toggle:"boolean",parent:"(string|element)"},pt={SHOW:"show"+ht,SHOWN:"shown"+ht,HIDE:"hide"+ht,HIDDEN:"hidden"+ht,CLICK_DATA_API:"click"+ht+".data-api"},mt="show",gt="collapse",_t="collapsing",vt="collapsed",yt="width",Et="height",bt=".show, .collapsing",wt='[data-toggle="collapse"]',Ct=function(){function a(e,t){this._isTransitioning=!1,this._element=e,this._config=this._getConfig(t),this._triggerArray=[].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'));for(var n=[].slice.call(document.querySelectorAll(wt)),i=0,o=n.length;i<o;i++){var r=n[i],s=m.getSelectorFromElement(r),a=[].slice.call(document.querySelectorAll(s)).filter(function(t){return t===e});null!==s&&0<a.length&&(this._selector=s,this._triggerArray.push(r))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var t=a.prototype;return t.toggle=function(){p(this._element).hasClass(mt)?this.hide():this.show()},t.show=function(){var t,e,n=this;if(!this._isTransitioning&&!p(this._element).hasClass(mt)&&(this._parent&&0===(t=[].slice.call(this._parent.querySelectorAll(bt)).filter(function(t){return"string"==typeof n._config.parent?t.getAttribute("data-parent")===n._config.parent:t.classList.contains(gt)})).length&&(t=null),!(t&&(e=p(t).not(this._selector).data(ct))&&e._isTransitioning))){var i=p.Event(pt.SHOW);if(p(this._element).trigger(i),!i.isDefaultPrevented()){t&&(a._jQueryInterface.call(p(t).not(this._selector),"hide"),e||p(t).data(ct,null));var o=this._getDimension();p(this._element).removeClass(gt).addClass(_t),this._element.style[o]=0,this._triggerArray.length&&p(this._triggerArray).removeClass(vt).attr("aria-expanded",!0),this.setTransitioning(!0);var r="scroll"+(o[0].toUpperCase()+o.slice(1)),s=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,function(){p(n._element).removeClass(_t).addClass(gt).addClass(mt),n._element.style[o]="",n.setTransitioning(!1),p(n._element).trigger(pt.SHOWN)}).emulateTransitionEnd(s),this._element.style[o]=this._element[r]+"px"}}},t.hide=function(){var t=this;if(!this._isTransitioning&&p(this._element).hasClass(mt)){var e=p.Event(pt.HIDE);if(p(this._element).trigger(e),!e.isDefaultPrevented()){var n=this._getDimension();this._element.style[n]=this._element.getBoundingClientRect()[n]+"px",m.reflow(this._element),p(this._element).addClass(_t).removeClass(gt).removeClass(mt);var i=this._triggerArray.length;if(0<i)for(var o=0;o<i;o++){var r=this._triggerArray[o],s=m.getSelectorFromElement(r);if(null!==s)p([].slice.call(document.querySelectorAll(s))).hasClass(mt)||p(r).addClass(vt).attr("aria-expanded",!1)}this.setTransitioning(!0);this._element.style[n]="";var a=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,function(){t.setTransitioning(!1),p(t._element).removeClass(_t).addClass(gt).trigger(pt.HIDDEN)}).emulateTransitionEnd(a)}}},t.setTransitioning=function(t){this._isTransitioning=t},t.dispose=function(){p.removeData(this._element,ct),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},t._getConfig=function(t){return(t=l({},ft,t)).toggle=Boolean(t.toggle),m.typeCheckConfig(lt,t,dt),t},t._getDimension=function(){return p(this._element).hasClass(yt)?yt:Et},t._getParent=function(){var t,n=this;m.isElement(this._config.parent)?(t=this._config.parent,"undefined"!=typeof this._config.parent.jquery&&(t=this._config.parent[0])):t=document.querySelector(this._config.parent);var e='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',i=[].slice.call(t.querySelectorAll(e));return p(i).each(function(t,e){n._addAriaAndCollapsedClass(a._getTargetFromElement(e),[e])}),t},t._addAriaAndCollapsedClass=function(t,e){var n=p(t).hasClass(mt);e.length&&p(e).toggleClass(vt,!n).attr("aria-expanded",n)},a._getTargetFromElement=function(t){var e=m.getSelectorFromElement(t);return e?document.querySelector(e):null},a._jQueryInterface=function(i){return this.each(function(){var t=p(this),e=t.data(ct),n=l({},ft,t.data(),"object"==typeof i&&i?i:{});if(!e&&n.toggle&&/show|hide/.test(i)&&(n.toggle=!1),e||(e=new a(this,n),t.data(ct,e)),"string"==typeof i){if("undefined"==typeof e[i])throw new TypeError('No method named "'+i+'"');e[i]()}})},s(a,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return ft}}]),a}();p(document).on(pt.CLICK_DATA_API,wt,function(t){"A"===t.currentTarget.tagName&&t.preventDefault();var n=p(this),e=m.getSelectorFromElement(this),i=[].slice.call(document.querySelectorAll(e));p(i).each(function(){var t=p(this),e=t.data(ct)?"toggle":n.data();Ct._jQueryInterface.call(t,e)})}),p.fn[lt]=Ct._jQueryInterface,p.fn[lt].Constructor=Ct,p.fn[lt].noConflict=function(){return p.fn[lt]=ut,Ct._jQueryInterface};for(var Tt="undefined"!=typeof window&&"undefined"!=typeof document,St=["Edge","Trident","Firefox"],Dt=0,It=0;It<St.length;It+=1)if(Tt&&0<=navigator.userAgent.indexOf(St[It])){Dt=1;break}var At=Tt&&window.Promise?function(t){var e=!1;return function(){e||(e=!0,window.Promise.resolve().then(function(){e=!1,t()}))}}:function(t){var e=!1;return function(){e||(e=!0,setTimeout(function(){e=!1,t()},Dt))}};function Ot(t){return t&&"[object Function]"==={}.toString.call(t)}function Nt(t,e){if(1!==t.nodeType)return[];var n=t.ownerDocument.defaultView.getComputedStyle(t,null);return e?n[e]:n}function kt(t){return"HTML"===t.nodeName?t:t.parentNode||t.host}function Lt(t){if(!t)return document.body;switch(t.nodeName){case"HTML":case"BODY":return t.ownerDocument.body;case"#document":return t.body}var e=Nt(t),n=e.overflow,i=e.overflowX,o=e.overflowY;return/(auto|scroll|overlay)/.test(n+o+i)?t:Lt(kt(t))}var xt=Tt&&!(!window.MSInputMethodContext||!document.documentMode),Pt=Tt&&/MSIE 10/.test(navigator.userAgent);function Ht(t){return 11===t?xt:10===t?Pt:xt||Pt}function jt(t){if(!t)return document.documentElement;for(var e=Ht(10)?document.body:null,n=t.offsetParent||null;n===e&&t.nextElementSibling;)n=(t=t.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&"BODY"!==i&&"HTML"!==i?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===Nt(n,"position")?jt(n):n:t?t.ownerDocument.documentElement:document.documentElement}function Rt(t){return null!==t.parentNode?Rt(t.parentNode):t}function Ft(t,e){if(!(t&&t.nodeType&&e&&e.nodeType))return document.documentElement;var n=t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?t:e,o=n?e:t,r=document.createRange();r.setStart(i,0),r.setEnd(o,0);var s,a,l=r.commonAncestorContainer;if(t!==l&&e!==l||i.contains(o))return"BODY"===(a=(s=l).nodeName)||"HTML"!==a&&jt(s.firstElementChild)!==s?jt(l):l;var c=Rt(t);return c.host?Ft(c.host,e):Ft(t,Rt(e).host)}function Mt(t){var e="top"===(1<arguments.length&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",n=t.nodeName;if("BODY"!==n&&"HTML"!==n)return t[e];var i=t.ownerDocument.documentElement;return(t.ownerDocument.scrollingElement||i)[e]}function Wt(t,e){var n="x"===e?"Left":"Top",i="Left"===n?"Right":"Bottom";return parseFloat(t["border"+n+"Width"],10)+parseFloat(t["border"+i+"Width"],10)}function Ut(t,e,n,i){return Math.max(e["offset"+t],e["scroll"+t],n["client"+t],n["offset"+t],n["scroll"+t],Ht(10)?parseInt(n["offset"+t])+parseInt(i["margin"+("Height"===t?"Top":"Left")])+parseInt(i["margin"+("Height"===t?"Bottom":"Right")]):0)}function Bt(t){var e=t.body,n=t.documentElement,i=Ht(10)&&getComputedStyle(n);return{height:Ut("Height",e,n,i),width:Ut("Width",e,n,i)}}var qt=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),Kt=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},Qt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};function Vt(t){return Qt({},t,{right:t.left+t.width,bottom:t.top+t.height})}function Yt(t){var e={};try{if(Ht(10)){e=t.getBoundingClientRect();var n=Mt(t,"top"),i=Mt(t,"left");e.top+=n,e.left+=i,e.bottom+=n,e.right+=i}else e=t.getBoundingClientRect()}catch(t){}var o={left:e.left,top:e.top,width:e.right-e.left,height:e.bottom-e.top},r="HTML"===t.nodeName?Bt(t.ownerDocument):{},s=r.width||t.clientWidth||o.right-o.left,a=r.height||t.clientHeight||o.bottom-o.top,l=t.offsetWidth-s,c=t.offsetHeight-a;if(l||c){var h=Nt(t);l-=Wt(h,"x"),c-=Wt(h,"y"),o.width-=l,o.height-=c}return Vt(o)}function zt(t,e){var n=2<arguments.length&&void 0!==arguments[2]&&arguments[2],i=Ht(10),o="HTML"===e.nodeName,r=Yt(t),s=Yt(e),a=Lt(t),l=Nt(e),c=parseFloat(l.borderTopWidth,10),h=parseFloat(l.borderLeftWidth,10);n&&o&&(s.top=Math.max(s.top,0),s.left=Math.max(s.left,0));var u=Vt({top:r.top-s.top-c,left:r.left-s.left-h,width:r.width,height:r.height});if(u.marginTop=0,u.marginLeft=0,!i&&o){var f=parseFloat(l.marginTop,10),d=parseFloat(l.marginLeft,10);u.top-=c-f,u.bottom-=c-f,u.left-=h-d,u.right-=h-d,u.marginTop=f,u.marginLeft=d}return(i&&!n?e.contains(a):e===a&&"BODY"!==a.nodeName)&&(u=function(t,e){var n=2<arguments.length&&void 0!==arguments[2]&&arguments[2],i=Mt(e,"top"),o=Mt(e,"left"),r=n?-1:1;return t.top+=i*r,t.bottom+=i*r,t.left+=o*r,t.right+=o*r,t}(u,e)),u}function Xt(t){if(!t||!t.parentElement||Ht())return document.documentElement;for(var e=t.parentElement;e&&"none"===Nt(e,"transform");)e=e.parentElement;return e||document.documentElement}function Gt(t,e,n,i){var o=4<arguments.length&&void 0!==arguments[4]&&arguments[4],r={top:0,left:0},s=o?Xt(t):Ft(t,e);if("viewport"===i)r=function(t){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1],n=t.ownerDocument.documentElement,i=zt(t,n),o=Math.max(n.clientWidth,window.innerWidth||0),r=Math.max(n.clientHeight,window.innerHeight||0),s=e?0:Mt(n),a=e?0:Mt(n,"left");return Vt({top:s-i.top+i.marginTop,left:a-i.left+i.marginLeft,width:o,height:r})}(s,o);else{var a=void 0;"scrollParent"===i?"BODY"===(a=Lt(kt(e))).nodeName&&(a=t.ownerDocument.documentElement):a="window"===i?t.ownerDocument.documentElement:i;var l=zt(a,s,o);if("HTML"!==a.nodeName||function t(e){var n=e.nodeName;if("BODY"===n||"HTML"===n)return!1;if("fixed"===Nt(e,"position"))return!0;var i=kt(e);return!!i&&t(i)}(s))r=l;else{var c=Bt(t.ownerDocument),h=c.height,u=c.width;r.top+=l.top-l.marginTop,r.bottom=h+l.top,r.left+=l.left-l.marginLeft,r.right=u+l.left}}var f="number"==typeof(n=n||0);return r.left+=f?n:n.left||0,r.top+=f?n:n.top||0,r.right-=f?n:n.right||0,r.bottom-=f?n:n.bottom||0,r}function $t(t,e,i,n,o){var r=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===t.indexOf("auto"))return t;var s=Gt(i,n,r,o),a={top:{width:s.width,height:e.top-s.top},right:{width:s.right-e.right,height:s.height},bottom:{width:s.width,height:s.bottom-e.bottom},left:{width:e.left-s.left,height:s.height}},l=Object.keys(a).map(function(t){return Qt({key:t},a[t],{area:(e=a[t],e.width*e.height)});var e}).sort(function(t,e){return e.area-t.area}),c=l.filter(function(t){var e=t.width,n=t.height;return e>=i.clientWidth&&n>=i.clientHeight}),h=0<c.length?c[0].key:l[0].key,u=t.split("-")[1];return h+(u?"-"+u:"")}function Jt(t,e,n){var i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return zt(n,i?Xt(e):Ft(e,n),i)}function Zt(t){var e=t.ownerDocument.defaultView.getComputedStyle(t),n=parseFloat(e.marginTop||0)+parseFloat(e.marginBottom||0),i=parseFloat(e.marginLeft||0)+parseFloat(e.marginRight||0);return{width:t.offsetWidth+i,height:t.offsetHeight+n}}function te(t){var e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,function(t){return e[t]})}function ee(t,e,n){n=n.split("-")[0];var i=Zt(t),o={width:i.width,height:i.height},r=-1!==["right","left"].indexOf(n),s=r?"top":"left",a=r?"left":"top",l=r?"height":"width",c=r?"width":"height";return o[s]=e[s]+e[l]/2-i[l]/2,o[a]=n===a?e[a]-i[c]:e[te(a)],o}function ne(t,e){return Array.prototype.find?t.find(e):t.filter(e)[0]}function ie(t,n,e){return(void 0===e?t:t.slice(0,function(t,e,n){if(Array.prototype.findIndex)return t.findIndex(function(t){return t[e]===n});var i=ne(t,function(t){return t[e]===n});return t.indexOf(i)}(t,"name",e))).forEach(function(t){t.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var e=t.function||t.fn;t.enabled&&Ot(e)&&(n.offsets.popper=Vt(n.offsets.popper),n.offsets.reference=Vt(n.offsets.reference),n=e(n,t))}),n}function oe(t,n){return t.some(function(t){var e=t.name;return t.enabled&&e===n})}function re(t){for(var e=[!1,"ms","Webkit","Moz","O"],n=t.charAt(0).toUpperCase()+t.slice(1),i=0;i<e.length;i++){var o=e[i],r=o?""+o+n:t;if("undefined"!=typeof document.body.style[r])return r}return null}function se(t){var e=t.ownerDocument;return e?e.defaultView:window}function ae(t,e,n,i){n.updateBound=i,se(t).addEventListener("resize",n.updateBound,{passive:!0});var o=Lt(t);return function t(e,n,i,o){var r="BODY"===e.nodeName,s=r?e.ownerDocument.defaultView:e;s.addEventListener(n,i,{passive:!0}),r||t(Lt(s.parentNode),n,i,o),o.push(s)}(o,"scroll",n.updateBound,n.scrollParents),n.scrollElement=o,n.eventsEnabled=!0,n}function le(){var t,e;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(t=this.reference,e=this.state,se(t).removeEventListener("resize",e.updateBound),e.scrollParents.forEach(function(t){t.removeEventListener("scroll",e.updateBound)}),e.updateBound=null,e.scrollParents=[],e.scrollElement=null,e.eventsEnabled=!1,e))}function ce(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}function he(n,i){Object.keys(i).forEach(function(t){var e="";-1!==["width","height","top","right","bottom","left"].indexOf(t)&&ce(i[t])&&(e="px"),n.style[t]=i[t]+e})}var ue=Tt&&/Firefox/i.test(navigator.userAgent);function fe(t,e,n){var i=ne(t,function(t){return t.name===e}),o=!!i&&t.some(function(t){return t.name===n&&t.enabled&&t.order<i.order});if(!o){var r="`"+e+"`",s="`"+n+"`";console.warn(s+" modifier is required by "+r+" modifier in order to work, be sure to include it before "+r+"!")}return o}var de=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],pe=de.slice(3);function me(t){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1],n=pe.indexOf(t),i=pe.slice(n+1).concat(pe.slice(0,n));return e?i.reverse():i}var ge="flip",_e="clockwise",ve="counterclockwise";function ye(t,o,r,e){var s=[0,0],a=-1!==["right","left"].indexOf(e),n=t.split(/(\+|\-)/).map(function(t){return t.trim()}),i=n.indexOf(ne(n,function(t){return-1!==t.search(/,|\s/)}));n[i]&&-1===n[i].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=/\s*,\s*|\s+/,c=-1!==i?[n.slice(0,i).concat([n[i].split(l)[0]]),[n[i].split(l)[1]].concat(n.slice(i+1))]:[n];return(c=c.map(function(t,e){var n=(1===e?!a:a)?"height":"width",i=!1;return t.reduce(function(t,e){return""===t[t.length-1]&&-1!==["+","-"].indexOf(e)?(t[t.length-1]=e,i=!0,t):i?(t[t.length-1]+=e,i=!1,t):t.concat(e)},[]).map(function(t){return function(t,e,n,i){var o=t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+o[1],s=o[2];if(!r)return t;if(0!==s.indexOf("%"))return"vh"!==s&&"vw"!==s?r:("vh"===s?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*r;var a=void 0;switch(s){case"%p":a=n;break;case"%":case"%r":default:a=i}return Vt(a)[e]/100*r}(t,n,o,r)})})).forEach(function(n,i){n.forEach(function(t,e){ce(t)&&(s[i]+=t*("-"===n[e-1]?-1:1))})}),s}var Ee={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(t){var e=t.placement,n=e.split("-")[0],i=e.split("-")[1];if(i){var o=t.offsets,r=o.reference,s=o.popper,a=-1!==["bottom","top"].indexOf(n),l=a?"left":"top",c=a?"width":"height",h={start:Kt({},l,r[l]),end:Kt({},l,r[l]+r[c]-s[c])};t.offsets.popper=Qt({},s,h[i])}return t}},offset:{order:200,enabled:!0,fn:function(t,e){var n=e.offset,i=t.placement,o=t.offsets,r=o.popper,s=o.reference,a=i.split("-")[0],l=void 0;return l=ce(+n)?[+n,0]:ye(n,r,s,a),"left"===a?(r.top+=l[0],r.left-=l[1]):"right"===a?(r.top+=l[0],r.left+=l[1]):"top"===a?(r.left+=l[0],r.top-=l[1]):"bottom"===a&&(r.left+=l[0],r.top+=l[1]),t.popper=r,t},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(t,i){var e=i.boundariesElement||jt(t.instance.popper);t.instance.reference===e&&(e=jt(e));var n=re("transform"),o=t.instance.popper.style,r=o.top,s=o.left,a=o[n];o.top="",o.left="",o[n]="";var l=Gt(t.instance.popper,t.instance.reference,i.padding,e,t.positionFixed);o.top=r,o.left=s,o[n]=a,i.boundaries=l;var c=i.priority,h=t.offsets.popper,u={primary:function(t){var e=h[t];return h[t]<l[t]&&!i.escapeWithReference&&(e=Math.max(h[t],l[t])),Kt({},t,e)},secondary:function(t){var e="right"===t?"left":"top",n=h[e];return h[t]>l[t]&&!i.escapeWithReference&&(n=Math.min(h[e],l[t]-("right"===t?h.width:h.height))),Kt({},e,n)}};return c.forEach(function(t){var e=-1!==["left","top"].indexOf(t)?"primary":"secondary";h=Qt({},h,u[e](t))}),t.offsets.popper=h,t},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(t){var e=t.offsets,n=e.popper,i=e.reference,o=t.placement.split("-")[0],r=Math.floor,s=-1!==["top","bottom"].indexOf(o),a=s?"right":"bottom",l=s?"left":"top",c=s?"width":"height";return n[a]<r(i[l])&&(t.offsets.popper[l]=r(i[l])-n[c]),n[l]>r(i[a])&&(t.offsets.popper[l]=r(i[a])),t}},arrow:{order:500,enabled:!0,fn:function(t,e){var n;if(!fe(t.instance.modifiers,"arrow","keepTogether"))return t;var i=e.element;if("string"==typeof i){if(!(i=t.instance.popper.querySelector(i)))return t}else if(!t.instance.popper.contains(i))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;var o=t.placement.split("-")[0],r=t.offsets,s=r.popper,a=r.reference,l=-1!==["left","right"].indexOf(o),c=l?"height":"width",h=l?"Top":"Left",u=h.toLowerCase(),f=l?"left":"top",d=l?"bottom":"right",p=Zt(i)[c];a[d]-p<s[u]&&(t.offsets.popper[u]-=s[u]-(a[d]-p)),a[u]+p>s[d]&&(t.offsets.popper[u]+=a[u]+p-s[d]),t.offsets.popper=Vt(t.offsets.popper);var m=a[u]+a[c]/2-p/2,g=Nt(t.instance.popper),_=parseFloat(g["margin"+h],10),v=parseFloat(g["border"+h+"Width"],10),y=m-t.offsets.popper[u]-_-v;return y=Math.max(Math.min(s[c]-p,y),0),t.arrowElement=i,t.offsets.arrow=(Kt(n={},u,Math.round(y)),Kt(n,f,""),n),t},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(p,m){if(oe(p.instance.modifiers,"inner"))return p;if(p.flipped&&p.placement===p.originalPlacement)return p;var g=Gt(p.instance.popper,p.instance.reference,m.padding,m.boundariesElement,p.positionFixed),_=p.placement.split("-")[0],v=te(_),y=p.placement.split("-")[1]||"",E=[];switch(m.behavior){case ge:E=[_,v];break;case _e:E=me(_);break;case ve:E=me(_,!0);break;default:E=m.behavior}return E.forEach(function(t,e){if(_!==t||E.length===e+1)return p;_=p.placement.split("-")[0],v=te(_);var n,i=p.offsets.popper,o=p.offsets.reference,r=Math.floor,s="left"===_&&r(i.right)>r(o.left)||"right"===_&&r(i.left)<r(o.right)||"top"===_&&r(i.bottom)>r(o.top)||"bottom"===_&&r(i.top)<r(o.bottom),a=r(i.left)<r(g.left),l=r(i.right)>r(g.right),c=r(i.top)<r(g.top),h=r(i.bottom)>r(g.bottom),u="left"===_&&a||"right"===_&&l||"top"===_&&c||"bottom"===_&&h,f=-1!==["top","bottom"].indexOf(_),d=!!m.flipVariations&&(f&&"start"===y&&a||f&&"end"===y&&l||!f&&"start"===y&&c||!f&&"end"===y&&h);(s||u||d)&&(p.flipped=!0,(s||u)&&(_=E[e+1]),d&&(y="end"===(n=y)?"start":"start"===n?"end":n),p.placement=_+(y?"-"+y:""),p.offsets.popper=Qt({},p.offsets.popper,ee(p.instance.popper,p.offsets.reference,p.placement)),p=ie(p.instance.modifiers,p,"flip"))}),p},behavior:"flip",padding:5,boundariesElement:"viewport"},inner:{order:700,enabled:!1,fn:function(t){var e=t.placement,n=e.split("-")[0],i=t.offsets,o=i.popper,r=i.reference,s=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return o[s?"left":"top"]=r[n]-(a?o[s?"width":"height"]:0),t.placement=te(e),t.offsets.popper=Vt(o),t}},hide:{order:800,enabled:!0,fn:function(t){if(!fe(t.instance.modifiers,"hide","preventOverflow"))return t;var e=t.offsets.reference,n=ne(t.instance.modifiers,function(t){return"preventOverflow"===t.name}).boundaries;if(e.bottom<n.top||e.left>n.right||e.top>n.bottom||e.right<n.left){if(!0===t.hide)return t;t.hide=!0,t.attributes["x-out-of-boundaries"]=""}else{if(!1===t.hide)return t;t.hide=!1,t.attributes["x-out-of-boundaries"]=!1}return t}},computeStyle:{order:850,enabled:!0,fn:function(t,e){var n=e.x,i=e.y,o=t.offsets.popper,r=ne(t.instance.modifiers,function(t){return"applyStyle"===t.name}).gpuAcceleration;void 0!==r&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var s,a,l,c,h,u,f,d,p,m,g,_,v,y,E=void 0!==r?r:e.gpuAcceleration,b=jt(t.instance.popper),w=Yt(b),C={position:o.position},T=(s=t,a=window.devicePixelRatio<2||!ue,l=s.offsets,c=l.popper,h=l.reference,u=Math.round,f=Math.floor,d=function(t){return t},p=u(h.width),m=u(c.width),g=-1!==["left","right"].indexOf(s.placement),_=-1!==s.placement.indexOf("-"),y=a?u:d,{left:(v=a?g||_||p%2==m%2?u:f:d)(p%2==1&&m%2==1&&!_&&a?c.left-1:c.left),top:y(c.top),bottom:y(c.bottom),right:v(c.right)}),S="bottom"===n?"top":"bottom",D="right"===i?"left":"right",I=re("transform"),A=void 0,O=void 0;if(O="bottom"===S?"HTML"===b.nodeName?-b.clientHeight+T.bottom:-w.height+T.bottom:T.top,A="right"===D?"HTML"===b.nodeName?-b.clientWidth+T.right:-w.width+T.right:T.left,E&&I)C[I]="translate3d("+A+"px, "+O+"px, 0)",C[S]=0,C[D]=0,C.willChange="transform";else{var N="bottom"===S?-1:1,k="right"===D?-1:1;C[S]=O*N,C[D]=A*k,C.willChange=S+", "+D}var L={"x-placement":t.placement};return t.attributes=Qt({},L,t.attributes),t.styles=Qt({},C,t.styles),t.arrowStyles=Qt({},t.offsets.arrow,t.arrowStyles),t},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(t){var e,n;return he(t.instance.popper,t.styles),e=t.instance.popper,n=t.attributes,Object.keys(n).forEach(function(t){!1!==n[t]?e.setAttribute(t,n[t]):e.removeAttribute(t)}),t.arrowElement&&Object.keys(t.arrowStyles).length&&he(t.arrowElement,t.arrowStyles),t},onLoad:function(t,e,n,i,o){var r=Jt(o,e,t,n.positionFixed),s=$t(n.placement,r,e,t,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return e.setAttribute("x-placement",s),he(e,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}}},be=function(){function r(t,e){var n=this,i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),this.scheduleUpdate=function(){return requestAnimationFrame(n.update)},this.update=At(this.update.bind(this)),this.options=Qt({},r.Defaults,i),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t&&t.jquery?t[0]:t,this.popper=e&&e.jquery?e[0]:e,this.options.modifiers={},Object.keys(Qt({},r.Defaults.modifiers,i.modifiers)).forEach(function(t){n.options.modifiers[t]=Qt({},r.Defaults.modifiers[t]||{},i.modifiers?i.modifiers[t]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(t){return Qt({name:t},n.options.modifiers[t])}).sort(function(t,e){return t.order-e.order}),this.modifiers.forEach(function(t){t.enabled&&Ot(t.onLoad)&&t.onLoad(n.reference,n.popper,n.options,t,n.state)}),this.update();var o=this.options.eventsEnabled;o&&this.enableEventListeners(),this.state.eventsEnabled=o}return qt(r,[{key:"update",value:function(){return function(){if(!this.state.isDestroyed){var t={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};t.offsets.reference=Jt(this.state,this.popper,this.reference,this.options.positionFixed),t.placement=$t(this.options.placement,t.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),t.originalPlacement=t.placement,t.positionFixed=this.options.positionFixed,t.offsets.popper=ee(this.popper,t.offsets.reference,t.placement),t.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",t=ie(this.modifiers,t),this.state.isCreated?this.options.onUpdate(t):(this.state.isCreated=!0,this.options.onCreate(t))}}.call(this)}},{key:"destroy",value:function(){return function(){return this.state.isDestroyed=!0,oe(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[re("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}.call(this)}},{key:"enableEventListeners",value:function(){return function(){this.state.eventsEnabled||(this.state=ae(this.reference,this.options,this.state,this.scheduleUpdate))}.call(this)}},{key:"disableEventListeners",value:function(){return le.call(this)}}]),r}();be.Utils=("undefined"!=typeof window?window:global).PopperUtils,be.placements=de,be.Defaults=Ee;var we="dropdown",Ce="bs.dropdown",Te="."+Ce,Se=".data-api",De=p.fn[we],Ie=new RegExp("38|40|27"),Ae={HIDE:"hide"+Te,HIDDEN:"hidden"+Te,SHOW:"show"+Te,SHOWN:"shown"+Te,CLICK:"click"+Te,CLICK_DATA_API:"click"+Te+Se,KEYDOWN_DATA_API:"keydown"+Te+Se,KEYUP_DATA_API:"keyup"+Te+Se},Oe="disabled",Ne="show",ke="dropup",Le="dropright",xe="dropleft",Pe="dropdown-menu-right",He="position-static",je='[data-toggle="dropdown"]',Re=".dropdown form",Fe=".dropdown-menu",Me=".navbar-nav",We=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",Ue="top-start",Be="top-end",qe="bottom-start",Ke="bottom-end",Qe="right-start",Ve="left-start",Ye={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic"},ze={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string"},Xe=function(){function c(t,e){this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var t=c.prototype;return t.toggle=function(){if(!this._element.disabled&&!p(this._element).hasClass(Oe)){var t=c._getParentFromElement(this._element),e=p(this._menu).hasClass(Ne);if(c._clearMenus(),!e){var n={relatedTarget:this._element},i=p.Event(Ae.SHOW,n);if(p(t).trigger(i),!i.isDefaultPrevented()){if(!this._inNavbar){if("undefined"==typeof be)throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");var o=this._element;"parent"===this._config.reference?o=t:m.isElement(this._config.reference)&&(o=this._config.reference,"undefined"!=typeof this._config.reference.jquery&&(o=this._config.reference[0])),"scrollParent"!==this._config.boundary&&p(t).addClass(He),this._popper=new be(o,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===p(t).closest(Me).length&&p(document.body).children().on("mouseover",null,p.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),p(this._menu).toggleClass(Ne),p(t).toggleClass(Ne).trigger(p.Event(Ae.SHOWN,n))}}}},t.show=function(){if(!(this._element.disabled||p(this._element).hasClass(Oe)||p(this._menu).hasClass(Ne))){var t={relatedTarget:this._element},e=p.Event(Ae.SHOW,t),n=c._getParentFromElement(this._element);p(n).trigger(e),e.isDefaultPrevented()||(p(this._menu).toggleClass(Ne),p(n).toggleClass(Ne).trigger(p.Event(Ae.SHOWN,t)))}},t.hide=function(){if(!this._element.disabled&&!p(this._element).hasClass(Oe)&&p(this._menu).hasClass(Ne)){var t={relatedTarget:this._element},e=p.Event(Ae.HIDE,t),n=c._getParentFromElement(this._element);p(n).trigger(e),e.isDefaultPrevented()||(p(this._menu).toggleClass(Ne),p(n).toggleClass(Ne).trigger(p.Event(Ae.HIDDEN,t)))}},t.dispose=function(){p.removeData(this._element,Ce),p(this._element).off(Te),this._element=null,(this._menu=null)!==this._popper&&(this._popper.destroy(),this._popper=null)},t.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},t._addEventListeners=function(){var e=this;p(this._element).on(Ae.CLICK,function(t){t.preventDefault(),t.stopPropagation(),e.toggle()})},t._getConfig=function(t){return t=l({},this.constructor.Default,p(this._element).data(),t),m.typeCheckConfig(we,t,this.constructor.DefaultType),t},t._getMenuElement=function(){if(!this._menu){var t=c._getParentFromElement(this._element);t&&(this._menu=t.querySelector(Fe))}return this._menu},t._getPlacement=function(){var t=p(this._element.parentNode),e=qe;return t.hasClass(ke)?(e=Ue,p(this._menu).hasClass(Pe)&&(e=Be)):t.hasClass(Le)?e=Qe:t.hasClass(xe)?e=Ve:p(this._menu).hasClass(Pe)&&(e=Ke),e},t._detectNavbar=function(){return 0<p(this._element).closest(".navbar").length},t._getOffset=function(){var e=this,t={};return"function"==typeof this._config.offset?t.fn=function(t){return t.offsets=l({},t.offsets,e._config.offset(t.offsets,e._element)||{}),t}:t.offset=this._config.offset,t},t._getPopperConfig=function(){var t={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(t.modifiers.applyStyle={enabled:!1}),t},c._jQueryInterface=function(e){return this.each(function(){var t=p(this).data(Ce);if(t||(t=new c(this,"object"==typeof e?e:null),p(this).data(Ce,t)),"string"==typeof e){if("undefined"==typeof t[e])throw new TypeError('No method named "'+e+'"');t[e]()}})},c._clearMenus=function(t){if(!t||3!==t.which&&("keyup"!==t.type||9===t.which))for(var e=[].slice.call(document.querySelectorAll(je)),n=0,i=e.length;n<i;n++){var o=c._getParentFromElement(e[n]),r=p(e[n]).data(Ce),s={relatedTarget:e[n]};if(t&&"click"===t.type&&(s.clickEvent=t),r){var a=r._menu;if(p(o).hasClass(Ne)&&!(t&&("click"===t.type&&/input|textarea/i.test(t.target.tagName)||"keyup"===t.type&&9===t.which)&&p.contains(o,t.target))){var l=p.Event(Ae.HIDE,s);p(o).trigger(l),l.isDefaultPrevented()||("ontouchstart"in document.documentElement&&p(document.body).children().off("mouseover",null,p.noop),e[n].setAttribute("aria-expanded","false"),p(a).removeClass(Ne),p(o).removeClass(Ne).trigger(p.Event(Ae.HIDDEN,s)))}}}},c._getParentFromElement=function(t){var e,n=m.getSelectorFromElement(t);return n&&(e=document.querySelector(n)),e||t.parentNode},c._dataApiKeydownHandler=function(t){if((/input|textarea/i.test(t.target.tagName)?!(32===t.which||27!==t.which&&(40!==t.which&&38!==t.which||p(t.target).closest(Fe).length)):Ie.test(t.which))&&(t.preventDefault(),t.stopPropagation(),!this.disabled&&!p(this).hasClass(Oe))){var e=c._getParentFromElement(this),n=p(e).hasClass(Ne);if(n&&(!n||27!==t.which&&32!==t.which)){var i=[].slice.call(e.querySelectorAll(We));if(0!==i.length){var o=i.indexOf(t.target);38===t.which&&0<o&&o--,40===t.which&&o<i.length-1&&o++,o<0&&(o=0),i[o].focus()}}else{if(27===t.which){var r=e.querySelector(je);p(r).trigger("focus")}p(this).trigger("click")}}},s(c,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return Ye}},{key:"DefaultType",get:function(){return ze}}]),c}();p(document).on(Ae.KEYDOWN_DATA_API,je,Xe._dataApiKeydownHandler).on(Ae.KEYDOWN_DATA_API,Fe,Xe._dataApiKeydownHandler).on(Ae.CLICK_DATA_API+" "+Ae.KEYUP_DATA_API,Xe._clearMenus).on(Ae.CLICK_DATA_API,je,function(t){t.preventDefault(),t.stopPropagation(),Xe._jQueryInterface.call(p(this),"toggle")}).on(Ae.CLICK_DATA_API,Re,function(t){t.stopPropagation()}),p.fn[we]=Xe._jQueryInterface,p.fn[we].Constructor=Xe,p.fn[we].noConflict=function(){return p.fn[we]=De,Xe._jQueryInterface};var Ge="modal",$e="bs.modal",Je="."+$e,Ze=p.fn[Ge],tn={backdrop:!0,keyboard:!0,focus:!0,show:!0},en={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},nn={HIDE:"hide"+Je,HIDDEN:"hidden"+Je,SHOW:"show"+Je,SHOWN:"shown"+Je,FOCUSIN:"focusin"+Je,RESIZE:"resize"+Je,CLICK_DISMISS:"click.dismiss"+Je,KEYDOWN_DISMISS:"keydown.dismiss"+Je,MOUSEUP_DISMISS:"mouseup.dismiss"+Je,MOUSEDOWN_DISMISS:"mousedown.dismiss"+Je,CLICK_DATA_API:"click"+Je+".data-api"},on="modal-dialog-scrollable",rn="modal-scrollbar-measure",sn="modal-backdrop",an="modal-open",ln="fade",cn="show",hn=".modal-dialog",un=".modal-body",fn='[data-toggle="modal"]',dn='[data-dismiss="modal"]',pn=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",mn=".sticky-top",gn=function(){function o(t,e){this._config=this._getConfig(e),this._element=t,this._dialog=t.querySelector(hn),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollbarWidth=0}var t=o.prototype;return t.toggle=function(t){return this._isShown?this.hide():this.show(t)},t.show=function(t){var e=this;if(!this._isShown&&!this._isTransitioning){p(this._element).hasClass(ln)&&(this._isTransitioning=!0);var n=p.Event(nn.SHOW,{relatedTarget:t});p(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),p(this._element).on(nn.CLICK_DISMISS,dn,function(t){return e.hide(t)}),p(this._dialog).on(nn.MOUSEDOWN_DISMISS,function(){p(e._element).one(nn.MOUSEUP_DISMISS,function(t){p(t.target).is(e._element)&&(e._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return e._showElement(t)}))}},t.hide=function(t){var e=this;if(t&&t.preventDefault(),this._isShown&&!this._isTransitioning){var n=p.Event(nn.HIDE);if(p(this._element).trigger(n),this._isShown&&!n.isDefaultPrevented()){this._isShown=!1;var i=p(this._element).hasClass(ln);if(i&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),p(document).off(nn.FOCUSIN),p(this._element).removeClass(cn),p(this._element).off(nn.CLICK_DISMISS),p(this._dialog).off(nn.MOUSEDOWN_DISMISS),i){var o=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,function(t){return e._hideModal(t)}).emulateTransitionEnd(o)}else this._hideModal()}}},t.dispose=function(){[window,this._element,this._dialog].forEach(function(t){return p(t).off(Je)}),p(document).off(nn.FOCUSIN),p.removeData(this._element,$e),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},t.handleUpdate=function(){this._adjustDialog()},t._getConfig=function(t){return t=l({},tn,t),m.typeCheckConfig(Ge,t,en),t},t._showElement=function(t){var e=this,n=p(this._element).hasClass(ln);this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),p(this._dialog).hasClass(on)?this._dialog.querySelector(un).scrollTop=0:this._element.scrollTop=0,n&&m.reflow(this._element),p(this._element).addClass(cn),this._config.focus&&this._enforceFocus();var i=p.Event(nn.SHOWN,{relatedTarget:t}),o=function(){e._config.focus&&e._element.focus(),e._isTransitioning=!1,p(e._element).trigger(i)};if(n){var r=m.getTransitionDurationFromElement(this._dialog);p(this._dialog).one(m.TRANSITION_END,o).emulateTransitionEnd(r)}else o()},t._enforceFocus=function(){var e=this;p(document).off(nn.FOCUSIN).on(nn.FOCUSIN,function(t){document!==t.target&&e._element!==t.target&&0===p(e._element).has(t.target).length&&e._element.focus()})},t._setEscapeEvent=function(){var e=this;this._isShown&&this._config.keyboard?p(this._element).on(nn.KEYDOWN_DISMISS,function(t){27===t.which&&(t.preventDefault(),e.hide())}):this._isShown||p(this._element).off(nn.KEYDOWN_DISMISS)},t._setResizeEvent=function(){var e=this;this._isShown?p(window).on(nn.RESIZE,function(t){return e.handleUpdate(t)}):p(window).off(nn.RESIZE)},t._hideModal=function(){var t=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._isTransitioning=!1,this._showBackdrop(function(){p(document.body).removeClass(an),t._resetAdjustments(),t._resetScrollbar(),p(t._element).trigger(nn.HIDDEN)})},t._removeBackdrop=function(){this._backdrop&&(p(this._backdrop).remove(),this._backdrop=null)},t._showBackdrop=function(t){var e=this,n=p(this._element).hasClass(ln)?ln:"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className=sn,n&&this._backdrop.classList.add(n),p(this._backdrop).appendTo(document.body),p(this._element).on(nn.CLICK_DISMISS,function(t){e._ignoreBackdropClick?e._ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"===e._config.backdrop?e._element.focus():e.hide())}),n&&m.reflow(this._backdrop),p(this._backdrop).addClass(cn),!t)return;if(!n)return void t();var i=m.getTransitionDurationFromElement(this._backdrop);p(this._backdrop).one(m.TRANSITION_END,t).emulateTransitionEnd(i)}else if(!this._isShown&&this._backdrop){p(this._backdrop).removeClass(cn);var o=function(){e._removeBackdrop(),t&&t()};if(p(this._element).hasClass(ln)){var r=m.getTransitionDurationFromElement(this._backdrop);p(this._backdrop).one(m.TRANSITION_END,o).emulateTransitionEnd(r)}else o()}else t&&t()},t._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},t._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},t._checkScrollbar=function(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=t.left+t.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},t._setScrollbar=function(){var o=this;if(this._isBodyOverflowing){var t=[].slice.call(document.querySelectorAll(pn)),e=[].slice.call(document.querySelectorAll(mn));p(t).each(function(t,e){var n=e.style.paddingRight,i=p(e).css("padding-right");p(e).data("padding-right",n).css("padding-right",parseFloat(i)+o._scrollbarWidth+"px")}),p(e).each(function(t,e){var n=e.style.marginRight,i=p(e).css("margin-right");p(e).data("margin-right",n).css("margin-right",parseFloat(i)-o._scrollbarWidth+"px")});var n=document.body.style.paddingRight,i=p(document.body).css("padding-right");p(document.body).data("padding-right",n).css("padding-right",parseFloat(i)+this._scrollbarWidth+"px")}p(document.body).addClass(an)},t._resetScrollbar=function(){var t=[].slice.call(document.querySelectorAll(pn));p(t).each(function(t,e){var n=p(e).data("padding-right");p(e).removeData("padding-right"),e.style.paddingRight=n||""});var e=[].slice.call(document.querySelectorAll(""+mn));p(e).each(function(t,e){var n=p(e).data("margin-right");"undefined"!=typeof n&&p(e).css("margin-right",n).removeData("margin-right")});var n=p(document.body).data("padding-right");p(document.body).removeData("padding-right"),document.body.style.paddingRight=n||""},t._getScrollbarWidth=function(){var t=document.createElement("div");t.className=rn,document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},o._jQueryInterface=function(n,i){return this.each(function(){var t=p(this).data($e),e=l({},tn,p(this).data(),"object"==typeof n&&n?n:{});if(t||(t=new o(this,e),p(this).data($e,t)),"string"==typeof n){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n](i)}else e.show&&t.show(i)})},s(o,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return tn}}]),o}();p(document).on(nn.CLICK_DATA_API,fn,function(t){var e,n=this,i=m.getSelectorFromElement(this);i&&(e=document.querySelector(i));var o=p(e).data($e)?"toggle":l({},p(e).data(),p(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||t.preventDefault();var r=p(e).one(nn.SHOW,function(t){t.isDefaultPrevented()||r.one(nn.HIDDEN,function(){p(n).is(":visible")&&n.focus()})});gn._jQueryInterface.call(p(e),o,this)}),p.fn[Ge]=gn._jQueryInterface,p.fn[Ge].Constructor=gn,p.fn[Ge].noConflict=function(){return p.fn[Ge]=Ze,gn._jQueryInterface};var _n=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],vn={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},yn=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,En=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function bn(t,s,e){if(0===t.length)return t;if(e&&"function"==typeof e)return e(t);for(var n=(new window.DOMParser).parseFromString(t,"text/html"),a=Object.keys(s),l=[].slice.call(n.body.querySelectorAll("*")),i=function(t,e){var n=l[t],i=n.nodeName.toLowerCase();if(-1===a.indexOf(n.nodeName.toLowerCase()))return n.parentNode.removeChild(n),"continue";var o=[].slice.call(n.attributes),r=[].concat(s["*"]||[],s[i]||[]);o.forEach(function(t){(function(t,e){var n=t.nodeName.toLowerCase();if(-1!==e.indexOf(n))return-1===_n.indexOf(n)||Boolean(t.nodeValue.match(yn)||t.nodeValue.match(En));for(var i=e.filter(function(t){return t instanceof RegExp}),o=0,r=i.length;o<r;o++)if(n.match(i[o]))return!0;return!1})(t,r)||n.removeAttribute(t.nodeName)})},o=0,r=l.length;o<r;o++)i(o);return n.body.innerHTML}var wn="tooltip",Cn="bs.tooltip",Tn="."+Cn,Sn=p.fn[wn],Dn="bs-tooltip",In=new RegExp("(^|\\s)"+Dn+"\\S+","g"),An=["sanitize","whiteList","sanitizeFn"],On={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string|function)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)",sanitize:"boolean",sanitizeFn:"(null|function)",whiteList:"object"},Nn={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},kn={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent",sanitize:!0,sanitizeFn:null,whiteList:vn},Ln="show",xn="out",Pn={HIDE:"hide"+Tn,HIDDEN:"hidden"+Tn,SHOW:"show"+Tn,SHOWN:"shown"+Tn,INSERTED:"inserted"+Tn,CLICK:"click"+Tn,FOCUSIN:"focusin"+Tn,FOCUSOUT:"focusout"+Tn,MOUSEENTER:"mouseenter"+Tn,MOUSELEAVE:"mouseleave"+Tn},Hn="fade",jn="show",Rn=".tooltip-inner",Fn=".arrow",Mn="hover",Wn="focus",Un="click",Bn="manual",qn=function(){function i(t,e){if("undefined"==typeof be)throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}var t=i.prototype;return t.enable=function(){this._isEnabled=!0},t.disable=function(){this._isEnabled=!1},t.toggleEnabled=function(){this._isEnabled=!this._isEnabled},t.toggle=function(t){if(this._isEnabled)if(t){var e=this.constructor.DATA_KEY,n=p(t.currentTarget).data(e);n||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),p(t.currentTarget).data(e,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(p(this.getTipElement()).hasClass(jn))return void this._leave(null,this);this._enter(null,this)}},t.dispose=function(){clearTimeout(this._timeout),p.removeData(this.element,this.constructor.DATA_KEY),p(this.element).off(this.constructor.EVENT_KEY),p(this.element).closest(".modal").off("hide.bs.modal"),this.tip&&p(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,(this._activeTrigger=null)!==this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},t.show=function(){var e=this;if("none"===p(this.element).css("display"))throw new Error("Please use show on visible elements");var t=p.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){p(this.element).trigger(t);var n=m.findShadowRoot(this.element),i=p.contains(null!==n?n:this.element.ownerDocument.documentElement,this.element);if(t.isDefaultPrevented()||!i)return;var o=this.getTipElement(),r=m.getUID(this.constructor.NAME);o.setAttribute("id",r),this.element.setAttribute("aria-describedby",r),this.setContent(),this.config.animation&&p(o).addClass(Hn);var s="function"==typeof this.config.placement?this.config.placement.call(this,o,this.element):this.config.placement,a=this._getAttachment(s);this.addAttachmentClass(a);var l=this._getContainer();p(o).data(this.constructor.DATA_KEY,this),p.contains(this.element.ownerDocument.documentElement,this.tip)||p(o).appendTo(l),p(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new be(this.element,o,{placement:a,modifiers:{offset:this._getOffset(),flip:{behavior:this.config.fallbackPlacement},arrow:{element:Fn},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){return e._handlePopperPlacementChange(t)}}),p(o).addClass(jn),"ontouchstart"in document.documentElement&&p(document.body).children().on("mouseover",null,p.noop);var c=function(){e.config.animation&&e._fixTransition();var t=e._hoverState;e._hoverState=null,p(e.element).trigger(e.constructor.Event.SHOWN),t===xn&&e._leave(null,e)};if(p(this.tip).hasClass(Hn)){var h=m.getTransitionDurationFromElement(this.tip);p(this.tip).one(m.TRANSITION_END,c).emulateTransitionEnd(h)}else c()}},t.hide=function(t){var e=this,n=this.getTipElement(),i=p.Event(this.constructor.Event.HIDE),o=function(){e._hoverState!==Ln&&n.parentNode&&n.parentNode.removeChild(n),e._cleanTipClass(),e.element.removeAttribute("aria-describedby"),p(e.element).trigger(e.constructor.Event.HIDDEN),null!==e._popper&&e._popper.destroy(),t&&t()};if(p(this.element).trigger(i),!i.isDefaultPrevented()){if(p(n).removeClass(jn),"ontouchstart"in document.documentElement&&p(document.body).children().off("mouseover",null,p.noop),this._activeTrigger[Un]=!1,this._activeTrigger[Wn]=!1,this._activeTrigger[Mn]=!1,p(this.tip).hasClass(Hn)){var r=m.getTransitionDurationFromElement(n);p(n).one(m.TRANSITION_END,o).emulateTransitionEnd(r)}else o();this._hoverState=""}},t.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},t.isWithContent=function(){return Boolean(this.getTitle())},t.addAttachmentClass=function(t){p(this.getTipElement()).addClass(Dn+"-"+t)},t.getTipElement=function(){return this.tip=this.tip||p(this.config.template)[0],this.tip},t.setContent=function(){var t=this.getTipElement();this.setElementContent(p(t.querySelectorAll(Rn)),this.getTitle()),p(t).removeClass(Hn+" "+jn)},t.setElementContent=function(t,e){"object"!=typeof e||!e.nodeType&&!e.jquery?this.config.html?(this.config.sanitize&&(e=bn(e,this.config.whiteList,this.config.sanitizeFn)),t.html(e)):t.text(e):this.config.html?p(e).parent().is(t)||t.empty().append(e):t.text(p(e).text())},t.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},t._getOffset=function(){var e=this,t={};return"function"==typeof this.config.offset?t.fn=function(t){return t.offsets=l({},t.offsets,e.config.offset(t.offsets,e.element)||{}),t}:t.offset=this.config.offset,t},t._getContainer=function(){return!1===this.config.container?document.body:m.isElement(this.config.container)?p(this.config.container):p(document).find(this.config.container)},t._getAttachment=function(t){return Nn[t.toUpperCase()]},t._setListeners=function(){var i=this;this.config.trigger.split(" ").forEach(function(t){if("click"===t)p(i.element).on(i.constructor.Event.CLICK,i.config.selector,function(t){return i.toggle(t)});else if(t!==Bn){var e=t===Mn?i.constructor.Event.MOUSEENTER:i.constructor.Event.FOCUSIN,n=t===Mn?i.constructor.Event.MOUSELEAVE:i.constructor.Event.FOCUSOUT;p(i.element).on(e,i.config.selector,function(t){return i._enter(t)}).on(n,i.config.selector,function(t){return i._leave(t)})}}),p(this.element).closest(".modal").on("hide.bs.modal",function(){i.element&&i.hide()}),this.config.selector?this.config=l({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},t._fixTitle=function(){var t=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},t._enter=function(t,e){var n=this.constructor.DATA_KEY;(e=e||p(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),p(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusin"===t.type?Wn:Mn]=!0),p(e.getTipElement()).hasClass(jn)||e._hoverState===Ln?e._hoverState=Ln:(clearTimeout(e._timeout),e._hoverState=Ln,e.config.delay&&e.config.delay.show?e._timeout=setTimeout(function(){e._hoverState===Ln&&e.show()},e.config.delay.show):e.show())},t._leave=function(t,e){var n=this.constructor.DATA_KEY;(e=e||p(t.currentTarget).data(n))||(e=new this.constructor(t.currentTarget,this._getDelegateConfig()),p(t.currentTarget).data(n,e)),t&&(e._activeTrigger["focusout"===t.type?Wn:Mn]=!1),e._isWithActiveTrigger()||(clearTimeout(e._timeout),e._hoverState=xn,e.config.delay&&e.config.delay.hide?e._timeout=setTimeout(function(){e._hoverState===xn&&e.hide()},e.config.delay.hide):e.hide())},t._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},t._getConfig=function(t){var e=p(this.element).data();return Object.keys(e).forEach(function(t){-1!==An.indexOf(t)&&delete e[t]}),"number"==typeof(t=l({},this.constructor.Default,e,"object"==typeof t&&t?t:{})).delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),m.typeCheckConfig(wn,t,this.constructor.DefaultType),t.sanitize&&(t.template=bn(t.template,t.whiteList,t.sanitizeFn)),t},t._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},t._cleanTipClass=function(){var t=p(this.getTipElement()),e=t.attr("class").match(In);null!==e&&e.length&&t.removeClass(e.join(""))},t._handlePopperPlacementChange=function(t){var e=t.instance;this.tip=e.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},t._fixTransition=function(){var t=this.getTipElement(),e=this.config.animation;null===t.getAttribute("x-placement")&&(p(t).removeClass(Hn),this.config.animation=!1,this.hide(),this.show(),this.config.animation=e)},i._jQueryInterface=function(n){return this.each(function(){var t=p(this).data(Cn),e="object"==typeof n&&n;if((t||!/dispose|hide/.test(n))&&(t||(t=new i(this,e),p(this).data(Cn,t)),"string"==typeof n)){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return kn}},{key:"NAME",get:function(){return wn}},{key:"DATA_KEY",get:function(){return Cn}},{key:"Event",get:function(){return Pn}},{key:"EVENT_KEY",get:function(){return Tn}},{key:"DefaultType",get:function(){return On}}]),i}();p.fn[wn]=qn._jQueryInterface,p.fn[wn].Constructor=qn,p.fn[wn].noConflict=function(){return p.fn[wn]=Sn,qn._jQueryInterface};var Kn="popover",Qn="bs.popover",Vn="."+Qn,Yn=p.fn[Kn],zn="bs-popover",Xn=new RegExp("(^|\\s)"+zn+"\\S+","g"),Gn=l({},qn.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),$n=l({},qn.DefaultType,{content:"(string|element|function)"}),Jn="fade",Zn="show",ti=".popover-header",ei=".popover-body",ni={HIDE:"hide"+Vn,HIDDEN:"hidden"+Vn,SHOW:"show"+Vn,SHOWN:"shown"+Vn,INSERTED:"inserted"+Vn,CLICK:"click"+Vn,FOCUSIN:"focusin"+Vn,FOCUSOUT:"focusout"+Vn,MOUSEENTER:"mouseenter"+Vn,MOUSELEAVE:"mouseleave"+Vn},ii=function(t){var e,n;function i(){return t.apply(this,arguments)||this}n=t,(e=i).prototype=Object.create(n.prototype),(e.prototype.constructor=e).__proto__=n;var o=i.prototype;return o.isWithContent=function(){return this.getTitle()||this._getContent()},o.addAttachmentClass=function(t){p(this.getTipElement()).addClass(zn+"-"+t)},o.getTipElement=function(){return this.tip=this.tip||p(this.config.template)[0],this.tip},o.setContent=function(){var t=p(this.getTipElement());this.setElementContent(t.find(ti),this.getTitle());var e=this._getContent();"function"==typeof e&&(e=e.call(this.element)),this.setElementContent(t.find(ei),e),t.removeClass(Jn+" "+Zn)},o._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},o._cleanTipClass=function(){var t=p(this.getTipElement()),e=t.attr("class").match(Xn);null!==e&&0<e.length&&t.removeClass(e.join(""))},i._jQueryInterface=function(n){return this.each(function(){var t=p(this).data(Qn),e="object"==typeof n?n:null;if((t||!/dispose|hide/.test(n))&&(t||(t=new i(this,e),p(this).data(Qn,t)),"string"==typeof n)){if("undefined"==typeof t[n])throw new TypeError('No method named "'+n+'"');t[n]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return Gn}},{key:"NAME",get:function(){return Kn}},{key:"DATA_KEY",get:function(){return Qn}},{key:"Event",get:function(){return ni}},{key:"EVENT_KEY",get:function(){return Vn}},{key:"DefaultType",get:function(){return $n}}]),i}(qn);p.fn[Kn]=ii._jQueryInterface,p.fn[Kn].Constructor=ii,p.fn[Kn].noConflict=function(){return p.fn[Kn]=Yn,ii._jQueryInterface};var oi="scrollspy",ri="bs.scrollspy",si="."+ri,ai=p.fn[oi],li={offset:10,method:"auto",target:""},ci={offset:"number",method:"string",target:"(string|element)"},hi={ACTIVATE:"activate"+si,SCROLL:"scroll"+si,LOAD_DATA_API:"load"+si+".data-api"},ui="dropdown-item",fi="active",di='[data-spy="scroll"]',pi=".nav, .list-group",mi=".nav-link",gi=".nav-item",_i=".list-group-item",vi=".dropdown",yi=".dropdown-item",Ei=".dropdown-toggle",bi="offset",wi="position",Ci=function(){function n(t,e){var n=this;this._element=t,this._scrollElement="BODY"===t.tagName?window:t,this._config=this._getConfig(e),this._selector=this._config.target+" "+mi+","+this._config.target+" "+_i+","+this._config.target+" "+yi,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,p(this._scrollElement).on(hi.SCROLL,function(t){return n._process(t)}),this.refresh(),this._process()}var t=n.prototype;return t.refresh=function(){var e=this,t=this._scrollElement===this._scrollElement.window?bi:wi,o="auto"===this._config.method?t:this._config.method,r=o===wi?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map(function(t){var e,n=m.getSelectorFromElement(t);if(n&&(e=document.querySelector(n)),e){var i=e.getBoundingClientRect();if(i.width||i.height)return[p(e)[o]().top+r,n]}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(t){e._offsets.push(t[0]),e._targets.push(t[1])})},t.dispose=function(){p.removeData(this._element,ri),p(this._scrollElement).off(si),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},t._getConfig=function(t){if("string"!=typeof(t=l({},li,"object"==typeof t&&t?t:{})).target){var e=p(t.target).attr("id");e||(e=m.getUID(oi),p(t.target).attr("id",e)),t.target="#"+e}return m.typeCheckConfig(oi,t,ci),t},t._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},t._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},t._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},t._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),n<=t){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&0<this._offsets[0])return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;){this._activeTarget!==this._targets[o]&&t>=this._offsets[o]&&("undefined"==typeof this._offsets[o+1]||t<this._offsets[o+1])&&this._activate(this._targets[o])}}},t._activate=function(e){this._activeTarget=e,this._clear();var t=this._selector.split(",").map(function(t){return t+'[data-target="'+e+'"],'+t+'[href="'+e+'"]'}),n=p([].slice.call(document.querySelectorAll(t.join(","))));n.hasClass(ui)?(n.closest(vi).find(Ei).addClass(fi),n.addClass(fi)):(n.addClass(fi),n.parents(pi).prev(mi+", "+_i).addClass(fi),n.parents(pi).prev(gi).children(mi).addClass(fi)),p(this._scrollElement).trigger(hi.ACTIVATE,{relatedTarget:e})},t._clear=function(){[].slice.call(document.querySelectorAll(this._selector)).filter(function(t){return t.classList.contains(fi)}).forEach(function(t){return t.classList.remove(fi)})},n._jQueryInterface=function(e){return this.each(function(){var t=p(this).data(ri);if(t||(t=new n(this,"object"==typeof e&&e),p(this).data(ri,t)),"string"==typeof e){if("undefined"==typeof t[e])throw new TypeError('No method named "'+e+'"');t[e]()}})},s(n,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"Default",get:function(){return li}}]),n}();p(window).on(hi.LOAD_DATA_API,function(){for(var t=[].slice.call(document.querySelectorAll(di)),e=t.length;e--;){var n=p(t[e]);Ci._jQueryInterface.call(n,n.data())}}),p.fn[oi]=Ci._jQueryInterface,p.fn[oi].Constructor=Ci,p.fn[oi].noConflict=function(){return p.fn[oi]=ai,Ci._jQueryInterface};var Ti="bs.tab",Si="."+Ti,Di=p.fn.tab,Ii={HIDE:"hide"+Si,HIDDEN:"hidden"+Si,SHOW:"show"+Si,SHOWN:"shown"+Si,CLICK_DATA_API:"click"+Si+".data-api"},Ai="dropdown-menu",Oi="active",Ni="disabled",ki="fade",Li="show",xi=".dropdown",Pi=".nav, .list-group",Hi=".active",ji="> li > .active",Ri='[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',Fi=".dropdown-toggle",Mi="> .dropdown-menu .active",Wi=function(){function i(t){this._element=t}var t=i.prototype;return t.show=function(){var n=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&p(this._element).hasClass(Oi)||p(this._element).hasClass(Ni))){var t,i,e=p(this._element).closest(Pi)[0],o=m.getSelectorFromElement(this._element);if(e){var r="UL"===e.nodeName||"OL"===e.nodeName?ji:Hi;i=(i=p.makeArray(p(e).find(r)))[i.length-1]}var s=p.Event(Ii.HIDE,{relatedTarget:this._element}),a=p.Event(Ii.SHOW,{relatedTarget:i});if(i&&p(i).trigger(s),p(this._element).trigger(a),!a.isDefaultPrevented()&&!s.isDefaultPrevented()){o&&(t=document.querySelector(o)),this._activate(this._element,e);var l=function(){var t=p.Event(Ii.HIDDEN,{relatedTarget:n._element}),e=p.Event(Ii.SHOWN,{relatedTarget:i});p(i).trigger(t),p(n._element).trigger(e)};t?this._activate(t,t.parentNode,l):l()}}},t.dispose=function(){p.removeData(this._element,Ti),this._element=null},t._activate=function(t,e,n){var i=this,o=(!e||"UL"!==e.nodeName&&"OL"!==e.nodeName?p(e).children(Hi):p(e).find(ji))[0],r=n&&o&&p(o).hasClass(ki),s=function(){return i._transitionComplete(t,o,n)};if(o&&r){var a=m.getTransitionDurationFromElement(o);p(o).removeClass(Li).one(m.TRANSITION_END,s).emulateTransitionEnd(a)}else s()},t._transitionComplete=function(t,e,n){if(e){p(e).removeClass(Oi);var i=p(e.parentNode).find(Mi)[0];i&&p(i).removeClass(Oi),"tab"===e.getAttribute("role")&&e.setAttribute("aria-selected",!1)}if(p(t).addClass(Oi),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),m.reflow(t),t.classList.contains(ki)&&t.classList.add(Li),t.parentNode&&p(t.parentNode).hasClass(Ai)){var o=p(t).closest(xi)[0];if(o){var r=[].slice.call(o.querySelectorAll(Fi));p(r).addClass(Oi)}t.setAttribute("aria-expanded",!0)}n&&n()},i._jQueryInterface=function(n){return this.each(function(){var t=p(this),e=t.data(Ti);if(e||(e=new i(this),t.data(Ti,e)),"string"==typeof n){if("undefined"==typeof e[n])throw new TypeError('No method named "'+n+'"');e[n]()}})},s(i,null,[{key:"VERSION",get:function(){return"4.3.1"}}]),i}();p(document).on(Ii.CLICK_DATA_API,Ri,function(t){t.preventDefault(),Wi._jQueryInterface.call(p(this),"show")}),p.fn.tab=Wi._jQueryInterface,p.fn.tab.Constructor=Wi,p.fn.tab.noConflict=function(){return p.fn.tab=Di,Wi._jQueryInterface};var Ui="toast",Bi="bs.toast",qi="."+Bi,Ki=p.fn[Ui],Qi={CLICK_DISMISS:"click.dismiss"+qi,HIDE:"hide"+qi,HIDDEN:"hidden"+qi,SHOW:"show"+qi,SHOWN:"shown"+qi},Vi="fade",Yi="hide",zi="show",Xi="showing",Gi={animation:"boolean",autohide:"boolean",delay:"number"},$i={animation:!0,autohide:!0,delay:500},Ji='[data-dismiss="toast"]',Zi=function(){function i(t,e){this._element=t,this._config=this._getConfig(e),this._timeout=null,this._setListeners()}var t=i.prototype;return t.show=function(){var t=this;p(this._element).trigger(Qi.SHOW),this._config.animation&&this._element.classList.add(Vi);var e=function(){t._element.classList.remove(Xi),t._element.classList.add(zi),p(t._element).trigger(Qi.SHOWN),t._config.autohide&&t.hide()};if(this._element.classList.remove(Yi),this._element.classList.add(Xi),this._config.animation){var n=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,e).emulateTransitionEnd(n)}else e()},t.hide=function(t){var e=this;this._element.classList.contains(zi)&&(p(this._element).trigger(Qi.HIDE),t?this._close():this._timeout=setTimeout(function(){e._close()},this._config.delay))},t.dispose=function(){clearTimeout(this._timeout),this._timeout=null,this._element.classList.contains(zi)&&this._element.classList.remove(zi),p(this._element).off(Qi.CLICK_DISMISS),p.removeData(this._element,Bi),this._element=null,this._config=null},t._getConfig=function(t){return t=l({},$i,p(this._element).data(),"object"==typeof t&&t?t:{}),m.typeCheckConfig(Ui,t,this.constructor.DefaultType),t},t._setListeners=function(){var t=this;p(this._element).on(Qi.CLICK_DISMISS,Ji,function(){return t.hide(!0)})},t._close=function(){var t=this,e=function(){t._element.classList.add(Yi),p(t._element).trigger(Qi.HIDDEN)};if(this._element.classList.remove(zi),this._config.animation){var n=m.getTransitionDurationFromElement(this._element);p(this._element).one(m.TRANSITION_END,e).emulateTransitionEnd(n)}else e()},i._jQueryInterface=function(n){return this.each(function(){var t=p(this),e=t.data(Bi);if(e||(e=new i(this,"object"==typeof n&&n),t.data(Bi,e)),"string"==typeof n){if("undefined"==typeof e[n])throw new TypeError('No method named "'+n+'"');e[n](this)}})},s(i,null,[{key:"VERSION",get:function(){return"4.3.1"}},{key:"DefaultType",get:function(){return Gi}},{key:"Default",get:function(){return $i}}]),i}();p.fn[Ui]=Zi._jQueryInterface,p.fn[Ui].Constructor=Zi,p.fn[Ui].noConflict=function(){return p.fn[Ui]=Ki,Zi._jQueryInterface},function(){if("undefined"==typeof p)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var t=p.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||1===t[0]&&9===t[1]&&t[2]<1||4<=t[0])throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}(),t.Util=m,t.Alert=g,t.Button=k,t.Carousel=at,t.Collapse=Ct,t.Dropdown=Xe,t.Modal=gn,t.Popover=ii,t.Scrollspy=Ci,t.Tab=Wi,t.Toast=Zi,t.Tooltip=qn,Object.defineProperty(t,"__esModule",{value:!0})});

/*!
* metismenu https://github.com/onokumus/metismenu#readme
* A jQuery menu plugin
* @version 3.0.4
* @author Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
* @license: MIT 
*/

!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],n):(e=e||self).metisMenu=n(e.jQuery)}(this,function(o){"use strict";function s(){return(s=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e}).apply(this,arguments)}var a=function(i){var n="transitionend",r={TRANSITION_END:"mmTransitionEnd",triggerTransitionEnd:function(e){i(e).trigger(n)},supportsTransitionEnd:function(){return Boolean(n)}};function e(e){var n=this,t=!1;return i(this).one(r.TRANSITION_END,function(){t=!0}),setTimeout(function(){t||r.triggerTransitionEnd(n)},e),this}return i.fn.mmEmulateTransitionEnd=e,i.event.special[r.TRANSITION_END]={bindType:n,delegateType:n,handle:function(e){if(i(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}},r}(o=o&&o.hasOwnProperty("default")?o.default:o),e="metisMenu",g="metisMenu",n="."+g,t=o.fn[e],h={toggle:!0,preventDefault:!0,triggerElement:"a",parentTrigger:"li",subMenu:"ul"},l={SHOW:"show"+n,SHOWN:"shown"+n,HIDE:"hide"+n,HIDDEN:"hidden"+n,CLICK_DATA_API:"click"+n+".data-api"},i="metismenu",f="mm-active",u="mm-show",d="mm-collapse",c="mm-collapsing",r=function(){function r(e,n){this.element=e,this.config=s({},h,n),this.transitioning=null,this.init()}var e=r.prototype;return e.init=function(){var s=this,a=this.config,e=o(this.element);e.addClass(i),e.find(a.parentTrigger+"."+f).children(a.triggerElement).attr("aria-expanded","true"),e.find(a.parentTrigger+"."+f).parents(a.parentTrigger).addClass(f),e.find(a.parentTrigger+"."+f).parents(a.parentTrigger).children(a.triggerElement).attr("aria-expanded","true"),e.find(a.parentTrigger+"."+f).has(a.subMenu).children(a.subMenu).addClass(d+" "+u),e.find(a.parentTrigger).not("."+f).has(a.subMenu).children(a.subMenu).addClass(d),e.find(a.parentTrigger).children(a.triggerElement).on(l.CLICK_DATA_API,function(e){var n=o(this);if("true"!==n.attr("aria-disabled")){a.preventDefault&&"#"===n.attr("href")&&e.preventDefault();var t=n.parent(a.parentTrigger),i=t.siblings(a.parentTrigger),r=i.children(a.triggerElement);t.hasClass(f)?(n.attr("aria-expanded","false"),s.removeActive(t)):(n.attr("aria-expanded","true"),s.setActive(t),a.toggle&&(s.removeActive(i),r.attr("aria-expanded","false"))),a.onTransitionStart&&a.onTransitionStart(e)}})},e.setActive=function(e){o(e).addClass(f);var n=o(e).children(this.config.subMenu);0<n.length&&!n.hasClass(u)&&this.show(n)},e.removeActive=function(e){o(e).removeClass(f);var n=o(e).children(this.config.subMenu+"."+u);0<n.length&&this.hide(n)},e.show=function(e){var n=this;if(!this.transitioning&&!o(e).hasClass(c)){var t=o(e),i=o.Event(l.SHOW);if(t.trigger(i),!i.isDefaultPrevented()){if(t.parent(this.config.parentTrigger).addClass(f),this.config.toggle){var r=t.parent(this.config.parentTrigger).siblings().children(this.config.subMenu+"."+u);this.hide(r)}t.removeClass(d).addClass(c).height(0),this.setTransitioning(!0);t.height(e[0].scrollHeight).one(a.TRANSITION_END,function(){n.config&&n.element&&(t.removeClass(c).addClass(d+" "+u).height(""),n.setTransitioning(!1),t.trigger(l.SHOWN))}).mmEmulateTransitionEnd(350)}}},e.hide=function(e){var n=this;if(!this.transitioning&&o(e).hasClass(u)){var t=o(e),i=o.Event(l.HIDE);if(t.trigger(i),!i.isDefaultPrevented()){t.parent(this.config.parentTrigger).removeClass(f),t.height(t.height())[0].offsetHeight,t.addClass(c).removeClass(d).removeClass(u),this.setTransitioning(!0);var r=function(){n.config&&n.element&&(n.transitioning&&n.config.onTransitionEnd&&n.config.onTransitionEnd(),n.setTransitioning(!1),t.trigger(l.HIDDEN),t.removeClass(c).addClass(d))};0===t.height()||"none"===t.css("display")?r():t.height(0).one(a.TRANSITION_END,r).mmEmulateTransitionEnd(350)}}},e.setTransitioning=function(e){this.transitioning=e},e.dispose=function(){o.removeData(this.element,g),o(this.element).find(this.config.parentTrigger).has(this.config.subMenu).children(this.config.triggerElement).off("click"),this.transitioning=null,this.config=null,this.element=null},r.jQueryInterface=function(i){return this.each(function(){var e=o(this),n=e.data(g),t=s({},h,e.data(),"object"==typeof i&&i?i:{});if(n||(n=new r(this,t),e.data(g,n)),"string"==typeof i){if(void 0===n[i])throw new Error('No method named "'+i+'"');n[i]()}})},r}();return o.fn[e]=r.jQueryInterface,o.fn[e].Constructor=r,o.fn[e].noConflict=function(){return o.fn[e]=t,r.jQueryInterface},r});

// By: Hans Fj�llemark and John Papa
// https://github.com/CodeSeven/toastr
// 
// Modified to support css styling instead of inline styling
// Inspired by https://github.com/Srirangan/notifer.js/

;(function(window, $) {
    window.toastr = (function() {
        var 
            defaults = {
                tapToDismiss: true,
                toastClass: 'toast',
                containerId: 'toast-container',
                debug: false,
                fadeIn: 300,
                fadeOut: 1000,
                extendedTimeOut: 1000,
                iconClasses: {
                    error: 'toast-error',
                    info: 'toast-info',
                    success: 'toast-success',
                    warning: 'toast-warning'
                },
                iconClass: 'toast-info',
                positionClass: 'toast-top-right',
                timeOut: 5000, // Set timeOut to 0 to make it sticky
                titleClass: 'toast-title',
                messageClass: 'toast-message'
            },


            error = function(message, title) {
                return notify({
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    title: title
                })
            },

            getContainer = function(options) {
                var $container = $('#' + options.containerId)

                if ($container.length)
                    return $container

                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass)

                $container.appendTo($('body'))

                return $container
            },

            getOptions = function() {
                return $.extend({}, defaults, toastr.options)
            },

            info = function(message, title) {
                return notify({
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    title: title
                })
            },

            notify = function(map) {
                var 
                    options = getOptions(),
                    iconClass = map.iconClass || options.iconClass,
                    intervalId = null,
                    $container = getContainer(options),
                    $toastElement = $('<div/>'),
                    $titleElement = $('<div/>'),
                    $messageElement = $('<div/>'),
                    response = { options: options, map: map }

                if (map.iconClass) {
                    $toastElement.addClass(options.toastClass).addClass(iconClass)
                }

                if (map.title) {
                    $titleElement.append(map.title).addClass(options.titleClass)
                    $toastElement.append($titleElement)
                }

                if (map.message) {
                    $messageElement.append(map.message).addClass(options.messageClass)
                    $toastElement.append($messageElement)
                }

                var fadeAway = function() {
                    if ($(':focus', $toastElement).length > 0)
                		return
                	
                    var fade = function() {
                        return $toastElement.fadeOut(options.fadeOut)
                    }

                    $.when(fade()).done(function() {
                        if ($toastElement.is(':visible')) {
                            return
                        }
                        $toastElement.remove()
                        if ($container.children().length === 0)
                            $container.remove()
                    })
                }

                var delayedFadeAway = function() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(fadeAway, options.extendedTimeOut)
                    }
                }

                var stickAround = function() {
                    clearTimeout(intervalId)
                    $toastElement.stop(true, true)
                        .fadeIn(options.fadeIn)
                }

                $toastElement.hide()
                $container.prepend($toastElement)
                $toastElement.fadeIn(options.fadeIn)

                if (options.timeOut > 0) {
                    intervalId = setTimeout(fadeAway, options.timeOut)
                }

                $toastElement.hover(stickAround, delayedFadeAway)

                if (options.tapToDismiss) {
                    $toastElement.click(fadeAway)
                }

                if (options.debug) {
                    console.log(response)
                }
                return $toastElement
            },

            success = function(message, title) {
                return notify({
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    title: title
                })
            },

            warning = function(message, title) {
                return notify({
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    title: title
                })
            }

        return {
            error: error,
            info: info,
            options: {},
            success: success,
            warning: warning
        }
    })()
} (window, jQuery));
/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/main/actionview/app/assets/javascripts
Released under the MIT license
 */
;

(function() {
  var context = this;

  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form:not([data-turbo=true])',
        formInputClickSelector: 'form:not([data-turbo=true]) input[type=submit], form:not([data-turbo=true]) input[type=image], form:not([data-turbo=true]) button[type=submit], form:not([data-turbo=true]) button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(context);

  var Rails = context.Rails;

  (function() {
    (function() {
      var nonce;

      nonce = null;

      Rails.loadCSPNonce = function() {
        var ref;
        return nonce = (ref = document.querySelector("meta[name=csp-nonce]")) != null ? ref.content : void 0;
      };

      Rails.cspNonce = function() {
        return nonce != null ? nonce : Rails.loadCSPNonce();
      };

    }).call(this);
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.isContentEditable = function(element) {
        var isEditable;
        isEditable = false;
        while (true) {
          if (element.isContentEditable) {
            isEditable = true;
            break;
          }
          element = element.parentElement;
          if (!element) {
            break;
          }
        }
        return isEditable;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches, preventDefault;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
        preventDefault = CustomEvent.prototype.preventDefault;
        CustomEvent.prototype.preventDefault = function() {
          var result;
          result = preventDefault.call(this);
          if (this.cancelable && !this.defaultPrevented) {
            Object.defineProperty(this, 'defaultPrevented', {
              get: function() {
                return true;
              }
            });
          }
          return result;
        };
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, cspNonce, fire, prepareOptions, processResponse;

      cspNonce = Rails.cspNonce, CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var ref, response;
          response = processResponse((ref = xhr.response) != null ? ref : xhr.responseText, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if ((options.beforeSend != null) && !options.beforeSend(xhr, options)) {
          return false;
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        }
      };

      prepareOptions = function(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          CSRFProtection(xhr);
        }
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.setAttribute('nonce', cspNonce());
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name || input.disabled) {
            return;
          }
          if (matches(input, 'fieldset[disabled] *')) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      Rails.confirm = function(message, element) {
        return confirm(message);
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = Rails.confirm(message, element);
          } catch (error) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, isContentEditable, isXhrRedirect, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements, isContentEditable = Rails.isContentEditable;

      Rails.handleDisabledElement = function(e) {
        var element;
        element = this;
        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function(e) {
        var element;
        if (e instanceof Event) {
          if (isXhrRedirect(e)) {
            return;
          }
          element = e.target;
        } else {
          element = e;
        }
        if (isContentEditable(element)) {
          return;
        }
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (isContentEditable(element)) {
          return;
        }
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        if (getData(element, 'ujs:disabled')) {
          return;
        }
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        if (getData(element, 'ujs:disabled')) {
          return;
        }
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

      isXhrRedirect = function(event) {
        var ref, xhr;
        xhr = (ref = event.detail) != null ? ref[0] : void 0;
        return (xhr != null ? xhr.getResponseHeader("X-Xhr-Redirect") : void 0) != null;
      };

    }).call(this);
    (function() {
      var isContentEditable, stopEverything;

      stopEverything = Rails.stopEverything;

      isContentEditable = Rails.isContentEditable;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        if (isContentEditable(this)) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isContentEditable, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement, isContentEditable = Rails.isContentEditable;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        if (isContentEditable(element)) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return false;
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.preventInsignificantClick = function(e) {
        var data, insignificantMetaClick, link, metaClick, method, nonPrimaryMouseClick;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        insignificantMetaClick = metaClick && method === 'GET' && !data;
        nonPrimaryMouseClick = (e.button != null) && e.button !== 0;
        if (nonPrimaryMouseClick || insignificantMetaClick) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMethod, handleRemote, loadCSPNonce, preventInsignificantClick, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, loadCSPNonce = Rails.loadCSPNonce, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, preventInsignificantClick = Rails.preventInsignificantClick, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null)) {
        if (jQuery.rails) {
          throw new Error('If you load both jquery_ujs and rails-ujs, use rails-ujs only.');
        }
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', preventInsignificantClick);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', preventInsignificantClick);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', preventInsignificantClick);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        document.addEventListener('DOMContentLoaded', loadCSPNonce);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (typeof define === "function" && define.amd) {
    define(Rails);
  }
}).call(this);
!function(t,e){"use strict";"function"==typeof define&&define.amd?define([],function(){return t.Waves=e.call(t),t.Waves}):"object"==typeof exports?module.exports=e.call(t):t.Waves=e.call(t)}("object"==typeof global?global:this,function(){"use strict";function t(t){return null!==t&&t===t.window}function e(e){return t(e)?e:9===e.nodeType&&e.defaultView}function n(t){var e=typeof t;return"function"===e||"object"===e&&!!t}function o(t){return n(t)&&t.nodeType>0}function a(t){var e=f.call(t);return"[object String]"===e?d(t):n(t)&&/^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(e)&&t.hasOwnProperty("length")?t:o(t)?[t]:[]}function i(t){var n,o,a={top:0,left:0},i=t&&t.ownerDocument;return n=i.documentElement,void 0!==t.getBoundingClientRect&&(a=t.getBoundingClientRect()),o=e(i),{top:a.top+o.pageYOffset-n.clientTop,left:a.left+o.pageXOffset-n.clientLeft}}function r(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e+=n+":"+t[n]+";");return e}function s(t,e,n){if(n){n.classList.remove("waves-rippling");var o=n.getAttribute("data-x"),a=n.getAttribute("data-y"),i=n.getAttribute("data-scale"),s=n.getAttribute("data-translate"),u=350-(Date.now()-Number(n.getAttribute("data-hold")));u<0&&(u=0),"mousemove"===t.type&&(u=150);var c="mousemove"===t.type?2500:v.duration;setTimeout(function(){var t={top:a+"px",left:o+"px",opacity:"0","-webkit-transition-duration":c+"ms","-moz-transition-duration":c+"ms","-o-transition-duration":c+"ms","transition-duration":c+"ms","-webkit-transform":i+" "+s,"-moz-transform":i+" "+s,"-ms-transform":i+" "+s,"-o-transform":i+" "+s,transform:i+" "+s};n.setAttribute("style",r(t)),setTimeout(function(){try{e.removeChild(n)}catch(t){return!1}},c)},u)}}function u(t){if(!1===h.allowEvent(t))return null;for(var e=null,n=t.target||t.srcElement;n.parentElement;){if(!(n instanceof SVGElement)&&n.classList.contains("waves-effect")){e=n;break}n=n.parentElement}return e}function c(t){var e=u(t);if(null!==e){if(e.disabled||e.getAttribute("disabled")||e.classList.contains("disabled"))return;if(h.registerEvent(t),"touchstart"===t.type&&v.delay){var n=!1,o=setTimeout(function(){o=null,v.show(t,e)},v.delay),a=function(a){o&&(clearTimeout(o),o=null,v.show(t,e)),n||(n=!0,v.hide(a,e)),r()},i=function(t){o&&(clearTimeout(o),o=null),a(t),r()};e.addEventListener("touchmove",i,!1),e.addEventListener("touchend",a,!1),e.addEventListener("touchcancel",a,!1);var r=function(){e.removeEventListener("touchmove",i),e.removeEventListener("touchend",a),e.removeEventListener("touchcancel",a)}}else v.show(t,e),m&&(e.addEventListener("touchend",v.hide,!1),e.addEventListener("touchcancel",v.hide,!1)),e.addEventListener("mouseup",v.hide,!1),e.addEventListener("mouseleave",v.hide,!1)}}var l=l||{},d=document.querySelectorAll.bind(document),f=Object.prototype.toString,m="ontouchstart"in window,v={duration:750,delay:200,show:function(t,e,n){if(2===t.button)return!1;e=e||this;var o=document.createElement("div");o.className="waves-ripple waves-rippling",e.appendChild(o);var a=i(e),s=0,u=0;"touches"in t&&t.touches.length?(s=t.touches[0].pageY-a.top,u=t.touches[0].pageX-a.left):(s=t.pageY-a.top,u=t.pageX-a.left),u=u>=0?u:0,s=s>=0?s:0;var c="scale("+e.clientWidth/100*3+")",l="translate(0,0)";n&&(l="translate("+n.x+"px, "+n.y+"px)"),o.setAttribute("data-hold",Date.now()),o.setAttribute("data-x",u),o.setAttribute("data-y",s),o.setAttribute("data-scale",c),o.setAttribute("data-translate",l);var d={top:s+"px",left:u+"px"};o.classList.add("waves-notransition"),o.setAttribute("style",r(d)),o.classList.remove("waves-notransition"),d["-webkit-transform"]=c+" "+l,d["-moz-transform"]=c+" "+l,d["-ms-transform"]=c+" "+l,d["-o-transform"]=c+" "+l,d.transform=c+" "+l,d.opacity="1";var f="mousemove"===t.type?2500:v.duration;d["-webkit-transition-duration"]=f+"ms",d["-moz-transition-duration"]=f+"ms",d["-o-transition-duration"]=f+"ms",d["transition-duration"]=f+"ms",o.setAttribute("style",r(d))},hide:function(t,e){for(var n=(e=e||this).getElementsByClassName("waves-rippling"),o=0,a=n.length;o<a;o++)s(t,e,n[o]);m&&(e.removeEventListener("touchend",v.hide),e.removeEventListener("touchcancel",v.hide)),e.removeEventListener("mouseup",v.hide),e.removeEventListener("mouseleave",v.hide)}},p={input:function(t){var e=t.parentNode;if("i"!==e.tagName.toLowerCase()||!e.classList.contains("waves-effect")){var n=document.createElement("i");n.className=t.className+" waves-input-wrapper",t.className="waves-button-input",e.replaceChild(n,t),n.appendChild(t);var o=window.getComputedStyle(t,null),a=o.color,i=o.backgroundColor;n.setAttribute("style","color:"+a+";background:"+i),t.setAttribute("style","background-color:rgba(0,0,0,0);")}},img:function(t){var e=t.parentNode;if("i"!==e.tagName.toLowerCase()||!e.classList.contains("waves-effect")){var n=document.createElement("i");e.replaceChild(n,t),n.appendChild(t)}}},h={touches:0,allowEvent:function(t){var e=!0;return/^(mousedown|mousemove)$/.test(t.type)&&h.touches&&(e=!1),e},registerEvent:function(t){var e=t.type;"touchstart"===e?h.touches+=1:/^(touchend|touchcancel)$/.test(e)&&setTimeout(function(){h.touches&&(h.touches-=1)},500)}};return l.init=function(t){var e=document.body;"duration"in(t=t||{})&&(v.duration=t.duration),"delay"in t&&(v.delay=t.delay),m&&(e.addEventListener("touchstart",c,!1),e.addEventListener("touchcancel",h.registerEvent,!1),e.addEventListener("touchend",h.registerEvent,!1)),e.addEventListener("mousedown",c,!1)},l.attach=function(t,e){t=a(t),"[object Array]"===f.call(e)&&(e=e.join(" ")),e=e?" "+e:"";for(var n,o,i=0,r=t.length;i<r;i++)o=(n=t[i]).tagName.toLowerCase(),-1!==["input","img"].indexOf(o)&&(p[o](n),n=n.parentElement),-1===n.className.indexOf("waves-effect")&&(n.className+=" waves-effect"+e)},l.ripple=function(t,e){var n=(t=a(t)).length;if(e=e||{},e.wait=e.wait||0,e.position=e.position||null,n)for(var o,r,s,u={},c=0,l={type:"mousedown",button:1};c<n;c++)if(o=t[c],r=e.position||{x:o.clientWidth/2,y:o.clientHeight/2},s=i(o),u.x=s.left+r.x,u.y=s.top+r.y,l.pageX=u.x,l.pageY=u.y,v.show(l,o),e.wait>=0&&null!==e.wait){var d={type:"mouseup",button:1};setTimeout(function(t,e){return function(){v.hide(t,e)}}(d,o),e.wait)}},l.calm=function(t){for(var e={type:"mouseup",button:1},n=0,o=(t=a(t)).length;n<o;n++)v.hide(e,t[n])},l.displayEffect=function(t){l.init(t)},l});

/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */

(function(e){e.fn.extend({slimScroll:function(f){var a=e.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},f);this.each(function(){function v(d){if(r){d=d||window.event;
var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);e(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&n(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function n(d,g,e){k=!1;var f=b.outerHeight()-c.outerHeight();g&&(g=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),g=Math.min(Math.max(g,0),f),g=0<d?Math.ceil(g):Math.floor(g),c.css({top:g+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());g=
l*(b[0].scrollHeight-b.outerHeight());e&&(g=d,d=g/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),f),c.css({top:d+"px"}));b.scrollTop(g);b.trigger("slimscrolling",~~g);w();p()}function x(){u=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),30);c.css({height:u+"px"});var a=u==b.outerHeight()?"none":"block";c.css({display:a})}function w(){x();clearTimeout(B);l==~~l?(k=a.allowPageScroll,C!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;C=l;u>=b.outerHeight()?k=!0:(c.stop(!0,
!0).fadeIn("fast"),a.railVisible&&m.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(B=setTimeout(function(){a.disableFadeOut&&r||y||z||(c.fadeOut("slow"),m.fadeOut("slow"))},1E3))}var r,y,z,B,A,u,l,C,k=!1,b=e(this);if(b.parent().hasClass(a.wrapperClass)){var q=b.scrollTop(),c=b.siblings("."+a.barClass),m=b.siblings("."+a.railClass);x();if(e.isPlainObject(f)){if("height"in f&&"auto"==f.height){b.parent().css("height","auto");b.css("height","auto");var h=b.parent().parent().height();b.parent().css("height",
h);b.css("height",h)}else"height"in f&&(h=f.height,b.parent().css("height",h),b.css("height",h));if("scrollTo"in f)q=parseInt(a.scrollTo);else if("scrollBy"in f)q+=parseInt(a.scrollBy);else if("destroy"in f){c.remove();m.remove();b.unwrap();return}n(q,!1,!0)}}else if(!(e.isPlainObject(f)&&"destroy"in f)){a.height="auto"==a.height?b.parent().height():a.height;q=e("<div></div>").addClass(a.wrapperClass).css({position:"relative",overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",
width:a.width,height:a.height});var m=e("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=e("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,
WebkitBorderRadius:a.borderRadius,zIndex:99}),h="right"==a.position?{right:a.distance}:{left:a.distance};m.css(h);c.css(h);b.wrap(q);b.parent().append(c);b.parent().append(m);a.railDraggable&&c.bind("mousedown",function(a){var b=e(document);z=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);n(0,c.position().top,!1)});b.bind("mouseup.slimscroll",function(a){z=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",
function(a){a.stopPropagation();a.preventDefault();return!1});m.hover(function(){w()},function(){p()});c.hover(function(){y=!0},function(){y=!1});b.hover(function(){r=!0;w();p()},function(){r=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(A=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&(n((A-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),A=b.originalEvent.touches[0].pageY)});
x();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),n(0,!0)):"top"!==a.start&&(n(e(a.start).position().top,null,!0),a.alwaysVisible||c.hide());window.addEventListener?(this.addEventListener("DOMMouseScroll",v,!1),this.addEventListener("mousewheel",v,!1)):document.attachEvent("onmousewheel",v)}});return this}});e.fn.extend({slimscroll:e.fn.slimScroll})})(jQuery);
/*!
 * ApexCharts v3.6.9
 * (c) 2018-2019 Juned Chhipa
 * Released under the MIT License.
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).ApexCharts=e()}(this,function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function s(t,e,s){return e&&i(t.prototype,e),s&&i(t,s),t}function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function n(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},s=Object.keys(i);"function"==typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),s.forEach(function(e){a(t,e,i[e])})}return t}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}function o(t){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var d=function(){function i(){e(this,i)}return s(i,[{key:"shadeRGBColor",value:function(t,e){var i=e.split(","),s=t<0?0:255,a=t<0?-1*t:t,n=parseInt(i[0].slice(4)),r=parseInt(i[1]),o=parseInt(i[2]);return"rgb("+(Math.round((s-n)*a)+n)+","+(Math.round((s-r)*a)+r)+","+(Math.round((s-o)*a)+o)+")"}},{key:"shadeHexColor",value:function(t,e){var i=parseInt(e.slice(1),16),s=t<0?0:255,a=t<0?-1*t:t,n=i>>16,r=i>>8&255,o=255&i;return"#"+(16777216+65536*(Math.round((s-n)*a)+n)+256*(Math.round((s-r)*a)+r)+(Math.round((s-o)*a)+o)).toString(16).slice(1)}},{key:"shadeColor",value:function(t,e){return e.length>7?this.shadeRGBColor(t,e):this.shadeHexColor(t,e)}}],[{key:"bind",value:function(t,e){return function(){return t.apply(e,arguments)}}},{key:"isObject",value:function(e){return e&&"object"===t(e)&&!Array.isArray(e)&&null!=e}},{key:"listToArray",value:function(t){var e,i=[];for(e=0;e<t.length;e++)i[e]=t[e];return i}},{key:"extend",value:function(t,e){var i=this;"function"!=typeof Object.assign&&(Object.assign=function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),i=1;i<arguments.length;i++){var s=arguments[i];if(null!=s)for(var a in s)s.hasOwnProperty(a)&&(e[a]=s[a])}return e});var s=Object.assign({},t);return this.isObject(t)&&this.isObject(e)&&Object.keys(e).forEach(function(n){i.isObject(e[n])&&n in t?s[n]=i.extend(t[n],e[n]):Object.assign(s,a({},n,e[n]))}),s}},{key:"extendArray",value:function(t,e){var s=[];return t.map(function(t){s.push(i.extend(e,t))}),t=s}},{key:"monthMod",value:function(t){return t%12}},{key:"addProps",value:function(t,e,i){"string"==typeof e&&(e=e.split(".")),t[e[0]]=t[e[0]]||{};var s=t[e[0]];return e.length>1?(e.shift(),this.addProps(s,e,i)):t[e[0]]=i,t}},{key:"clone",value:function(e){if("[object Array]"===Object.prototype.toString.call(e)){for(var i=[],s=0;s<e.length;s++)i[s]=this.clone(e[s]);return i}if("object"===t(e)){var a={};for(var n in e)e.hasOwnProperty(n)&&(a[n]=this.clone(e[n]));return a}return e}},{key:"log10",value:function(t){return Math.log(t)/Math.LN10}},{key:"roundToBase10",value:function(t){return Math.pow(10,Math.floor(Math.log10(t)))}},{key:"roundToBase",value:function(t,e){return Math.pow(e,Math.floor(Math.log(t)/Math.log(e)))}},{key:"parseNumber",value:function(t){return null===t?t:parseFloat(t)}},{key:"noExponents",value:function(t){var e=String(t).split(/[eE]/);if(1==e.length)return e[0];var i="",s=t<0?"-":"",a=e[0].replace(".",""),n=Number(e[1])+1;if(n<0){for(i=s+"0.";n++;)i+="0";return i+a.replace(/^\-/,"")}for(n-=a.length;n--;)i+="0";return a+i}},{key:"getDimensions",value:function(t){var e=getComputedStyle(t),i=[],s=t.clientHeight,a=t.clientWidth;return s-=parseFloat(e.paddingTop)+parseFloat(e.paddingBottom),a-=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight),i.push(a),i.push(s),i}},{key:"getBoundingClientRect",value:function(t){var e=t.getBoundingClientRect();return{top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.width,height:e.height,x:e.x,y:e.y}}},{key:"hexToRgba",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#999999",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.6;"#"!==t.substring(0,1)&&(t="#999999");var i=t.replace("#","");i=i.match(new RegExp("(.{"+i.length/3+"})","g"));for(var s=0;s<i.length;s++)i[s]=parseInt(1===i[s].length?i[s]+i[s]:i[s],16);return void 0!==e&&i.push(e),"rgba("+i.join(",")+")"}},{key:"getOpacityFromRGBA",value:function(t){return(t=t.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))[3]}},{key:"rgb2hex",value:function(t){return(t=t.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===t.length?"#"+("0"+parseInt(t[1],10).toString(16)).slice(-2)+("0"+parseInt(t[2],10).toString(16)).slice(-2)+("0"+parseInt(t[3],10).toString(16)).slice(-2):""}},{key:"isColorHex",value:function(t){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)}},{key:"polarToCartesian",value:function(t,e,i,s){var a=(s-90)*Math.PI/180;return{x:t+i*Math.cos(a),y:e+i*Math.sin(a)}}},{key:"escapeString",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"x",i=t.toString().slice();return i=i.replace(/[` ~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,e)}},{key:"negToZero",value:function(t){return t<0?0:t}},{key:"moveIndexInArray",value:function(t,e,i){if(i>=t.length)for(var s=i-t.length+1;s--;)t.push(void 0);return t.splice(i,0,t.splice(e,1)[0]),t}},{key:"extractNumber",value:function(t){return parseFloat(t.replace(/[^\d\.]*/g,""))}},{key:"randomString",value:function(t){for(var e="",i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",s=0;s<t;s++)e+=i.charAt(Math.floor(Math.random()*i.length));return e}},{key:"findAncestor",value:function(t,e){for(;(t=t.parentElement)&&!t.classList.contains(e););return t}},{key:"setELstyles",value:function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t.style.key=e[i])}},{key:"isNumber",value:function(t){return!isNaN(t)&&parseFloat(Number(t))===t&&!isNaN(parseInt(t,10))}},{key:"isFloat",value:function(t){return Number(t)===t&&t%1!=0}},{key:"isSafari",value:function(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)}},{key:"isFirefox",value:function(){return navigator.userAgent.toLowerCase().indexOf("firefox")>-1}},{key:"isIE11",value:function(){if(-1!==window.navigator.userAgent.indexOf("MSIE")||window.navigator.appVersion.indexOf("Trident/")>-1)return!0}},{key:"isIE",value:function(){var t=window.navigator.userAgent,e=t.indexOf("MSIE ");if(e>0)return parseInt(t.substring(e+5,t.indexOf(".",e)),10);if(t.indexOf("Trident/")>0){var i=t.indexOf("rv:");return parseInt(t.substring(i+3,t.indexOf(".",i)),10)}var s=t.indexOf("Edge/");return s>0&&parseInt(t.substring(s+5,t.indexOf(".",s)),10)}}]),i}(),u=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w}return s(t,[{key:"getDefaultFilter",value:function(t,e){var i=this.w;t.unfilter(!0),(new window.SVG.Filter).size("120%","180%","-5%","-40%"),"none"!==i.config.states.normal.filter?this.applyFilter(t,e,i.config.states.normal.filter.type,i.config.states.normal.filter.value):i.config.chart.dropShadow.enabled&&this.dropShadow(t,i.config.chart.dropShadow,e)}},{key:"addNormalFilter",value:function(t,e){var i=this.w;i.config.chart.dropShadow.enabled&&this.dropShadow(t,i.config.chart.dropShadow,e)}},{key:"addLightenFilter",value:function(t,e,i){var s=this,a=this.w,n=i.intensity;if(!d.isFirefox()){t.unfilter(!0);var r=new window.SVG.Filter;r.size("120%","180%","-5%","-40%"),t.filter(function(t){var i=a.config.chart.dropShadow;(r=i.enabled?s.addShadow(t,e,i):t).componentTransfer({rgb:{type:"linear",slope:1.5,intercept:n}})}),t.filterer.node.setAttribute("filterUnits","userSpaceOnUse")}}},{key:"addDarkenFilter",value:function(t,e,i){var s=this,a=this.w,n=i.intensity;if(!d.isFirefox()){t.unfilter(!0);var r=new window.SVG.Filter;r.size("120%","180%","-5%","-40%"),t.filter(function(t){var i=a.config.chart.dropShadow;(r=i.enabled?s.addShadow(t,e,i):t).componentTransfer({rgb:{type:"linear",slope:n}})}),t.filterer.node.setAttribute("filterUnits","userSpaceOnUse")}}},{key:"applyFilter",value:function(t,e,i){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.5;switch(i){case"none":this.addNormalFilter(t,e);break;case"lighten":this.addLightenFilter(t,e,{intensity:s});break;case"darken":this.addDarkenFilter(t,e,{intensity:s})}}},{key:"addShadow",value:function(t,e,i){var s=i.blur,a=i.top,n=i.left,r=i.color,o=i.opacity,l=t.flood(Array.isArray(r)?r[e]:r,o).composite(t.sourceAlpha,"in").offset(n,a).gaussianBlur(s).merge(t.source);return t.blend(t.source,l)}},{key:"dropShadow",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=e.top,a=e.left,n=e.blur,r=e.color,o=e.opacity,l=e.noUserSpaceOnUse;return t.unfilter(!0),r=Array.isArray(r)?r[i]:r,(new window.SVG.Filter).size("120%","180%","-5%","-40%"),t.filter(function(t){var e=null;e=d.isSafari()||d.isFirefox()||d.isIE()?t.flood(r,o).composite(t.sourceAlpha,"in").offset(a,s).gaussianBlur(n):t.flood(r,o).composite(t.sourceAlpha,"in").offset(a,s).gaussianBlur(n).merge(t.source),t.blend(t.source,e)}),l||t.filterer.node.setAttribute("filterUnits","userSpaceOnUse"),t}},{key:"setSelectionFilter",value:function(t,e,i){var s=this.w;if(void 0!==s.globals.selectedDataPoints[e]&&s.globals.selectedDataPoints[e].indexOf(i)>-1){t.node.setAttribute("selected",!0);var a=s.config.states.active.filter;"none"!==a&&this.applyFilter(t,realindex,a.type,a.value)}}}]),t}(),g=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.setEasingFunctions()}return s(t,[{key:"setEasingFunctions",value:function(){var t;switch(this.w.config.chart.animations.easing){case"linear":t="-";break;case"easein":t="<";break;case"easeout":t=">";break;case"easeinout":t="<>";break;case"swing":t=function(t){var e=1.70158;return(t-=1)*t*((e+1)*t+e)+1};break;case"bounce":t=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375};break;case"elastic":t=function(t){return t===!!t?t:Math.pow(2,-10*t)*Math.sin((t-.075)*(2*Math.PI)/.3)+1};break;default:t="<>"}this.w.globals.easing=t}},{key:"animateLine",value:function(t,e,i,s){t.attr(e).animate(s).attr(i)}},{key:"animateCircleRadius",value:function(t,e,i,s,a){e||(e=0),t.attr({r:e}).animate(s,a).attr({r:i})}},{key:"animateCircle",value:function(t,e,i,s,a){t.attr({r:e.r,cx:e.cx,cy:e.cy}).animate(s,a).attr({r:i.r,cx:i.cx,cy:i.cy})}},{key:"animateRect",value:function(t,e,i,s,a){t.attr(e).animate(s).attr(i).afterAll(function(){a()})}},{key:"animatePathsGradually",value:function(t){var e=t.el,i=t.j,s=t.pathFrom,a=t.pathTo,n=t.speed,r=t.delay,o=t.strokeWidth,l=this.w,h=0;l.config.chart.animations.animateGradually.enabled&&(h=l.config.chart.animations.animateGradually.delay),l.config.chart.animations.dynamicAnimation.enabled&&l.globals.dataChanged&&(h=0),this.morphSVG(e,i,s,a,n,o,r*h)}},{key:"showDelayedElements",value:function(){this.w.globals.delayedElements.forEach(function(t){t.el.classList.remove("hidden")})}},{key:"morphSVG",value:function(t,e,i,s,a,n,r){var o=this,l=this.w;i||(i=t.attr("pathFrom")),s||(s=t.attr("pathTo")),(!i||i.indexOf("undefined")>-1||i.indexOf("NaN")>-1)&&(i="M 0 ".concat(l.globals.gridHeight),a=1),(s.indexOf("undefined")>-1||s.indexOf("NaN")>-1)&&(s="M 0 ".concat(l.globals.gridHeight),a=1),l.globals.shouldAnimate||(a=1),t.plot(i).animate(1,l.globals.easing,r).plot(i).animate(a,l.globals.easing,r).plot(s).afterAll(function(){d.isNumber(e)?e===l.globals.series[l.globals.maxValsInArrayIndex].length-2&&l.globals.shouldAnimate&&(l.globals.animationEnded=!0):l.globals.shouldAnimate&&(l.globals.animationEnded=!0,"function"==typeof l.config.chart.events.animationEnd&&l.config.chart.events.animationEnd(o.ctx,l)),o.showDelayedElements()})}}]),t}(),f=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w}return s(t,[{key:"drawLine",value:function(t,e,i,s){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"#a8a8a8",n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,r=arguments.length>6&&void 0!==arguments[6]?arguments[6]:null;return this.w.globals.dom.Paper.line().attr({x1:t,y1:e,x2:i,y2:s,stroke:a,"stroke-dasharray":n,"stroke-width":r})}},{key:"drawRect",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"#fefefe",r=arguments.length>6&&void 0!==arguments[6]?arguments[6]:1,o=arguments.length>7&&void 0!==arguments[7]?arguments[7]:null,l=arguments.length>8&&void 0!==arguments[8]?arguments[8]:null,h=arguments.length>9&&void 0!==arguments[9]?arguments[9]:0,c=this.w.globals.dom.Paper.rect();return c.attr({x:t,y:e,width:i>0?i:0,height:s>0?s:0,rx:a,ry:a,fill:n,opacity:r,"stroke-width":null!==o?o:0,stroke:null!==l?l:"none","stroke-dasharray":h}),c}},{key:"drawPolygon",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#e1e1e1",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"none";return this.w.globals.dom.Paper.polygon(t).attr({fill:i,stroke:e})}},{key:"drawCircle",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=this.w.globals.dom.Paper.circle(2*t);return null!==e&&i.attr(e),i}},{key:"drawPath",value:function(t){var e=t.d,i=void 0===e?"":e,s=t.stroke,a=void 0===s?"#a8a8a8":s,n=t.strokeWidth,r=void 0===n?1:n,o=t.fill,l=t.fillOpacity,h=void 0===l?1:l,c=t.strokeOpacity,d=void 0===c?1:c,u=t.classes,g=t.strokeLinecap,f=void 0===g?null:g,p=t.strokeDashArray,x=void 0===p?0:p,b=this.w;return null===f&&(f=b.config.stroke.lineCap),(i.indexOf("undefined")>-1||i.indexOf("NaN")>-1)&&(i="M 0 ".concat(b.globals.gridHeight)),b.globals.dom.Paper.path(i).attr({fill:o,"fill-opacity":h,stroke:a,"stroke-opacity":d,"stroke-linecap":f,"stroke-width":r,"stroke-dasharray":x,class:u})}},{key:"group",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this.w.globals.dom.Paper.group();return null!==t&&e.attr(t),e}},{key:"move",value:function(t,e){var i=["M",t,e].join(" ");return i}},{key:"line",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=null;return null===i?s=["L",t,e].join(" "):"H"===i?s=["H",t].join(" "):"V"===i&&(s=["V",e].join(" ")),s}},{key:"curve",value:function(t,e,i,s,a,n){var r=["C",t,e,i,s,a,n].join(" ");return r}},{key:"quadraticCurve",value:function(t,e,i,s){return["Q",t,e,i,s].join(" ")}},{key:"arc",value:function(t,e,i,s,a,n,r){var o="A";arguments.length>7&&void 0!==arguments[7]&&arguments[7]&&(o="a");var l=[o,t,e,i,s,a,n,r].join(" ");return l}},{key:"renderPaths",value:function(t){var e,i=t.i,s=t.j,a=t.realIndex,r=t.pathFrom,o=t.pathTo,l=t.stroke,h=t.strokeWidth,c=t.strokeLinecap,d=t.fill,f=t.animationDelay,p=t.initialSpeed,x=t.dataChangeSpeed,b=t.className,m=t.id,v=t.shouldClipToGrid,y=void 0===v||v,w=t.bindEventsOnPaths,k=void 0===w||w,A=t.drawShadow,S=void 0===A||A,C=this.w,L=new u(this.ctx),z=new g(this.ctx),P=this.w.config.chart.animations.enabled,E=P&&this.w.config.chart.animations.dynamicAnimation.enabled,M=!!(P&&!C.globals.resized||E&&C.globals.dataChanged&&C.globals.shouldAnimate);M?e=r:(e=o,this.w.globals.animationEnded=!0);var T=C.config.stroke.dashArray,X=0;X=Array.isArray(T)?T[a]:C.config.stroke.dashArray;var I=this.drawPath({d:e,stroke:l,strokeWidth:h,fill:d,fillOpacity:1,classes:b,strokeLinecap:c,strokeDashArray:X});if(I.attr("id","".concat(m,"-").concat(i)),I.attr("index",a),y&&I.attr({"clip-path":"url(#gridRectMask".concat(C.globals.cuid,")")}),"none"!==C.config.states.normal.filter.type)L.getDefaultFilter(I,a);else if(C.config.chart.dropShadow.enabled&&S&&(!C.config.chart.dropShadow.enabledSeries||C.config.chart.dropShadow.enabledSeries&&-1!==C.config.chart.dropShadow.enabledSeries.indexOf(a))){var Y=C.config.chart.dropShadow;L.dropShadow(I,Y,a)}k&&(I.node.addEventListener("mouseenter",this.pathMouseEnter.bind(this,I)),I.node.addEventListener("mouseleave",this.pathMouseLeave.bind(this,I)),I.node.addEventListener("mousedown",this.pathMouseDown.bind(this,I))),I.attr({pathTo:o,pathFrom:r});var F={el:I,j:s,pathFrom:r,pathTo:o,strokeWidth:h};return!P||C.globals.resized||C.globals.dataChanged?!C.globals.resized&&C.globals.dataChanged||z.showDelayedElements():z.animatePathsGradually(n({},F,{speed:p,delay:f})),C.globals.dataChanged&&E&&M&&z.animatePathsGradually(n({},F,{speed:x})),I}},{key:"drawPattern",value:function(t,e,i){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"#a8a8a8",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;return this.w.globals.dom.Paper.pattern(e,i,function(n){"horizontalLines"===t?n.line(0,0,i,0).stroke({color:s,width:a+1}):"verticalLines"===t?n.line(0,0,0,e).stroke({color:s,width:a+1}):"slantedLines"===t?n.line(0,0,e,i).stroke({color:s,width:a}):"squares"===t?n.rect(e,i).fill("none").stroke({color:s,width:a}):"circles"===t&&n.circle(e).fill("none").stroke({color:s,width:a})})}},{key:"drawGradient",value:function(t,e,i,s,a){var n,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:null,l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:null,h=arguments.length>8&&void 0!==arguments[8]?arguments[8]:0,c=this.w;e=d.hexToRgba(e,s),i=d.hexToRgba(i,a);var u=0,g=1,f=1,p=null;null!==o&&(u=void 0!==o[0]?o[0]/100:0,g=void 0!==o[1]?o[1]/100:1,f=void 0!==o[2]?o[2]/100:1,p=void 0!==o[3]?o[3]/100:null);var x=!("donut"!==c.config.chart.type&&"pie"!==c.config.chart.type&&"bubble"!==c.config.chart.type);if(n=null===l||0===l.length?c.globals.dom.Paper.gradient(x?"radial":"linear",function(t){t.at(u,e,s),t.at(g,i,a),t.at(f,i,a),null!==p&&t.at(p,e,s)}):c.globals.dom.Paper.gradient(x?"radial":"linear",function(t){(Array.isArray(l[h])?l[h]:l).forEach(function(e){t.at(e.offset/100,e.color,e.opacity)})}),x){var b=c.globals.gridWidth/2,m=c.globals.gridHeight/2;"bubble"!==c.config.chart.type?n.attr({gradientUnits:"userSpaceOnUse",cx:b,cy:m,r:r}):n.attr({cx:.5,cy:.5,r:.8,fx:.2,fy:.2})}else"vertical"===t?n.from(0,0).to(0,1):"diagonal"===t?n.from(0,0).to(1,1):"horizontal"===t?n.from(0,1).to(1,1):"diagonal2"===t&&n.from(0,1).to(2,2);return n}},{key:"drawText",value:function(t){var e,i=this.w,s=t.x,a=t.y,n=t.text,r=t.textAnchor,o=t.fontSize,l=t.fontFamily,h=t.foreColor,c=t.opacity;return void 0===n&&(n=""),r||(r="start"),h||(h=i.config.chart.foreColor),l=l||i.config.chart.fontFamily,(e=Array.isArray(n)?i.globals.dom.Paper.text(function(t){for(var e=0;e<n.length;e++)t.tspan(n[e])}):i.globals.dom.Paper.plain(n)).attr({x:s,y:a,"text-anchor":r,"dominant-baseline":"auto","font-size":o,"font-family":l,fill:h,class:(t.cssClass,t.cssClass)}),e.node.style.fontFamily=l,e.node.style.opacity=c,e}},{key:"addTspan",value:function(t,e,i){var s=t.tspan(e);i||(i=this.w.config.chart.fontFamily),s.node.style.fontFamily=i}},{key:"drawMarker",value:function(t,e,i){t=t||0;var s=i.pSize||0,a=null;if("square"===i.shape){var n=void 0===i.pRadius?s/2:i.pRadius;null===e&&(s=0,n=0);var r=1.2*s+n,o=this.drawRect(r,r,r,r,n);o.attr({x:t-r/2,y:e-r/2,cx:t,cy:e,class:i.class?i.class:"",fill:i.pointFillColor,"fill-opacity":i.pointFillOpacity?i.pointFillOpacity:1,stroke:i.pointStrokeColor,"stroke-width":i.pWidth?i.pWidth:0,"stroke-opacity":i.pointStrokeOpacity?i.pointStrokeOpacity:1}),a=o}else"circle"===i.shape&&(d.isNumber(e)||(s=0,e=0),a=this.drawCircle(s,{cx:t,cy:e,class:i.class?i.class:"",stroke:i.pointStrokeColor,fill:i.pointFillColor,"fill-opacity":i.pointFillOpacity?i.pointFillOpacity:1,"stroke-width":i.pWidth?i.pWidth:0,"stroke-opacity":i.pointStrokeOpacity?i.pointStrokeOpacity:1}));return a}},{key:"pathMouseEnter",value:function(t,e){var i=this.w,s=new u(this.ctx),a=parseInt(t.node.getAttribute("index")),n=parseInt(t.node.getAttribute("j"));if("function"==typeof i.config.chart.events.dataPointMouseEnter&&i.config.chart.events.dataPointMouseEnter(e,this.ctx,{seriesIndex:a,dataPointIndex:n,w:i}),this.ctx.fireEvent("dataPointMouseEnter",[e,this.ctx,{seriesIndex:a,dataPointIndex:n,w:i}]),("none"===i.config.states.active.filter.type||"true"!==t.node.getAttribute("selected"))&&"none"!==i.config.states.hover.filter.type&&"none"!==i.config.states.active.filter.type&&!i.globals.isTouchDevice){var r=i.config.states.hover.filter;s.applyFilter(t,a,r.type,r.value)}}},{key:"pathMouseLeave",value:function(t,e){var i=this.w,s=new u(this.ctx),a=parseInt(t.node.getAttribute("index")),n=parseInt(t.node.getAttribute("j"));"function"==typeof i.config.chart.events.dataPointMouseLeave&&i.config.chart.events.dataPointMouseLeave(e,this.ctx,{seriesIndex:a,dataPointIndex:n,w:i}),this.ctx.fireEvent("dataPointMouseLeave",[e,this.ctx,{seriesIndex:a,dataPointIndex:n,w:i}]),"none"!==i.config.states.active.filter.type&&"true"===t.node.getAttribute("selected")||"none"!==i.config.states.hover.filter.type&&s.getDefaultFilter(t,a)}},{key:"pathMouseDown",value:function(t,e){var i=this.w,s=new u(this.ctx),a=parseInt(t.node.getAttribute("index")),n=parseInt(t.node.getAttribute("j")),r="false";if("true"===t.node.getAttribute("selected")){if(t.node.setAttribute("selected","false"),i.globals.selectedDataPoints[a].indexOf(n)>-1){var o=i.globals.selectedDataPoints[a].indexOf(n);i.globals.selectedDataPoints[a].splice(o,1)}}else{if(!i.config.states.active.allowMultipleDataPointsSelection&&i.globals.selectedDataPoints.length>0){i.globals.selectedDataPoints=[];var l=i.globals.dom.Paper.select(".apexcharts-series path").members,h=i.globals.dom.Paper.select(".apexcharts-series circle, .apexcharts-series rect").members;l.forEach(function(t){t.node.setAttribute("selected","false"),s.getDefaultFilter(t,a)}),h.forEach(function(t){t.node.setAttribute("selected","false"),s.getDefaultFilter(t,a)})}t.node.setAttribute("selected","true"),r="true",void 0===i.globals.selectedDataPoints[a]&&(i.globals.selectedDataPoints[a]=[]),i.globals.selectedDataPoints[a].push(n)}if("true"===r){var c=i.config.states.active.filter;"none"!==c&&s.applyFilter(t,a,c.type,c.value)}else"none"!==i.config.states.active.filter.type&&s.getDefaultFilter(t,a);"function"==typeof i.config.chart.events.dataPointSelection&&i.config.chart.events.dataPointSelection(e,this.ctx,{selectedDataPoints:i.globals.selectedDataPoints,seriesIndex:a,dataPointIndex:n,w:i}),this.ctx.fireEvent("dataPointSelection",[e,this.ctx,{selectedDataPoints:i.globals.selectedDataPoints,seriesIndex:a,dataPointIndex:n,w:i}])}},{key:"rotateAroundCenter",value:function(t){var e=t.getBBox();return{x:e.x+e.width/2,y:e.y+e.height/2}}},{key:"getTextRects",value:function(t,e,i,s){var a=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],n=this.w,r=this.drawText({x:-200,y:-200,text:t,textAnchor:"start",fontSize:e,fontFamily:i,foreColor:"#fff",opacity:0});s&&r.attr("transform",s),n.globals.dom.Paper.add(r);var o=r.bbox();return a||(o=r.node.getBoundingClientRect()),r.remove(),{width:o.width,height:o.height}}},{key:"placeTextWithEllipsis",value:function(t,e,i){if(t.textContent=e,e.length>0&&t.getSubStringLength(0,e.length)>=i){for(var s=e.length-3;s>0;s-=3)if(t.getSubStringLength(0,s)<=i)return void(t.textContent=e.substring(0,s)+"...");t.textContent="..."}}}],[{key:"setAttrs",value:function(t,e){for(var i in e)e.hasOwnProperty(i)&&t.setAttribute(i,e[i])}}]),t}();var p={name:"en",options:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],toolbar:{exportToSVG:"Download SVG",exportToPNG:"Download PNG",menu:"Menu",selection:"Selection",selectionZoom:"Selection Zoom",zoomIn:"Zoom In",zoomOut:"Zoom Out",pan:"Panning",reset:"Reset Zoom"}}},x=function(){function t(){e(this,t),this.yAxis={show:!0,showAlways:!1,seriesName:void 0,opposite:!1,reversed:!1,logarithmic:!1,tickAmount:void 0,forceNiceScale:!1,max:void 0,min:void 0,floating:!1,decimalsInFloat:void 0,labels:{show:!0,minWidth:0,maxWidth:160,offsetX:0,offsetY:0,align:void 0,rotate:0,padding:20,style:{colors:[],fontSize:"11px",fontFamily:void 0,cssClass:""},formatter:void 0},axisBorder:{show:!1,color:"#78909C",offsetX:0,offsetY:0},axisTicks:{show:!1,color:"#78909C",width:6,offsetX:0,offsetY:0},title:{text:void 0,rotate:90,offsetY:0,offsetX:0,style:{color:void 0,fontSize:"11px",fontFamily:void 0,cssClass:""}},tooltip:{enabled:!1,offsetX:0},crosshairs:{show:!0,position:"front",stroke:{color:"#b6b6b6",width:1,dashArray:0}}},this.xAxisAnnotation={x:0,x2:null,strokeDashArray:1,fillColor:"#c2c2c2",borderColor:"#c2c2c2",opacity:.3,offsetX:0,offsetY:0,label:{borderColor:"#c2c2c2",borderWidth:1,text:void 0,textAnchor:"middle",orientation:"vertical",position:"top",offsetX:0,offsetY:0,style:{background:"#fff",color:void 0,fontSize:"11px",fontFamily:void 0,cssClass:"",padding:{left:5,right:5,top:2,bottom:2}}}},this.yAxisAnnotation={y:0,y2:null,strokeDashArray:1,fillColor:"#c2c2c2",borderColor:"#c2c2c2",opacity:.3,offsetX:0,offsetY:0,yAxisIndex:0,label:{borderColor:"#c2c2c2",borderWidth:1,text:void 0,textAnchor:"end",position:"right",offsetX:0,offsetY:-3,style:{background:"#fff",color:void 0,fontSize:"11px",fontFamily:void 0,cssClass:"",padding:{left:5,right:5,top:0,bottom:2}}}},this.pointAnnotation={x:0,y:null,yAxisIndex:0,seriesIndex:0,marker:{size:0,fillColor:"#fff",strokeWidth:2,strokeColor:"#333",shape:"circle",offsetX:0,offsetY:0,radius:2,cssClass:""},label:{borderColor:"#c2c2c2",borderWidth:1,text:void 0,textAnchor:"middle",offsetX:0,offsetY:-15,style:{background:"#fff",color:void 0,fontSize:"11px",fontFamily:void 0,cssClass:"",padding:{left:5,right:5,top:0,bottom:2}}},customSVG:{SVG:void 0,cssClass:void 0,offsetX:0,offsetY:0}}}return s(t,[{key:"init",value:function(){return{annotations:{position:"front",yaxis:[this.yAxisAnnotation],xaxis:[this.xAxisAnnotation],points:[this.pointAnnotation]},chart:{animations:{enabled:!0,easing:"easeinout",speed:800,animateGradually:{delay:150,enabled:!0},dynamicAnimation:{enabled:!0,speed:350}},background:"transparent",locales:[p],defaultLocale:"en",dropShadow:{enabled:!1,enabledSeries:void 0,top:2,left:2,blur:4,color:"#000",opacity:.35},events:{animationEnd:void 0,beforeMount:void 0,mounted:void 0,updated:void 0,click:void 0,legendClick:void 0,markerClick:void 0,selection:void 0,dataPointSelection:void 0,dataPointMouseEnter:void 0,dataPointMouseLeave:void 0,beforeZoom:void 0,zoomed:void 0,scrolled:void 0},foreColor:"#373d3f",fontFamily:"Helvetica, Arial, sans-serif",height:"auto",parentHeightOffset:15,id:void 0,group:void 0,offsetX:0,offsetY:0,selection:{enabled:!1,type:"x",fill:{color:"#24292e",opacity:.1},stroke:{width:1,color:"#24292e",opacity:.4,dashArray:3},xaxis:{min:void 0,max:void 0},yaxis:{min:void 0,max:void 0}},sparkline:{enabled:!1},brush:{enabled:!1,autoScaleYaxis:!1,target:void 0},stacked:!1,stackType:"normal",toolbar:{show:!0,tools:{download:!0,selection:!0,zoom:!0,zoomin:!0,zoomout:!0,pan:!0,reset:!0,customIcons:[]},autoSelected:"zoom"},type:"line",width:"100%",zoom:{enabled:!0,type:"x",zoomedArea:{fill:{color:"#90CAF9",opacity:.4},stroke:{color:"#0D47A1",opacity:.4,width:1}}}},plotOptions:{bar:{horizontal:!1,columnWidth:"70%",barHeight:"70%",distributed:!1,endingShape:"flat",colors:{ranges:[],backgroundBarColors:[],backgroundBarOpacity:1},dataLabels:{maxItems:100,hideOverflowingLabels:!0,position:"top"}},candlestick:{colors:{upward:"#00B746",downward:"#EF403C"},wick:{useFillColor:!0}},heatmap:{radius:2,enableShades:!0,shadeIntensity:.5,distributed:!1,colorScale:{inverse:!1,ranges:[],min:void 0,max:void 0}},radialBar:{size:void 0,inverseOrder:!1,startAngle:0,endAngle:360,offsetX:0,offsetY:0,hollow:{margin:5,size:"50%",background:"transparent",image:void 0,imageWidth:150,imageHeight:150,imageOffsetX:0,imageOffsetY:0,imageClipped:!0,position:"front",dropShadow:{enabled:!1,top:0,left:0,blur:3,color:"#000",opacity:.5}},track:{show:!0,startAngle:void 0,endAngle:void 0,background:"#f2f2f2",strokeWidth:"97%",opacity:1,margin:5,dropShadow:{enabled:!1,top:0,left:0,blur:3,color:"#000",opacity:.5}},dataLabels:{show:!0,name:{show:!0,fontSize:"16px",fontFamily:void 0,color:void 0,offsetY:0},value:{show:!0,fontSize:"14px",fontFamily:void 0,color:void 0,offsetY:16,formatter:function(t){return t+"%"}},total:{show:!1,label:"Total",color:void 0,formatter:function(t){return t.globals.seriesTotals.reduce(function(t,e){return t+e},0)/t.globals.series.length+"%"}}}},rangeBar:{},pie:{size:void 0,customScale:1,offsetX:0,offsetY:0,expandOnClick:!0,dataLabels:{offset:0,minAngleToShowLabel:10},donut:{size:"65%",background:"transparent",labels:{show:!1,name:{show:!0,fontSize:"16px",fontFamily:void 0,color:void 0,offsetY:-10},value:{show:!0,fontSize:"20px",fontFamily:void 0,color:void 0,offsetY:10,formatter:function(t){return t}},total:{show:!1,label:"Total",color:void 0,formatter:function(t){return t.globals.seriesTotals.reduce(function(t,e){return t+e},0)}}}}},radar:{size:void 0,offsetX:0,offsetY:0,polygons:{strokeColors:"#e8e8e8",connectorColors:"#e8e8e8",fill:{colors:void 0}}}},colors:void 0,dataLabels:{enabled:!0,enabledOnSeries:void 0,formatter:function(t){return t},textAnchor:"middle",offsetX:0,offsetY:0,style:{fontSize:"12px",fontFamily:void 0,colors:void 0},dropShadow:{enabled:!1,top:1,left:1,blur:1,color:"#000",opacity:.45}},fill:{type:"solid",colors:void 0,opacity:.85,gradient:{shade:"dark",type:"horizontal",shadeIntensity:.5,gradientToColors:void 0,inverseColors:!0,opacityFrom:1,opacityTo:1,stops:[0,50,100],colorStops:[]},image:{src:[],width:void 0,height:void 0},pattern:{style:"sqaures",width:6,height:6,strokeWidth:2}},grid:{show:!0,borderColor:"#e0e0e0",strokeDashArray:0,position:"back",xaxis:{lines:{show:!1,animate:!1}},yaxis:{lines:{show:!0,animate:!1}},row:{colors:void 0,opacity:.5},column:{colors:void 0,opacity:.5},padding:{top:0,right:10,bottom:0,left:12}},labels:[],legend:{show:!0,showForSingleSeries:!1,showForNullSeries:!0,showForZeroSeries:!0,floating:!1,position:"bottom",horizontalAlign:"center",fontSize:"12px",fontFamily:void 0,width:void 0,height:void 0,formatter:void 0,offsetX:-20,offsetY:0,labels:{colors:void 0,useSeriesColors:!1},markers:{width:12,height:12,strokeWidth:0,strokeColor:"#fff",radius:12,customHTML:void 0,offsetX:0,offsetY:0,onClick:void 0},itemMargin:{horizontal:0,vertical:5},onItemClick:{toggleDataSeries:!0},onItemHover:{highlightDataSeries:!0}},markers:{discrete:[],size:0,colors:void 0,strokeColors:"#fff",strokeWidth:2,strokeOpacity:.9,fillOpacity:1,shape:"circle",radius:2,offsetX:0,offsetY:0,hover:{size:void 0,sizeOffset:3}},noData:{text:void 0,align:"center",verticalAlign:"middle",offsetX:0,offsetY:0,style:{color:void 0,fontSize:"14px",fontFamily:void 0}},responsive:[],series:void 0,states:{normal:{filter:{type:"none",value:0}},hover:{filter:{type:"lighten",value:.15}},active:{allowMultipleDataPointsSelection:!1,filter:{type:"darken",value:.65}}},title:{text:void 0,align:"left",margin:10,offsetX:0,offsetY:0,floating:!1,style:{fontSize:"14px",fontFamily:void 0,color:void 0}},subtitle:{text:void 0,align:"left",margin:10,offsetX:0,offsetY:30,floating:!1,style:{fontSize:"12px",fontFamily:void 0,color:void 0}},stroke:{show:!0,curve:"smooth",lineCap:"butt",width:2,colors:void 0,dashArray:0},tooltip:{enabled:!0,shared:!0,followCursor:!1,intersect:!1,inverseOrder:!1,custom:void 0,fillSeriesColor:!1,theme:"light",style:{fontSize:"12px",fontFamily:void 0},onDatasetHover:{highlightDataSeries:!1},x:{show:!0,format:"dd MMM",formatter:void 0},y:{formatter:void 0,title:{formatter:function(t){return t}}},z:{formatter:void 0,title:"Size: "},marker:{show:!0},items:{display:"flex"},fixed:{enabled:!1,position:"topRight",offsetX:0,offsetY:0}},xaxis:{type:"category",categories:[],offsetX:0,offsetY:0,labels:{show:!0,rotate:-45,rotateAlways:!1,hideOverlappingLabels:!0,trim:!0,minHeight:void 0,maxHeight:120,showDuplicates:!0,style:{colors:[],fontSize:"12px",fontFamily:void 0,cssClass:""},offsetX:0,offsetY:0,format:void 0,formatter:void 0,datetimeFormatter:{year:"yyyy",month:"MMM 'yy",day:"dd MMM",hour:"HH:mm",minute:"HH:mm:ss"}},axisBorder:{show:!0,color:"#78909C",width:"100%",height:1,offsetX:0,offsetY:0},axisTicks:{show:!0,color:"#78909C",height:6,offsetX:0,offsetY:0},tickAmount:void 0,tickPlacement:"on",min:void 0,max:void 0,range:void 0,floating:!1,position:"bottom",title:{text:void 0,offsetX:0,offsetY:0,style:{color:void 0,fontSize:"12px",fontFamily:void 0,cssClass:""}},crosshairs:{show:!0,width:1,position:"back",opacity:.9,stroke:{color:"#b6b6b6",width:1,dashArray:3},fill:{type:"solid",color:"#B1B9C4",gradient:{colorFrom:"#D8E3F0",colorTo:"#BED1E6",stops:[0,100],opacityFrom:.4,opacityTo:.5}},dropShadow:{enabled:!1,left:0,top:0,blur:1,opacity:.4}},tooltip:{enabled:!0,offsetY:0,formatter:void 0,style:{fontSize:"12px",fontFamily:void 0}}},yaxis:this.yAxis,theme:{mode:"light",palette:"palette1",monochrome:{enabled:!1,color:"#008FFB",shadeTo:"light",shadeIntensity:.65}}}}}]),t}(),b=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.graphics=new f(this.ctx),this.w.globals.isBarHorizontal&&(this.invertAxis=!0),this.xDivision=this.w.globals.gridWidth/this.w.globals.dataPoints}return s(t,[{key:"drawAnnotations",value:function(){var t=this.w;if(t.globals.axisCharts){for(var e=this.drawYAxisAnnotations(),i=this.drawXAxisAnnotations(),s=this.drawPointAnnotations(),a=t.config.chart.animations.enabled,n=[e,i,s],r=[i.node,e.node,s.node],o=0;o<3;o++)t.globals.dom.elGraphical.add(n[o]),!a||t.globals.resized||t.globals.dataChanged||r[o].classList.add("hidden"),t.globals.delayedElements.push({el:r[o],index:0});this.setOrientations(t.config.annotations.xaxis),this.annotationsBackground()}}},{key:"addXaxisAnnotation",value:function(t,e,i){var s=this.w,a=this.invertAxis?s.globals.minY:s.globals.minX,n=this.invertAxis?s.globals.yRange[0]:s.globals.xRange,r=(t.x-a)/(n/s.globals.gridWidth),o=t.label.text;if("category"===s.config.xaxis.type||s.config.xaxis.convertedCatToNumeric){var l=s.globals.labels.indexOf(t.x),h=s.globals.dom.baseEl.querySelector(".apexcharts-xaxis-texts-g text:nth-child("+(l+1)+")");h&&(r=parseFloat(h.getAttribute("x")))}var c=t.strokeDashArray;if(!(r<0||r>s.globals.gridWidth)){if(null===t.x2){var d=this.graphics.drawLine(r+t.offsetX,0+t.offsetY,r+t.offsetX,s.globals.gridHeight+t.offsetY,t.borderColor,c);e.appendChild(d.node)}else{var u=(t.x2-a)/(n/s.globals.gridWidth);if(u<r){var g=r;r=u,u=g}if(o){var f=this.graphics.drawRect(r+t.offsetX,0+t.offsetY,u-r,s.globals.gridHeight+t.offsetY,0,t.fillColor,t.opacity,1,t.borderColor,c);e.appendChild(f.node)}}var p="top"===t.label.position?-3:s.globals.gridHeight,x=this.graphics.drawText({x:r+t.label.offsetX,y:p+t.label.offsetY,text:o,textAnchor:t.label.textAnchor,fontSize:t.label.style.fontSize,fontFamily:t.label.style.fontFamily,foreColor:t.label.style.color,cssClass:"apexcharts-xaxis-annotation-label "+t.label.style.cssClass});x.attr({rel:i}),e.appendChild(x.node)}}},{key:"drawXAxisAnnotations",value:function(){var t=this,e=this.w,i=this.graphics.group({class:"apexcharts-xaxis-annotations"});return e.config.annotations.xaxis.map(function(e,s){t.addXaxisAnnotation(e,i.node,s)}),i}},{key:"addYaxisAnnotation",value:function(t,e,i){var s,a,n=this.w,r=t.strokeDashArray;if(this.invertAxis){var o=n.globals.labels.indexOf(t.y),l=n.globals.dom.baseEl.querySelector(".apexcharts-yaxis-texts-g text:nth-child("+(o+1)+")");l&&(s=parseFloat(l.getAttribute("y")))}else s=n.globals.gridHeight-(t.y-n.globals.minYArr[t.yAxisIndex])/(n.globals.yRange[t.yAxisIndex]/n.globals.gridHeight),n.config.yaxis[t.yAxisIndex]&&n.config.yaxis[t.yAxisIndex].reversed&&(s=(t.y-n.globals.minYArr[t.yAxisIndex])/(n.globals.yRange[t.yAxisIndex]/n.globals.gridHeight));var h=t.label.text;if(null===t.y2){var c=this.graphics.drawLine(0+t.offsetX,s+t.offsetY,n.globals.gridWidth+t.offsetX,s+t.offsetY,t.borderColor,r);e.appendChild(c.node)}else{if(this.invertAxis){var d=n.globals.labels.indexOf(t.y2),u=n.globals.dom.baseEl.querySelector(".apexcharts-yaxis-texts-g text:nth-child("+(d+1)+")");u&&(a=parseFloat(u.getAttribute("y")))}else a=n.globals.gridHeight-(t.y2-n.globals.minYArr[t.yAxisIndex])/(n.globals.yRange[t.yAxisIndex]/n.globals.gridHeight),n.config.yaxis[t.yAxisIndex]&&n.config.yaxis[t.yAxisIndex].reversed&&(a=(t.y2-n.globals.minYArr[t.yAxisIndex])/(n.globals.yRange[t.yAxisIndex]/n.globals.gridHeight));if(a>s){var g=s;s=a,a=g}if(h){var f=this.graphics.drawRect(0+t.offsetX,a+t.offsetY,n.globals.gridWidth+t.offsetX,s-a,0,t.fillColor,t.opacity,1,t.borderColor,r);e.appendChild(f.node)}}var p="right"===t.label.position?n.globals.gridWidth:0,x=this.graphics.drawText({x:p+t.label.offsetX,y:(a||s)+t.label.offsetY-3,text:h,textAnchor:t.label.textAnchor,fontSize:t.label.style.fontSize,fontFamily:t.label.style.fontFamily,foreColor:t.label.style.color,cssClass:"apexcharts-yaxis-annotation-label "+t.label.style.cssClass});x.attr({rel:i}),e.appendChild(x.node)}},{key:"drawYAxisAnnotations",value:function(){var t=this,e=this.w,i=this.graphics.group({class:"apexcharts-yaxis-annotations"});return e.config.annotations.yaxis.map(function(e,s){t.addYaxisAnnotation(e,i.node,s)}),i}},{key:"clearAnnotations",value:function(t){var e=t.w.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxis-annotations, .apexcharts-xaxis-annotations, .apexcharts-point-annotations");(e=d.listToArray(e)).forEach(function(t){for(;t.firstChild;)t.removeChild(t.firstChild)})}},{key:"addPointAnnotation",value:function(t,e,i){var s=this.w,a=0,n=0,r=0;if(this.invertAxis&&console.warn("Point annotation is not supported in horizontal bar charts."),"string"==typeof t.x){var o=s.globals.labels.indexOf(t.x),l=s.globals.dom.baseEl.querySelector(".apexcharts-xaxis-texts-g text:nth-child("+(o+1)+")");a=parseFloat(l.getAttribute("x"));var h=t.y;null===t.y&&(h=s.globals.series[t.seriesIndex][o]),n=s.globals.gridHeight-(h-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight)-parseInt(t.label.style.fontSize)-t.marker.size,r=s.globals.gridHeight-(h-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight),s.config.yaxis[t.yAxisIndex]&&s.config.yaxis[t.yAxisIndex].reversed&&(n=(h-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight)+parseInt(t.label.style.fontSize)+t.marker.size,r=(h-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight))}else a=(t.x-s.globals.minX)/(s.globals.xRange/s.globals.gridWidth),n=s.globals.gridHeight-(parseFloat(t.y)-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight)-parseInt(t.label.style.fontSize)-t.marker.size,r=s.globals.gridHeight-(t.y-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight),s.config.yaxis[t.yAxisIndex]&&s.config.yaxis[t.yAxisIndex].reversed&&(n=(parseFloat(t.y)-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight)-parseInt(t.label.style.fontSize)-t.marker.size,r=(t.y-s.globals.minYArr[t.yAxisIndex])/(s.globals.yRange[t.yAxisIndex]/s.globals.gridHeight));if(!(a<0||a>s.globals.gridWidth)){var c={pSize:t.marker.size,pWidth:t.marker.strokeWidth,pointFillColor:t.marker.fillColor,pointStrokeColor:t.marker.strokeColor,shape:t.marker.shape,radius:t.marker.radius,class:"apexcharts-point-annotation-marker "+t.marker.cssClass},d=this.graphics.drawMarker(a+t.marker.offsetX,r+t.marker.offsetY,c);e.appendChild(d.node);var u=t.label.text?t.label.text:"",g=this.graphics.drawText({x:a+t.label.offsetX,y:n+t.label.offsetY,text:u,textAnchor:t.label.textAnchor,fontSize:t.label.style.fontSize,fontFamily:t.label.style.fontFamily,foreColor:t.label.style.color,cssClass:"apexcharts-point-annotation-label "+t.label.style.cssClass});if(g.attr({rel:i}),e.appendChild(g.node),t.customSVG.SVG){var f=this.graphics.group({class:"apexcharts-point-annotations-custom-svg "+t.customSVG.cssClass});f.attr({transform:"translate(".concat(a+t.customSVG.offsetX,", ").concat(n+t.customSVG.offsetY,")")}),f.node.innerHTML=t.customSVG.SVG,e.appendChild(f.node)}}}},{key:"drawPointAnnotations",value:function(){var t=this,e=this.w,i=this.graphics.group({class:"apexcharts-point-annotations"});return e.config.annotations.points.map(function(e,s){t.addPointAnnotation(e,i.node,s)}),i}},{key:"setOrientations",value:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,s=this.w;t.map(function(t,a){if("vertical"===t.label.orientation){var n=null!==i?i:a,r=s.globals.dom.baseEl.querySelector(".apexcharts-xaxis-annotations .apexcharts-xaxis-annotation-label[rel='".concat(n,"']"));if(null!==r){var o=r.getBoundingClientRect();r.setAttribute("x",parseFloat(r.getAttribute("x"))-o.height+4),"top"===t.label.position?r.setAttribute("y",parseFloat(r.getAttribute("y"))+o.width):r.setAttribute("y",parseFloat(r.getAttribute("y"))-o.width);var l=e.graphics.rotateAroundCenter(r),h=l.x,c=l.y;r.setAttribute("transform","rotate(-90 ".concat(h," ").concat(c,")"))}}})}},{key:"addBackgroundToAnno",value:function(t,e){var i=this.w;if(!e.label.text)return null;var s=i.globals.dom.baseEl.querySelector(".apexcharts-grid").getBoundingClientRect(),a=t.getBoundingClientRect(),n=e.label.style.padding.left,r=e.label.style.padding.right,o=e.label.style.padding.top,l=e.label.style.padding.bottom;"vertical"===e.label.orientation&&(o=e.label.style.padding.left,l=e.label.style.padding.right,n=e.label.style.padding.top,r=e.label.style.padding.bottom);var h=a.left-s.left-n,c=a.top-s.top-o;return this.graphics.drawRect(h,c,a.width+n+r,a.height+o+l,0,e.label.style.background,1,e.label.borderWidth,e.label.borderColor,0)}},{key:"annotationsBackground",value:function(){var t=this,e=this.w,i=function(i,s,a){var n=e.globals.dom.baseEl.querySelector(".apexcharts-".concat(a,"-annotations .apexcharts-").concat(a,"-annotation-label[rel='").concat(s,"']"));if(n){var r=n.parentNode,o=t.addBackgroundToAnno(n,i);o&&r.insertBefore(o.node,n)}};e.config.annotations.xaxis.map(function(t,e){i(t,e,"xaxis")}),e.config.annotations.yaxis.map(function(t,e){i(t,e,"yaxis")}),e.config.annotations.points.map(function(t,e){i(t,e,"point")})}},{key:"addText",value:function(t,e,i){var s=t.x,a=t.y,n=t.text,r=t.textAnchor,o=t.appendTo,l=void 0===o?".apexcharts-inner":o,h=t.foreColor,c=t.fontSize,d=t.fontFamily,u=t.cssClass,g=t.backgroundColor,f=t.borderWidth,p=t.strokeDashArray,x=t.radius,b=t.borderColor,m=t.paddingLeft,v=void 0===m?4:m,y=t.paddingRight,w=void 0===y?4:y,k=t.paddingBottom,A=void 0===k?2:k,S=t.paddingTop,C=void 0===S?2:S,L=i,z=L.w,P=z.globals.dom.baseEl.querySelector(l),E=this.graphics.drawText({x:s,y:a,text:n,textAnchor:r||"start",fontSize:c||"12px",fontFamily:d||z.config.chart.fontFamily,foreColor:h||z.config.chart.foreColor,cssClass:u});P.appendChild(E.node);var M=E.bbox();if(n){var T=this.graphics.drawRect(M.x-v,M.y-C,M.width+v+w,M.height+A+C,x,g,1,f,b,p);E.before(T)}return e&&z.globals.memory.methodsToExec.push({context:L,method:L.addText,params:{x:s,y:a,text:n,textAnchor:r,appendTo:l,foreColor:h,fontSize:c,cssClass:u,backgroundColor:g,borderWidth:f,strokeDashArray:p,radius:x,borderColor:b,paddingLeft:v,paddingRight:w,paddingBottom:A,paddingTop:C}}),i}},{key:"addPointAnnotationExternal",value:function(t,e,i){return this.addAnnotationExternal({params:t,pushToMemory:e,context:i,type:"point",contextMethod:i.addPointAnnotation}),i}},{key:"addYaxisAnnotationExternal",value:function(t,e,i){return this.addAnnotationExternal({params:t,pushToMemory:e,context:i,type:"yaxis",contextMethod:i.addYaxisAnnotation}),i}},{key:"addXaxisAnnotationExternal",value:function(t,e,i){return this.addAnnotationExternal({params:t,pushToMemory:e,context:i,type:"xaxis",contextMethod:i.addXaxisAnnotation}),i}},{key:"addAnnotationExternal",value:function(t){var e=t.params,i=t.pushToMemory,s=t.context,a=t.type,n=t.contextMethod,r=s,o=r.w,l=o.globals.dom.baseEl.querySelector(".apexcharts-".concat(a,"-annotations")),h=l.childNodes.length+1,c=new x,u=Object.assign({},"xaxis"===a?c.xAxisAnnotation:"yaxis"===a?c.yAxisAnnotation:c.pointAnnotation),g=d.extend(u,e);switch(a){case"xaxis":this.addXaxisAnnotation(g,l,h);break;case"yaxis":this.addYaxisAnnotation(g,l,h);break;case"point":this.addPointAnnotation(g,l,h)}var f=o.globals.dom.baseEl.querySelector(".apexcharts-".concat(a,"-annotations .apexcharts-").concat(a,"-annotation-label[rel='").concat(h,"']")),p=this.addBackgroundToAnno(f,g);return p&&l.insertBefore(p.node,f),i&&o.globals.memory.methodsToExec.push({context:r,method:n,params:e}),s}}]),t}(),m=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.months31=[1,3,5,7,8,10,12],this.months30=[2,4,6,9,11],this.daysCntOfYear=[0,31,59,90,120,151,181,212,243,273,304,334]}return s(t,[{key:"isValidDate",value:function(t){return!isNaN(this.parseDate(t))}},{key:"getUTCTimeStamp",value:function(t){return Date.parse(t)?new Date(new Date(t).toISOString().substr(0,25)).getTime():t}},{key:"parseDate",value:function(t){var e=Date.parse(t);if(!isNaN(e))return this.getUTCTimeStamp(t);var i=Date.parse(t.replace(/-/g,"/").replace(/[a-z]+/gi," "));return i=this.getUTCTimeStamp(i)}},{key:"treatAsUtc",value:function(t){var e=new Date(t);return e.setMinutes(e.getMinutes()-e.getTimezoneOffset()),e}},{key:"formatDate",value:function(t,e){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=this.w.globals.locale,n=["\0"].concat(c(a.months)),r=["\x01"].concat(c(a.shortMonths)),o=["\x02"].concat(c(a.days)),l=["\x03"].concat(c(a.shortDays));function h(t,e){var i=t+"";for(e=e||2;i.length<e;)i="0"+i;return i}s&&(t=this.treatAsUtc(t));var d=i?t.getUTCFullYear():t.getFullYear();e=(e=(e=e.replace(/(^|[^\\])yyyy+/g,"$1"+d)).replace(/(^|[^\\])yy/g,"$1"+d.toString().substr(2,2))).replace(/(^|[^\\])y/g,"$1"+d);var u=(i?t.getUTCMonth():t.getMonth())+1;e=(e=(e=(e=e.replace(/(^|[^\\])MMMM+/g,"$1"+n[0])).replace(/(^|[^\\])MMM/g,"$1"+r[0])).replace(/(^|[^\\])MM/g,"$1"+h(u))).replace(/(^|[^\\])M/g,"$1"+u);var g=i?t.getUTCDate():t.getDate();e=(e=(e=(e=e.replace(/(^|[^\\])dddd+/g,"$1"+o[0])).replace(/(^|[^\\])ddd/g,"$1"+l[0])).replace(/(^|[^\\])dd/g,"$1"+h(g))).replace(/(^|[^\\])d/g,"$1"+g);var f=i?t.getUTCHours():t.getHours(),p=f>12?f-12:0===f?12:f;e=(e=(e=(e=e.replace(/(^|[^\\])HH+/g,"$1"+h(f))).replace(/(^|[^\\])H/g,"$1"+f)).replace(/(^|[^\\])hh+/g,"$1"+h(p))).replace(/(^|[^\\])h/g,"$1"+p);var x=i?t.getUTCMinutes():t.getMinutes();e=(e=e.replace(/(^|[^\\])mm+/g,"$1"+h(x))).replace(/(^|[^\\])m/g,"$1"+x);var b=i?t.getUTCSeconds():t.getSeconds();e=(e=e.replace(/(^|[^\\])ss+/g,"$1"+h(b))).replace(/(^|[^\\])s/g,"$1"+b);var m=i?t.getUTCMilliseconds():t.getMilliseconds();e=e.replace(/(^|[^\\])fff+/g,"$1"+h(m,3)),m=Math.round(m/10),e=e.replace(/(^|[^\\])ff/g,"$1"+h(m)),m=Math.round(m/10);var v=f<12?"AM":"PM";e=(e=(e=e.replace(/(^|[^\\])f/g,"$1"+m)).replace(/(^|[^\\])TT+/g,"$1"+v)).replace(/(^|[^\\])T/g,"$1"+v.charAt(0));var y=v.toLowerCase();e=(e=e.replace(/(^|[^\\])tt+/g,"$1"+y)).replace(/(^|[^\\])t/g,"$1"+y.charAt(0));var w=-t.getTimezoneOffset(),k=i||!w?"Z":w>0?"+":"-";if(!i){var A=(w=Math.abs(w))%60;k+=h(Math.floor(w/60))+":"+h(A)}e=e.replace(/(^|[^\\])K/g,"$1"+k);var S=(i?t.getUTCDay():t.getDay())+1;return e=(e=(e=(e=(e=e.replace(new RegExp(o[0],"g"),o[S])).replace(new RegExp(l[0],"g"),l[S])).replace(new RegExp(n[0],"g"),n[u])).replace(new RegExp(r[0],"g"),r[u])).replace(/\\(.)/g,"$1")}},{key:"getTimeUnitsfromTimestamp",value:function(t,e){var i=this.w;void 0!==i.config.xaxis.min&&(t=i.config.xaxis.min),void 0!==i.config.xaxis.max&&(e=i.config.xaxis.max);var s=new Date(t).getFullYear(),a=new Date(e).getFullYear(),n=new Date(t).getMonth(),r=new Date(e).getMonth(),o=new Date(t).getDate(),l=new Date(e).getDate(),h=new Date(t).getHours(),c=new Date(e).getHours();return{minMinute:new Date(t).getMinutes(),maxMinute:new Date(e).getMinutes(),minHour:h,maxHour:c,minDate:o,maxDate:l,minMonth:n,maxMonth:r,minYear:s,maxYear:a}}},{key:"isLeapYear",value:function(t){return t%4==0&&t%100!=0||t%400==0}},{key:"calculcateLastDaysOfMonth",value:function(t,e,i){return this.determineDaysOfMonths(t,e)-i}},{key:"determineDaysOfYear",value:function(t){var e=365;return this.isLeapYear(t)&&(e=366),e}},{key:"determineRemainingDaysOfYear",value:function(t,e,i){var s=this.daysCntOfYear[e]+i;return e>1&&this.isLeapYear()&&s++,s}},{key:"determineDaysOfMonths",value:function(t,e){var i=30;switch(t=d.monthMod(t),!0){case this.months30.indexOf(t)>-1:2===t&&(i=this.isLeapYear(e)?29:28);break;case this.months31.indexOf(t)>-1:default:i=31}return i}}]),t}(),v=function(){function t(i){e(this,t),this.opts=i}return s(t,[{key:"line",value:function(){return{chart:{animations:{easing:"swing"}},dataLabels:{enabled:!1},stroke:{width:5,curve:"straight"},markers:{size:0,hover:{sizeOffset:6}},xaxis:{crosshairs:{width:1}}}}},{key:"sparkline",value:function(t){this.opts.yaxis[0].labels.show=!1,this.opts.yaxis[0].floating=!0;return d.extend(t,{grid:{show:!1,padding:{left:0,right:0,top:0,bottom:0}},legend:{show:!1},xaxis:{labels:{show:!1},tooltip:{enabled:!1},axisBorder:{show:!1}},chart:{toolbar:{show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1}})}},{key:"bar",value:function(){return{chart:{stacked:!1,animations:{easing:"swing"}},plotOptions:{bar:{dataLabels:{position:"center"}}},dataLabels:{style:{colors:["#fff"]}},stroke:{width:0},fill:{opacity:.85},legend:{markers:{shape:"square",radius:2,size:8}},tooltip:{shared:!1},xaxis:{tooltip:{enabled:!1},crosshairs:{width:"barWidth",position:"back",fill:{type:"gradient"},dropShadow:{enabled:!1},stroke:{width:0}}}}}},{key:"candlestick",value:function(){return{stroke:{width:1,colors:["#333"]},dataLabels:{enabled:!1},tooltip:{shared:!0,custom:function(t){var e=t.seriesIndex,i=t.dataPointIndex,s=t.w;return'<div class="apexcharts-tooltip-candlestick"><div>Open: <span class="value">'+s.globals.seriesCandleO[e][i]+'</span></div><div>High: <span class="value">'+s.globals.seriesCandleH[e][i]+'</span></div><div>Low: <span class="value">'+s.globals.seriesCandleL[e][i]+'</span></div><div>Close: <span class="value">'+s.globals.seriesCandleC[e][i]+"</span></div></div>"}},states:{active:{filter:{type:"none"}}},xaxis:{crosshairs:{width:1}}}}},{key:"rangeBar",value:function(){return{stroke:{width:0},plotOptions:{bar:{dataLabels:{position:"center"}}},dataLabels:{enabled:!1,formatter:function(t,e){e.ctx;var i=e.seriesIndex,s=e.dataPointIndex,a=e.w,n=a.globals.seriesRangeStart[i][s];return a.globals.seriesRangeEnd[i][s]-n},style:{colors:["#fff"]}},tooltip:{shared:!1,followCursor:!0,custom:function(t){var e=t.ctx,i=t.seriesIndex,s=t.dataPointIndex,a=t.w,n=a.globals.seriesRangeStart[i][s],r=a.globals.seriesRangeEnd[i][s],o="",l="",h=a.globals.colors[i];if(void 0===a.config.tooltip.x.formatter)if("datetime"===a.config.xaxis.type){var c=new m(e);o=c.formatDate(new Date(n),a.config.tooltip.x.format,!0,!0),l=c.formatDate(new Date(r),a.config.tooltip.x.format,!0,!0)}else o=n,l=r;else o=a.config.tooltip.x.formatter(n),l=a.config.tooltip.x.formatter(r);var d=a.globals.labels[s];return'<div class="apexcharts-tooltip-rangebar"><div> <span class="series-name" style="color: '+h+'">'+(a.config.series[i].name?a.config.series[i].name:"")+'</span></div><div> <span class="category">'+d+': </span> <span class="value start-value">'+o+'</span> <span class="separator">-</span> <span class="value end-value">'+l+"</span></div></div>"}},xaxis:{tooltip:{enabled:!1},crosshairs:{stroke:{width:0}}}}}},{key:"area",value:function(){return{stroke:{width:4},fill:{type:"gradient",gradient:{inverseColors:!1,shade:"light",type:"vertical",opacityFrom:.65,opacityTo:.5,stops:[0,100,100]}},markers:{size:0,hover:{sizeOffset:6}},tooltip:{followCursor:!1}}}},{key:"brush",value:function(t){return d.extend(t,{chart:{toolbar:{autoSelected:"selection",show:!1},zoom:{enabled:!1}},dataLabels:{enabled:!1},stroke:{width:1},tooltip:{enabled:!1},xaxis:{tooltip:{enabled:!1}}})}},{key:"stacked100",value:function(){var t=this;this.opts.dataLabels=this.opts.dataLabels||{},this.opts.dataLabels.formatter=this.opts.dataLabels.formatter||void 0;var e=this.opts.dataLabels.formatter;this.opts.yaxis.forEach(function(e,i){t.opts.yaxis[i].min=0,t.opts.yaxis[i].max=100}),"bar"===this.opts.chart.type&&(this.opts.dataLabels.formatter=e||function(t){return"number"==typeof t&&t?t.toFixed(0)+"%":t})}},{key:"bubble",value:function(){return{dataLabels:{style:{colors:["#fff"]}},tooltip:{shared:!1,intersect:!0},xaxis:{crosshairs:{width:0}},fill:{type:"solid",gradient:{shade:"light",inverse:!0,shadeIntensity:.55,opacityFrom:.4,opacityTo:.8}}}}},{key:"scatter",value:function(){return{dataLabels:{enabled:!1},tooltip:{shared:!1,intersect:!0},markers:{size:6,strokeWidth:2,hover:{sizeOffset:2}}}}},{key:"heatmap",value:function(){return{chart:{stacked:!1,zoom:{enabled:!1}},fill:{opacity:1},dataLabels:{style:{colors:["#fff"]}},stroke:{colors:["#fff"]},tooltip:{followCursor:!0,marker:{show:!1},x:{show:!1}},legend:{position:"top",markers:{shape:"square",size:10,offsetY:2}},grid:{padding:{right:20}}}}},{key:"pie",value:function(){return{chart:{toolbar:{show:!1}},plotOptions:{pie:{donut:{labels:{show:!1}}}},dataLabels:{formatter:function(t){return t.toFixed(1)+"%"},style:{colors:["#fff"]},dropShadow:{enabled:!0}},stroke:{colors:["#fff"]},fill:{opacity:1,gradient:{shade:"dark",shadeIntensity:.35,inverseColors:!1,stops:[0,100,100]}},padding:{right:0,left:0},tooltip:{theme:"dark",fillSeriesColor:!0},legend:{position:"right"}}}},{key:"donut",value:function(){return{chart:{toolbar:{show:!1}},dataLabels:{formatter:function(t){return t.toFixed(1)+"%"},style:{colors:["#fff"]},dropShadow:{enabled:!0}},stroke:{colors:["#fff"]},fill:{opacity:1,gradient:{shade:"dark",shadeIntensity:.4,inverseColors:!1,type:"vertical",opacityFrom:1,opacityTo:1,stops:[70,98,100]}},padding:{right:0,left:0},tooltip:{theme:"dark",fillSeriesColor:!0},legend:{position:"right"}}}},{key:"radar",value:function(){return this.opts.yaxis[0].labels.style.fontSize="13px",this.opts.yaxis[0].labels.offsetY=6,{dataLabels:{enabled:!0,style:{colors:["#a8a8a8"],fontSize:"11px"}},stroke:{width:2},markers:{size:3,strokeWidth:1,strokeOpacity:1},fill:{opacity:.2},tooltip:{shared:!1,intersect:!0,followCursor:!0},grid:{show:!1},xaxis:{tooltip:{enabled:!1},crosshairs:{show:!1}}}}},{key:"radialBar",value:function(){return{chart:{animations:{dynamicAnimation:{enabled:!0,speed:800}},toolbar:{show:!1}},fill:{gradient:{shade:"dark",shadeIntensity:.4,inverseColors:!1,type:"diagonal2",opacityFrom:1,opacityTo:1,stops:[70,98,100]}},padding:{right:0,left:0},legend:{show:!1,position:"right"},tooltip:{enabled:!1,fillSeriesColor:!0}}}}],[{key:"convertCatToNumeric",value:function(t){t.xaxis.type="numeric",t.xaxis.convertedCatToNumeric=!0,t.xaxis.labels=t.xaxis.labels||{},t.xaxis.labels.formatter=t.xaxis.labels.formatter||function(t){return t},t.chart=t.chart||{},t.chart.zoom=t.chart.zoom||window.Apex.chart&&window.Apex.chart.zoom||{};var e=t.xaxis.labels.formatter,i=t.xaxis.categories&&t.xaxis.categories.length?t.xaxis.categories:t.labels;return i&&i.length&&(t.xaxis.labels.formatter=function(t){return e(i[t-1])}),t.xaxis.categories=[],t.labels=[],t.chart.zoom.enabled=t.chart.zoom.enabled||!1,t}}]),t}(),y=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w}return s(t,[{key:"getStackedSeriesTotals",value:function(){for(var t=this.w,e=[],i=0;i<t.globals.series[t.globals.maxValsInArrayIndex].length;i++){for(var s=0,a=0;a<t.globals.series.length;a++)s+=t.globals.series[a][i];e.push(s)}return t.globals.stackedSeriesTotals=e,e}},{key:"getSeriesTotalByIndex",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null===t?this.w.config.series.reduce(function(t,e){return t+e},0):this.w.globals.series[t].reduce(function(t,e){return t+e},0)}},{key:"isSeriesNull",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return 0===(null===t?this.w.config.series.filter(function(t){return null!==t}):this.w.globals.series[t].filter(function(t){return null!==t})).length}},{key:"seriesHaveSameValues",value:function(t){return this.w.globals.series[t].every(function(t,e,i){return t===i[0]})}},{key:"getLargestSeries",value:function(){var t=this.w;t.globals.maxValsInArrayIndex=t.globals.series.map(function(t){return t.length}).indexOf(Math.max.apply(Math,t.globals.series.map(function(t){return t.length})))}},{key:"getLargestMarkerSize",value:function(){var t=this.w,e=0;return t.globals.markers.size.forEach(function(t){e=Math.max(e,t)}),t.globals.markers.largestSize=e,e}},{key:"getSeriesTotals",value:function(){var t=this.w;t.globals.seriesTotals=t.globals.series.map(function(t,e){var i=0;if(Array.isArray(t))for(var s=0;s<t.length;s++)i+=t[s];else i+=t;return i})}},{key:"getSeriesTotalsXRange",value:function(t,e){var i=this.w;return i.globals.series.map(function(s,a){for(var n=0,r=0;r<s.length;r++)i.globals.seriesX[a][r]>t&&i.globals.seriesX[a][r]<e&&(n+=s[r]);return n})}},{key:"getPercentSeries",value:function(){var t=this.w;t.globals.seriesPercent=t.globals.series.map(function(e,i){var s=[];if(Array.isArray(e))for(var a=0;a<e.length;a++){var n=t.globals.stackedSeriesTotals[a],r=100*e[a]/n;s.push(r)}else{var o=100*e/t.globals.seriesTotals.reduce(function(t,e){return t+e},0);s.push(o)}return s})}},{key:"getCalculatedRatios",value:function(){var t,e,i,s,a,n=this.w.globals,r=[],o=[],l=.1,h=0;if(n.yRange=[],n.isMultipleYAxis)for(var c=0;c<n.minYArr.length;c++)n.yRange.push(Math.abs(n.minYArr[c]-n.maxYArr[c])),o.push(0);else n.yRange.push(Math.abs(n.minY-n.maxY));n.xRange=Math.abs(n.maxX-n.minX),n.zRange=Math.abs(n.maxZ-n.minZ);for(var d=0;d<n.yRange.length;d++)r.push(n.yRange[d]/n.gridHeight);if(e=n.xRange/n.gridWidth,i=Math.abs(n.initialmaxX-n.initialminX)/n.gridWidth,t=n.yRange/n.gridWidth,s=n.xRange/n.gridHeight,a=n.zRange/n.gridHeight*16,n.minY!==Number.MIN_VALUE&&0!==Math.abs(n.minY)&&(n.hasNegs=!0),n.isMultipleYAxis){o=[];for(var u=0;u<r.length;u++)o.push(-n.minYArr[u]/r[u])}else o.push(-n.minY/r[0]),n.minY!==Number.MIN_VALUE&&0!==Math.abs(n.minY)&&(l=-n.minY/t,h=n.minX/e);return{yRatio:r,invertedYRatio:t,zRatio:a,xRatio:e,initialXRatio:i,invertedXRatio:s,baseLineInvertedY:l,baseLineY:o,baseLineX:h}}},{key:"getLogSeries",value:function(t){var e=this.w;return e.globals.seriesLog=t.map(function(t,i){return e.config.yaxis[i]&&e.config.yaxis[i].logarithmic?t.map(function(t){return null===t?null:(Math.log(t)-Math.log(e.globals.minYArr[i]))/(Math.log(e.globals.maxYArr[i])-Math.log(e.globals.minYArr[i]))}):t}),e.globals.seriesLog}},{key:"getLogYRatios",value:function(t){var e=this,i=this.w,s=this.w.globals;return s.yLogRatio=t.slice(),s.logYRange=s.yRange.map(function(t,a){if(i.config.yaxis[a]&&e.w.config.yaxis[a].logarithmic){var n,r=-Number.MAX_VALUE,o=Number.MIN_VALUE;return s.seriesLog.forEach(function(t,e){t.forEach(function(t){i.config.yaxis[e]&&i.config.yaxis[e].logarithmic&&(r=Math.max(t,r),o=Math.min(t,o))})}),n=Math.pow(s.yRange[a],Math.abs(o-r)/s.yRange[a]),s.yLogRatio[a]=n/s.gridHeight,n}}),s.yLogRatio}}],[{key:"checkComboSeries",value:function(t){var e=!1,i=!1;return t.length&&void 0!==t[0].type&&(e=!0,t.forEach(function(t){"bar"!==t.type&&"column"!==t.type||(i=!0)})),{comboCharts:e,comboChartsHasBars:i}}},{key:"extendArrayProps",value:function(t,e){return e.yaxis&&(e=t.extendYAxis(e)),e.annotations&&(e.annotations.yaxis&&(e=t.extendYAxisAnnotations(e)),e.annotations.xaxis&&(e=t.extendXAxisAnnotations(e)),e.annotations.points&&(e=t.extendPointAnnotations(e))),e}}]),t}(),w=function(){function i(t){e(this,i),this.opts=t}return s(i,[{key:"init",value:function(){var e=this.opts,i=new x,s=new v(e);this.chartType=e.chart.type,"histogram"===this.chartType&&(e.chart.type="bar",e=d.extend({plotOptions:{bar:{columnWidth:"99.99%"}}},e)),e.series=this.checkEmptySeries(e.series),e=this.extendYAxis(e),e=this.extendAnnotations(e);var a=i.init(),n={};if(e&&"object"===t(e)){var r={};switch(this.chartType){case"line":r=s.line();break;case"area":r=s.area();break;case"bar":r=s.bar();break;case"candlestick":r=s.candlestick();break;case"rangeBar":r=s.rangeBar();break;case"histogram":r=s.bar();break;case"bubble":r=s.bubble();break;case"scatter":r=s.scatter();break;case"heatmap":r=s.heatmap();break;case"pie":r=s.pie();break;case"donut":r=s.donut();break;case"radar":r=s.radar();break;case"radialBar":r=s.radialBar();break;default:r=s.line()}e.chart.brush&&e.chart.brush.enabled&&(r=s.brush(r)),e.chart.stacked&&"100%"===e.chart.stackType&&s.stacked100(),this.checkForDarkTheme(window.Apex),this.checkForDarkTheme(e),e.xaxis=e.xaxis||window.Apex.xaxis||{};var o=y.checkComboSeries(e.series);"line"!==e.chart.type&&"area"!==e.chart.type&&"scatter"!==e.chart.type||o.comboChartsHasBars||"datetime"===e.xaxis.type||"numeric"===e.xaxis.type||"between"===e.xaxis.tickPlacement||(e=v.convertCatToNumeric(e)),(e.chart.sparkline&&e.chart.sparkline.enabled||window.Apex.chart&&window.Apex.chart.sparkline&&window.Apex.chart.sparkline.enabled)&&(r=s.sparkline(r)),n=d.extend(a,r)}var l=d.extend(n,window.Apex);return a=d.extend(l,e),a=this.handleUserInputErrors(a)}},{key:"extendYAxis",value:function(t){var e=new x;return void 0===t.yaxis&&(t.yaxis={}),t.yaxis.constructor!==Array&&window.Apex.yaxis&&window.Apex.yaxis.constructor!==Array&&(t.yaxis=d.extend(t.yaxis,window.Apex.yaxis)),t.yaxis.constructor!==Array?t.yaxis=[d.extend(e.yAxis,t.yaxis)]:t.yaxis=d.extendArray(t.yaxis,e.yAxis),t}},{key:"extendAnnotations",value:function(t){return void 0===t.annotations&&(t.annotations={},t.annotations.yaxis=[],t.annotations.xaxis=[],t.annotations.points=[]),t=this.extendYAxisAnnotations(t),t=this.extendXAxisAnnotations(t),t=this.extendPointAnnotations(t)}},{key:"extendYAxisAnnotations",value:function(t){var e=new x;return t.annotations.yaxis=d.extendArray(void 0!==t.annotations.yaxis?t.annotations.yaxis:[],e.yAxisAnnotation),t}},{key:"extendXAxisAnnotations",value:function(t){var e=new x;return t.annotations.xaxis=d.extendArray(void 0!==t.annotations.xaxis?t.annotations.xaxis:[],e.xAxisAnnotation),t}},{key:"extendPointAnnotations",value:function(t){var e=new x;return t.annotations.points=d.extendArray(void 0!==t.annotations.points?t.annotations.points:[],e.pointAnnotation),t}},{key:"checkForDarkTheme",value:function(t){t.theme&&"dark"===t.theme.mode&&(t.tooltip||(t.tooltip={}),"light"!==t.tooltip.theme&&(t.tooltip.theme="dark"),t.chart.foreColor||(t.chart.foreColor="#f6f7f8"),t.theme.palette||(t.theme.palette="palette4"))}},{key:"checkEmptySeries",value:function(t){return 0===t.length?[{data:[]}]:t}},{key:"handleUserInputErrors",value:function(t){var e=t;if(e.tooltip.shared&&e.tooltip.intersect)throw new Error("tooltip.shared cannot be enabled when tooltip.intersect is true. Turn off any other option by setting it to false.");if(e.chart.scroller&&console.warn("Scroller has been deprecated since v2.0.0. Please remove the configuration for chart.scroller"),("bar"===e.chart.type||"rangeBar"===e.chart.type)&&e.plotOptions.bar.horizontal){if(e.yaxis.length>1)throw new Error("Multiple Y Axis for bars are not supported. Switch to column chart by setting plotOptions.bar.horizontal=false");e.yaxis[0].reversed&&(e.yaxis[0].opposite=!0),e.xaxis.tooltip.enabled=!1,e.yaxis[0].tooltip.enabled=!1,e.chart.zoom.enabled=!1}return"bar"!==e.chart.type&&"rangeBar"!==e.chart.type||e.tooltip.shared&&("barWidth"===e.xaxis.crosshairs.width&&e.series.length>1&&(console.warn('crosshairs.width = "barWidth" is only supported in single series, not in a multi-series barChart.'),e.xaxis.crosshairs.width="tickWidth"),e.plotOptions.bar.horizontal&&(e.states.hover.type="none",e.tooltip.shared=!1),e.tooltip.followCursor||(console.warn("followCursor option in shared columns cannot be turned off. Please set %ctooltip.followCursor: true","color: blue;"),e.tooltip.followCursor=!0)),"candlestick"===e.chart.type&&e.yaxis[0].reversed&&(console.warn("Reversed y-axis in candlestick chart is not supported."),e.yaxis[0].reversed=!1),e.chart.group&&0===e.yaxis[0].labels.minWidth&&console.warn("It looks like you have multiple charts in synchronization. You must provide yaxis.labels.minWidth which must be EQUAL for all grouped charts to prevent incorrect behaviour."),Array.isArray(e.stroke.width)&&"line"!==e.chart.type&&"area"!==e.chart.type&&(console.warn("stroke.width option accepts array only for line and area charts. Reverted back to Number"),e.stroke.width=e.stroke.width[0]),e}}]),i}(),k=function(){function t(){e(this,t)}return s(t,[{key:"globalVars",value:function(t){return{chartID:null,cuid:null,events:{beforeMount:[],mounted:[],updated:[],clicked:[],selection:[],dataPointSelection:[],zoomed:[],scrolled:[]},colors:[],clientX:null,clientY:null,fill:{colors:[]},stroke:{colors:[]},dataLabels:{style:{colors:[]}},radarPolygons:{fill:{colors:[]}},markers:{colors:[],size:t.markers.size,largestSize:0},animationEnded:!1,isTouchDevice:"ontouchstart"in window||navigator.msMaxTouchPoints,isDirty:!1,initialConfig:null,lastXAxis:[],lastYAxis:[],series:[],seriesRangeStart:[],seriesRangeEnd:[],seriesPercent:[],seriesTotals:[],stackedSeriesTotals:[],seriesX:[],seriesZ:[],labels:[],timelineLabels:[],invertedTimelineLabels:[],seriesNames:[],noLabelsProvided:!1,allSeriesCollapsed:!1,collapsedSeries:[],collapsedSeriesIndices:[],ancillaryCollapsedSeries:[],ancillaryCollapsedSeriesIndices:[],risingSeries:[],dataFormatXNumeric:!1,selectedDataPoints:[],ignoreYAxisIndexes:[],padHorizontal:0,maxValsInArrayIndex:0,zoomEnabled:"zoom"===t.chart.toolbar.autoSelected&&t.chart.toolbar.tools.zoom&&t.chart.zoom.enabled,panEnabled:"pan"===t.chart.toolbar.autoSelected&&t.chart.toolbar.tools.pan,selectionEnabled:"selection"===t.chart.toolbar.autoSelected&&t.chart.toolbar.tools.selection,yaxis:null,minY:Number.MIN_VALUE,maxY:-Number.MAX_VALUE,minYArr:[],maxYArr:[],maxX:-Number.MAX_VALUE,initialmaxX:-Number.MAX_VALUE,minX:Number.MIN_VALUE,initialminX:Number.MIN_VALUE,minZ:Number.MIN_VALUE,maxZ:-Number.MAX_VALUE,minXDiff:Number.MAX_VALUE,mousedown:!1,lastClientPosition:{},visibleXRange:void 0,yRange:[],zRange:0,xRange:0,yValueDecimal:0,total:0,SVGNS:"http://www.w3.org/2000/svg",svgWidth:0,svgHeight:0,noData:!1,locale:{},dom:{},memory:{methodsToExec:[]},shouldAnimate:!0,delayedElements:[],axisCharts:!0,isXNumeric:!1,isDataXYZ:!1,resized:!1,resizeTimer:null,comboCharts:!1,comboChartsHasBars:!1,dataChanged:!1,previousPaths:[],seriesXvalues:[],seriesYvalues:[],seriesCandleO:[],seriesCandleH:[],seriesCandleL:[],seriesCandleC:[],allSeriesHasEqualX:!0,dataPoints:0,pointsArray:[],dataLabelsRects:[],lastDrawnDataLabelsIndexes:[],hasNullValues:!1,easing:null,zoomed:!1,gridWidth:0,gridHeight:0,yAxisScale:[],xAxisScale:null,xAxisTicksPositions:[],timescaleTicks:[],rotateXLabels:!1,defaultLabels:!1,xLabelFormatter:void 0,yLabelFormatters:[],xaxisTooltipFormatter:void 0,ttKeyFormatter:void 0,ttVal:void 0,ttZFormatter:void 0,LINE_HEIGHT_RATIO:1.618,xAxisLabelsHeight:0,yAxisLabelsWidth:0,scaleX:1,scaleY:1,translateX:0,translateY:0,translateYAxisX:[],yLabelsCoords:[],yTitleCoords:[],yAxisWidths:[],translateXAxisY:0,translateXAxisX:0,tooltip:null,tooltipOpts:null}}},{key:"init",value:function(t){var e=this.globalVars(t);return e.initialConfig=d.extend({},t),e.initialSeries=JSON.parse(JSON.stringify(e.initialConfig.series)),e.lastXAxis=JSON.parse(JSON.stringify(e.initialConfig.xaxis)),e.lastYAxis=JSON.parse(JSON.stringify(e.initialConfig.yaxis)),e}}]),t}(),A=function(){function t(i){e(this,t),this.opts=i}return s(t,[{key:"init",value:function(){var t=new w(this.opts).init();return{config:t,globals:(new k).init(t)}}}]),t}(),S=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.opts=null,this.seriesIndex=0}return s(t,[{key:"clippedImgArea",value:function(t){var e=this.w,i=e.config,s=parseInt(e.globals.gridWidth),a=parseInt(e.globals.gridHeight),n=s>a?s:a,r=t.image,o=0,l=0;void 0===t.width&&void 0===t.height?void 0!==i.fill.image.width&&void 0!==i.fill.image.height?(o=i.fill.image.width+1,l=i.fill.image.height):(o=n+1,l=n):(o=t.width,l=t.height);var h=document.createElementNS(e.globals.SVGNS,"pattern");f.setAttrs(h,{id:t.patternID,patternUnits:t.patternUnits?t.patternUnits:"userSpaceOnUse",width:o+"px",height:l+"px"});var c=document.createElementNS(e.globals.SVGNS,"image");h.appendChild(c),c.setAttributeNS("http://www.w3.org/1999/xlink","href",r),f.setAttrs(c,{x:0,y:0,preserveAspectRatio:"none",width:o+"px",height:l+"px"}),c.style.opacity=t.opacity,e.globals.dom.elDefs.node.appendChild(h)}},{key:"getSeriesIndex",value:function(t){var e=this.w;return"bar"===e.config.chart.type&&e.config.plotOptions.bar.distributed||"heatmap"===e.config.chart.type?this.seriesIndex=t.seriesNumber:this.seriesIndex=t.seriesNumber%e.globals.series.length,this.seriesIndex}},{key:"fillPath",value:function(t){var e=this.w;this.opts=t;var i,s,a,n=this.w.config;this.seriesIndex=this.getSeriesIndex(t);var r=this.getFillColors(),o=r[this.seriesIndex],l=this.getFillType(this.seriesIndex),h=Array.isArray(n.fill.opacity)?n.fill.opacity[this.seriesIndex]:n.fill.opacity,c=o;return t.color&&(o=t.color),-1===o.indexOf("rgb")?c=d.hexToRgba(o,h):o.indexOf("rgba")>-1&&(h="0."+d.getOpacityFromRGBA(r[this.seriesIndex])),"pattern"===l&&(s=this.handlePatternFill(s,o,h,c)),"gradient"===l&&(a=this.handleGradientFill(a,o,h,this.seriesIndex)),n.fill.image.src.length>0&&"image"===l?t.seriesNumber<n.fill.image.src.length?(this.clippedImgArea({opacity:h,image:n.fill.image.src[t.seriesNumber],patternUnits:t.patternUnits,patternID:"pattern".concat(e.globals.cuid).concat(t.seriesNumber+1)}),i="url(#pattern".concat(e.globals.cuid).concat(t.seriesNumber+1,")")):i=c:i="gradient"===l?a:"pattern"===l?s:c,t.solid&&(i=c),i}},{key:"getFillType",value:function(t){var e=this.w;return Array.isArray(e.config.fill.type)?e.config.fill.type[t]:e.config.fill.type}},{key:"getFillColors",value:function(){var t=this.w,e=t.config,i=this.opts,s=[];return t.globals.comboCharts?"line"===t.config.series[this.seriesIndex].type?t.globals.stroke.colors instanceof Array?s=t.globals.stroke.colors:s.push(t.globals.stroke.colors):t.globals.fill.colors instanceof Array?s=t.globals.fill.colors:s.push(t.globals.fill.colors):"line"===e.chart.type?t.globals.stroke.colors instanceof Array?s=t.globals.stroke.colors:s.push(t.globals.stroke.colors):t.globals.fill.colors instanceof Array?s=t.globals.fill.colors:s.push(t.globals.fill.colors),void 0!==i.fillColors&&(s=[],i.fillColors instanceof Array?s=i.fillColors.slice():s.push(i.fillColors)),s}},{key:"handlePatternFill",value:function(t,e,i,s){var a=this.w.config,n=this.opts,r=new f(this.ctx),o=void 0===a.fill.pattern.strokeWidth?Array.isArray(a.stroke.width)?a.stroke.width[this.seriesIndex]:a.stroke.width:Array.isArray(a.fill.pattern.strokeWidth)?a.fill.pattern.strokeWidth[this.seriesIndex]:a.fill.pattern.strokeWidth,l=e;a.fill.pattern.style instanceof Array?t=void 0!==a.fill.pattern.style[n.seriesNumber]?r.drawPattern(a.fill.pattern.style[n.seriesNumber],a.fill.pattern.width,a.fill.pattern.height,l,o,i):s:t=r.drawPattern(a.fill.pattern.style,a.fill.pattern.width,a.fill.pattern.height,l,o,i);return t}},{key:"handleGradientFill",value:function(t,e,i,s){var a,n,r=this.w.config,o=this.opts,l=new f(this.ctx),h=new d,c=r.fill.gradient.type,u=void 0===r.fill.gradient.opacityFrom?i:Array.isArray(r.fill.gradient.opacityFrom)?r.fill.gradient.opacityFrom[s]:r.fill.gradient.opacityFrom,g=void 0===r.fill.gradient.opacityTo?i:Array.isArray(r.fill.gradient.opacityTo)?r.fill.gradient.opacityTo[s]:r.fill.gradient.opacityTo;if(a=e,n=void 0===r.fill.gradient.gradientToColors||0===r.fill.gradient.gradientToColors.length?"dark"===r.fill.gradient.shade?h.shadeColor(-1*parseFloat(r.fill.gradient.shadeIntensity),e):h.shadeColor(parseFloat(r.fill.gradient.shadeIntensity),e):r.fill.gradient.gradientToColors[o.seriesNumber],r.fill.gradient.inverseColors){var p=a;a=n,n=p}return l.drawGradient(c,a,n,u,g,o.size,r.fill.gradient.stops,r.fill.gradient.colorStops,s)}}]),t}(),C=function(){function t(i,s){e(this,t),this.ctx=i,this.w=i.w}return s(t,[{key:"setGlobalMarkerSize",value:function(){var t=this.w;if(t.globals.markers.size=Array.isArray(t.config.markers.size)?t.config.markers.size:[t.config.markers.size],t.globals.markers.size.length>0){if(t.globals.markers.size.length<t.globals.series.length+1)for(var e=0;e<=t.globals.series.length;e++)void 0===t.globals.markers.size[e]&&t.globals.markers.size.push(t.globals.markers.size[0])}else t.globals.markers.size=t.config.series.map(function(e){return t.config.markers.size})}},{key:"plotChartMarkers",value:function(t,e,i){var s,a=this,n=this.w,r=e,o=t,l=null,h=new f(this.ctx);if(n.globals.markers.size[e]>0&&(l=h.group({class:"apexcharts-series-markers"})).attr("clip-path","url(#gridRectMarkerMask".concat(n.globals.cuid,")")),o.x instanceof Array)for(var c=function(t){var c=i;1===i&&0===t&&(c=0),1===i&&1===t&&(c=1);var g="apexcharts-marker";if("line"!==n.config.chart.type&&"area"!==n.config.chart.type||n.globals.comboCharts||n.config.tooltip.intersect||(g+=" no-pointer-events"),Array.isArray(n.config.markers.size)?n.globals.markers.size[e]>0:n.config.markers.size>0){d.isNumber(o.y[t])?g+=" w".concat((Math.random()+1).toString(36).substring(4)):g="apexcharts-nullpoint";var f=a.getMarkerConfig(g,e);n.config.markers.discrete.map(function(t){t.seriesIndex===e&&t.dataPointIndex===c&&(f.pointStrokeColor=t.strokeColor,f.pointFillColor=t.fillColor,f.pSize=t.size)}),n.config.series[r].data[i]&&(n.config.series[r].data[i].fillColor&&(f.pointFillColor=n.config.series[r].data[i].fillColor),n.config.series[r].data[i].strokeColor&&(f.pointStrokeColor=n.config.series[r].data[i].strokeColor)),(s=h.drawMarker(o.x[t],o.y[t],f)).attr("rel",c),s.attr("j",c),s.attr("index",e),s.node.setAttribute("default-marker-size",f.pSize),new u(a.ctx).setSelectionFilter(s,e,c),a.addEvents(s),l&&l.add(s)}else void 0===n.globals.pointsArray[e]&&(n.globals.pointsArray[e]=[]),n.globals.pointsArray[e].push([o.x[t],o.y[t]])},g=0;g<o.x.length;g++)c(g);return l}},{key:"getMarkerConfig",value:function(t,e){var i=this.w,s=this.getMarkerStyle(e);return{pSize:i.globals.markers.size[e],pRadius:i.config.markers.radius,pWidth:i.config.markers.strokeWidth,pointStrokeColor:s.pointStrokeColor,pointFillColor:s.pointFillColor,shape:i.config.markers.shape instanceof Array?i.config.markers.shape[e]:i.config.markers.shape,class:t,pointStrokeOpacity:i.config.markers.strokeOpacity,pointFillOpacity:i.config.markers.fillOpacity,seriesIndex:e}}},{key:"addEvents",value:function(t){var e=new f(this.ctx);t.node.addEventListener("mouseenter",e.pathMouseEnter.bind(this.ctx,t)),t.node.addEventListener("mouseleave",e.pathMouseLeave.bind(this.ctx,t)),t.node.addEventListener("mousedown",e.pathMouseDown.bind(this.ctx,t)),t.node.addEventListener("touchstart",e.pathMouseDown.bind(this.ctx,t),{passive:!0})}},{key:"getMarkerStyle",value:function(t){var e=this.w,i=e.globals.markers.colors,s=e.config.markers.strokeColor||e.config.markers.strokeColors;return{pointStrokeColor:s instanceof Array?s[t]:s,pointFillColor:i instanceof Array?i[t]:i}}}]),t}(),L=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.initialAnim=this.w.config.chart.animations.enabled,this.dynamicAnim=this.initialAnim&&this.w.config.chart.animations.dynamicAnimation.enabled,this.radiusSizes=[]}return s(t,[{key:"draw",value:function(t,e,i){var s=this.w,a=new f(this.ctx),n=i.realIndex,r=i.pointsPos,o=i.zRatio,l=i.elParent,h=a.group({class:"apexcharts-series-markers apexcharts-series-".concat(s.config.chart.type)});if(h.attr("clip-path","url(#gridRectMarkerMask".concat(s.globals.cuid,")")),r.x instanceof Array)for(var c=0;c<r.x.length;c++){var d=e+1,u=!0;0===e&&0===c&&(d=0),0===e&&1===c&&(d=1);var g=0,p=s.globals.markers.size[n];o!==1/0&&(p=s.globals.seriesZ[n][d]/o,void 0===this.radiusSizes[n]&&this.radiusSizes.push([]),this.radiusSizes[n].push(p)),s.config.chart.animations.enabled||(g=p);var x=r.x[c],b=r.y[c];if(g=g||0,(0===x&&0===b||null===b||void 0===s.globals.series[n][d])&&(u=!1),u){var m=this.drawPoint(x,b,g,p,n,d,e);h.add(m)}l.add(h)}}},{key:"drawPoint",value:function(t,e,i,s,a,n,r){var o=this.w,l=a,h=new g(this.ctx),c=new u(this.ctx),d=new S(this.ctx),p=new C(this.ctx),x=new f(this.ctx),b=p.getMarkerConfig("apexcharts-marker",l),m=d.fillPath({seriesNumber:a,patternUnits:"objectBoundingBox"}),v=x.drawCircle(i);if(o.config.series[l].data[n]&&o.config.series[l].data[n].fillColor&&(m=o.config.series[l].data[n].fillColor),v.attr({cx:t,cy:e,fill:m,stroke:b.pointStrokeColor,strokeWidth:b.pWidth}),o.config.chart.dropShadow.enabled){var y=o.config.chart.dropShadow;c.dropShadow(v,y,a)}if(this.initialAnim&&!o.globals.dataChanged){var w=1;o.globals.resized||(w=o.config.chart.animations.speed),h.animateCircleRadius(v,0,s,w,o.globals.easing)}if(o.globals.dataChanged)if(this.dynamicAnim){var k,A,L,z,P=o.config.chart.animations.dynamicAnimation.speed;null!=(z=o.globals.previousPaths[a]&&o.globals.previousPaths[a][r])&&(k=z.x,A=z.y,L=void 0!==z.r?z.r:s);for(var E=0;E<o.globals.collapsedSeries.length;E++)o.globals.collapsedSeries[E].index===a&&(P=1,s=0);0===t&&0===e&&(s=0),h.animateCircle(v,{cx:k,cy:A,r:L},{cx:t,cy:e,r:s},P,o.globals.easing)}else v.attr({r:s});return v.attr({rel:n,j:n,index:a,"default-marker-size":s}),c.setSelectionFilter(v,a,n),p.addEvents(v),v.node.classList.add("apexcharts-marker"),v}},{key:"centerTextInBubble",value:function(t){var e=this.w;return{y:t+=parseInt(e.config.dataLabels.style.fontSize)/4}}}]),t}(),z=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w}return s(t,[{key:"dataLabelsCorrection",value:function(t,e,i,s,a,n,r){var o=this.w,l=!1,h=new f(this.ctx).getTextRects(i,r),c=h.width,d=h.height;void 0===o.globals.dataLabelsRects[s]&&(o.globals.dataLabelsRects[s]=[]),o.globals.dataLabelsRects[s].push({x:t,y:e,width:c,height:d});var u=o.globals.dataLabelsRects[s].length-2,g=void 0!==o.globals.lastDrawnDataLabelsIndexes[s]?o.globals.lastDrawnDataLabelsIndexes[s][o.globals.lastDrawnDataLabelsIndexes[s].length-1]:0;if(void 0!==o.globals.dataLabelsRects[s][u]){var p=o.globals.dataLabelsRects[s][g];(t>p.x+p.width+2||e>p.y+p.height+2||t+c<p.x)&&(l=!0)}return(0===a||n)&&(l=!0),{x:t,y:e,drawnextLabel:l}}},{key:"drawDataLabel",value:function(t,e,i){var s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"top",a=this.w,n=new f(this.ctx),r=a.config.dataLabels,o=0,l=0,h=i,c=null;if(!r.enabled||t.x instanceof Array!=!0)return c;(c=n.group({class:"apexcharts-data-labels"})).attr("clip-path","url(#gridRectMarkerMask".concat(a.globals.cuid,")"));for(var d=0;d<t.x.length;d++)if(o=t.x[d]+r.offsetX,l=t.y[d]+r.offsetY-a.globals.markers.size[e]-5,"bottom"===s&&(l=l+2*a.globals.markers.size[e]+1.4*parseInt(r.style.fontSize)),!isNaN(o)){1===i&&0===d&&(h=0),1===i&&1===d&&(h=1);var u=a.globals.series[e][h],g="";if("bubble"===a.config.chart.type)g=a.globals.seriesZ[e][h],l=t.y[d]+a.config.dataLabels.offsetY,l=new L(this.ctx).centerTextInBubble(l,e,h).y;else null!=u&&(g=a.config.dataLabels.formatter(u,{ctx:this.ctx,seriesIndex:e,dataPointIndex:h,w:a}));this.plotDataLabelsText({x:o,y:l,text:g,i:e,j:h,parent:c,offsetCorrection:!0,dataLabelsConfig:a.config.dataLabels})}return c}},{key:"plotDataLabelsText",value:function(t){var e=this.w,i=new f(this.ctx),s=t.x,a=t.y,n=t.i,r=t.j,o=t.text,l=t.textAnchor,h=t.parent,c=t.dataLabelsConfig,d=t.alwaysDrawDataLabel,g=t.offsetCorrection;if(!(Array.isArray(e.config.dataLabels.enabledOnSeries)&&e.config.dataLabels.enabledOnSeries.indexOf(n)>-1)){var p={x:s,y:a,drawnextLabel:!0};if(g&&(p=this.dataLabelsCorrection(s,a,o,n,r,d,parseInt(c.style.fontSize))),e.globals.zoomed||(s=p.x,a=p.y),p.drawnextLabel){var x=i.drawText({width:100,height:parseInt(c.style.fontSize),x:s,y:a,foreColor:e.globals.dataLabels.style.colors[n],textAnchor:l||c.textAnchor,text:o,fontSize:c.style.fontSize,fontFamily:c.style.fontFamily});if(x.attr({class:"apexcharts-datalabel",cx:s,cy:a}),c.dropShadow.enabled){var b=c.dropShadow;new u(this.ctx).dropShadow(x,b)}h.add(x),void 0===e.globals.lastDrawnDataLabelsIndexes[n]&&(e.globals.lastDrawnDataLabelsIndexes[n]=[]),e.globals.lastDrawnDataLabelsIndexes[n].push(r)}}}}]),t}(),P=function(){function t(i,s){e(this,t),this.ctx=i,this.w=i.w;var a=this.w;this.barOptions=a.config.plotOptions.bar,this.isHorizontal=this.barOptions.horizontal,this.strokeWidth=a.config.stroke.width,this.isNullValue=!1,this.xyRatios=s,null!==this.xyRatios&&(this.xRatio=s.xRatio,this.yRatio=s.yRatio,this.invertedXRatio=s.invertedXRatio,this.invertedYRatio=s.invertedYRatio,this.baseLineY=s.baseLineY,this.baseLineInvertedY=s.baseLineInvertedY),this.yaxisIndex=0,this.seriesLen=0}return s(t,[{key:"draw",value:function(t,e){var i=this.w,s=new f(this.ctx),a=new y(this.ctx,i);t=a.getLogSeries(t),this.series=t,this.yRatio=a.getLogYRatios(this.yRatio),this.initVariables(t);var n=s.group({class:"apexcharts-bar-series apexcharts-plot-series"});i.config.dataLabels.enabled&&this.totalItems>i.config.plotOptions.bar.dataLabels.maxItems&&console.warn("WARNING: DataLabels are enabled but there are too many to display. This may cause performance issue when rendering.");for(var r=0,o=0;r<t.length;r++,o++){var l,h,c,u,g=void 0,p=void 0,x=void 0,b=void 0,m=[],v=[],w=i.globals.comboCharts?e[r]:r,k=s.group({class:"apexcharts-series ".concat(d.escapeString(i.globals.seriesNames[w])),rel:r+1,"data:realIndex":w});this.ctx.series.addCollapsedClassToSeries(k,w),t[r].length>0&&(this.visibleI=this.visibleI+1);var A=0,S=0,C=0;this.yRatio.length>1&&(this.yaxisIndex=w),this.isReversed=i.config.yaxis[this.yaxisIndex]&&i.config.yaxis[this.yaxisIndex].reversed;var L=this.initialPositions();b=L.y,S=L.barHeight,h=L.yDivision,u=L.zeroW,x=L.x,C=L.barWidth,l=L.xDivision,c=L.zeroH,this.horizontal||v.push(x+C/2);for(var z=s.group({class:"apexcharts-datalabels"}),P=0,E=i.globals.dataPoints;P<i.globals.dataPoints;P++,E--){void 0===this.series[r][P]||null===t[r][P]?this.isNullValue=!0:this.isNullValue=!1,i.config.stroke.show&&(A=this.isNullValue?0:Array.isArray(this.strokeWidth)?this.strokeWidth[w]:this.strokeWidth);var M=null;this.isHorizontal?(M=this.drawBarPaths({indexes:{i:r,j:P,realIndex:w,bc:o},barHeight:S,strokeWidth:A,pathTo:g,pathFrom:p,zeroW:u,x:x,y:b,yDivision:h,elSeries:k}),C=this.series[r][P]/this.invertedYRatio):(M=this.drawColumnPaths({indexes:{i:r,j:P,realIndex:w,bc:o},x:x,y:b,xDivision:l,pathTo:g,pathFrom:p,barWidth:C,zeroH:c,strokeWidth:A,elSeries:k}),S=this.series[r][P]/this.yRatio[this.yaxisIndex]),g=M.pathTo,p=M.pathFrom,b=M.y,x=M.x,P>0&&v.push(x+C/2),m.push(b);var T=this.getPathFillColor(t,r,P,w);k=this.renderSeries({realIndex:w,pathFill:T,j:P,i:r,pathFrom:p,pathTo:g,strokeWidth:A,elSeries:k,x:x,y:b,series:t,barHeight:S,barWidth:C,elDataLabelsWrap:z,visibleSeries:this.visibleI,type:"bar"})}i.globals.seriesXvalues[w]=v,i.globals.seriesYvalues[w]=m,n.add(k)}return n}},{key:"getPathFillColor",value:function(t,e,i,s){var a=this.w,n=new S(this.ctx),r=null,o=this.barOptions.distributed?i:e;this.barOptions.colors.ranges.length>0&&this.barOptions.colors.ranges.map(function(s){t[e][i]>=s.from&&t[e][i]<=s.to&&(r=s.color)});return a.config.series[e].data[i]&&a.config.series[e].data[i].fillColor&&(r=a.config.series[e].data[i].fillColor),n.fillPath({seriesNumber:this.barOptions.distributed?o:s,color:r})}},{key:"renderSeries",value:function(t){var e=t.realIndex,i=t.pathFill,s=t.lineFill,a=t.j,n=t.i,r=t.pathFrom,o=t.pathTo,l=t.strokeWidth,h=t.elSeries,c=t.x,d=t.y,g=t.series,p=t.barHeight,x=t.barWidth,b=t.elDataLabelsWrap,m=t.visibleSeries,v=t.type,y=this.w,w=new f(this.ctx);s||(s=this.barOptions.distributed?y.globals.stroke.colors[a]:y.globals.stroke.colors[e]),y.config.series[n].data[a]&&y.config.series[n].data[a].strokeColor&&(s=y.config.series[n].data[a].strokeColor),this.isNullValue&&(i="none");var k=a/y.config.chart.animations.animateGradually.delay*(y.config.chart.animations.speed/y.globals.dataPoints)/2.4,A=w.renderPaths({i:n,j:a,realIndex:e,pathFrom:r,pathTo:o,stroke:s,strokeWidth:l,strokeLineCap:y.config.stroke.lineCap,fill:i,animationDelay:k,initialSpeed:y.config.chart.animations.speed,dataChangeSpeed:y.config.chart.animations.dynamicAnimation.speed,className:"apexcharts-".concat(v,"-area"),id:"apexcharts-".concat(v,"-area")});A.attr("clip-path","url(#gridRectMask".concat(y.globals.cuid,")")),new u(this.ctx).setSelectionFilter(A,e,a),h.add(A);var S=this.calculateDataLabelsPos({x:c,y:d,i:n,j:a,series:g,realIndex:e,barHeight:p,barWidth:x,renderedPath:A,visibleSeries:m});return null!==S&&b.add(S),h.add(b),h}},{key:"initVariables",value:function(t){var e=this.w;this.series=t,this.totalItems=0,this.seriesLen=0,this.visibleI=-1,this.visibleItems=1;for(var i=0;i<t.length;i++)if(t[i].length>0&&(this.seriesLen=this.seriesLen+1,this.totalItems+=t[i].length),e.globals.isXNumeric)for(var s=0;s<t[i].length;s++)e.globals.seriesX[i][s]>e.globals.minX&&e.globals.seriesX[i][s]<e.globals.maxX&&this.visibleItems++;else this.visibleItems=e.globals.dataPoints;0===this.seriesLen&&(this.seriesLen=1)}},{key:"initialPositions",value:function(){var t,e,i,s,a,n,r,o,l=this.w;return this.isHorizontal?(a=(i=l.globals.gridHeight/l.globals.dataPoints)/this.seriesLen,l.globals.isXNumeric&&(a=(i=l.globals.gridHeight/this.totalItems)/this.seriesLen),a=a*parseInt(this.barOptions.barHeight)/100,o=this.baseLineInvertedY+l.globals.padHorizontal+(this.isReversed?l.globals.gridWidth:0)-(this.isReversed?2*this.baseLineInvertedY:0),e=(i-a*this.seriesLen)/2):(n=(s=l.globals.gridWidth/this.visibleItems)/this.seriesLen*parseInt(this.barOptions.columnWidth)/100,l.globals.isXNumeric&&(n=(s=l.globals.minXDiff/this.xRatio)/this.seriesLen*parseInt(this.barOptions.columnWidth)/100),r=l.globals.gridHeight-this.baseLineY[this.yaxisIndex]-(this.isReversed?l.globals.gridHeight:0)+(this.isReversed?2*this.baseLineY[this.yaxisIndex]:0),t=l.globals.padHorizontal+(s-n*this.seriesLen)/2),{x:t,y:e,yDivision:i,xDivision:s,barHeight:a,barWidth:n,zeroH:r,zeroW:o}}},{key:"drawBarPaths",value:function(t){var e=t.indexes,i=t.barHeight,s=t.strokeWidth,a=t.pathTo,n=t.pathFrom,r=t.zeroW,o=t.x,l=t.y,h=t.yDivision,c=t.elSeries,d=this.w,u=new f(this.ctx),g=e.i,p=e.j,x=e.realIndex,b=e.bc;d.globals.isXNumeric&&(l=(d.globals.seriesX[g][p]-d.globals.minX)/this.invertedXRatio-i);var m=l+i*this.visibleI;a=u.move(r,m),n=u.move(r,m),d.globals.previousPaths.length>0&&(n=this.getPathFrom(x,p));var v={barHeight:i,strokeWidth:s,barYPosition:m,x:o=void 0===this.series[g][p]||null===this.series[g][p]?r:r+this.series[g][p]/this.invertedYRatio-2*(this.isReversed?this.series[g][p]/this.invertedYRatio:0),zeroW:r},y=this.barEndingShape(d,v,this.series,g,p);if(a=a+u.line(y.newX,m)+y.path+u.line(r,m+i-s)+u.line(r,m),n=n+u.line(r,m)+y.ending_p_from+u.line(r,m+i-s)+u.line(r,m+i-s)+u.line(r,m),d.globals.isXNumeric||(l+=h),this.barOptions.colors.backgroundBarColors.length>0&&0===g){b>=this.barOptions.colors.backgroundBarColors.length&&(b=0);var w=this.barOptions.colors.backgroundBarColors[b],k=u.drawRect(0,m-i*this.visibleI,d.globals.gridWidth,i*this.seriesLen,0,w,this.barOptions.colors.backgroundBarOpacity);c.add(k),k.node.classList.add("apexcharts-backgroundBar")}return{pathTo:a,pathFrom:n,x:o,y:l,barYPosition:m}}},{key:"drawColumnPaths",value:function(t){var e=t.indexes,i=t.x,s=t.y,a=t.xDivision,n=t.pathTo,r=t.pathFrom,o=t.barWidth,l=t.zeroH,h=t.strokeWidth,c=t.elSeries,d=this.w,u=new f(this.ctx),g=e.i,p=e.j,x=e.realIndex,b=e.bc;d.globals.isXNumeric&&(i=(d.globals.seriesX[g][p]-d.globals.minX)/this.xRatio-o/2);var m=i+o*this.visibleI;n=u.move(m,l),r=u.move(m,l),d.globals.previousPaths.length>0&&(r=this.getPathFrom(x,p));var v={barWidth:o,strokeWidth:h,barXPosition:m,y:s=void 0===this.series[g][p]||null===this.series[g][p]?l:l-this.series[g][p]/this.yRatio[this.yaxisIndex]+2*(this.isReversed?this.series[g][p]/this.yRatio[this.yaxisIndex]:0),zeroH:l},y=this.barEndingShape(d,v,this.series,g,p);if(n=n+u.line(m,y.newY)+y.path+u.line(m+o-h,l)+u.line(m-h/2,l),r=r+u.line(m,l)+y.ending_p_from+u.line(m+o-h,l)+u.line(m+o-h,l)+u.line(m-h/2,l),d.globals.isXNumeric||(i+=a),this.barOptions.colors.backgroundBarColors.length>0&&0===g){b>=this.barOptions.colors.backgroundBarColors.length&&(b=0);var w=this.barOptions.colors.backgroundBarColors[b],k=u.drawRect(m-o*this.visibleI,0,o*this.seriesLen,d.globals.gridHeight,0,w,this.barOptions.colors.backgroundBarOpacity);c.add(k),k.node.classList.add("apexcharts-backgroundBar")}return{pathTo:n,pathFrom:r,x:i,y:s,barXPosition:m}}},{key:"getPathFrom",value:function(t,e){for(var i,s=this.w,a=0;a<s.globals.previousPaths.length;a++){var n=s.globals.previousPaths[a];n.paths.length>0&&parseInt(n.realIndex)===parseInt(t)&&void 0!==s.globals.previousPaths[a].paths[e]&&(i=s.globals.previousPaths[a].paths[e].d)}return i}},{key:"calculateDataLabelsPos",value:function(t){var e=t.x,i=t.y,s=t.i,a=t.j,n=t.realIndex,r=t.series,o=t.barHeight,l=t.barWidth,h=t.visibleSeries,c=t.renderedPath,d=this.w,u=new f(this.ctx),g=Array.isArray(this.strokeWidth)?this.strokeWidth[n]:this.strokeWidth,p=e+parseFloat(l*h),x=i+parseFloat(o*h);d.globals.isXNumeric&&!d.globals.isBarHorizontal&&(p=e+parseFloat(l*(h+1))-g,x=i+parseFloat(o*(h+1))-g);var b=e,m=i,v={},y=d.config.dataLabels,w=this.barOptions.dataLabels,k=y.offsetX,A=y.offsetY,S={width:0,height:0};return d.config.dataLabels.enabled&&(S=u.getTextRects(d.globals.yLabelFormatters[0](d.globals.maxY),parseInt(y.style.fontSize))),v=this.isHorizontal?this.calculateBarsDataLabelsPosition({x:e,y:i,i:s,j:a,renderedPath:c,bcy:x,barHeight:o,barWidth:l,textRects:S,strokeWidth:g,dataLabelsX:b,dataLabelsY:m,barDataLabelsConfig:w,offX:k,offY:A}):this.calculateColumnsDataLabelsPosition({x:e,y:i,i:s,j:a,renderedPath:c,realIndex:n,bcx:p,bcy:x,barHeight:o,barWidth:l,textRects:S,strokeWidth:g,dataLabelsY:m,barDataLabelsConfig:w,offX:k,offY:A}),c.attr({cy:v.bcy,cx:v.bcx,j:a,val:r[s][a],barHeight:o,barWidth:l}),this.drawCalculatedDataLabels({x:v.dataLabelsX,y:v.dataLabelsY,val:r[s][a],i:n,j:a,barWidth:l,barHeight:o,textRects:S,dataLabelsConfig:y})}},{key:"calculateColumnsDataLabelsPosition",value:function(t){var e,i=this.w,s=t.i,a=t.j,n=t.y,r=t.bcx,o=t.barWidth,l=t.barHeight,h=t.textRects,c=t.dataLabelsY,d=t.barDataLabelsConfig,u=t.strokeWidth,g=t.offX,f=t.offY,p=i.globals.gridWidth/i.globals.dataPoints;r-=u/2,e=i.globals.isXNumeric?r-o/2+g:r-p+o/2+g;var x=this.series[s][a]<=0;switch(this.isReversed&&(n-=l),d.position){case"center":c=x?n+l/2+h.height/2+f:n+l/2+h.height/2-f;break;case"bottom":c=x?n+l+h.height+u+f:n+l-h.height/2+u-f;break;case"top":c=x?n-h.height/2-f:n+h.height+f}return i.config.chart.stacked||(c<0?c=0+u:c+h.height/3>i.globals.gridHeight&&(c=i.globals.gridHeight-u)),{bcx:r,bcy:n,dataLabelsX:e,dataLabelsY:c}}},{key:"calculateBarsDataLabelsPosition",value:function(t){var e=this.w,i=t.x,s=t.i,a=t.j,n=t.bcy,r=t.barHeight,o=t.barWidth,l=t.textRects,h=t.dataLabelsX,c=t.strokeWidth,d=t.barDataLabelsConfig,u=t.offX,g=t.offY,f=n-e.globals.gridHeight/e.globals.dataPoints+r/2+l.height/2+g-3,p=this.series[s][a]<=0;switch(this.isReversed&&(i+=o),d.position){case"center":h=p?i-o/2-u:i-o/2+u;break;case"bottom":h=p?i-o-c-Math.round(l.width/2)-u:i-o+c+Math.round(l.width/2)+u;break;case"top":h=p?i-c+Math.round(l.width/2)-u:i-c-Math.round(l.width/2)+u}return e.config.chart.stacked||(h<0?h=h+l.width+c:h+l.width/2>e.globals.gridWidth&&(h=e.globals.gridWidth-l.width-c)),{bcx:i,bcy:n,dataLabelsX:h,dataLabelsY:f}}},{key:"drawCalculatedDataLabels",value:function(t){var e=t.x,i=t.y,s=t.val,a=t.i,n=t.j,r=t.textRects,o=t.barHeight,l=t.barWidth,h=t.dataLabelsConfig,c=this.w,d=new z(this.ctx),u=new f(this.ctx),g=h.formatter,p=null,x=c.globals.collapsedSeriesIndices.indexOf(a)>-1;if(h.enabled&&!x){p=u.group({class:"apexcharts-data-labels"});var b="";null!=s&&(b=g(s,{seriesIndex:a,dataPointIndex:n,w:c})),0===s&&c.config.chart.stacked&&(b=""),c.config.chart.stacked&&this.barOptions.dataLabels.hideOverflowingLabels&&(this.isHorizontal?(l=this.series[a][n]/this.yRatio[this.yaxisIndex],r.width/1.6>l&&(b="")):(o=this.series[a][n]/this.yRatio[this.yaxisIndex],r.height/1.6>o&&(b=""))),d.plotDataLabelsText({x:e,y:i,text:b,i:a,j:n,parent:p,dataLabelsConfig:h,alwaysDrawDataLabel:!0,offsetCorrection:!0})}return p}},{key:"barEndingShape",value:function(t,e,i,s,a){var n=new f(this.ctx);if(this.isHorizontal){var r=null,o=e.x;if(void 0!==i[s][a]||null!==i[s][a]){var l=i[s][a]<0,h=e.barHeight/2-e.strokeWidth;switch(l&&(h=-e.barHeight/2-e.strokeWidth),t.config.chart.stacked||"rounded"===this.barOptions.endingShape&&(o=e.x-h/2),this.barOptions.endingShape){case"flat":r=n.line(o,e.barYPosition+e.barHeight-e.strokeWidth);break;case"rounded":r=n.quadraticCurve(o+h,e.barYPosition+(e.barHeight-e.strokeWidth)/2,o,e.barYPosition+e.barHeight-e.strokeWidth)}}return{path:r,ending_p_from:"",newX:o}}var c=null,d=e.y;if(void 0!==i[s][a]||null!==i[s][a]){var u=i[s][a]<0,g=e.barWidth/2-e.strokeWidth;switch(u&&(g=-e.barWidth/2-e.strokeWidth),t.config.chart.stacked||"rounded"===this.barOptions.endingShape&&(d+=g/2),this.barOptions.endingShape){case"flat":c=n.line(e.barXPosition+e.barWidth-e.strokeWidth,d);break;case"rounded":c=n.quadraticCurve(e.barXPosition+(e.barWidth-e.strokeWidth)/2,d-g,e.barXPosition+e.barWidth-e.strokeWidth,d)}}return{path:c,ending_p_from:"",newY:d}}}]),t}(),E=function(t){function i(){return e(this,i),h(this,o(i).apply(this,arguments))}return r(i,P),s(i,[{key:"draw",value:function(t,e){var i=this.w;this.graphics=new f(this.ctx),this.fill=new S(this.ctx),this.bar=new P(this.ctx,this.xyRatios);var s=new y(this.ctx,i);t=s.getLogSeries(t),this.yRatio=s.getLogYRatios(this.yRatio),this.initVariables(t),"100%"===i.config.chart.stackType&&(t=i.globals.seriesPercent.slice()),this.series=t,this.totalItems=0,this.prevY=[],this.prevX=[],this.prevYF=[],this.prevXF=[],this.prevYVal=[],this.prevXVal=[],this.xArrj=[],this.xArrjF=[],this.xArrjVal=[],this.yArrj=[],this.yArrjF=[],this.yArrjVal=[];for(var a=0;a<t.length;a++)t[a].length>0&&(this.totalItems+=t[a].length);for(var n=this.graphics.group({class:"apexcharts-bar-series apexcharts-plot-series"}),r=0,o=0,l=0,h=0;l<t.length;l++,h++){var c=void 0,u=void 0,g=void 0,p=void 0,x=void 0,b=void 0,m=[],v=[],w=i.globals.comboCharts?e[l]:l;this.yRatio.length>1&&(this.yaxisIndex=w),this.isReversed=i.config.yaxis[this.yaxisIndex]&&i.config.yaxis[this.yaxisIndex].reversed;var k=this.graphics.group({class:"apexcharts-series ".concat(d.escapeString(i.globals.seriesNames[w])),rel:l+1,"data:realIndex":w}),A=this.graphics.group({class:"apexcharts-datalabels"}),C=0,L=0,z=0,E=this.initialPositions(r,o,g,p,x,b);o=E.y,L=E.barHeight,p=E.yDivision,b=E.zeroW,r=E.x,z=E.barWidth,g=E.xDivision,x=E.zeroH,this.yArrj=[],this.yArrjF=[],this.yArrjVal=[],this.xArrj=[],this.xArrjF=[],this.xArrjVal=[];for(var M=0;M<i.globals.dataPoints;M++){i.config.stroke.show&&(C=this.isNullValue?0:Array.isArray(this.strokeWidth)?this.strokeWidth[w]:this.strokeWidth);var T=null;this.isHorizontal?(T=this.drawBarPaths({indexes:{i:l,j:M,realIndex:w,bc:h},barHeight:L,strokeWidth:C,pathTo:c,pathFrom:u,zeroW:b,x:r,y:o,yDivision:p,elSeries:k}),z=this.series[l][M]/this.invertedYRatio):(T=this.drawColumnPaths({indexes:{i:l,j:M,realIndex:w,bc:h},x:r,y:o,xDivision:g,pathTo:c,pathFrom:u,barWidth:z,zeroH:x,strokeWidth:C,elSeries:k}),L=this.series[l][M]/this.yRatio[this.yaxisIndex]),c=T.pathTo,u=T.pathFrom,o=T.y,r=T.x,m.push(r),v.push(o);var X=this.bar.getPathFillColor(t,l,M,w);k=this.renderSeries({realIndex:w,pathFill:X,j:M,i:l,pathFrom:u,pathTo:c,strokeWidth:C,elSeries:k,x:r,y:o,series:t,barHeight:L,barWidth:z,elDataLabelsWrap:A,type:"bar",visibleSeries:0})}i.globals.seriesXvalues[w]=m,i.globals.seriesYvalues[w]=v,this.prevY.push(this.yArrj),this.prevYF.push(this.yArrjF),this.prevYVal.push(this.yArrjVal),this.prevX.push(this.xArrj),this.prevXF.push(this.xArrjF),this.prevXVal.push(this.xArrjVal),n.add(k)}return n}},{key:"initialPositions",value:function(t,e,i,s,a,n){var r,o,l=this.w;return this.isHorizontal?(r=(r=s=l.globals.gridHeight/l.globals.dataPoints)*parseInt(l.config.plotOptions.bar.barHeight)/100,n=this.baseLineInvertedY+l.globals.padHorizontal+(this.isReversed?l.globals.gridWidth:0)-(this.isReversed?2*this.baseLineInvertedY:0),e=(s-r)/2):(o=i=l.globals.gridWidth/l.globals.dataPoints,o=l.globals.isXNumeric?(i=l.globals.minXDiff/this.xRatio)*parseInt(this.barOptions.columnWidth)/100:o*parseInt(l.config.plotOptions.bar.columnWidth)/100,a=this.baseLineY[this.yaxisIndex]+(this.isReversed?l.globals.gridHeight:0)-(this.isReversed?2*this.baseLineY[this.yaxisIndex]:0),t=l.globals.padHorizontal+(i-o)/2),{x:t,y:e,yDivision:s,xDivision:i,barHeight:r,barWidth:o,zeroH:a,zeroW:n}}},{key:"drawBarPaths",value:function(t){for(var e,i=t.indexes,s=t.barHeight,a=t.strokeWidth,n=t.pathTo,r=t.pathFrom,o=t.zeroW,l=t.x,h=t.y,c=t.yDivision,d=t.elSeries,u=this.w,g=h,f=i.i,p=i.j,x=i.realIndex,b=i.bc,m=0,v=0;v<this.prevXF.length;v++)m+=this.prevXF[v][p];if(f>0){var y=o;this.prevXVal[f-1][p]<0?y=this.series[f][p]>=0?this.prevX[f-1][p]+m-2*(this.isReversed?m:0):this.prevX[f-1][p]:this.prevXVal[f-1][p]>=0&&(y=this.series[f][p]>=0?this.prevX[f-1][p]:this.prevX[f-1][p]-m+2*(this.isReversed?m:0)),e=y}else e=o;l=null===this.series[f][p]?e:e+this.series[f][p]/this.invertedYRatio-2*(this.isReversed?this.series[f][p]/this.invertedYRatio:0);var w={barHeight:s,strokeWidth:a,invertedYRatio:this.invertedYRatio,barYPosition:g,x:l},k=this.bar.barEndingShape(u,w,this.series,f,p);if(this.series.length>1&&f!==this.endingShapeOnSeriesNumber&&(k.path=this.graphics.line(k.newX,g+s-a)),this.xArrj.push(k.newX),this.xArrjF.push(Math.abs(e-k.newX)),this.xArrjVal.push(this.series[f][p]),n=this.graphics.move(e,g),r=this.graphics.move(e,g),u.globals.previousPaths.length>0&&(r=this.bar.getPathFrom(x,p,!1)),n=n+this.graphics.line(k.newX,g)+k.path+this.graphics.line(e,g+s-a)+this.graphics.line(e,g),r=r+this.graphics.line(e,g)+this.graphics.line(e,g+s-a)+this.graphics.line(e,g+s-a)+this.graphics.line(e,g+s-a)+this.graphics.line(e,g),u.config.plotOptions.bar.colors.backgroundBarColors.length>0&&0===f){b>=u.config.plotOptions.bar.colors.backgroundBarColors.length&&(b=0);var A=u.config.plotOptions.bar.colors.backgroundBarColors[b],S=this.graphics.drawRect(0,g,u.globals.gridWidth,s,0,A,u.config.plotOptions.bar.colors.backgroundBarOpacity);d.add(S),S.node.classList.add("apexcharts-backgroundBar")}return{pathTo:n,pathFrom:r,x:l,y:h+=c}}},{key:"drawColumnPaths",value:function(t){var e=t.indexes,i=t.x,s=t.y,a=t.xDivision,n=t.pathTo,r=t.pathFrom,o=t.barWidth,l=t.zeroH,h=t.strokeWidth,c=t.elSeries,d=this.w,u=e.i,g=e.j,f=e.realIndex,p=e.bc;if(d.globals.isXNumeric){var x=d.globals.seriesX[u][g];x||(x=0),i=(x-d.globals.minX)/this.xRatio-o/2}for(var b,m=i,v=0,y=0;y<this.prevYF.length;y++)v+=this.prevYF[y][g];if(u>0&&!d.globals.isXNumeric||u>0&&d.globals.isXNumeric&&d.globals.seriesX[u-1][g]===d.globals.seriesX[u][g]){var w=this.prevY[u-1][g];b=this.prevYVal[u-1][g]<0?this.series[u][g]>=0?w-v+2*(this.isReversed?v:0):w:this.series[u][g]>=0?w:w+v-2*(this.isReversed?v:0)}else b=d.globals.gridHeight-l;s=b-this.series[u][g]/this.yRatio[this.yaxisIndex]+2*(this.isReversed?this.series[u][g]/this.yRatio[this.yaxisIndex]:0);var k={barWidth:o,strokeWidth:h,yRatio:this.yRatio[this.yaxisIndex],barXPosition:m,y:s},A=this.bar.barEndingShape(d,k,this.series,u,g);if(this.yArrj.push(A.newY),this.yArrjF.push(Math.abs(b-A.newY)),this.yArrjVal.push(this.series[u][g]),n=this.graphics.move(m,b),r=this.graphics.move(m,b),d.globals.previousPaths.length>0&&(r=this.bar.getPathFrom(f,g,!1)),n=n+this.graphics.line(m,A.newY)+A.path+this.graphics.line(m+o-h,b)+this.graphics.line(m-h/2,b),r=r+this.graphics.line(m,b)+this.graphics.line(m+o-h,b)+this.graphics.line(m+o-h,b)+this.graphics.line(m+o-h,b)+this.graphics.line(m-h/2,b),d.config.plotOptions.bar.colors.backgroundBarColors.length>0&&0===u){p>=d.config.plotOptions.bar.colors.backgroundBarColors.length&&(p=0);var S=d.config.plotOptions.bar.colors.backgroundBarColors[p],C=this.graphics.drawRect(m,0,o,d.globals.gridHeight,0,S,d.config.plotOptions.bar.colors.backgroundBarOpacity);c.add(C),C.node.classList.add("apexcharts-backgroundBar")}return i+=a,{pathTo:n,pathFrom:r,x:d.globals.isXNumeric?i-a:i,y:s}}},{key:"checkZeroSeries",value:function(t){for(var e=t.series,i=this.w,s=0;s<e.length;s++){for(var a=0,n=0;n<e[i.globals.maxValsInArrayIndex].length;n++)a+=e[s][n];0===a&&this.zeroSerieses.push(s)}for(var r=e.length-1;r>=0;r--)this.zeroSerieses.indexOf(r)>-1&&r===this.endingShapeOnSeriesNumber&&(this.endingShapeOnSeriesNumber-=1)}}]),i}(),M=function(t){function i(){return e(this,i),h(this,o(i).apply(this,arguments))}return r(i,P),s(i,[{key:"draw",value:function(t,e){var i=this.w,s=new f(this.ctx),a=new S(this.ctx);this.candlestickOptions=this.w.config.plotOptions.candlestick;var n=new y(this.ctx,i);t=n.getLogSeries(t),this.series=t,this.yRatio=n.getLogYRatios(this.yRatio),this.initVariables(t);for(var r=s.group({class:"apexcharts-candlestick-series apexcharts-plot-series"}),o=0,l=0;o<t.length;o++,l++){var h,c,u=void 0,g=void 0,p=void 0,x=void 0,b=[],m=[],v=i.globals.comboCharts?e[o]:o,w=s.group({class:"apexcharts-series ".concat(d.escapeString(i.globals.seriesNames[v])),rel:o+1,"data:realIndex":v});t[o].length>0&&(this.visibleI=this.visibleI+1);var k,A,C=0;this.yRatio.length>1&&(this.yaxisIndex=v);var L=this.initialPositions();x=L.y,k=L.barHeight,p=L.x,A=L.barWidth,h=L.xDivision,c=L.zeroH,m.push(p+A/2);for(var z=s.group({class:"apexcharts-datalabels"}),P=0,E=i.globals.dataPoints;P<i.globals.dataPoints;P++,E--){void 0===this.series[o][P]||null===t[o][P]?this.isNullValue=!0:this.isNullValue=!1,i.config.stroke.show&&(C=this.isNullValue?0:Array.isArray(this.strokeWidth)?this.strokeWidth[v]:this.strokeWidth);var M,T=this.drawCandleStickPaths({indexes:{i:o,j:P,realIndex:v,bc:l},x:p,y:x,xDivision:h,pathTo:u,pathFrom:g,barWidth:A,zeroH:c,strokeWidth:C,elSeries:w});u=T.pathTo,g=T.pathFrom,x=T.y,p=T.x,M=T.color,P>0&&m.push(p+A/2),b.push(x);var X=a.fillPath({seriesNumber:v,color:M}),I=this.candlestickOptions.wick.useFillColor?M:void 0;w=this.renderSeries({realIndex:v,pathFill:X,lineFill:I,j:P,i:o,pathFrom:g,pathTo:u,strokeWidth:C,elSeries:w,x:p,y:x,series:t,barHeight:k,barWidth:A,elDataLabelsWrap:z,visibleSeries:this.visibleI,type:"candlestick"})}i.globals.seriesXvalues[v]=m,i.globals.seriesYvalues[v]=b,r.add(w)}return r}},{key:"drawCandleStickPaths",value:function(t){var e=t.indexes,i=t.x,s=(t.y,t.xDivision),a=t.pathTo,n=t.pathFrom,r=t.barWidth,o=t.zeroH,l=t.strokeWidth,h=this.w,c=new f(this.ctx),d=e.i,u=e.j,g=!0,p=h.config.plotOptions.candlestick.colors.upward,x=h.config.plotOptions.candlestick.colors.downward,b=this.yRatio[this.yaxisIndex],m=e.realIndex,v=this.getOHLCValue(m,u),y=o,w=o;v.o>v.c&&(g=!1);var k=Math.min(v.o,v.c),A=Math.max(v.o,v.c);h.globals.isXNumeric&&(i=(h.globals.seriesX[d][u]-h.globals.minX)/this.xRatio-r/2);var S=i+r*this.visibleI;return void 0===this.series[d][u]||null===this.series[d][u]?k=o:(k=o-k/b,A=o-A/b,y=o-v.h/b,w=o-v.l/b),c.move(S,o),n=c.move(S,k),h.globals.previousPaths.length>0&&(n=this.getPathFrom(m,u,!0)),a=c.move(S,A)+c.line(S+r/2,A)+c.line(S+r/2,y)+c.line(S+r/2,A)+c.line(S+r,A)+c.line(S+r,k)+c.line(S+r/2,k)+c.line(S+r/2,w)+c.line(S+r/2,k)+c.line(S,k)+c.line(S,A-l/2),n+=c.move(S,k),h.globals.isXNumeric||(i+=s),{pathTo:a,pathFrom:n,x:i,y:A,barXPosition:S,color:g?p:x}}},{key:"getOHLCValue",value:function(t,e){var i=this.w;return{o:i.globals.seriesCandleO[t][e],h:i.globals.seriesCandleH[t][e],l:i.globals.seriesCandleL[t][e],c:i.globals.seriesCandleC[t][e]}}}]),i}(),T=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w}return s(t,[{key:"drawXCrosshairs",value:function(){var t=this.w,e=new f(this.ctx),i=new u(this.ctx),s=t.config.xaxis.crosshairs.fill.gradient,a=t.config.xaxis.crosshairs.dropShadow,n=t.config.xaxis.crosshairs.fill.type,r=s.colorFrom,o=s.colorTo,l=s.opacityFrom,h=s.opacityTo,c=s.stops,g=a.enabled,p=a.left,x=a.top,b=a.blur,m=a.color,v=a.opacity,y=t.config.xaxis.crosshairs.fill.color;if(t.config.xaxis.crosshairs.show){"gradient"===n&&(y=e.drawGradient("vertical",r,o,l,h,null,c,null));var w=e.drawRect();1===t.config.xaxis.crosshairs.width&&(w=e.drawLine()),w.attr({class:"apexcharts-xcrosshairs",x:0,y:0,y2:t.globals.gridHeight,width:d.isNumber(t.config.xaxis.crosshairs.width)?t.config.xaxis.crosshairs.width:0,height:t.globals.gridHeight,fill:y,filter:"none","fill-opacity":t.config.xaxis.crosshairs.opacity,stroke:t.config.xaxis.crosshairs.stroke.color,"stroke-width":t.config.xaxis.crosshairs.stroke.width,"stroke-dasharray":t.config.xaxis.crosshairs.stroke.dashArray}),g&&(w=i.dropShadow(w,{left:p,top:x,blur:b,color:m,opacity:v})),t.globals.dom.elGraphical.add(w)}}},{key:"drawYCrosshairs",value:function(){var t=this.w,e=new f(this.ctx),i=t.config.yaxis[0].crosshairs;if(t.config.yaxis[0].crosshairs.show){var s=e.drawLine(0,0,t.globals.gridWidth,0,i.stroke.color,i.stroke.dashArray,i.stroke.width);s.attr({class:"apexcharts-ycrosshairs"}),t.globals.dom.elGraphical.add(s)}var a=e.drawLine(0,0,t.globals.gridWidth,0,i.stroke.color,0,0);a.attr({class:"apexcharts-ycrosshairs-hidden"}),t.globals.dom.elGraphical.add(a)}}]),t}(),X=function(){function t(i,s){e(this,t),this.ctx=i,this.w=i.w,this.xRatio=s.xRatio,this.yRatio=s.yRatio,this.negRange=!1,this.dynamicAnim=this.w.config.chart.animations.dynamicAnimation,this.rectRadius=this.w.config.plotOptions.heatmap.radius,this.strokeWidth=this.w.config.stroke.width}return s(t,[{key:"draw",value:function(t){var e=this.w,i=new f(this.ctx),s=i.group({class:"apexcharts-heatmap"});s.attr("clip-path","url(#gridRectMask".concat(e.globals.cuid,")"));var a=e.globals.gridWidth/e.globals.dataPoints,n=e.globals.gridHeight/e.globals.series.length,r=0,o=!1;this.checkColorRange();var l=t.slice();e.config.yaxis[0].reversed&&(o=!0,l.reverse());for(var h=o?0:l.length-1;o?h<l.length:h>=0;o?h++:h--){var c=i.group({class:"apexcharts-series apexcharts-heatmap-series ".concat(d.escapeString(e.globals.seriesNames[h])),rel:h+1,"data:realIndex":h});if(e.config.chart.dropShadow.enabled){var g=e.config.chart.dropShadow;new u(this.ctx).dropShadow(c,g,h)}for(var p=0,x=0;x<l[h].length;x++){var b=1,m=this.determineHeatColor(h,x);if(e.globals.hasNegs||this.negRange){var v=e.config.plotOptions.heatmap.shadeIntensity;b=m.percent<0?1-(1+m.percent/100)*v:(1-m.percent/100)*v}else b=1-m.percent/100;var y=m.color;if(e.config.plotOptions.heatmap.enableShades){var w=new d;y=d.hexToRgba(w.shadeColor(b,m.color),e.config.fill.opacity)}var k=this.rectRadius,A=i.drawRect(p,r,a,n,k);if(A.attr({cx:p,cy:r}),A.node.classList.add("apexcharts-heatmap-rect"),c.add(A),A.attr({fill:y,i:h,index:h,j:x,val:l[h][x],"stroke-width":this.strokeWidth,stroke:e.globals.stroke.colors[0],color:y}),A.node.addEventListener("mouseenter",i.pathMouseEnter.bind(this,A)),A.node.addEventListener("mouseleave",i.pathMouseLeave.bind(this,A)),A.node.addEventListener("mousedown",i.pathMouseDown.bind(this,A)),e.config.chart.animations.enabled&&!e.globals.dataChanged){var S=1;e.globals.resized||(S=e.config.chart.animations.speed),this.animateHeatMap(A,p,r,a,n,S)}if(e.globals.dataChanged){var C=1;if(this.dynamicAnim.enabled&&e.globals.shouldAnimate){C=this.dynamicAnim.speed;var L=e.globals.previousPaths[h]&&e.globals.previousPaths[h][x]&&e.globals.previousPaths[h][x].color;L||(L="rgba(255, 255, 255, 0)"),this.animateHeatColor(A,d.isColorHex(L)?L:d.rgb2hex(L),d.isColorHex(y)?y:d.rgb2hex(y),C)}}var z=this.calculateHeatmapDataLabels({x:p,y:r,i:h,j:x,series:l,rectHeight:n,rectWidth:a});null!==z&&c.add(z),p+=a}r+=n,s.add(c)}var P=e.globals.yAxisScale[0].result.slice();e.config.yaxis[0].reversed?P.unshift(""):P.push(""),e.globals.yAxisScale[0].result=P;var E=e.globals.gridHeight/e.globals.series.length;return e.config.yaxis[0].labels.offsetY=-E/2,s}},{key:"checkColorRange",value:function(){var t=this,e=this.w.config.plotOptions.heatmap;e.colorScale.ranges.length>0&&e.colorScale.ranges.map(function(e,i){e.from<0&&(t.negRange=!0)})}},{key:"determineHeatColor",value:function(t,e){var i=this.w,s=i.globals.series[t][e],a=i.config.plotOptions.heatmap,n=a.colorScale.inverse?e:t,r=i.globals.colors[n],o=Math.min.apply(Math,c(i.globals.series[t])),l=Math.max.apply(Math,c(i.globals.series[t]));a.distributed||(o=i.globals.minY,l=i.globals.maxY),void 0!==a.colorScale.min&&(o=a.colorScale.min<i.globals.minY?a.colorScale.min:i.globals.minY,l=a.colorScale.max>i.globals.maxY?a.colorScale.max:i.globals.maxY);var h=Math.abs(l)+Math.abs(o),d=100*s/(0===h?h-1e-6:h);a.colorScale.ranges.length>0&&a.colorScale.ranges.map(function(t,e){if(s>=t.from&&s<=t.to){r=t.color,o=t.from,l=t.to;var i=Math.abs(l)+Math.abs(o);d=100*s/(0===i?i-1e-6:i)}});return{color:r,percent:d}}},{key:"calculateHeatmapDataLabels",value:function(t){var e=t.x,i=t.y,s=t.i,a=t.j,n=(t.series,t.rectHeight),r=t.rectWidth,o=this.w,l=o.config.dataLabels,h=new f(this.ctx),c=new z(this.ctx),d=l.formatter,u=null;if(l.enabled){u=h.group({class:"apexcharts-data-labels"});var g=l.offsetX,p=l.offsetY,x=e+r/2+g,b=i+n/2+parseInt(l.style.fontSize)/3+p,m=d(o.globals.series[s][a],{seriesIndex:s,dataPointIndex:a,w:o});c.plotDataLabelsText({x:x,y:b,text:m,i:s,j:a,parent:u,dataLabelsConfig:l})}return u}},{key:"animateHeatMap",value:function(t,e,i,s,a,n){var r=this;new g(this.ctx).animateRect(t,{x:e+s/2,y:i+a/2,width:0,height:0},{x:e,y:i,width:s,height:a},n,function(){r.w.globals.animationEnded=!0})}},{key:"animateHeatColor",value:function(t,e,i,s){t.attr({fill:e}).animate(s).attr({fill:i})}}]),t}(),I=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.chartType=this.w.config.chart.type,this.initialAnim=this.w.config.chart.animations.enabled,this.dynamicAnim=this.initialAnim&&this.w.config.chart.animations.dynamicAnimation.enabled,this.animBeginArr=[0],this.animDur=0,this.donutDataLabels=this.w.config.plotOptions.pie.donut.labels;var s=this.w;this.lineColorArr=void 0!==s.globals.stroke.colors?s.globals.stroke.colors:s.globals.colors,this.defaultSize=s.globals.svgHeight<s.globals.svgWidth?s.globals.svgHeight-35:s.globals.gridWidth,this.centerY=this.defaultSize/2,this.centerX=s.globals.gridWidth/2,this.fullAngle=360,this.size=0,this.donutSize=0,this.sliceLabels=[],this.prevSectorAngleArr=[]}return s(t,[{key:"draw",value:function(t){for(var e=this.w,i=new f(this.ctx),s=i.group({class:"apexcharts-pie"}),a=0,n=0;n<t.length;n++)a+=d.negToZero(t[n]);var r=[],o=i.group();0===a&&(a=1e-5);for(var l=0;l<t.length;l++){var h=this.fullAngle*d.negToZero(t[l])/a;r.push(h)}if(e.globals.dataChanged){for(var c,u=0,g=0;g<e.globals.previousPaths.length;g++)u+=d.negToZero(e.globals.previousPaths[g]);for(var p=0;p<e.globals.previousPaths.length;p++)c=this.fullAngle*d.negToZero(e.globals.previousPaths[p])/u,this.prevSectorAngleArr.push(c)}this.size=this.defaultSize/2.05-e.config.stroke.width-e.config.chart.dropShadow.blur,void 0!==e.config.plotOptions.pie.size&&(this.size=e.config.plotOptions.pie.size),this.donutSize=this.size*parseInt(e.config.plotOptions.pie.donut.size)/100;var x=e.config.plotOptions.pie.customScale,b=e.globals.gridWidth/2,m=e.globals.gridHeight/2,v=b-e.globals.gridWidth/2*x,y=m-e.globals.gridHeight/2*x;if(this.donutDataLabels.show){var w=this.renderInnerDataLabels(this.donutDataLabels,{hollowSize:this.donutSize,centerX:this.centerX,centerY:this.centerY,opacity:this.donutDataLabels.show,translateX:v,translateY:y});s.add(w)}if("donut"===e.config.chart.type){var k=i.drawCircle(this.donutSize);k.attr({cx:this.centerX,cy:this.centerY,fill:e.config.plotOptions.pie.donut.background}),o.add(k)}var A=this.drawArcs(r,t);return this.sliceLabels.forEach(function(t){A.add(t)}),o.attr({transform:"translate(".concat(v,", ").concat(y-5,") scale(").concat(x,")")}),s.attr({"data:innerTranslateX":v,"data:innerTranslateY":y-25}),o.add(A),s.add(o),s}},{key:"drawArcs",value:function(t,e){var i=this.w,s=new u(this.ctx),a=new f(this.ctx),n=new S(this.ctx),r=a.group(),o=0,l=0,h=0,c=0;this.strokeWidth=i.config.stroke.show?i.config.stroke.width:0;for(var g=0;g<t.length;g++){var p=a.group({class:"apexcharts-series apexcharts-pie-series ".concat(d.escapeString(i.globals.seriesNames[g])),id:"apexcharts-series-"+g,rel:g+1});r.add(p),l=c,h=(o=h)+t[g],c=l+this.prevSectorAngleArr[g];var x=h-o,b=n.fillPath({seriesNumber:g,size:this.size}),m=this.getChangedPath(l,c),v=a.drawPath({d:m,stroke:this.lineColorArr instanceof Array?this.lineColorArr[g]:this.lineColorArr,strokeWidth:this.strokeWidth,fill:b,fillOpacity:i.config.fill.opacity,classes:"apexcharts-pie-area"});if(v.attr({id:"apexcharts-".concat(i.config.chart.type,"-slice-").concat(g),index:0,j:g}),i.config.chart.dropShadow.enabled){var y=i.config.chart.dropShadow;s.dropShadow(v,y,g)}this.addListeners(v,this.donutDataLabels),f.setAttrs(v.node,{"data:angle":x,"data:startAngle":o,"data:strokeWidth":this.strokeWidth,"data:value":e[g]});var w={x:0,y:0};"pie"===i.config.chart.type?w=d.polarToCartesian(this.centerX,this.centerY,this.size/1.25+i.config.plotOptions.pie.dataLabels.offset,o+(h-o)/2):"donut"===i.config.chart.type&&(w=d.polarToCartesian(this.centerX,this.centerY,(this.size+this.donutSize)/2+i.config.plotOptions.pie.dataLabels.offset,o+(h-o)/2)),p.add(v);var k=0;if(!this.initialAnim||i.globals.resized||i.globals.dataChanged?this.animBeginArr.push(0):(k=(h-o)/this.fullAngle*i.config.chart.animations.speed,this.animDur=k+this.animDur,this.animBeginArr.push(this.animDur)),this.dynamicAnim&&i.globals.dataChanged?this.animatePaths(v,{endAngle:h,startAngle:o,prevStartAngle:l,prevEndAngle:c,animateStartingPos:!0,i:g,animBeginArr:this.animBeginArr,dur:i.config.chart.animations.dynamicAnimation.speed}):this.animatePaths(v,{endAngle:h,startAngle:o,i:g,totalItems:t.length-1,animBeginArr:this.animBeginArr,dur:k}),i.config.plotOptions.pie.expandOnClick&&v.click(this.pieClicked.bind(this,g)),i.config.dataLabels.enabled){var A=w.x,C=w.y,L=100*(h-o)/360+"%";if(0!==x&&i.config.plotOptions.pie.dataLabels.minAngleToShowLabel<t[g]){var z=i.config.dataLabels.formatter;void 0!==z&&(L=z(i.globals.seriesPercent[g][0],{seriesIndex:g,w:i}));var P=i.globals.dataLabels.style.colors[g],E=a.drawText({x:A,y:C,text:L,textAnchor:"middle",fontSize:i.config.dataLabels.style.fontSize,fontFamily:i.config.dataLabels.style.fontFamily,foreColor:P});if(i.config.dataLabels.dropShadow.enabled){var M=i.config.dataLabels.dropShadow;new u(this.ctx).dropShadow(E,M)}E.node.classList.add("apexcharts-pie-label"),i.config.chart.animations.animate&&!1===i.globals.resized&&(E.node.classList.add("apexcharts-pie-label-delay"),E.node.style.animationDelay=i.config.chart.animations.speed/940+"s"),this.sliceLabels.push(E)}}}return r}},{key:"addListeners",value:function(t,e){var i=new f(this.ctx);t.node.addEventListener("mouseenter",i.pathMouseEnter.bind(this,t)),t.node.addEventListener("mouseenter",this.printDataLabelsInner.bind(this,t.node,e)),t.node.addEventListener("mouseleave",i.pathMouseLeave.bind(this,t)),t.node.addEventListener("mouseleave",this.revertDataLabelsInner.bind(this,t.node,e)),t.node.addEventListener("mousedown",i.pathMouseDown.bind(this,t)),t.node.addEventListener("mousedown",this.printDataLabelsInner.bind(this,t.node,e))}},{key:"animatePaths",value:function(t,e){var i=this.w,s=e.endAngle-e.startAngle,a=s,n=e.startAngle,r=e.startAngle;void 0!==e.prevStartAngle&&void 0!==e.prevEndAngle&&(n=e.prevEndAngle,a=e.prevEndAngle-e.prevStartAngle),e.i===i.config.series.length-1&&(s+r>this.fullAngle?e.endAngle=e.endAngle-(s+r):s+r<this.fullAngle&&(e.endAngle=e.endAngle+(this.fullAngle-(s+r)))),s===this.fullAngle&&(s=this.fullAngle-.01),this.animateArc(t,n,r,s,a,e)}},{key:"animateArc",value:function(t,e,i,s,a,n){var r,o=this,l=this.w,h=o.size;h||(h=n.size),(isNaN(e)||isNaN(a))&&(e=i,a=s,n.dur=0);var c=s,d=i,u=e-i;l.globals.dataChanged&&n.shouldSetPrevPaths&&(r=o.getPiePath({me:o,startAngle:d,angle:a,size:h}),t.attr({d:r})),0!==n.dur?t.animate(n.dur,l.globals.easing,n.animBeginArr[n.i]).afterAll(function(){"pie"!==l.config.chart.type&&"donut"!==l.config.chart.type||this.animate(300).attr({"stroke-width":l.config.stroke.width}),l.globals.animationEnded=!0}).during(function(l){c=u+(s-u)*l,n.animateStartingPos&&(c=a+(s-a)*l,d=e-a+(i-(e-a))*l),r=o.getPiePath({me:o,startAngle:d,angle:c,size:h}),t.node.setAttribute("data:pathOrig",r),t.attr({d:r})}):(r=o.getPiePath({me:o,startAngle:d,angle:s,size:h}),n.isTrack||(l.globals.animationEnded=!0),t.node.setAttribute("data:pathOrig",r),t.attr({d:r}))}},{key:"pieClicked",value:function(t){var e,i=this.w,s=this.size+4,a=i.globals.dom.Paper.select("#apexcharts-".concat(i.config.chart.type.toLowerCase(),"-slice-").concat(t)).members[0],n=a.attr("d");if("true"!==a.attr("data:pieClicked")){var r=i.globals.dom.baseEl.querySelectorAll(".apexcharts-pie-area");Array.prototype.forEach.call(r,function(t){t.setAttribute("data:pieClicked","false");var e=t.getAttribute("data:pathOrig");t.setAttribute("d",e)}),a.attr("data:pieClicked","true");var o=parseInt(a.attr("data:startAngle")),l=parseInt(a.attr("data:angle"));e=this.getPiePath({me:this,startAngle:o,angle:l,size:s}),360!==l&&a.plot(e).animate(1).plot(n).animate(100).plot(e)}else{a.attr({"data:pieClicked":"false"});var h=a.attr("data:pathOrig");a.attr({d:h})}}},{key:"getChangedPath",value:function(t,e){var i="";return this.dynamicAnim&&this.w.globals.dataChanged&&(i=this.getPiePath({me:this,startAngle:t,angle:e-t,size:this.size})),i}},{key:"getPiePath",value:function(t){var e=t.me,i=t.startAngle,s=t.angle,a=t.size,n=this.w,r=i,o=Math.PI*(r-90)/180,l=s+i;Math.ceil(l)>=360&&(l=359.99);var h=Math.PI*(l-90)/180,c=e.centerX+a*Math.cos(o),u=e.centerY+a*Math.sin(o),g=e.centerX+a*Math.cos(h),f=e.centerY+a*Math.sin(h),p=d.polarToCartesian(e.centerX,e.centerY,e.donutSize,l),x=d.polarToCartesian(e.centerX,e.centerY,e.donutSize,r),b=s>180?1:0;return"donut"===n.config.chart.type?["M",c,u,"A",a,a,0,b,1,g,f,"L",p.x,p.y,"A",e.donutSize,e.donutSize,0,b,0,x.x,x.y,"L",c,u,"z"].join(" "):"pie"===n.config.chart.type?["M",c,u,"A",a,a,0,b,1,g,f,"L",e.centerX,e.centerY,"L",c,u].join(" "):["M",c,u,"A",a,a,0,b,1,g,f].join(" ")}},{key:"renderInnerDataLabels",value:function(t,e){var i=this.w,s=new f(this.ctx),a=s.group({class:"apexcharts-datalabels-group",transform:"translate(".concat(e.translateX?e.translateX:0,", ").concat(e.translateY?e.translateY:0,")")}),n=t.total.show;a.node.style.opacity=e.opacity;var r,o,l=e.centerX,h=e.centerY;r=void 0===t.name.color?i.globals.colors[0]:t.name.color,o=void 0===t.value.color?i.config.chart.foreColor:t.value.color;var c=t.value.formatter,d="",u="";if(n?(r=t.total.color,u=t.total.label,d=t.total.formatter(i)):1===i.globals.series.length&&(d=c(i.globals.series[0],i),u=i.globals.seriesNames[0]),t.name.show){var g=s.drawText({x:l,y:h+parseInt(t.name.offsetY),text:u,textAnchor:"middle",foreColor:r,fontSize:t.name.fontSize,fontFamily:t.name.fontFamily});g.node.classList.add("apexcharts-datalabel-label"),a.add(g)}if(t.value.show){var p=t.name.show?parseInt(t.value.offsetY)+16:t.value.offsetY,x=s.drawText({x:l,y:h+p,text:d,textAnchor:"middle",foreColor:o,fontSize:t.value.fontSize,fontFamily:t.value.fontFamily});x.node.classList.add("apexcharts-datalabel-value"),a.add(x)}return a}},{key:"printInnerLabels",value:function(t,e,i,s){var a,n=this.w;s?a=void 0===t.name.color?n.globals.colors[parseInt(s.parentNode.getAttribute("rel"))-1]:t.name.color:n.globals.series.length>1&&t.total.show&&(a=t.total.color);var r=n.globals.dom.baseEl.querySelector(".apexcharts-datalabel-label"),o=n.globals.dom.baseEl.querySelector(".apexcharts-datalabel-value");i=(0,t.value.formatter)(i,n),s||"function"!=typeof t.total.formatter||(i=t.total.formatter(n)),null!==r&&(r.textContent=e),null!==o&&(o.textContent=i),null!==r&&(r.style.fill=a)}},{key:"printDataLabelsInner",value:function(t,e){var i=this.w,s=t.getAttribute("data:value"),a=i.globals.seriesNames[parseInt(t.parentNode.getAttribute("rel"))-1];i.globals.series.length>1&&this.printInnerLabels(e,a,s,t);var n=i.globals.dom.baseEl.querySelector(".apexcharts-datalabels-group");null!==n&&(n.style.opacity=1)}},{key:"revertDataLabelsInner",value:function(e,i){var s=this.w,a=s.globals.dom.baseEl.querySelector(".apexcharts-datalabels-group");if(i.total.show&&s.globals.series.length>1)new t(this.ctx).printInnerLabels(i,i.total.label,i.total.formatter(s));else if(s.globals.selectedDataPoints.length&&s.globals.series.length>1)if(s.globals.selectedDataPoints[0].length>0){var n=s.globals.selectedDataPoints[0],r=s.globals.dom.baseEl.querySelector("#apexcharts-".concat(s.config.chart.type.toLowerCase(),"-slice-").concat(n));this.printDataLabelsInner(r,i)}else a&&s.globals.selectedDataPoints.length&&0===s.globals.selectedDataPoints[0].length&&(a.style.opacity=0);else a&&s.globals.series.length>1&&(a.style.opacity=0)}}]),t}(),Y=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.chartType=this.w.config.chart.type,this.initialAnim=this.w.config.chart.animations.enabled,this.dynamicAnim=this.initialAnim&&this.w.config.chart.animations.dynamicAnimation.enabled,this.animDur=0;var s=this.w;this.graphics=new f(this.ctx),this.lineColorArr=void 0!==s.globals.stroke.colors?s.globals.stroke.colors:s.globals.colors,this.defaultSize=s.globals.svgHeight<s.globals.svgWidth?s.globals.svgHeight-35:s.globals.gridWidth,this.maxValue=this.w.globals.maxY,this.polygons=s.config.plotOptions.radar.polygons,this.maxLabelWidth=20;var a=s.globals.labels.slice().sort(function(t,e){return e.length-t.length})[0],n=this.graphics.getTextRects(a,s.config.dataLabels.style.fontSize);this.size=this.defaultSize/2.1-s.config.stroke.width-s.config.chart.dropShadow.blur-n.width/1.75,void 0!==s.config.plotOptions.radar.size&&(this.size=s.config.plotOptions.radar.size),this.dataRadiusOfPercent=[],this.dataRadius=[],this.angleArr=[],this.yaxisLabelsTextsPos=[]}return s(t,[{key:"draw",value:function(t){var e=this,i=this.w,s=new S(this.ctx),a=[];this.dataPointsLen=t[i.globals.maxValsInArrayIndex].length,this.disAngle=2*Math.PI/this.dataPointsLen;var r=i.globals.gridWidth/2,o=i.globals.gridHeight/2,l=this.graphics.group({class:"apexcharts-radar-series","data:innerTranslateX":r,"data:innerTranslateY":o-25,transform:"translate(".concat(r||0,", ").concat(o||0,")")}),h=[],c=null;if(this.yaxisLabels=this.graphics.group({class:"apexcharts-yaxis"}),t.forEach(function(t,r){var o=e.graphics.group().attr({class:"apexcharts-series ".concat(d.escapeString(i.globals.seriesNames[r])),rel:r+1,"data:realIndex":r});e.dataRadiusOfPercent[r]=[],e.dataRadius[r]=[],e.angleArr[r]=[],t.forEach(function(t,i){e.dataRadiusOfPercent[r][i]=t/e.maxValue,e.dataRadius[r][i]=e.dataRadiusOfPercent[r][i]*e.size,e.angleArr[r][i]=i*e.disAngle}),h=e.getDataPointsPos(e.dataRadius[r],e.angleArr[r]);var l=e.createPaths(h,{x:0,y:0});c=e.graphics.group({class:"apexcharts-series-markers-wrap hidden"}),i.globals.delayedElements.push({el:c.node,index:r});var g={i:r,realIndex:r,animationDelay:r,initialSpeed:i.config.chart.animations.speed,dataChangeSpeed:i.config.chart.animations.dynamicAnimation.speed,className:"apexcharts-radar",id:"apexcharts-radar",shouldClipToGrid:!1,bindEventsOnPaths:!1,stroke:i.globals.stroke.colors[r],strokeLineCap:i.config.stroke.lineCap},f=null;i.globals.previousPaths.length>0&&(f=e.getPathFrom(r));for(var p=0;p<l.linePathsTo.length;p++){var x=e.graphics.renderPaths(n({},g,{pathFrom:null===f?l.linePathsFrom[p]:f,pathTo:l.linePathsTo[p],strokeWidth:Array.isArray(i.config.stroke.width)?i.config.stroke.width[r]:i.config.stroke.width,fill:"none",drawShadow:!1}));o.add(x);var b=s.fillPath({seriesNumber:r}),m=e.graphics.renderPaths(n({},g,{pathFrom:null===f?l.areaPathsFrom[p]:f,pathTo:l.areaPathsTo[p],strokeWidth:0,fill:b,drawShadow:!1}));if(i.config.chart.dropShadow.enabled){var v=new u(e.ctx),y=i.config.chart.dropShadow;v.dropShadow(m,Object.assign({},y,{noUserSpaceOnUse:!0}),r)}o.add(m)}t.forEach(function(t,i){var s=new C(e.ctx).getMarkerConfig("apexcharts-marker",r),a=e.graphics.drawMarker(h[i].x,h[i].y,s);a.attr("rel",i),a.attr("j",i),a.attr("index",r),a.node.setAttribute("default-marker-size",s.pSize);var n=e.graphics.group({class:"apexcharts-series-markers"});n&&n.add(a),c.add(n),o.add(c)}),a.push(o)}),this.drawPolygons({parent:l}),i.config.dataLabels.enabled){var g=this.drawLabels();l.add(g)}return l.add(this.yaxisLabels),a.forEach(function(t){l.add(t)}),l}},{key:"drawPolygons",value:function(t){for(var e=this,i=this.w,s=t.parent,a=i.globals.yAxisScale[0].result.reverse(),n=a.length,r=[],o=this.size/(n-1),l=0;l<n;l++)r[l]=o*l;r.reverse();var h=[],c=[];r.forEach(function(t,i){var s=e.getPolygonPos(t),a="";s.forEach(function(t,s){if(0===i){var n=e.graphics.drawLine(t.x,t.y,0,0,Array.isArray(e.polygons.connectorColors)?e.polygons.connectorColors[s]:e.polygons.connectorColors);c.push(n)}0===s&&e.yaxisLabelsTextsPos.push({x:t.x,y:t.y}),a+=t.x+","+t.y+" "}),h.push(a)}),h.forEach(function(t,a){var n=e.polygons.strokeColors,r=e.graphics.drawPolygon(t,Array.isArray(n)?n[a]:n,i.globals.radarPolygons.fill.colors[a]);s.add(r)}),c.forEach(function(t){s.add(t)}),i.config.yaxis[0].show&&this.yaxisLabelsTextsPos.forEach(function(t,i){var s=e.drawYAxisText(t.x,t.y,i,a[i]);e.yaxisLabels.add(s)})}},{key:"drawYAxisText",value:function(t,e,i,s){var a=this.w,n=a.config.yaxis[0],r=a.globals.yLabelFormatters[0];return this.graphics.drawText({x:t+n.labels.offsetX,y:e+n.labels.offsetY,text:r(s,i),textAnchor:"middle",fontSize:n.labels.style.fontSize,fontFamily:n.labels.style.fontFamily,foreColor:n.labels.style.color})}},{key:"drawLabels",value:function(){var t=this,e=this.w,i="middle",s=e.config.dataLabels,a=this.graphics.group({class:"apexcharts-datalabels"}),n=this.getPolygonPos(this.size),r=0,o=0;return e.globals.labels.forEach(function(l,h){var c=s.formatter,d=new z(t.ctx);if(n[h]){r=n[h].x,o=n[h].y,Math.abs(n[h].x)>=10?n[h].x>0?(i="start",r+=10):n[h].x<0&&(i="end",r-=10):i="middle",Math.abs(n[h].y)>=t.size-10&&(n[h].y<0?o-=10:n[h].y>0&&(o+=10));var u=c(l,{seriesIndex:-1,dataPointIndex:h,w:e});d.plotDataLabelsText({x:r,y:o,text:u,textAnchor:i,i:h,j:h,parent:a,dataLabelsConfig:s,offsetCorrection:!1})}}),a}},{key:"createPaths",value:function(t,e){var i=this,s=[],a=[],n=[],r=[];if(t.length){a=[this.graphics.move(e.x,e.y)],r=[this.graphics.move(e.x,e.y)];var o=this.graphics.move(t[0].x,t[0].y),l=this.graphics.move(t[0].x,t[0].y);t.forEach(function(e,s){o+=i.graphics.line(e.x,e.y),l+=i.graphics.line(e.x,e.y),s===t.length-1&&(o+="Z",l+="Z")}),s.push(o),n.push(l)}return{linePathsFrom:a,linePathsTo:s,areaPathsFrom:r,areaPathsTo:n}}},{key:"getPathFrom",value:function(t){for(var e=this.w,i=null,s=0;s<e.globals.previousPaths.length;s++){var a=e.globals.previousPaths[s];a.paths.length>0&&parseInt(a.realIndex)===parseInt(t)&&void 0!==e.globals.previousPaths[s].paths[0]&&(i=e.globals.previousPaths[s].paths[0].d)}return i}},{key:"getDataPointsPos",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.dataPointsLen;t=t||[],e=e||[];for(var s=[],a=0;a<i;a++){var n={};n.x=t[a]*Math.sin(e[a]),n.y=-t[a]*Math.cos(e[a]),s.push(n)}return s}},{key:"getPolygonPos",value:function(t){for(var e=[],i=2*Math.PI/this.dataPointsLen,s=0;s<this.dataPointsLen;s++){var a={};a.x=t*Math.sin(s*i),a.y=-t*Math.cos(s*i),e.push(a)}return e}}]),t}(),F=function(t){function i(t){var s;e(this,i),(s=h(this,o(i).call(this,t))).ctx=t,s.w=t.w,s.animBeginArr=[0],s.animDur=0;var a=s.w;return s.startAngle=a.config.plotOptions.radialBar.startAngle,s.endAngle=a.config.plotOptions.radialBar.endAngle,s.trackStartAngle=a.config.plotOptions.radialBar.track.startAngle,s.trackEndAngle=a.config.plotOptions.radialBar.track.endAngle,s.radialDataLabels=a.config.plotOptions.radialBar.dataLabels,s.trackStartAngle||(s.trackStartAngle=s.startAngle),s.trackEndAngle||(s.trackEndAngle=s.endAngle),360===s.endAngle&&(s.endAngle=359.99),s.fullAngle=360-a.config.plotOptions.radialBar.endAngle-a.config.plotOptions.radialBar.startAngle,s.margin=parseInt(a.config.plotOptions.radialBar.track.margin),s}return r(i,I),s(i,[{key:"draw",value:function(t){var e=this.w,i=new f(this.ctx),s=i.group({class:"apexcharts-radialbar"}),a=i.group(),n=this.defaultSize/2,r=e.globals.gridWidth/2,o=this.defaultSize/2.05-e.config.stroke.width-e.config.chart.dropShadow.blur;void 0!==e.config.plotOptions.radialBar.size&&(o=e.config.plotOptions.radialBar.size);var l=e.globals.fill.colors;if(e.config.plotOptions.radialBar.track.show){var h=this.drawTracks({size:o,centerX:r,centerY:n,colorArr:l,series:t});a.add(h)}var c=this.drawArcs({size:o,centerX:r,centerY:n,colorArr:l,series:t});return a.add(c.g),"front"===e.config.plotOptions.radialBar.hollow.position&&(c.g.add(c.elHollow),c.dataLabels&&c.g.add(c.dataLabels)),s.add(a),s}},{key:"drawTracks",value:function(t){var e=this.w,i=new f(this.ctx),s=i.group(),a=new u(this.ctx),n=new S(this.ctx),r=this.getStrokeWidth(t);t.size=t.size-r/2;for(var o=0;o<t.series.length;o++){var l=i.group({class:"apexcharts-radialbar-track apexcharts-track"});s.add(l),l.attr({id:"apexcharts-track-"+o,rel:o+1}),t.size=t.size-r-this.margin;var h=e.config.plotOptions.radialBar.track,c=n.fillPath({seriesNumber:0,size:t.size,fillColors:Array.isArray(h.background)?h.background[o]:h.background,solid:!0}),d=this.trackStartAngle,g=this.trackEndAngle;Math.abs(g)+Math.abs(d)>=360&&(g=360-Math.abs(this.startAngle)-.1);var p=i.drawPath({d:"",stroke:c,strokeWidth:r*parseInt(h.strokeWidth)/100,fill:"none",strokeOpacity:h.opacity,classes:"apexcharts-radialbar-area"});if(h.dropShadow.enabled){var x=h.dropShadow;a.dropShadow(p,x)}l.add(p),p.attr("id","apexcharts-radialbarTrack-"+o),new I(this.ctx).animatePaths(p,{centerX:t.centerX,centerY:t.centerY,endAngle:g,startAngle:d,size:t.size,i:o,totalItems:2,animBeginArr:0,dur:0,isTrack:!0,easing:e.globals.easing})}return s}},{key:"drawArcs",value:function(t){var e=this.w,i=new f(this.ctx),s=new S(this.ctx),a=new u(this.ctx),n=i.group(),r=this.getStrokeWidth(t);t.size=t.size-r/2;var o=e.config.plotOptions.radialBar.hollow.background,l=t.size-r*t.series.length-this.margin*t.series.length-r*parseInt(e.config.plotOptions.radialBar.track.strokeWidth)/100/2,h=l-e.config.plotOptions.radialBar.hollow.margin;void 0!==e.config.plotOptions.radialBar.hollow.image&&(o=this.drawHollowImage(t,n,l,o));var c=this.drawHollow({size:h,centerX:t.centerX,centerY:t.centerY,fill:o});if(e.config.plotOptions.radialBar.hollow.dropShadow.enabled){var g=e.config.plotOptions.radialBar.hollow.dropShadow;a.dropShadow(c,g)}var p=1;!this.radialDataLabels.total.show&&e.globals.series.length>1&&(p=0);var x=new I(this.ctx),b=null;this.radialDataLabels.show&&(b=x.renderInnerDataLabels(this.radialDataLabels,{hollowSize:l,centerX:t.centerX,centerY:t.centerY,opacity:p})),"back"===e.config.plotOptions.radialBar.hollow.position&&(n.add(c),b&&n.add(b));var m=!1;e.config.plotOptions.radialBar.inverseOrder&&(m=!0);for(var v=m?t.series.length-1:0;m?v>=0:v<t.series.length;m?v--:v++){var y=i.group({class:"apexcharts-series apexcharts-radial-series ".concat(d.escapeString(e.globals.seriesNames[v]))});n.add(y),y.attr({id:"apexcharts-series-"+v,rel:v+1}),this.ctx.series.addCollapsedClassToSeries(y,v),t.size=t.size-r-this.margin;var w=s.fillPath({seriesNumber:v,size:t.size}),k=this.startAngle,A=void 0,C=Math.abs(e.config.plotOptions.radialBar.endAngle-e.config.plotOptions.radialBar.startAngle),L=d.negToZero(t.series[v]>100?100:t.series[v])/100,z=Math.round(C*L)+this.startAngle,P=void 0;e.globals.dataChanged&&(A=this.startAngle,P=Math.round(C*d.negToZero(e.globals.previousPaths[v])/100)+A),Math.abs(z)+Math.abs(k)>=360&&(z-=.01),Math.abs(P)+Math.abs(A)>=360&&(P-=.01);var E=z-k,M=Array.isArray(e.config.stroke.dashArray)?e.config.stroke.dashArray[v]:e.config.stroke.dashArray,T=i.drawPath({d:"",stroke:w,strokeWidth:r,fill:"none",fillOpacity:e.config.fill.opacity,classes:"apexcharts-radialbar-area",strokeDashArray:M});if(f.setAttrs(T.node,{"data:angle":E,"data:value":t.series[v]}),e.config.chart.dropShadow.enabled){var X=e.config.chart.dropShadow;a.dropShadow(T,X,v)}this.addListeners(T,this.radialDataLabels);var Y=new I(this.ctx);y.add(T),T.attr({id:"apexcharts-radialbar-slice-"+v,index:0,j:v});var F=0;!Y.initialAnim||e.globals.resized||e.globals.dataChanged||(F=(z-k)/360*e.config.chart.animations.speed,this.animDur=F/(1.2*t.series.length)+this.animDur,this.animBeginArr.push(this.animDur)),e.globals.dataChanged&&(F=(z-k)/360*e.config.chart.animations.dynamicAnimation.speed,this.animDur=F/(1.2*t.series.length)+this.animDur,this.animBeginArr.push(this.animDur)),Y.animatePaths(T,{centerX:t.centerX,centerY:t.centerY,endAngle:z,startAngle:k,prevEndAngle:P,prevStartAngle:A,size:t.size,i:v,totalItems:2,animBeginArr:this.animBeginArr,dur:F,shouldSetPrevPaths:!0,easing:e.globals.easing})}return{g:n,elHollow:c,dataLabels:b}}},{key:"drawHollow",value:function(t){var e=new f(this.ctx).drawCircle(2*t.size);return e.attr({class:"apexcharts-radialbar-hollow",cx:t.centerX,cy:t.centerY,r:t.size,fill:t.fill}),e}},{key:"drawHollowImage",value:function(t,e,i,s){var a=this.w,n=new S(this.ctx),r=(Math.random()+1).toString(36).substring(4),o=a.config.plotOptions.radialBar.hollow.image;if(a.config.plotOptions.radialBar.hollow.imageClipped)n.clippedImgArea({width:i,height:i,image:o,patternID:"pattern".concat(a.globals.cuid).concat(r)}),s="url(#pattern".concat(a.globals.cuid).concat(r,")");else{var l=a.config.plotOptions.radialBar.hollow.imageWidth,h=a.config.plotOptions.radialBar.hollow.imageHeight;if(void 0===l&&void 0===h){var c=a.globals.dom.Paper.image(o).loaded(function(e){this.move(t.centerX-e.width/2+a.config.plotOptions.radialBar.hollow.imageOffsetX,t.centerY-e.height/2+a.config.plotOptions.radialBar.hollow.imageOffsetY)});e.add(c)}else{var d=a.globals.dom.Paper.image(o).loaded(function(e){this.move(t.centerX-l/2+a.config.plotOptions.radialBar.hollow.imageOffsetX,t.centerY-h/2+a.config.plotOptions.radialBar.hollow.imageOffsetY),this.size(l,h)});e.add(d)}}return s}},{key:"getStrokeWidth",value:function(t){var e=this.w;return t.size*(100-parseInt(e.config.plotOptions.radialBar.hollow.size))/100/(t.series.length+1)-this.margin}}]),i}(),R=function(t){function i(){return e(this,i),h(this,o(i).apply(this,arguments))}return r(i,P),s(i,[{key:"draw",value:function(t,e){var i=this.w,s=new f(this.ctx),a=new S(this.ctx);this.rangeBarOptions=this.w.config.plotOptions.rangeBar,this.series=t,this.seriesRangeStart=i.globals.seriesRangeStart,this.seriesRangeEnd=i.globals.seriesRangeEnd,this.initVariables(t);for(var n=s.group({class:"apexcharts-rangebar-series apexcharts-plot-series"}),r=0,o=0;r<t.length;r++,o++){var l,h,c,u,g=void 0,p=void 0,x=void 0,b=void 0,m=[],v=[],y=i.globals.comboCharts?e[r]:r,w=s.group({class:"apexcharts-series ".concat(d.escapeString(i.globals.seriesNames[y])),rel:r+1,"data:realIndex":y});t[r].length>0&&(this.visibleI=this.visibleI+1);var k=0,A=0,C=0;this.yRatio.length>1&&(this.yaxisIndex=y);var L=this.initialPositions();b=L.y,h=L.yDivision,A=L.barHeight,u=L.zeroW,x=L.x,C=L.barWidth,l=L.xDivision,c=L.zeroH,v.push(x+C/2);for(var z=s.group({class:"apexcharts-datalabels"}),P=0,E=i.globals.dataPoints;P<i.globals.dataPoints;P++,E--){void 0===this.series[r][P]||null===t[r][P]?this.isNullValue=!0:this.isNullValue=!1,i.config.stroke.show&&(k=this.isNullValue?0:Array.isArray(this.strokeWidth)?this.strokeWidth[y]:this.strokeWidth);var M=null;this.isHorizontal?C=(M=this.drawRangeBarPaths({indexes:{i:r,j:P,realIndex:y,bc:o},barHeight:A,strokeWidth:k,pathTo:g,pathFrom:p,zeroW:u,x:x,y:b,yDivision:h,elSeries:w})).barWidth:A=(M=this.drawRangeColumnPaths({indexes:{i:r,j:P,realIndex:y,bc:o},x:x,y:b,xDivision:l,pathTo:g,pathFrom:p,barWidth:C,zeroH:c,strokeWidth:k,elSeries:w})).barHeight,g=M.pathTo,p=M.pathFrom,b=M.y,x=M.x,P>0&&v.push(x+C/2),m.push(b);var T=a.fillPath({seriesNumber:y}),X=i.globals.stroke.colors[y];w=this.renderSeries({realIndex:y,pathFill:T,lineFill:X,j:P,i:r,pathFrom:p,pathTo:g,strokeWidth:k,elSeries:w,x:x,y:b,series:t,barHeight:A,barWidth:C,elDataLabelsWrap:z,visibleSeries:this.visibleI,type:"rangebar"})}i.globals.seriesXvalues[y]=v,i.globals.seriesYvalues[y]=m,n.add(w)}return n}},{key:"drawRangeColumnPaths",value:function(t){var e=t.indexes,i=t.x,s=(t.y,t.strokeWidth),a=t.xDivision,n=t.pathTo,r=t.pathFrom,o=t.barWidth,l=t.zeroH,h=this.w,c=new f(this.ctx),d=e.i,u=e.j,g=this.yRatio[this.yaxisIndex],p=e.realIndex,x=this.getRangeValue(p,u),b=Math.min(x.start,x.end),m=Math.max(x.start,x.end);h.globals.isXNumeric&&(i=(h.globals.seriesX[d][u]-h.globals.minX)/this.xRatio-o/2);var v=i+o*this.visibleI;void 0===this.series[d][u]||null===this.series[d][u]?b=l:(b=l-b/g,m=l-m/g);var y=Math.abs(m-b);return c.move(v,l),r=c.move(v,b),h.globals.previousPaths.length>0&&(r=this.getPathFrom(p,u,!0)),n=c.move(v,m)+c.line(v+o,m)+c.line(v+o,b)+c.line(v,b)+c.line(v,m-s/2),r=r+c.move(v,b)+c.line(v+o,b)+c.line(v+o,b)+c.line(v,b),h.globals.isXNumeric||(i+=a),{pathTo:n,pathFrom:r,barHeight:y,x:i,y:m,barXPosition:v}}},{key:"drawRangeBarPaths",value:function(t){var e=t.indexes,i=(t.x,t.y),s=t.yDivision,a=t.pathTo,n=t.pathFrom,r=t.barHeight,o=t.zeroW,l=this.w,h=new f(this.ctx),c=e.i,d=e.j,u=e.realIndex,g=o,p=o;l.globals.isXNumeric&&(i=(l.globals.seriesX[c][d]-l.globals.minX)/this.invertedXRatio-r);var x=i+r*this.visibleI;void 0!==this.series[c][d]&&null!==this.series[c][d]&&(g=o+this.seriesRangeStart[c][d]/this.invertedYRatio,p=o+this.seriesRangeEnd[c][d]/this.invertedYRatio),h.move(o,x),n=h.move(o,x),l.globals.previousPaths.length>0&&(n=this.getPathFrom(u,d));var b=Math.abs(p-g);return a=h.move(g,x)+h.line(p,x)+h.line(p,x+r)+h.line(g,x+r)+h.line(g,x),n=n+h.line(g,x)+h.line(g,x+r)+h.line(g,x+r)+h.line(g,x),l.globals.isXNumeric||(i+=s),{pathTo:a,pathFrom:n,barWidth:b,x:p,y:i,barYPosition:x}}},{key:"getRangeValue",value:function(t,e){var i=this.w;return{start:i.globals.seriesRangeStart[t][e],end:i.globals.seriesRangeEnd[t][e]}}}]),i}(),D=function(){function t(i,s,a){e(this,t),this.ctx=i,this.w=i.w,this.xyRatios=s,this.pointsChart=!("bubble"!==this.w.config.chart.type&&"scatter"!==this.w.config.chart.type)||a,this.scatter=new L(this.ctx),this.noNegatives=this.w.globals.minX===Number.MAX_VALUE,this.yaxisIndex=0}return s(t,[{key:"draw",value:function(t,e,i){var s=this.w,a=new f(this.ctx),r=new S(this.ctx),o=s.globals.comboCharts?e:s.config.chart.type,l=a.group({class:"apexcharts-".concat(o,"-series apexcharts-plot-series")}),h=new y(this.ctx,s);t=h.getLogSeries(t);var c=this.xyRatios.yRatio;c=h.getLogYRatios(c);for(var u=this.xyRatios.zRatio,g=this.xyRatios.xRatio,p=this.xyRatios.baseLineY,x=[],b=[],m=0,v=0;v<t.length;v++){if("line"===o&&("gradient"===s.config.fill.type||"gradient"===s.config.fill.type[v])&&h.seriesHaveSameValues(v)){var w=t[v].slice();w[w.length-1]=w[w.length-1]+1e-6,t[v]=w}var k=s.globals.gridWidth/s.globals.dataPoints,A=s.globals.comboCharts?i[v]:v;c.length>1&&(this.yaxisIndex=A),this.isReversed=s.config.yaxis[this.yaxisIndex]&&s.config.yaxis[this.yaxisIndex].reversed;var L=[],P=[],E=s.globals.gridHeight-p[this.yaxisIndex]-(this.isReversed?s.globals.gridHeight:0)+(this.isReversed?2*p[this.yaxisIndex]:0),M=E;E>s.globals.gridHeight&&(M=s.globals.gridHeight),m=k/2;var T=s.globals.padHorizontal+m,X=1;s.globals.isXNumeric&&s.globals.seriesX.length>0&&(T=(s.globals.seriesX[A][0]-s.globals.minX)/g),P.push(T);var I=void 0,Y=void 0,F=void 0,R=void 0,D=[],N=[],O=a.group({class:"apexcharts-series ".concat(d.escapeString(s.globals.seriesNames[A]))}),H=a.group({class:"apexcharts-series-markers-wrap"}),W=a.group({class:"apexcharts-datalabels"});this.ctx.series.addCollapsedClassToSeries(O,A);var B=t[v].length===s.globals.dataPoints;O.attr({"data:longestSeries":B,rel:v+1,"data:realIndex":A}),this.appendPathFrom=!0;var V=T,G=void 0,_=V,j=E,U=0;if(j=this.determineFirstPrevY({i:v,series:t,yRatio:c[this.yaxisIndex],zeroY:E,prevY:j,prevSeriesY:b,lineYPosition:U}).prevY,L.push(j),G=j,null===t[v][0]){for(var q=0;q<t[v].length;q++)if(null!==t[v][q]){_=k*q,j=E-t[v][q]/c[this.yaxisIndex],I=a.move(_,j),Y=a.move(_,M);break}}else I=a.move(_,j),Y=a.move(_,M)+a.line(_,j);if(F=a.move(-1,E)+a.line(-1,E),R=a.move(-1,E)+a.line(-1,E),s.globals.previousPaths.length>0){var Z=this.checkPreviousPaths({pathFromLine:F,pathFromArea:R,realIndex:A});F=Z.pathFromLine,R=Z.pathFromArea}for(var $=s.globals.dataPoints>1?s.globals.dataPoints-1:s.globals.dataPoints,J=0;J<$;J++){if(s.globals.isXNumeric){var Q=s.globals.seriesX[A][J+1];void 0===s.globals.seriesX[A][J+1]&&(Q=s.globals.seriesX[A][$-1]),T=(Q-s.globals.minX)/g}else T+=k;var K=d.isNumber(s.globals.minYArr[A])?s.globals.minYArr[A]:s.globals.minY;s.config.chart.stacked?(U=v>0&&s.globals.collapsedSeries.length<s.config.series.length-1?b[v-1][J+1]:E,X=void 0===t[v][J+1]||null===t[v][J+1]?U-K/c[this.yaxisIndex]+2*(this.isReversed?K/c[this.yaxisIndex]:0):U-t[v][J+1]/c[this.yaxisIndex]+2*(this.isReversed?t[v][J+1]/c[this.yaxisIndex]:0)):X=void 0===t[v][J+1]||null===t[v][J+1]?E-K/c[this.yaxisIndex]+2*(this.isReversed?K/c[this.yaxisIndex]:0):E-t[v][J+1]/c[this.yaxisIndex]+2*(this.isReversed?t[v][J+1]/c[this.yaxisIndex]:0),P.push(T),L.push(X);var tt=this.createPaths({series:t,i:v,j:J,x:T,y:X,xDivision:k,pX:V,pY:G,areaBottomY:M,linePath:I,areaPath:Y,linePaths:D,areaPaths:N,seriesIndex:i});N=tt.areaPaths,D=tt.linePaths,V=tt.pX,G=tt.pY,Y=tt.areaPath,I=tt.linePath,this.appendPathFrom&&(F+=a.line(T,E),R+=a.line(T,E));var et=this.calculatePoints({series:t,x:T,y:X,realIndex:A,i:v,j:J,prevY:j,categoryAxisCorrection:m,xRatio:g});if(this.pointsChart)this.scatter.draw(O,J,{realIndex:A,pointsPos:et,zRatio:u,elParent:H});else{var it=new C(this.ctx);s.globals.dataPoints>1&&H.node.classList.add("hidden");var st=it.plotChartMarkers(et,A,J+1);null!==st&&H.add(st)}var at=!t[v][J+1]||t[v][J+1]>t[v][J]?"top":"bottom",nt=new z(this.ctx).drawDataLabel(et,A,J+1,null,at);null!==nt&&W.add(nt)}b.push(L),s.globals.seriesXvalues[A]=P,s.globals.seriesYvalues[A]=L,this.pointsChart||s.globals.delayedElements.push({el:H.node,index:A});var rt={i:v,realIndex:A,animationDelay:v,initialSpeed:s.config.chart.animations.speed,dataChangeSpeed:s.config.chart.animations.dynamicAnimation.speed,className:"apexcharts-".concat(o),id:"apexcharts-".concat(o)};if("area"===o)for(var ot=r.fillPath({seriesNumber:A}),lt=0;lt<N.length;lt++){var ht=a.renderPaths(n({},rt,{pathFrom:R,pathTo:N[lt],stroke:"none",strokeWidth:0,strokeLineCap:null,fill:ot}));O.add(ht)}if(s.config.stroke.show&&!this.pointsChart){var ct=null;ct="line"===o?r.fillPath({seriesNumber:A,i:v}):s.globals.stroke.colors[A];for(var dt=0;dt<D.length;dt++){var ut=a.renderPaths(n({},rt,{pathFrom:F,pathTo:D[dt],stroke:ct,strokeWidth:Array.isArray(s.config.stroke.width)?s.config.stroke.width[A]:s.config.stroke.width,strokeLineCap:s.config.stroke.lineCap,fill:"none"}));O.add(ut)}}O.add(H),O.add(W),x.push(O)}for(var gt=x.length;gt>0;gt--)l.add(x[gt-1]);return l}},{key:"createPaths",value:function(t){var e=t.series,i=t.i,s=t.j,a=t.x,n=t.y,r=t.pX,o=t.pY,l=t.xDivision,h=t.areaBottomY,c=t.linePath,d=t.areaPath,u=t.linePaths,g=t.areaPaths,p=t.seriesIndex,x=this.w,b=new f(this.ctx),m=x.config.stroke.curve;if(Array.isArray(x.config.stroke.curve)&&(m=Array.isArray(p)?x.config.stroke.curve[p[i]]:x.config.stroke.curve[i]),"smooth"===m){var v=.35*(a-r);x.globals.hasNullValues?(null!==e[i][s]&&(null!==e[i][s+1]?(c=b.move(r,o)+b.curve(r+v,o,a-v,n,a+1,n),d=b.move(r+1,o)+b.curve(r+v,o,a-v,n,a+1,n)+b.line(a,h)+b.line(r,h)+"z"):(c=b.move(r,o),d=b.move(r,o)+"z")),u.push(c),g.push(d)):(c+=b.curve(r+v,o,a-v,n,a,n),d+=b.curve(r+v,o,a-v,n,a,n)),r=a,o=n,s===e[i].length-2&&(d=d+b.curve(r,o,a,n,a,h)+b.move(a,n)+"z",x.globals.hasNullValues||(u.push(c),g.push(d)))}else null===e[i][s+1]&&(c+=b.move(a,n),d=d+b.line(a-l,h)+b.move(a,n)),null===e[i][s]&&(c+=b.move(a,n),d+=b.move(a,h)),"stepline"===m?(c=c+b.line(a,null,"H")+b.line(null,n,"V"),d=d+b.line(a,null,"H")+b.line(null,n,"V")):"straight"===m&&(c+=b.line(a,n),d+=b.line(a,n)),s===e[i].length-2&&(d=d+b.line(a,h)+b.move(a,n)+"z",u.push(c),g.push(d));return{linePaths:u,areaPaths:g,pX:r,pY:o,linePath:c,areaPath:d}}},{key:"calculatePoints",value:function(t){var e=t.series,i=t.realIndex,s=t.x,a=t.y,n=t.i,r=t.j,o=t.prevY,l=t.categoryAxisCorrection,h=t.xRatio,c=this.w,u=[],g=[];if(0===r){var f=l+c.config.markers.offsetX;c.globals.isXNumeric&&(f=(c.globals.seriesX[i][0]-c.globals.minX)/h+c.config.markers.offsetX),u.push(f),g.push(d.isNumber(e[n][0])?o+c.config.markers.offsetY:null),u.push(s+c.config.markers.offsetX),g.push(d.isNumber(e[n][r+1])?a+c.config.markers.offsetY:null)}else u.push(s+c.config.markers.offsetX),g.push(d.isNumber(e[n][r+1])?a+c.config.markers.offsetY:null);return{x:u,y:g}}},{key:"checkPreviousPaths",value:function(t){for(var e=t.pathFromLine,i=t.pathFromArea,s=t.realIndex,a=this.w,n=0;n<a.globals.previousPaths.length;n++){var r=a.globals.previousPaths[n];("line"===r.type||"area"===r.type)&&r.paths.length>0&&parseInt(r.realIndex)===parseInt(s)&&("line"===r.type?(this.appendPathFrom=!1,e=a.globals.previousPaths[n].paths[0].d):"area"===r.type&&(this.appendPathFrom=!1,i=a.globals.previousPaths[n].paths[0].d,a.config.stroke.show&&(e=a.globals.previousPaths[n].paths[1].d)))}return{pathFromLine:e,pathFromArea:i}}},{key:"determineFirstPrevY",value:function(t){var e=t.i,i=t.series,s=t.yRatio,a=t.zeroY,n=t.prevY,r=t.prevSeriesY,o=t.lineYPosition,l=this.w;if(void 0!==i[e][0])n=l.config.chart.stacked?(o=e>0?r[e-1][0]:a)-i[e][0]/s+2*(this.isReversed?i[e][0]/s:0):a-i[e][0]/s+2*(this.isReversed?i[e][0]/s:0);else if(l.config.chart.stacked&&e>0&&void 0===i[e][0])for(var h=e-1;h>=0;h--)if(null!==i[h][0]&&void 0!==i[h][0]){n=o=r[h][0];break}return{prevY:n,lineYPosition:o}}}]),t}(),N=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.tooltipKeyFormat="dd MMM"}return s(t,[{key:"xLabelFormat",value:function(t,e){var i=this.w;if("datetime"===i.config.xaxis.type&&void 0===i.config.tooltip.x.formatter)return new m(this.ctx).formatDate(new Date(e),i.config.tooltip.x.format,!0,!0);return t(e)}},{key:"setLabelFormatters",value:function(){var t=this.w;return t.globals.xLabelFormatter=function(t){return t},t.globals.xaxisTooltipFormatter=function(t){return t},t.globals.ttKeyFormatter=function(t){return t},t.globals.ttZFormatter=function(t){return t},t.globals.legendFormatter=function(t){return t},"function"==typeof t.config.tooltip.x.formatter&&(t.globals.ttKeyFormatter=t.config.tooltip.x.formatter),"function"==typeof t.config.xaxis.tooltip.formatter&&(t.globals.xaxisTooltipFormatter=t.config.xaxis.tooltip.formatter),Array.isArray(t.config.tooltip.y)?t.globals.ttVal=t.config.tooltip.y:void 0!==t.config.tooltip.y.formatter&&(t.globals.ttVal=t.config.tooltip.y),void 0!==t.config.tooltip.z.formatter&&(t.globals.ttZFormatter=t.config.tooltip.z.formatter),void 0!==t.config.legend.formatter&&(t.globals.legendFormatter=t.config.legend.formatter),void 0!==t.config.xaxis.labels.formatter?t.globals.xLabelFormatter=t.config.xaxis.labels.formatter:t.globals.xLabelFormatter=function(e){return d.isNumber(e)?"numeric"===t.config.xaxis.type&&t.globals.dataPoints<50?e.toFixed(1):e.toFixed(0):e},t.config.yaxis.forEach(function(e,i){void 0!==e.labels.formatter?t.globals.yLabelFormatters[i]=e.labels.formatter:t.globals.yLabelFormatters[i]=function(i){return d.isNumber(i)?0!==t.globals.yValueDecimal||t.globals.maxY-t.globals.minY<4?i.toFixed(void 0!==e.decimalsInFloat?e.decimalsInFloat:t.globals.yValueDecimal):i.toFixed(0):i}}),t.globals}},{key:"heatmapLabelFormatters",value:function(){var t=this.w;if("heatmap"===t.config.chart.type){t.globals.yAxisScale[0].result=t.globals.seriesNames.slice();var e=t.globals.seriesNames.reduce(function(t,e){return t.length>e.length?t:e},0);t.globals.yAxisScale[0].niceMax=e,t.globals.yAxisScale[0].niceMin=e}}}]),t}(),O=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w}return s(t,[{key:"getLabel",value:function(t,e,i,s){var a,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],r=this.w,o=void 0===t[s]?"":t[s],l=r.globals.xLabelFormatter,h=r.config.xaxis.labels.formatter;return a=new N(this.ctx).xLabelFormat(l,o),void 0!==h&&(a=h(o,t[s],s)),e.length>0?(i=e[s].position,a=e[s].value):"datetime"===r.config.xaxis.type&&void 0===h&&(a=""),void 0===a&&(a=""),(0===(a=a.toString()).indexOf("NaN")||0===a.toLowerCase().indexOf("invalid")||a.toLowerCase().indexOf("infinity")>=0||n.indexOf(a)>=0&&!r.config.xaxis.labels.showDuplicates)&&(a=""),{x:i,text:a}}},{key:"drawYAxisTicks",value:function(t,e,i,s,a,n,r){var o=this.w,l=new f(this.ctx),h=o.globals.translateY;if(s.show){!0===o.config.yaxis[a].opposite&&(t+=s.width);for(var c=e;c>=0;c--){var d=h+e/10+o.config.yaxis[a].labels.offsetY-1;o.globals.isBarHorizontal&&(d=n*c);var u=l.drawLine(t+i.offsetX-s.width+s.offsetX,d+s.offsetY,t+i.offsetX+s.offsetX,d+s.offsetY,i.color);r.add(u),h+=n}}}}]),t}(),H=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w;var s=this.w;this.xaxisLabels=s.globals.labels.slice(),s.globals.timelineLabels.length>0&&(this.xaxisLabels=s.globals.timelineLabels.slice()),this.drawnLabels=[],"top"===s.config.xaxis.position?this.offY=0:this.offY=s.globals.gridHeight+1,this.offY=this.offY+s.config.xaxis.axisBorder.offsetY,this.xaxisFontSize=s.config.xaxis.labels.style.fontSize,this.xaxisFontFamily=s.config.xaxis.labels.style.fontFamily,this.xaxisForeColors=s.config.xaxis.labels.style.colors,this.xaxisBorderWidth=s.config.xaxis.axisBorder.width,this.xaxisBorderWidth.indexOf("%")>-1?this.xaxisBorderWidth=s.globals.gridWidth*parseInt(this.xaxisBorderWidth)/100:this.xaxisBorderWidth=parseInt(this.xaxisBorderWidth),this.xaxisBorderHeight=s.config.xaxis.axisBorder.height,this.yaxis=s.config.yaxis[0],this.axesUtils=new O(i)}return s(t,[{key:"drawXaxis",value:function(){var t,e=this.w,i=new f(this.ctx),s=i.group({class:"apexcharts-xaxis",transform:"translate(".concat(e.config.xaxis.offsetX,", ").concat(e.config.xaxis.offsetY,")")}),a=i.group({class:"apexcharts-xaxis-texts-g",transform:"translate(".concat(e.globals.translateXAxisX,", ").concat(e.globals.translateXAxisY,")")});s.add(a);for(var n=e.globals.padHorizontal,r=[],o=0;o<this.xaxisLabels.length;o++)r.push(this.xaxisLabels[o]);n=e.globals.isXNumeric?n+(t=e.globals.gridWidth/(r.length-1))/2+e.config.xaxis.labels.offsetX:n+(t=e.globals.gridWidth/r.length)+e.config.xaxis.labels.offsetX;var l=r.length;if(e.config.xaxis.labels.show)for(var h=0;h<=l-1;h++){var c=n-t/2+e.config.xaxis.labels.offsetX,d=this.axesUtils.getLabel(r,e.globals.timelineLabels,c,h,this.drawnLabels);this.drawnLabels.push(d.text);var u=28;e.globals.rotateXLabels&&(u=22);var g=i.drawText({x:d.x,y:this.offY+e.config.xaxis.labels.offsetY+u,text:"",textAnchor:"middle",fontSize:this.xaxisFontSize,fontFamily:this.xaxisFontFamily,foreColor:Array.isArray(this.xaxisForeColors)?this.xaxisForeColors[h]:this.xaxisForeColors,cssClass:"apexcharts-xaxis-label "+e.config.xaxis.labels.style.cssClass});a.add(g),i.addTspan(g,d.text,this.xaxisFontFamily);var p=document.createElementNS(e.globals.SVGNS,"title");p.textContent=d.text,g.node.appendChild(p),n+=t}if(void 0!==e.config.xaxis.title.text){var x=i.group({class:"apexcharts-xaxis-title"}),b=i.drawText({x:e.globals.gridWidth/2+e.config.xaxis.title.offsetX,y:this.offY-parseInt(this.xaxisFontSize)+e.globals.xAxisLabelsHeight+e.config.xaxis.title.offsetY,text:e.config.xaxis.title.text,textAnchor:"middle",fontSize:e.config.xaxis.title.style.fontSize,fontFamily:e.config.xaxis.title.style.fontFamily,foreColor:e.config.xaxis.title.style.color,cssClass:"apexcharts-xaxis-title-text "+e.config.xaxis.title.style.cssClass});x.add(b),s.add(x)}if(e.config.xaxis.axisBorder.show){var m=0;"bar"===e.config.chart.type&&e.globals.isXNumeric&&(m-=15);var v=i.drawLine(e.globals.padHorizontal+m+e.config.xaxis.axisBorder.offsetX,this.offY,this.xaxisBorderWidth,this.offY,e.config.xaxis.axisBorder.color,0,this.xaxisBorderHeight);s.add(v)}return s}},{key:"drawXaxisInversed",value:function(t){var e,i,s=this.w,a=new f(this.ctx),n=s.config.yaxis[0].opposite?s.globals.translateYAxisX[t]:0,r=a.group({class:"apexcharts-yaxis apexcharts-xaxis-inversed",rel:t}),o=a.group({class:"apexcharts-yaxis-texts-g apexcharts-xaxis-inversed-texts-g",transform:"translate("+n+", 0)"});r.add(o);for(var l=[],h=0;h<this.xaxisLabels.length;h++)l.push(this.xaxisLabels[h]);i=-(e=s.globals.gridHeight/l.length)/2.2;var c=s.globals.yLabelFormatters[0],d=s.config.yaxis[0].labels;if(d.show)for(var u=0;u<=l.length-1;u++){var g=void 0===l[u]?"":l[u];g=c(g);var p=a.drawText({x:d.offsetX-15,y:i+e+d.offsetY,text:g,textAnchor:this.yaxis.opposite?"start":"end",foreColor:d.style.color?d.style.color:d.style.colors[u],fontSize:d.style.fontSize,fontFamily:d.style.fontFamily,cssClass:"apexcharts-yaxis-label "+d.style.cssClass});o.add(p),i+=e}if(void 0!==s.config.yaxis[0].title.text){var x=a.group({class:"apexcharts-yaxis-title apexcharts-xaxis-title-inversed",transform:"translate("+n+", 0)"}),b=a.drawText({x:0,y:s.globals.gridHeight/2,text:s.config.yaxis[0].title.text,textAnchor:"middle",foreColor:s.config.yaxis[0].title.style.color,fontSize:s.config.yaxis[0].title.style.fontSize,fontFamily:s.config.yaxis[0].title.style.fontFamily,cssClass:"apexcharts-yaxis-title-text "+s.config.yaxis[0].title.style.cssClass});x.add(b),r.add(x)}if(s.config.xaxis.axisBorder.show){var m=a.drawLine(s.globals.padHorizontal+s.config.xaxis.axisBorder.offsetX,this.offY,this.xaxisBorderWidth,this.offY,this.yaxis.axisBorder.color,0,this.xaxisBorderHeight);r.add(m),this.axesUtils.drawYAxisTicks(0,l.length,s.config.yaxis[0].axisBorder,s.config.yaxis[0].axisTicks,0,e,r)}return r}},{key:"drawXaxisTicks",value:function(t,e){var i=this.w,s=t;if(!(t<0||t>i.globals.gridWidth)){var a=this.offY+i.config.xaxis.axisTicks.offsetY,n=a+i.config.xaxis.axisTicks.height;if(i.config.xaxis.axisTicks.show){var r=new f(this.ctx).drawLine(t+i.config.xaxis.axisTicks.offsetX,a+i.config.xaxis.offsetY,s+i.config.xaxis.axisTicks.offsetX,n+i.config.xaxis.offsetY,i.config.xaxis.axisTicks.color);e.add(r),r.node.classList.add("apexcharts-xaxis-tick")}}}},{key:"getXAxisTicksPositions",value:function(){var t=this.w,e=[],i=this.xaxisLabels.length,s=t.globals.padHorizontal;if(t.globals.timelineLabels.length>0)for(var a=0;a<i;a++)s=this.xaxisLabels[a].position,e.push(s);else for(var n=i,r=0;r<n;r++){var o=n;t.globals.isXNumeric&&"bar"!==t.config.chart.type&&(o-=1),s+=t.globals.gridWidth/o,e.push(s)}return e}},{key:"xAxisLabelCorrections",value:function(){var t=this.w,e=new f(this.ctx),i=t.globals.dom.baseEl.querySelector(".apexcharts-xaxis-texts-g"),s=t.globals.dom.baseEl.querySelectorAll(".apexcharts-xaxis-texts-g text"),a=t.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxis-inversed text"),n=t.globals.dom.baseEl.querySelectorAll(".apexcharts-xaxis-inversed-texts-g text");if(t.globals.rotateXLabels||t.config.xaxis.labels.rotateAlways)for(var r=0;r<s.length;r++){var o=e.rotateAroundCenter(s[r]);o.y=o.y-1,o.x=o.x+1,s[r].setAttribute("transform","rotate(".concat(t.config.xaxis.labels.rotate," ").concat(o.x," ").concat(o.y,")")),s[r].setAttribute("text-anchor","end");i.setAttribute("transform","translate(0, ".concat(-10,")"));var l=s[r].childNodes;t.config.xaxis.labels.trim&&e.placeTextWithEllipsis(l[0],l[0].textContent,t.config.xaxis.labels.maxHeight-40)}else for(var h=t.globals.gridWidth/t.globals.labels.length,c=0;c<s.length;c++){var d=s[c].childNodes;t.config.xaxis.labels.trim&&"datetime"!==t.config.xaxis.type&&e.placeTextWithEllipsis(d[0],d[0].textContent,h)}if(a.length>0){var u=a[a.length-1].getBBox(),g=a[0].getBBox();u.x<-20&&a[a.length-1].parentNode.removeChild(a[a.length-1]),g.x+g.width>t.globals.gridWidth&&a[0].parentNode.removeChild(a[0]);for(var p=0;p<n.length;p++)e.placeTextWithEllipsis(n[p],n[p].textContent,t.config.yaxis[0].labels.maxWidth-2*parseInt(t.config.yaxis[0].title.style.fontSize)-20)}}}]),t}(),W=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w;var s=this.w;this.xaxisFontSize=s.config.xaxis.labels.style.fontSize,this.axisFontFamily=s.config.xaxis.labels.style.fontFamily,this.xaxisForeColors=s.config.xaxis.labels.style.colors,this.xAxisoffX=0,"bottom"===s.config.xaxis.position&&(this.xAxisoffX=s.globals.gridHeight),this.drawnLabels=[],this.axesUtils=new O(i)}return s(t,[{key:"drawYaxis",value:function(t){var e=this.w,i=new f(this.ctx),s=e.config.yaxis[t].labels.style.fontSize,a=e.config.yaxis[t].labels.style.fontFamily,n=i.group({class:"apexcharts-yaxis",rel:t,transform:"translate("+e.globals.translateYAxisX[t]+", 0)"});if(!e.config.yaxis[t].show)return n;var r=i.group({class:"apexcharts-yaxis-texts-g"});n.add(r);var o=e.globals.yAxisScale[t].result.length-1,l=e.globals.gridHeight/o+.1,h=e.globals.translateY,c=e.globals.yLabelFormatters[t],d=e.globals.yAxisScale[t].result.slice();if(e.config.yaxis[t]&&e.config.yaxis[t].reversed&&d.reverse(),e.config.yaxis[t].labels.show)for(var u=o;u>=0;u--){var g=d[u];g=c(g,u);var p=e.config.yaxis[t].labels.padding;e.config.yaxis[t].opposite&&0!==e.config.yaxis.length&&(p*=-1);var x=i.drawText({x:p,y:h+o/10+e.config.yaxis[t].labels.offsetY+1,text:g,textAnchor:e.config.yaxis[t].opposite?"start":"end",fontSize:s,fontFamily:a,foreColor:e.config.yaxis[t].labels.style.color,cssClass:"apexcharts-yaxis-label "+e.config.yaxis[t].labels.style.cssClass});r.add(x);var b=i.rotateAroundCenter(x.node);0!==e.config.yaxis[t].labels.rotate&&x.node.setAttribute("transform","rotate(".concat(e.config.yaxis[t].labels.rotate," ").concat(b.x," ").concat(b.y,")")),h+=l}if(void 0!==e.config.yaxis[t].title.text){var m=i.group({class:"apexcharts-yaxis-title"}),v=0;e.config.yaxis[t].opposite&&(v=e.globals.translateYAxisX[t]);var y=i.drawText({x:v,y:e.globals.gridHeight/2+e.globals.translateY,text:e.config.yaxis[t].title.text,textAnchor:"end",foreColor:e.config.yaxis[t].title.style.color,fontSize:e.config.yaxis[t].title.style.fontSize,fontFamily:e.config.yaxis[t].title.style.fontFamily,cssClass:"apexcharts-yaxis-title-text "+e.config.yaxis[t].title.style.cssClass});m.add(y),n.add(m)}var w=e.config.yaxis[t].axisBorder;if(w.show){var k=31+w.offsetX;e.config.yaxis[t].opposite&&(k=-31-w.offsetX);var A=i.drawLine(k,e.globals.translateY+w.offsetY-2,k,e.globals.gridHeight+e.globals.translateY+w.offsetY+2,w.color);n.add(A),this.axesUtils.drawYAxisTicks(k,o,w,e.config.yaxis[t].axisTicks,t,l,n)}return n}},{key:"drawYaxisInversed",value:function(t){var e=this.w,i=new f(this.ctx),s=i.group({class:"apexcharts-xaxis apexcharts-yaxis-inversed"}),a=i.group({class:"apexcharts-xaxis-texts-g",transform:"translate(".concat(e.globals.translateXAxisX,", ").concat(e.globals.translateXAxisY,")")});s.add(a);var n=e.globals.yAxisScale[t].result.length-1,r=e.globals.gridWidth/n+.1,o=r+e.config.xaxis.labels.offsetX,l=e.globals.xLabelFormatter,h=e.globals.yAxisScale[t].result.slice(),c=e.globals.invertedTimelineLabels;c.length>0&&(this.xaxisLabels=c.slice(),n=(h=c.slice()).length),e.config.yaxis[t]&&e.config.yaxis[t].reversed&&h.reverse();var d=c.length;if(e.config.xaxis.labels.show)for(var u=d?0:n;d?u<d-1:u>=0;d?u++:u--){var g=h[u];g=l(g,u);var p=e.globals.gridWidth+e.globals.padHorizontal-(o-r+e.config.xaxis.labels.offsetX);if(c.length){var x=this.axesUtils.getLabel(h,c,p,u,this.drawnLabels);p=x.x,g=x.text,this.drawnLabels.push(x.text)}var b=i.drawText({x:p,y:this.xAxisoffX+e.config.xaxis.labels.offsetY+30,text:"",textAnchor:"middle",foreColor:Array.isArray(this.xaxisForeColors)?this.xaxisForeColors[t]:this.xaxisForeColors,fontSize:this.xaxisFontSize,fontFamily:this.xaxisFontFamily,cssClass:"apexcharts-xaxis-label "+e.config.xaxis.labels.style.cssClass});a.add(b),b.tspan(g);var m=document.createElementNS(e.globals.SVGNS,"title");m.textContent=g,b.node.appendChild(m),o+=r}if(void 0!==e.config.xaxis.title.text){var v=i.group({class:"apexcharts-xaxis-title apexcharts-yaxis-title-inversed"}),y=i.drawText({x:e.globals.gridWidth/2,y:this.xAxisoffX+parseInt(this.xaxisFontSize)+parseInt(e.config.xaxis.title.style.fontSize)+20,text:e.config.xaxis.title.text,textAnchor:"middle",fontSize:e.config.xaxis.title.style.fontSize,fontFamily:e.config.xaxis.title.style.fontFamily,cssClass:"apexcharts-xaxis-title-text "+e.config.xaxis.title.style.cssClass});v.add(y),s.add(v)}var w=e.config.yaxis[t].axisBorder;if(w.show){var k=i.drawLine(e.globals.padHorizontal+w.offsetX,1+w.offsetY,e.globals.padHorizontal+w.offsetX,e.globals.gridHeight+w.offsetY,w.color);s.add(k)}return s}},{key:"yAxisTitleRotate",value:function(t,e){var i=this.w,s=new f(this.ctx),a={width:0,height:0},n={width:0,height:0},r=i.globals.dom.baseEl.querySelector(" .apexcharts-yaxis[rel='".concat(t,"'] .apexcharts-yaxis-texts-g"));null!==r&&(a=r.getBoundingClientRect());var o=i.globals.dom.baseEl.querySelector(".apexcharts-yaxis[rel='".concat(t,"'] .apexcharts-yaxis-title text"));if(null!==o&&(n=o.getBoundingClientRect()),null!==o){var l=this.xPaddingForYAxisTitle(t,a,n,e);o.setAttribute("x",l.xPos-(e?10:0))}if(null!==o){var h=s.rotateAroundCenter(o);e?o.setAttribute("transform","rotate(".concat(i.config.yaxis[t].title.rotate," ").concat(h.x," ").concat(h.y,")")):o.setAttribute("transform","rotate(-".concat(i.config.yaxis[t].title.rotate," ").concat(h.x," ").concat(h.y,")"))}}},{key:"xPaddingForYAxisTitle",value:function(t,e,i,s){var a=this.w,n=0,r=0,o=10;return void 0===a.config.yaxis[t].title.text||t<0?{xPos:r,padd:0}:(s?(r=e.width+a.config.yaxis[t].title.offsetX+i.width/2+o/2,0===(n+=1)&&(r-=o/2)):(r=-1*e.width+a.config.yaxis[t].title.offsetX+o/2+i.width/2,a.globals.isBarHorizontal&&(o=25,r=-1*e.width-a.config.yaxis[t].title.offsetX-o)),{xPos:r,padd:o})}},{key:"setYAxisXPosition",value:function(t,e){var i=this.w,s=0,a=0,n=21,r=1;i.config.yaxis.length>1&&(this.multipleYs=!0),i.config.yaxis.map(function(o,l){var h=i.globals.ignoreYAxisIndexes.indexOf(l)>-1||!o.show||o.floating||0===t[l].width,c=t[l].width+e[l].width;o.opposite?i.globals.isBarHorizontal?(a=i.globals.gridWidth+i.globals.translateX-1,i.globals.translateYAxisX[l]=a-o.labels.offsetX):(a=i.globals.gridWidth+i.globals.translateX+r,h||(r=r+c+20),i.globals.translateYAxisX[l]=a-o.labels.offsetX+20):(s=i.globals.translateX-n,h||(n=n+c+20),i.globals.translateYAxisX[l]=s+o.labels.offsetX)})}},{key:"setYAxisTextAlignments",value:function(){var t=this.w,e=t.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxis");(e=d.listToArray(e)).forEach(function(e,i){var s=t.config.yaxis[i];if(void 0!==s.labels.align){var a=t.globals.dom.baseEl.querySelector(".apexcharts-yaxis[rel='".concat(i,"'] .apexcharts-yaxis-texts-g")),n=t.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxis[rel='".concat(i,"'] .apexcharts-yaxis-label"));n=d.listToArray(n);var r=a.getBoundingClientRect();"left"===s.labels.align?(n.forEach(function(t,e){t.setAttribute("text-anchor","start")}),s.opposite||a.setAttribute("transform","translate(-".concat(r.width,", 0)"))):"center"===s.labels.align?(n.forEach(function(t,e){t.setAttribute("text-anchor","middle")}),a.setAttribute("transform","translate(".concat(r.width/2*(s.opposite?1:-1),", 0)"))):"right"===s.labels.align&&(n.forEach(function(t,e){t.setAttribute("text-anchor","end")}),s.opposite&&a.setAttribute("transform","translate(".concat(r.width,", 0)")))}})}}]),t}(),B=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w}return s(t,[{key:"niceScale",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:10,a=this.w,n=void 0===this.w.config.yaxis[i].max&&void 0===this.w.config.yaxis[i].min||this.w.config.yaxis[i].forceNiceScale;if(t===Number.MIN_VALUE&&0===e||!d.isNumber(t)&&!d.isNumber(e)||t===Number.MIN_VALUE&&e===-Number.MAX_VALUE)return t=0,e=s,this.linearScale(t,e,s);t>e?(console.warn("yaxis.min cannot be greater than yaxis.max"),e=t+.1):t===e&&(t=0===t?0:t-.5,e=0===e?2:e+.5);var r=[],o=e-t;o<1&&n&&("candlestick"===a.config.chart.type||"candlestick"===a.config.series[i].type||a.globals.isRangeData)&&(e*=1.01),o<1e-5&&n&&(e*=1.05);var l=s+1;l<2?l=2:l>2&&(l-=2);for(var h=o/l,c=Math.floor(d.log10(h)),u=Math.pow(10,c),g=parseInt(h/u)*u,f=g*Math.floor(t/g),p=g*Math.ceil(e/g),x=f;r.push(x),!((x+=g)>p););if(n)return{result:r,niceMin:r[0],niceMax:r[r.length-1]};var b=t;(r=[]).push(b);for(var m=Math.abs(e-t)/s,v=0;v<=s-1;v++)b+=m,r.push(b);return{result:r,niceMin:r[0],niceMax:r[r.length-1]}}},{key:"linearScale",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,s=Math.abs(e-t)/i;i===Number.MAX_VALUE&&(i=10,s=1);for(var a=[],n=t;i>=0;)a.push(n),n+=s,i-=1;return{result:a,niceMin:a[0],niceMax:a[a.length-1]}}},{key:"logarithmicScale",value:function(t,e,i,s){(e<0||e===Number.MIN_VALUE)&&(e=.01);for(var a=Math.log(e)/Math.log(10),n=Math.log(i)/Math.log(10),r=Math.abs(i-e)/s,o=[],l=e;s>=0;)o.push(l),l+=r,s-=1;var h=o.map(function(t,s){t<=0&&(t=.01);var r=(n-a)/(i-e),o=Math.pow(10,a+r*(t-a));return Math.round(o/d.roundToBase(o,10))*d.roundToBase(o,10)});return 0===h[0]&&(h[0]=1),{result:h,niceMin:h[0],niceMax:h[h.length-1]}}},{key:"setYScaleForIndex",value:function(t,e,i){var s=this.w.globals,a=this.w.config,n=s.isBarHorizontal?a.xaxis:a.yaxis[t];void 0===s.yAxisScale[t]&&(s.yAxisScale[t]=[]),n.logarithmic?(s.allSeriesCollapsed=!1,s.yAxisScale[t]=this.logarithmicScale(t,e,i,n.tickAmount?n.tickAmount:Math.floor(Math.log10(i)))):i!==-Number.MAX_VALUE&&d.isNumber(i)?(s.allSeriesCollapsed=!1,void 0===n.min&&void 0===n.max||n.forceNiceScale?s.yAxisScale[t]=this.niceScale(e,i,t,n.tickAmount?n.tickAmount:i<5&&i>1?i+1:5):s.yAxisScale[t]=this.linearScale(e,i,n.tickAmount)):s.yAxisScale[t]=this.linearScale(0,5,5)}},{key:"setMultipleYScales",value:function(){var t=this,e=this.w.globals,i=this.w.config,s=e.minYArr.concat([]),a=e.maxYArr.concat([]),n=[];i.yaxis.forEach(function(r,o){var l=o;i.series.forEach(function(t,i){t.name===r.seriesName&&-1===e.collapsedSeriesIndices.indexOf(i)&&(l=i,o!==i?n.push({index:i,similarIndex:o,alreadyExists:!0}):n.push({index:i}))});var h=s[l],c=a[l];t.setYScaleForIndex(o,h,c)}),this.sameScaleInMultipleAxes(s,a,n)}},{key:"sameScaleInMultipleAxes",value:function(t,e,i){var s=this,a=this.w.config,n=this.w.globals,r=[];i.forEach(function(t){t.alreadyExists&&(void 0===r[t.index]&&(r[t.index]=[]),r[t.index].push(t.index),r[t.index].push(t.similarIndex))}),r.forEach(function(t,e){r.forEach(function(i,s){var a,n;e!==s&&(a=t,n=i,a.filter(function(t){return-1!==n.indexOf(t)})).length>0&&(r[e]=r[e].concat(r[s]))})});var o=r.map(function(t){return t.filter(function(e,i){return t.indexOf(e)===i})}).map(function(t){return t.sort()});r=r.filter(function(t){return!!t});var l=o.slice(),h=l.map(function(t){return JSON.stringify(t)});l=l.filter(function(t,e){return h.indexOf(JSON.stringify(t))===e});var c=[],d=[];t.forEach(function(t,i){l.forEach(function(s,a){s.indexOf(i)>-1&&(void 0===c[a]&&(c[a]=[],d[a]=[]),c[a].push({key:i,value:t}),d[a].push({key:i,value:e[i]}))})});var u=Array.apply(null,Array(l.length)).map(Number.prototype.valueOf,Number.MIN_VALUE),g=Array.apply(null,Array(l.length)).map(Number.prototype.valueOf,-Number.MAX_VALUE);c.forEach(function(t,e){t.forEach(function(t,i){u[e]=Math.min(t.value,u[e])})}),d.forEach(function(t,e){t.forEach(function(t,i){g[e]=Math.max(t.value,g[e])})}),t.forEach(function(t,e){d.forEach(function(t,i){var r=u[i],o=g[i];t.forEach(function(i,l){t[l].key===e&&(void 0!==a.yaxis[e].min&&(r="function"==typeof a.yaxis[e].min?a.yaxis[e].min(n.minY):a.yaxis[e].min),void 0!==a.yaxis[e].max&&(o="function"==typeof a.yaxis[e].max?a.yaxis[e].max(n.maxY):a.yaxis[e].max),s.setYScaleForIndex(e,r,o))})})})}},{key:"autoScaleY",value:function(t,e){t||(t=this);var i=[];return t.w.config.series.forEach(function(t){var s,a,n=t.data.find(function(t){return t[0]>=e.xaxis.min})[1];a=s=n,t.data.forEach(function(t){t[0]<=e.xaxis.max&&t[0]>=e.xaxis.min&&(t[1]>a&&null!==t[1]&&(a=t[1]),t[1]<s&&null!==t[1]&&(s=t[1]))}),s*=.95,a*=1.05,i.push({min:s,max:a})}),i}}]),t}(),V=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.scales=new B(i)}return s(t,[{key:"init",value:function(){this.setYRange(),this.setXRange(),this.setZRange()}},{key:"getMinYMaxY",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Number.MAX_VALUE,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-Number.MAX_VALUE,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=this.w.globals,n=-Number.MAX_VALUE,r=Number.MIN_VALUE;null===s&&(s=t+1);var o=a.series,l=o,h=o;"candlestick"===this.w.config.chart.type?(l=a.seriesCandleL,h=a.seriesCandleH):a.isRangeData&&(l=a.seriesRangeStart,h=a.seriesRangeEnd);for(var c=t;c<s;c++){a.dataPoints=Math.max(a.dataPoints,o[c].length);for(var u=0;u<a.series[c].length;u++){var g=o[c][u];null!==g&&d.isNumber(g)?(n=Math.max(n,h[c][u]),e=Math.min(e,l[c][u]),i=Math.max(i,l[c][u]),"candlestick"===this.w.config.chart.type&&(n=Math.max(n,a.seriesCandleO[c][u]),n=Math.max(n,a.seriesCandleH[c][u]),n=Math.max(n,a.seriesCandleL[c][u]),i=n=Math.max(n,a.seriesCandleC[c][u])),d.isFloat(g)&&(g=d.noExponents(g),a.yValueDecimal=Math.max(a.yValueDecimal,g.toString().split(".")[1].length)),r>l[c][u]&&l[c][u]<0&&(r=l[c][u])):a.hasNullValues=!0}}return{minY:r,maxY:n,lowestY:e,highestY:i}}},{key:"setYRange",value:function(){var t=this.w.globals,e=this.w.config;t.maxY=-Number.MAX_VALUE,t.minY=Number.MIN_VALUE;var i=Number.MAX_VALUE;if(t.isMultipleYAxis)for(var s=0;s<t.series.length;s++){var a=this.getMinYMaxY(s,i,null,s+1);t.minYArr.push(a.minY),t.maxYArr.push(a.maxY),i=a.lowestY}var n=this.getMinYMaxY(0,i,null,t.series.length);if(t.minY=n.minY,t.maxY=n.maxY,i=n.lowestY,e.chart.stacked){for(var r=[],o=[],l=0;l<t.series[t.maxValsInArrayIndex].length;l++)for(var h=0,c=0,u=0;u<t.series.length;u++)null!==t.series[u][l]&&d.isNumber(t.series[u][l])&&(t.series[u][l]>0?h=h+parseFloat(t.series[u][l])+1e-4:c+=parseFloat(t.series[u][l])),u===t.series.length-1&&(r.push(h),o.push(c));for(var g=0;g<r.length;g++)t.maxY=Math.max(t.maxY,r[g]),t.minY=Math.min(t.minY,o[g])}if(("line"===e.chart.type||"area"===e.chart.type||"candlestick"===e.chart.type)&&t.minY===Number.MIN_VALUE&&i!==-Number.MAX_VALUE&&i!==t.maxY){var f=t.maxY-i;i>=0&&i<=10&&(f=0),t.minY=i-5*f/100,t.maxY=t.maxY+5*f/100}return e.yaxis.map(function(e,i){void 0!==e.max&&("number"==typeof e.max?t.maxYArr[i]=e.max:"function"==typeof e.max&&(t.maxYArr[i]=e.max(t.maxY)),t.maxY=t.maxYArr[i]),void 0!==e.min&&("number"==typeof e.min?t.minYArr[i]=e.min:"function"==typeof e.min&&(t.minYArr[i]=e.min(t.minY)),t.minY=t.minYArr[i])}),t.isBarHorizontal&&(void 0!==e.xaxis.min&&"number"==typeof e.xaxis.min&&(t.minY=e.xaxis.min),void 0!==e.xaxis.max&&"number"==typeof e.xaxis.max&&(t.maxY=e.xaxis.max)),t.isMultipleYAxis?(this.scales.setMultipleYScales(),t.minY=i,t.yAxisScale.forEach(function(e,i){t.minYArr[i]=e.niceMin,t.maxYArr[i]=e.niceMax})):(this.scales.setYScaleForIndex(0,t.minY,t.maxY),t.minY=t.yAxisScale[0].niceMin,t.maxY=t.yAxisScale[0].niceMax,t.minYArr[0]=t.yAxisScale[0].niceMin,t.maxYArr[0]=t.yAxisScale[0].niceMax),{minY:t.minY,maxY:t.maxY,minYArr:t.minYArr,maxYArr:t.maxYArr}}},{key:"setXRange",value:function(){var t,e=this.w.globals,i=this.w.config,s="numeric"===i.xaxis.type||"datetime"===i.xaxis.type||"category"===i.xaxis.type&&!e.noLabelsProvided||e.noLabelsProvided;if(e.isXNumeric)for(var a=0;a<e.series.length;a++)if(e.labels[a])for(var n=0;n<e.labels[a].length;n++)null!==e.labels[a][n]&&d.isNumber(e.labels[a][n])&&(e.maxX=Math.max(e.maxX,e.labels[a][n]),e.initialmaxX=Math.max(e.maxX,e.labels[a][n]),e.minX=Math.min(e.minX,e.labels[a][n]),e.initialminX=Math.min(e.minX,e.labels[a][n]));if(e.noLabelsProvided&&0===i.xaxis.categories.length&&(e.maxX=e.labels[e.labels.length-1],e.initialmaxX=e.labels[e.labels.length-1],e.minX=1,e.initialminX=1),(e.comboChartsHasBars||"candlestick"===i.chart.type||"bar"===i.chart.type&&"category"!==i.xaxis.type)&&"category"!==i.xaxis.type){var r=e.minX-e.svgWidth/e.dataPoints*(Math.abs(e.maxX-e.minX)/e.svgWidth)/2;e.minX=r,e.initialminX=r;var o=e.maxX+e.svgWidth/e.dataPoints*(Math.abs(e.maxX-e.minX)/e.svgWidth)/2;e.maxX=o,e.initialmaxX=o}!e.isXNumeric&&!e.noLabelsProvided||i.xaxis.convertedCatToNumeric&&!e.dataFormatXNumeric||(void 0===i.xaxis.tickAmount?(t=Math.round(e.svgWidth/150),"numeric"===i.xaxis.type&&e.dataPoints<20&&(t=e.dataPoints-1),t>e.dataPoints&&0!==e.dataPoints&&(t=e.dataPoints-1)):t="dataPoints"===i.xaxis.tickAmount?e.series[e.maxValsInArrayIndex].length-1:i.xaxis.tickAmount,void 0!==i.xaxis.max&&"number"==typeof i.xaxis.max&&(e.maxX=i.xaxis.max),void 0!==i.xaxis.min&&"number"==typeof i.xaxis.min&&(e.minX=i.xaxis.min),void 0!==i.xaxis.range&&(e.minX=e.maxX-i.xaxis.range),e.minX!==Number.MAX_VALUE&&e.maxX!==-Number.MAX_VALUE?e.xAxisScale=this.scales.linearScale(e.minX,e.maxX,t):(e.xAxisScale=this.scales.linearScale(1,t,t),e.noLabelsProvided&&e.labels.length>0&&(e.xAxisScale=this.scales.linearScale(1,e.labels.length,t-1),e.seriesX=e.labels.slice())),s&&(e.labels=e.xAxisScale.result.slice()));if(e.minX===e.maxX)if("datetime"===i.xaxis.type){var l=new Date(e.minX);l.setDate(l.getDate()-2),e.minX=new Date(l).getTime();var h=new Date(e.maxX);h.setDate(h.getDate()+2),e.maxX=new Date(h).getTime()}else("numeric"===i.xaxis.type||"category"===i.xaxis.type&&!e.noLabelsProvided)&&(e.minX=e.minX-2,e.maxX=e.maxX+2);return e.isXNumeric&&(e.seriesX.forEach(function(t,i){t.forEach(function(t,s){if(s>0){var a=t-e.seriesX[i][s-1];e.minXDiff=Math.min(a,e.minXDiff)}})}),this.calcMinXDiffForTinySeries()),{minX:e.minX,maxX:e.maxX}}},{key:"calcMinXDiffForTinySeries",value:function(){var t=this.w,e=t.globals.labels.length;return 1===t.globals.labels.length?t.globals.minXDiff=(t.globals.maxX-t.globals.minX)/e/3:t.globals.minXDiff===Number.MAX_VALUE&&(t.globals.timelineLabels.length>0&&(e=t.globals.timelineLabels.length),e<3&&(e=3),t.globals.minXDiff=(t.globals.maxX-t.globals.minX)/e),t.globals.minXDiff}},{key:"setZRange",value:function(){var t=this.w.globals;if(t.isDataXYZ)for(var e=0;e<t.series.length;e++)if(void 0!==t.seriesZ[e])for(var i=0;i<t.seriesZ[e].length;i++)null!==t.seriesZ[e][i]&&d.isNumber(t.seriesZ[e][i])&&(t.maxZ=Math.max(t.maxZ,t.seriesZ[e][i]),t.minZ=Math.min(t.minZ,t.seriesZ[e][i]))}}]),t}(),G=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w}return s(t,[{key:"getAllSeriesEls",value:function(){return this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series")}},{key:"getSeriesByName",value:function(t){return this.w.globals.dom.baseEl.querySelector(".apexcharts-series.".concat(d.escapeString(t)))}},{key:"addCollapsedClassToSeries",value:function(t,e){for(var i=this.w,s=0;s<i.globals.collapsedSeries.length;s++)i.globals.collapsedSeries[s].index===e&&t.node.classList.add("apexcharts-series-collapsed")}},{key:"toggleSeriesOnHover",value:function(t,e){var i=this.w,s=i.globals.dom.baseEl.querySelectorAll(".apexcharts-series");if("mousemove"===t.type){var a=parseInt(e.getAttribute("rel"))-1,n=null;n=i.globals.axisCharts||"radialBar"===i.config.chart.type?i.globals.axisCharts?i.globals.dom.baseEl.querySelector(".apexcharts-series[data\\:realIndex='".concat(a,"']")):i.globals.dom.baseEl.querySelector(".apexcharts-series[rel='".concat(a+1,"']")):i.globals.dom.baseEl.querySelector(".apexcharts-series[rel='".concat(a+1,"'] path"));for(var r=0;r<s.length;r++)s[r].classList.add("legend-mouseover-inactive");null!==n&&(i.globals.axisCharts||n.parentNode.classList.remove("legend-mouseover-inactive"),n.classList.remove("legend-mouseover-inactive"))}else if("mouseout"===t.type)for(var o=0;o<s.length;o++)s[o].classList.remove("legend-mouseover-inactive")}},{key:"highlightRangeInSeries",value:function(t,e){var i=this.w,s=i.globals.dom.baseEl.querySelectorAll(".apexcharts-heatmap-rect"),a=function(){for(var t=0;t<s.length;t++)s[t].classList.remove("legend-mouseover-inactive")};if("mousemove"===t.type){var n=parseInt(e.getAttribute("rel"))-1;a(),function(){for(var t=0;t<s.length;t++)s[t].classList.add("legend-mouseover-inactive")}(),function(t){for(var e=0;e<s.length;e++){var i=parseInt(s[e].getAttribute("val"));i>=t.from&&i<=t.to&&s[e].classList.remove("legend-mouseover-inactive")}}(i.config.plotOptions.heatmap.colorScale.ranges[n])}else"mouseout"===t.type&&a()}},{key:"getActiveSeriesIndex",value:function(){var t=this.w,e=0;if(t.globals.series.length>1)for(var i=t.globals.series.map(function(e,i){return e.length>0&&"bar"!==t.config.series[i].type&&"column"!==t.config.series[i].type?i:-1}),s=0;s<i.length;s++)if(-1!==i[s]){e=i[s];break}return e}},{key:"getActiveConfigSeriesIndex",value:function(){var t=this.w,e=0;if(t.config.series.length>1)for(var i=t.config.series.map(function(t,e){return t.data&&t.data.length>0?e:-1}),s=0;s<i.length;s++)if(-1!==i[s]){e=i[s];break}return e}},{key:"getPreviousPaths",value:function(){var t=this.w;function e(e,i,s){for(var a=e[i].childNodes,n={type:s,paths:[],realIndex:e[i].getAttribute("data:realIndex")},r=0;r<a.length;r++)if(a[r].hasAttribute("pathTo")){var o=a[r].getAttribute("pathTo");n.paths.push({d:o})}t.globals.previousPaths.push(n)}t.globals.previousPaths=[];var i=t.globals.dom.baseEl.querySelectorAll(".apexcharts-line-series .apexcharts-series");if(i.length>0)for(var s=i.length-1;s>=0;s--)e(i,s,"line");var a=t.globals.dom.baseEl.querySelectorAll(".apexcharts-area-series .apexcharts-series");if(a.length>0)for(var n=a.length-1;n>=0;n--)e(a,n,"area");var r=t.globals.dom.baseEl.querySelectorAll(".apexcharts-bar-series .apexcharts-series");if(r.length>0)for(var o=0;o<r.length;o++)e(r,o,"bar");var l=t.globals.dom.baseEl.querySelectorAll(".apexcharts-candlestick-series .apexcharts-series");if(l.length>0)for(var h=0;h<l.length;h++)e(l,h,"candlestick");var c=t.globals.dom.baseEl.querySelectorAll(".apexcharts-radar-series .apexcharts-series");if(c.length>0)for(var d=0;d<c.length;d++)e(c,d,"radar");var u=t.globals.dom.baseEl.querySelectorAll(".apexcharts-bubble-series .apexcharts-series");if(u.length>0)for(var g=0;g<u.length;g++){for(var f=t.globals.dom.baseEl.querySelectorAll(".apexcharts-bubble-series .apexcharts-series[data\\:realIndex='".concat(g,"'] circle")),p=[],x=0;x<f.length;x++)p.push({x:f[x].getAttribute("cx"),y:f[x].getAttribute("cy"),r:f[x].getAttribute("r")});t.globals.previousPaths.push(p)}var b=t.globals.dom.baseEl.querySelectorAll(".apexcharts-scatter-series .apexcharts-series");if(b.length>0)for(var m=0;m<b.length;m++){for(var v=t.globals.dom.baseEl.querySelectorAll(".apexcharts-scatter-series .apexcharts-series[data\\:realIndex='".concat(m,"'] circle")),y=[],w=0;w<v.length;w++)y.push({x:v[w].getAttribute("cx"),y:v[w].getAttribute("cy"),r:v[w].getAttribute("r")});t.globals.previousPaths.push(y)}var k=t.globals.dom.baseEl.querySelectorAll(".apexcharts-heatmap .apexcharts-series");if(k.length>0)for(var A=0;A<k.length;A++){for(var S=t.globals.dom.baseEl.querySelectorAll(".apexcharts-heatmap .apexcharts-series[data\\:realIndex='".concat(A,"'] rect")),C=[],L=0;L<S.length;L++)C.push({color:S[L].getAttribute("color")});t.globals.previousPaths.push(C)}t.globals.axisCharts||(t.globals.previousPaths=t.globals.series)}},{key:"handleNoData",value:function(){var t=this.w,e=t.config.noData,i=new f(this.ctx),s=t.globals.svgWidth/2,a=t.globals.svgHeight/2,n="middle";if(t.globals.noData=!0,t.globals.animationEnded=!0,"left"===e.align?(s=10,n="start"):"right"===e.align&&(s=t.globals.svgWidth-10,n="end"),"top"===e.verticalAlign?a=50:"bottom"===e.verticalAlign&&(a=t.globals.svgHeight-50),s+=e.offsetX,a=a+parseInt(e.style.fontSize)+2,void 0!==e.text&&""!==e.text){var r=i.drawText({x:s,y:a,text:e.text,textAnchor:n,fontSize:e.style.fontSize,fontFamily:e.style.fontFamily,foreColor:e.style.color,opacity:1,class:"apexcharts-text-nodata"});r.node.setAttribute("class","apexcharts-title-text"),t.globals.dom.Paper.add(r)}}},{key:"setNullSeriesToZeroValues",value:function(t){for(var e=this.w,i=0;i<t.length;i++)if(0===t[i].length)for(var s=0;s<t[e.globals.maxValsInArrayIndex].length;s++)t[i].push(0);return t}},{key:"hasAllSeriesEqualX",value:function(){for(var t=!0,e=this.w,i=this.filteredSeriesX(),s=0;s<i.length-1;s++)if(i[s][0]!==i[s+1][0]){t=!1;break}return e.globals.allSeriesHasEqualX=t,t}},{key:"filteredSeriesX",value:function(){var t=this.w.globals.seriesX.map(function(t,e){return t.length>0?t:[]});return t}}]),t}(),_=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.lgRect={},this.yAxisWidth=0,this.xAxisHeight=0,this.isSparkline=this.w.config.chart.sparkline.enabled,this.xPadRight=0,this.xPadLeft=0}return s(t,[{key:"plotCoords",value:function(){var t=this.w,e=t.globals,i=this.getLegendsRect();e.axisCharts?this.setGridCoordsForAxisCharts(i):this.setGridCoordsForNonAxisCharts(i),this.titleSubtitleOffset(),e.gridHeight=e.gridHeight-t.config.grid.padding.top-t.config.grid.padding.bottom,e.gridWidth=e.gridWidth-t.config.grid.padding.left-t.config.grid.padding.right-this.xPadRight-this.xPadLeft,e.translateX=e.translateX+t.config.grid.padding.left+this.xPadLeft,e.translateY=e.translateY+t.config.grid.padding.top}},{key:"conditionalChecksForAxisCoords",value:function(t,e){var i=this.w;this.xAxisHeight=(t.height+e.height)*i.globals.LINE_HEIGHT_RATIO+15,this.xAxisWidth=t.width,this.xAxisHeight-e.height>i.config.xaxis.labels.maxHeight&&(this.xAxisHeight=i.config.xaxis.labels.maxHeight),i.config.xaxis.labels.minHeight&&this.xAxisHeight<i.config.xaxis.labels.minHeight&&(this.xAxisHeight=i.config.xaxis.labels.minHeight),i.config.xaxis.floating&&(this.xAxisHeight=0),i.globals.isBarHorizontal?this.yAxisWidth=i.globals.yLabelsCoords[0].width+i.globals.yTitleCoords[0].width+15:this.yAxisWidth=this.getTotalYAxisWidth();var s=0,a=0;i.config.yaxis.forEach(function(t){s+=t.labels.minWidth,a+=t.labels.maxWidth}),this.yAxisWidth<s&&(this.yAxisWidth=s),this.yAxisWidth>a&&(this.yAxisWidth=a)}},{key:"setGridCoordsForAxisCharts",value:function(t){var e=this.w,i=e.globals,s=this.getyAxisLabelsCoords(),a=this.getxAxisLabelsCoords(),n=this.getyAxisTitleCoords(),r=this.getxAxisTitleCoords();e.globals.yLabelsCoords=[],e.globals.yTitleCoords=[],e.config.yaxis.map(function(t,i){e.globals.yLabelsCoords.push({width:s[i].width,index:i}),e.globals.yTitleCoords.push({width:n[i].width,index:i})}),this.conditionalChecksForAxisCoords(a,r),i.translateXAxisY=e.globals.rotateXLabels?this.xAxisHeight/8:-4,i.translateXAxisX=e.globals.rotateXLabels&&e.globals.isXNumeric&&e.config.xaxis.labels.rotate<=-45?-this.xAxisWidth/4:0,e.globals.isBarHorizontal&&(i.rotateXLabels=!1,i.translateXAxisY=parseInt(e.config.xaxis.labels.style.fontSize)/1.5*-1),i.translateXAxisY=i.translateXAxisY+e.config.xaxis.labels.offsetY,i.translateXAxisX=i.translateXAxisX+e.config.xaxis.labels.offsetX;var o=this.yAxisWidth,l=this.xAxisHeight;i.xAxisLabelsHeight=this.xAxisHeight,i.xAxisHeight=this.xAxisHeight;var h=10;switch(e.config.grid.show&&"radar"!==e.config.chart.type||(o=0,l=35),this.isSparkline&&(t={height:0,width:0},l=0,o=0,h=0),this.additionalPaddingXLabels(a),e.config.legend.position){case"bottom":i.translateY=h,i.translateX=o,i.gridHeight=i.svgHeight-t.height-l-(this.isSparkline?0:e.globals.rotateXLabels?10:15),i.gridWidth=i.svgWidth-o;break;case"top":i.translateY=t.height+h,i.translateX=o,i.gridHeight=i.svgHeight-t.height-l-(this.isSparkline?0:e.globals.rotateXLabels?10:15),i.gridWidth=i.svgWidth-o;break;case"left":i.translateY=h,i.translateX=t.width+o,i.gridHeight=i.svgHeight-l-12,i.gridWidth=i.svgWidth-t.width-o;break;case"right":i.translateY=h,i.translateX=o,i.gridHeight=i.svgHeight-l-12,i.gridWidth=i.svgWidth-t.width-o-5;break;default:throw new Error("Legend position not supported")}this.setGridXPosForDualYAxis(n,s),new W(this.ctx).setYAxisXPosition(s,n)}},{key:"setGridCoordsForNonAxisCharts",value:function(t){var e=this.w,i=e.globals,s=0;e.config.legend.show&&!e.config.legend.floating&&(s=20);var a=10,n=0;if("pie"===e.config.chart.type||"donut"===e.config.chart.type?(a+=e.config.plotOptions.pie.offsetY,n+=e.config.plotOptions.pie.offsetX):"radialBar"===e.config.chart.type&&(a+=e.config.plotOptions.radialBar.offsetY,n+=e.config.plotOptions.radialBar.offsetX),!e.config.legend.show)return i.gridHeight=i.svgHeight-35,i.gridWidth=i.gridHeight,i.translateY=a-10,void(i.translateX=n+(i.svgWidth-i.gridWidth)/2);switch(e.config.legend.position){case"bottom":i.gridHeight=i.svgHeight-t.height-35,i.gridWidth=i.gridHeight,i.translateY=a-20,i.translateX=n+(i.svgWidth-i.gridWidth)/2;break;case"top":i.gridHeight=i.svgHeight-t.height-35,i.gridWidth=i.gridHeight,i.translateY=t.height+a,i.translateX=n+(i.svgWidth-i.gridWidth)/2;break;case"left":i.gridWidth=i.svgWidth-t.width-s,i.gridHeight=i.gridWidth,i.translateY=a,i.translateX=n+t.width+s;break;case"right":i.gridWidth=i.svgWidth-t.width-s-5,i.gridHeight=i.gridWidth,i.translateY=a,i.translateX=n+10;break;default:throw new Error("Legend position not supported")}}},{key:"setGridXPosForDualYAxis",value:function(t,e){var i=this.w;i.config.yaxis.map(function(s,a){-1===i.globals.ignoreYAxisIndexes.indexOf(a)&&!i.config.yaxis[a].floating&&i.config.yaxis[a].show&&s.opposite&&(i.globals.translateX=i.globals.translateX-(e[a].width+t[a].width)-parseInt(i.config.yaxis[a].labels.style.fontSize)/1.2-12)})}},{key:"additionalPaddingXLabels",value:function(t){var e=this,i=this.w;if("category"===i.config.xaxis.type&&i.globals.isBarHorizontal||"numeric"===i.config.xaxis.type){var s="line"===i.config.chart.type||"area"===i.config.chart.type;i.config.yaxis.forEach(function(a,n){var r;(!a.show||a.floating||-1!==i.globals.collapsedSeriesIndices.indexOf(n)||s||a.opposite&&i.globals.isBarHorizontal)&&((s&&i.globals.isMultipleYAxis&&-1!==i.globals.collapsedSeriesIndices.indexOf(n)||i.globals.isBarHorizontal&&a.opposite)&&(r=t,i.config.grid.padding.left<r.width&&(e.xPadLeft=r.width/2+1)),(!i.globals.isBarHorizontal&&a.opposite&&-1!==i.globals.collapsedSeriesIndices.indexOf(n)||s&&!i.globals.isMultipleYAxis)&&function(t){i.config.grid.padding.right<t.width&&(e.xPadRight=t.width/2+1)}(t))})}}},{key:"titleSubtitleOffset",value:function(){var t=this.w,e=t.globals,i=this.isSparkline||!t.globals.axisCharts?0:10;void 0!==t.config.title.text?i+=t.config.title.margin:i+=this.isSparkline||!t.globals.axisCharts?0:5,void 0!==t.config.subtitle.text?i+=t.config.subtitle.margin:i+=this.isSparkline||!t.globals.axisCharts?0:5,t.config.legend.show&&"bottom"===t.config.legend.position&&!t.config.legend.floating&&t.config.series.length>1&&(i+=10);var s=this.getTitleSubtitleCoords("title"),a=this.getTitleSubtitleCoords("subtitle");e.gridHeight=e.gridHeight-s.height-a.height-i,e.translateY=e.translateY+s.height+a.height+i}},{key:"getTotalYAxisWidth",value:function(){var t=this.w,e=0,i=10,s=function(e){return t.globals.ignoreYAxisIndexes.indexOf(e)>-1};return t.globals.yLabelsCoords.map(function(a,n){var r=t.config.yaxis[n].floating;a.width>0&&!r?(e=e+a.width+i,s(n)&&(e=e-a.width-i)):e+=r||!t.config.yaxis[n].show?0:5}),t.globals.yTitleCoords.map(function(a,n){var r=t.config.yaxis[n].floating;i=parseInt(t.config.yaxis[n].title.style.fontSize),a.width>0&&!r?(e=e+a.width+i,s(n)&&(e=e-a.width-i)):e+=r||!t.config.yaxis[n].show?0:5}),e}},{key:"getxAxisTimeScaleLabelsCoords",value:function(){var t,e=this.w,i=e.globals.timelineLabels.slice();e.globals.isBarHorizontal&&"datetime"===e.config.xaxis.type&&(i=e.globals.invertedTimelineLabels.slice());var s=i.map(function(t){return t.value}),a=s.reduce(function(t,e){return void 0===t?(console.error("You have possibly supplied invalid Date format. Please supply a valid JavaScript Date"),0):t.length>e.length?t:e},0);return 1.05*(t=new f(this.ctx).getTextRects(a,e.config.xaxis.labels.style.fontSize)).width*s.length>e.globals.gridWidth&&0!==e.config.xaxis.labels.rotate&&(e.globals.overlappingXLabels=!0),t}},{key:"getxAxisLabelsCoords",value:function(){var t,e=this.w,i=e.globals.labels.slice();if(e.globals.timelineLabels.length>0){var s=this.getxAxisTimeScaleLabelsCoords();t={width:s.width,height:s.height}}else{var a="left"!==e.config.legend.position||"right"!==e.config.legend.position||e.config.legend.floating?0:this.lgRect.width,n=e.globals.xLabelFormatter,r=i.reduce(function(t,e){return t.length>e.length?t:e},0);e.globals.isBarHorizontal&&(r=e.globals.yAxisScale[0].result.reduce(function(t,e){return t.length>e.length?t:e},0)),r=new N(this.ctx).xLabelFormat(n,r);var o=new f(this.ctx),l=o.getTextRects(r,e.config.xaxis.labels.style.fontSize);(t={width:l.width,height:l.height}).width*i.length>e.globals.svgWidth-a-this.yAxisWidth&&0!==e.config.xaxis.labels.rotate?e.globals.isBarHorizontal||(e.globals.rotateXLabels=!0,l=o.getTextRects(r,e.config.xaxis.labels.style.fontSize,e.config.xaxis.labels.style.fontFamily,"rotate(".concat(e.config.xaxis.labels.rotate," 0 0)"),!1),t.height=l.height/1.66):e.globals.rotateXLabels=!1}return e.config.xaxis.labels.show||(t={width:0,height:0}),{width:t.width,height:t.height}}},{key:"getyAxisLabelsCoords",value:function(){var t=this,e=this.w,i=[],s=10;return e.config.yaxis.map(function(a,n){if(a.show&&a.labels.show&&e.globals.yAxisScale[n].result.length){var r=e.globals.yLabelFormatters[n],o=r(e.globals.yAxisScale[n].niceMax,-1);if(void 0!==o&&0!==o.length||(o=e.globals.yAxisScale[n].niceMax),e.globals.isBarHorizontal)s=0,o=r(o=e.globals.labels.slice().reduce(function(t,e){return t.length>e.length?t:e},0),-1);var l=new f(t.ctx).getTextRects(o,a.labels.style.fontSize);i.push({width:l.width+s,height:l.height})}else i.push({width:0,height:0})}),i}},{key:"getxAxisTitleCoords",value:function(){var t=this.w,e=0,i=0;if(void 0!==t.config.xaxis.title.text){var s=new f(this.ctx).getTextRects(t.config.xaxis.title.text,t.config.xaxis.title.style.fontSize);e=s.width,i=s.height}return{width:e,height:i}}},{key:"getyAxisTitleCoords",value:function(){var t=this,e=this.w,i=[];return e.config.yaxis.map(function(e,s){if(e.show&&void 0!==e.title.text){var a=new f(t.ctx).getTextRects(e.title.text,e.title.style.fontSize,e.title.style.fontFamily,"rotate(-90 0 0)",!1);i.push({width:a.width,height:a.height})}else i.push({width:0,height:0})}),i}},{key:"getTitleSubtitleCoords",value:function(t){var e=this.w,i=0,s=0,a="title"===t?e.config.title.floating:e.config.subtitle.floating,n=e.globals.dom.baseEl.querySelector(".apexcharts-".concat(t,"-text"));if(null!==n&&!a){var r=n.getBoundingClientRect();i=r.width,s=e.globals.axisCharts?r.height+5:r.height}return{width:i,height:s}}},{key:"getLegendsRect",value:function(){var t=this.w,e=t.globals.dom.baseEl.querySelector(".apexcharts-legend"),i=Object.assign({},d.getBoundingClientRect(e));return null!==e&&!t.config.legend.floating&&t.config.legend.show?this.lgRect={x:i.x,y:i.y,height:i.height,width:0===i.height?0:i.width}:this.lgRect={x:0,y:0,height:0,width:0},this.lgRect}}]),t}(),j=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.timeScaleArray=[]}return s(t,[{key:"calculateTimeScaleTicks",value:function(t,e){var i=this,s=this.w;if(s.globals.allSeriesCollapsed)return s.globals.labels=[],s.globals.timelineLabels=[],[];var a=new m(this.ctx),r=(e-t)/864e5;this.determineInterval(r),s.globals.disableZoomIn=!1,s.globals.disableZoomOut=!1,r<.005?s.globals.disableZoomIn=!0:r>5e4&&(s.globals.disableZoomOut=!0);var o=a.getTimeUnitsfromTimestamp(t,e),l=s.globals.gridWidth/r,h=l/24,c=h/60,d=Math.floor(24*r),u=Math.floor(24*r*60),g=Math.floor(r),f=Math.floor(r/30),p=Math.floor(r/365),x={minMinute:o.minMinute,minHour:o.minHour,minDate:o.minDate,minMonth:o.minMonth,minYear:o.minYear},b={firstVal:x,currentMinute:x.minMinute,currentHour:x.minHour,currentMonthDate:x.minDate,currentDate:x.minDate,currentMonth:x.minMonth,currentYear:x.minYear,daysWidthOnXAxis:l,hoursWidthOnXAxis:h,minutesWidthOnXAxis:c,numberOfMinutes:u,numberOfHours:d,numberOfDays:g,numberOfMonths:f,numberOfYears:p};switch(this.tickInterval){case"years":this.generateYearScale(b);break;case"months":case"half_year":this.generateMonthScale(b);break;case"months_days":case"months_fortnight":case"days":case"week_days":this.generateDayScale(b);break;case"hours":this.generateHourScale(b);break;case"minutes":this.generateMinuteScale(b)}var v=this.timeScaleArray.map(function(t){var e={position:t.position,unit:t.unit,year:t.year,day:t.day?t.day:1,hour:t.hour?t.hour:0,month:t.month+1};return"month"===t.unit?n({},e,{value:t.value+1}):"day"===t.unit||"hour"===t.unit?n({},e,{value:t.value}):"minute"===t.unit?n({},e,{value:t.value,minute:t.value}):t});return v.filter(function(t){var e=1,a=Math.ceil(s.globals.gridWidth/120),n=t.value;void 0!==s.config.xaxis.tickAmount&&(a=s.config.xaxis.tickAmount),v.length>a&&(e=Math.floor(v.length/a));var r=!1,o=!1;switch(i.tickInterval){case"half_year":e=7,"year"===t.unit&&(r=!0);break;case"months":e=1,"year"===t.unit&&(r=!0);break;case"months_fortnight":e=15,"year"!==t.unit&&"month"!==t.unit||(r=!0),30===n&&(o=!0);break;case"months_days":e=10,"month"===t.unit&&(r=!0),30===n&&(o=!0);break;case"week_days":e=8,"month"===t.unit&&(r=!0);break;case"days":e=1,"month"===t.unit&&(r=!0);break;case"hours":"day"===t.unit&&(r=!0);break;case"minutes":n%5!=0&&(o=!0)}if("minutes"===i.tickInterval||"hours"===i.tickInterval){if(!o)return!0}else if((n%e==0||r)&&!o)return!0})}},{key:"recalcDimensionsBasedOnFormat",value:function(t,e){var i=this.w,s=this.formatDates(t),a=this.removeOverlappingTS(s);e?i.globals.invertedTimelineLabels=a.slice():i.globals.timelineLabels=a.slice(),new _(this.ctx).plotCoords()}},{key:"determineInterval",value:function(t){switch(!0){case t>1825:this.tickInterval="years";break;case t>800&&t<=1825:this.tickInterval="half_year";break;case t>180&&t<=800:this.tickInterval="months";break;case t>90&&t<=180:this.tickInterval="months_fortnight";break;case t>60&&t<=90:this.tickInterval="months_days";break;case t>30&&t<=60:this.tickInterval="week_days";break;case t>2&&t<=30:this.tickInterval="days";break;case t>.1&&t<=2:this.tickInterval="hours";break;case t<.1:this.tickInterval="minutes";break;default:this.tickInterval="days"}}},{key:"generateYearScale",value:function(t){var e=t.firstVal,i=t.currentMonth,s=t.currentYear,a=t.daysWidthOnXAxis,n=t.numberOfYears,r=e.minYear,o=0,l=new m(this.ctx);if(e.minDate>1&&e.minMonth>0){var h=l.determineRemainingDaysOfYear(e.minYear,e.minMonth,e.minDate);o=(l.determineDaysOfYear(e.minYear)-h+1)*a,r=e.minYear+1,this.timeScaleArray.push({position:o,value:r,unit:"year",year:r,month:d.monthMod(i+1)})}else 1===e.minDate&&0===e.minMonth&&this.timeScaleArray.push({position:o,value:r,unit:"year",year:s,month:d.monthMod(i+1)});for(var c=r,u=o,g=0;g<n;g++)c++,u=l.determineDaysOfYear(c-1)*a+u,this.timeScaleArray.push({position:u,value:c,unit:"year",year:c,month:1})}},{key:"generateMonthScale",value:function(t){var e=t.firstVal,i=t.currentMonthDate,s=t.currentMonth,a=t.currentYear,n=t.daysWidthOnXAxis,r=t.numberOfMonths,o=s,l=0,h=new m(this.ctx),c="month",u=0;if(e.minDate>1){l=(h.determineDaysOfMonths(s+1,e.minYear)-i+1)*n,o=d.monthMod(s+1);var g=a+u,f=d.monthMod(o),p=o;0===o&&(c="year",p=g,f=1,g+=u+=1),this.timeScaleArray.push({position:l,value:p,unit:c,year:g,month:f})}else this.timeScaleArray.push({position:l,value:o,unit:c,year:a,month:d.monthMod(s)});for(var x=o+1,b=l,v=0,y=1;v<r;v++,y++){0===(x=d.monthMod(x))?(c="year",u+=1):c="month";var w=a+Math.floor(x/12)+u;b=h.determineDaysOfMonths(x,w)*n+b;var k=0===x?w:x;this.timeScaleArray.push({position:b,value:k,unit:c,year:w,month:0===x?1:x}),x++}}},{key:"generateDayScale",value:function(t){var e=t.firstVal,i=t.currentMonth,s=t.currentYear,a=t.hoursWidthOnXAxis,n=t.numberOfDays,r=new m(this.ctx),o="day",l=(24-e.minHour)*a,h=e.minDate+1,c=h,u=function(t,e,i){return t>r.determineDaysOfMonths(e+1,i)?(g=1,o="month",c=e+=1,e):e},g=h,f=u(g,i,s);this.timeScaleArray.push({position:l,value:c,unit:o,year:s,month:d.monthMod(f),day:g});for(var p=l,x=0;x<n;x++){o="day",f=u(g+=1,f,s+Math.floor(f/12)+0);var b=s+Math.floor(f/12)+0;p=24*a+p;var v=1===g?d.monthMod(f):g;this.timeScaleArray.push({position:p,value:v,unit:o,year:b,month:d.monthMod(f),day:v})}}},{key:"generateHourScale",value:function(t){var e=t.firstVal,i=t.currentDate,s=t.currentMonth,a=t.currentYear,n=t.minutesWidthOnXAxis,r=t.numberOfHours,o=new m(this.ctx),l="hour",h=function(t,e){return t>o.determineDaysOfMonths(e+1,a)&&(x=1,e+=1),{month:e,date:x}},c=function(t,e){return t>o.determineDaysOfMonths(e+1,a)?e+=1:e},u=60-e.minMinute,g=u*n,f=e.minHour+1,p=f+1;60===u&&(g=0,p=(f=e.minHour)+1);var x=i,b=c(x,s);this.timeScaleArray.push({position:g,value:f,unit:l,day:x,hour:p,year:a,month:d.monthMod(b)});for(var v=g,y=0;y<r;y++){if(l="hour",p>=24)p=0,l="day",b=h(x+=1,b).month,b=c(x,b);var w=a+Math.floor(b/12)+0;v=0===p&&0===y?u*n:60*n+v;var k=0===p?x:p;this.timeScaleArray.push({position:v,value:k,unit:l,hour:p,day:x,year:w,month:d.monthMod(b)}),p++}}},{key:"generateMinuteScale",value:function(t){var e=t.firstVal,i=t.currentMinute,s=t.currentHour,a=t.currentDate,n=t.currentMonth,r=t.currentYear,o=t.minutesWidthOnXAxis,l=t.numberOfMinutes,h=o-(i-e.minMinute),c=e.minMinute+1,u=c+1,g=a,f=n,p=r,x=s;this.timeScaleArray.push({position:h,value:c,unit:"minute",day:g,hour:x,minute:u,year:p,month:d.monthMod(f)});for(var b=h,m=0;m<l;m++){u>=60&&(u=0,24===(x+=1)&&(x=0));var v=r+Math.floor(f/12)+0;b=o+b;var y=u;this.timeScaleArray.push({position:b,value:y,unit:"minute",hour:x,minute:u,day:g,year:v,month:d.monthMod(f)}),u++}}},{key:"createRawDateString",value:function(t,e){var i=t.year;return i+="-"+("0"+t.month.toString()).slice(-2),"day"===t.unit?i+="day"===t.unit?"-"+("0"+e).slice(-2):"-01":i+="-"+("0"+(t.day?t.day:"1")).slice(-2),"hour"===t.unit?i+="hour"===t.unit?"T"+("0"+e).slice(-2):"T00":i+="T"+("0"+(t.hour?t.hour:"0")).slice(-2),i+="minute"===t.unit?":"+("0"+e).slice(-2)+":00.000Z":":00:00.000Z"}},{key:"formatDates",value:function(t){var e=this,i=this.w;return t.map(function(t){var s=t.value.toString(),a=new m(e.ctx),n=e.createRawDateString(t,s),r=new Date(Date.parse(n));if(void 0===i.config.xaxis.labels.format){var o="dd MMM",l=i.config.xaxis.labels.datetimeFormatter;"year"===t.unit&&(o=l.year),"month"===t.unit&&(o=l.month),"day"===t.unit&&(o=l.day),"hour"===t.unit&&(o=l.hour),"minute"===t.unit&&(o=l.minute),s=a.formatDate(r,o,!0,!1)}else s=a.formatDate(r,i.config.xaxis.labels.format);return{dateString:n,position:t.position,value:s,unit:t.unit,year:t.year,month:t.month}})}},{key:"removeOverlappingTS",value:function(t){var e=this,i=new f(this.ctx),s=0,a=t.map(function(a,n){if(n>0&&e.w.config.xaxis.labels.hideOverlappingLabels){var r=i.getTextRects(t[s].value).width,o=t[s].position;return a.position>o+r+10?(s=n,a):null}return a});return a=a.filter(function(t){return null!==t})}}]),t}(),U=function(){function t(i,s){e(this,t),this.ctx=s,this.w=s.w,this.el=i,this.coreUtils=new y(this.ctx),this.twoDSeries=[],this.threeDSeries=[],this.twoDSeriesX=[]}return s(t,[{key:"setupElements",value:function(){var t=this.w.globals,e=this.w.config,i=e.chart.type;t.axisCharts=["line","area","bar","rangeBar","candlestick","radar","scatter","bubble","heatmap"].indexOf(i)>-1,t.xyCharts=["line","area","bar","rangeBar","candlestick","scatter","bubble"].indexOf(i)>-1,t.isBarHorizontal=("bar"===e.chart.type||"rangeBar"===e.chart.type)&&e.plotOptions.bar.horizontal,t.chartClass=".apexcharts"+t.cuid,t.dom.baseEl=this.el,t.dom.elWrap=document.createElement("div"),f.setAttrs(t.dom.elWrap,{id:t.chartClass.substring(1),class:"apexcharts-canvas "+t.chartClass.substring(1)}),this.el.appendChild(t.dom.elWrap),t.dom.Paper=new window.SVG.Doc(t.dom.elWrap),t.dom.Paper.attr({class:"apexcharts-svg","xmlns:data":"ApexChartsNS",transform:"translate(".concat(e.chart.offsetX,", ").concat(e.chart.offsetY,")")}),t.dom.Paper.node.style.background=e.chart.background,this.setSVGDimensions(),t.dom.elGraphical=t.dom.Paper.group().attr({class:"apexcharts-inner apexcharts-graphical"}),t.dom.elDefs=t.dom.Paper.defs(),t.dom.elLegendWrap=document.createElement("div"),t.dom.elLegendWrap.classList.add("apexcharts-legend"),t.dom.elWrap.appendChild(t.dom.elLegendWrap),t.dom.Paper.add(t.dom.elGraphical),t.dom.elGraphical.add(t.dom.elDefs)}},{key:"plotChartType",value:function(t,e){var i=this.w,s=i.config,a=i.globals,n={series:[],i:[]},r={series:[],i:[]},o={series:[],i:[]},l={series:[],i:[]},h={series:[],i:[]};a.series.map(function(e,s){void 0!==t[s].type?("column"===t[s].type||"bar"===t[s].type?(i.config.plotOptions.bar.horizontal=!1,l.series.push(e),l.i.push(s)):"area"===t[s].type?(r.series.push(e),r.i.push(s)):"line"===t[s].type?(n.series.push(e),n.i.push(s)):"scatter"===t[s].type?(o.series.push(e),o.i.push(s)):"bubble"===t[s].type||("candlestick"===t[s].type?(h.series.push(e),h.i.push(s)):console.warn("You have specified an unrecognized chart type. Available types for this propery are line/area/column/bar/scatter/bubble")),a.comboCharts=!0):(n.series.push(e),n.i.push(s))});var c=new D(this.ctx,e),d=new M(this.ctx,e),u=new I(this.ctx),g=new F(this.ctx),f=new R(this.ctx,e),p=new Y(this.ctx),x=[];if(a.comboCharts){if(r.series.length>0&&x.push(c.draw(r.series,"area",r.i)),l.series.length>0)if(i.config.chart.stacked){var b=new E(this.ctx,e);x.push(b.draw(l.series,l.i))}else{var m=new P(this.ctx,e);x.push(m.draw(l.series,l.i))}if(n.series.length>0&&x.push(c.draw(n.series,"line",n.i)),h.series.length>0&&x.push(d.draw(h.series,h.i)),o.series.length>0){var v=new D(this.ctx,e,!0);x.push(v.draw(o.series,"scatter",o.i))}}else switch(s.chart.type){case"line":x=c.draw(a.series,"line");break;case"area":x=c.draw(a.series,"area");break;case"bar":if(s.chart.stacked)x=new E(this.ctx,e).draw(a.series);else x=new P(this.ctx,e).draw(a.series);break;case"candlestick":x=new M(this.ctx,e).draw(a.series);break;case"rangeBar":x=f.draw(a.series);break;case"heatmap":x=new X(this.ctx,e).draw(a.series);break;case"pie":case"donut":x=u.draw(a.series);break;case"radialBar":x=g.draw(a.series);break;case"radar":x=p.draw(a.series);break;default:x=c.draw(a.series)}return x}},{key:"setSVGDimensions",value:function(){var t=this.w.globals,e=this.w.config;t.svgWidth=e.chart.width,t.svgHeight=e.chart.height;var i=d.getDimensions(this.el),s=e.chart.width.toString().split(/[0-9]+/g).pop();if("%"===s?d.isNumber(i[0])&&(0===i[0].width&&(i=d.getDimensions(this.el.parentNode)),t.svgWidth=i[0]*parseInt(e.chart.width)/100):"px"!==s&&""!==s||(t.svgWidth=parseInt(e.chart.width)),"auto"!==t.svgHeight&&""!==t.svgHeight)if("%"===e.chart.height.toString().split(/[0-9]+/g).pop()){var a=d.getDimensions(this.el.parentNode);t.svgHeight=a[1]*parseInt(e.chart.height)/100}else t.svgHeight=parseInt(e.chart.height);else t.axisCharts?t.svgHeight=t.svgWidth/1.61:t.svgHeight=t.svgWidth;f.setAttrs(t.dom.Paper.node,{width:t.svgWidth,height:t.svgHeight});var n=e.chart.sparkline.enabled?0:t.axisCharts?e.chart.parentHeightOffset:0;t.dom.Paper.node.parentNode.parentNode.style.minHeight=t.svgHeight+n+"px",t.dom.elWrap.style.width=t.svgWidth+"px",t.dom.elWrap.style.height=t.svgHeight+"px"}},{key:"shiftGraphPosition",value:function(){var t=this.w.globals,e=t.translateY,i={transform:"translate("+t.translateX+", "+e+")"};f.setAttrs(t.dom.elGraphical.node,i)}},{key:"coreCalculations",value:function(){new V(this.ctx).init()}},{key:"resetGlobals",value:function(){var t=this,e=this.w.globals;e.series=[],e.seriesCandleO=[],e.seriesCandleH=[],e.seriesCandleL=[],e.seriesCandleC=[],e.seriesRangeStart=[],e.seriesRangeEnd=[],e.seriesPercent=[],e.seriesX=[],e.seriesZ=[],e.seriesNames=[],e.seriesTotals=[],e.stackedSeriesTotals=[],e.labels=[],e.timelineLabels=[],e.noLabelsProvided=!1,e.timescaleTicks=[],e.resizeTimer=null,e.selectionResizeTimer=null,e.seriesXvalues=t.w.config.series.map(function(t){return[]}),e.seriesYvalues=t.w.config.series.map(function(t){return[]}),e.delayedElements=[],e.pointsArray=[],e.dataLabelsRects=[],e.isXNumeric=!1,e.isDataXYZ=!1,e.maxY=-Number.MAX_VALUE,e.minY=Number.MIN_VALUE,e.minYArr=[],e.maxYArr=[],e.maxX=-Number.MAX_VALUE,e.minX=Number.MAX_VALUE,e.initialmaxX=-Number.MAX_VALUE,e.initialminX=Number.MAX_VALUE,e.maxDate=0,e.minDate=Number.MAX_VALUE,e.minZ=Number.MAX_VALUE,e.maxZ=-Number.MAX_VALUE,e.minXDiff=Number.MAX_VALUE,e.yAxisScale=[],e.xAxisScale=null,e.xAxisTicksPositions=[],e.yLabelsCoords=[],e.yTitleCoords=[],e.xRange=0,e.yRange=[],e.zRange=0,e.dataPoints=0}},{key:"isMultipleY",value:function(){if(this.w.config.yaxis.constructor===Array&&this.w.config.yaxis.length>1)return this.w.config.chart.stacked=!1,this.w.globals.isMultipleYAxis=!0,!0}},{key:"excludeCollapsedSeriesInYAxis",value:function(){var t=this,e=this.w;e.globals.ignoreYAxisIndexes=e.globals.collapsedSeries.map(function(e,i){if(t.w.globals.isMultipleYAxis)return e.index})}},{key:"isMultiFormat",value:function(){return this.isFormatXY()||this.isFormat2DArray()}},{key:"isFormatXY",value:function(){var t=this.w.config.series.slice(),e=new G(this.ctx);if(this.activeSeriesIndex=e.getActiveConfigSeriesIndex(),void 0!==t[this.activeSeriesIndex].data&&t[this.activeSeriesIndex].data.length>0&&null!==t[this.activeSeriesIndex].data[0]&&void 0!==t[this.activeSeriesIndex].data[0].x&&null!==t[this.activeSeriesIndex].data[0])return!0}},{key:"isFormat2DArray",value:function(){var t=this.w.config.series.slice(),e=new G(this.ctx);if(this.activeSeriesIndex=e.getActiveConfigSeriesIndex(),void 0!==t[this.activeSeriesIndex].data&&t[this.activeSeriesIndex].data.length>0&&void 0!==t[this.activeSeriesIndex].data[0]&&null!==t[this.activeSeriesIndex].data[0]&&t[this.activeSeriesIndex].data[0].constructor===Array)return!0}},{key:"handleFormat2DArray",value:function(t,e){for(var i=this.w.config,s=this.w.globals,a=0;a<t[e].data.length;a++)if(void 0!==t[e].data[a][1]&&(Array.isArray(t[e].data[a][1])&&4===t[e].data[a][1].length?this.twoDSeries.push(d.parseNumber(t[e].data[a][1][3])):this.twoDSeries.push(d.parseNumber(t[e].data[a][1])),s.dataFormatXNumeric=!0),"datetime"===i.xaxis.type){var n=new Date(t[e].data[a][0]);n=new Date(n).getTime(),this.twoDSeriesX.push(n)}else this.twoDSeriesX.push(t[e].data[a][0]);for(var r=0;r<t[e].data.length;r++)void 0!==t[e].data[r][2]&&(this.threeDSeries.push(t[e].data[r][2]),s.isDataXYZ=!0)}},{key:"handleFormatXY",value:function(t,e){var i=this.w.config,s=this.w.globals,a=new m(this.ctx),n=e;s.collapsedSeriesIndices.indexOf(e)>-1&&(n=this.activeSeriesIndex);for(var r=0;r<t[e].data.length;r++)void 0!==t[e].data[r].y&&(Array.isArray(t[e].data[r].y)?this.twoDSeries.push(d.parseNumber(t[e].data[r].y[t[e].data[r].y.length-1])):this.twoDSeries.push(d.parseNumber(t[e].data[r].y)));for(var o=0;o<t[n].data.length;o++){var l="string"==typeof t[n].data[o].x,h=!!a.isValidDate(t[n].data[o].x.toString());l||h?l?"datetime"!==i.xaxis.type||s.isRangeData?(this.fallbackToCategory=!0,this.twoDSeriesX.push(t[n].data[o].x)):this.twoDSeriesX.push(a.parseDate(t[n].data[o].x)):"datetime"===i.xaxis.type?this.twoDSeriesX.push(a.parseDate(t[n].data[o].x.toString())):(s.dataFormatXNumeric=!0,this.twoDSeriesX.push(parseFloat(t[n].data[o].x))):this.twoDSeriesX.push(t[n].data[o].x)}if(t[e].data[0]&&void 0!==t[e].data[0].z){for(var c=0;c<t[e].data.length;c++)this.threeDSeries.push(t[e].data[c].z);s.isDataXYZ=!0}}},{key:"handleRangeData",value:function(t,e){var i=this.w.globals,s={};return this.isFormat2DArray()?s=this.handleRangeDataFormat("array",t,e):this.isFormatXY()&&(s=this.handleRangeDataFormat("xy",t,e)),i.seriesRangeStart.push(s.start),i.seriesRangeEnd.push(s.end),s}},{key:"handleCandleStickData",value:function(t,e){var i=this.w.globals,s={};return this.isFormat2DArray()?s=this.handleCandleStickDataFormat("array",t,e):this.isFormatXY()&&(s=this.handleCandleStickDataFormat("xy",t,e)),i.seriesCandleO.push(s.o),i.seriesCandleH.push(s.h),i.seriesCandleL.push(s.l),i.seriesCandleC.push(s.c),s}},{key:"handleRangeDataFormat",value:function(t,e,i){var s=[],a=[],n="Please provide [Start, End] values in valid format. Read more https://apexcharts.com/docs/series/#rangecharts",r=new G(this.ctx).getActiveConfigSeriesIndex();if("array"===t){if(2!==e[r].data[0][1].length)throw new Error(n);for(var o=0;o<e[i].data.length;o++)s.push(e[i].data[o][1][0]),a.push(e[i].data[o][1][1])}else if("xy"===t){if(2!==e[r].data[0].y.length)throw new Error(n);for(var l=0;l<e[i].data.length;l++)s.push(e[i].data[l].y[0]),a.push(e[i].data[l].y[1])}return{start:s,end:a}}},{key:"handleCandleStickDataFormat",value:function(t,e,i){var s=[],a=[],n=[],r=[],o="Please provide [Open, High, Low and Close] values in valid format. Read more https://apexcharts.com/docs/series/#candlestick";if("array"===t){if(4!==e[i].data[0][1].length)throw new Error(o);for(var l=0;l<e[i].data.length;l++)s.push(e[i].data[l][1][0]),a.push(e[i].data[l][1][1]),n.push(e[i].data[l][1][2]),r.push(e[i].data[l][1][3])}else if("xy"===t){if(4!==e[i].data[0].y.length)throw new Error(o);for(var h=0;h<e[i].data.length;h++)s.push(e[i].data[h].y[0]),a.push(e[i].data[h].y[1]),n.push(e[i].data[h].y[2]),r.push(e[i].data[h].y[3])}return{o:s,h:a,l:n,c:r}}},{key:"parseDataAxisCharts",value:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.ctx,i=this.w.config,s=this.w.globals,a=new m(e),n=0;n<t.length;n++){if(this.twoDSeries=[],this.twoDSeriesX=[],this.threeDSeries=[],void 0===t[n].data)return void console.error("It is a possibility that you may have not included 'data' property in series.");if("rangeBar"!==i.chart.type&&"rangeArea"!==i.chart.type&&"rangeBar"!==t[n].type&&"rangeArea"!==t[n].type||(s.isRangeData=!0,this.handleRangeData(t,n)),this.isMultiFormat())this.isFormat2DArray()?this.handleFormat2DArray(t,n):this.isFormatXY()&&this.handleFormatXY(t,n),"candlestick"!==i.chart.type&&"candlestick"!==t[n].type||this.handleCandleStickData(t,n),s.series.push(this.twoDSeries),s.labels.push(this.twoDSeriesX),s.seriesX.push(this.twoDSeriesX),this.fallbackToCategory||(s.isXNumeric=!0);else{if("datetime"===i.xaxis.type){s.isXNumeric=!0;for(var r=i.labels.length>0?i.labels.slice():i.xaxis.categories.slice(),o=0;o<r.length;o++)if("string"==typeof r[o]){if(!a.isValidDate(r[o]))throw new Error("You have provided invalid Date format. Please provide a valid JavaScript Date");this.twoDSeriesX.push(a.parseDate(r[o]))}s.seriesX.push(this.twoDSeriesX)}else if("numeric"===i.xaxis.type){s.isXNumeric=!0;var l=i.labels.length>0?i.labels.slice():i.xaxis.categories.slice();l.length>0&&(this.twoDSeriesX=l,s.seriesX.push(this.twoDSeriesX))}s.labels.push(this.twoDSeriesX);var h=t[n].data.map(function(t){return d.parseNumber(t)});s.series.push(h)}s.seriesZ.push(this.threeDSeries),void 0!==t[n].name?s.seriesNames.push(t[n].name):s.seriesNames.push("series-"+parseInt(n+1))}return this.w}},{key:"parseDataNonAxisCharts",value:function(t){var e=this.w.globals,i=this.w.config;e.series=t.slice(),e.seriesNames=i.labels.slice();for(var s=0;s<e.series.length;s++)void 0===e.seriesNames[s]&&e.seriesNames.push("series-"+(s+1));return this.w}},{key:"handleExternalLabelsData",value:function(t){var e=this.w.config,i=this.w.globals;if(e.xaxis.categories.length>0)i.labels=e.xaxis.categories;else if(e.labels.length>0)i.labels=e.labels.slice();else if(this.fallbackToCategory)i.labels=i.labels[0];else{var s=[];if(i.axisCharts){for(var a=0;a<i.series[i.maxValsInArrayIndex].length;a++)s.push(a+1);for(var n=0;n<t.length;n++)i.seriesX.push(s);i.isXNumeric=!0}if(0===s.length){s=[0,10];for(var r=0;r<t.length;r++)i.seriesX.push(s)}i.labels=s,i.noLabelsProvided=!0}}},{key:"parseData",value:function(t){var e=this.w,i=e.config,s=e.globals;if(this.excludeCollapsedSeriesInYAxis(),this.fallbackToCategory=!1,this.resetGlobals(),this.isMultipleY(),s.axisCharts?this.parseDataAxisCharts(t):this.parseDataNonAxisCharts(t),this.coreUtils.getLargestSeries(),"bar"===i.chart.type&&i.chart.stacked){var a=new G(this.ctx);s.series=a.setNullSeriesToZeroValues(s.series)}this.coreUtils.getSeriesTotals(),s.axisCharts&&this.coreUtils.getStackedSeriesTotals(),this.coreUtils.getPercentSeries(),s.dataFormatXNumeric||s.isXNumeric&&("numeric"!==i.xaxis.type||0!==i.labels.length||0!==i.xaxis.categories.length)||this.handleExternalLabelsData(t)}},{key:"xySettings",value:function(){var t=null,e=this.w;if(e.globals.axisCharts){if("back"===e.config.xaxis.crosshairs.position)new T(this.ctx).drawXCrosshairs();if("back"===e.config.yaxis[0].crosshairs.position)new T(this.ctx).drawYCrosshairs();if(t=this.coreUtils.getCalculatedRatios(),"datetime"===e.config.xaxis.type&&void 0===e.config.xaxis.labels.formatter){var i,s=new j(this.ctx);isFinite(e.globals.minX)&&isFinite(e.globals.maxX)&&!e.globals.isBarHorizontal?(i=s.calculateTimeScaleTicks(e.globals.minX,e.globals.maxX),s.recalcDimensionsBasedOnFormat(i,!1)):e.globals.isBarHorizontal&&(i=s.calculateTimeScaleTicks(e.globals.minY,e.globals.maxY),s.recalcDimensionsBasedOnFormat(i,!0))}}return t}},{key:"drawAxis",value:function(t,e){var i,s,a=this.w.globals,n=this.w.config,r=new H(this.ctx),o=new W(this.ctx);a.axisCharts&&"radar"!==t&&(a.isBarHorizontal?(s=o.drawYaxisInversed(0),i=r.drawXaxisInversed(0),a.dom.elGraphical.add(i),a.dom.elGraphical.add(s)):(i=r.drawXaxis(),a.dom.elGraphical.add(i),n.yaxis.map(function(t,e){-1===a.ignoreYAxisIndexes.indexOf(e)&&(s=o.drawYaxis(e),a.dom.Paper.add(s))})));n.yaxis.map(function(t,e){-1===a.ignoreYAxisIndexes.indexOf(e)&&o.yAxisTitleRotate(e,t.opposite)})}},{key:"setupBrushHandler",value:function(){var t=this,e=this.w;e.config.chart.brush.enabled&&("function"!=typeof e.config.chart.events.selection&&(e.config.chart.brush.targets||[e.config.chart.brush.target]).forEach(function(i){var s=ApexCharts.getChartByID(i);s.w.globals.brushSource=t.ctx;var a=function(){t.ctx._updateOptions({chart:{selection:{xaxis:{min:s.w.globals.minX,max:s.w.globals.maxX}}}},!1,!1)};"function"!=typeof s.w.config.chart.events.zoomed&&(s.w.config.chart.events.zoomed=function(){a()}),"function"!=typeof s.w.config.chart.events.scrolled&&(s.w.config.chart.events.scrolled=function(){a()}),e.config.chart.events.selection=function(t,i){var a=d.clone(e.config.yaxis);e.config.chart.brush.autoScaleYaxis&&(a=new B(s).autoScaleY(s,i));s._updateOptions({xaxis:{min:i.xaxis.min,max:i.xaxis.max},yaxis:a},!1,!1,!1)}}))}}]),t}();var q=setTimeout;function Z(){}function $(t){if(!(this instanceof $))throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],it(t,this)}function J(t,e){for(;3===t._state;)t=t._value;0!==t._state?(t._handled=!0,$._immediateFn(function(){var i=1===t._state?e.onFulfilled:e.onRejected;if(null!==i){var s;try{s=i(t._value)}catch(t){return void K(e.promise,t)}Q(e.promise,s)}else(1===t._state?Q:K)(e.promise,t._value)})):t._deferreds.push(e)}function Q(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var i=e.then;if(e instanceof $)return t._state=3,t._value=e,void tt(t);if("function"==typeof i)return void it((s=i,a=e,function(){s.apply(a,arguments)}),t)}t._state=1,t._value=e,tt(t)}catch(e){K(t,e)}var s,a}function K(t,e){t._state=2,t._value=e,tt(t)}function tt(t){2===t._state&&0===t._deferreds.length&&$._immediateFn(function(){t._handled||$._unhandledRejectionFn(t._value)});for(var e=0,i=t._deferreds.length;e<i;e++)J(t,t._deferreds[e]);t._deferreds=null}function et(t,e,i){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=i}function it(t,e){var i=!1;try{t(function(t){i||(i=!0,Q(e,t))},function(t){i||(i=!0,K(e,t))})}catch(t){if(i)return;i=!0,K(e,t)}}$.prototype.catch=function(t){return this.then(null,t)},$.prototype.then=function(t,e){var i=new this.constructor(Z);return J(this,new et(t,e,i)),i},$.prototype.finally=function(t){var e=this.constructor;return this.then(function(i){return e.resolve(t()).then(function(){return i})},function(i){return e.resolve(t()).then(function(){return e.reject(i)})})},$.all=function(t){return new $(function(e,i){if(!t||void 0===t.length)throw new TypeError("Promise.all accepts an array");var s=Array.prototype.slice.call(t);if(0===s.length)return e([]);var a=s.length;function n(t,r){try{if(r&&("object"==typeof r||"function"==typeof r)){var o=r.then;if("function"==typeof o)return void o.call(r,function(e){n(t,e)},i)}s[t]=r,0==--a&&e(s)}catch(t){i(t)}}for(var r=0;r<s.length;r++)n(r,s[r])})},$.resolve=function(t){return t&&"object"==typeof t&&t.constructor===$?t:new $(function(e){e(t)})},$.reject=function(t){return new $(function(e,i){i(t)})},$.race=function(t){return new $(function(e,i){for(var s=0,a=t.length;s<a;s++)t[s].then(e,i)})},$._immediateFn="function"==typeof setImmediate&&function(t){setImmediate(t)}||function(t){q(t,0)},$._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)};var st,at,nt=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w}return s(t,[{key:"getSvgString",value:function(){return this.w.globals.dom.Paper.svg()}},{key:"cleanup",value:function(){var t=this.w,e=t.globals.dom.baseEl.querySelector(".apexcharts-xcrosshairs"),i=t.globals.dom.baseEl.querySelector(".apexcharts-ycrosshairs");e&&e.setAttribute("x",-500),i&&(i.setAttribute("y1",-100),i.setAttribute("y2",-100))}},{key:"svgUrl",value:function(){this.cleanup();var t=this.getSvgString(),e=new Blob([t],{type:"image/svg+xml;charset=utf-8"});return URL.createObjectURL(e)}},{key:"dataURI",value:function(){var t=this;return new $(function(e){var i=t.w;t.cleanup();var s=document.createElement("canvas");s.width=i.globals.svgWidth,s.height=i.globals.svgHeight;var a="transparent"===i.config.chart.background?"#fff":i.config.chart.background,n=s.getContext("2d");n.fillStyle=a,n.fillRect(0,0,s.width,s.height);var r=window.URL||window.webkitURL||window,o=new Image;o.crossOrigin="anonymous";var l=t.getSvgString(),h="data:image/svg+xml,"+encodeURIComponent(l);o.onload=function(){n.drawImage(o,0,0),r.revokeObjectURL(h);var t=s.toDataURL("image/png");e(t)},o.src=h})}},{key:"exportToSVG",value:function(){this.triggerDownload(this.svgUrl(),".svg")}},{key:"exportToPng",value:function(){var t=this;this.dataURI().then(function(e){t.triggerDownload(e,".png")})}},{key:"triggerDownload",value:function(t,e){var i=document.createElement("a");i.href=t,i.download=this.w.globals.chartID+e,document.body.appendChild(i),i.click(),document.body.removeChild(i)}}]),t}(),rt=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w;var s=this.w;this.anim=new g(this.ctx),this.xaxisLabels=s.globals.labels.slice(),this.animX=s.config.grid.xaxis.lines.animate&&s.config.chart.animations.enabled,this.animY=s.config.grid.yaxis.lines.animate&&s.config.chart.animations.enabled,s.globals.timelineLabels.length>0&&(this.xaxisLabels=s.globals.timelineLabels.slice())}return s(t,[{key:"drawGridArea",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this.w,i=new f(this.ctx);null===t&&(t=i.group({class:"apexcharts-grid"}));var s=i.drawLine(e.globals.padHorizontal,1,e.globals.padHorizontal,e.globals.gridHeight,"transparent"),a=i.drawLine(e.globals.padHorizontal,e.globals.gridHeight,e.globals.gridWidth,e.globals.gridHeight,"transparent");return t.add(a),t.add(s),t}},{key:"drawGrid",value:function(){var t=this.w,e=new H(this.ctx),i=new W(this.ctx),s=this.w.globals,a=null;if(s.axisCharts){if(t.config.grid.show)a=this.renderGrid(),s.dom.elGraphical.add(a.el),this.drawGridArea(a.el);else{var n=this.drawGridArea();s.dom.elGraphical.add(n)}null!==a&&e.xAxisLabelCorrections(a.xAxisTickWidth),i.setYAxisTextAlignments()}}},{key:"createGridMask",value:function(){var t=this.w,e=t.globals,i=new f(this.ctx),s=Array.isArray(t.config.stroke.width)?0:t.config.stroke.width;if(Array.isArray(t.config.stroke.width)){var a=0;t.config.stroke.width.forEach(function(t){a=Math.max(a,t)}),s=a}e.dom.elGridRectMask=document.createElementNS(e.SVGNS,"clipPath"),e.dom.elGridRectMask.setAttribute("id","gridRectMask".concat(e.cuid)),e.dom.elGridRectMarkerMask=document.createElementNS(e.SVGNS,"clipPath"),e.dom.elGridRectMarkerMask.setAttribute("id","gridRectMarkerMask".concat(e.cuid)),e.dom.elGridRect=i.drawRect(-s/2,-s/2,e.gridWidth+s,e.gridHeight+s,0,"#fff"),new y(this).getLargestMarkerSize();var n=t.globals.markers.largestSize+t.config.markers.hover.sizeOffset+1;n<10&&(n=10),e.dom.elGridRectMarker=i.drawRect(2*-n,2*-n,e.gridWidth+4*n,e.gridHeight+4*n,0,"#fff"),e.dom.elGridRectMask.appendChild(e.dom.elGridRect.node),e.dom.elGridRectMarkerMask.appendChild(e.dom.elGridRectMarker.node);var r=e.dom.baseEl.querySelector("defs");r.appendChild(e.dom.elGridRectMask),r.appendChild(e.dom.elGridRectMarkerMask)}},{key:"renderGrid",value:function(){var t=this.w,e=new f(this.ctx),i=t.config.grid.strokeDashArray,s=e.group({class:"apexcharts-grid"}),a=e.group({class:"apexcharts-gridlines-horizontal"}),n=e.group({class:"apexcharts-gridlines-vertical"});s.add(a),s.add(n);for(var r,o=8,l=0;l<t.globals.series.length&&(void 0!==t.globals.yAxisScale[l]&&(o=t.globals.yAxisScale[l].result.length-1),!(o>2));l++);if(t.globals.isBarHorizontal){if(r=o,t.config.grid.xaxis.lines.show||t.config.xaxis.axisTicks.show)for(var h,c=t.globals.padHorizontal,d=t.globals.gridHeight,u=0;u<r+1&&(h=c=c+t.globals.gridWidth/r+.3,u!==r-1);u++){if(t.config.grid.xaxis.lines.show){var g=e.drawLine(c,0,h,d,t.config.grid.borderColor,i);g.node.classList.add("apexcharts-gridline"),n.add(g),this.animX&&this.animateLine(g,{x1:0,x2:0},{x1:c,x2:h})}new H(this.ctx).drawXaxisTicks(c,s)}if(t.config.grid.yaxis.lines.show)for(var p=0,x=0,b=t.globals.gridWidth,m=0;m<t.globals.dataPoints+1;m++){var v=e.drawLine(0,p,b,x,t.config.grid.borderColor,i);a.add(v),v.node.classList.add("apexcharts-gridline"),this.animY&&this.animateLine(v,{y1:p+20,y2:x+20},{y1:p,y2:x}),x=p+=t.globals.gridHeight/t.globals.dataPoints}}else{if(r=this.xaxisLabels.length,t.config.grid.xaxis.lines.show||t.config.xaxis.axisTicks.show){var y,w=t.globals.padHorizontal,k=t.globals.gridHeight;if(t.globals.timelineLabels.length>0)for(var A=0;A<r;A++){if(w=this.xaxisLabels[A].position,y=this.xaxisLabels[A].position,t.config.grid.xaxis.lines.show&&w>0&&w<t.globals.gridWidth){var S=e.drawLine(w,0,y,k,t.config.grid.borderColor,i);S.node.classList.add("apexcharts-gridline"),n.add(S),this.animX&&this.animateLine(S,{x1:0,x2:0},{x1:w,x2:y})}new H(this.ctx).drawXaxisTicks(w,s)}else for(var C=r,L=0;L<C;L++){var z=C;if(t.globals.isXNumeric&&"bar"!==t.config.chart.type&&(z-=1),y=w+=t.globals.gridWidth/z,L===z-1)break;if(t.config.grid.xaxis.lines.show){var P=e.drawLine(w,0,y,k,t.config.grid.borderColor,i);P.node.classList.add("apexcharts-gridline"),n.add(P),this.animX&&this.animateLine(P,{x1:0,x2:0},{x1:w,x2:y})}new H(this.ctx).drawXaxisTicks(w,s)}}if(t.config.grid.yaxis.lines.show)for(var E=0,M=0,T=t.globals.gridWidth,X=0;X<o+1;X++){var I=e.drawLine(0,E,T,M,t.config.grid.borderColor,i);a.add(I),I.node.classList.add("apexcharts-gridline"),this.animY&&this.animateLine(I,{y1:E+20,y2:M+20},{y1:E,y2:M}),M=E+=t.globals.gridHeight/o}}return this.drawGridBands(s,r,o),{el:s,xAxisTickWidth:t.globals.gridWidth/r}}},{key:"drawGridBands",value:function(t,e,i){var s=this.w,a=new f(this.ctx);if(void 0!==s.config.grid.row.colors&&s.config.grid.row.colors.length>0)for(var n=0,r=s.globals.gridHeight/i,o=s.globals.gridWidth,l=0,h=0;l<i;l++,h++){h>=s.config.grid.row.colors.length&&(h=0);var c=s.config.grid.row.colors[h],d=a.drawRect(0,n,o,r,0,c,s.config.grid.row.opacity);t.add(d),d.node.classList.add("apexcharts-gridRow"),n+=s.globals.gridHeight/i}if(void 0!==s.config.grid.column.colors&&s.config.grid.column.colors.length>0)for(var u=s.globals.padHorizontal,g=s.globals.padHorizontal+s.globals.gridWidth/e,p=s.globals.gridHeight,x=0,b=0;x<e;x++,b++){b>=s.config.grid.column.colors.length&&(b=0);var m=s.config.grid.column.colors[b],v=a.drawRect(u,0,g,p,0,m,s.config.grid.column.opacity);v.node.classList.add("apexcharts-gridColumn"),t.add(v),u+=s.globals.gridWidth/e}}},{key:"animateLine",value:function(t,e,i){var s=this.w,a=s.config.chart.animations;if(a&&!s.globals.resized&&!s.globals.dataChanged){var n=a.speed;this.anim.animateLine(t,e,i,n)}}}]),t}(),ot=function(){function t(i,s){e(this,t),this.ctx=i,this.w=i.w,this.onLegendClick=this.onLegendClick.bind(this),this.onLegendHovered=this.onLegendHovered.bind(this)}return s(t,[{key:"init",value:function(){var t=this.w,e=t.globals,i=t.config;if((i.legend.showForSingleSeries&&1===e.series.length||e.series.length>1||!e.axisCharts)&&i.legend.show){for(;e.dom.elLegendWrap.firstChild;)e.dom.elLegendWrap.removeChild(e.dom.elLegendWrap.firstChild);this.drawLegends(),d.isIE11()?document.getElementsByTagName("head")[0].appendChild(this.getLegendStyles()):this.appendToForeignObject(),"bottom"===i.legend.position||"top"===i.legend.position?this.legendAlignHorizontal():"right"!==i.legend.position&&"left"!==i.legend.position||this.legendAlignVertical()}}},{key:"appendToForeignObject",value:function(){var t=this.w.globals,e=document.createElementNS(t.SVGNS,"foreignObject");e.setAttribute("x",0),e.setAttribute("y",0),e.setAttribute("width",t.svgWidth),e.setAttribute("height",t.svgHeight),t.dom.elLegendWrap.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),e.appendChild(t.dom.elLegendWrap),e.appendChild(this.getLegendStyles()),t.dom.Paper.node.insertBefore(e,t.dom.elGraphical.node)}},{key:"drawLegends",value:function(){var t=this.w,e=t.config.legend.fontFamily,i=t.globals.seriesNames,s=t.globals.colors.slice();if("heatmap"===t.config.chart.type){var a=t.config.plotOptions.heatmap.colorScale.ranges;i=a.map(function(t){return t.name?t.name:t.from+" - "+t.to}),s=a.map(function(t){return t.color})}for(var n=t.globals.legendFormatter,r=0;r<=i.length-1;r++){var o=n(i[r],{seriesIndex:r,w:t}),l=!1,h=!1;if(t.globals.collapsedSeries.length>0)for(var c=0;c<t.globals.collapsedSeries.length;c++)t.globals.collapsedSeries[c].index===r&&(l=!0);if(t.globals.ancillaryCollapsedSeriesIndices.length>0)for(var d=0;d<t.globals.ancillaryCollapsedSeriesIndices.length;d++)t.globals.ancillaryCollapsedSeriesIndices[d]===r&&(h=!0);var u=document.createElement("span");u.classList.add("apexcharts-legend-marker");var g=t.config.legend.markers.offsetX,p=t.config.legend.markers.offsetY,x=t.config.legend.markers.height,b=t.config.legend.markers.width,m=t.config.legend.markers.strokeWidth,v=t.config.legend.markers.strokeColor,w=t.config.legend.markers.radius,k=u.style;k.background=s[r],k.color=s[r],k.height=Array.isArray(x)?parseFloat(x[r])+"px":parseFloat(x)+"px",k.width=Array.isArray(b)?parseFloat(b[r])+"px":parseFloat(b)+"px",k.left=Array.isArray(g)?g[r]:g,k.top=Array.isArray(p)?p[r]:p,k.borderWidth=Array.isArray(m)?m[r]:m,k.borderColor=Array.isArray(v)?v[r]:v,k.borderRadius=Array.isArray(w)?parseFloat(w[r])+"px":parseFloat(w)+"px",t.config.legend.markers.customHTML&&(Array.isArray(t.config.legend.markers.customHTML)?u.innerHTML=t.config.legend.markers.customHTML[r]():u.innerHTML=t.config.legend.markers.customHTML()),f.setAttrs(u,{rel:r+1,"data:collapsed":l||h}),(l||h)&&u.classList.add("inactive-legend");var A=document.createElement("div"),S=document.createElement("span");S.classList.add("apexcharts-legend-text"),S.innerHTML=o;var C=t.config.legend.labels.useSeriesColors?t.globals.colors[r]:t.config.legend.labels.colors;C||(C=t.config.chart.foreColor),S.style.color=C,S.style.fontSize=parseFloat(t.config.legend.fontSize)+"px",S.style.fontFamily=e||t.config.chart.fontFamily,f.setAttrs(S,{rel:r+1,"data:collapsed":l||h}),A.appendChild(u),A.appendChild(S);var L=new y(this.ctx);if(!t.config.legend.showForZeroSeries)0===L.getSeriesTotalByIndex(r)&&L.seriesHaveSameValues(r)&&!L.isSeriesNull(r)&&-1===t.globals.collapsedSeriesIndices.indexOf(r)&&-1===t.globals.ancillaryCollapsedSeriesIndices.indexOf(r)&&A.classList.add("apexcharts-hidden-zero-series");t.config.legend.showForNullSeries||L.isSeriesNull(r)&&-1===t.globals.collapsedSeriesIndices.indexOf(r)&&-1===t.globals.ancillaryCollapsedSeriesIndices.indexOf(r)&&A.classList.add("apexcharts-hidden-null-series"),t.globals.dom.elLegendWrap.appendChild(A),t.globals.dom.elLegendWrap.classList.add(t.config.legend.horizontalAlign),t.globals.dom.elLegendWrap.classList.add("position-"+t.config.legend.position),A.classList.add("apexcharts-legend-series"),A.style.margin="".concat(t.config.legend.itemMargin.horizontal,"px ").concat(t.config.legend.itemMargin.vertical,"px"),t.globals.dom.elLegendWrap.style.width=t.config.legend.width?t.config.legend.width+"px":"",t.globals.dom.elLegendWrap.style.height=t.config.legend.height?t.config.legend.height+"px":"",f.setAttrs(A,{rel:r+1,"data:collapsed":l||h}),(l||h)&&A.classList.add("inactive-legend"),t.config.legend.onItemClick.toggleDataSeries||A.classList.add("no-click")}"heatmap"!==t.config.chart.type&&t.config.legend.onItemClick.toggleDataSeries&&t.globals.dom.elWrap.addEventListener("click",this.onLegendClick,!0),t.config.legend.onItemHover.highlightDataSeries&&(t.globals.dom.elWrap.addEventListener("mousemove",this.onLegendHovered,!0),t.globals.dom.elWrap.addEventListener("mouseout",this.onLegendHovered,!0))}},{key:"getLegendBBox",value:function(){var t=this.w.globals.dom.baseEl.querySelector(".apexcharts-legend").getBoundingClientRect(),e=t.width;return{clwh:t.height,clww:e}}},{key:"setLegendWrapXY",value:function(t,e){var i=this.w,s=i.globals.dom.baseEl.querySelector(".apexcharts-legend"),a=s.getBoundingClientRect(),n=0,r=0;if("bottom"===i.config.legend.position)r+=i.globals.svgHeight-a.height/2;else if("top"===i.config.legend.position){var o=new _(this.ctx),l=o.getTitleSubtitleCoords("title").height,h=o.getTitleSubtitleCoords("subtitle").height;r=r+(l>0?l-10:0)+(h>0?h-10:0)}s.style.position="absolute",n=n+t+i.config.legend.offsetX,r=r+e+i.config.legend.offsetY,s.style.left=n+"px",s.style.top=r+"px","bottom"===i.config.legend.position?(s.style.top="auto",s.style.bottom=10+i.config.legend.offsetY+"px"):"right"===i.config.legend.position&&(s.style.left="auto",s.style.right=25+i.config.legend.offsetX+"px"),s.style.width&&(s.style.width=parseInt(i.config.legend.width)+"px"),s.style.height&&(s.style.height=parseInt(i.config.legend.height)+"px")}},{key:"legendAlignHorizontal",value:function(){var t=this.w;t.globals.dom.baseEl.querySelector(".apexcharts-legend").style.right=0;var e=this.getLegendBBox(),i=new _(this.ctx),s=i.getTitleSubtitleCoords("title"),a=i.getTitleSubtitleCoords("subtitle"),n=0;"bottom"===t.config.legend.position?n=-e.clwh/1.8:"top"===t.config.legend.position&&(n=s.height+a.height+t.config.title.margin+t.config.subtitle.margin-15),this.setLegendWrapXY(20,n)}},{key:"legendAlignVertical",value:function(){var t=this.w,e=this.getLegendBBox(),i=0;"left"===t.config.legend.position&&(i=20),"right"===t.config.legend.position&&(i=t.globals.svgWidth-e.clww-10),this.setLegendWrapXY(i,20)}},{key:"onLegendHovered",value:function(t){var e=this.w,i=t.target.classList.contains("apexcharts-legend-text")||t.target.classList.contains("apexcharts-legend-marker");if("heatmap"!==e.config.chart.type)!t.target.classList.contains("inactive-legend")&&i&&new G(this.ctx).toggleSeriesOnHover(t,t.target);else if(i){var s=parseInt(t.target.getAttribute("rel"))-1;this.ctx.fireEvent("legendHover",[this.ctx,s,this.w]),new G(this.ctx).highlightRangeInSeries(t,t.target)}}},{key:"onLegendClick",value:function(t){if(t.target.classList.contains("apexcharts-legend-text")||t.target.classList.contains("apexcharts-legend-marker")){var e=parseInt(t.target.getAttribute("rel"))-1,i="true"===t.target.getAttribute("data:collapsed"),s=this.w.config.chart.events.legendClick;"function"==typeof s&&s(this.ctx,e,this.w),this.ctx.fireEvent("legendClick",[this.ctx,e,this.w]);var a=this.w.config.legend.markers.onClick;"function"==typeof a&&t.target.classList.contains("apexcharts-legend-marker")&&(a(this.ctx,e,this.w),this.ctx.fireEvent("legendMarkerClick",[this.ctx,e,this.w])),this.toggleDataSeries(e,i)}}},{key:"getLegendStyles",value:function(){var t=document.createElement("style");t.setAttribute("type","text/css");var e=document.createTextNode("\n    \n      .apexcharts-legend {\n        display: flex;\n        overflow: auto;\n        padding: 0 10px;\n      }\n\n      .apexcharts-legend.position-bottom, .apexcharts-legend.position-top {\n        flex-wrap: wrap\n      }\n      .apexcharts-legend.position-right, .apexcharts-legend.position-left {\n        flex-direction: column;\n        bottom: 0;\n      }\n\n      .apexcharts-legend.position-bottom.left, .apexcharts-legend.position-top.left, .apexcharts-legend.position-right, .apexcharts-legend.position-left {\n        justify-content: flex-start;\n      }\n\n      .apexcharts-legend.position-bottom.center, .apexcharts-legend.position-top.center {\n        justify-content: center;  \n      }\n\n      .apexcharts-legend.position-bottom.right, .apexcharts-legend.position-top.right {\n        justify-content: flex-end;\n      }\n\n      .apexcharts-legend-series {\n        cursor: pointer;\n        line-height: normal;\n      }\n\n      .apexcharts-legend.position-bottom .apexcharts-legend-series, .apexcharts-legend.position-top .apexcharts-legend-series{\n        display: flex;\n        align-items: center;\n      }\n\n      .apexcharts-legend-text {\n        position: relative;\n        font-size: 14px;\n      }\n\n      .apexcharts-legend-text *, .apexcharts-legend-marker * {\n        pointer-events: none;\n      }\n\n      .apexcharts-legend-marker {\n        position: relative;\n        display: inline-block;\n        cursor: pointer;\n        margin-right: 3px;\n      }\n      \n      .apexcharts-legend.right .apexcharts-legend-series, .apexcharts-legend.left .apexcharts-legend-series{\n        display: inline-block;\n      }\n\n      .apexcharts-legend-series.no-click {\n        cursor: auto;\n      }\n\n      .apexcharts-legend .apexcharts-hidden-zero-series, .apexcharts-legend .apexcharts-hidden-null-series {\n        display: none !important;\n      }\n\n      .inactive-legend {\n        opacity: 0.45;\n      }");return t.appendChild(e),t}},{key:"resetToggleDataSeries",value:function(){var t=this.w,e=null,i=[];if(t.globals.axisCharts?(e=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series[data\\:realIndex]"),(e=d.listToArray(e)).forEach(function(t){i.push(parseInt(t.getAttribute("data:realIndex")))})):(e=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series[rel]"),(e=d.listToArray(e)).forEach(function(t){i.push(parseInt(t.getAttribute("rel"))-1)})),i.sort(),t.globals.collapsedSeries.length>0){for(var s=t.globals.risingSeries.slice(),a=t.config.series.slice(),n=0;n<t.globals.collapsedSeries.length;n++){var r=i.indexOf(t.globals.collapsedSeries[n].index);-1!==r&&(t.globals.axisCharts?a[r].data=t.globals.collapsedSeries.slice()[n].data.slice():a[r]=t.globals.collapsedSeries.slice()[n].data,s.push(r))}t.globals.collapsedSeries=[],t.globals.ancillaryCollapsedSeries=[],t.globals.collapsedSeriesIndices=[],t.globals.ancillaryCollapsedSeriesIndices=[],t.globals.risingSeries=s,t.config.series=a,this.ctx._updateSeries(t.config.series,t.config.chart.animations.dynamicAnimation.enabled)}}},{key:"toggleDataSeries",value:function(t,e){var i=this.w;if(i.globals.axisCharts||"radialBar"===i.config.chart.type){i.globals.resized=!0;var s=null,a=null;if(i.globals.risingSeries=[],i.globals.axisCharts?(s=i.globals.dom.baseEl.querySelector(".apexcharts-series[data\\:realIndex='".concat(t,"']")),a=parseInt(s.getAttribute("data:realIndex"))):(s=i.globals.dom.baseEl.querySelector(".apexcharts-series[rel='".concat(t+1,"']")),a=parseInt(s.getAttribute("rel"))-1),e)this.riseCollapsedSeries(i.globals.collapsedSeries,i.globals.collapsedSeriesIndices,a),this.riseCollapsedSeries(i.globals.ancillaryCollapsedSeries,i.globals.ancillaryCollapsedSeriesIndices,a);else{if(i.globals.axisCharts){var n=!1;if(i.config.yaxis[a]&&i.config.yaxis[a].show&&i.config.yaxis[a].showAlways&&(n=!0,i.globals.ancillaryCollapsedSeriesIndices.indexOf(a)<0&&(i.globals.ancillaryCollapsedSeries.push({index:a,data:i.config.series[a].data.slice(),type:s.parentNode.className.baseVal.split("-")[1]}),i.globals.ancillaryCollapsedSeriesIndices.push(a))),!n){i.globals.collapsedSeries.push({index:a,data:i.config.series[a].data.slice(),type:s.parentNode.className.baseVal.split("-")[1]}),i.globals.collapsedSeriesIndices.push(a);var r=i.globals.risingSeries.indexOf(a);i.globals.risingSeries.splice(r,1)}i.config.series[a].data=[]}else i.globals.collapsedSeries.push({index:a,data:i.config.series[a]}),i.globals.collapsedSeriesIndices.push(a),i.config.series[a]=0;for(var o=s.childNodes,l=0;l<o.length;l++)o[l].classList.contains("apexcharts-series-markers-wrap")&&(o[l].classList.contains("apexcharts-hide")?o[l].classList.remove("apexcharts-hide"):o[l].classList.add("apexcharts-hide"));i.globals.allSeriesCollapsed=i.globals.collapsedSeries.length===i.globals.series.length,this.ctx._updateSeries(i.config.series,i.config.chart.animations.dynamicAnimation.enabled)}}else{i.globals.dom.Paper.select(" .apexcharts-series[rel='".concat(t+1,"'] path")).fire("click")}}},{key:"riseCollapsedSeries",value:function(t,e,i){var s=this.w;if(t.length>0)for(var a=0;a<t.length;a++)t[a].index===i&&(s.globals.axisCharts?(s.config.series[i].data=t[a].data.slice(),t.splice(a,1),e.splice(a,1),s.globals.risingSeries.push(i)):(s.config.series[i]=t[a].data,t.splice(a,1),e.splice(a,1),s.globals.risingSeries.push(i)),this.ctx._updateSeries(s.config.series,s.config.chart.animations.dynamicAnimation.enabled))}}]),t}(),lt=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w}return s(t,[{key:"checkResponsiveConfig",value:function(t){var e=this,i=this.w,s=i.config;if(0!==s.responsive.length){var a=s.responsive.slice();a.sort(function(t,e){return t.breakpoint>e.breakpoint?1:e.breakpoint>t.breakpoint?-1:0}).reverse();var n=new w({}),r=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},s=a[0].breakpoint,r=window.innerWidth>0?window.innerWidth:screen.width;if(r>s){var o=y.extendArrayProps(n,i.globals.initialConfig);t=d.extend(o,t),t=d.extend(i.config,t),e.overrideResponsiveOptions(t)}else for(var l=0;l<a.length;l++)r<a[l].breakpoint&&(t=y.extendArrayProps(n,a[l].options),t=d.extend(i.config,t),e.overrideResponsiveOptions(t))};if(t){var o=y.extendArrayProps(n,t);o=d.extend(i.config,o),r(o=d.extend(o,t))}else r({})}}},{key:"overrideResponsiveOptions",value:function(t){var e=new w(t).init();this.w.config=e}}]),t}(),ht=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.colors=[]}return s(t,[{key:"init",value:function(){this.setDefaultColors()}},{key:"setDefaultColors",value:function(){var t=this.w,e=new d;if(t.globals.dom.elWrap.classList.add(t.config.theme.mode),void 0===t.config.colors?t.globals.colors=this.predefined():t.globals.colors=t.config.colors,t.config.theme.monochrome.enabled){var i=[],s=t.globals.series.length;t.config.plotOptions.bar.distributed&&"bar"===t.config.chart.type&&(s=t.globals.series[0].length*t.globals.series.length);for(var a=t.config.theme.monochrome.color,n=1/(s/t.config.theme.monochrome.shadeIntensity),r=t.config.theme.monochrome.shadeTo,o=0,l=0;l<s;l++){var h=void 0;"dark"===r?(h=e.shadeColor(-1*o,a),o+=n):(h=e.shadeColor(o,a),o+=n),i.push(h)}t.globals.colors=i.slice()}var c=t.globals.colors.slice();this.pushExtraColors(t.globals.colors),void 0===t.config.stroke.colors?t.globals.stroke.colors=c:t.globals.stroke.colors=t.config.stroke.colors,this.pushExtraColors(t.globals.stroke.colors),void 0===t.config.fill.colors?t.globals.fill.colors=c:t.globals.fill.colors=t.config.fill.colors,this.pushExtraColors(t.globals.fill.colors),void 0===t.config.dataLabels.style.colors?t.globals.dataLabels.style.colors=c:t.globals.dataLabels.style.colors=t.config.dataLabels.style.colors,this.pushExtraColors(t.globals.dataLabels.style.colors,50),void 0===t.config.plotOptions.radar.polygons.fill.colors?t.globals.radarPolygons.fill.colors=["#fff"]:t.globals.radarPolygons.fill.colors=t.config.plotOptions.radar.polygons.fill.colors,this.pushExtraColors(t.globals.radarPolygons.fill.colors,20),void 0===t.config.markers.colors?t.globals.markers.colors=c:t.globals.markers.colors=t.config.markers.colors,this.pushExtraColors(t.globals.markers.colors)}},{key:"pushExtraColors",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=this.w,a=e||s.globals.series.length;if(null===i&&(i="bar"===s.config.chart.type&&s.config.plotOptions.bar.distributed||"heatmap"===s.config.chart.type&&s.config.plotOptions.heatmap.colorScale.inverse),i&&(a=s.globals.series[0].length*s.globals.series.length),t.length<a)for(var n=a-t.length,r=0;r<n;r++)t.push(t[r])}},{key:"updateThemeOptions",value:function(t){t.chart=t.chart||{},t.tooltip=t.tooltip||{};var e=t.theme.mode||"light",i=t.theme.palette?t.theme.palette:"dark"===e?"palette4":"palette1",s=t.chart.foreColor?t.chart.foreColor:"dark"===e?"#f6f7f8":"#373d3f";return t.tooltip.theme=e,t.chart.foreColor=s,t.theme.palette=i,t}},{key:"predefined",value:function(){switch(this.w.config.theme.palette){case"palette1":this.colors=["#008FFB","#00E396","#FEB019","#FF4560","#775DD0"];break;case"palette2":this.colors=["#3f51b5","#03a9f4","#4caf50","#f9ce1d","#FF9800"];break;case"palette3":this.colors=["#33b2df","#546E7A","#d4526e","#13d8aa","#A5978B"];break;case"palette4":this.colors=["#4ecdc4","#c7f464","#81D4FA","#fd6a6a","#546E7A"];break;case"palette5":this.colors=["#2b908f","#f9a3a4","#90ee7e","#fa4443","#69d2e7"];break;case"palette6":this.colors=["#449DD1","#F86624","#EA3546","#662E9B","#C5D86D"];break;case"palette7":this.colors=["#D7263D","#1B998B","#2E294E","#F46036","#E2C044"];break;case"palette8":this.colors=["#662E9B","#F86624","#F9C80E","#EA3546","#43BCCD"];break;case"palette9":this.colors=["#5C4742","#A5978B","#8D5B4C","#5A2A27","#C4BBAF"];break;case"palette10":this.colors=["#A300D6","#7D02EB","#5653FE","#2983FF","#00B1F2"];break;default:this.colors=["#008FFB","#00E396","#FEB019","#FF4560","#775DD0"]}return this.colors}}]),t}(),ct=function(){function t(i){e(this,t),this.w=i.w,this.ttCtx=i,this.ctx=i.ctx}return s(t,[{key:"getNearestValues",value:function(t){var e=t.hoverArea,i=t.elGrid,s=t.clientX,a=t.clientY,n=t.hasBars,r=this.w,o=r.globals.gridWidth,l=o/(r.globals.dataPoints-1),h=i.getBoundingClientRect();(n&&r.globals.comboCharts||n)&&(l=o/r.globals.dataPoints);var c=s-h.left,d=a-h.top;c<0||d<0||c>r.globals.gridWidth||d>r.globals.gridHeight?(e.classList.remove("hovering-zoom"),e.classList.remove("hovering-pan")):r.globals.zoomEnabled?(e.classList.remove("hovering-pan"),e.classList.add("hovering-zoom")):r.globals.panEnabled&&(e.classList.remove("hovering-zoom"),e.classList.add("hovering-pan"));var u=Math.round(c/l);n&&(u=Math.ceil(c/l),u-=1);for(var g,f=null,p=null,x=[],b=0;b<r.globals.seriesXvalues.length;b++)x.push([r.globals.seriesXvalues[b][0]-1e-6].concat(r.globals.seriesXvalues[b]));return x=x.map(function(t){return t.filter(function(t){return t})}),g=r.globals.seriesYvalues.map(function(t){return t.filter(function(t){return t})}),r.globals.isXNumeric&&(f=(p=this.closestInMultiArray(c,d,x,g)).index,u=p.j,null!==f&&(x=r.globals.seriesXvalues[f],u=(p=this.closestInArray(c,x)).index)),(!u||u<1)&&(u=0),{capturedSeries:f,j:u,hoverX:c,hoverY:d}}},{key:"closestInMultiArray",value:function(t,e,i,s){var a=this.w,n=0,r=null,o=-1;a.globals.series.length>1?n=this.getFirstActiveXArray(i):r=0;var l=s[n][0],h=i[n][0],c=Math.abs(t-h),d=Math.abs(e-l),u=d+c;return s.map(function(a,n){a.map(function(a,l){var h=Math.abs(e-s[n][l]),g=Math.abs(t-i[n][l]),f=g+h;f<u&&(u=f,c=g,d=h,r=n,o=l)})}),{index:r,j:o}}},{key:"getFirstActiveXArray",value:function(t){for(var e=0,i=new y(this.ctx),s=t.map(function(t,e){return t.length>0?e:-1}),a=0;a<s.length;a++){var n=i.getSeriesTotalByIndex(a);if(-1!==s[a]&&0!==n&&!i.seriesHaveSameValues(a)){e=s[a];break}}return e}},{key:"closestInArray",value:function(t,e){for(var i=e[0],s=null,a=Math.abs(t-i),n=0;n<e.length;n++){var r=Math.abs(t-e[n]);r<a&&(a=r,i=e[n],s=n)}return{index:s}}},{key:"isXoverlap",value:function(t){var e=[],i=this.w.globals.seriesX.filter(function(t){return void 0!==t[0]});if(i.length>0)for(var s=0;s<i.length-1;s++)void 0!==i[s][t]&&void 0!==i[s+1][t]&&i[s][t]!==i[s+1][t]&&e.push("unEqual");return 0===e.length}},{key:"isinitialSeriesSameLen",value:function(){for(var t=!0,e=this.w.globals.initialSeries,i=0;i<e.length-1;i++)if(e[i].data.length!==e[i+1].data.length){t=!1;break}return t}},{key:"getBarsHeight",value:function(t){return c(t).reduce(function(t,e){return t+e.getBBox().height},0)}},{key:"toggleAllTooltipSeriesGroups",value:function(t){var e=this.w,i=this.ttCtx;0===i.allTooltipSeriesGroups.length&&(i.allTooltipSeriesGroups=e.globals.dom.baseEl.querySelectorAll(".apexcharts-tooltip-series-group"));for(var s=i.allTooltipSeriesGroups,a=0;a<s.length;a++)"enable"===t?(s[a].classList.add("active"),s[a].style.display=e.config.tooltip.items.display):(s[a].classList.remove("active"),s[a].style.display="none")}}]),t}(),dt=function(){function t(i){e(this,t),this.w=i.w,this.ctx=i.ctx,this.ttCtx=i,this.tooltipUtil=new ct(i)}return s(t,[{key:"drawSeriesTexts",value:function(t){var e=t.shared,i=void 0===e||e,s=t.ttItems,a=t.i,n=void 0===a?0:a,r=t.j,o=void 0===r?null:r;void 0!==this.w.config.tooltip.custom?this.handleCustomTooltip({i:n,j:o}):this.toggleActiveInactiveSeries(i);var l=this.getValuesToPrint({i:n,j:o});this.printLabels({i:n,j:o,values:l,ttItems:s,shared:i});var h=this.ttCtx.getElTooltip();this.ttCtx.tooltipRect.ttWidth=h.getBoundingClientRect().width,this.ttCtx.tooltipRect.ttHeight=h.getBoundingClientRect().height}},{key:"printLabels",value:function(t){var e,i=t.i,s=t.j,a=t.values,n=t.ttItems,r=t.shared,o=this.w,l=a.xVal,h=a.zVal,c=a.xAxisTTVal,d="",u=o.globals.colors[i];null!==s&&o.config.plotOptions.bar.distributed&&(u=o.globals.colors[s]);for(var g=0,f=o.globals.series.length-1;g<o.globals.series.length;g++,f--){var p=this.getFormatters(i);if(d=this.getSeriesName({fn:p.yLbTitleFormatter,index:i,seriesIndex:i,j:s}),r){var x=o.config.tooltip.inverseOrder?f:g;p=this.getFormatters(x),d=this.getSeriesName({fn:p.yLbTitleFormatter,index:x,seriesIndex:i,j:s}),u=o.globals.colors[x],e=p.yLbFormatter(o.globals.series[x][s],{series:o.globals.series,seriesIndex:x,dataPointIndex:s,w:o}),(this.ttCtx.hasBars()&&o.config.chart.stacked&&0===o.globals.series[x][s]||void 0===o.globals.series[x][s])&&(e=void 0)}else e=p.yLbFormatter(o.globals.series[i][s],{series:o.globals.series,seriesIndex:i,dataPointIndex:s,w:o});null===s&&(e=p.yLbFormatter(o.globals.series[i],o)),this.DOMHandling({t:g,ttItems:n,values:{val:e,xVal:l,xAxisTTVal:c,zVal:h},seriesName:d,shared:r,pColor:u})}}},{key:"getFormatters",value:function(t){var e,i=this.w,s=i.globals.yLabelFormatters[t];return void 0!==i.globals.ttVal?Array.isArray(i.globals.ttVal)?(s=i.globals.ttVal[t]&&i.globals.ttVal[t].formatter,e=i.globals.ttVal[t]&&i.globals.ttVal[t].title&&i.globals.ttVal[t].title.formatter):(s=i.globals.ttVal.formatter,"function"==typeof i.globals.ttVal.title.formatter&&(e=i.globals.ttVal.title.formatter)):e=i.config.tooltip.y.title.formatter,"function"!=typeof s&&(s=i.globals.yLabelFormatters[0]?i.globals.yLabelFormatters[0]:function(t){return t}),"function"!=typeof e&&(e=function(t){return t}),{yLbFormatter:s,yLbTitleFormatter:e}}},{key:"getSeriesName",value:function(t){var e=t.fn,i=t.index,s=t.seriesIndex,a=t.j,n=this.w;return e(String(n.globals.seriesNames[i]),{series:n.globals.series,seriesIndex:s,dataPointIndex:a,w:n})}},{key:"DOMHandling",value:function(t){var e=t.t,i=t.ttItems,s=t.values,a=t.seriesName,n=t.shared,r=t.pColor,o=this.w,l=this.ttCtx,h=s.val,c=s.xVal,d=s.xAxisTTVal,u=s.zVal,g=null;g=i[e].children,o.config.tooltip.fillSeriesColor&&(i[e].style.backgroundColor=r,g[0].style.display="none"),l.showTooltipTitle&&(null===l.tooltipTitle&&(l.tooltipTitle=o.globals.dom.baseEl.querySelector(".apexcharts-tooltip-title")),l.tooltipTitle.innerHTML=c),l.blxaxisTooltip&&(l.xaxisTooltipText.innerHTML=""!==d?d:c);var f=i[e].querySelector(".apexcharts-tooltip-text-label");f&&(f.innerHTML=a?a+": ":"");var p=i[e].querySelector(".apexcharts-tooltip-text-value");(p&&(p.innerHTML=h),g[0]&&g[0].classList.contains("apexcharts-tooltip-marker")&&(g[0].style.backgroundColor=r),o.config.tooltip.marker.show||(g[0].style.display="none"),null!==u)&&(i[e].querySelector(".apexcharts-tooltip-text-z-label").innerHTML=o.config.tooltip.z.title,i[e].querySelector(".apexcharts-tooltip-text-z-value").innerHTML=u);n&&g[0]&&(null==h||o.globals.collapsedSeriesIndices.indexOf(e)>-1?g[0].parentNode.style.display="none":g[0].parentNode.style.display=o.config.tooltip.items.display)}},{key:"toggleActiveInactiveSeries",value:function(t){var e=this.w;if(t)this.tooltipUtil.toggleAllTooltipSeriesGroups("enable");else{this.tooltipUtil.toggleAllTooltipSeriesGroups("disable");var i=e.globals.dom.baseEl.querySelector(".apexcharts-tooltip-series-group");i&&(i.classList.add("active"),i.style.display=e.config.tooltip.items.display)}}},{key:"getValuesToPrint",value:function(t){var e=t.i,i=t.j,s=this.w,a=this.ctx.series.filteredSeriesX(),n="",r=null,o=null,l={series:s.globals.series,seriesIndex:e,dataPointIndex:i,w:s},h=s.globals.ttZFormatter;null===i?o=s.globals.series[e]:s.globals.isXNumeric?(n=a[e][i],0===a[e].length&&(n=a[this.tooltipUtil.getFirstActiveXArray(a)][i])):n=void 0!==s.globals.labels[i]?s.globals.labels[i]:"";var c=n;s.globals.isXNumeric&&"datetime"===s.config.xaxis.type?n=new N(this.ctx).xLabelFormat(s.globals.ttKeyFormatter,c):n=s.globals.xLabelFormatter(c,l);return void 0!==s.config.tooltip.x.formatter&&(n=s.globals.ttKeyFormatter(c,l)),s.globals.seriesZ.length>0&&s.globals.seriesZ[0].length>0&&(r=h(s.globals.seriesZ[e][i],s)),{val:o,xVal:n,xAxisTTVal:"function"==typeof s.config.xaxis.tooltip.formatter?s.globals.xaxisTooltipFormatter(c,l):n,zVal:r}}},{key:"handleCustomTooltip",value:function(t){var e=t.i,i=t.j,s=this.w;this.ttCtx.getElTooltip().innerHTML=s.config.tooltip.custom({ctx:this.ctx,series:s.globals.series,seriesIndex:e,dataPointIndex:i,w:s})}}]),t}(),ut=function(){function t(i){e(this,t),this.ttCtx=i,this.ctx=i.ctx,this.w=i.w}return s(t,[{key:"moveXCrosshairs",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=this.ttCtx,s=this.w,a=i.getElXCrosshairs(),n=t-i.xcrosshairsWidth/2,r=s.globals.labels.slice().length;if(null!==e&&(n=s.globals.gridWidth/r*e),"tickWidth"===s.config.xaxis.crosshairs.width||"barWidth"===s.config.xaxis.crosshairs.width?n+i.xcrosshairsWidth>s.globals.gridWidth&&(n=s.globals.gridWidth-i.xcrosshairsWidth):null!==e&&(n+=s.globals.gridWidth/r/2),n<0&&(n=0),n>s.globals.gridWidth&&(n=s.globals.gridWidth),null!==a&&(a.setAttribute("x",n),a.setAttribute("x1",n),a.setAttribute("x2",n),a.setAttribute("y2",s.globals.gridHeight),a.classList.add("active")),i.blxaxisTooltip){var o=n;"tickWidth"!==s.config.xaxis.crosshairs.width&&"barWidth"!==s.config.xaxis.crosshairs.width||(o=n+i.xcrosshairsWidth/2),this.moveXAxisTooltip(o)}}},{key:"moveYCrosshairs",value:function(t){var e=this.ttCtx;null!==e.ycrosshairs&&(f.setAttrs(e.ycrosshairs,{y1:t,y2:t}),f.setAttrs(e.ycrosshairsHidden,{y1:t,y2:t}))}},{key:"moveXAxisTooltip",value:function(t){var e=this.w,i=this.ttCtx;if(null!==i.xaxisTooltip){i.xaxisTooltip.classList.add("active");var s=i.xaxisOffY+e.config.xaxis.tooltip.offsetY+e.globals.translateY+1+e.config.xaxis.offsetY;if(t-=i.xaxisTooltip.getBoundingClientRect().width/2,!isNaN(t)){t+=e.globals.translateX;var a;a=new f(this.ctx).getTextRects(i.xaxisTooltipText.innerHTML),i.xaxisTooltipText.style.minWidth=a.width+"px",i.xaxisTooltip.style.left=t+"px",i.xaxisTooltip.style.top=s+"px"}}}},{key:"moveYAxisTooltip",value:function(t){var e=this.w,i=this.ttCtx;null===i.yaxisTTEls&&(i.yaxisTTEls=e.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxistooltip"));var s=parseInt(i.ycrosshairsHidden.getAttribute("y1")),a=e.globals.translateY+s,n=i.yaxisTTEls[t].getBoundingClientRect().height,r=e.globals.translateYAxisX[t]-2;e.config.yaxis[t].opposite&&(r-=26),a-=n/2,-1===e.globals.ignoreYAxisIndexes.indexOf(t)?(i.yaxisTTEls[t].classList.add("active"),i.yaxisTTEls[t].style.top=a+"px",i.yaxisTTEls[t].style.left=r+e.config.yaxis[t].tooltip.offsetX+"px"):i.yaxisTTEls[t].classList.remove("active")}},{key:"moveTooltip",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=this.w,a=this.ttCtx,n=a.getElTooltip(),r=a.tooltipRect,o=null!==i?parseInt(i):1,l=parseInt(t)+o+5,h=parseInt(e)+o/2;if(l>s.globals.gridWidth/2&&(l=l-r.ttWidth-o-15),l>s.globals.gridWidth-r.ttWidth-10&&(l=s.globals.gridWidth-r.ttWidth),l<-20&&(l=-20),s.config.tooltip.followCursor){var c=a.getElGrid().getBoundingClientRect();h=a.e.clientY+s.globals.translateY-c.top-r.ttHeight/2}var d=this.positionChecks(r,l,h);l=d.x,h=d.y,isNaN(l)||(l+=s.globals.translateX,n.style.left=l+"px",n.style.top=h+"px")}},{key:"positionChecks",value:function(t,e,i){var s=this.w;return t.ttHeight+i>s.globals.gridHeight&&(i=s.globals.gridHeight-t.ttHeight+s.globals.translateY),i<0&&(i=0),{x:e,y:i}}},{key:"moveMarkers",value:function(t,e){var i=this.w,s=this.ttCtx;if(i.globals.markers.size[t]>0)for(var a=i.globals.dom.baseEl.querySelectorAll(" .apexcharts-series[data\\:realIndex='".concat(t,"'] .apexcharts-marker")),n=0;n<a.length;n++)parseInt(a[n].getAttribute("rel"))===e&&(s.marker.resetPointsSize(),s.marker.enlargeCurrentPoint(e,a[n]));else s.marker.resetPointsSize(),this.moveDynamicPointOnHover(e,t)}},{key:"moveDynamicPointOnHover",value:function(t,e){var i,s,a=this.w,n=this.ttCtx,r=a.globals.pointsArray,o=a.config.markers.hover.size;void 0===o&&(o=a.globals.markers.size[e]+a.config.markers.hover.sizeOffset),i=r[e][t][0],s=r[e][t][1]?r[e][t][1]:0;var l=a.globals.dom.baseEl.querySelector(".apexcharts-series[data\\:realIndex='".concat(e,"'] .apexcharts-series-markers circle"));l&&(l.setAttribute("r",o),l.setAttribute("cx",i),l.setAttribute("cy",s)),this.moveXCrosshairs(i),n.fixedTooltip||this.moveTooltip(i,s,o)}},{key:"moveDynamicPointsOnHover",value:function(t){var e,i=this.ttCtx,s=i.w,a=0,n=0,r=s.globals.pointsArray;e=new G(this.ctx).getActiveSeriesIndex();var o=s.config.markers.hover.size;void 0===o&&(o=s.globals.markers.size[e]+s.config.markers.hover.sizeOffset),r[e]&&(a=r[e][t][0],n=r[e][t][1]);var l=null,h=i.getAllMarkers();if(null!==(l=null!==h?h:s.globals.dom.baseEl.querySelectorAll(".apexcharts-series-markers circle")))for(var c=0;c<l.length;c++){var d=r[c];if(d&&d.length){var u=r[c][t][1];l[c].setAttribute("cx",a);var g=parseInt(l[c].parentNode.parentNode.parentNode.getAttribute("data:realIndex"));null!==u?(l[g]&&l[g].setAttribute("r",o),l[g]&&l[g].setAttribute("cy",u)):l[g]&&l[g].setAttribute("r",0)}}if(this.moveXCrosshairs(a),!i.fixedTooltip){var f=n||s.globals.gridHeight;this.moveTooltip(a,f,o)}}},{key:"moveStickyTooltipOverBars",value:function(t){var e,i=this.w,s=this.ttCtx,a=i.globals.dom.baseEl.querySelector(".apexcharts-bar-series .apexcharts-series[rel='1'] path[j='".concat(t,"'], .apexcharts-candlestick-series .apexcharts-series[rel='1'] path[j='").concat(t,"'], .apexcharts-rangebar-series .apexcharts-series[rel='1'] path[j='").concat(t,"']")),n=a?parseFloat(a.getAttribute("cx")):0,r=a?parseFloat(a.getAttribute("barWidth")):0;i.globals.isXNumeric?n-=r/2:(n=s.xAxisTicksPositions[t-1]+s.dataPointsDividedWidth/2,isNaN(n)&&(n=s.xAxisTicksPositions[t]-s.dataPointsDividedWidth/2));var o=s.getElGrid().getBoundingClientRect();if(e=s.e.clientY-o.top-s.tooltipRect.ttHeight/2,this.moveXCrosshairs(n),!s.fixedTooltip){var l=e||i.globals.gridHeight;this.moveTooltip(n,l)}}}]),t}(),gt=function(){function t(i){e(this,t),this.w=i.w,this.ttCtx=i,this.ctx=i.ctx,this.tooltipPosition=new ut(i)}return s(t,[{key:"drawDynamicPoints",value:function(){for(var t=this.w,e=new f(this.ctx),i=new C(this.ctx),s=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series"),a=0;a<s.length;a++){var n=parseInt(s[a].getAttribute("data:realIndex")),r=t.globals.dom.baseEl.querySelector(".apexcharts-series[data\\:realIndex='".concat(n,"'] .apexcharts-series-markers-wrap"));if(null!==r){var o=void 0,l="apexcharts-marker w".concat((Math.random()+1).toString(36).substring(4));"line"!==t.config.chart.type&&"area"!==t.config.chart.type||t.globals.comboCharts||t.config.tooltip.intersect||(l+=" no-pointer-events");var h=i.getMarkerConfig(l,n);(o=e.drawMarker(0,0,h)).node.setAttribute("default-marker-size",0);var c=document.createElementNS(t.globals.SVGNS,"g");c.classList.add("apexcharts-series-markers"),c.appendChild(o.node),r.appendChild(c)}}}},{key:"enlargeCurrentPoint",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=this.w;"bubble"!==a.config.chart.type&&this.newPointSize(t,e);var n=e.getAttribute("cx"),r=e.getAttribute("cy");if(null!==i&&null!==s&&(n=i,r=s),this.tooltipPosition.moveXCrosshairs(n),!this.fixedTooltip){if("radar"===a.config.chart.type){var o=this.ttCtx.getElGrid().getBoundingClientRect();n=this.ttCtx.e.clientX-o.left}this.tooltipPosition.moveTooltip(n,r,a.config.markers.hover.size)}}},{key:"enlargePoints",value:function(t){for(var e=this.w,i=this.ttCtx,s=t,a=e.globals.dom.baseEl.querySelectorAll(".apexcharts-series:not(.apexcharts-series-collapsed) .apexcharts-marker"),n=e.config.markers.hover.size,r=0;r<a.length;r++){var o=a[r].getAttribute("rel"),l=a[r].getAttribute("index");if(void 0===n&&(n=e.globals.markers.size[l]+e.config.markers.hover.sizeOffset),s===parseInt(o)){this.newPointSize(s,a[r]);var h=a[r].getAttribute("cx"),c=a[r].getAttribute("cy");this.tooltipPosition.moveXCrosshairs(h),i.fixedTooltip||this.tooltipPosition.moveTooltip(h,c,n)}else this.oldPointSize(a[r])}}},{key:"newPointSize",value:function(t,e){var i=this.w,s=i.config.markers.hover.size,a=null;a=0===t?e.parentNode.firstChild:e.parentNode.lastChild;var n=parseInt(a.getAttribute("index"));void 0===s&&(s=i.globals.markers.size[n]+i.config.markers.hover.sizeOffset),a.setAttribute("r",s)}},{key:"oldPointSize",value:function(t){var e=parseInt(t.getAttribute("default-marker-size"));t.setAttribute("r",e)}},{key:"resetPointsSize",value:function(){for(var t=this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series:not(.apexcharts-series-collapsed) .apexcharts-marker"),e=0;e<t.length;e++){var i=parseInt(t[e].getAttribute("default-marker-size"));d.isNumber(i)?t[e].setAttribute("r",i):t[e].setAttribute("r",0)}}}]),t}(),ft=function(){function t(i){e(this,t),this.w=i.w,this.ttCtx=i}return s(t,[{key:"getAttr",value:function(t,e){return parseFloat(t.target.getAttribute(e))}},{key:"handleHeatTooltip",value:function(t){var e=t.e,i=t.opt,s=t.x,a=t.y,n=this.ttCtx,r=this.w;if(e.target.classList.contains("apexcharts-heatmap-rect")){var o=this.getAttr(e,"i"),l=this.getAttr(e,"j"),h=this.getAttr(e,"cx"),c=this.getAttr(e,"cy"),d=this.getAttr(e,"width"),u=this.getAttr(e,"height");if(n.tooltipLabels.drawSeriesTexts({ttItems:i.ttItems,i:o,j:l,shared:!1}),s=h+n.tooltipRect.ttWidth/2+d,a=c+n.tooltipRect.ttHeight/2-u/2,n.tooltipPosition.moveXCrosshairs(h+d/2),s>r.globals.gridWidth/2&&(s=h-n.tooltipRect.ttWidth/2+d),n.w.config.tooltip.followCursor){var g=n.getElGrid().getBoundingClientRect();a=n.e.clientY-g.top+r.globals.translateY/2-10}}return{x:s,y:a}}},{key:"handleMarkerTooltip",value:function(t){var e,i,s=t.e,a=t.opt,n=t.x,r=t.y,o=this.w,l=this.ttCtx;if(s.target.classList.contains("apexcharts-marker")){var h=parseInt(a.paths.getAttribute("cx")),c=parseInt(a.paths.getAttribute("cy")),u=parseFloat(a.paths.getAttribute("val"));if(i=parseInt(a.paths.getAttribute("rel")),e=parseInt(a.paths.parentNode.parentNode.parentNode.getAttribute("rel"))-1,l.intersect){var g=d.findAncestor(a.paths,"apexcharts-series");g&&(e=parseInt(g.getAttribute("data:realIndex")))}if(l.tooltipLabels.drawSeriesTexts({ttItems:a.ttItems,i:e,j:i,shared:!l.showOnIntersect&&o.config.tooltip.shared}),"mouseup"===s.type&&l.markerClick(s,e,i),n=h,r=c+o.globals.translateY-1.4*l.tooltipRect.ttHeight,l.w.config.tooltip.followCursor){var f=l.getElGrid().getBoundingClientRect();r=l.e.clientY+o.globals.translateY-f.top}u<0&&(r=c),l.marker.enlargeCurrentPoint(i,a.paths,n,r)}return{x:n,y:r}}},{key:"handleBarTooltip",value:function(t){var e,i,s=t.e,a=t.opt,n=this.w,r=this.ttCtx,o=r.getElTooltip(),l=0,h=0,c=0,d=this.getBarTooltipXY({e:s,opt:a});e=d.i;var u=d.barHeight,g=d.j;if(n.globals.isBarHorizontal&&r.hasBars()||!n.config.tooltip.shared?(h=d.x,c=d.y,i=Array.isArray(n.config.stroke.width)?n.config.stroke.width[e]:n.config.stroke.width,l=h):n.globals.comboCharts||n.config.tooltip.shared||(l/=2),isNaN(c)&&(c=n.globals.svgHeight-r.tooltipRect.ttHeight),h+r.tooltipRect.ttWidth>n.globals.gridWidth?h-=r.tooltipRect.ttWidth:h<0&&(h+=r.tooltipRect.ttWidth),r.w.config.tooltip.followCursor){var f=r.getElGrid().getBoundingClientRect();c=r.e.clientY-f.top}if(null===r.tooltip&&(r.tooltip=n.globals.dom.baseEl.querySelector(".apexcharts-tooltip")),n.config.tooltip.shared||(n.globals.comboChartsHasBars?r.tooltipPosition.moveXCrosshairs(l+i/2):r.tooltipPosition.moveXCrosshairs(l)),!r.fixedTooltip&&(!n.config.tooltip.shared||n.globals.isBarHorizontal&&r.hasBars())){x&&(h=n.globals.gridWidth-h),o.style.left=h+n.globals.translateX+"px";var p=parseInt(a.paths.parentNode.getAttribute("data:realIndex")),x=n.globals.isMultipleYAxis?n.config.yaxis[p]&&n.config.yaxis[p].reversed:n.config.yaxis[0].reversed;!x||n.globals.isBarHorizontal&&r.hasBars()||(c=c+u-2*(n.globals.series[e][g]<0?u:0)),r.tooltipRect.ttHeight+c>n.globals.gridHeight?(c=n.globals.gridHeight-r.tooltipRect.ttHeight+n.globals.translateY,o.style.top=c+"px"):o.style.top=c+n.globals.translateY-r.tooltipRect.ttHeight/2+"px"}}},{key:"getBarTooltipXY",value:function(t){var e=t.e,i=t.opt,s=this.w,a=null,n=this.ttCtx,r=0,o=0,l=0,h=0,c=0,d=e.target.classList;if(d.contains("apexcharts-bar-area")||d.contains("apexcharts-candlestick-area")||d.contains("apexcharts-rangebar-area")){var u=e.target,g=u.getBoundingClientRect(),f=i.elGrid.getBoundingClientRect(),p=g.height;c=g.height;var x=g.width,b=parseInt(u.getAttribute("cx")),m=parseInt(u.getAttribute("cy"));h=parseFloat(u.getAttribute("barWidth"));var v="touchmove"===e.type?e.touches[0].clientX:e.clientX;a=parseInt(u.getAttribute("j")),r=parseInt(u.parentNode.getAttribute("rel"))-1,s.globals.comboCharts&&(r=parseInt(u.parentNode.getAttribute("data:realIndex"))),n.tooltipLabels.drawSeriesTexts({ttItems:i.ttItems,i:r,j:a,shared:!n.showOnIntersect&&s.config.tooltip.shared}),s.config.tooltip.followCursor?s.globals.isBarHorizontal?(o=v-f.left+15,l=m-n.dataPointsDividedHeight+p/2-n.tooltipRect.ttHeight/2):(o=s.globals.isXNumeric?b-x/2:b-n.dataPointsDividedWidth+x/2,l=e.clientY-f.top-n.tooltipRect.ttHeight/2-15):s.globals.isBarHorizontal?((o=b)<n.xyRatios.baseLineInvertedY&&(o=b-n.tooltipRect.ttWidth),l=m-n.dataPointsDividedHeight+p/2-n.tooltipRect.ttHeight/2):(o=s.globals.isXNumeric?b-x/2:b-n.dataPointsDividedWidth+x/2,l=m)}return{x:o,y:l,barHeight:c,barWidth:h,i:r,j:a}}}]),t}(),pt=function(){function t(i){e(this,t),this.w=i.w,this.ttCtx=i}return s(t,[{key:"drawXaxisTooltip",value:function(){var t=this.w,e=this.ttCtx,i="bottom"===t.config.xaxis.position;e.xaxisOffY=i?t.globals.gridHeight+1:1;var s=i?"apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom":"apexcharts-xaxistooltip apexcharts-xaxistooltip-top",a=t.globals.dom.elWrap;e.blxaxisTooltip&&(null===t.globals.dom.baseEl.querySelector(".apexcharts-xaxistooltip")&&(e.xaxisTooltip=document.createElement("div"),e.xaxisTooltip.setAttribute("class",s+" "+t.config.tooltip.theme),a.appendChild(e.xaxisTooltip),e.xaxisTooltipText=document.createElement("div"),e.xaxisTooltipText.classList.add("apexcharts-xaxistooltip-text"),e.xaxisTooltipText.style.fontFamily=t.config.xaxis.tooltip.style.fontFamily||t.config.chart.fontFamily,e.xaxisTooltipText.style.fontSize=t.config.xaxis.tooltip.style.fontSize,e.xaxisTooltip.appendChild(e.xaxisTooltipText)))}},{key:"drawYaxisTooltip",value:function(){for(var t=this.w,e=this.ttCtx,i=0;i<t.config.yaxis.length;i++){var s=t.config.yaxis[i].opposite||t.config.yaxis[i].crosshairs.opposite;e.yaxisOffX=s?t.globals.gridWidth+1:1;var a="apexcharts-yaxistooltip apexcharts-yaxistooltip-".concat(i,s?" apexcharts-yaxistooltip-right":" apexcharts-yaxistooltip-left"),n=t.globals.dom.elWrap;if(e.blyaxisTooltip)null===t.globals.dom.baseEl.querySelector(".apexcharts-yaxistooltip apexcharts-yaxistooltip-".concat(i))&&(e.yaxisTooltip=document.createElement("div"),e.yaxisTooltip.setAttribute("class",a+" "+t.config.tooltip.theme),n.appendChild(e.yaxisTooltip),0===i&&(e.yaxisTooltipText=[]),e.yaxisTooltipText.push(document.createElement("div")),e.yaxisTooltipText[i].classList.add("apexcharts-yaxistooltip-text"),e.yaxisTooltip.appendChild(e.yaxisTooltipText[i]))}}},{key:"setXCrosshairWidth",value:function(){var t=this.w,e=this.ttCtx,i=e.getElXCrosshairs();if(e.xcrosshairsWidth=parseInt(t.config.xaxis.crosshairs.width),t.globals.comboCharts){var s=t.globals.dom.baseEl.querySelector(".apexcharts-bar-area");if(null!==s&&"barWidth"===t.config.xaxis.crosshairs.width){var a=parseFloat(s.getAttribute("barWidth"));e.xcrosshairsWidth=a}else if("tickWidth"===t.config.xaxis.crosshairs.width){var n=t.globals.labels.length;e.xcrosshairsWidth=t.globals.gridWidth/n}}else if("tickWidth"===t.config.xaxis.crosshairs.width){var r=t.globals.labels.length;e.xcrosshairsWidth=t.globals.gridWidth/r}else if("barWidth"===t.config.xaxis.crosshairs.width){var o=t.globals.dom.baseEl.querySelector(".apexcharts-bar-area");if(null!==o){var l=parseFloat(o.getAttribute("barWidth"));e.xcrosshairsWidth=l}else e.xcrosshairsWidth=1}t.globals.isBarHorizontal&&(e.xcrosshairsWidth=0),null!==i&&e.xcrosshairsWidth>0&&i.setAttribute("width",e.xcrosshairsWidth)}},{key:"handleYCrosshair",value:function(){var t=this.w,e=this.ttCtx;e.ycrosshairs=t.globals.dom.baseEl.querySelector(".apexcharts-ycrosshairs"),e.ycrosshairsHidden=t.globals.dom.baseEl.querySelector(".apexcharts-ycrosshairs-hidden")}},{key:"drawYaxisTooltipText",value:function(t,e,i){var s=this.ttCtx,a=this.w,n=a.globals.yLabelFormatters[t];if(s.blyaxisTooltip){var r=s.getElGrid().getBoundingClientRect(),o=(e-r.top)*i.yRatio[t],l=a.globals.maxYArr[t]-a.globals.minYArr[t],h=a.globals.minYArr[t]+(l-o);s.tooltipPosition.moveYCrosshairs(e-r.top),s.yaxisTooltipText[t].innerHTML=n(h),s.tooltipPosition.moveYAxisTooltip(t)}}}]),t}(),xt=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w;var s=this.w;this.tooltipUtil=new ct(this),this.tooltipLabels=new dt(this),this.tooltipPosition=new ut(this),this.marker=new gt(this),this.intersect=new ft(this),this.axesTooltip=new pt(this),this.showOnIntersect=s.config.tooltip.intersect,this.showTooltipTitle=s.config.tooltip.x.show,this.fixedTooltip=s.config.tooltip.fixed.enabled,this.xaxisTooltip=null,this.yaxisTTEls=null,this.isBarShared=!s.globals.isBarHorizontal&&s.config.tooltip.shared}return s(t,[{key:"getElTooltip",value:function(t){return t||(t=this),t.w.globals.dom.baseEl.querySelector(".apexcharts-tooltip")}},{key:"getElXCrosshairs",value:function(){return this.w.globals.dom.baseEl.querySelector(".apexcharts-xcrosshairs")}},{key:"getElGrid",value:function(){return this.w.globals.dom.baseEl.querySelector(".apexcharts-grid")}},{key:"drawTooltip",value:function(t){var e=this.w;this.xyRatios=t,this.blxaxisTooltip=e.config.xaxis.tooltip.enabled&&e.globals.axisCharts,this.blyaxisTooltip=e.config.yaxis[0].tooltip.enabled&&e.globals.axisCharts,this.allTooltipSeriesGroups=[],e.globals.axisCharts||(this.showTooltipTitle=!1);var i=document.createElement("div");if(i.classList.add("apexcharts-tooltip"),i.classList.add(e.config.tooltip.theme),e.globals.dom.elWrap.appendChild(i),e.globals.axisCharts){this.axesTooltip.drawXaxisTooltip(),this.axesTooltip.drawYaxisTooltip(),this.axesTooltip.setXCrosshairWidth(),this.axesTooltip.handleYCrosshair();var s=new H(this.ctx);this.xAxisTicksPositions=s.getXAxisTicksPositions()}if((e.globals.comboCharts&&!e.config.tooltip.shared||e.config.tooltip.intersect&&!e.config.tooltip.shared||("bar"===e.config.chart.type||"rangeBar"===e.config.chart.type)&&!e.config.tooltip.shared)&&(this.showOnIntersect=!0),0!==e.config.markers.size&&0!==e.globals.markers.largestSize||this.marker.drawDynamicPoints(this),e.globals.collapsedSeries.length!==e.globals.series.length){this.dataPointsDividedHeight=e.globals.gridHeight/e.globals.dataPoints,this.dataPointsDividedWidth=e.globals.gridWidth/e.globals.dataPoints,this.showTooltipTitle&&(this.tooltipTitle=document.createElement("div"),this.tooltipTitle.classList.add("apexcharts-tooltip-title"),this.tooltipTitle.style.fontFamily=e.config.tooltip.style.fontFamily||e.config.chart.fontFamily,this.tooltipTitle.style.fontSize=e.config.tooltip.style.fontSize,i.appendChild(this.tooltipTitle));var a=e.globals.series.length;(e.globals.xyCharts||e.globals.comboCharts)&&e.config.tooltip.shared&&(a=this.showOnIntersect?1:e.globals.series.length),this.ttItems=this.createTTElements(a),this.addSVGEvents()}}},{key:"createTTElements",value:function(t){for(var e=this.w,i=[],s=this.getElTooltip(),a=0;a<t;a++){var n=document.createElement("div");n.classList.add("apexcharts-tooltip-series-group");var r=document.createElement("span");r.classList.add("apexcharts-tooltip-marker"),r.style.backgroundColor=e.globals.colors[a],n.appendChild(r);var o=document.createElement("div");o.classList.add("apexcharts-tooltip-text"),o.style.fontFamily=e.config.tooltip.style.fontFamily||e.config.chart.fontFamily,o.style.fontSize=e.config.tooltip.style.fontSize;var l=document.createElement("div");l.classList.add("apexcharts-tooltip-y-group");var h=document.createElement("span");h.classList.add("apexcharts-tooltip-text-label"),l.appendChild(h);var c=document.createElement("span");c.classList.add("apexcharts-tooltip-text-value"),l.appendChild(c);var d=document.createElement("div");d.classList.add("apexcharts-tooltip-z-group");var u=document.createElement("span");u.classList.add("apexcharts-tooltip-text-z-label"),d.appendChild(u);var g=document.createElement("span");g.classList.add("apexcharts-tooltip-text-z-value"),d.appendChild(g),o.appendChild(l),o.appendChild(d),n.appendChild(o),s.appendChild(n),i.push(n)}return i}},{key:"addSVGEvents",value:function(){var t=this.w,e=t.config.chart.type,i=this.getElTooltip(),s=!("bar"!==e&&"candlestick"!==e&&"rangeBar"!==e),a=t.globals.dom.Paper.node,n=this.getElGrid();n&&(this.seriesBound=n.getBoundingClientRect());var r,o=[],l=[],h={hoverArea:a,elGrid:n,tooltipEl:i,tooltipY:o,tooltipX:l,ttItems:this.ttItems};if(t.globals.axisCharts&&("area"===e||"line"===e||"scatter"===e||"bubble"===e?r=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series[data\\:longestSeries='true'] .apexcharts-marker"):s?r=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series .apexcharts-bar-area, .apexcharts-series .apexcharts-candlestick-area, .apexcharts-series .apexcharts-rangebar-area"):"heatmap"===e?r=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series .apexcharts-heatmap"):"radar"===e&&(r=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series .apexcharts-marker")),r&&r.length))for(var c=0;c<r.length;c++)o.push(r[c].getAttribute("cy")),l.push(r[c].getAttribute("cx"));if(t.globals.xyCharts&&!this.showOnIntersect||t.globals.comboCharts&&!this.showOnIntersect||s&&this.hasBars()&&t.config.tooltip.shared)this.addPathsEventListeners([a],h);else if(s&&!t.globals.comboCharts)this.addBarsEventListeners(h);else if("bubble"===e||"scatter"===e||"radar"===e||this.showOnIntersect&&("area"===e||"line"===e))this.addPointsEventsListeners(h);else if(!t.globals.axisCharts||"heatmap"===e){var d=t.globals.dom.baseEl.querySelectorAll(".apexcharts-series");this.addPathsEventListeners(d,h)}if(this.showOnIntersect){var u=t.globals.dom.baseEl.querySelectorAll(".apexcharts-line-series .apexcharts-marker");u.length>0&&this.addPathsEventListeners(u,h);var g=t.globals.dom.baseEl.querySelectorAll(".apexcharts-area-series .apexcharts-marker");g.length>0&&this.addPathsEventListeners(g,h),this.hasBars()&&!t.config.tooltip.shared&&this.addBarsEventListeners(h)}}},{key:"drawFixedTooltipRect",value:function(){var t=this.w,e=this.getElTooltip(),i=e.getBoundingClientRect(),s=i.width+10,a=i.height+10,n=t.config.tooltip.fixed.offsetX,r=t.config.tooltip.fixed.offsetY;return t.config.tooltip.fixed.position.toLowerCase().indexOf("right")>-1&&(n=n+t.globals.svgWidth-s+10),t.config.tooltip.fixed.position.toLowerCase().indexOf("bottom")>-1&&(r=r+t.globals.svgHeight-a-10),e.style.left=n+"px",e.style.top=r+"px",{x:n,y:r,ttWidth:s,ttHeight:a}}},{key:"addPointsEventsListeners",value:function(t){var e=this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series-markers .apexcharts-marker");this.addPathsEventListeners(e,t)}},{key:"addBarsEventListeners",value:function(t){var e=this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-bar-area, .apexcharts-candlestick-area, .apexcharts-rangebar-area");this.addPathsEventListeners(e,t)}},{key:"addPathsEventListeners",value:function(t,e){for(var i=this,s=this,a=function(a){var n={paths:t[a],tooltipEl:e.tooltipEl,tooltipY:e.tooltipY,tooltipX:e.tooltipX,elGrid:e.elGrid,hoverArea:e.hoverArea,ttItems:e.ttItems};i.w.globals.tooltipOpts=n;["mousemove","mouseup","touchmove","mouseout","touchend"].map(function(e){return t[a].addEventListener(e,s.seriesHover.bind(s,n),{capture:!1,passive:!0})})},n=0;n<t.length;n++)a(n)}},{key:"seriesHover",value:function(t,e){var i=this,s=[],a=this.w;a.config.chart.group&&(s=this.ctx.getGroupedCharts()),a.globals.axisCharts&&(a.globals.minX===-1/0&&a.globals.maxX===1/0||0===a.globals.dataPoints)||(s.length?s.forEach(function(s){var a=i.getElTooltip(s),n={paths:t.paths,tooltipEl:a,tooltipY:t.tooltipY,tooltipX:t.tooltipX,elGrid:t.elGrid,hoverArea:t.hoverArea,ttItems:s.w.globals.tooltip.ttItems};s.w.globals.minX===i.w.globals.minX&&s.w.globals.maxX===i.w.globals.maxX&&s.w.globals.tooltip.seriesHoverByContext({chartCtx:s,ttCtx:s.w.globals.tooltip,opt:n,e:e})}):this.seriesHoverByContext({chartCtx:this.ctx,ttCtx:this.w.globals.tooltip,opt:t,e:e}))}},{key:"seriesHoverByContext",value:function(t){var e=t.chartCtx,i=t.ttCtx,s=t.opt,a=t.e,n=e.w,r=this.getElTooltip();(i.tooltipRect={x:0,y:0,ttWidth:r.getBoundingClientRect().width,ttHeight:r.getBoundingClientRect().height},i.e=a,!i.hasBars()||n.globals.comboCharts||i.isBarShared)||n.config.tooltip.onDatasetHover.highlightDataSeries&&new G(e).toggleSeriesOnHover(a,a.target.parentNode);i.fixedTooltip&&i.drawFixedTooltipRect(),n.globals.axisCharts?i.axisChartsTooltips({e:a,opt:s,tooltipRect:i.tooltipRect}):i.nonAxisChartsTooltips({e:a,opt:s,tooltipRect:i.tooltipRect})}},{key:"axisChartsTooltips",value:function(t){var e,i,s,a=t.e,n=t.opt,r=this.w,o=null,l=n.elGrid.getBoundingClientRect(),h="touchmove"===a.type?a.touches[0].clientX:a.clientX,c="touchmove"===a.type?a.touches[0].clientY:a.clientY;if(this.clientY=c,this.clientX=h,c<l.top||c>l.top+l.height)this.handleMouseOut(n);else{var d=this.getElTooltip(),u=this.getElXCrosshairs(),g=r.globals.xyCharts||"bar"===r.config.chart.type&&!r.globals.isBarHorizontal&&this.hasBars()&&r.config.tooltip.shared||r.globals.comboCharts&&this.hasBars;if(r.globals.isBarHorizontal&&this.hasBars()&&(g=!1),"mousemove"===a.type||"touchmove"===a.type||"mouseup"===a.type){if(null!==u&&u.classList.add("active"),null!==this.ycrosshairs&&this.blyaxisTooltip&&this.ycrosshairs.classList.add("active"),g&&!this.showOnIntersect){e=(o=this.tooltipUtil.getNearestValues({context:this,hoverArea:n.hoverArea,elGrid:n.elGrid,clientX:h,clientY:c,hasBars:this.hasBars})).j;var f=o.capturedSeries;if(o.hoverX<0||o.hoverX>r.globals.gridWidth)return void this.handleMouseOut(n);if(null!==f){if(null===r.globals.series[f][e])return void n.tooltipEl.classList.remove("active");void 0!==r.globals.series[f][e]?r.config.tooltip.shared&&this.tooltipUtil.isXoverlap(e)&&this.tooltipUtil.isinitialSeriesSameLen()?this.create(a,this,f,e,n.ttItems):this.create(a,this,f,e,n.ttItems,!1):this.tooltipUtil.isXoverlap(e)&&this.create(a,this,0,e,n.ttItems)}else this.tooltipUtil.isXoverlap(e)&&this.create(a,this,0,e,n.ttItems)}else if("heatmap"===r.config.chart.type){var p=this.intersect.handleHeatTooltip({e:a,opt:n,x:i,y:s});i=p.x,s=p.y,d.style.left=i+"px",d.style.top=s+"px"}else this.hasBars&&this.intersect.handleBarTooltip({e:a,opt:n}),this.hasMarkers&&this.intersect.handleMarkerTooltip({e:a,opt:n,x:i,y:s});if(this.blyaxisTooltip)for(var x=0;x<r.config.yaxis.length;x++)this.axesTooltip.drawYaxisTooltipText(x,c,this.xyRatios);n.tooltipEl.classList.add("active")}else"mouseout"!==a.type&&"touchend"!==a.type||this.handleMouseOut(n)}}},{key:"nonAxisChartsTooltips",value:function(t){var e=t.e,i=t.opt,s=t.tooltipRect,a=this.w,n=i.paths.getAttribute("rel"),r=this.getElTooltip(),o=a.globals.dom.elWrap.getBoundingClientRect();if("mousemove"===e.type||"touchmove"===e.type){r.classList.add("active"),this.tooltipLabels.drawSeriesTexts({ttItems:i.ttItems,i:parseInt(n)-1,shared:!1});var l=a.globals.clientX-o.left-s.ttWidth/2,h=a.globals.clientY-o.top-s.ttHeight-10;r.style.left=l+"px",r.style.top=h+"px"}else"mouseout"!==e.type&&"touchend"!==e.type||r.classList.remove("active")}},{key:"deactivateHoverFilter",value:function(){for(var t=this.w,e=new f(this.ctx),i=t.globals.dom.Paper.select(".apexcharts-bar-area"),s=0;s<i.length;s++)e.pathMouseLeave(i[s])}},{key:"handleMouseOut",value:function(t){var e=this.w,i=this.getElXCrosshairs();if(t.tooltipEl.classList.remove("active"),this.deactivateHoverFilter(),"bubble"!==e.config.chart.type&&this.marker.resetPointsSize(),null!==i&&i.classList.remove("active"),null!==this.ycrosshairs&&this.ycrosshairs.classList.remove("active"),this.blxaxisTooltip&&this.xaxisTooltip.classList.remove("active"),this.blyaxisTooltip){null===this.yaxisTTEls&&(this.yaxisTTEls=e.globals.dom.baseEl.querySelectorAll(".apexcharts-yaxistooltip"));for(var s=0;s<this.yaxisTTEls.length;s++)this.yaxisTTEls[s].classList.remove("active")}}},{key:"getElMarkers",value:function(){return this.w.globals.dom.baseEl.querySelectorAll(" .apexcharts-series-markers")}},{key:"getAllMarkers",value:function(){return this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-series-markers .apexcharts-marker")}},{key:"hasMarkers",value:function(){return this.getElMarkers().length>0}},{key:"getElBars",value:function(){return this.w.globals.dom.baseEl.querySelectorAll(".apexcharts-bar-series,  .apexcharts-candlestick-series, .apexcharts-rangebar-series")}},{key:"hasBars",value:function(){return this.getElBars().length>0}},{key:"markerClick",value:function(t,e,i){var s=this.w;"function"==typeof s.config.chart.events.markerClick&&s.config.chart.events.markerClick(t,this.ctx,{seriesIndex:e,dataPointIndex:i,w:s}),this.ctx.fireEvent("markerClick",[t,this.ctx,{seriesIndex:e,dataPointIndex:i,w:s}])}},{key:"create",value:function(t,e,i,s,a){var n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,r=this.w,o=e;"mouseup"===t.type&&this.markerClick(t,i,s),null===n&&(n=r.config.tooltip.shared);var l=this.hasMarkers(),h=this.getElBars();if(n){if(o.tooltipLabels.drawSeriesTexts({ttItems:a,i:i,j:s,shared:!this.showOnIntersect&&r.config.tooltip.shared}),l&&(r.globals.markers.largestSize>0?o.marker.enlargePoints(s):o.tooltipPosition.moveDynamicPointsOnHover(s)),this.hasBars()&&(this.barSeriesHeight=this.tooltipUtil.getBarsHeight(h),this.barSeriesHeight>0)){var c=new f(this.ctx),d=r.globals.dom.Paper.select(".apexcharts-bar-area[j='".concat(s,"']"));this.deactivateHoverFilter(),this.tooltipPosition.moveStickyTooltipOverBars(s);for(var u=0;u<d.length;u++)c.pathMouseEnter(d[u])}}else o.tooltipLabels.drawSeriesTexts({shared:!1,ttItems:a,i:i,j:s}),this.hasBars()&&o.tooltipPosition.moveStickyTooltipOverBars(s),l&&o.tooltipPosition.moveMarkers(i,s)}}]),t}(),bt=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w,this.ev=this.w.config.chart.events,this.localeValues=this.w.globals.locale.toolbar}return s(t,[{key:"createToolbar",value:function(){var t=this.w,e=document.createElement("div");if(e.setAttribute("class","apexcharts-toolbar"),t.globals.dom.elWrap.appendChild(e),this.elZoom=document.createElement("div"),this.elZoomIn=document.createElement("div"),this.elZoomOut=document.createElement("div"),this.elPan=document.createElement("div"),this.elSelection=document.createElement("div"),this.elZoomReset=document.createElement("div"),this.elMenuIcon=document.createElement("div"),this.elMenu=document.createElement("div"),this.elCustomIcons=[],this.t=t.config.chart.toolbar.tools,Array.isArray(this.t.customIcons))for(var i=0;i<this.t.customIcons.length;i++)this.elCustomIcons.push(document.createElement("div"));this.elMenuItems=[];var s=[];this.t.zoomin&&t.config.chart.zoom.enabled&&s.push({el:this.elZoomIn,icon:"string"==typeof this.t.zoomin?this.t.zoomin:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n    <path d="M0 0h24v24H0z" fill="none"/>\n    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>\n</svg>\n',title:this.localeValues.zoomIn,class:"apexcharts-zoom-in-icon"}),this.t.zoomout&&t.config.chart.zoom.enabled&&s.push({el:this.elZoomOut,icon:"string"==typeof this.t.zoomout?this.t.zoomout:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n    <path d="M0 0h24v24H0z" fill="none"/>\n    <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>\n</svg>\n',title:this.localeValues.zoomOut,class:"apexcharts-zoom-out-icon"}),this.t.zoom&&t.config.chart.zoom.enabled&&s.push({el:this.elZoom,icon:"string"==typeof this.t.zoom?this.t.zoom:'<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">\n    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>\n    <path d="M0 0h24v24H0V0z" fill="none"/>\n    <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>\n</svg>',title:this.localeValues.selectionZoom,class:t.globals.isTouchDevice?"hidden":"apexcharts-zoom-icon"}),this.t.selection&&t.config.chart.selection.enabled&&s.push({el:this.elSelection,icon:"string"==typeof this.t.selection?this.t.selection:'<svg fill="#6E8192" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M0 0h24v24H0z" fill="none"/>\n    <path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2z"/>\n</svg>',title:this.localeValues.selection,class:t.globals.isTouchDevice?"hidden":"apexcharts-selection-icon"}),this.t.pan&&t.config.chart.zoom.enabled&&s.push({el:this.elPan,icon:"string"==typeof this.t.pan?this.t.pan:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="24" viewBox="0 0 24 24" width="24">\n    <defs>\n        <path d="M0 0h24v24H0z" id="a"/>\n    </defs>\n    <clipPath id="b">\n        <use overflow="visible" xlink:href="#a"/>\n    </clipPath>\n    <path clip-path="url(#b)" d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"/>\n</svg>',title:this.localeValues.pan,class:t.globals.isTouchDevice?"hidden":"apexcharts-pan-icon"}),this.t.reset&&t.config.chart.zoom.enabled&&s.push({el:this.elZoomReset,icon:"string"==typeof this.t.reset?this.t.reset:'<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">\n    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>\n    <path d="M0 0h24v24H0z" fill="none"/>\n</svg>',title:this.localeValues.reset,class:"apexcharts-reset-zoom-icon"}),this.t.download&&s.push({el:this.elMenuIcon,icon:"string"==typeof this.t.download?this.t.download:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',title:this.localeValues.menu,class:"apexcharts-menu-icon"});for(var a=0;a<this.elCustomIcons.length;a++)s.push({el:this.elCustomIcons[a],icon:this.t.customIcons[a].icon,title:this.t.customIcons[a].title,index:this.t.customIcons[a].index,class:"apexcharts-toolbar-custom-icon "+this.t.customIcons[a].class});s.forEach(function(t,e){t.index&&d.moveIndexInArray(s,e,t.index)});for(var n=0;n<s.length;n++)f.setAttrs(s[n].el,{class:s[n].class,title:s[n].title}),s[n].el.innerHTML=s[n].icon,e.appendChild(s[n].el);e.appendChild(this.elMenu),f.setAttrs(this.elMenu,{class:"apexcharts-menu"});for(var r=[{name:"exportSVG",title:this.localeValues.exportToSVG},{name:"exportPNG",title:this.localeValues.exportToPNG}],o=0;o<r.length;o++)this.elMenuItems.push(document.createElement("div")),this.elMenuItems[o].innerHTML=r[o].title,f.setAttrs(this.elMenuItems[o],{class:"apexcharts-menu-item ".concat(r[o].name),title:r[o].title}),this.elMenu.appendChild(this.elMenuItems[o]);t.globals.zoomEnabled?this.elZoom.classList.add("selected"):t.globals.panEnabled?this.elPan.classList.add("selected"):t.globals.selectionEnabled&&this.elSelection.classList.add("selected"),this.addToolbarEventListeners()}},{key:"addToolbarEventListeners",value:function(){var t=this;this.elZoomReset.addEventListener("click",this.handleZoomReset.bind(this)),this.elSelection.addEventListener("click",this.toggleSelection.bind(this)),this.elZoom.addEventListener("click",this.toggleZooming.bind(this)),this.elZoomIn.addEventListener("click",this.handleZoomIn.bind(this)),this.elZoomOut.addEventListener("click",this.handleZoomOut.bind(this)),this.elPan.addEventListener("click",this.togglePanning.bind(this)),this.elMenuIcon.addEventListener("click",this.toggleMenu.bind(this)),this.elMenuItems.forEach(function(e){e.classList.contains("exportSVG")?e.addEventListener("click",t.downloadSVG.bind(t)):e.classList.contains("exportPNG")&&e.addEventListener("click",t.downloadPNG.bind(t))});for(var e=0;e<this.t.customIcons.length;e++)this.elCustomIcons[e].addEventListener("click",this.t.customIcons[e].click)}},{key:"toggleSelection",value:function(){this.toggleOtherControls(),this.w.globals.selectionEnabled=!this.w.globals.selectionEnabled,this.elSelection.classList.contains("selected")?this.elSelection.classList.remove("selected"):this.elSelection.classList.add("selected")}},{key:"toggleZooming",value:function(){this.toggleOtherControls(),this.w.globals.zoomEnabled=!this.w.globals.zoomEnabled,this.elZoom.classList.contains("selected")?this.elZoom.classList.remove("selected"):this.elZoom.classList.add("selected")}},{key:"getToolbarIconsReference",value:function(){var t=this.w;this.elZoom||(this.elZoom=t.globals.dom.baseEl.querySelector(".apexcharts-zoom-icon")),this.elPan||(this.elPan=t.globals.dom.baseEl.querySelector(".apexcharts-pan-icon")),this.elSelection||(this.elSelection=t.globals.dom.baseEl.querySelector(".apexcharts-selection-icon"))}},{key:"enableZooming",value:function(){this.toggleOtherControls(),this.w.globals.zoomEnabled=!0,this.elZoom&&this.elZoom.classList.add("selected"),this.elPan&&this.elPan.classList.remove("selected")}},{key:"enablePanning",value:function(){this.toggleOtherControls(),this.w.globals.panEnabled=!0,this.elPan&&this.elPan.classList.add("selected"),this.elZoom&&this.elZoom.classList.remove("selected")}},{key:"togglePanning",value:function(){this.toggleOtherControls(),this.w.globals.panEnabled=!this.w.globals.panEnabled,this.elPan.classList.contains("selected")?this.elPan.classList.remove("selected"):this.elPan.classList.add("selected")}},{key:"toggleOtherControls",value:function(){var t=this.w;t.globals.panEnabled=!1,t.globals.zoomEnabled=!1,t.globals.selectionEnabled=!1,this.getToolbarIconsReference(),this.elPan&&this.elPan.classList.remove("selected"),this.elSelection&&this.elSelection.classList.remove("selected"),this.elZoom&&this.elZoom.classList.remove("selected")}},{key:"handleZoomIn",value:function(){var t=this.w,e=(t.globals.minX+t.globals.maxX)/2,i=(t.globals.minX+e)/2,s=(t.globals.maxX+e)/2;t.globals.disableZoomIn||this.zoomUpdateOptions(i,s)}},{key:"handleZoomOut",value:function(){var t=this.w;if(!("datetime"===t.config.xaxis.type&&new Date(t.globals.minX).getUTCFullYear()<1e3)){var e=(t.globals.minX+t.globals.maxX)/2,i=t.globals.minX-(e-t.globals.minX),s=t.globals.maxX-(e-t.globals.maxX);t.globals.disableZoomOut||this.zoomUpdateOptions(i,s)}}},{key:"zoomUpdateOptions",value:function(t,e){var i={min:t,max:e},s=this.getBeforeZoomRange(i);s&&(i=s.xaxis),this.w.globals.zoomed=!0,this.ctx._updateOptions({xaxis:i},!1,this.w.config.chart.animations.dynamicAnimation.enabled),this.zoomCallback(i)}},{key:"zoomCallback",value:function(t,e){"function"==typeof this.ev.zoomed&&this.ev.zoomed(this.ctx,{xaxis:t,yaxis:e})}},{key:"getBeforeZoomRange",value:function(t,e){var i=null;return"function"==typeof this.ev.beforeZoom&&(i=this.ev.beforeZoom(this,{xaxis:t,yaxis:e})),i}},{key:"toggleMenu",value:function(){this.elMenu.classList.contains("open")?this.elMenu.classList.remove("open"):this.elMenu.classList.add("open")}},{key:"downloadPNG",value:function(){var t=new nt(this.ctx);t.exportToPng(this.ctx),this.toggleMenu()}},{key:"downloadSVG",value:function(){var t=new nt(this.ctx);t.exportToSVG(),this.toggleMenu()}},{key:"handleZoomReset",value:function(t){var e=this;this.ctx.getSyncedCharts().forEach(function(t){var i=t.w;i.globals.minX!==i.globals.initialminX&&i.globals.maxX!==i.globals.initialmaxX&&(t.revertDefaultAxisMinMax(),"function"==typeof i.config.chart.events.zoomed&&e.zoomCallback({min:i.config.xaxis.min,max:i.config.xaxis.max}),i.globals.zoomed=!1,t._updateSeries(i.globals.initialSeries,i.config.chart.animations.dynamicAnimation.enabled))})}},{key:"destroy",value:function(){this.elZoomReset&&(this.elZoomReset.removeEventListener("click",this.handleZoomReset.bind(this)),this.elSelection.removeEventListener("click",this.toggleSelection.bind(this)),this.elZoom.removeEventListener("click",this.toggleZooming.bind(this)),this.elZoomIn.removeEventListener("click",this.handleZoomIn.bind(this)),this.elZoomOut.removeEventListener("click",this.handleZoomOut.bind(this)),this.elPan.removeEventListener("click",this.togglePanning.bind(this)),this.elMenuIcon.removeEventListener("click",this.toggleMenu.bind(this))),this.elZoom=null,this.elZoomIn=null,this.elZoomOut=null,this.elPan=null,this.elSelection=null,this.elZoomReset=null,this.elMenuIcon=null}}]),t}(),mt=function(t){function i(t){var s;return e(this,i),(s=h(this,o(i).call(this,t))).ctx=t,s.w=t.w,s.dragged=!1,s.graphics=new f(s.ctx),s.eventList=["mousedown","mousemove","touchstart","touchmove","mouseup","touchend"],s.clientX=0,s.clientY=0,s.startX=0,s.endX=0,s.dragX=0,s.startY=0,s.endY=0,s.dragY=0,s}return r(i,bt),s(i,[{key:"init",value:function(t){var e=this,i=t.xyRatios,s=this.w,a=this;this.xyRatios=i,this.zoomRect=this.graphics.drawRect(0,0,0,0),this.selectionRect=this.graphics.drawRect(0,0,0,0),this.gridRect=s.globals.dom.baseEl.querySelector(".apexcharts-grid"),this.zoomRect.node.classList.add("apexcharts-zoom-rect"),this.selectionRect.node.classList.add("apexcharts-selection-rect"),s.globals.dom.elGraphical.add(this.zoomRect),s.globals.dom.elGraphical.add(this.selectionRect),"x"===s.config.chart.selection.type?this.slDraggableRect=this.selectionRect.draggable({minX:0,minY:0,maxX:s.globals.gridWidth,maxY:s.globals.gridHeight}).on("dragmove",this.selectionDragging.bind(this,"dragging")):"y"===s.config.chart.selection.type?this.slDraggableRect=this.selectionRect.draggable({minX:0,maxX:s.globals.gridWidth}).on("dragmove",this.selectionDragging.bind(this,"dragging")):this.slDraggableRect=this.selectionRect.draggable().on("dragmove",this.selectionDragging.bind(this,"dragging")),this.preselectedSelection(),this.hoverArea=s.globals.dom.baseEl.querySelector(s.globals.chartClass),this.hoverArea.classList.add("zoomable"),this.eventList.forEach(function(t){e.hoverArea.addEventListener(t,a.svgMouseEvents.bind(a,i),{capture:!1,passive:!0})})}},{key:"destroy",value:function(){var t=this,e=this;this.eventList.forEach(function(i){t.hoverArea&&t.hoverArea.removeEventListener(i,e.svgMouseEvents.bind(e,e.xyRatios),{capture:!1,passive:!0})}),this.slDraggableRect&&(this.slDraggableRect.draggable(!1),this.slDraggableRect.off(),this.selectionRect.off()),this.selectionRect=null,this.zoomRect=null,this.gridRect=null}},{key:"svgMouseEvents",value:function(t,e){var i=this.w,s=this,a=this.ctx.toolbar,n=i.globals.zoomEnabled?i.config.chart.zoom.type:i.config.chart.selection.type;if(e.shiftKey?(this.shiftWasPressed=!0,a.enablePanning()):this.shiftWasPressed&&(a.enableZooming(),this.shiftWasPressed=!1),!(e.target.classList.contains("apexcharts-selection-rect")||e.target.parentNode.classList.contains("apexcharts-toolbar"))){if(s.clientX="touchmove"===e.type||"touchstart"===e.type?e.touches[0].clientX:"touchend"===e.type?e.changedTouches[0].clientX:e.clientX,s.clientY="touchmove"===e.type||"touchstart"===e.type?e.touches[0].clientY:"touchend"===e.type?e.changedTouches[0].clientY:e.clientY,"mousedown"===e.type&&1===e.which){var r=s.gridRect.getBoundingClientRect();s.startX=s.clientX-r.left,s.startY=s.clientY-r.top,s.dragged=!1,s.w.globals.mousedown=!0}if(("mousemove"===e.type&&1===e.which||"touchmove"===e.type)&&(s.dragged=!0,i.globals.panEnabled?(i.globals.selection=null,s.w.globals.mousedown&&s.panDragging({context:s,zoomtype:n,xyRatios:t})):(s.w.globals.mousedown&&i.globals.zoomEnabled||s.w.globals.mousedown&&i.globals.selectionEnabled)&&(s.selection=s.selectionDrawing({context:s,zoomtype:n}))),"mouseup"===e.type||"touchend"===e.type){var o=s.gridRect.getBoundingClientRect();s.w.globals.mousedown&&(s.endX=s.clientX-o.left,s.endY=s.clientY-o.top,s.dragX=Math.abs(s.endX-s.startX),s.dragY=Math.abs(s.endY-s.startY),(i.globals.zoomEnabled||i.globals.selectionEnabled)&&s.selectionDrawn({context:s,zoomtype:n})),i.globals.zoomEnabled&&s.hideSelectionRect(this.selectionRect),s.dragged=!1,s.w.globals.mousedown=!1}this.makeSelectionRectDraggable()}}},{key:"makeSelectionRectDraggable",value:function(){var t=this.w;if(this.selectionRect){var e=this.selectionRect.node.getBoundingClientRect();e.width>0&&e.height>0&&this.slDraggableRect.selectize().resize({constraint:{minX:0,minY:0,maxX:t.globals.gridWidth,maxY:t.globals.gridHeight}}).on("resizing",this.selectionDragging.bind(this,"resizing"))}}},{key:"preselectedSelection",value:function(){var t=this.w,e=this.xyRatios;if(!t.globals.zoomEnabled)if(void 0!==t.globals.selection&&null!==t.globals.selection)this.drawSelectionRect(t.globals.selection);else if(void 0!==t.config.chart.selection.xaxis.min&&void 0!==t.config.chart.selection.xaxis.max){var i=(t.config.chart.selection.xaxis.min-t.globals.minX)/e.xRatio,s={x:i,y:0,width:t.globals.gridWidth-(t.globals.maxX-t.config.chart.selection.xaxis.max)/e.xRatio-i,height:t.globals.gridHeight,translateX:0,translateY:0,selectionEnabled:!0};this.drawSelectionRect(s),this.makeSelectionRectDraggable(),"function"==typeof t.config.chart.events.selection&&t.config.chart.events.selection(this.ctx,{xaxis:{min:t.config.chart.selection.xaxis.min,max:t.config.chart.selection.xaxis.max},yaxis:{}})}}},{key:"drawSelectionRect",value:function(t){var e=t.x,i=t.y,s=t.width,a=t.height,n=t.translateX,r=t.translateY,o=this.w,l=this.zoomRect,h=this.selectionRect;if(this.dragged||null!==o.globals.selection){var c={transform:"translate("+n+", "+r+")"};o.globals.zoomEnabled&&this.dragged&&(l.attr({x:e,y:i,width:s,height:a,fill:o.config.chart.zoom.zoomedArea.fill.color,"fill-opacity":o.config.chart.zoom.zoomedArea.fill.opacity,stroke:o.config.chart.zoom.zoomedArea.stroke.color,"stroke-width":o.config.chart.zoom.zoomedArea.stroke.width,"stroke-opacity":o.config.chart.zoom.zoomedArea.stroke.opacity}),f.setAttrs(l.node,c)),o.globals.selectionEnabled&&(h.attr({x:e,y:i,width:s>0?s:0,height:a>0?a:0,fill:o.config.chart.selection.fill.color,"fill-opacity":o.config.chart.selection.fill.opacity,stroke:o.config.chart.selection.stroke.color,"stroke-width":o.config.chart.selection.stroke.width,"stroke-dasharray":o.config.chart.selection.stroke.dashArray,"stroke-opacity":o.config.chart.selection.stroke.opacity}),f.setAttrs(h.node,c))}}},{key:"hideSelectionRect",value:function(t){t&&t.attr({x:0,y:0,width:0,height:0})}},{key:"selectionDrawing",value:function(t){var e=t.context,i=t.zoomtype,s=this.w,a=e,n=this.gridRect.getBoundingClientRect(),r=a.startX-1,o=a.startY,l=a.clientX-n.left-r,h=a.clientY-n.top-o,c=0,d=0,u={};return(Math.abs(l+r)>s.globals.gridWidth||a.clientX-n.left<0)&&(a.hideSelectionRect(this.zoomRect),a.dragged=!1,a.w.globals.mousedown=!1),r>a.clientX-n.left&&(c=-(l=Math.abs(l))),o>a.clientY-n.top&&(d=-(h=Math.abs(h))),u="x"===i?{x:r,y:0,width:l,height:s.globals.gridHeight,translateX:c,translateY:0}:"y"===i?{x:0,y:o,width:s.globals.gridWidth,height:h,translateX:0,translateY:d}:{x:r,y:o,width:l,height:h,translateX:c,translateY:d},a.drawSelectionRect(u),a.selectionDragging("resizing"),u}},{key:"selectionDragging",value:function(t,e){var i=this,s=this.w,a=this.xyRatios,n=this.selectionRect,r=0;"resizing"===t&&(r=30),"function"==typeof s.config.chart.events.selection&&(clearTimeout(this.w.globals.selectionResizeTimer),this.w.globals.selectionResizeTimer=window.setTimeout(function(){var t=i.gridRect.getBoundingClientRect(),e=n.node.getBoundingClientRect(),r=s.globals.xAxisScale.niceMin+(e.left-t.left)*a.xRatio,o=s.globals.xAxisScale.niceMin+(e.right-t.left)*a.xRatio,l=s.globals.yAxisScale[0].niceMin+(t.bottom-e.bottom)*a.yRatio[0],h=s.globals.yAxisScale[0].niceMax-(e.top-t.top)*a.yRatio[0];s.config.chart.events.selection(i.ctx,{xaxis:{min:r,max:o},yaxis:{min:l,max:h}})},r))}},{key:"selectionDrawn",value:function(t){var e=t.context,i=t.zoomtype,s=this.w,a=e,n=this.xyRatios,r=this.ctx.toolbar;if(a.startX>a.endX){var o=a.startX;a.startX=a.endX,a.endX=o}if(a.startY>a.endY){var l=a.startY;a.startY=a.endY,a.endY=l}var h=s.globals.xAxisScale.niceMin+a.startX*n.xRatio,c=s.globals.xAxisScale.niceMin+a.endX*n.xRatio,u=[],g=[];if(s.config.yaxis.forEach(function(t,e){u.push(Math.floor(s.globals.yAxisScale[e].niceMax-n.yRatio[e]*a.startY)),g.push(Math.floor(s.globals.yAxisScale[e].niceMax-n.yRatio[e]*a.endY))}),a.dragged&&(a.dragX>10||a.dragY>10)&&h!==c)if(s.globals.zoomEnabled){var f=d.clone(s.config.yaxis);s.globals.zoomed||(s.globals.lastXAxis=d.clone(s.config.xaxis),s.globals.lastYAxis=d.clone(s.config.yaxis));var p={min:h,max:c};if("xy"!==i&&"y"!==i||f.forEach(function(t,e){f[e].min=g[e],f[e].max=u[e]}),s.config.chart.zoom.autoScaleYaxis){var x=new B(a.ctx);f=x.autoScaleY(a.ctx,{xaxis:p})}if(r){var b=r.getBeforeZoomRange(p,f);b&&(p=b.xaxis?b.xaxis:p,f=b.yaxis?b.yaxe:f)}a.ctx._updateOptions({xaxis:p,yaxis:f},!1,a.w.config.chart.animations.dynamicAnimation.enabled),"function"==typeof s.config.chart.events.zoomed&&r.zoomCallback(p,f),s.globals.zoomed=!0}else if(s.globals.selectionEnabled){var m,v=null;m={min:h,max:c},"xy"!==i&&"y"!==i||(v=d.clone(s.config.yaxis)).forEach(function(t,e){v[e].min=g[e],v[e].max=u[e]}),s.globals.selection=a.selection,"function"==typeof s.config.chart.events.selection&&s.config.chart.events.selection(a.ctx,{xaxis:m,yaxis:v})}}},{key:"panDragging",value:function(t){var e,i=t.context,s=(t.zoomtype,this.w),a=i;if(void 0!==s.globals.lastClientPosition.x){var n=s.globals.lastClientPosition.x-a.clientX,r=s.globals.lastClientPosition.y-a.clientY;Math.abs(n)>Math.abs(r)&&n>0?e="left":Math.abs(n)>Math.abs(r)&&n<0?e="right":Math.abs(r)>Math.abs(n)&&r>0?e="up":Math.abs(r)>Math.abs(n)&&r<0&&(e="down")}s.globals.lastClientPosition={x:a.clientX,y:a.clientY};var o=s.globals.minX,l=s.globals.maxX;this.panScrolled(e,o,l)}},{key:"panScrolled",value:function(t,e,i){var s=this.w,a=this.xyRatios,n=d.clone(s.config.yaxis);"left"===t?(e=s.globals.minX+s.globals.gridWidth/15*a.xRatio,i=s.globals.maxX+s.globals.gridWidth/15*a.xRatio):"right"===t&&(e=s.globals.minX-s.globals.gridWidth/15*a.xRatio,i=s.globals.maxX-s.globals.gridWidth/15*a.xRatio),(e<s.globals.initialminX||i>s.globals.initialmaxX)&&(e=s.globals.minX,i=s.globals.maxX);var r={min:e,max:i};s.config.chart.zoom.autoScaleYaxis&&(n=new B(me.ctx).autoScaleY(me.ctx,{xaxis:r}));this.ctx._updateOptions({xaxis:{min:e,max:i},yaxis:n},!1,!1),"function"==typeof s.config.chart.events.scrolled&&s.config.chart.events.scrolled(this.ctx,{xaxis:{min:e,max:i}})}}]),i}(),vt=function(){function t(i){e(this,t),this.ctx=i,this.w=i.w}return s(t,[{key:"draw",value:function(){this.drawTitleSubtitle("title"),this.drawTitleSubtitle("subtitle")}},{key:"drawTitleSubtitle",value:function(t){var e=this.w,i="title"===t?e.config.title:e.config.subtitle,s=e.globals.svgWidth/2,a=i.offsetY,n="middle";if("left"===i.align?(s=10,n="start"):"right"===i.align&&(s=e.globals.svgWidth-10,n="end"),s+=i.offsetX,a=a+parseInt(i.style.fontSize)+2,void 0!==i.text){var r=new f(this.ctx).drawText({x:s,y:a,text:i.text,textAnchor:n,fontSize:i.style.fontSize,fontFamily:i.style.fontFamily,foreColor:i.style.color,opacity:1});r.node.setAttribute("class","apexcharts-".concat(t,"-text")),e.globals.dom.Paper.add(r)}}}]),t}();st="undefined"!=typeof window?window:void 0,at=function(e,i){var s=(void 0!==this?this:e).SVG=function(t){if(s.supported)return t=new s.Doc(t),s.parser.draw||s.prepare(),t};if(s.ns="http://www.w3.org/2000/svg",s.xmlns="http://www.w3.org/2000/xmlns/",s.xlink="http://www.w3.org/1999/xlink",s.svgjs="http://svgjs.com/svgjs",s.supported=!0,!s.supported)return!1;s.did=1e3,s.eid=function(t){return"Svgjs"+d(t)+s.did++},s.create=function(t){var e=i.createElementNS(this.ns,t);return e.setAttribute("id",this.eid(t)),e},s.extend=function(){var t,e,i,a;for(e=(t=[].slice.call(arguments)).pop(),a=t.length-1;a>=0;a--)if(t[a])for(i in e)t[a].prototype[i]=e[i];s.Set&&s.Set.inherit&&s.Set.inherit()},s.invent=function(t){var e="function"==typeof t.create?t.create:function(){this.constructor.call(this,s.create(t.create))};return t.inherit&&(e.prototype=new t.inherit),t.extend&&s.extend(e,t.extend),t.construct&&s.extend(t.parent||s.Container,t.construct),e},s.adopt=function(t){return t?t.instance?t.instance:((i="svg"==t.nodeName?t.parentNode instanceof e.SVGElement?new s.Nested:new s.Doc:"linearGradient"==t.nodeName?new s.Gradient("linear"):"radialGradient"==t.nodeName?new s.Gradient("radial"):s[d(t.nodeName)]?new(s[d(t.nodeName)]):new s.Element(t)).type=t.nodeName,i.node=t,t.instance=i,i instanceof s.Doc&&i.namespace().defs(),i.setData(JSON.parse(t.getAttribute("svgjs:data"))||{}),i):null;var i},s.prepare=function(){var t=i.getElementsByTagName("body")[0],e=(t?new s.Doc(t):s.adopt(i.documentElement).nested()).size(2,0);s.parser={body:t||i.documentElement,draw:e.style("opacity:0;position:absolute;left:-100%;top:-100%;overflow:hidden").node,poly:e.polyline().node,path:e.path().node,native:s.create("svg")}},s.parser={native:s.create("svg")},i.addEventListener("DOMContentLoaded",function(){s.parser.draw||s.prepare()},!1),s.regex={numberAndUnit:/^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i,hex:/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,rgb:/rgb\((\d+),(\d+),(\d+)\)/,reference:/#([a-z0-9\-_]+)/i,transforms:/\)\s*,?\s*/,whitespace:/\s/g,isHex:/^#[a-f0-9]{3,6}$/i,isRgb:/^rgb\(/,isCss:/[^:]+:[^;]+;?/,isBlank:/^(\s+)?$/,isNumber:/^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,isPercent:/^-?[\d\.]+%$/,isImage:/\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i,delimiter:/[\s,]+/,hyphen:/([^e])\-/gi,pathLetters:/[MLHVCSQTAZ]/gi,isPathLetter:/[MLHVCSQTAZ]/i,numbersWithDots:/((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi,dots:/\./g},s.utils={map:function(t,e){var i,s=t.length,a=[];for(i=0;i<s;i++)a.push(e(t[i]));return a},filter:function(t,e){var i,s=t.length,a=[];for(i=0;i<s;i++)e(t[i])&&a.push(t[i]);return a},radians:function(t){return t%360*Math.PI/180},degrees:function(t){return 180*t/Math.PI%360},filterSVGElements:function(t){return this.filter(t,function(t){return t instanceof e.SVGElement})}},s.defaults={attrs:{"fill-opacity":1,"stroke-opacity":1,"stroke-width":0,"stroke-linejoin":"miter","stroke-linecap":"butt",fill:"#000000",stroke:"#000000",opacity:1,x:0,y:0,cx:0,cy:0,width:0,height:0,r:0,rx:0,ry:0,offset:0,"stop-opacity":1,"stop-color":"#000000","font-size":16,"font-family":"Helvetica, Arial, sans-serif","text-anchor":"start"}},s.Color=function(e){var i,a;(this.r=0,this.g=0,this.b=0,e)&&("string"==typeof e?s.regex.isRgb.test(e)?(i=s.regex.rgb.exec(e.replace(s.regex.whitespace,"")),this.r=parseInt(i[1]),this.g=parseInt(i[2]),this.b=parseInt(i[3])):s.regex.isHex.test(e)&&(i=s.regex.hex.exec(4==(a=e).length?["#",a.substring(1,2),a.substring(1,2),a.substring(2,3),a.substring(2,3),a.substring(3,4),a.substring(3,4)].join(""):a),this.r=parseInt(i[1],16),this.g=parseInt(i[2],16),this.b=parseInt(i[3],16)):"object"===t(e)&&(this.r=e.r,this.g=e.g,this.b=e.b))},s.extend(s.Color,{toString:function(){return this.toHex()},toHex:function(){return"#"+u(this.r)+u(this.g)+u(this.b)},toRgb:function(){return"rgb("+[this.r,this.g,this.b].join()+")"},brightness:function(){return this.r/255*.3+this.g/255*.59+this.b/255*.11},morph:function(t){return this.destination=new s.Color(t),this},at:function(t){return this.destination?(t=t<0?0:t>1?1:t,new s.Color({r:~~(this.r+(this.destination.r-this.r)*t),g:~~(this.g+(this.destination.g-this.g)*t),b:~~(this.b+(this.destination.b-this.b)*t)})):this}}),s.Color.test=function(t){return t+="",s.regex.isHex.test(t)||s.regex.isRgb.test(t)},s.Color.isRgb=function(t){return t&&"number"==typeof t.r&&"number"==typeof t.g&&"number"==typeof t.b},s.Color.isColor=function(t){return s.Color.isRgb(t)||s.Color.test(t)},s.Array=function(t,e){0==(t=(t||[]).valueOf()).length&&e&&(t=e.valueOf()),this.value=this.parse(t)},s.extend(s.Array,{morph:function(t){if(this.destination=this.parse(t),this.value.length!=this.destination.length){for(var e=this.value[this.value.length-1],i=this.destination[this.destination.length-1];this.value.length>this.destination.length;)this.destination.push(i);for(;this.value.length<this.destination.length;)this.value.push(e)}return this},settle:function(){for(var t=0,e=this.value.length,i=[];t<e;t++)-1==i.indexOf(this.value[t])&&i.push(this.value[t]);return this.value=i},at:function(t){if(!this.destination)return this;for(var e=0,i=this.value.length,a=[];e<i;e++)a.push(this.value[e]+(this.destination[e]-this.value[e])*t);return new s.Array(a)},toString:function(){return this.value.join(" ")},valueOf:function(){return this.value},parse:function(t){return t=t.valueOf(),Array.isArray(t)?t:this.split(t)},split:function(t){return t.trim().split(s.regex.delimiter).map(parseFloat)},reverse:function(){return this.value.reverse(),this},clone:function(){var t=new this.constructor;return t.value=function t(e){var i=e.slice(0);for(var s=i.length;s--;)Array.isArray(i[s])&&(i[s]=t(i[s]));return i}(this.value),t}}),s.PointArray=function(t,e){s.Array.call(this,t,e||[[0,0]])},s.PointArray.prototype=new s.Array,s.PointArray.prototype.constructor=s.PointArray,s.extend(s.PointArray,{toString:function(){for(var t=0,e=this.value.length,i=[];t<e;t++)i.push(this.value[t].join(","));return i.join(" ")},toLine:function(){return{x1:this.value[0][0],y1:this.value[0][1],x2:this.value[1][0],y2:this.value[1][1]}},at:function(t){if(!this.destination)return this;for(var e=0,i=this.value.length,a=[];e<i;e++)a.push([this.value[e][0]+(this.destination[e][0]-this.value[e][0])*t,this.value[e][1]+(this.destination[e][1]-this.value[e][1])*t]);return new s.PointArray(a)},parse:function(t){var e=[];if(t=t.valueOf(),Array.isArray(t)){if(Array.isArray(t[0]))return t.map(function(t){return t.slice()});if(null!=t[0].x)return t.map(function(t){return[t.x,t.y]})}else t=t.trim().split(s.regex.delimiter).map(parseFloat);t.length%2!=0&&t.pop();for(var i=0,a=t.length;i<a;i+=2)e.push([t[i],t[i+1]]);return e},move:function(t,e){var i=this.bbox();if(t-=i.x,e-=i.y,!isNaN(t)&&!isNaN(e))for(var s=this.value.length-1;s>=0;s--)this.value[s]=[this.value[s][0]+t,this.value[s][1]+e];return this},size:function(t,e){var i,s=this.bbox();for(i=this.value.length-1;i>=0;i--)s.width&&(this.value[i][0]=(this.value[i][0]-s.x)*t/s.width+s.x),s.height&&(this.value[i][1]=(this.value[i][1]-s.y)*e/s.height+s.y);return this},bbox:function(){return s.parser.draw||s.prepare(),s.parser.poly.setAttribute("points",this.toString()),s.parser.poly.getBBox()}});for(var a={M:function(t,e,i){return e.x=i.x=t[0],e.y=i.y=t[1],["M",e.x,e.y]},L:function(t,e){return e.x=t[0],e.y=t[1],["L",t[0],t[1]]},H:function(t,e){return e.x=t[0],["H",t[0]]},V:function(t,e){return e.y=t[0],["V",t[0]]},C:function(t,e){return e.x=t[4],e.y=t[5],["C",t[0],t[1],t[2],t[3],t[4],t[5]]},S:function(t,e){return e.x=t[2],e.y=t[3],["S",t[0],t[1],t[2],t[3]]},Q:function(t,e){return e.x=t[2],e.y=t[3],["Q",t[0],t[1],t[2],t[3]]},T:function(t,e){return e.x=t[0],e.y=t[1],["T",t[0],t[1]]},Z:function(t,e,i){return e.x=i.x,e.y=i.y,["Z"]},A:function(t,e){return e.x=t[5],e.y=t[6],["A",t[0],t[1],t[2],t[3],t[4],t[5],t[6]]}},n="mlhvqtcsaz".split(""),r=0,o=n.length;r<o;++r)a[n[r]]=function(t){return function(e,i,s){if("H"==t)e[0]=e[0]+i.x;else if("V"==t)e[0]=e[0]+i.y;else if("A"==t)e[5]=e[5]+i.x,e[6]=e[6]+i.y;else for(var n=0,r=e.length;n<r;++n)e[n]=e[n]+(n%2?i.y:i.x);return a[t](e,i,s)}}(n[r].toUpperCase());s.PathArray=function(t,e){s.Array.call(this,t,e||[["M",0,0]])},s.PathArray.prototype=new s.Array,s.PathArray.prototype.constructor=s.PathArray,s.extend(s.PathArray,{toString:function(){return function(t){for(var e=0,i=t.length,s="";e<i;e++)s+=t[e][0],null!=t[e][1]&&(s+=t[e][1],null!=t[e][2]&&(s+=" ",s+=t[e][2],null!=t[e][3]&&(s+=" ",s+=t[e][3],s+=" ",s+=t[e][4],null!=t[e][5]&&(s+=" ",s+=t[e][5],s+=" ",s+=t[e][6],null!=t[e][7]&&(s+=" ",s+=t[e][7])))));return s+" "}(this.value)},move:function(t,e){var i=this.bbox();if(t-=i.x,e-=i.y,!isNaN(t)&&!isNaN(e))for(var s,a=this.value.length-1;a>=0;a--)"M"==(s=this.value[a][0])||"L"==s||"T"==s?(this.value[a][1]+=t,this.value[a][2]+=e):"H"==s?this.value[a][1]+=t:"V"==s?this.value[a][1]+=e:"C"==s||"S"==s||"Q"==s?(this.value[a][1]+=t,this.value[a][2]+=e,this.value[a][3]+=t,this.value[a][4]+=e,"C"==s&&(this.value[a][5]+=t,this.value[a][6]+=e)):"A"==s&&(this.value[a][6]+=t,this.value[a][7]+=e);return this},size:function(t,e){var i,s,a=this.bbox();for(i=this.value.length-1;i>=0;i--)"M"==(s=this.value[i][0])||"L"==s||"T"==s?(this.value[i][1]=(this.value[i][1]-a.x)*t/a.width+a.x,this.value[i][2]=(this.value[i][2]-a.y)*e/a.height+a.y):"H"==s?this.value[i][1]=(this.value[i][1]-a.x)*t/a.width+a.x:"V"==s?this.value[i][1]=(this.value[i][1]-a.y)*e/a.height+a.y:"C"==s||"S"==s||"Q"==s?(this.value[i][1]=(this.value[i][1]-a.x)*t/a.width+a.x,this.value[i][2]=(this.value[i][2]-a.y)*e/a.height+a.y,this.value[i][3]=(this.value[i][3]-a.x)*t/a.width+a.x,this.value[i][4]=(this.value[i][4]-a.y)*e/a.height+a.y,"C"==s&&(this.value[i][5]=(this.value[i][5]-a.x)*t/a.width+a.x,this.value[i][6]=(this.value[i][6]-a.y)*e/a.height+a.y)):"A"==s&&(this.value[i][1]=this.value[i][1]*t/a.width,this.value[i][2]=this.value[i][2]*e/a.height,this.value[i][6]=(this.value[i][6]-a.x)*t/a.width+a.x,this.value[i][7]=(this.value[i][7]-a.y)*e/a.height+a.y);return this},equalCommands:function(t){var e,i,a;for(t=new s.PathArray(t),a=this.value.length===t.value.length,e=0,i=this.value.length;a&&e<i;e++)a=this.value[e][0]===t.value[e][0];return a},morph:function(t){return t=new s.PathArray(t),this.equalCommands(t)?this.destination=t:this.destination=null,this},at:function(t){if(!this.destination)return this;var e,i,a,n,r=this.value,o=this.destination.value,l=[],h=new s.PathArray;for(e=0,i=r.length;e<i;e++){for(l[e]=[r[e][0]],a=1,n=r[e].length;a<n;a++)l[e][a]=r[e][a]+(o[e][a]-r[e][a])*t;"A"===l[e][0]&&(l[e][4]=+(0!=l[e][4]),l[e][5]=+(0!=l[e][5]))}return h.value=l,h},parse:function(t){if(t instanceof s.PathArray)return t.valueOf();var e,i={M:2,L:2,H:1,V:1,C:6,S:4,Q:4,T:2,A:7,Z:0};t="string"==typeof t?t.replace(s.regex.numbersWithDots,h).replace(s.regex.pathLetters," $& ").replace(s.regex.hyphen,"$1 -").trim().split(s.regex.delimiter):t.reduce(function(t,e){return[].concat.call(t,e)},[]);var n=[],r=new s.Point,o=new s.Point,l=0,c=t.length;do{s.regex.isPathLetter.test(t[l])?(e=t[l],++l):"M"==e?e="L":"m"==e&&(e="l"),n.push(a[e].call(null,t.slice(l,l+=i[e.toUpperCase()]).map(parseFloat),r,o))}while(c>l);return n},bbox:function(){return s.parser.draw||s.prepare(),s.parser.path.setAttribute("d",this.toString()),s.parser.path.getBBox()}}),s.Number=s.invent({create:function(t,e){this.value=0,this.unit=e||"","number"==typeof t?this.value=isNaN(t)?0:isFinite(t)?t:t<0?-3.4e38:3.4e38:"string"==typeof t?(e=t.match(s.regex.numberAndUnit))&&(this.value=parseFloat(e[1]),"%"==e[5]?this.value/=100:"s"==e[5]&&(this.value*=1e3),this.unit=e[5]):t instanceof s.Number&&(this.value=t.valueOf(),this.unit=t.unit)},extend:{toString:function(){return("%"==this.unit?~~(1e8*this.value)/1e6:"s"==this.unit?this.value/1e3:this.value)+this.unit},toJSON:function(){return this.toString()},valueOf:function(){return this.value},plus:function(t){return t=new s.Number(t),new s.Number(this+t,this.unit||t.unit)},minus:function(t){return t=new s.Number(t),new s.Number(this-t,this.unit||t.unit)},times:function(t){return t=new s.Number(t),new s.Number(this*t,this.unit||t.unit)},divide:function(t){return t=new s.Number(t),new s.Number(this/t,this.unit||t.unit)},to:function(t){var e=new s.Number(this);return"string"==typeof t&&(e.unit=t),e},morph:function(t){return this.destination=new s.Number(t),t.relative&&(this.destination.value+=this.value),this},at:function(t){return this.destination?new s.Number(this.destination).minus(this).times(t).plus(this):this}}}),s.Element=s.invent({create:function(t){this._stroke=s.defaults.attrs.stroke,this._event=null,this.dom={},(this.node=t)&&(this.type=t.nodeName,this.node.instance=this,this._stroke=t.getAttribute("stroke")||this._stroke)},extend:{x:function(t){return this.attr("x",t)},y:function(t){return this.attr("y",t)},cx:function(t){return null==t?this.x()+this.width()/2:this.x(t-this.width()/2)},cy:function(t){return null==t?this.y()+this.height()/2:this.y(t-this.height()/2)},move:function(t,e){return this.x(t).y(e)},center:function(t,e){return this.cx(t).cy(e)},width:function(t){return this.attr("width",t)},height:function(t){return this.attr("height",t)},size:function(t,e){var i=g(this,t,e);return this.width(new s.Number(i.width)).height(new s.Number(i.height))},clone:function(t){this.writeDataToDom();var e=b(this.node.cloneNode(!0));return t?t.add(e):this.after(e),e},remove:function(){return this.parent()&&this.parent().removeElement(this),this},replace:function(t){return this.after(t).remove(),t},addTo:function(t){return t.put(this)},putIn:function(t){return t.add(this)},id:function(t){return this.attr("id",t)},inside:function(t,e){var i=this.bbox();return t>i.x&&e>i.y&&t<i.x+i.width&&e<i.y+i.height},show:function(){return this.style("display","")},hide:function(){return this.style("display","none")},visible:function(){return"none"!=this.style("display")},toString:function(){return this.attr("id")},classes:function(){var t=this.attr("class");return null==t?[]:t.trim().split(s.regex.delimiter)},hasClass:function(t){return-1!=this.classes().indexOf(t)},addClass:function(t){if(!this.hasClass(t)){var e=this.classes();e.push(t),this.attr("class",e.join(" "))}return this},removeClass:function(t){return this.hasClass(t)&&this.attr("class",this.classes().filter(function(e){return e!=t}).join(" ")),this},toggleClass:function(t){return this.hasClass(t)?this.removeClass(t):this.addClass(t)},reference:function(t){return s.get(this.attr(t))},parent:function(t){var i=this;if(!i.node.parentNode)return null;if(i=s.adopt(i.node.parentNode),!t)return i;for(;i&&i.node instanceof e.SVGElement;){if("string"==typeof t?i.matches(t):i instanceof t)return i;if(!i.node.parentNode||"#document"==i.node.parentNode.nodeName)return null;i=s.adopt(i.node.parentNode)}},doc:function(){return this instanceof s.Doc?this:this.parent(s.Doc)},parents:function(t){var e=[],i=this;do{if(!(i=i.parent(t))||!i.node)break;e.push(i)}while(i.parent);return e},matches:function(t){return function(t,e){return(t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.webkitMatchesSelector||t.oMatchesSelector).call(t,e)}(this.node,t)},native:function(){return this.node},svg:function(t){var e=i.createElement("svg");if(!(t&&this instanceof s.Parent))return e.appendChild(t=i.createElement("svg")),this.writeDataToDom(),t.appendChild(this.node.cloneNode(!0)),e.innerHTML.replace(/^<svg>/,"").replace(/<\/svg>$/,"");e.innerHTML="<svg>"+t.replace(/\n/,"").replace(/<([\w:-]+)([^<]+?)\/>/g,"<$1$2></$1>")+"</svg>";for(var a=0,n=e.firstChild.childNodes.length;a<n;a++)this.node.appendChild(e.firstChild.firstChild);return this},writeDataToDom:function(){(this.each||this.lines)&&(this.each?this:this.lines()).each(function(){this.writeDataToDom()});return this.node.removeAttribute("svgjs:data"),Object.keys(this.dom).length&&this.node.setAttribute("svgjs:data",JSON.stringify(this.dom)),this},setData:function(t){return this.dom=t,this},is:function(t){return function(t,e){return t instanceof e}(this,t)}}}),s.easing={"-":function(t){return t},"<>":function(t){return-Math.cos(t*Math.PI)/2+.5},">":function(t){return Math.sin(t*Math.PI/2)},"<":function(t){return 1-Math.cos(t*Math.PI/2)}},s.morph=function(t){return function(e,i){return new s.MorphObj(e,i).at(t)}},s.Situation=s.invent({create:function(t){this.init=!1,this.reversed=!1,this.reversing=!1,this.duration=new s.Number(t.duration).valueOf(),this.delay=new s.Number(t.delay).valueOf(),this.start=+new Date+this.delay,this.finish=this.start+this.duration,this.ease=t.ease,this.loop=0,this.loops=!1,this.animations={},this.attrs={},this.styles={},this.transforms=[],this.once={}}}),s.FX=s.invent({create:function(t){this._target=t,this.situations=[],this.active=!1,this.situation=null,this.paused=!1,this.lastPos=0,this.pos=0,this.absPos=0,this._speed=1},extend:{animate:function(e,i,a){"object"===t(e)&&(i=e.ease,a=e.delay,e=e.duration);var n=new s.Situation({duration:e||1e3,delay:a||0,ease:s.easing[i||"-"]||i});return this.queue(n),this},delay:function(t){var e=new s.Situation({duration:t,delay:0,ease:s.easing["-"]});return this.queue(e)},target:function(t){return t&&t instanceof s.Element?(this._target=t,this):this._target},timeToAbsPos:function(t){return(t-this.situation.start)/(this.situation.duration/this._speed)},absPosToTime:function(t){return this.situation.duration/this._speed*t+this.situation.start},startAnimFrame:function(){this.stopAnimFrame(),this.animationFrame=e.requestAnimationFrame(function(){this.step()}.bind(this))},stopAnimFrame:function(){e.cancelAnimationFrame(this.animationFrame)},start:function(){return!this.active&&this.situation&&(this.active=!0,this.startCurrent()),this},startCurrent:function(){return this.situation.start=+new Date+this.situation.delay/this._speed,this.situation.finish=this.situation.start+this.situation.duration/this._speed,this.initAnimations().step()},queue:function(t){return("function"==typeof t||t instanceof s.Situation)&&this.situations.push(t),this.situation||(this.situation=this.situations.shift()),this},dequeue:function(){return this.stop(),this.situation=this.situations.shift(),this.situation&&(this.situation instanceof s.Situation?this.start():this.situation.call(this)),this},initAnimations:function(){var t,e,i,a=this.situation;if(a.init)return this;for(t in a.animations)for(i=this.target()[t](),Array.isArray(i)||(i=[i]),Array.isArray(a.animations[t])||(a.animations[t]=[a.animations[t]]),e=i.length;e--;)a.animations[t][e]instanceof s.Number&&(i[e]=new s.Number(i[e])),a.animations[t][e]=i[e].morph(a.animations[t][e]);for(t in a.attrs)a.attrs[t]=new s.MorphObj(this.target().attr(t),a.attrs[t]);for(t in a.styles)a.styles[t]=new s.MorphObj(this.target().style(t),a.styles[t]);return a.initialTransformation=this.target().matrixify(),a.init=!0,this},clearQueue:function(){return this.situations=[],this},clearCurrent:function(){return this.situation=null,this},stop:function(t,e){var i=this.active;return this.active=!1,e&&this.clearQueue(),t&&this.situation&&(!i&&this.startCurrent(),this.atEnd()),this.stopAnimFrame(),this.clearCurrent()},reset:function(){if(this.situation){var t=this.situation;this.stop(),this.situation=t,this.atStart()}return this},finish:function(){for(this.stop(!0,!1);this.dequeue().situation&&this.stop(!0,!1););return this.clearQueue().clearCurrent(),this},atStart:function(){return this.at(0,!0)},atEnd:function(){return!0===this.situation.loops&&(this.situation.loops=this.situation.loop+1),"number"==typeof this.situation.loops?this.at(this.situation.loops,!0):this.at(1,!0)},at:function(t,e){var i=this.situation.duration/this._speed;return this.absPos=t,e||(this.situation.reversed&&(this.absPos=1-this.absPos),this.absPos+=this.situation.loop),this.situation.start=+new Date-this.absPos*i,this.situation.finish=this.situation.start+i,this.step(!0)},speed:function(t){return 0===t?this.pause():t?(this._speed=t,this.at(this.absPos,!0)):this._speed},loop:function(t,e){var i=this.last();return i.loops=null==t||t,i.loop=0,e&&(i.reversing=!0),this},pause:function(){return this.paused=!0,this.stopAnimFrame(),this},play:function(){return this.paused?(this.paused=!1,this.at(this.absPos,!0)):this},reverse:function(t){var e=this.last();return e.reversed=void 0===t?!e.reversed:t,this},progress:function(t){return t?this.situation.ease(this.pos):this.pos},after:function(t){var e=this.last();return this.target().on("finished.fx",function i(s){s.detail.situation==e&&(t.call(this,e),this.off("finished.fx",i))}),this._callStart()},during:function(t){var e=this.last(),i=function(i){i.detail.situation==e&&t.call(this,i.detail.pos,s.morph(i.detail.pos),i.detail.eased,e)};return this.target().off("during.fx",i).on("during.fx",i),this.after(function(){this.off("during.fx",i)}),this._callStart()},afterAll:function(t){var e=function e(i){t.call(this),this.off("allfinished.fx",e)};return this.target().off("allfinished.fx",e).on("allfinished.fx",e),this._callStart()},duringAll:function(t){var e=function(e){t.call(this,e.detail.pos,s.morph(e.detail.pos),e.detail.eased,e.detail.situation)};return this.target().off("during.fx",e).on("during.fx",e),this.afterAll(function(){this.off("during.fx",e)}),this._callStart()},last:function(){return this.situations.length?this.situations[this.situations.length-1]:this.situation},add:function(t,e,i){return this.last()[i||"animations"][t]=e,this._callStart()},step:function(t){var e,i,s;(t||(this.absPos=this.timeToAbsPos(+new Date)),!1!==this.situation.loops)?(e=Math.max(this.absPos,0),i=Math.floor(e),!0===this.situation.loops||i<this.situation.loops?(this.pos=e-i,s=this.situation.loop,this.situation.loop=i):(this.absPos=this.situation.loops,this.pos=1,s=this.situation.loop-1,this.situation.loop=this.situation.loops),this.situation.reversing&&(this.situation.reversed=this.situation.reversed!=Boolean((this.situation.loop-s)%2))):(this.absPos=Math.min(this.absPos,1),this.pos=this.absPos);this.pos<0&&(this.pos=0),this.situation.reversed&&(this.pos=1-this.pos);var a=this.situation.ease(this.pos);for(var n in this.situation.once)n>this.lastPos&&n<=a&&(this.situation.once[n].call(this.target(),this.pos,a),delete this.situation.once[n]);return this.active&&this.target().fire("during",{pos:this.pos,eased:a,fx:this,situation:this.situation}),this.situation?(this.eachAt(),1==this.pos&&!this.situation.reversed||this.situation.reversed&&0==this.pos?(this.stopAnimFrame(),this.target().fire("finished",{fx:this,situation:this.situation}),this.situations.length||(this.target().fire("allfinished"),this.situations.length||(this.target().off(".fx"),this.active=!1)),this.active?this.dequeue():this.clearCurrent()):!this.paused&&this.active&&this.startAnimFrame(),this.lastPos=a,this):this},eachAt:function(){var t,e,i,a=this,n=this.target(),r=this.situation;for(t in r.animations)i=[].concat(r.animations[t]).map(function(t){return"string"!=typeof t&&t.at?t.at(r.ease(a.pos),a.pos):t}),n[t].apply(n,i);for(t in r.attrs)i=[t].concat(r.attrs[t]).map(function(t){return"string"!=typeof t&&t.at?t.at(r.ease(a.pos),a.pos):t}),n.attr.apply(n,i);for(t in r.styles)i=[t].concat(r.styles[t]).map(function(t){return"string"!=typeof t&&t.at?t.at(r.ease(a.pos),a.pos):t}),n.style.apply(n,i);if(r.transforms.length){for(i=r.initialTransformation,t=0,e=r.transforms.length;t<e;t++){var o=r.transforms[t];o instanceof s.Matrix?i=o.relative?i.multiply((new s.Matrix).morph(o).at(r.ease(this.pos))):i.morph(o).at(r.ease(this.pos)):(o.relative||o.undo(i.extract()),i=i.multiply(o.at(r.ease(this.pos))))}n.matrix(i)}return this},once:function(t,e,i){var s=this.last();return i||(t=s.ease(t)),s.once[t]=e,this},_callStart:function(){return setTimeout(function(){this.start()}.bind(this),0),this}},parent:s.Element,construct:{animate:function(t,e,i){return(this.fx||(this.fx=new s.FX(this))).animate(t,e,i)},delay:function(t){return(this.fx||(this.fx=new s.FX(this))).delay(t)},stop:function(t,e){return this.fx&&this.fx.stop(t,e),this},finish:function(){return this.fx&&this.fx.finish(),this},pause:function(){return this.fx&&this.fx.pause(),this},play:function(){return this.fx&&this.fx.play(),this},speed:function(t){if(this.fx){if(null==t)return this.fx.speed();this.fx.speed(t)}return this}}}),s.MorphObj=s.invent({create:function(t,e){return s.Color.isColor(e)?new s.Color(t).morph(e):s.regex.delimiter.test(t)?s.regex.pathLetters.test(t)?new s.PathArray(t).morph(e):new s.Array(t).morph(e):s.regex.numberAndUnit.test(e)?new s.Number(t).morph(e):(this.value=t,void(this.destination=e))},extend:{at:function(t,e){return e<1?this.value:this.destination},valueOf:function(){return this.value}}}),s.extend(s.FX,{attr:function(e,i,s){if("object"===t(e))for(var a in e)this.attr(a,e[a]);else this.add(e,i,"attrs");return this},style:function(e,i){if("object"===t(e))for(var s in e)this.style(s,e[s]);else this.add(e,i,"styles");return this},x:function(t,e){if(this.target()instanceof s.G)return this.transform({x:t},e),this;var i=new s.Number(t);return i.relative=e,this.add("x",i)},y:function(t,e){if(this.target()instanceof s.G)return this.transform({y:t},e),this;var i=new s.Number(t);return i.relative=e,this.add("y",i)},cx:function(t){return this.add("cx",new s.Number(t))},cy:function(t){return this.add("cy",new s.Number(t))},move:function(t,e){return this.x(t).y(e)},center:function(t,e){return this.cx(t).cy(e)},size:function(t,e){var i;this.target()instanceof s.Text?this.attr("font-size",t):(t&&e||(i=this.target().bbox()),t||(t=i.width/i.height*e),e||(e=i.height/i.width*t),this.add("width",new s.Number(t)).add("height",new s.Number(e)));return this},width:function(t){return this.add("width",new s.Number(t))},height:function(t){return this.add("height",new s.Number(t))},plot:function(t,e,i,s){return 4==arguments.length?this.plot([t,e,i,s]):this.add("plot",new(this.target().morphArray)(t))},leading:function(t){return this.target().leading?this.add("leading",new s.Number(t)):this},viewbox:function(t,e,i,a){return this.target()instanceof s.Container&&this.add("viewbox",new s.ViewBox(t,e,i,a)),this},update:function(t){if(this.target()instanceof s.Stop){if("number"==typeof t||t instanceof s.Number)return this.update({offset:arguments[0],color:arguments[1],opacity:arguments[2]});null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",t.offset)}return this}}),s.Box=s.invent({create:function(e,i,a,n){if(!("object"!==t(e)||e instanceof s.Element))return s.Box.call(this,null!=e.left?e.left:e.x,null!=e.top?e.top:e.y,e.width,e.height);4==arguments.length&&(this.x=e,this.y=i,this.width=a,this.height=n),m(this)},extend:{merge:function(t){var e=new this.constructor;return e.x=Math.min(this.x,t.x),e.y=Math.min(this.y,t.y),e.width=Math.max(this.x+this.width,t.x+t.width)-e.x,e.height=Math.max(this.y+this.height,t.y+t.height)-e.y,m(e)},transform:function(t){var e,i=1/0,a=-1/0,n=1/0,r=-1/0;return[new s.Point(this.x,this.y),new s.Point(this.x2,this.y),new s.Point(this.x,this.y2),new s.Point(this.x2,this.y2)].forEach(function(e){e=e.transform(t),i=Math.min(i,e.x),a=Math.max(a,e.x),n=Math.min(n,e.y),r=Math.max(r,e.y)}),(e=new this.constructor).x=i,e.width=a-i,e.y=n,e.height=r-n,m(e),e}}}),s.BBox=s.invent({create:function(t){if(s.Box.apply(this,[].slice.call(arguments)),t instanceof s.Element){var e;try{if(!i.documentElement.contains){for(var a=t.node;a.parentNode;)a=a.parentNode;if(a!=i)throw new Error("Element not in the dom")}e=t.node.getBBox()}catch(i){if(t instanceof s.Shape){s.parser.draw||s.prepare();var n=t.clone(s.parser.draw.instance).show();e=n.node.getBBox(),n.remove()}else e={x:t.node.clientLeft,y:t.node.clientTop,width:t.node.clientWidth,height:t.node.clientHeight}}s.Box.call(this,e)}},inherit:s.Box,parent:s.Element,construct:{bbox:function(){return new s.BBox(this)}}}),s.BBox.prototype.constructor=s.BBox,s.extend(s.Element,{tbox:function(){return console.warn("Use of TBox is deprecated and mapped to RBox. Use .rbox() instead."),this.rbox(this.doc())}}),s.RBox=s.invent({create:function(t){s.Box.apply(this,[].slice.call(arguments)),t instanceof s.Element&&s.Box.call(this,t.node.getBoundingClientRect())},inherit:s.Box,parent:s.Element,extend:{addOffset:function(){return this.x+=e.pageXOffset,this.y+=e.pageYOffset,this}},construct:{rbox:function(t){return t?new s.RBox(this).transform(t.screenCTM().inverse()):new s.RBox(this).addOffset()}}}),s.RBox.prototype.constructor=s.RBox,s.Matrix=s.invent({create:function(e){var i,a=p([1,0,0,1,0,0]);for(e=e instanceof s.Element?e.matrixify():"string"==typeof e?p(e.split(s.regex.delimiter).map(parseFloat)):6==arguments.length?p([].slice.call(arguments)):Array.isArray(e)?p(e):"object"===t(e)?e:a,i=y.length-1;i>=0;--i)this[y[i]]=null!=e[y[i]]?e[y[i]]:a[y[i]]},extend:{extract:function(){var t=f(this,0,1),e=f(this,1,0),i=180/Math.PI*Math.atan2(t.y,t.x)-90;return{x:this.e,y:this.f,transformedX:(this.e*Math.cos(i*Math.PI/180)+this.f*Math.sin(i*Math.PI/180))/Math.sqrt(this.a*this.a+this.b*this.b),transformedY:(this.f*Math.cos(i*Math.PI/180)+this.e*Math.sin(-i*Math.PI/180))/Math.sqrt(this.c*this.c+this.d*this.d),skewX:-i,skewY:180/Math.PI*Math.atan2(e.y,e.x),scaleX:Math.sqrt(this.a*this.a+this.b*this.b),scaleY:Math.sqrt(this.c*this.c+this.d*this.d),rotation:i,a:this.a,b:this.b,c:this.c,d:this.d,e:this.e,f:this.f,matrix:new s.Matrix(this)}},clone:function(){return new s.Matrix(this)},morph:function(t){return this.destination=new s.Matrix(t),this},at:function(t){return this.destination?new s.Matrix({a:this.a+(this.destination.a-this.a)*t,b:this.b+(this.destination.b-this.b)*t,c:this.c+(this.destination.c-this.c)*t,d:this.d+(this.destination.d-this.d)*t,e:this.e+(this.destination.e-this.e)*t,f:this.f+(this.destination.f-this.f)*t}):this},multiply:function(t){return new s.Matrix(this.native().multiply(function(t){t instanceof s.Matrix||(t=new s.Matrix(t));return t}(t).native()))},inverse:function(){return new s.Matrix(this.native().inverse())},translate:function(t,e){return new s.Matrix(this.native().translate(t||0,e||0))},scale:function(t,e,i,a){return 1==arguments.length?e=t:3==arguments.length&&(a=i,i=e,e=t),this.around(i,a,new s.Matrix(t,0,0,e,0,0))},rotate:function(t,e,i){return t=s.utils.radians(t),this.around(e,i,new s.Matrix(Math.cos(t),Math.sin(t),-Math.sin(t),Math.cos(t),0,0))},flip:function(t,e){return"x"==t?this.scale(-1,1,e,0):"y"==t?this.scale(1,-1,0,e):this.scale(-1,-1,t,null!=e?e:t)},skew:function(t,e,i,a){return 1==arguments.length?e=t:3==arguments.length&&(a=i,i=e,e=t),t=s.utils.radians(t),e=s.utils.radians(e),this.around(i,a,new s.Matrix(1,Math.tan(e),Math.tan(t),1,0,0))},skewX:function(t,e,i){return this.skew(t,0,e,i)},skewY:function(t,e,i){return this.skew(0,t,e,i)},around:function(t,e,i){return this.multiply(new s.Matrix(1,0,0,1,t||0,e||0)).multiply(i).multiply(new s.Matrix(1,0,0,1,-t||0,-e||0))},native:function(){for(var t=s.parser.native.createSVGMatrix(),e=y.length-1;e>=0;e--)t[y[e]]=this[y[e]];return t},toString:function(){return"matrix("+v(this.a)+","+v(this.b)+","+v(this.c)+","+v(this.d)+","+v(this.e)+","+v(this.f)+")"}},parent:s.Element,construct:{ctm:function(){return new s.Matrix(this.node.getCTM())},screenCTM:function(){if(this instanceof s.Nested){var t=this.rect(1,1),e=t.node.getScreenCTM();return t.remove(),new s.Matrix(e)}return new s.Matrix(this.node.getScreenCTM())}}}),s.Point=s.invent({create:function(e,i){var s;s=Array.isArray(e)?{x:e[0],y:e[1]}:"object"===t(e)?{x:e.x,y:e.y}:null!=e?{x:e,y:null!=i?i:e}:{x:0,y:0},this.x=s.x,this.y=s.y},extend:{clone:function(){return new s.Point(this)},morph:function(t,e){return this.destination=new s.Point(t,e),this},at:function(t){return this.destination?new s.Point({x:this.x+(this.destination.x-this.x)*t,y:this.y+(this.destination.y-this.y)*t}):this},native:function(){var t=s.parser.native.createSVGPoint();return t.x=this.x,t.y=this.y,t},transform:function(t){return new s.Point(this.native().matrixTransform(t.native()))}}}),s.extend(s.Element,{point:function(t,e){return new s.Point(t,e).transform(this.screenCTM().inverse())}}),s.extend(s.Element,{attr:function(e,i,a){if(null==e){for(e={},a=(i=this.node.attributes).length-1;a>=0;a--)e[i[a].nodeName]=s.regex.isNumber.test(i[a].nodeValue)?parseFloat(i[a].nodeValue):i[a].nodeValue;return e}if("object"===t(e))for(i in e)this.attr(i,e[i]);else if(null===i)this.node.removeAttribute(e);else{if(null==i)return null==(i=this.node.getAttribute(e))?s.defaults.attrs[e]:s.regex.isNumber.test(i)?parseFloat(i):i;"stroke-width"==e?this.attr("stroke",parseFloat(i)>0?this._stroke:null):"stroke"==e&&(this._stroke=i),"fill"!=e&&"stroke"!=e||(s.regex.isImage.test(i)&&(i=this.doc().defs().image(i,0,0)),i instanceof s.Image&&(i=this.doc().defs().pattern(0,0,function(){this.add(i)}))),"number"==typeof i?i=new s.Number(i):s.Color.isColor(i)?i=new s.Color(i):Array.isArray(i)&&(i=new s.Array(i)),"leading"==e?this.leading&&this.leading(i):"string"==typeof a?this.node.setAttributeNS(a,e,i.toString()):this.node.setAttribute(e,i.toString()),!this.rebuild||"font-size"!=e&&"x"!=e||this.rebuild(e,i)}return this}}),s.extend(s.Element,{transform:function(e,i){var a,n;if("object"!==t(e))return a=new s.Matrix(this).extract(),"string"==typeof e?a[e]:a;if(a=new s.Matrix(this),i=!!i||!!e.relative,null!=e.a)a=i?a.multiply(new s.Matrix(e)):new s.Matrix(e);else if(null!=e.rotation)x(e,this),a=i?a.rotate(e.rotation,e.cx,e.cy):a.rotate(e.rotation-a.extract().rotation,e.cx,e.cy);else if(null!=e.scale||null!=e.scaleX||null!=e.scaleY){if(x(e,this),e.scaleX=null!=e.scale?e.scale:null!=e.scaleX?e.scaleX:1,e.scaleY=null!=e.scale?e.scale:null!=e.scaleY?e.scaleY:1,!i){var r=a.extract();e.scaleX=1*e.scaleX/r.scaleX,e.scaleY=1*e.scaleY/r.scaleY}a=a.scale(e.scaleX,e.scaleY,e.cx,e.cy)}else if(null!=e.skew||null!=e.skewX||null!=e.skewY){if(x(e,this),e.skewX=null!=e.skew?e.skew:null!=e.skewX?e.skewX:0,e.skewY=null!=e.skew?e.skew:null!=e.skewY?e.skewY:0,!i){r=a.extract();a=a.multiply((new s.Matrix).skew(r.skewX,r.skewY,e.cx,e.cy).inverse())}a=a.skew(e.skewX,e.skewY,e.cx,e.cy)}else e.flip?("x"==e.flip||"y"==e.flip?e.offset=null==e.offset?this.bbox()["c"+e.flip]:e.offset:null==e.offset?(n=this.bbox(),e.flip=n.cx,e.offset=n.cy):e.flip=e.offset,a=(new s.Matrix).flip(e.flip,e.offset)):null==e.x&&null==e.y||(i?a=a.translate(e.x,e.y):(null!=e.x&&(a.e=e.x),null!=e.y&&(a.f=e.y)));return this.attr("transform",a)}}),s.extend(s.FX,{transform:function(e,i){var a,n,r=this.target();return"object"!==t(e)?(a=new s.Matrix(r).extract(),"string"==typeof e?a[e]:a):(i=!!i||!!e.relative,null!=e.a?a=new s.Matrix(e):null!=e.rotation?(x(e,r),a=new s.Rotate(e.rotation,e.cx,e.cy)):null!=e.scale||null!=e.scaleX||null!=e.scaleY?(x(e,r),e.scaleX=null!=e.scale?e.scale:null!=e.scaleX?e.scaleX:1,e.scaleY=null!=e.scale?e.scale:null!=e.scaleY?e.scaleY:1,a=new s.Scale(e.scaleX,e.scaleY,e.cx,e.cy)):null!=e.skewX||null!=e.skewY?(x(e,r),e.skewX=null!=e.skewX?e.skewX:0,e.skewY=null!=e.skewY?e.skewY:0,a=new s.Skew(e.skewX,e.skewY,e.cx,e.cy)):e.flip?("x"==e.flip||"y"==e.flip?e.offset=null==e.offset?r.bbox()["c"+e.flip]:e.offset:null==e.offset?(n=r.bbox(),e.flip=n.cx,e.offset=n.cy):e.flip=e.offset,a=(new s.Matrix).flip(e.flip,e.offset)):null==e.x&&null==e.y||(a=new s.Translate(e.x,e.y)),a?(a.relative=i,this.last().transforms.push(a),this._callStart()):this)}}),s.extend(s.Element,{untransform:function(){return this.attr("transform",null)},matrixify:function(){return(this.attr("transform")||"").split(s.regex.transforms).slice(0,-1).map(function(t){var e=t.trim().split("(");return[e[0],e[1].split(s.regex.delimiter).map(function(t){return parseFloat(t)})]}).reduce(function(t,e){return"matrix"==e[0]?t.multiply(p(e[1])):t[e[0]].apply(t,e[1])},new s.Matrix)},toParent:function(t){if(this==t)return this;var e=this.screenCTM(),i=t.screenCTM().inverse();return this.addTo(t).untransform().transform(i.multiply(e)),this},toDoc:function(){return this.toParent(this.doc())}}),s.Transformation=s.invent({create:function(e,i){if(arguments.length>1&&"boolean"!=typeof i)return this.constructor.call(this,[].slice.call(arguments));if(Array.isArray(e))for(var s=0,a=this.arguments.length;s<a;++s)this[this.arguments[s]]=e[s];else if("object"===t(e))for(s=0,a=this.arguments.length;s<a;++s)this[this.arguments[s]]=e[this.arguments[s]];this.inversed=!1,!0===i&&(this.inversed=!0)},extend:{arguments:[],method:"",at:function(t){for(var e=[],i=0,a=this.arguments.length;i<a;++i)e.push(this[this.arguments[i]]);var n=this._undo||new s.Matrix;return n=(new s.Matrix).morph(s.Matrix.prototype[this.method].apply(n,e)).at(t),this.inversed?n.inverse():n},undo:function(t){for(var e=0,i=this.arguments.length;e<i;++e)t[this.arguments[e]]=void 0===this[this.arguments[e]]?0:t[this.arguments[e]];return t.cx=this.cx,t.cy=this.cy,this._undo=new(s[d(this.method)])(t,!0).at(1),this}}}),s.Translate=s.invent({parent:s.Matrix,inherit:s.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments))},extend:{arguments:["transformedX","transformedY"],method:"translate"}}),s.Rotate=s.invent({parent:s.Matrix,inherit:s.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments))},extend:{arguments:["rotation","cx","cy"],method:"rotate",at:function(t){var e=(new s.Matrix).rotate((new s.Number).morph(this.rotation-(this._undo?this._undo.rotation:0)).at(t),this.cx,this.cy);return this.inversed?e.inverse():e},undo:function(t){return this._undo=t,this}}}),s.Scale=s.invent({parent:s.Matrix,inherit:s.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments))},extend:{arguments:["scaleX","scaleY","cx","cy"],method:"scale"}}),s.Skew=s.invent({parent:s.Matrix,inherit:s.Transformation,create:function(t,e){this.constructor.apply(this,[].slice.call(arguments))},extend:{arguments:["skewX","skewY","cx","cy"],method:"skew"}}),s.extend(s.Element,{style:function(e,i){if(0==arguments.length)return this.node.style.cssText||"";if(arguments.length<2)if("object"===t(e))for(i in e)this.style(i,e[i]);else{if(!s.regex.isCss.test(e))return this.node.style[c(e)];for(e=e.split(/\s*;\s*/).filter(function(t){return!!t}).map(function(t){return t.split(/\s*:\s*/)});i=e.pop();)this.style(i[0],i[1])}else this.node.style[c(e)]=null===i||s.regex.isBlank.test(i)?"":i;return this}}),s.Parent=s.invent({create:function(t){this.constructor.call(this,t)},inherit:s.Element,extend:{children:function(){return s.utils.map(s.utils.filterSVGElements(this.node.childNodes),function(t){return s.adopt(t)})},add:function(t,e){return null==e?this.node.appendChild(t.node):t.node!=this.node.childNodes[e]&&this.node.insertBefore(t.node,this.node.childNodes[e]),this},put:function(t,e){return this.add(t,e),t},has:function(t){return this.index(t)>=0},index:function(t){return[].slice.call(this.node.childNodes).indexOf(t.node)},get:function(t){return s.adopt(this.node.childNodes[t])},first:function(){return this.get(0)},last:function(){return this.get(this.node.childNodes.length-1)},each:function(t,e){var i,a,n=this.children();for(i=0,a=n.length;i<a;i++)n[i]instanceof s.Element&&t.apply(n[i],[i,n]),e&&n[i]instanceof s.Container&&n[i].each(t,e);return this},removeElement:function(t){return this.node.removeChild(t.node),this},clear:function(){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return delete this._defs,this},defs:function(){return this.doc().defs()}}}),s.extend(s.Parent,{ungroup:function(t,e){return 0===e||this instanceof s.Defs||this.node==s.parser.draw?this:(t=t||(this instanceof s.Doc?this:this.parent(s.Parent)),e=e||1/0,this.each(function(){return this instanceof s.Defs?this:this instanceof s.Parent?this.ungroup(t,e-1):this.toParent(t)}),this.node.firstChild||this.remove(),this)},flatten:function(t,e){return this.ungroup(t,e)}}),s.Container=s.invent({create:function(t){this.constructor.call(this,t)},inherit:s.Parent}),s.ViewBox=s.invent({create:function(e){var i,a,n,r,o,l,h,c=1,d=1,u=/[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/gi;if(e instanceof s.Element){for(l=e,h=e,o=(e.attr("viewBox")||"").match(u),e.bbox,n=new s.Number(e.width()),r=new s.Number(e.height());"%"==n.unit;)c*=n.value,n=new s.Number(l instanceof s.Doc?l.parent().offsetWidth:l.parent().width()),l=l.parent();for(;"%"==r.unit;)d*=r.value,r=new s.Number(h instanceof s.Doc?h.parent().offsetHeight:h.parent().height()),h=h.parent();this.x=0,this.y=0,this.width=n*c,this.height=r*d,this.zoom=1,o&&(i=parseFloat(o[0]),a=parseFloat(o[1]),n=parseFloat(o[2]),r=parseFloat(o[3]),this.zoom=this.width/this.height>n/r?this.height/r:this.width/n,this.x=i,this.y=a,this.width=n,this.height=r)}else e="string"==typeof e?e.match(u).map(function(t){return parseFloat(t)}):Array.isArray(e)?e:"object"===t(e)?[e.x,e.y,e.width,e.height]:4==arguments.length?[].slice.call(arguments):[0,0,0,0],this.x=e[0],this.y=e[1],this.width=e[2],this.height=e[3]},extend:{toString:function(){return this.x+" "+this.y+" "+this.width+" "+this.height},morph:function(t,e,i,a){return this.destination=new s.ViewBox(t,e,i,a),this},at:function(t){return this.destination?new s.ViewBox([this.x+(this.destination.x-this.x)*t,this.y+(this.destination.y-this.y)*t,this.width+(this.destination.width-this.width)*t,this.height+(this.destination.height-this.height)*t]):this}},parent:s.Container,construct:{viewbox:function(t,e,i,a){return 0==arguments.length?new s.ViewBox(this):this.attr("viewBox",new s.ViewBox(t,e,i,a))}}}),["click","dblclick","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchmove","touchleave","touchend","touchcancel"].forEach(function(t){s.Element.prototype[t]=function(e){return s.on(this.node,t,e),this}}),s.listeners=[],s.handlerMap=[],s.listenerId=0,s.on=function(t,e,i,a,n){var r=i.bind(a||t.instance||t),o=(s.handlerMap.indexOf(t)+1||s.handlerMap.push(t))-1,l=e.split(".")[0],h=e.split(".")[1]||"*";s.listeners[o]=s.listeners[o]||{},s.listeners[o][l]=s.listeners[o][l]||{},s.listeners[o][l][h]=s.listeners[o][l][h]||{},i._svgjsListenerId||(i._svgjsListenerId=++s.listenerId),s.listeners[o][l][h][i._svgjsListenerId]=r,t.addEventListener(l,r,n||!1)},s.off=function(t,e,i){var a=s.handlerMap.indexOf(t),n=e&&e.split(".")[0],r=e&&e.split(".")[1],o="";if(-1!=a)if(i){if("function"==typeof i&&(i=i._svgjsListenerId),!i)return;s.listeners[a][n]&&s.listeners[a][n][r||"*"]&&(t.removeEventListener(n,s.listeners[a][n][r||"*"][i],!1),delete s.listeners[a][n][r||"*"][i])}else if(r&&n){if(s.listeners[a][n]&&s.listeners[a][n][r]){for(i in s.listeners[a][n][r])s.off(t,[n,r].join("."),i);delete s.listeners[a][n][r]}}else if(r)for(e in s.listeners[a])for(o in s.listeners[a][e])r===o&&s.off(t,[e,r].join("."));else if(n){if(s.listeners[a][n]){for(o in s.listeners[a][n])s.off(t,[n,o].join("."));delete s.listeners[a][n]}}else{for(e in s.listeners[a])s.off(t,e);delete s.listeners[a],delete s.handlerMap[a]}},s.extend(s.Element,{on:function(t,e,i,a){return s.on(this.node,t,e,i,a),this},off:function(t,e){return s.off(this.node,t,e),this},fire:function(t,i){return t instanceof e.Event?this.node.dispatchEvent(t):this.node.dispatchEvent(t=new s.CustomEvent(t,{detail:i,cancelable:!0})),this._event=t,this},event:function(){return this._event}}),s.Defs=s.invent({create:"defs",inherit:s.Container}),s.G=s.invent({create:"g",inherit:s.Container,extend:{x:function(t){return null==t?this.transform("x"):this.transform({x:t-this.x()},!0)},y:function(t){return null==t?this.transform("y"):this.transform({y:t-this.y()},!0)},cx:function(t){return null==t?this.gbox().cx:this.x(t-this.gbox().width/2)},cy:function(t){return null==t?this.gbox().cy:this.y(t-this.gbox().height/2)},gbox:function(){var t=this.bbox(),e=this.transform();return t.x+=e.x,t.x2+=e.x,t.cx+=e.x,t.y+=e.y,t.y2+=e.y,t.cy+=e.y,t}},construct:{group:function(){return this.put(new s.G)}}}),s.Doc=s.invent({create:function(t){t&&("svg"==(t="string"==typeof t?i.getElementById(t):t).nodeName?this.constructor.call(this,t):(this.constructor.call(this,s.create("svg")),t.appendChild(this.node),this.size("100%","100%")),this.namespace().defs())},inherit:s.Container,extend:{namespace:function(){return this.attr({xmlns:s.ns,version:"1.1"}).attr("xmlns:xlink",s.xlink,s.xmlns).attr("xmlns:svgjs",s.svgjs,s.xmlns)},defs:function(){var t;this._defs||((t=this.node.getElementsByTagName("defs")[0])?this._defs=s.adopt(t):this._defs=new s.Defs,this.node.appendChild(this._defs.node));return this._defs},parent:function(){return this.node.parentNode&&"#document"!=this.node.parentNode.nodeName?this.node.parentNode:null},spof:function(){var t=this.node.getScreenCTM();return t&&this.style("left",-t.e%1+"px").style("top",-t.f%1+"px"),this},remove:function(){return this.parent()&&this.parent().removeChild(this.node),this},clear:function(){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return delete this._defs,s.parser.draw&&!s.parser.draw.parentNode&&this.node.appendChild(s.parser.draw),this},clone:function(t){this.writeDataToDom();var e=this.node,i=b(e.cloneNode(!0));return t?(t.node||t).appendChild(i.node):e.parentNode.insertBefore(i.node,e.nextSibling),i}}}),s.extend(s.Element,{siblings:function(){return this.parent().children()},position:function(){return this.parent().index(this)},next:function(){return this.siblings()[this.position()+1]},previous:function(){return this.siblings()[this.position()-1]},forward:function(){var t=this.position()+1,e=this.parent();return e.removeElement(this).add(this,t),e instanceof s.Doc&&e.node.appendChild(e.defs().node),this},backward:function(){var t=this.position();return t>0&&this.parent().removeElement(this).add(this,t-1),this},front:function(){var t=this.parent();return t.node.appendChild(this.node),t instanceof s.Doc&&t.node.appendChild(t.defs().node),this},back:function(){return this.position()>0&&this.parent().removeElement(this).add(this,0),this},before:function(t){t.remove();var e=this.position();return this.parent().add(t,e),this},after:function(t){t.remove();var e=this.position();return this.parent().add(t,e+1),this}}),s.Mask=s.invent({create:function(){this.constructor.call(this,s.create("mask")),this.targets=[]},inherit:s.Container,extend:{remove:function(){for(var t=this.targets.length-1;t>=0;t--)this.targets[t]&&this.targets[t].unmask();return this.targets=[],s.Element.prototype.remove.call(this),this}},construct:{mask:function(){return this.defs().put(new s.Mask)}}}),s.extend(s.Element,{maskWith:function(t){return this.masker=t instanceof s.Mask?t:this.parent().mask().add(t),this.masker.targets.push(this),this.attr("mask",'url("#'+this.masker.attr("id")+'")')},unmask:function(){return delete this.masker,this.attr("mask",null)}}),s.ClipPath=s.invent({create:function(){this.constructor.call(this,s.create("clipPath")),this.targets=[]},inherit:s.Container,extend:{remove:function(){for(var t=this.targets.length-1;t>=0;t--)this.targets[t]&&this.targets[t].unclip();return this.targets=[],this.parent().removeElement(this),this}},construct:{clip:function(){return this.defs().put(new s.ClipPath)}}}),s.extend(s.Element,{clipWith:function(t){return this.clipper=t instanceof s.ClipPath?t:this.parent().clip().add(t),this.clipper.targets.push(this),this.attr("clip-path",'url("#'+this.clipper.attr("id")+'")')},unclip:function(){return delete this.clipper,this.attr("clip-path",null)}}),s.Gradient=s.invent({create:function(t){this.constructor.call(this,s.create(t+"Gradient")),this.type=t},inherit:s.Container,extend:{at:function(t,e,i){return this.put(new s.Stop).update(t,e,i)},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},fill:function(){return"url(#"+this.id()+")"},toString:function(){return this.fill()},attr:function(t,e,i){return"transform"==t&&(t="gradientTransform"),s.Container.prototype.attr.call(this,t,e,i)}},construct:{gradient:function(t,e){return this.defs().gradient(t,e)}}}),s.extend(s.Gradient,s.FX,{from:function(t,e){return"radial"==(this._target||this).type?this.attr({fx:new s.Number(t),fy:new s.Number(e)}):this.attr({x1:new s.Number(t),y1:new s.Number(e)})},to:function(t,e){return"radial"==(this._target||this).type?this.attr({cx:new s.Number(t),cy:new s.Number(e)}):this.attr({x2:new s.Number(t),y2:new s.Number(e)})}}),s.extend(s.Defs,{gradient:function(t,e){return this.put(new s.Gradient(t)).update(e)}}),s.Stop=s.invent({create:"stop",inherit:s.Element,extend:{update:function(t){return("number"==typeof t||t instanceof s.Number)&&(t={offset:arguments[0],color:arguments[1],opacity:arguments[2]}),null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",new s.Number(t.offset)),this}}}),s.Pattern=s.invent({create:"pattern",inherit:s.Container,extend:{fill:function(){return"url(#"+this.id()+")"},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},toString:function(){return this.fill()},attr:function(t,e,i){return"transform"==t&&(t="patternTransform"),s.Container.prototype.attr.call(this,t,e,i)}},construct:{pattern:function(t,e,i){return this.defs().pattern(t,e,i)}}}),s.extend(s.Defs,{pattern:function(t,e,i){return this.put(new s.Pattern).update(i).attr({x:0,y:0,width:t,height:e,patternUnits:"userSpaceOnUse"})}}),s.Shape=s.invent({create:function(t){this.constructor.call(this,t)},inherit:s.Element}),s.Bare=s.invent({create:function(t,e){if(this.constructor.call(this,s.create(t)),e)for(var i in e.prototype)"function"==typeof e.prototype[i]&&(this[i]=e.prototype[i])},inherit:s.Element,extend:{words:function(t){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return this.node.appendChild(i.createTextNode(t)),this}}}),s.extend(s.Parent,{element:function(t,e){return this.put(new s.Bare(t,e))}}),s.Symbol=s.invent({create:"symbol",inherit:s.Container,construct:{symbol:function(){return this.put(new s.Symbol)}}}),s.Use=s.invent({create:"use",inherit:s.Shape,extend:{element:function(t,e){return this.attr("href",(e||"")+"#"+t,s.xlink)}},construct:{use:function(t,e){return this.put(new s.Use).element(t,e)}}}),s.Rect=s.invent({create:"rect",inherit:s.Shape,construct:{rect:function(t,e){return this.put(new s.Rect).size(t,e)}}}),s.Circle=s.invent({create:"circle",inherit:s.Shape,construct:{circle:function(t){return this.put(new s.Circle).rx(new s.Number(t).divide(2)).move(0,0)}}}),s.extend(s.Circle,s.FX,{rx:function(t){return this.attr("r",t)},ry:function(t){return this.rx(t)}}),s.Ellipse=s.invent({create:"ellipse",inherit:s.Shape,construct:{ellipse:function(t,e){return this.put(new s.Ellipse).size(t,e).move(0,0)}}}),s.extend(s.Ellipse,s.Rect,s.FX,{rx:function(t){return this.attr("rx",t)},ry:function(t){return this.attr("ry",t)}}),s.extend(s.Circle,s.Ellipse,{x:function(t){return null==t?this.cx()-this.rx():this.cx(t+this.rx())},y:function(t){return null==t?this.cy()-this.ry():this.cy(t+this.ry())},cx:function(t){return null==t?this.attr("cx"):this.attr("cx",t)},cy:function(t){return null==t?this.attr("cy"):this.attr("cy",t)},width:function(t){return null==t?2*this.rx():this.rx(new s.Number(t).divide(2))},height:function(t){return null==t?2*this.ry():this.ry(new s.Number(t).divide(2))},size:function(t,e){var i=g(this,t,e);return this.rx(new s.Number(i.width).divide(2)).ry(new s.Number(i.height).divide(2))}}),s.Line=s.invent({create:"line",inherit:s.Shape,extend:{array:function(){return new s.PointArray([[this.attr("x1"),this.attr("y1")],[this.attr("x2"),this.attr("y2")]])},plot:function(t,e,i,a){return null==t?this.array():(t=void 0!==e?{x1:t,y1:e,x2:i,y2:a}:new s.PointArray(t).toLine(),this.attr(t))},move:function(t,e){return this.attr(this.array().move(t,e).toLine())},size:function(t,e){var i=g(this,t,e);return this.attr(this.array().size(i.width,i.height).toLine())}},construct:{line:function(t,e,i,a){return s.Line.prototype.plot.apply(this.put(new s.Line),null!=t?[t,e,i,a]:[0,0,0,0])}}}),s.Polyline=s.invent({create:"polyline",inherit:s.Shape,construct:{polyline:function(t){return this.put(new s.Polyline).plot(t||new s.PointArray)}}}),s.Polygon=s.invent({create:"polygon",inherit:s.Shape,construct:{polygon:function(t){return this.put(new s.Polygon).plot(t||new s.PointArray)}}}),s.extend(s.Polyline,s.Polygon,{array:function(){return this._array||(this._array=new s.PointArray(this.attr("points")))},plot:function(t){return null==t?this.array():this.clear().attr("points","string"==typeof t?t:this._array=new s.PointArray(t))},clear:function(){return delete this._array,this},move:function(t,e){return this.attr("points",this.array().move(t,e))},size:function(t,e){var i=g(this,t,e);return this.attr("points",this.array().size(i.width,i.height))}}),s.extend(s.Line,s.Polyline,s.Polygon,{morphArray:s.PointArray,x:function(t){return null==t?this.bbox().x:this.move(t,this.bbox().y)},y:function(t){return null==t?this.bbox().y:this.move(this.bbox().x,t)},width:function(t){var e=this.bbox();return null==t?e.width:this.size(t,e.height)},height:function(t){var e=this.bbox();return null==t?e.height:this.size(e.width,t)}}),s.Path=s.invent({create:"path",inherit:s.Shape,extend:{morphArray:s.PathArray,array:function(){return this._array||(this._array=new s.PathArray(this.attr("d")))},plot:function(t){return null==t?this.array():this.clear().attr("d","string"==typeof t?t:this._array=new s.PathArray(t))},clear:function(){return delete this._array,this},move:function(t,e){return this.attr("d",this.array().move(t,e))},x:function(t){return null==t?this.bbox().x:this.move(t,this.bbox().y)},y:function(t){return null==t?this.bbox().y:this.move(this.bbox().x,t)},size:function(t,e){var i=g(this,t,e);return this.attr("d",this.array().size(i.width,i.height))},width:function(t){return null==t?this.bbox().width:this.size(t,this.bbox().height)},height:function(t){return null==t?this.bbox().height:this.size(this.bbox().width,t)}},construct:{path:function(t){return this.put(new s.Path).plot(t||new s.PathArray)}}}),s.Image=s.invent({create:"image",inherit:s.Shape,extend:{load:function(t){if(!t)return this;var i=this,a=new e.Image;return s.on(a,"load",function(){s.off(a);var e=i.parent(s.Pattern);null!==e&&(0==i.width()&&0==i.height()&&i.size(a.width,a.height),e&&0==e.width()&&0==e.height()&&e.size(i.width(),i.height()),"function"==typeof i._loaded&&i._loaded.call(i,{width:a.width,height:a.height,ratio:a.width/a.height,url:t}))}),s.on(a,"error",function(t){s.off(a),"function"==typeof i._error&&i._error.call(i,t)}),this.attr("href",a.src=this.src=t,s.xlink)},loaded:function(t){return this._loaded=t,this},error:function(t){return this._error=t,this}},construct:{image:function(t,e,i){return this.put(new s.Image).load(t).size(e||0,i||e||0)}}}),s.Text=s.invent({create:function(){this.constructor.call(this,s.create("text")),this.dom.leading=new s.Number(1.3),this._rebuild=!0,this._build=!1,this.attr("font-family",s.defaults.attrs["font-family"])},inherit:s.Shape,extend:{x:function(t){return null==t?this.attr("x"):this.attr("x",t)},y:function(t){var e=this.attr("y"),i="number"==typeof e?e-this.bbox().y:0;return null==t?"number"==typeof e?e-i:e:this.attr("y","number"==typeof t.valueOf()?t+i:t)},cx:function(t){return null==t?this.bbox().cx:this.x(t-this.bbox().width/2)},cy:function(t){return null==t?this.bbox().cy:this.y(t-this.bbox().height/2)},text:function(t){if(void 0===t){t="";for(var e=this.node.childNodes,i=0,a=e.length;i<a;++i)0!=i&&3!=e[i].nodeType&&1==s.adopt(e[i]).dom.newLined&&(t+="\n"),t+=e[i].textContent;return t}if(this.clear().build(!0),"function"==typeof t)t.call(this,this);else{i=0;for(var n=(t=t.split("\n")).length;i<n;i++)this.tspan(t[i]).newLine()}return this.build(!1).rebuild()},size:function(t){return this.attr("font-size",t).rebuild()},leading:function(t){return null==t?this.dom.leading:(this.dom.leading=new s.Number(t),this.rebuild())},lines:function(){var t=(this.textPath&&this.textPath()||this).node,e=s.utils.map(s.utils.filterSVGElements(t.childNodes),function(t){return s.adopt(t)});return new s.Set(e)},rebuild:function(t){if("boolean"==typeof t&&(this._rebuild=t),this._rebuild){var e=this,i=0,a=this.dom.leading*new s.Number(this.attr("font-size"));this.lines().each(function(){this.dom.newLined&&(e.textPath()||this.attr("x",e.attr("x")),"\n"==this.text()?i+=a:(this.attr("dy",a+i),i=0))}),this.fire("rebuild")}return this},build:function(t){return this._build=!!t,this},setData:function(t){return this.dom=t,this.dom.leading=new s.Number(t.leading||1.3),this}},construct:{text:function(t){return this.put(new s.Text).text(t)},plain:function(t){return this.put(new s.Text).plain(t)}}}),s.Tspan=s.invent({create:"tspan",inherit:s.Shape,extend:{text:function(t){return null==t?this.node.textContent+(this.dom.newLined?"\n":""):("function"==typeof t?t.call(this,this):this.plain(t),this)},dx:function(t){return this.attr("dx",t)},dy:function(t){return this.attr("dy",t)},newLine:function(){var t=this.parent(s.Text);return this.dom.newLined=!0,this.dy(t.dom.leading*t.attr("font-size")).attr("x",t.x())}}}),s.extend(s.Text,s.Tspan,{plain:function(t){return!1===this._build&&this.clear(),this.node.appendChild(i.createTextNode(t)),this},tspan:function(t){var e=(this.textPath&&this.textPath()||this).node,i=new s.Tspan;return!1===this._build&&this.clear(),e.appendChild(i.node),i.text(t)},clear:function(){for(var t=(this.textPath&&this.textPath()||this).node;t.hasChildNodes();)t.removeChild(t.lastChild);return this},length:function(){return this.node.getComputedTextLength()}}),s.TextPath=s.invent({create:"textPath",inherit:s.Parent,parent:s.Text,construct:{morphArray:s.PathArray,path:function(t){for(var e=new s.TextPath,i=this.doc().defs().path(t);this.node.hasChildNodes();)e.node.appendChild(this.node.firstChild);return this.node.appendChild(e.node),e.attr("href","#"+i,s.xlink),this},array:function(){var t=this.track();return t?t.array():null},plot:function(t){var e=this.track(),i=null;return e&&(i=e.plot(t)),null==t?i:this},track:function(){var t=this.textPath();if(t)return t.reference("href")},textPath:function(){if(this.node.firstChild&&"textPath"==this.node.firstChild.nodeName)return s.adopt(this.node.firstChild)}}}),s.Nested=s.invent({create:function(){this.constructor.call(this,s.create("svg")),this.style("overflow","visible")},inherit:s.Container,construct:{nested:function(){return this.put(new s.Nested)}}}),s.A=s.invent({create:"a",inherit:s.Container,extend:{to:function(t){return this.attr("href",t,s.xlink)},show:function(t){return this.attr("show",t,s.xlink)},target:function(t){return this.attr("target",t)}},construct:{link:function(t){return this.put(new s.A).to(t)}}}),s.extend(s.Element,{linkTo:function(t){var e=new s.A;return"function"==typeof t?t.call(e,e):e.to(t),this.parent().put(e).put(this)}}),s.Marker=s.invent({create:"marker",inherit:s.Container,extend:{width:function(t){return this.attr("markerWidth",t)},height:function(t){return this.attr("markerHeight",t)},ref:function(t,e){return this.attr("refX",t).attr("refY",e)},update:function(t){return this.clear(),"function"==typeof t&&t.call(this,this),this},toString:function(){return"url(#"+this.id()+")"}},construct:{marker:function(t,e,i){return this.defs().marker(t,e,i)}}}),s.extend(s.Defs,{marker:function(t,e,i){return this.put(new s.Marker).size(t,e).ref(t/2,e/2).viewbox(0,0,t,e).attr("orient","auto").update(i)}}),s.extend(s.Line,s.Polyline,s.Polygon,s.Path,{marker:function(t,e,i,a){var n=["marker"];return"all"!=t&&n.push(t),n=n.join("-"),t=arguments[1]instanceof s.Marker?arguments[1]:this.doc().marker(e,i,a),this.attr(n,t)}});var l={stroke:["color","width","opacity","linecap","linejoin","miterlimit","dasharray","dashoffset"],fill:["color","opacity","rule"],prefix:function(t,e){return"color"==e?t:t+"-"+e}};function h(t,e,i,a){return i+a.replace(s.regex.dots," .")}function c(t){return t.toLowerCase().replace(/-(.)/g,function(t,e){return e.toUpperCase()})}function d(t){return t.charAt(0).toUpperCase()+t.slice(1)}function u(t){var e=t.toString(16);return 1==e.length?"0"+e:e}function g(t,e,i){if(null==e||null==i){var s=t.bbox();null==e?e=s.width/s.height*i:null==i&&(i=s.height/s.width*e)}return{width:e,height:i}}function f(t,e,i){return{x:e*t.a+i*t.c+0,y:e*t.b+i*t.d+0}}function p(t){return{a:t[0],b:t[1],c:t[2],d:t[3],e:t[4],f:t[5]}}function x(t,e){t.cx=null==t.cx?e.bbox().cx:t.cx,t.cy=null==t.cy?e.bbox().cy:t.cy}function b(t){for(var i=t.childNodes.length-1;i>=0;i--)t.childNodes[i]instanceof e.SVGElement&&b(t.childNodes[i]);return s.adopt(t).id(s.eid(t.nodeName))}function m(t){return null==t.x&&(t.x=0,t.y=0,t.width=0,t.height=0),t.w=t.width,t.h=t.height,t.x2=t.x+t.width,t.y2=t.y+t.height,t.cx=t.x+t.width/2,t.cy=t.y+t.height/2,t}function v(t){return Math.abs(t)>1e-37?t:0}["fill","stroke"].forEach(function(t){var e,i={};i[t]=function(i){if(void 0===i)return this;if("string"==typeof i||s.Color.isRgb(i)||i&&"function"==typeof i.fill)this.attr(t,i);else for(e=l[t].length-1;e>=0;e--)null!=i[l[t][e]]&&this.attr(l.prefix(t,l[t][e]),i[l[t][e]]);return this},s.extend(s.Element,s.FX,i)}),s.extend(s.Element,s.FX,{rotate:function(t,e,i){return this.transform({rotation:t,cx:e,cy:i})},skew:function(t,e,i,s){return 1==arguments.length||3==arguments.length?this.transform({skew:t,cx:e,cy:i}):this.transform({skewX:t,skewY:e,cx:i,cy:s})},scale:function(t,e,i,s){return 1==arguments.length||3==arguments.length?this.transform({scale:t,cx:e,cy:i}):this.transform({scaleX:t,scaleY:e,cx:i,cy:s})},translate:function(t,e){return this.transform({x:t,y:e})},flip:function(t,e){return e="number"==typeof t?t:e,this.transform({flip:t||"both",offset:e})},matrix:function(t){return this.attr("transform",new s.Matrix(6==arguments.length?[].slice.call(arguments):t))},opacity:function(t){return this.attr("opacity",t)},dx:function(t){return this.x(new s.Number(t).plus(this instanceof s.FX?0:this.x()),!0)},dy:function(t){return this.y(new s.Number(t).plus(this instanceof s.FX?0:this.y()),!0)},dmove:function(t,e){return this.dx(t).dy(e)}}),s.extend(s.Rect,s.Ellipse,s.Circle,s.Gradient,s.FX,{radius:function(t,e){var i=(this._target||this).type;return"radial"==i||"circle"==i?this.attr("r",new s.Number(t)):this.rx(t).ry(null==e?t:e)}}),s.extend(s.Path,{length:function(){return this.node.getTotalLength()},pointAt:function(t){return this.node.getPointAtLength(t)}}),s.extend(s.Parent,s.Text,s.Tspan,s.FX,{font:function(e,i){if("object"===t(e))for(i in e)this.font(i,e[i]);return"leading"==e?this.leading(i):"anchor"==e?this.attr("text-anchor",i):"size"==e||"family"==e||"weight"==e||"stretch"==e||"variant"==e||"style"==e?this.attr("font-"+e,i):this.attr(e,i)}}),s.Set=s.invent({create:function(t){Array.isArray(t)?this.members=t:this.clear()},extend:{add:function(){var t,e,i=[].slice.call(arguments);for(t=0,e=i.length;t<e;t++)this.members.push(i[t]);return this},remove:function(t){var e=this.index(t);return e>-1&&this.members.splice(e,1),this},each:function(t){for(var e=0,i=this.members.length;e<i;e++)t.apply(this.members[e],[e,this.members]);return this},clear:function(){return this.members=[],this},length:function(){return this.members.length},has:function(t){return this.index(t)>=0},index:function(t){return this.members.indexOf(t)},get:function(t){return this.members[t]},first:function(){return this.get(0)},last:function(){return this.get(this.members.length-1)},valueOf:function(){return this.members},bbox:function(){if(0==this.members.length)return new s.RBox;var t=this.members[0].rbox(this.members[0].doc());return this.each(function(){t=t.merge(this.rbox(this.doc()))}),t}},construct:{set:function(t){return new s.Set(t)}}}),s.FX.Set=s.invent({create:function(t){this.set=t}}),s.Set.inherit=function(){var t=[];for(var e in s.Shape.prototype)"function"==typeof s.Shape.prototype[e]&&"function"!=typeof s.Set.prototype[e]&&t.push(e);for(var e in t.forEach(function(t){s.Set.prototype[t]=function(){for(var e=0,i=this.members.length;e<i;e++)this.members[e]&&"function"==typeof this.members[e][t]&&this.members[e][t].apply(this.members[e],arguments);return"animate"==t?this.fx||(this.fx=new s.FX.Set(this)):this}}),t=[],s.FX.prototype)"function"==typeof s.FX.prototype[e]&&"function"!=typeof s.FX.Set.prototype[e]&&t.push(e);t.forEach(function(t){s.FX.Set.prototype[t]=function(){for(var e=0,i=this.set.members.length;e<i;e++)this.set.members[e].fx[t].apply(this.set.members[e].fx,arguments);return this}})},s.extend(s.Element,{data:function(e,i,s){if("object"===t(e))for(i in e)this.data(i,e[i]);else if(arguments.length<2)try{return JSON.parse(this.attr("data-"+e))}catch(t){return this.attr("data-"+e)}else this.attr("data-"+e,null===i?null:!0===s||"string"==typeof i||"number"==typeof i?i:JSON.stringify(i));return this}}),s.extend(s.Element,{remember:function(e,i){if("object"===t(arguments[0]))for(var i in e)this.remember(i,e[i]);else{if(1==arguments.length)return this.memory()[e];this.memory()[e]=i}return this},forget:function(){if(0==arguments.length)this._memory={};else for(var t=arguments.length-1;t>=0;t--)delete this.memory()[arguments[t]];return this},memory:function(){return this._memory||(this._memory={})}}),s.get=function(t){var e=i.getElementById(function(t){var e=(t||"").toString().match(s.regex.reference);if(e)return e[1]}(t)||t);return s.adopt(e)},s.select=function(t,e){return new s.Set(s.utils.map((e||i).querySelectorAll(t),function(t){return s.adopt(t)}))},s.extend(s.Parent,{select:function(t){return s.select(t,this.node)}});var y="abcdef".split("");if("function"!=typeof e.CustomEvent){var w=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var s=i.createEvent("CustomEvent");return s.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),s};w.prototype=e.Event.prototype,s.CustomEvent=w}else s.CustomEvent=e.CustomEvent;return function(t){for(var i=0,s=["moz","webkit"],a=0;a<s.length&&!e.requestAnimationFrame;++a)t.requestAnimationFrame=t[s[a]+"RequestAnimationFrame"],t.cancelAnimationFrame=t[s[a]+"CancelAnimationFrame"]||t[s[a]+"CancelRequestAnimationFrame"];t.requestAnimationFrame=t.requestAnimationFrame||function(e){var s=(new Date).getTime(),a=Math.max(0,16-(s-i)),n=t.setTimeout(function(){e(s+a)},a);return i=s+a,n},t.cancelAnimationFrame=t.cancelAnimationFrame||t.clearTimeout}(e),s},"function"==typeof define&&define.amd?define(function(){return at(st,st.document)}):"object"===("undefined"==typeof exports?"undefined":t(exports))&&"undefined"!=typeof module?module.exports=st.document?at(st,st.document):function(t){return at(t,t.document)}:st.SVG=at(st,st.document),function(){SVG.Filter=SVG.invent({create:"filter",inherit:SVG.Parent,extend:{source:"SourceGraphic",sourceAlpha:"SourceAlpha",background:"BackgroundImage",backgroundAlpha:"BackgroundAlpha",fill:"FillPaint",stroke:"StrokePaint",autoSetIn:!0,put:function(t,e){return this.add(t,e),!t.attr("in")&&this.autoSetIn&&t.attr("in",this.source),t.attr("result")||t.attr("result",t),t},blend:function(t,e,i){return this.put(new SVG.BlendEffect(t,e,i))},colorMatrix:function(t,e){return this.put(new SVG.ColorMatrixEffect(t,e))},convolveMatrix:function(t){return this.put(new SVG.ConvolveMatrixEffect(t))},componentTransfer:function(t){return this.put(new SVG.ComponentTransferEffect(t))},composite:function(t,e,i){return this.put(new SVG.CompositeEffect(t,e,i))},flood:function(t,e){return this.put(new SVG.FloodEffect(t,e))},offset:function(t,e){return this.put(new SVG.OffsetEffect(t,e))},image:function(t){return this.put(new SVG.ImageEffect(t))},merge:function(){var t=[void 0];for(var e in arguments)t.push(arguments[e]);return this.put(new(SVG.MergeEffect.bind.apply(SVG.MergeEffect,t)))},gaussianBlur:function(t,e){return this.put(new SVG.GaussianBlurEffect(t,e))},morphology:function(t,e){return this.put(new SVG.MorphologyEffect(t,e))},diffuseLighting:function(t,e,i){return this.put(new SVG.DiffuseLightingEffect(t,e,i))},displacementMap:function(t,e,i,s,a){return this.put(new SVG.DisplacementMapEffect(t,e,i,s,a))},specularLighting:function(t,e,i,s){return this.put(new SVG.SpecularLightingEffect(t,e,i,s))},tile:function(){return this.put(new SVG.TileEffect)},turbulence:function(t,e,i,s,a){return this.put(new SVG.TurbulenceEffect(t,e,i,s,a))},toString:function(){return"url(#"+this.attr("id")+")"}}}),SVG.extend(SVG.Defs,{filter:function(t){var e=this.put(new SVG.Filter);return"function"==typeof t&&t.call(e,e),e}}),SVG.extend(SVG.Container,{filter:function(t){return this.defs().filter(t)}}),SVG.extend(SVG.Element,SVG.G,SVG.Nested,{filter:function(t){return this.filterer=t instanceof SVG.Element?t:this.doc().filter(t),this.doc()&&this.filterer.doc()!==this.doc()&&this.doc().defs().add(this.filterer),this.attr("filter",this.filterer),this.filterer},unfilter:function(t){return this.filterer&&!0===t&&this.filterer.remove(),delete this.filterer,this.attr("filter",null)}}),SVG.Effect=SVG.invent({create:function(){this.constructor.call(this)},inherit:SVG.Element,extend:{in:function(t){return null==t?this.parent()&&this.parent().select('[result="'+this.attr("in")+'"]').get(0)||this.attr("in"):this.attr("in",t)},result:function(t){return null==t?this.attr("result"):this.attr("result",t)},toString:function(){return this.result()}}}),SVG.ParentEffect=SVG.invent({create:function(){this.constructor.call(this)},inherit:SVG.Parent,extend:{in:function(t){return null==t?this.parent()&&this.parent().select('[result="'+this.attr("in")+'"]').get(0)||this.attr("in"):this.attr("in",t)},result:function(t){return null==t?this.attr("result"):this.attr("result",t)},toString:function(){return this.result()}}});var t={blend:function(t,e){return this.parent()&&this.parent().blend(this,t,e)},colorMatrix:function(t,e){return this.parent()&&this.parent().colorMatrix(t,e).in(this)},convolveMatrix:function(t){return this.parent()&&this.parent().convolveMatrix(t).in(this)},componentTransfer:function(t){return this.parent()&&this.parent().componentTransfer(t).in(this)},composite:function(t,e){return this.parent()&&this.parent().composite(this,t,e)},flood:function(t,e){return this.parent()&&this.parent().flood(t,e)},offset:function(t,e){return this.parent()&&this.parent().offset(t,e).in(this)},image:function(t){return this.parent()&&this.parent().image(t)},merge:function(){return this.parent()&&this.parent().merge.apply(this.parent(),[this].concat(arguments))},gaussianBlur:function(t,e){return this.parent()&&this.parent().gaussianBlur(t,e).in(this)},morphology:function(t,e){return this.parent()&&this.parent().morphology(t,e).in(this)},diffuseLighting:function(t,e,i){return this.parent()&&this.parent().diffuseLighting(t,e,i).in(this)},displacementMap:function(t,e,i,s){return this.parent()&&this.parent().displacementMap(this,t,e,i,s)},specularLighting:function(t,e,i,s){return this.parent()&&this.parent().specularLighting(t,e,i,s).in(this)},tile:function(){return this.parent()&&this.parent().tile().in(this)},turbulence:function(t,e,i,s,a){return this.parent()&&this.parent().turbulence(t,e,i,s,a).in(this)}};SVG.extend(SVG.Effect,t),SVG.extend(SVG.ParentEffect,t),SVG.ChildEffect=SVG.invent({create:function(){this.constructor.call(this)},inherit:SVG.Element,extend:{in:function(t){this.attr("in",t)}}});var e={blend:function(t,e,i){this.attr({in:t,in2:e,mode:i||"normal"})},colorMatrix:function(t,e){"matrix"==t&&(e=a(e)),this.attr({type:t,values:void 0===e?null:e})},convolveMatrix:function(t){t=a(t),this.attr({order:Math.sqrt(t.split(" ").length),kernelMatrix:t})},composite:function(t,e,i){this.attr({in:t,in2:e,operator:i})},flood:function(t,e){this.attr("flood-color",t),null!=e&&this.attr("flood-opacity",e)},offset:function(t,e){this.attr({dx:t,dy:e})},image:function(t){this.attr("href",t,SVG.xlink)},displacementMap:function(t,e,i,s,a){this.attr({in:t,in2:e,scale:i,xChannelSelector:s,yChannelSelector:a})},gaussianBlur:function(t,e){null!=t||null!=e?this.attr("stdDeviation",function(t){if(!Array.isArray(t))return t;for(var e=0,i=t.length,s=[];e<i;e++)s.push(t[e]);return s.join(" ")}(Array.prototype.slice.call(arguments))):this.attr("stdDeviation","0 0")},morphology:function(t,e){this.attr({operator:t,radius:e})},tile:function(){},turbulence:function(t,e,i,s,a){this.attr({numOctaves:e,seed:i,stitchTiles:s,baseFrequency:t,type:a})}},i={merge:function(){var t;if(arguments[0]instanceof SVG.Set){var e=this;arguments[0].each(function(t){this instanceof SVG.MergeNode?e.put(this):(this instanceof SVG.Effect||this instanceof SVG.ParentEffect)&&e.put(new SVG.MergeNode(this))})}else{t=Array.isArray(arguments[0])?arguments[0]:arguments;for(var i=0;i<t.length;i++)t[i]instanceof SVG.MergeNode?this.put(t[i]):this.put(new SVG.MergeNode(t[i]))}},componentTransfer:function(t){if(this.rgb=new SVG.Set,["r","g","b","a"].forEach(function(t){this[t]=new(SVG["Func"+t.toUpperCase()])("identity"),this.rgb.add(this[t]),this.node.appendChild(this[t].node)}.bind(this)),t)for(var e in t.rgb&&(["r","g","b"].forEach(function(e){this[e].attr(t.rgb)}.bind(this)),delete t.rgb),t)this[e].attr(t[e])},diffuseLighting:function(t,e,i){this.attr({surfaceScale:t,diffuseConstant:e,kernelUnitLength:i})},specularLighting:function(t,e,i,s){this.attr({surfaceScale:t,diffuseConstant:e,specularExponent:i,kernelUnitLength:s})}},s={distantLight:function(t,e){this.attr({azimuth:t,elevation:e})},pointLight:function(t,e,i){this.attr({x:t,y:e,z:i})},spotLight:function(t,e,i,s,a,n){this.attr({x:t,y:e,z:i,pointsAtX:s,pointsAtY:a,pointsAtZ:n})},mergeNode:function(t){this.attr("in",t)}};function a(t){return Array.isArray(t)&&(t=new SVG.Array(t)),t.toString().replace(/^\s+/,"").replace(/\s+$/,"").replace(/\s+/g," ")}function n(){var t=function(){};for(var e in"function"==typeof arguments[arguments.length-1]&&(t=arguments[arguments.length-1],Array.prototype.splice.call(arguments,arguments.length-1,1)),arguments)for(var i in arguments[e])t(arguments[e][i],i,arguments[e])}["r","g","b","a"].forEach(function(t){s["Func"+t.toUpperCase()]=function(t){switch(this.attr("type",t),t){case"table":this.attr("tableValues",arguments[1]);break;case"linear":this.attr("slope",arguments[1]),this.attr("intercept",arguments[2]);break;case"gamma":this.attr("amplitude",arguments[1]),this.attr("exponent",arguments[2]),this.attr("offset",arguments[2])}}}),n(e,function(t,e){var i=e.charAt(0).toUpperCase()+e.slice(1);SVG[i+"Effect"]=SVG.invent({create:function(){this.constructor.call(this,SVG.create("fe"+i)),t.apply(this,arguments),this.result(this.attr("id")+"Out")},inherit:SVG.Effect,extend:{}})}),n(i,function(t,e){var i=e.charAt(0).toUpperCase()+e.slice(1);SVG[i+"Effect"]=SVG.invent({create:function(){this.constructor.call(this,SVG.create("fe"+i)),t.apply(this,arguments),this.result(this.attr("id")+"Out")},inherit:SVG.ParentEffect,extend:{}})}),n(s,function(t,e){var i=e.charAt(0).toUpperCase()+e.slice(1);SVG[i]=SVG.invent({create:function(){this.constructor.call(this,SVG.create("fe"+i)),t.apply(this,arguments)},inherit:SVG.ChildEffect,extend:{}})}),SVG.extend(SVG.MergeEffect,{in:function(t){return t instanceof SVG.MergeNode?this.add(t,0):this.add(new SVG.MergeNode(t),0),this}}),SVG.extend(SVG.CompositeEffect,SVG.BlendEffect,SVG.DisplacementMapEffect,{in2:function(t){return null==t?this.parent()&&this.parent().select('[result="'+this.attr("in2")+'"]').get(0)||this.attr("in2"):this.attr("in2",t)}}),SVG.filter={sepiatone:[.343,.669,.119,0,0,.249,.626,.13,0,0,.172,.334,.111,0,0,0,0,0,1,0]}}.call(void 0),function(){function t(t,a,n,r,o,l,h){for(var c=t.slice(a,n||h),d=r.slice(o,l||h),u=0,g={pos:[0,0],start:[0,0]},f={pos:[0,0],start:[0,0]};;){if(c[u]=e.call(g,c[u]),d[u]=e.call(f,d[u]),c[u][0]!=d[u][0]||"M"==c[u][0]||"A"==c[u][0]&&(c[u][4]!=d[u][4]||c[u][5]!=d[u][5])?(Array.prototype.splice.apply(c,[u,1].concat(s.call(g,c[u]))),Array.prototype.splice.apply(d,[u,1].concat(s.call(f,d[u])))):(c[u]=i.call(g,c[u]),d[u]=i.call(f,d[u])),++u==c.length&&u==d.length)break;u==c.length&&c.push(["C",g.pos[0],g.pos[1],g.pos[0],g.pos[1],g.pos[0],g.pos[1]]),u==d.length&&d.push(["C",f.pos[0],f.pos[1],f.pos[0],f.pos[1],f.pos[0],f.pos[1]])}return{start:c,dest:d}}function e(t){switch(t[0]){case"z":case"Z":t[0]="L",t[1]=this.start[0],t[2]=this.start[1];break;case"H":t[0]="L",t[2]=this.pos[1];break;case"V":t[0]="L",t[2]=t[1],t[1]=this.pos[0];break;case"T":t[0]="Q",t[3]=t[1],t[4]=t[2],t[1]=this.reflection[1],t[2]=this.reflection[0];break;case"S":t[0]="C",t[6]=t[4],t[5]=t[3],t[4]=t[2],t[3]=t[1],t[2]=this.reflection[1],t[1]=this.reflection[0]}return t}function i(t){var e=t.length;return this.pos=[t[e-2],t[e-1]],-1!="SCQT".indexOf(t[0])&&(this.reflection=[2*this.pos[0]-t[e-4],2*this.pos[1]-t[e-3]]),t}function s(t){var e=[t];switch(t[0]){case"M":return this.pos=this.start=[t[1],t[2]],e;case"L":t[5]=t[3]=t[1],t[6]=t[4]=t[2],t[1]=this.pos[0],t[2]=this.pos[1];break;case"Q":t[6]=t[4],t[5]=t[3],t[4]=1*t[4]/3+2*t[2]/3,t[3]=1*t[3]/3+2*t[1]/3,t[2]=1*this.pos[1]/3+2*t[2]/3,t[1]=1*this.pos[0]/3+2*t[1]/3;break;case"A":t=(e=function(t,e){var i,s,a,n,r,o,l,h,c,d,u,g,f,p,x,b,m,v,y,w,k,A,S,C,L,z,P=Math.abs(e[1]),E=Math.abs(e[2]),M=e[3]%360,T=e[4],X=e[5],I=e[6],Y=e[7],F=new SVG.Point(t),R=new SVG.Point(I,Y),D=[];if(0===P||0===E||F.x===R.x&&F.y===R.y)return[["C",F.x,F.y,R.x,R.y,R.x,R.y]];i=new SVG.Point((F.x-R.x)/2,(F.y-R.y)/2).transform((new SVG.Matrix).rotate(M)),(s=i.x*i.x/(P*P)+i.y*i.y/(E*E))>1&&(s=Math.sqrt(s),P*=s,E*=s);a=(new SVG.Matrix).rotate(M).scale(1/P,1/E).rotate(-M),F=F.transform(a),R=R.transform(a),n=[R.x-F.x,R.y-F.y],o=n[0]*n[0]+n[1]*n[1],r=Math.sqrt(o),n[0]/=r,n[1]/=r,l=o<4?Math.sqrt(1-o/4):0,T===X&&(l*=-1);h=new SVG.Point((R.x+F.x)/2+l*-n[1],(R.y+F.y)/2+l*n[0]),c=new SVG.Point(F.x-h.x,F.y-h.y),d=new SVG.Point(R.x-h.x,R.y-h.y),u=Math.acos(c.x/Math.sqrt(c.x*c.x+c.y*c.y)),c.y<0&&(u*=-1);g=Math.acos(d.x/Math.sqrt(d.x*d.x+d.y*d.y)),d.y<0&&(g*=-1);X&&u>g&&(g+=2*Math.PI);!X&&u<g&&(g-=2*Math.PI);for(p=Math.ceil(2*Math.abs(u-g)/Math.PI),b=[],m=u,f=(g-u)/p,x=4*Math.tan(f/4)/3,k=0;k<=p;k++)y=Math.cos(m),v=Math.sin(m),w=new SVG.Point(h.x+y,h.y+v),b[k]=[new SVG.Point(w.x+x*v,w.y-x*y),w,new SVG.Point(w.x-x*v,w.y+x*y)],m+=f;for(b[0][0]=b[0][1].clone(),b[b.length-1][2]=b[b.length-1][1].clone(),a=(new SVG.Matrix).rotate(M).scale(P,E).rotate(-M),k=0,A=b.length;k<A;k++)b[k][0]=b[k][0].transform(a),b[k][1]=b[k][1].transform(a),b[k][2]=b[k][2].transform(a);for(k=1,A=b.length;k<A;k++)w=b[k-1][2],S=w.x,C=w.y,w=b[k][0],L=w.x,z=w.y,w=b[k][1],I=w.x,Y=w.y,D.push(["C",S,C,L,z,I,Y]);return D}(this.pos,t))[0]}return t[0]="C",this.pos=[t[5],t[6]],this.reflection=[2*t[5]-t[3],2*t[6]-t[4]],e}function a(t,e){if(!1===e)return!1;for(var i=e,s=t.length;i<s;++i)if("M"==t[i][0])return i;return!1}SVG.extend(SVG.PathArray,{morph:function(e){for(var i=this.value,s=this.parse(e),n=0,r=0,o=!1,l=!1;!1!==n||!1!==r;){var h;o=a(i,!1!==n&&n+1),l=a(s,!1!==r&&r+1),!1===n&&(n=0==(h=new SVG.PathArray(c.start).bbox()).height||0==h.width?i.push(i[0])-1:i.push(["M",h.x+h.width/2,h.y+h.height/2])-1),!1===r&&(r=0==(h=new SVG.PathArray(c.dest).bbox()).height||0==h.width?s.push(s[0])-1:s.push(["M",h.x+h.width/2,h.y+h.height/2])-1);var c=t(i,n,o,s,r,l);i=i.slice(0,n).concat(c.start,!1===o?[]:i.slice(o)),s=s.slice(0,r).concat(c.dest,!1===l?[]:s.slice(l)),n=!1!==o&&n+c.start.length,r=!1!==l&&r+c.dest.length}return this.value=i,this.destination=new SVG.PathArray,this.destination.value=s,this}})}(),function(){function t(t){t.remember("_draggable",this),this.el=t}t.prototype.init=function(t,e){var i=this;this.constraint=t,this.value=e,this.el.on("mousedown.drag",function(t){i.start(t)}),this.el.on("touchstart.drag",function(t){i.start(t)})},t.prototype.transformPoint=function(t,e){var i=(t=t||window.event).changedTouches&&t.changedTouches[0]||t;return this.p.x=i.pageX-(e||0),this.p.y=i.pageY,this.p.matrixTransform(this.m)},t.prototype.getBBox=function(){var t=this.el.bbox();return this.el instanceof SVG.Nested&&(t=this.el.rbox()),(this.el instanceof SVG.G||this.el instanceof SVG.Use||this.el instanceof SVG.Nested)&&(t.x=this.el.x(),t.y=this.el.y()),t},t.prototype.start=function(t){if("click"!=t.type&&"mousedown"!=t.type&&"mousemove"!=t.type||1==(t.which||t.buttons)){var e=this;this.el.fire("beforedrag",{event:t,handler:this}),this.parent=this.parent||this.el.parent(SVG.Nested)||this.el.parent(SVG.Doc),this.p=this.parent.node.createSVGPoint(),this.m=this.el.node.getScreenCTM().inverse();var i,s=this.getBBox();if(this.el instanceof SVG.Text)switch(i=this.el.node.getComputedTextLength(),this.el.attr("text-anchor")){case"middle":i/=2;break;case"start":i=0}this.startPoints={point:this.transformPoint(t,i),box:s,transform:this.el.transform()},SVG.on(window,"mousemove.drag",function(t){e.drag(t)}),SVG.on(window,"touchmove.drag",function(t){e.drag(t)}),SVG.on(window,"mouseup.drag",function(t){e.end(t)}),SVG.on(window,"touchend.drag",function(t){e.end(t)}),this.el.fire("dragstart",{event:t,p:this.startPoints.point,m:this.m,handler:this}),t.preventDefault(),t.stopPropagation()}},t.prototype.drag=function(t){var e=this.getBBox(),i=this.transformPoint(t),s=this.startPoints.box.x+i.x-this.startPoints.point.x,a=this.startPoints.box.y+i.y-this.startPoints.point.y,n=this.constraint,r=i.x-this.startPoints.point.x,o=i.y-this.startPoints.point.y,l=new CustomEvent("dragmove",{detail:{event:t,p:i,m:this.m,handler:this},cancelable:!0});if(this.el.fire(l),l.defaultPrevented)return i;if("function"==typeof n){var h=n.call(this.el,s,a,this.m);"boolean"==typeof h&&(h={x:h,y:h}),!0===h.x?this.el.x(s):!1!==h.x&&this.el.x(h.x),!0===h.y?this.el.y(a):!1!==h.y&&this.el.y(h.y)}else"object"==typeof n&&(null!=n.minX&&s<n.minX?s=n.minX:null!=n.maxX&&s>n.maxX-e.width&&(s=n.maxX-e.width),null!=n.minY&&a<n.minY?a=n.minY:null!=n.maxY&&a>n.maxY-e.height&&(a=n.maxY-e.height),this.el instanceof SVG.G?this.el.matrix(this.startPoints.transform).transform({x:r,y:o},!0):this.el.move(s,a));return i},t.prototype.end=function(t){var e=this.drag(t);this.el.fire("dragend",{event:t,p:e,m:this.m,handler:this}),SVG.off(window,"mousemove.drag"),SVG.off(window,"touchmove.drag"),SVG.off(window,"mouseup.drag"),SVG.off(window,"touchend.drag")},SVG.extend(SVG.Element,{draggable:function(e,i){"function"!=typeof e&&"object"!=typeof e||(i=e,e=!0);var s=this.remember("_draggable")||new t(this);return(e=void 0===e||e)?s.init(i||{},e):(this.off("mousedown.drag"),this.off("touchstart.drag")),this}})}.call(void 0),function(){function t(t){this.el=t,t.remember("_selectHandler",this),this.pointSelection={isSelected:!1},this.rectSelection={isSelected:!1}}t.prototype.init=function(t,e){var i=this.el.bbox();for(var s in this.options={},this.el.selectize.defaults)this.options[s]=this.el.selectize.defaults[s],void 0!==e[s]&&(this.options[s]=e[s]);this.parent=this.el.parent(),this.nested=this.nested||this.parent.group(),this.nested.matrix(new SVG.Matrix(this.el).translate(i.x,i.y)),this.options.deepSelect&&-1!==["line","polyline","polygon"].indexOf(this.el.type)?this.selectPoints(t):this.selectRect(t),this.observe(),this.cleanup()},t.prototype.selectPoints=function(t){return this.pointSelection.isSelected=t,this.pointSelection.set?this:(this.pointSelection.set=this.parent.set(),this.drawCircles(),this)},t.prototype.getPointArray=function(){var t=this.el.bbox();return this.el.array().valueOf().map(function(e){return[e[0]-t.x,e[1]-t.y]})},t.prototype.drawCircles=function(){for(var t=this,e=this.getPointArray(),i=0,s=e.length;i<s;++i){var a=function(e){return function(i){(i=i||window.event).preventDefault?i.preventDefault():i.returnValue=!1,i.stopPropagation();var s=i.pageX||i.touches[0].pageX,a=i.pageY||i.touches[0].pageY;t.el.fire("point",{x:s,y:a,i:e,event:i})}}(i);this.pointSelection.set.add(this.nested.circle(this.options.radius).center(e[i][0],e[i][1]).addClass(this.options.classPoints).addClass(this.options.classPoints+"_point").on("touchstart",a).on("mousedown",a))}},t.prototype.updatePointSelection=function(){var t=this.getPointArray();this.pointSelection.set.each(function(e){this.cx()===t[e][0]&&this.cy()===t[e][1]||this.center(t[e][0],t[e][1])})},t.prototype.updateRectSelection=function(){var t=this.el.bbox();this.rectSelection.set.get(0).attr({width:t.width,height:t.height}),this.options.points&&(this.rectSelection.set.get(2).center(t.width,0),this.rectSelection.set.get(3).center(t.width,t.height),this.rectSelection.set.get(4).center(0,t.height),this.rectSelection.set.get(5).center(t.width/2,0),this.rectSelection.set.get(6).center(t.width,t.height/2),this.rectSelection.set.get(7).center(t.width/2,t.height),this.rectSelection.set.get(8).center(0,t.height/2)),this.options.rotationPoint&&(this.options.points?this.rectSelection.set.get(9).center(t.width/2,20):this.rectSelection.set.get(1).center(t.width/2,20))},t.prototype.selectRect=function(t){var e=this,i=this.el.bbox();function s(t){return function(i){(i=i||window.event).preventDefault?i.preventDefault():i.returnValue=!1,i.stopPropagation();var s=i.pageX||i.touches[0].pageX,a=i.pageY||i.touches[0].pageY;e.el.fire(t,{x:s,y:a,event:i})}}if(this.rectSelection.isSelected=t,this.rectSelection.set=this.rectSelection.set||this.parent.set(),this.rectSelection.set.get(0)||this.rectSelection.set.add(this.nested.rect(i.width,i.height).addClass(this.options.classRect)),this.options.points&&!this.rectSelection.set.get(1)){var a="touchstart",n="mousedown";this.rectSelection.set.add(this.nested.circle(this.options.radius).center(0,0).attr("class",this.options.classPoints+"_lt").on(n,s("lt")).on(a,s("lt"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(i.width,0).attr("class",this.options.classPoints+"_rt").on(n,s("rt")).on(a,s("rt"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(i.width,i.height).attr("class",this.options.classPoints+"_rb").on(n,s("rb")).on(a,s("rb"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(0,i.height).attr("class",this.options.classPoints+"_lb").on(n,s("lb")).on(a,s("lb"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(i.width/2,0).attr("class",this.options.classPoints+"_t").on(n,s("t")).on(a,s("t"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(i.width,i.height/2).attr("class",this.options.classPoints+"_r").on(n,s("r")).on(a,s("r"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(i.width/2,i.height).attr("class",this.options.classPoints+"_b").on(n,s("b")).on(a,s("b"))),this.rectSelection.set.add(this.nested.circle(this.options.radius).center(0,i.height/2).attr("class",this.options.classPoints+"_l").on(n,s("l")).on(a,s("l"))),this.rectSelection.set.each(function(){this.addClass(e.options.classPoints)})}if(this.options.rotationPoint&&(this.options.points&&!this.rectSelection.set.get(9)||!this.options.points&&!this.rectSelection.set.get(1))){var r=function(t){(t=t||window.event).preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation();var i=t.pageX||t.touches[0].pageX,s=t.pageY||t.touches[0].pageY;e.el.fire("rot",{x:i,y:s,event:t})};this.rectSelection.set.add(this.nested.circle(this.options.radius).center(i.width/2,20).attr("class",this.options.classPoints+"_rot").on("touchstart",r).on("mousedown",r))}},t.prototype.handler=function(){var t=this.el.bbox();this.nested.matrix(new SVG.Matrix(this.el).translate(t.x,t.y)),this.rectSelection.isSelected&&this.updateRectSelection(),this.pointSelection.isSelected&&this.updatePointSelection()},t.prototype.observe=function(){var t=this;if(MutationObserver)if(this.rectSelection.isSelected||this.pointSelection.isSelected)this.observerInst=this.observerInst||new MutationObserver(function(){t.handler()}),this.observerInst.observe(this.el.node,{attributes:!0});else try{this.observerInst.disconnect(),delete this.observerInst}catch(t){}else this.el.off("DOMAttrModified.select"),(this.rectSelection.isSelected||this.pointSelection.isSelected)&&this.el.on("DOMAttrModified.select",function(){t.handler()})},t.prototype.cleanup=function(){!this.rectSelection.isSelected&&this.rectSelection.set&&(this.rectSelection.set.each(function(){this.remove()}),this.rectSelection.set.clear(),delete this.rectSelection.set),!this.pointSelection.isSelected&&this.pointSelection.set&&(this.pointSelection.set.each(function(){this.remove()}),this.pointSelection.set.clear(),delete this.pointSelection.set),this.pointSelection.isSelected||this.rectSelection.isSelected||(this.nested.remove(),delete this.nested)},SVG.extend(SVG.Element,{selectize:function(e,i){return"object"==typeof e&&(i=e,e=!0),(this.remember("_selectHandler")||new t(this)).init(void 0===e||e,i||{}),this}}),SVG.Element.prototype.selectize.defaults={points:!0,classRect:"svg_select_boundingRect",classPoints:"svg_select_points",radius:7,rotationPoint:!0,deepSelect:!1}}(),function(){(function(){function t(t){t.remember("_resizeHandler",this),this.el=t,this.parameters={},this.lastUpdateCall=null,this.p=t.doc().node.createSVGPoint()}t.prototype.transformPoint=function(t,e,i){return this.p.x=t-(this.offset.x-window.pageXOffset),this.p.y=e-(this.offset.y-window.pageYOffset),this.p.matrixTransform(i||this.m)},t.prototype._extractPosition=function(t){return{x:null!=t.clientX?t.clientX:t.touches[0].clientX,y:null!=t.clientY?t.clientY:t.touches[0].clientY}},t.prototype.init=function(t){var e=this;if(this.stop(),"stop"!==t){for(var i in this.options={},this.el.resize.defaults)this.options[i]=this.el.resize.defaults[i],void 0!==t[i]&&(this.options[i]=t[i]);this.el.on("lt.resize",function(t){e.resize(t||window.event)}),this.el.on("rt.resize",function(t){e.resize(t||window.event)}),this.el.on("rb.resize",function(t){e.resize(t||window.event)}),this.el.on("lb.resize",function(t){e.resize(t||window.event)}),this.el.on("t.resize",function(t){e.resize(t||window.event)}),this.el.on("r.resize",function(t){e.resize(t||window.event)}),this.el.on("b.resize",function(t){e.resize(t||window.event)}),this.el.on("l.resize",function(t){e.resize(t||window.event)}),this.el.on("rot.resize",function(t){e.resize(t||window.event)}),this.el.on("point.resize",function(t){e.resize(t||window.event)}),this.update()}},t.prototype.stop=function(){return this.el.off("lt.resize"),this.el.off("rt.resize"),this.el.off("rb.resize"),this.el.off("lb.resize"),this.el.off("t.resize"),this.el.off("r.resize"),this.el.off("b.resize"),this.el.off("l.resize"),this.el.off("rot.resize"),this.el.off("point.resize"),this},t.prototype.resize=function(t){var e=this;this.m=this.el.node.getScreenCTM().inverse(),this.offset={x:window.pageXOffset,y:window.pageYOffset};var i=this._extractPosition(t.detail.event);if(this.parameters={type:this.el.type,p:this.transformPoint(i.x,i.y),x:t.detail.x,y:t.detail.y,box:this.el.bbox(),rotation:this.el.transform().rotation},"text"===this.el.type&&(this.parameters.fontSize=this.el.attr()["font-size"]),void 0!==t.detail.i){var s=this.el.array().valueOf();this.parameters.i=t.detail.i,this.parameters.pointCoords=[s[t.detail.i][0],s[t.detail.i][1]]}switch(t.type){case"lt":this.calc=function(t,e){var i=this.snapToGrid(t,e);if(this.parameters.box.width-i[0]>0&&this.parameters.box.height-i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x+i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize-i[0]);i=this.checkAspectRatio(i),this.el.move(this.parameters.box.x+i[0],this.parameters.box.y+i[1]).size(this.parameters.box.width-i[0],this.parameters.box.height-i[1])}};break;case"rt":this.calc=function(t,e){var i=this.snapToGrid(t,e,2);if(this.parameters.box.width+i[0]>0&&this.parameters.box.height-i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x-i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize+i[0]);i=this.checkAspectRatio(i),this.el.move(this.parameters.box.x,this.parameters.box.y+i[1]).size(this.parameters.box.width+i[0],this.parameters.box.height-i[1])}};break;case"rb":this.calc=function(t,e){var i=this.snapToGrid(t,e,0);if(this.parameters.box.width+i[0]>0&&this.parameters.box.height+i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x-i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize+i[0]);i=this.checkAspectRatio(i),this.el.move(this.parameters.box.x,this.parameters.box.y).size(this.parameters.box.width+i[0],this.parameters.box.height+i[1])}};break;case"lb":this.calc=function(t,e){var i=this.snapToGrid(t,e,1);if(this.parameters.box.width-i[0]>0&&this.parameters.box.height+i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x+i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize-i[0]);i=this.checkAspectRatio(i),this.el.move(this.parameters.box.x+i[0],this.parameters.box.y).size(this.parameters.box.width-i[0],this.parameters.box.height+i[1])}};break;case"t":this.calc=function(t,e){var i=this.snapToGrid(t,e,2);if(this.parameters.box.height-i[1]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x,this.parameters.box.y+i[1]).height(this.parameters.box.height-i[1])}};break;case"r":this.calc=function(t,e){var i=this.snapToGrid(t,e,0);if(this.parameters.box.width+i[0]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x,this.parameters.box.y).width(this.parameters.box.width+i[0])}};break;case"b":this.calc=function(t,e){var i=this.snapToGrid(t,e,0);if(this.parameters.box.height+i[1]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x,this.parameters.box.y).height(this.parameters.box.height+i[1])}};break;case"l":this.calc=function(t,e){var i=this.snapToGrid(t,e,1);if(this.parameters.box.width-i[0]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x+i[0],this.parameters.box.y).width(this.parameters.box.width-i[0])}};break;case"rot":this.calc=function(t,e){var i=t+this.parameters.p.x,s=e+this.parameters.p.y,a=Math.atan2(this.parameters.p.y-this.parameters.box.y-this.parameters.box.height/2,this.parameters.p.x-this.parameters.box.x-this.parameters.box.width/2),n=180*(Math.atan2(s-this.parameters.box.y-this.parameters.box.height/2,i-this.parameters.box.x-this.parameters.box.width/2)-a)/Math.PI;this.el.center(this.parameters.box.cx,this.parameters.box.cy).rotate(this.parameters.rotation+n-n%this.options.snapToAngle,this.parameters.box.cx,this.parameters.box.cy)};break;case"point":this.calc=function(t,e){var i=this.snapToGrid(t,e,this.parameters.pointCoords[0],this.parameters.pointCoords[1]),s=this.el.array().valueOf();s[this.parameters.i][0]=this.parameters.pointCoords[0]+i[0],s[this.parameters.i][1]=this.parameters.pointCoords[1]+i[1],this.el.plot(s)}}this.el.fire("resizestart",{dx:this.parameters.x,dy:this.parameters.y,event:t}),SVG.on(window,"touchmove.resize",function(t){e.update(t||window.event)}),SVG.on(window,"touchend.resize",function(){e.done()}),SVG.on(window,"mousemove.resize",function(t){e.update(t||window.event)}),SVG.on(window,"mouseup.resize",function(){e.done()})},t.prototype.update=function(t){if(t){var e=this._extractPosition(t),i=this.transformPoint(e.x,e.y),s=i.x-this.parameters.p.x,a=i.y-this.parameters.p.y;this.lastUpdateCall=[s,a],this.calc(s,a),this.el.fire("resizing",{dx:s,dy:a,event:t})}else this.lastUpdateCall&&this.calc(this.lastUpdateCall[0],this.lastUpdateCall[1])},t.prototype.done=function(){this.lastUpdateCall=null,SVG.off(window,"mousemove.resize"),SVG.off(window,"mouseup.resize"),SVG.off(window,"touchmove.resize"),SVG.off(window,"touchend.resize"),this.el.fire("resizedone")},t.prototype.snapToGrid=function(t,e,i,s){var a;return void 0!==s?a=[(i+t)%this.options.snapToGrid,(s+e)%this.options.snapToGrid]:(i=null==i?3:i,a=[(this.parameters.box.x+t+(1&i?0:this.parameters.box.width))%this.options.snapToGrid,(this.parameters.box.y+e+(2&i?0:this.parameters.box.height))%this.options.snapToGrid]),t-=Math.abs(a[0])<this.options.snapToGrid/2?a[0]:a[0]-(t<0?-this.options.snapToGrid:this.options.snapToGrid),e-=Math.abs(a[1])<this.options.snapToGrid/2?a[1]:a[1]-(e<0?-this.options.snapToGrid:this.options.snapToGrid),this.constraintToBox(t,e,i,s)},t.prototype.constraintToBox=function(t,e,i,s){var a,n,r=this.options.constraint||{};return void 0!==s?(a=i,n=s):(a=this.parameters.box.x+(1&i?0:this.parameters.box.width),n=this.parameters.box.y+(2&i?0:this.parameters.box.height)),void 0!==r.minX&&a+t<r.minX&&(t=r.minX-a),void 0!==r.maxX&&a+t>r.maxX&&(t=r.maxX-a),void 0!==r.minY&&n+e<r.minY&&(e=r.minY-n),void 0!==r.maxY&&n+e>r.maxY&&(e=r.maxY-n),[t,e]},t.prototype.checkAspectRatio=function(t){if(!this.options.saveAspectRatio)return t;var e=t.slice(),i=this.parameters.box.width/this.parameters.box.height,s=this.parameters.box.width+t[0],a=this.parameters.box.height-t[1],n=s/a;return n<i?e[1]=s/i-this.parameters.box.height:n>i&&(e[0]=this.parameters.box.width-a*i),e},SVG.extend(SVG.Element,{resize:function(e){return(this.remember("_resizeHandler")||new t(this)).init(e||{}),this}}),SVG.Element.prototype.resize.defaults={snapToAngle:.1,snapToGrid:1,constraint:{},saveAspectRatio:!1}}).call(this)}();return function(t,e){void 0===e&&(e={});var i=e.insertAt;if(t&&"undefined"!=typeof document){var s=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===i&&s.firstChild?s.insertBefore(a,s.firstChild):s.appendChild(a),a.styleSheet?a.styleSheet.cssText=t:a.appendChild(document.createTextNode(t))}}('.apexcharts-canvas {\n  position: relative;\n  user-select: none;\n  /* cannot give overflow: hidden as it will crop tooltips which overflow outside chart area */\n}\n\n/* scrollbar is not visible by default for legend, hence forcing the visibility */\n.apexcharts-canvas ::-webkit-scrollbar {\n  -webkit-appearance: none;\n  width: 6px;\n}\n.apexcharts-canvas ::-webkit-scrollbar-thumb {\n  border-radius: 4px;\n  background-color: rgba(0,0,0,.5);\n  box-shadow: 0 0 1px rgba(255,255,255,.5);\n  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);\n}\n.apexcharts-canvas.dark {\n  background: #343F57;\n}\n\n.apexcharts-inner {\n  position: relative;\n}\n\n.legend-mouseover-inactive {\n  transition: 0.15s ease all;\n  opacity: 0.20;\n}\n\n.apexcharts-series-collapsed {\n  opacity: 0;\n}\n\n.apexcharts-gridline, .apexcharts-text {\n  pointer-events: none;\n}\n\n.apexcharts-tooltip {\n  border-radius: 5px;\n  box-shadow: 2px 2px 6px -4px #999;\n  cursor: default;\n  font-size: 14px;\n  left: 62px;\n  opacity: 0;\n  pointer-events: none;\n  position: absolute;\n  top: 20px;\n  overflow: hidden;\n  white-space: nowrap;\n  z-index: 12;\n  transition: 0.15s ease all;\n}\n.apexcharts-tooltip.light {\n  border: 1px solid #e3e3e3;\n  background: rgba(255, 255, 255, 0.96);\n}\n.apexcharts-tooltip.dark {\n  color: #fff;\n  background: rgba(30,30,30, 0.8);\n}\n.apexcharts-tooltip * {\n  font-family: inherit;\n}\n\n.apexcharts-tooltip .apexcharts-marker,\n.apexcharts-area-series .apexcharts-area,\n.apexcharts-line {\n  pointer-events: none;\n}\n\n.apexcharts-tooltip.active {\n  opacity: 1;\n  transition: 0.15s ease all;\n}\n\n.apexcharts-tooltip-title {\n  padding: 6px;\n  font-size: 15px;\n  margin-bottom: 4px;\n}\n.apexcharts-tooltip.light .apexcharts-tooltip-title {\n  background: #ECEFF1;\n  border-bottom: 1px solid #ddd;\n}\n.apexcharts-tooltip.dark .apexcharts-tooltip-title {\n  background: rgba(0, 0, 0, 0.7);\n  border-bottom: 1px solid #333;\n}\n\n.apexcharts-tooltip-text-value,\n.apexcharts-tooltip-text-z-value {\n  display: inline-block;\n  font-weight: 600;\n  margin-left: 5px;\n}\n\n.apexcharts-tooltip-text-z-label:empty,\n.apexcharts-tooltip-text-z-value:empty {\n  display: none;\n}\n\n.apexcharts-tooltip-text-value, \n.apexcharts-tooltip-text-z-value {\n  font-weight: 600;\n}\n\n.apexcharts-tooltip-marker {\n  width: 12px;\n  height: 12px;\n  position: relative;\n  top: 0px;\n  margin-right: 10px;\n  border-radius: 50%;\n}\n\n.apexcharts-tooltip-series-group {\n  padding: 0 10px;\n  display: none;\n  text-align: left;\n  justify-content: left;\n  align-items: center;\n}\n\n.apexcharts-tooltip-series-group.active .apexcharts-tooltip-marker {\n  opacity: 1;\n}\n.apexcharts-tooltip-series-group.active, .apexcharts-tooltip-series-group:last-child {\n  padding-bottom: 4px;\n}\n.apexcharts-tooltip-y-group {\n  padding: 6px 0 5px;\n}\n.apexcharts-tooltip-candlestick {\n  padding: 4px 8px;\n}\n.apexcharts-tooltip-candlestick > div {\n  margin: 4px 0;\n}\n.apexcharts-tooltip-candlestick span.value {\n  font-weight: bold;\n}\n\n.apexcharts-tooltip-rangebar {\n  padding: 5px 8px;\n}\n\n.apexcharts-tooltip-rangebar .category {\n  font-weight: 600;\n  color: #777;\n}\n\n.apexcharts-tooltip-rangebar .series-name {\n  font-weight: bold;\n  display: block;\n  margin-bottom: 5px;\n}\n\n.apexcharts-xaxistooltip {\n  opacity: 0;\n  padding: 9px 10px;\n  pointer-events: none;\n  color: #373d3f;\n  font-size: 13px;\n  text-align: center;\n  border-radius: 2px;\n  position: absolute;\n  z-index: 10;\n\tbackground: #ECEFF1;\n  border: 1px solid #90A4AE;\n  transition: 0.15s ease all;\n}\n\n.apexcharts-xaxistooltip.dark {\n  background: rgba(0, 0, 0, 0.7);\n  border: 1px solid rgba(0, 0, 0, 0.5);\n  color: #fff;\n}\n\n.apexcharts-xaxistooltip:after, .apexcharts-xaxistooltip:before {\n\tleft: 50%;\n\tborder: solid transparent;\n\tcontent: " ";\n\theight: 0;\n\twidth: 0;\n\tposition: absolute;\n\tpointer-events: none;\n}\n\n.apexcharts-xaxistooltip:after {\n\tborder-color: rgba(236, 239, 241, 0);\n\tborder-width: 6px;\n\tmargin-left: -6px;\n}\n.apexcharts-xaxistooltip:before {\n\tborder-color: rgba(144, 164, 174, 0);\n\tborder-width: 7px;\n\tmargin-left: -7px;\n}\n\n.apexcharts-xaxistooltip-bottom:after, .apexcharts-xaxistooltip-bottom:before {\n  bottom: 100%;\n}\n\n.apexcharts-xaxistooltip-top:after, .apexcharts-xaxistooltip-top:before {\n  top: 100%;\n}\n\n.apexcharts-xaxistooltip-bottom:after {\n  border-bottom-color: #ECEFF1;\n}\n.apexcharts-xaxistooltip-bottom:before {\n  border-bottom-color: #90A4AE;\n}\n\n.apexcharts-xaxistooltip-bottom.dark:after {\n  border-bottom-color: rgba(0, 0, 0, 0.5);\n}\n.apexcharts-xaxistooltip-bottom.dark:before {\n  border-bottom-color: rgba(0, 0, 0, 0.5);\n}\n\n.apexcharts-xaxistooltip-top:after {\n  border-top-color:#ECEFF1\n}\n.apexcharts-xaxistooltip-top:before {\n  border-top-color: #90A4AE;\n}\n.apexcharts-xaxistooltip-top.dark:after {\n  border-top-color:rgba(0, 0, 0, 0.5);\n}\n.apexcharts-xaxistooltip-top.dark:before {\n  border-top-color: rgba(0, 0, 0, 0.5);\n}\n\n\n.apexcharts-xaxistooltip.active {\n  opacity: 1;\n  transition: 0.15s ease all;\n}\n\n.apexcharts-yaxistooltip {\n  opacity: 0;\n  padding: 4px 10px;\n  pointer-events: none;\n  color: #373d3f;\n  font-size: 13px;\n  text-align: center;\n  border-radius: 2px;\n  position: absolute;\n  z-index: 10;\n\tbackground: #ECEFF1;\n  border: 1px solid #90A4AE;\n}\n\n.apexcharts-yaxistooltip.dark {\n  background: rgba(0, 0, 0, 0.7);\n  border: 1px solid rgba(0, 0, 0, 0.5);\n  color: #fff;\n}\n\n.apexcharts-yaxistooltip:after, .apexcharts-yaxistooltip:before {\n\ttop: 50%;\n\tborder: solid transparent;\n\tcontent: " ";\n\theight: 0;\n\twidth: 0;\n\tposition: absolute;\n\tpointer-events: none;\n}\n.apexcharts-yaxistooltip:after {\n\tborder-color: rgba(236, 239, 241, 0);\n\tborder-width: 6px;\n\tmargin-top: -6px;\n}\n.apexcharts-yaxistooltip:before {\n\tborder-color: rgba(144, 164, 174, 0);\n\tborder-width: 7px;\n\tmargin-top: -7px;\n}\n\n.apexcharts-yaxistooltip-left:after, .apexcharts-yaxistooltip-left:before {\n  left: 100%;\n}\n\n.apexcharts-yaxistooltip-right:after, .apexcharts-yaxistooltip-right:before {\n  right: 100%;\n}\n\n.apexcharts-yaxistooltip-left:after {\n  border-left-color: #ECEFF1;\n}\n.apexcharts-yaxistooltip-left:before {\n  border-left-color: #90A4AE;\n}\n.apexcharts-yaxistooltip-left.dark:after {\n  border-left-color: rgba(0, 0, 0, 0.5);\n}\n.apexcharts-yaxistooltip-left.dark:before {\n  border-left-color: rgba(0, 0, 0, 0.5);\n}\n\n.apexcharts-yaxistooltip-right:after {\n  border-right-color: #ECEFF1;\n}\n.apexcharts-yaxistooltip-right:before {\n  border-right-color: #90A4AE;\n}\n.apexcharts-yaxistooltip-right.dark:after {\n  border-right-color: rgba(0, 0, 0, 0.5);\n}\n.apexcharts-yaxistooltip-right.dark:before {\n  border-right-color: rgba(0, 0, 0, 0.5);\n}\n\n.apexcharts-yaxistooltip.active {\n  opacity: 1;\n}\n\n.apexcharts-xcrosshairs, .apexcharts-ycrosshairs {\n  pointer-events: none;\n  opacity: 0;\n  transition: 0.15s ease all;\n}\n\n.apexcharts-xcrosshairs.active, .apexcharts-ycrosshairs.active {\n  opacity: 1;\n  transition: 0.15s ease all;\n}\n\n.apexcharts-ycrosshairs-hidden {\n  opacity: 0;\n}\n\n.apexcharts-zoom-rect {\n  pointer-events: none;\n}\n.apexcharts-selection-rect {\n  cursor: move;\n}\n\n.svg_select_points, .svg_select_points_rot {\n  opacity: 0;\n  visibility: hidden;\n}\n.svg_select_points_l, .svg_select_points_r {\n  cursor: ew-resize;\n  opacity: 1;\n  visibility: visible;\n  fill: #888;\n}\n.apexcharts-canvas.zoomable .hovering-zoom {\n  cursor: crosshair\n}\n.apexcharts-canvas.zoomable .hovering-pan {\n  cursor: move\n}\n\n.apexcharts-xaxis,\n.apexcharts-yaxis {\n  pointer-events: none;\n}\n\n.apexcharts-zoom-icon, \n.apexcharts-zoom-in-icon,\n.apexcharts-zoom-out-icon,\n.apexcharts-reset-zoom-icon, \n.apexcharts-pan-icon, \n.apexcharts-selection-icon,\n.apexcharts-menu-icon, \n.apexcharts-toolbar-custom-icon {\n  cursor: pointer;\n  width: 20px;\n  height: 20px;\n  line-height: 24px;\n  color: #6E8192;\n  text-align: center;\n}\n\n\n.apexcharts-zoom-icon svg, \n.apexcharts-zoom-in-icon svg,\n.apexcharts-zoom-out-icon svg,\n.apexcharts-reset-zoom-icon svg,\n.apexcharts-menu-icon svg {\n  fill: #6E8192;\n}\n.apexcharts-selection-icon svg {\n  fill: #444;\n  transform: scale(0.76)\n}\n\n.dark .apexcharts-zoom-icon svg, \n.dark .apexcharts-zoom-in-icon svg,\n.dark .apexcharts-zoom-out-icon svg,\n.dark .apexcharts-reset-zoom-icon svg, \n.dark .apexcharts-pan-icon svg, \n.dark .apexcharts-selection-icon svg,\n.dark .apexcharts-menu-icon svg, \n.dark .apexcharts-toolbar-custom-icon svg{\n  fill: #f3f4f5;\n}\n\n.apexcharts-canvas .apexcharts-zoom-icon.selected svg, \n.apexcharts-canvas .apexcharts-selection-icon.selected svg, \n.apexcharts-canvas .apexcharts-reset-zoom-icon.selected svg {\n  fill: #008FFB;\n}\n.light .apexcharts-selection-icon:not(.selected):hover svg,\n.light .apexcharts-zoom-icon:not(.selected):hover svg, \n.light .apexcharts-zoom-in-icon:hover svg, \n.light .apexcharts-zoom-out-icon:hover svg, \n.light .apexcharts-reset-zoom-icon:hover svg, \n.light .apexcharts-menu-icon:hover svg {\n  fill: #333;\n}\n\n.apexcharts-selection-icon, .apexcharts-menu-icon {\n  position: relative;\n}\n.apexcharts-reset-zoom-icon {\n  margin-left: 5px;\n}\n.apexcharts-zoom-icon, .apexcharts-reset-zoom-icon, .apexcharts-menu-icon {\n  transform: scale(0.85);\n}\n\n.apexcharts-zoom-in-icon, .apexcharts-zoom-out-icon {\n  transform: scale(0.7)\n}\n\n.apexcharts-zoom-out-icon {\n  margin-right: 3px;\n}\n\n.apexcharts-pan-icon {\n  transform: scale(0.62);\n  position: relative;\n  left: 1px;\n  top: 0px;\n}\n.apexcharts-pan-icon svg {\n  fill: #fff;\n  stroke: #6E8192;\n  stroke-width: 2;\n}\n.apexcharts-pan-icon.selected svg {\n  stroke: #008FFB;\n}\n.apexcharts-pan-icon:not(.selected):hover svg {\n  stroke: #333;\n}\n\n.apexcharts-toolbar {\n  position: absolute;\n  z-index: 11;\n  top: 0px;\n  right: 3px;\n  max-width: 176px;\n  text-align: right;\n  border-radius: 3px;\n  padding: 0px 6px 2px 6px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center; \n}\n\n.apexcharts-toolbar svg {\n  pointer-events: none;\n}\n\n.apexcharts-menu {\n  background: #fff;\n  position: absolute;\n  top: 100%;\n  border: 1px solid #ddd;\n  border-radius: 3px;\n  padding: 3px;\n  right: 10px;\n  opacity: 0;\n  min-width: 110px;\n  transition: 0.15s ease all;\n  pointer-events: none;\n}\n\n.apexcharts-menu.open {\n  opacity: 1;\n  pointer-events: all;\n  transition: 0.15s ease all;\n}\n\n.apexcharts-menu-item {\n  padding: 6px 7px;\n  font-size: 12px;\n  cursor: pointer;\n}\n.light .apexcharts-menu-item:hover {\n  background: #eee;\n}\n.dark .apexcharts-menu {\n  background: rgba(0, 0, 0, 0.7);\n  color: #fff;\n}\n\n@media screen and (min-width: 768px) {\n  .apexcharts-toolbar {\n    /*opacity: 0;*/\n  }\n\n  .apexcharts-canvas:hover .apexcharts-toolbar {\n    opacity: 1;\n  } \n}\n\n.apexcharts-datalabel.hidden {\n  opacity: 0;\n}\n\n.apexcharts-pie-label,\n.apexcharts-datalabel, .apexcharts-datalabel-label, .apexcharts-datalabel-value {\n  cursor: default;\n  pointer-events: none;\n}\n\n.apexcharts-pie-label-delay {\n  opacity: 0;\n  animation-name: opaque;\n  animation-duration: 0.3s;\n  animation-fill-mode: forwards;\n  animation-timing-function: ease;\n}\n\n.apexcharts-canvas .hidden {\n  opacity: 0;\n}\n\n.apexcharts-hide .apexcharts-series-points {\n  opacity: 0;\n}\n\n.apexcharts-area-series .apexcharts-series-markers .apexcharts-marker.no-pointer-events,\n.apexcharts-line-series .apexcharts-series-markers .apexcharts-marker.no-pointer-events, .apexcharts-radar-series path, .apexcharts-radar-series polygon {\n  pointer-events: none;\n}\n\n/* markers */\n\n.apexcharts-marker {\n  transition: 0.15s ease all;\n}\n\n@keyframes opaque {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}'),"document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))||function(t){if("Element"in t){var e=t.Element.prototype,i=Object,s=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},a=Array.prototype.indexOf||function(t){for(var e=0,i=this.length;e<i;e++)if(e in this&&this[e]===t)return e;return-1},n=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},r=function(t,e){if(""===e)throw new n("SYNTAX_ERR","The token must not be empty.");if(/\s/.test(e))throw new n("INVALID_CHARACTER_ERR","The token must not contain space characters.");return a.call(t,e)},o=function(t){for(var e=s.call(t.getAttribute("class")||""),i=e?e.split(/\s+/):[],a=0,n=i.length;a<n;a++)this.push(i[a]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},l=o.prototype=[],h=function(){return new o(this)};if(n.prototype=Error.prototype,l.item=function(t){return this[t]||null},l.contains=function(t){return~r(this,t+"")},l.add=function(){var t,e=arguments,i=0,s=e.length,a=!1;do{t=e[i]+"",~r(this,t)||(this.push(t),a=!0)}while(++i<s);a&&this._updateClassName()},l.remove=function(){var t,e,i=arguments,s=0,a=i.length,n=!1;do{for(t=i[s]+"",e=r(this,t);~e;)this.splice(e,1),n=!0,e=r(this,t)}while(++s<a);n&&this._updateClassName()},l.toggle=function(t,e){var i=this.contains(t),s=i?!0!==e&&"remove":!1!==e&&"add";return s&&this[s](t),!0===e||!1===e?e:!i},l.replace=function(t,e){var i=r(t+"");~i&&(this.splice(i,1,e),this._updateClassName())},l.toString=function(){return this.join(" ")},i.defineProperty){var c={get:h,enumerable:!0,configurable:!0};try{i.defineProperty(e,"classList",c)}catch(t){void 0!==t.number&&-2146823252!==t.number||(c.enumerable=!1,i.defineProperty(e,"classList",c))}}else i.prototype.__defineGetter__&&e.__defineGetter__("classList",h)}}(self),function(){var t=document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var i,s=arguments.length;for(i=0;i<s;i++)t=arguments[i],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var i=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:i.call(this,t)}}"replace"in document.createElement("_").classList||(DOMTokenList.prototype.replace=function(t,e){var i=this.toString().split(" "),s=i.indexOf(t+"");~s&&(i=i.slice(s),this.remove.apply(this,i),this.add(e),this.add.apply(this,i.slice(1)))}),t=null}()),function(){var t=!1;function e(t){var e=t.__resizeTriggers__,i=e.firstElementChild,s=e.lastElementChild,a=i.firstElementChild;s.scrollLeft=s.scrollWidth,s.scrollTop=s.scrollHeight,a.style.width=i.offsetWidth+1+"px",a.style.height=i.offsetHeight+1+"px",i.scrollLeft=i.scrollWidth,i.scrollTop=i.scrollHeight}function i(t){var i=this;e(this),this.__resizeRAF__&&r(this.__resizeRAF__),this.__resizeRAF__=n(function(){(function(t){return t.offsetWidth!=t.__resizeLast__.width||t.offsetHeight!=t.__resizeLast__.height})(i)&&(i.__resizeLast__.width=i.offsetWidth,i.__resizeLast__.height=i.offsetHeight,i.__resizeListeners__.forEach(function(e){e.call(t)}))})}var s,a,n=(s=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(t){return window.setTimeout(t,20)},function(t){return s(t)}),r=(a=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.clearTimeout,function(t){return a(t)}),o=!1,l="",h="animationstart",c="Webkit Moz O ms".split(" "),d="webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),u=document.createElement("fakeelement");if(void 0!==u.style.animationName&&(o=!0),!1===o)for(var g=0;g<c.length;g++)if(void 0!==u.style[c[g]+"AnimationName"]){l="-"+c[g].toLowerCase()+"-",h=d[g];break}var f="@"+l+"keyframes resizeanim { from { opacity: 0; } to { opacity: 0; } } ",p=l+"animation: 1ms resizeanim; ";window.addResizeListener=function(s,a){s.__resizeTriggers__||("static"==getComputedStyle(s).position&&(s.style.position="relative"),function(){if(!t){var e=(f||"")+".resize-triggers { "+(p||"")+'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',i=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css",s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e)),i.appendChild(s),t=!0}}(),s.__resizeLast__={},s.__resizeListeners__=[],(s.__resizeTriggers__=document.createElement("div")).className="resize-triggers",s.__resizeTriggers__.innerHTML='<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>',s.appendChild(s.__resizeTriggers__),e(s),s.addEventListener("scroll",i,!0),h&&s.__resizeTriggers__.addEventListener(h,function(t){"resizeanim"==t.animationName&&e(s)})),s.__resizeListeners__.push(a)},window.removeResizeListener=function(t,e){t&&(t.__resizeListeners__.splice(t.__resizeListeners__.indexOf(e),1),t.__resizeListeners__.length||(t.removeEventListener("scroll",i),t.__resizeTriggers__=!t.removeChild(t.__resizeTriggers__)))}}(),window.Apex={},function(){function i(t,s){e(this,i),this.opts=s,this.ctx=this,this.w=new A(s).init(),this.el=t,this.w.globals.cuid=(Math.random()+1).toString(36).substring(4),this.w.globals.chartID=this.w.config.chart.id?this.w.config.chart.id:this.w.globals.cuid,this.initModules(),this.create=d.bind(this.create,this),this.windowResizeHandler=this.windowResize.bind(this)}return s(i,[{key:"render",value:function(){var t=this;return new $(function(e,i){if(null!==t.el){void 0===Apex._chartInstances&&(Apex._chartInstances=[]),t.w.config.chart.id&&Apex._chartInstances.push({id:t.w.globals.chartID,group:t.w.config.chart.group,chart:t}),t.setLocale(t.w.config.chart.defaultLocale);var s=t.w.config.chart.events.beforeMount;"function"==typeof s&&s(t,t.w),t.fireEvent("beforeMount",[t,t.w]),window.addEventListener("resize",t.windowResizeHandler),window.addResizeListener(t.el.parentNode,t.parentResizeCallback.bind(t));var a=t.create(t.w.config.series,{});if(!a)return e(t);t.mount(a).then(function(){e(a),"function"==typeof t.w.config.chart.events.mounted&&t.w.config.chart.events.mounted(t,t.w),t.fireEvent("mounted",[t,t.w])}).catch(function(t){i(t)})}else i(new Error("Element not found"))})}},{key:"initModules",value:function(){this.animations=new g(this),this.annotations=new b(this),this.core=new U(this.el,this),this.grid=new rt(this),this.coreUtils=new y(this),this.config=new w({}),this.crosshairs=new T(this),this.options=new x,this.responsive=new lt(this),this.series=new G(this),this.theme=new ht(this),this.formatters=new N(this),this.titleSubtitle=new vt(this),this.legend=new ot(this),this.toolbar=new bt(this),this.dimensions=new _(this),this.zoomPanSelection=new mt(this),this.w.globals.tooltip=new xt(this)}},{key:"addEventListener",value:function(t,e){var i=this.w;i.globals.events.hasOwnProperty(t)?i.globals.events[t].push(e):i.globals.events[t]=[e]}},{key:"removeEventListener",value:function(t,e){var i=this.w;if(i.globals.events.hasOwnProperty(t)){var s=i.globals.events[t].indexOf(e);-1!==s&&i.globals.events[t].splice(s,1)}}},{key:"fireEvent",value:function(t,e){var i=this.w;if(i.globals.events.hasOwnProperty(t)){e&&e.length||(e=[]);for(var s=i.globals.events[t],a=s.length,n=0;n<a;n++)s[n].apply(null,e)}}},{key:"create",value:function(t,e){var i=this.w;this.initModules();var s=this.w.globals;if(s.noData=!1,s.animationEnded=!1,this.responsive.checkResponsiveConfig(e),null===this.el)return s.animationEnded=!0,null;if(this.core.setupElements(),0===s.svgWidth)return s.animationEnded=!0,null;var a=y.checkComboSeries(t);s.comboCharts=a.comboCharts,s.comboChartsHasBars=a.comboChartsHasBars,(0===t.length||1===t.length&&t[0].data&&0===t[0].data.length)&&this.series.handleNoData(),this.setupEventHandlers(),this.core.parseData(t),this.theme.init(),new C(this).setGlobalMarkerSize(),this.formatters.setLabelFormatters(),this.titleSubtitle.draw(),this.legend.init(),this.series.hasAllSeriesEqualX(),s.axisCharts&&(this.core.coreCalculations(),"category"!==i.config.xaxis.type&&this.formatters.setLabelFormatters()),this.formatters.heatmapLabelFormatters(),this.dimensions.plotCoords();var n=this.core.xySettings();this.grid.createGridMask();var r=this.core.plotChartType(t,n);this.core.shiftGraphPosition();var o={plot:{left:i.globals.translateX,top:i.globals.translateY,width:i.globals.gridWidth,height:i.globals.gridHeight}};return{elGraph:r,xyRatios:n,elInner:i.globals.dom.elGraphical,dimensions:o}}},{key:"mount",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=this,i=e.w;return new $(function(s,a){if(null===e.el)return a(new Error("Not enough data to display or target element not found"));if((null===t||i.globals.allSeriesCollapsed)&&e.series.handleNoData(),e.core.drawAxis(i.config.chart.type,t.xyRatios),e.grid=new rt(e),"back"===i.config.grid.position&&e.grid.drawGrid(),"back"===i.config.annotations.position&&e.annotations.drawAnnotations(),t.elGraph instanceof Array)for(var n=0;n<t.elGraph.length;n++)i.globals.dom.elGraphical.add(t.elGraph[n]);else i.globals.dom.elGraphical.add(t.elGraph);if("front"===i.config.grid.position&&e.grid.drawGrid(),"front"===i.config.xaxis.crosshairs.position&&e.crosshairs.drawXCrosshairs(),"front"===i.config.yaxis[0].crosshairs.position&&e.crosshairs.drawYCrosshairs(),"front"===i.config.annotations.position&&e.annotations.drawAnnotations(),!i.globals.noData){if(i.config.tooltip.enabled&&!i.globals.noData&&e.w.globals.tooltip.drawTooltip(t.xyRatios),i.globals.axisCharts&&i.globals.isXNumeric)(i.config.chart.zoom.enabled||i.config.chart.selection&&i.config.chart.selection.enabled||i.config.chart.pan&&i.config.chart.pan.enabled)&&e.zoomPanSelection.init({xyRatios:t.xyRatios});else{var r=i.config.chart.toolbar.tools;r.zoom=!1,r.zoomin=!1,r.zoomout=!1,r.selection=!1,r.pan=!1,r.reset=!1}i.config.chart.toolbar.show&&!i.globals.allSeriesCollapsed&&e.toolbar.createToolbar()}i.globals.memory.methodsToExec.length>0&&i.globals.memory.methodsToExec.forEach(function(t){t.method(t.params,!1,t.context)}),s(e)})}},{key:"clearPreviousPaths",value:function(){var t=this.w;t.globals.previousPaths=[],t.globals.allSeriesCollapsed=!1,t.globals.collapsedSeries=[],t.globals.collapsedSeriesIndices=[]}},{key:"updateOptions",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],a=this.w;return t.series&&(t.series[0].data&&(t.series=t.series.map(function(t,e){return n({},a.config.series[e],{name:t.name?t.name:a.config.series[e]&&a.config.series[e].name,type:t.type?t.type:a.config.series[e]&&a.config.series[e].type,data:t.data?t.data:a.config.series[e]&&a.config.series[e].data})})),this.revertDefaultAxisMinMax()),t.xaxis&&((t.xaxis.min||t.xaxis.max)&&this.forceXAxisUpdate(t),t.xaxis.categories&&t.xaxis.categories.length&&a.config.xaxis.convertedCatToNumeric&&(t=v.convertCatToNumeric(t))),a.globals.collapsedSeriesIndices.length>0&&this.clearPreviousPaths(),t.theme&&(t=this.theme.updateThemeOptions(t)),this._updateOptions(t,e,i,s)}},{key:"_updateOptions",value:function(e){var i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this.getSyncedCharts().forEach(function(n){var r=n.w;return r.globals.shouldAnimate=s,i||(r.globals.resized=!0,r.globals.dataChanged=!0,s&&n.series.getPreviousPaths()),e&&"object"===t(e)&&(n.config=new w(e),e=y.extendArrayProps(n.config,e),r.config=d.extend(r.config,e),a&&(r.globals.lastXAxis=[],r.globals.lastYAxis=[],r.globals.initialConfig=d.extend({},r.config),r.globals.initialSeries=JSON.parse(JSON.stringify(r.config.series)))),n.update(e)})}},{key:"updateSeries",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return this.revertDefaultAxisMinMax(),this._updateSeries(t,e,i)}},{key:"appendSeries",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=this.w.config.series.slice();return s.push(t),this.revertDefaultAxisMinMax(),this._updateSeries(s,e,i)}},{key:"_updateSeries",value:function(t,e){var i,s=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=this.w;return this.w.globals.shouldAnimate=e,a.globals.dataChanged=!0,a.globals.allSeriesCollapsed&&(a.globals.allSeriesCollapsed=!1),e&&this.series.getPreviousPaths(),a.globals.axisCharts?(0===(i=t.map(function(t,e){return n({},a.config.series[e],{name:t.name?t.name:a.config.series[e]&&a.config.series[e].name,type:t.type?t.type:a.config.series[e]&&a.config.series[e].type,data:t.data?t.data:a.config.series[e]&&a.config.series[e].data})})).length&&(i=[{data:[]}]),a.config.series=i):a.config.series=t.slice(),s&&(a.globals.initialConfig.series=JSON.parse(JSON.stringify(a.config.series)),a.globals.initialSeries=JSON.parse(JSON.stringify(a.config.series))),this.update()}},{key:"getSyncedCharts",value:function(){var t=this.getGroupedCharts(),e=[this];return t.length&&(e=[],t.forEach(function(t){e.push(t)})),e}},{key:"getGroupedCharts",value:function(){var t=this;return Apex._chartInstances.filter(function(t){if(t.group)return!0}).map(function(e){return t.w.config.chart.group===e.group?e.chart:t})}},{key:"appendData",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=this;i.w.globals.dataChanged=!0,i.series.getPreviousPaths();for(var s=i.w.config.series.slice(),a=0;a<s.length;a++)if(void 0!==t[a])for(var n=0;n<t[a].data.length;n++)s[a].data.push(t[a].data[n]);return i.w.config.series=s,e&&(i.w.globals.initialSeries=JSON.parse(JSON.stringify(i.w.config.series))),this.update()}},{key:"update",value:function(t){var e=this;return new $(function(i,s){e.clear();var a=e.create(e.w.config.series,t);if(!a)return i(e);e.mount(a).then(function(){"function"==typeof e.w.config.chart.events.updated&&e.w.config.chart.events.updated(e,e.w),e.fireEvent("updated",[e,e.w]),e.w.globals.isDirty=!0,i(e)}).catch(function(t){s(t)})})}},{key:"forceXAxisUpdate",value:function(t){var e=this.w;void 0!==t.xaxis.min&&(e.config.xaxis.min=t.xaxis.min,e.globals.lastXAxis.min=t.xaxis.min),void 0!==t.xaxis.max&&(e.config.xaxis.max=t.xaxis.max,e.globals.lastXAxis.max=t.xaxis.max)}},{key:"revertDefaultAxisMinMax",value:function(){var t=this.w;t.config.xaxis.min=t.globals.lastXAxis.min,t.config.xaxis.max=t.globals.lastXAxis.max,t.config.yaxis.map(function(e,i){t.globals.zoomed&&void 0!==t.globals.lastYAxis[i]&&(e.min=t.globals.lastYAxis[i].min,e.max=t.globals.lastYAxis[i].max)})}},{key:"clear",value:function(){this.zoomPanSelection&&this.zoomPanSelection.destroy(),this.toolbar&&this.toolbar.destroy(),this.animations=null,this.annotations=null,this.core=null,this.grid=null,this.series=null,this.responsive=null,this.theme=null,this.formatters=null,this.titleSubtitle=null,this.legend=null,this.dimensions=null,this.options=null,this.crosshairs=null,this.zoomPanSelection=null,this.toolbar=null,this.w.globals.tooltip=null,this.clearDomElements()}},{key:"killSVG",value:function(t){return new $(function(e,i){t.each(function(t,e){this.removeClass("*"),this.off(),this.stop()},!0),t.ungroup(),t.clear(),e("done")})}},{key:"clearDomElements",value:function(){var t=this.w.globals.dom;if(null!==this.el)for(;this.el.firstChild;)this.el.removeChild(this.el.firstChild);this.killSVG(t.Paper),t.Paper.remove(),t.elWrap=null,t.elGraphical=null,t.elLegendWrap=null,t.baseEl=null,t.elGridRect=null,t.elGridRectMask=null,t.elGridRectMarkerMask=null,t.elDefs=null}},{key:"destroy",value:function(){this.clear();var t=this.w.config.chart.id;t&&Apex._chartInstances.forEach(function(e,i){e.id===t&&Apex._chartInstances.splice(i,1)}),window.removeEventListener("resize",this.windowResizeHandler),window.removeResizeListener(this.el.parentNode,this.parentResizeCallback.bind(this))}},{key:"toggleSeries",value:function(t){var e=this.series.getSeriesByName(t),i=parseInt(e.getAttribute("data:realIndex")),s=e.classList.contains("apexcharts-series-collapsed");this.legend.toggleDataSeries(i,s)}},{key:"resetToggleSeries",value:function(){this.legend.resetToggleDataSeries()}},{key:"setupEventHandlers",value:function(){var t=this.w,e=this,i=t.globals.dom.baseEl.querySelector(t.globals.chartClass),s=["mousedown","mousemove","touchstart","touchmove","mouseup","touchend"];s.forEach(function(s){i.addEventListener(s,function(i){"mousedown"===i.type&&1===i.which||("mouseup"===i.type&&1===i.which||"touchend"===i.type)&&("function"==typeof t.config.chart.events.click&&t.config.chart.events.click(i,e,t),e.fireEvent("click",[i,e,t]))},{capture:!1,passive:!0})}),s.forEach(function(e){document.addEventListener(e,function(e){t.globals.clientX="touchmove"===e.type?e.touches[0].clientX:e.clientX,t.globals.clientY="touchmove"===e.type?e.touches[0].clientY:e.clientY})}),this.core.setupBrushHandler()}},{key:"addXaxisAnnotation",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,s=this;i&&(s=i),s.annotations.addXaxisAnnotationExternal(t,e,s)}},{key:"addYaxisAnnotation",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,s=this;i&&(s=i),s.annotations.addYaxisAnnotationExternal(t,e,s)}},{key:"addPointAnnotation",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,s=this;i&&(s=i),s.annotations.addPointAnnotationExternal(t,e,s)}},{key:"clearAnnotations",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0,e=this;t&&(e=t),e.annotations.clearAnnotations(e)}},{key:"addText",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,s=this;i&&(s=i),s.annotations.addText(t,e,s)}},{key:"getChartArea",value:function(){return this.w.globals.dom.baseEl.querySelector(".apexcharts-inner")}},{key:"getSeriesTotalXRange",value:function(t,e){return this.coreUtils.getSeriesTotalsXRange(t,e)}},{key:"getHighestValueInSeries",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new V(this.ctx).getMinYMaxY(t).highestY}},{key:"getLowestValueInSeries",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new V(this.ctx).getMinYMaxY(t).lowestY}},{key:"getSeriesTotal",value:function(){return this.w.globals.seriesTotals}},{key:"setLocale",value:function(t){this.setCurrentLocaleValues(t)}},{key:"setCurrentLocaleValues",value:function(t){var e=this.w.config.chart.locales;window.Apex.chart&&window.Apex.chart.locales&&window.Apex.chart.locales.length>0&&(e=this.w.config.chart.locales.concat(window.Apex.chart.locales));var i=e.filter(function(e){return e.name===t})[0];if(!i)throw new Error("Wrong locale name provided. Please make sure you set the correct locale name in options");var s=d.extend(p,i);this.w.globals.locale=s.options}},{key:"dataURI",value:function(){return new nt(this.ctx).dataURI()}},{key:"paper",value:function(){return this.w.globals.dom.Paper}},{key:"parentResizeCallback",value:function(){this.w.globals.animationEnded&&this.windowResize()}},{key:"windowResize",value:function(){var t=this;clearTimeout(this.w.globals.resizeTimer),this.w.globals.resizeTimer=window.setTimeout(function(){t.w.globals.resized=!0,t.w.globals.dataChanged=!1,t.update()},150)}}],[{key:"initOnLoad",value:function(){for(var t=document.querySelectorAll("[data-apexcharts]"),e=0;e<t.length;e++){new i(t[e],JSON.parse(t[e].getAttribute("data-options"))).render()}}},{key:"exec",value:function(t,e){var i=this.getChartByID(t);if(i){for(var s=arguments.length,a=new Array(s>2?s-2:0),n=2;n<s;n++)a[n-2]=arguments[n];switch(e){case"updateOptions":return i.updateOptions.apply(i,a);case"updateSeries":return i.updateSeries.apply(i,a);case"appendData":return i.appendData.apply(i,a);case"appendSeries":return i.appendSeries.apply(i,a);case"toggleSeries":return i.toggleSeries.apply(i,a);case"dataURI":return i.dataURI.apply(i,a);case"addXaxisAnnotation":return i.addXaxisAnnotation.apply(i,a);case"addYaxisAnnotation":return i.addYaxisAnnotation.apply(i,a);case"addPointAnnotation":return i.addPointAnnotation.apply(i,a);case"addText":return i.addText.apply(i,a);case"clearAnnotations":return i.clearAnnotations.apply(i,a);case"paper":return i.paper.apply(i,a);case"destroy":return i.destroy()}}}},{key:"merge",value:function(t,e){return d.extend(t,e)}},{key:"getChartByID",value:function(t){return Apex._chartInstances.filter(function(e){return e.id===t})[0].chart}}]),i}()});
/*!
 DataTables 1.10.15
 ©2008-2017 SpryMedia Ltd - datatables.net/license
*/

(function(h){"function"===typeof define&&define.amd?define(["jquery"],function(E){return h(E,window,document)}):"object"===typeof exports?module.exports=function(E,H){E||(E=window);H||(H="undefined"!==typeof window?require("jquery"):require("jquery")(E));return h(H,E,E.document)}:h(jQuery,window,document)})(function(h,E,H,k){function Y(a){var b,c,d={};h.each(a,function(e){if((b=e.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(b[1]+" "))c=e.replace(b[0],b[2].toLowerCase()),
d[c]=e,"o"===b[1]&&Y(a[e])});a._hungarianMap=d}function J(a,b,c){a._hungarianMap||Y(a);var d;h.each(b,function(e){d=a._hungarianMap[e];if(d!==k&&(c||b[d]===k))"o"===d.charAt(0)?(b[d]||(b[d]={}),h.extend(!0,b[d],b[e]),J(a[d],b[d],c)):b[d]=b[e]})}function Fa(a){var b=m.defaults.oLanguage,c=a.sZeroRecords;!a.sEmptyTable&&(c&&"No data available in table"===b.sEmptyTable)&&F(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&(c&&"Loading..."===b.sLoadingRecords)&&F(a,a,"sZeroRecords","sLoadingRecords");
a.sInfoThousands&&(a.sThousands=a.sInfoThousands);(a=a.sDecimal)&&fb(a)}function gb(a){A(a,"ordering","bSort");A(a,"orderMulti","bSortMulti");A(a,"orderClasses","bSortClasses");A(a,"orderCellsTop","bSortCellsTop");A(a,"order","aaSorting");A(a,"orderFixed","aaSortingFixed");A(a,"paging","bPaginate");A(a,"pagingType","sPaginationType");A(a,"pageLength","iDisplayLength");A(a,"searching","bFilter");"boolean"===typeof a.sScrollX&&(a.sScrollX=a.sScrollX?"100%":"");"boolean"===typeof a.scrollX&&(a.scrollX=
a.scrollX?"100%":"");if(a=a.aoSearchCols)for(var b=0,c=a.length;b<c;b++)a[b]&&J(m.models.oSearch,a[b])}function hb(a){A(a,"orderable","bSortable");A(a,"orderData","aDataSort");A(a,"orderSequence","asSorting");A(a,"orderDataType","sortDataType");var b=a.aDataSort;"number"===typeof b&&!h.isArray(b)&&(a.aDataSort=[b])}function ib(a){if(!m.__browser){var b={};m.__browser=b;var c=h("<div/>").css({position:"fixed",top:0,left:-1*h(E).scrollLeft(),height:1,width:1,overflow:"hidden"}).append(h("<div/>").css({position:"absolute",
top:1,left:1,width:100,overflow:"scroll"}).append(h("<div/>").css({width:"100%",height:10}))).appendTo("body"),d=c.children(),e=d.children();b.barWidth=d[0].offsetWidth-d[0].clientWidth;b.bScrollOversize=100===e[0].offsetWidth&&100!==d[0].clientWidth;b.bScrollbarLeft=1!==Math.round(e.offset().left);b.bBounding=c[0].getBoundingClientRect().width?!0:!1;c.remove()}h.extend(a.oBrowser,m.__browser);a.oScroll.iBarWidth=m.__browser.barWidth}function jb(a,b,c,d,e,f){var g,j=!1;c!==k&&(g=c,j=!0);for(;d!==
e;)a.hasOwnProperty(d)&&(g=j?b(g,a[d],d,a):a[d],j=!0,d+=f);return g}function Ga(a,b){var c=m.defaults.column,d=a.aoColumns.length,c=h.extend({},m.models.oColumn,c,{nTh:b?b:H.createElement("th"),sTitle:c.sTitle?c.sTitle:b?b.innerHTML:"",aDataSort:c.aDataSort?c.aDataSort:[d],mData:c.mData?c.mData:d,idx:d});a.aoColumns.push(c);c=a.aoPreSearchCols;c[d]=h.extend({},m.models.oSearch,c[d]);la(a,d,h(b).data())}function la(a,b,c){var b=a.aoColumns[b],d=a.oClasses,e=h(b.nTh);if(!b.sWidthOrig){b.sWidthOrig=
e.attr("width")||null;var f=(e.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);f&&(b.sWidthOrig=f[1])}c!==k&&null!==c&&(hb(c),J(m.defaults.column,c),c.mDataProp!==k&&!c.mData&&(c.mData=c.mDataProp),c.sType&&(b._sManualType=c.sType),c.className&&!c.sClass&&(c.sClass=c.className),h.extend(b,c),F(b,c,"sWidth","sWidthOrig"),c.iDataSort!==k&&(b.aDataSort=[c.iDataSort]),F(b,c,"aDataSort"));var g=b.mData,j=R(g),i=b.mRender?R(b.mRender):null,c=function(a){return"string"===typeof a&&-1!==a.indexOf("@")};
b._bAttrSrc=h.isPlainObject(g)&&(c(g.sort)||c(g.type)||c(g.filter));b._setter=null;b.fnGetData=function(a,b,c){var d=j(a,b,k,c);return i&&b?i(d,b,a,c):d};b.fnSetData=function(a,b,c){return S(g)(a,b,c)};"number"!==typeof g&&(a._rowReadObject=!0);a.oFeatures.bSort||(b.bSortable=!1,e.addClass(d.sSortableNone));a=-1!==h.inArray("asc",b.asSorting);c=-1!==h.inArray("desc",b.asSorting);!b.bSortable||!a&&!c?(b.sSortingClass=d.sSortableNone,b.sSortingClassJUI=""):a&&!c?(b.sSortingClass=d.sSortableAsc,b.sSortingClassJUI=
d.sSortJUIAscAllowed):!a&&c?(b.sSortingClass=d.sSortableDesc,b.sSortingClassJUI=d.sSortJUIDescAllowed):(b.sSortingClass=d.sSortable,b.sSortingClassJUI=d.sSortJUI)}function Z(a){if(!1!==a.oFeatures.bAutoWidth){var b=a.aoColumns;Ha(a);for(var c=0,d=b.length;c<d;c++)b[c].nTh.style.width=b[c].sWidth}b=a.oScroll;(""!==b.sY||""!==b.sX)&&ma(a);s(a,null,"column-sizing",[a])}function $(a,b){var c=na(a,"bVisible");return"number"===typeof c[b]?c[b]:null}function aa(a,b){var c=na(a,"bVisible"),c=h.inArray(b,
c);return-1!==c?c:null}function ba(a){var b=0;h.each(a.aoColumns,function(a,d){d.bVisible&&"none"!==h(d.nTh).css("display")&&b++});return b}function na(a,b){var c=[];h.map(a.aoColumns,function(a,e){a[b]&&c.push(e)});return c}function Ia(a){var b=a.aoColumns,c=a.aoData,d=m.ext.type.detect,e,f,g,j,i,h,l,q,r;e=0;for(f=b.length;e<f;e++)if(l=b[e],r=[],!l.sType&&l._sManualType)l.sType=l._sManualType;else if(!l.sType){g=0;for(j=d.length;g<j;g++){i=0;for(h=c.length;i<h;i++){r[i]===k&&(r[i]=B(a,i,e,"type"));
q=d[g](r[i],a);if(!q&&g!==d.length-1)break;if("html"===q)break}if(q){l.sType=q;break}}l.sType||(l.sType="string")}}function kb(a,b,c,d){var e,f,g,j,i,n,l=a.aoColumns;if(b)for(e=b.length-1;0<=e;e--){n=b[e];var q=n.targets!==k?n.targets:n.aTargets;h.isArray(q)||(q=[q]);f=0;for(g=q.length;f<g;f++)if("number"===typeof q[f]&&0<=q[f]){for(;l.length<=q[f];)Ga(a);d(q[f],n)}else if("number"===typeof q[f]&&0>q[f])d(l.length+q[f],n);else if("string"===typeof q[f]){j=0;for(i=l.length;j<i;j++)("_all"==q[f]||h(l[j].nTh).hasClass(q[f]))&&
d(j,n)}}if(c){e=0;for(a=c.length;e<a;e++)d(e,c[e])}}function N(a,b,c,d){var e=a.aoData.length,f=h.extend(!0,{},m.models.oRow,{src:c?"dom":"data",idx:e});f._aData=b;a.aoData.push(f);for(var g=a.aoColumns,j=0,i=g.length;j<i;j++)g[j].sType=null;a.aiDisplayMaster.push(e);b=a.rowIdFn(b);b!==k&&(a.aIds[b]=f);(c||!a.oFeatures.bDeferRender)&&Ja(a,e,c,d);return e}function oa(a,b){var c;b instanceof h||(b=h(b));return b.map(function(b,e){c=Ka(a,e);return N(a,c.data,e,c.cells)})}function B(a,b,c,d){var e=a.iDraw,
f=a.aoColumns[c],g=a.aoData[b]._aData,j=f.sDefaultContent,i=f.fnGetData(g,d,{settings:a,row:b,col:c});if(i===k)return a.iDrawError!=e&&null===j&&(K(a,0,"Requested unknown parameter "+("function"==typeof f.mData?"{function}":"'"+f.mData+"'")+" for row "+b+", column "+c,4),a.iDrawError=e),j;if((i===g||null===i)&&null!==j&&d!==k)i=j;else if("function"===typeof i)return i.call(g);return null===i&&"display"==d?"":i}function lb(a,b,c,d){a.aoColumns[c].fnSetData(a.aoData[b]._aData,d,{settings:a,row:b,col:c})}
function La(a){return h.map(a.match(/(\\.|[^\.])+/g)||[""],function(a){return a.replace(/\\\./g,".")})}function R(a){if(h.isPlainObject(a)){var b={};h.each(a,function(a,c){c&&(b[a]=R(c))});return function(a,c,f,g){var j=b[c]||b._;return j!==k?j(a,c,f,g):a}}if(null===a)return function(a){return a};if("function"===typeof a)return function(b,c,f,g){return a(b,c,f,g)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var c=function(a,b,f){var g,j;if(""!==f){j=La(f);
for(var i=0,n=j.length;i<n;i++){f=j[i].match(ca);g=j[i].match(V);if(f){j[i]=j[i].replace(ca,"");""!==j[i]&&(a=a[j[i]]);g=[];j.splice(0,i+1);j=j.join(".");if(h.isArray(a)){i=0;for(n=a.length;i<n;i++)g.push(c(a[i],b,j))}a=f[0].substring(1,f[0].length-1);a=""===a?g:g.join(a);break}else if(g){j[i]=j[i].replace(V,"");a=a[j[i]]();continue}if(null===a||a[j[i]]===k)return k;a=a[j[i]]}}return a};return function(b,e){return c(b,e,a)}}return function(b){return b[a]}}function S(a){if(h.isPlainObject(a))return S(a._);
if(null===a)return function(){};if("function"===typeof a)return function(b,d,e){a(b,"set",d,e)};if("string"===typeof a&&(-1!==a.indexOf(".")||-1!==a.indexOf("[")||-1!==a.indexOf("("))){var b=function(a,d,e){var e=La(e),f;f=e[e.length-1];for(var g,j,i=0,n=e.length-1;i<n;i++){g=e[i].match(ca);j=e[i].match(V);if(g){e[i]=e[i].replace(ca,"");a[e[i]]=[];f=e.slice();f.splice(0,i+1);g=f.join(".");if(h.isArray(d)){j=0;for(n=d.length;j<n;j++)f={},b(f,d[j],g),a[e[i]].push(f)}else a[e[i]]=d;return}j&&(e[i]=e[i].replace(V,
""),a=a[e[i]](d));if(null===a[e[i]]||a[e[i]]===k)a[e[i]]={};a=a[e[i]]}if(f.match(V))a[f.replace(V,"")](d);else a[f.replace(ca,"")]=d};return function(c,d){return b(c,d,a)}}return function(b,d){b[a]=d}}function Ma(a){return D(a.aoData,"_aData")}function pa(a){a.aoData.length=0;a.aiDisplayMaster.length=0;a.aiDisplay.length=0;a.aIds={}}function qa(a,b,c){for(var d=-1,e=0,f=a.length;e<f;e++)a[e]==b?d=e:a[e]>b&&a[e]--; -1!=d&&c===k&&a.splice(d,1)}function da(a,b,c,d){var e=a.aoData[b],f,g=function(c,d){for(;c.childNodes.length;)c.removeChild(c.firstChild);
c.innerHTML=B(a,b,d,"display")};if("dom"===c||(!c||"auto"===c)&&"dom"===e.src)e._aData=Ka(a,e,d,d===k?k:e._aData).data;else{var j=e.anCells;if(j)if(d!==k)g(j[d],d);else{c=0;for(f=j.length;c<f;c++)g(j[c],c)}}e._aSortData=null;e._aFilterData=null;g=a.aoColumns;if(d!==k)g[d].sType=null;else{c=0;for(f=g.length;c<f;c++)g[c].sType=null;Na(a,e)}}function Ka(a,b,c,d){var e=[],f=b.firstChild,g,j,i=0,n,l=a.aoColumns,q=a._rowReadObject,d=d!==k?d:q?{}:[],r=function(a,b){if("string"===typeof a){var c=a.indexOf("@");
-1!==c&&(c=a.substring(c+1),S(a)(d,b.getAttribute(c)))}},m=function(a){if(c===k||c===i)j=l[i],n=h.trim(a.innerHTML),j&&j._bAttrSrc?(S(j.mData._)(d,n),r(j.mData.sort,a),r(j.mData.type,a),r(j.mData.filter,a)):q?(j._setter||(j._setter=S(j.mData)),j._setter(d,n)):d[i]=n;i++};if(f)for(;f;){g=f.nodeName.toUpperCase();if("TD"==g||"TH"==g)m(f),e.push(f);f=f.nextSibling}else{e=b.anCells;f=0;for(g=e.length;f<g;f++)m(e[f])}if(b=b.firstChild?b:b.nTr)(b=b.getAttribute("id"))&&S(a.rowId)(d,b);return{data:d,cells:e}}
function Ja(a,b,c,d){var e=a.aoData[b],f=e._aData,g=[],j,i,n,l,q;if(null===e.nTr){j=c||H.createElement("tr");e.nTr=j;e.anCells=g;j._DT_RowIndex=b;Na(a,e);l=0;for(q=a.aoColumns.length;l<q;l++){n=a.aoColumns[l];i=c?d[l]:H.createElement(n.sCellType);i._DT_CellIndex={row:b,column:l};g.push(i);if((!c||n.mRender||n.mData!==l)&&(!h.isPlainObject(n.mData)||n.mData._!==l+".display"))i.innerHTML=B(a,b,l,"display");n.sClass&&(i.className+=" "+n.sClass);n.bVisible&&!c?j.appendChild(i):!n.bVisible&&c&&i.parentNode.removeChild(i);
n.fnCreatedCell&&n.fnCreatedCell.call(a.oInstance,i,B(a,b,l),f,b,l)}s(a,"aoRowCreatedCallback",null,[j,f,b])}e.nTr.setAttribute("role","row")}function Na(a,b){var c=b.nTr,d=b._aData;if(c){var e=a.rowIdFn(d);e&&(c.id=e);d.DT_RowClass&&(e=d.DT_RowClass.split(" "),b.__rowc=b.__rowc?sa(b.__rowc.concat(e)):e,h(c).removeClass(b.__rowc.join(" ")).addClass(d.DT_RowClass));d.DT_RowAttr&&h(c).attr(d.DT_RowAttr);d.DT_RowData&&h(c).data(d.DT_RowData)}}function mb(a){var b,c,d,e,f,g=a.nTHead,j=a.nTFoot,i=0===
h("th, td",g).length,n=a.oClasses,l=a.aoColumns;i&&(e=h("<tr/>").appendTo(g));b=0;for(c=l.length;b<c;b++)f=l[b],d=h(f.nTh).addClass(f.sClass),i&&d.appendTo(e),a.oFeatures.bSort&&(d.addClass(f.sSortingClass),!1!==f.bSortable&&(d.attr("tabindex",a.iTabIndex).attr("aria-controls",a.sTableId),Oa(a,f.nTh,b))),f.sTitle!=d[0].innerHTML&&d.html(f.sTitle),Pa(a,"header")(a,d,f,n);i&&ea(a.aoHeader,g);h(g).find(">tr").attr("role","row");h(g).find(">tr>th, >tr>td").addClass(n.sHeaderTH);h(j).find(">tr>th, >tr>td").addClass(n.sFooterTH);
if(null!==j){a=a.aoFooter[0];b=0;for(c=a.length;b<c;b++)f=l[b],f.nTf=a[b].cell,f.sClass&&h(f.nTf).addClass(f.sClass)}}function fa(a,b,c){var d,e,f,g=[],j=[],i=a.aoColumns.length,n;if(b){c===k&&(c=!1);d=0;for(e=b.length;d<e;d++){g[d]=b[d].slice();g[d].nTr=b[d].nTr;for(f=i-1;0<=f;f--)!a.aoColumns[f].bVisible&&!c&&g[d].splice(f,1);j.push([])}d=0;for(e=g.length;d<e;d++){if(a=g[d].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[d].length;f<b;f++)if(n=i=1,j[d][f]===k){a.appendChild(g[d][f].cell);
for(j[d][f]=1;g[d+i]!==k&&g[d][f].cell==g[d+i][f].cell;)j[d+i][f]=1,i++;for(;g[d][f+n]!==k&&g[d][f].cell==g[d][f+n].cell;){for(c=0;c<i;c++)j[d+c][f+n]=1;n++}h(g[d][f].cell).attr("rowspan",i).attr("colspan",n)}}}}function O(a){var b=s(a,"aoPreDrawCallback","preDraw",[a]);if(-1!==h.inArray(!1,b))C(a,!1);else{var b=[],c=0,d=a.asStripeClasses,e=d.length,f=a.oLanguage,g=a.iInitDisplayStart,j="ssp"==y(a),i=a.aiDisplay;a.bDrawing=!0;g!==k&&-1!==g&&(a._iDisplayStart=j?g:g>=a.fnRecordsDisplay()?0:g,a.iInitDisplayStart=
-1);var g=a._iDisplayStart,n=a.fnDisplayEnd();if(a.bDeferLoading)a.bDeferLoading=!1,a.iDraw++,C(a,!1);else if(j){if(!a.bDestroying&&!nb(a))return}else a.iDraw++;if(0!==i.length){f=j?a.aoData.length:n;for(j=j?0:g;j<f;j++){var l=i[j],q=a.aoData[l];null===q.nTr&&Ja(a,l);l=q.nTr;if(0!==e){var r=d[c%e];q._sRowStripe!=r&&(h(l).removeClass(q._sRowStripe).addClass(r),q._sRowStripe=r)}s(a,"aoRowCallback",null,[l,q._aData,c,j]);b.push(l);c++}}else c=f.sZeroRecords,1==a.iDraw&&"ajax"==y(a)?c=f.sLoadingRecords:
f.sEmptyTable&&0===a.fnRecordsTotal()&&(c=f.sEmptyTable),b[0]=h("<tr/>",{"class":e?d[0]:""}).append(h("<td />",{valign:"top",colSpan:ba(a),"class":a.oClasses.sRowEmpty}).html(c))[0];s(a,"aoHeaderCallback","header",[h(a.nTHead).children("tr")[0],Ma(a),g,n,i]);s(a,"aoFooterCallback","footer",[h(a.nTFoot).children("tr")[0],Ma(a),g,n,i]);d=h(a.nTBody);d.children().detach();d.append(h(b));s(a,"aoDrawCallback","draw",[a]);a.bSorted=!1;a.bFiltered=!1;a.bDrawing=!1}}function T(a,b){var c=a.oFeatures,d=c.bFilter;
c.bSort&&ob(a);d?ga(a,a.oPreviousSearch):a.aiDisplay=a.aiDisplayMaster.slice();!0!==b&&(a._iDisplayStart=0);a._drawHold=b;O(a);a._drawHold=!1}function pb(a){var b=a.oClasses,c=h(a.nTable),c=h("<div/>").insertBefore(c),d=a.oFeatures,e=h("<div/>",{id:a.sTableId+"_wrapper","class":b.sWrapper+(a.nTFoot?"":" "+b.sNoFooter)});a.nHolding=c[0];a.nTableWrapper=e[0];a.nTableReinsertBefore=a.nTable.nextSibling;for(var f=a.sDom.split(""),g,j,i,n,l,q,k=0;k<f.length;k++){g=null;j=f[k];if("<"==j){i=h("<div/>")[0];
n=f[k+1];if("'"==n||'"'==n){l="";for(q=2;f[k+q]!=n;)l+=f[k+q],q++;"H"==l?l=b.sJUIHeader:"F"==l&&(l=b.sJUIFooter);-1!=l.indexOf(".")?(n=l.split("."),i.id=n[0].substr(1,n[0].length-1),i.className=n[1]):"#"==l.charAt(0)?i.id=l.substr(1,l.length-1):i.className=l;k+=q}e.append(i);e=h(i)}else if(">"==j)e=e.parent();else if("l"==j&&d.bPaginate&&d.bLengthChange)g=qb(a);else if("f"==j&&d.bFilter)g=rb(a);else if("r"==j&&d.bProcessing)g=sb(a);else if("t"==j)g=tb(a);else if("i"==j&&d.bInfo)g=ub(a);else if("p"==
j&&d.bPaginate)g=vb(a);else if(0!==m.ext.feature.length){i=m.ext.feature;q=0;for(n=i.length;q<n;q++)if(j==i[q].cFeature){g=i[q].fnInit(a);break}}g&&(i=a.aanFeatures,i[j]||(i[j]=[]),i[j].push(g),e.append(g))}c.replaceWith(e);a.nHolding=null}function ea(a,b){var c=h(b).children("tr"),d,e,f,g,j,i,n,l,q,k;a.splice(0,a.length);f=0;for(i=c.length;f<i;f++)a.push([]);f=0;for(i=c.length;f<i;f++){d=c[f];for(e=d.firstChild;e;){if("TD"==e.nodeName.toUpperCase()||"TH"==e.nodeName.toUpperCase()){l=1*e.getAttribute("colspan");
q=1*e.getAttribute("rowspan");l=!l||0===l||1===l?1:l;q=!q||0===q||1===q?1:q;g=0;for(j=a[f];j[g];)g++;n=g;k=1===l?!0:!1;for(j=0;j<l;j++)for(g=0;g<q;g++)a[f+g][n+j]={cell:e,unique:k},a[f+g].nTr=d}e=e.nextSibling}}}function ta(a,b,c){var d=[];c||(c=a.aoHeader,b&&(c=[],ea(c,b)));for(var b=0,e=c.length;b<e;b++)for(var f=0,g=c[b].length;f<g;f++)if(c[b][f].unique&&(!d[f]||!a.bSortCellsTop))d[f]=c[b][f].cell;return d}function ua(a,b,c){s(a,"aoServerParams","serverParams",[b]);if(b&&h.isArray(b)){var d={},
e=/(.*?)\[\]$/;h.each(b,function(a,b){var c=b.name.match(e);c?(c=c[0],d[c]||(d[c]=[]),d[c].push(b.value)):d[b.name]=b.value});b=d}var f,g=a.ajax,j=a.oInstance,i=function(b){s(a,null,"xhr",[a,b,a.jqXHR]);c(b)};if(h.isPlainObject(g)&&g.data){f=g.data;var n=h.isFunction(f)?f(b,a):f,b=h.isFunction(f)&&n?n:h.extend(!0,b,n);delete g.data}n={data:b,success:function(b){var c=b.error||b.sError;c&&K(a,0,c);a.json=b;i(b)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(b,c){var d=s(a,null,"xhr",
[a,null,a.jqXHR]);-1===h.inArray(!0,d)&&("parsererror"==c?K(a,0,"Invalid JSON response",1):4===b.readyState&&K(a,0,"Ajax error",7));C(a,!1)}};a.oAjaxData=b;s(a,null,"preXhr",[a,b]);a.fnServerData?a.fnServerData.call(j,a.sAjaxSource,h.map(b,function(a,b){return{name:b,value:a}}),i,a):a.sAjaxSource||"string"===typeof g?a.jqXHR=h.ajax(h.extend(n,{url:g||a.sAjaxSource})):h.isFunction(g)?a.jqXHR=g.call(j,b,i,a):(a.jqXHR=h.ajax(h.extend(n,g)),g.data=f)}function nb(a){return a.bAjaxDataGet?(a.iDraw++,C(a,
!0),ua(a,wb(a),function(b){xb(a,b)}),!1):!0}function wb(a){var b=a.aoColumns,c=b.length,d=a.oFeatures,e=a.oPreviousSearch,f=a.aoPreSearchCols,g,j=[],i,n,l,k=W(a);g=a._iDisplayStart;i=!1!==d.bPaginate?a._iDisplayLength:-1;var r=function(a,b){j.push({name:a,value:b})};r("sEcho",a.iDraw);r("iColumns",c);r("sColumns",D(b,"sName").join(","));r("iDisplayStart",g);r("iDisplayLength",i);var ra={draw:a.iDraw,columns:[],order:[],start:g,length:i,search:{value:e.sSearch,regex:e.bRegex}};for(g=0;g<c;g++)n=b[g],
l=f[g],i="function"==typeof n.mData?"function":n.mData,ra.columns.push({data:i,name:n.sName,searchable:n.bSearchable,orderable:n.bSortable,search:{value:l.sSearch,regex:l.bRegex}}),r("mDataProp_"+g,i),d.bFilter&&(r("sSearch_"+g,l.sSearch),r("bRegex_"+g,l.bRegex),r("bSearchable_"+g,n.bSearchable)),d.bSort&&r("bSortable_"+g,n.bSortable);d.bFilter&&(r("sSearch",e.sSearch),r("bRegex",e.bRegex));d.bSort&&(h.each(k,function(a,b){ra.order.push({column:b.col,dir:b.dir});r("iSortCol_"+a,b.col);r("sSortDir_"+
a,b.dir)}),r("iSortingCols",k.length));b=m.ext.legacy.ajax;return null===b?a.sAjaxSource?j:ra:b?j:ra}function xb(a,b){var c=va(a,b),d=b.sEcho!==k?b.sEcho:b.draw,e=b.iTotalRecords!==k?b.iTotalRecords:b.recordsTotal,f=b.iTotalDisplayRecords!==k?b.iTotalDisplayRecords:b.recordsFiltered;if(d){if(1*d<a.iDraw)return;a.iDraw=1*d}pa(a);a._iRecordsTotal=parseInt(e,10);a._iRecordsDisplay=parseInt(f,10);d=0;for(e=c.length;d<e;d++)N(a,c[d]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=!1;O(a);a._bInitComplete||
wa(a,b);a.bAjaxDataGet=!0;C(a,!1)}function va(a,b){var c=h.isPlainObject(a.ajax)&&a.ajax.dataSrc!==k?a.ajax.dataSrc:a.sAjaxDataProp;return"data"===c?b.aaData||b[c]:""!==c?R(c)(b):b}function rb(a){var b=a.oClasses,c=a.sTableId,d=a.oLanguage,e=a.oPreviousSearch,f=a.aanFeatures,g='<input type="search" class="'+b.sFilterInput+'"/>',j=d.sSearch,j=j.match(/_INPUT_/)?j.replace("_INPUT_",g):j+g,b=h("<div/>",{id:!f.f?c+"_filter":null,"class":b.sFilter}).append(h("<label/>").append(j)),f=function(){var b=!this.value?
"":this.value;b!=e.sSearch&&(ga(a,{sSearch:b,bRegex:e.bRegex,bSmart:e.bSmart,bCaseInsensitive:e.bCaseInsensitive}),a._iDisplayStart=0,O(a))},g=null!==a.searchDelay?a.searchDelay:"ssp"===y(a)?400:0,i=h("input",b).val(e.sSearch).attr("placeholder",d.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT",g?Qa(f,g):f).on("keypress.DT",function(a){if(13==a.keyCode)return!1}).attr("aria-controls",c);h(a.nTable).on("search.dt.DT",function(b,c){if(a===c)try{i[0]!==H.activeElement&&i.val(e.sSearch)}catch(d){}});
return b[0]}function ga(a,b,c){var d=a.oPreviousSearch,e=a.aoPreSearchCols,f=function(a){d.sSearch=a.sSearch;d.bRegex=a.bRegex;d.bSmart=a.bSmart;d.bCaseInsensitive=a.bCaseInsensitive};Ia(a);if("ssp"!=y(a)){yb(a,b.sSearch,c,b.bEscapeRegex!==k?!b.bEscapeRegex:b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<e.length;b++)zb(a,e[b].sSearch,b,e[b].bEscapeRegex!==k?!e[b].bEscapeRegex:e[b].bRegex,e[b].bSmart,e[b].bCaseInsensitive);Ab(a)}else f(b);a.bFiltered=!0;s(a,null,"search",[a])}function Ab(a){for(var b=
m.ext.search,c=a.aiDisplay,d,e,f=0,g=b.length;f<g;f++){for(var j=[],i=0,n=c.length;i<n;i++)e=c[i],d=a.aoData[e],b[f](a,d._aFilterData,e,d._aData,i)&&j.push(e);c.length=0;h.merge(c,j)}}function zb(a,b,c,d,e,f){if(""!==b){for(var g=[],j=a.aiDisplay,d=Ra(b,d,e,f),e=0;e<j.length;e++)b=a.aoData[j[e]]._aFilterData[c],d.test(b)&&g.push(j[e]);a.aiDisplay=g}}function yb(a,b,c,d,e,f){var d=Ra(b,d,e,f),f=a.oPreviousSearch.sSearch,g=a.aiDisplayMaster,j,e=[];0!==m.ext.search.length&&(c=!0);j=Bb(a);if(0>=b.length)a.aiDisplay=
g.slice();else{if(j||c||f.length>b.length||0!==b.indexOf(f)||a.bSorted)a.aiDisplay=g.slice();b=a.aiDisplay;for(c=0;c<b.length;c++)d.test(a.aoData[b[c]]._sFilterRow)&&e.push(b[c]);a.aiDisplay=e}}function Ra(a,b,c,d){a=b?a:Sa(a);c&&(a="^(?=.*?"+h.map(a.match(/"[^"]+"|[^ ]+/g)||[""],function(a){if('"'===a.charAt(0))var b=a.match(/^"(.*)"$/),a=b?b[1]:a;return a.replace('"',"")}).join(")(?=.*?")+").*$");return RegExp(a,d?"i":"")}function Bb(a){var b=a.aoColumns,c,d,e,f,g,j,i,h,l=m.ext.type.search;c=!1;
d=0;for(f=a.aoData.length;d<f;d++)if(h=a.aoData[d],!h._aFilterData){j=[];e=0;for(g=b.length;e<g;e++)c=b[e],c.bSearchable?(i=B(a,d,e,"filter"),l[c.sType]&&(i=l[c.sType](i)),null===i&&(i=""),"string"!==typeof i&&i.toString&&(i=i.toString())):i="",i.indexOf&&-1!==i.indexOf("&")&&(xa.innerHTML=i,i=$b?xa.textContent:xa.innerText),i.replace&&(i=i.replace(/[\r\n]/g,"")),j.push(i);h._aFilterData=j;h._sFilterRow=j.join("  ");c=!0}return c}function Cb(a){return{search:a.sSearch,smart:a.bSmart,regex:a.bRegex,
caseInsensitive:a.bCaseInsensitive}}function Db(a){return{sSearch:a.search,bSmart:a.smart,bRegex:a.regex,bCaseInsensitive:a.caseInsensitive}}function ub(a){var b=a.sTableId,c=a.aanFeatures.i,d=h("<div/>",{"class":a.oClasses.sInfo,id:!c?b+"_info":null});c||(a.aoDrawCallback.push({fn:Eb,sName:"information"}),d.attr("role","status").attr("aria-live","polite"),h(a.nTable).attr("aria-describedby",b+"_info"));return d[0]}function Eb(a){var b=a.aanFeatures.i;if(0!==b.length){var c=a.oLanguage,d=a._iDisplayStart+
1,e=a.fnDisplayEnd(),f=a.fnRecordsTotal(),g=a.fnRecordsDisplay(),j=g?c.sInfo:c.sInfoEmpty;g!==f&&(j+=" "+c.sInfoFiltered);j+=c.sInfoPostFix;j=Fb(a,j);c=c.fnInfoCallback;null!==c&&(j=c.call(a.oInstance,a,d,e,f,g,j));h(b).html(j)}}function Fb(a,b){var c=a.fnFormatNumber,d=a._iDisplayStart+1,e=a._iDisplayLength,f=a.fnRecordsDisplay(),g=-1===e;return b.replace(/_START_/g,c.call(a,d)).replace(/_END_/g,c.call(a,a.fnDisplayEnd())).replace(/_MAX_/g,c.call(a,a.fnRecordsTotal())).replace(/_TOTAL_/g,c.call(a,
f)).replace(/_PAGE_/g,c.call(a,g?1:Math.ceil(d/e))).replace(/_PAGES_/g,c.call(a,g?1:Math.ceil(f/e)))}function ha(a){var b,c,d=a.iInitDisplayStart,e=a.aoColumns,f;c=a.oFeatures;var g=a.bDeferLoading;if(a.bInitialised){pb(a);mb(a);fa(a,a.aoHeader);fa(a,a.aoFooter);C(a,!0);c.bAutoWidth&&Ha(a);b=0;for(c=e.length;b<c;b++)f=e[b],f.sWidth&&(f.nTh.style.width=v(f.sWidth));s(a,null,"preInit",[a]);T(a);e=y(a);if("ssp"!=e||g)"ajax"==e?ua(a,[],function(c){var f=va(a,c);for(b=0;b<f.length;b++)N(a,f[b]);a.iInitDisplayStart=
d;T(a);C(a,!1);wa(a,c)},a):(C(a,!1),wa(a))}else setTimeout(function(){ha(a)},200)}function wa(a,b){a._bInitComplete=!0;(b||a.oInit.aaData)&&Z(a);s(a,null,"plugin-init",[a,b]);s(a,"aoInitComplete","init",[a,b])}function Ta(a,b){var c=parseInt(b,10);a._iDisplayLength=c;Ua(a);s(a,null,"length",[a,c])}function qb(a){for(var b=a.oClasses,c=a.sTableId,d=a.aLengthMenu,e=h.isArray(d[0]),f=e?d[0]:d,d=e?d[1]:d,e=h("<select/>",{name:c+"_length","aria-controls":c,"class":b.sLengthSelect}),g=0,j=f.length;g<j;g++)e[0][g]=
new Option(d[g],f[g]);var i=h("<div><label/></div>").addClass(b.sLength);a.aanFeatures.l||(i[0].id=c+"_length");i.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",e[0].outerHTML));h("select",i).val(a._iDisplayLength).on("change.DT",function(){Ta(a,h(this).val());O(a)});h(a.nTable).on("length.dt.DT",function(b,c,d){a===c&&h("select",i).val(d)});return i[0]}function vb(a){var b=a.sPaginationType,c=m.ext.pager[b],d="function"===typeof c,e=function(a){O(a)},b=h("<div/>").addClass(a.oClasses.sPaging+
b)[0],f=a.aanFeatures;d||c.fnInit(a,b,e);f.p||(b.id=a.sTableId+"_paginate",a.aoDrawCallback.push({fn:function(a){if(d){var b=a._iDisplayStart,i=a._iDisplayLength,h=a.fnRecordsDisplay(),l=-1===i,b=l?0:Math.ceil(b/i),i=l?1:Math.ceil(h/i),h=c(b,i),k,l=0;for(k=f.p.length;l<k;l++)Pa(a,"pageButton")(a,f.p[l],l,h,b,i)}else c.fnUpdate(a,e)},sName:"pagination"}));return b}function Va(a,b,c){var d=a._iDisplayStart,e=a._iDisplayLength,f=a.fnRecordsDisplay();0===f||-1===e?d=0:"number"===typeof b?(d=b*e,d>f&&
(d=0)):"first"==b?d=0:"previous"==b?(d=0<=e?d-e:0,0>d&&(d=0)):"next"==b?d+e<f&&(d+=e):"last"==b?d=Math.floor((f-1)/e)*e:K(a,0,"Unknown paging action: "+b,5);b=a._iDisplayStart!==d;a._iDisplayStart=d;b&&(s(a,null,"page",[a]),c&&O(a));return b}function sb(a){return h("<div/>",{id:!a.aanFeatures.r?a.sTableId+"_processing":null,"class":a.oClasses.sProcessing}).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0]}function C(a,b){a.oFeatures.bProcessing&&h(a.aanFeatures.r).css("display",b?"block":"none");
s(a,null,"processing",[a,b])}function tb(a){var b=h(a.nTable);b.attr("role","grid");var c=a.oScroll;if(""===c.sX&&""===c.sY)return a.nTable;var d=c.sX,e=c.sY,f=a.oClasses,g=b.children("caption"),j=g.length?g[0]._captionSide:null,i=h(b[0].cloneNode(!1)),n=h(b[0].cloneNode(!1)),l=b.children("tfoot");l.length||(l=null);i=h("<div/>",{"class":f.sScrollWrapper}).append(h("<div/>",{"class":f.sScrollHead}).css({overflow:"hidden",position:"relative",border:0,width:d?!d?null:v(d):"100%"}).append(h("<div/>",
{"class":f.sScrollHeadInner}).css({"box-sizing":"content-box",width:c.sXInner||"100%"}).append(i.removeAttr("id").css("margin-left",0).append("top"===j?g:null).append(b.children("thead"))))).append(h("<div/>",{"class":f.sScrollBody}).css({position:"relative",overflow:"auto",width:!d?null:v(d)}).append(b));l&&i.append(h("<div/>",{"class":f.sScrollFoot}).css({overflow:"hidden",border:0,width:d?!d?null:v(d):"100%"}).append(h("<div/>",{"class":f.sScrollFootInner}).append(n.removeAttr("id").css("margin-left",
0).append("bottom"===j?g:null).append(b.children("tfoot")))));var b=i.children(),k=b[0],f=b[1],r=l?b[2]:null;if(d)h(f).on("scroll.DT",function(){var a=this.scrollLeft;k.scrollLeft=a;l&&(r.scrollLeft=a)});h(f).css(e&&c.bCollapse?"max-height":"height",e);a.nScrollHead=k;a.nScrollBody=f;a.nScrollFoot=r;a.aoDrawCallback.push({fn:ma,sName:"scrolling"});return i[0]}function ma(a){var b=a.oScroll,c=b.sX,d=b.sXInner,e=b.sY,b=b.iBarWidth,f=h(a.nScrollHead),g=f[0].style,j=f.children("div"),i=j[0].style,n=j.children("table"),
j=a.nScrollBody,l=h(j),q=j.style,r=h(a.nScrollFoot).children("div"),m=r.children("table"),p=h(a.nTHead),o=h(a.nTable),t=o[0],s=t.style,u=a.nTFoot?h(a.nTFoot):null,x=a.oBrowser,U=x.bScrollOversize,ac=D(a.aoColumns,"nTh"),P,L,Q,w,Wa=[],y=[],z=[],A=[],B,C=function(a){a=a.style;a.paddingTop="0";a.paddingBottom="0";a.borderTopWidth="0";a.borderBottomWidth="0";a.height=0};L=j.scrollHeight>j.clientHeight;if(a.scrollBarVis!==L&&a.scrollBarVis!==k)a.scrollBarVis=L,Z(a);else{a.scrollBarVis=L;o.children("thead, tfoot").remove();
u&&(Q=u.clone().prependTo(o),P=u.find("tr"),Q=Q.find("tr"));w=p.clone().prependTo(o);p=p.find("tr");L=w.find("tr");w.find("th, td").removeAttr("tabindex");c||(q.width="100%",f[0].style.width="100%");h.each(ta(a,w),function(b,c){B=$(a,b);c.style.width=a.aoColumns[B].sWidth});u&&I(function(a){a.style.width=""},Q);f=o.outerWidth();if(""===c){s.width="100%";if(U&&(o.find("tbody").height()>j.offsetHeight||"scroll"==l.css("overflow-y")))s.width=v(o.outerWidth()-b);f=o.outerWidth()}else""!==d&&(s.width=
v(d),f=o.outerWidth());I(C,L);I(function(a){z.push(a.innerHTML);Wa.push(v(h(a).css("width")))},L);I(function(a,b){if(h.inArray(a,ac)!==-1)a.style.width=Wa[b]},p);h(L).height(0);u&&(I(C,Q),I(function(a){A.push(a.innerHTML);y.push(v(h(a).css("width")))},Q),I(function(a,b){a.style.width=y[b]},P),h(Q).height(0));I(function(a,b){a.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+z[b]+"</div>";a.style.width=Wa[b]},L);u&&I(function(a,b){a.innerHTML='<div class="dataTables_sizing" style="height:0;overflow:hidden;">'+
A[b]+"</div>";a.style.width=y[b]},Q);if(o.outerWidth()<f){P=j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")?f+b:f;if(U&&(j.scrollHeight>j.offsetHeight||"scroll"==l.css("overflow-y")))s.width=v(P-b);(""===c||""!==d)&&K(a,1,"Possible column misalignment",6)}else P="100%";q.width=v(P);g.width=v(P);u&&(a.nScrollFoot.style.width=v(P));!e&&U&&(q.height=v(t.offsetHeight+b));c=o.outerWidth();n[0].style.width=v(c);i.width=v(c);d=o.height()>j.clientHeight||"scroll"==l.css("overflow-y");e="padding"+
(x.bScrollbarLeft?"Left":"Right");i[e]=d?b+"px":"0px";u&&(m[0].style.width=v(c),r[0].style.width=v(c),r[0].style[e]=d?b+"px":"0px");o.children("colgroup").insertBefore(o.children("thead"));l.scroll();if((a.bSorted||a.bFiltered)&&!a._drawHold)j.scrollTop=0}}function I(a,b,c){for(var d=0,e=0,f=b.length,g,j;e<f;){g=b[e].firstChild;for(j=c?c[e].firstChild:null;g;)1===g.nodeType&&(c?a(g,j,d):a(g,d),d++),g=g.nextSibling,j=c?j.nextSibling:null;e++}}function Ha(a){var b=a.nTable,c=a.aoColumns,d=a.oScroll,
e=d.sY,f=d.sX,g=d.sXInner,j=c.length,i=na(a,"bVisible"),n=h("th",a.nTHead),l=b.getAttribute("width"),k=b.parentNode,r=!1,m,p,o=a.oBrowser,d=o.bScrollOversize;(m=b.style.width)&&-1!==m.indexOf("%")&&(l=m);for(m=0;m<i.length;m++)p=c[i[m]],null!==p.sWidth&&(p.sWidth=Gb(p.sWidthOrig,k),r=!0);if(d||!r&&!f&&!e&&j==ba(a)&&j==n.length)for(m=0;m<j;m++)i=$(a,m),null!==i&&(c[i].sWidth=v(n.eq(m).width()));else{j=h(b).clone().css("visibility","hidden").removeAttr("id");j.find("tbody tr").remove();var t=h("<tr/>").appendTo(j.find("tbody"));
j.find("thead, tfoot").remove();j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());j.find("tfoot th, tfoot td").css("width","");n=ta(a,j.find("thead")[0]);for(m=0;m<i.length;m++)p=c[i[m]],n[m].style.width=null!==p.sWidthOrig&&""!==p.sWidthOrig?v(p.sWidthOrig):"",p.sWidthOrig&&f&&h(n[m]).append(h("<div/>").css({width:p.sWidthOrig,margin:0,padding:0,border:0,height:1}));if(a.aoData.length)for(m=0;m<i.length;m++)r=i[m],p=c[r],h(Hb(a,r)).clone(!1).append(p.sContentPadding).appendTo(t);h("[name]",
j).removeAttr("name");p=h("<div/>").css(f||e?{position:"absolute",top:0,left:0,height:1,right:0,overflow:"hidden"}:{}).append(j).appendTo(k);f&&g?j.width(g):f?(j.css("width","auto"),j.removeAttr("width"),j.width()<k.clientWidth&&l&&j.width(k.clientWidth)):e?j.width(k.clientWidth):l&&j.width(l);for(m=e=0;m<i.length;m++)k=h(n[m]),g=k.outerWidth()-k.width(),k=o.bBounding?Math.ceil(n[m].getBoundingClientRect().width):k.outerWidth(),e+=k,c[i[m]].sWidth=v(k-g);b.style.width=v(e);p.remove()}l&&(b.style.width=
v(l));if((l||f)&&!a._reszEvt)b=function(){h(E).on("resize.DT-"+a.sInstance,Qa(function(){Z(a)}))},d?setTimeout(b,1E3):b(),a._reszEvt=!0}function Gb(a,b){if(!a)return 0;var c=h("<div/>").css("width",v(a)).appendTo(b||H.body),d=c[0].offsetWidth;c.remove();return d}function Hb(a,b){var c=Ib(a,b);if(0>c)return null;var d=a.aoData[c];return!d.nTr?h("<td/>").html(B(a,c,b,"display"))[0]:d.anCells[b]}function Ib(a,b){for(var c,d=-1,e=-1,f=0,g=a.aoData.length;f<g;f++)c=B(a,f,b,"display")+"",c=c.replace(bc,
""),c=c.replace(/&nbsp;/g," "),c.length>d&&(d=c.length,e=f);return e}function v(a){return null===a?"0px":"number"==typeof a?0>a?"0px":a+"px":a.match(/\d$/)?a+"px":a}function W(a){var b,c,d=[],e=a.aoColumns,f,g,j,i;b=a.aaSortingFixed;c=h.isPlainObject(b);var n=[];f=function(a){a.length&&!h.isArray(a[0])?n.push(a):h.merge(n,a)};h.isArray(b)&&f(b);c&&b.pre&&f(b.pre);f(a.aaSorting);c&&b.post&&f(b.post);for(a=0;a<n.length;a++){i=n[a][0];f=e[i].aDataSort;b=0;for(c=f.length;b<c;b++)g=f[b],j=e[g].sType||
"string",n[a]._idx===k&&(n[a]._idx=h.inArray(n[a][1],e[g].asSorting)),d.push({src:i,col:g,dir:n[a][1],index:n[a]._idx,type:j,formatter:m.ext.type.order[j+"-pre"]})}return d}function ob(a){var b,c,d=[],e=m.ext.type.order,f=a.aoData,g=0,j,i=a.aiDisplayMaster,h;Ia(a);h=W(a);b=0;for(c=h.length;b<c;b++)j=h[b],j.formatter&&g++,Jb(a,j.col);if("ssp"!=y(a)&&0!==h.length){b=0;for(c=i.length;b<c;b++)d[i[b]]=b;g===h.length?i.sort(function(a,b){var c,e,g,j,i=h.length,k=f[a]._aSortData,m=f[b]._aSortData;for(g=
0;g<i;g++)if(j=h[g],c=k[j.col],e=m[j.col],c=c<e?-1:c>e?1:0,0!==c)return"asc"===j.dir?c:-c;c=d[a];e=d[b];return c<e?-1:c>e?1:0}):i.sort(function(a,b){var c,g,j,i,k=h.length,m=f[a]._aSortData,p=f[b]._aSortData;for(j=0;j<k;j++)if(i=h[j],c=m[i.col],g=p[i.col],i=e[i.type+"-"+i.dir]||e["string-"+i.dir],c=i(c,g),0!==c)return c;c=d[a];g=d[b];return c<g?-1:c>g?1:0})}a.bSorted=!0}function Kb(a){for(var b,c,d=a.aoColumns,e=W(a),a=a.oLanguage.oAria,f=0,g=d.length;f<g;f++){c=d[f];var j=c.asSorting;b=c.sTitle.replace(/<.*?>/g,
"");var i=c.nTh;i.removeAttribute("aria-sort");c.bSortable&&(0<e.length&&e[0].col==f?(i.setAttribute("aria-sort","asc"==e[0].dir?"ascending":"descending"),c=j[e[0].index+1]||j[0]):c=j[0],b+="asc"===c?a.sSortAscending:a.sSortDescending);i.setAttribute("aria-label",b)}}function Xa(a,b,c,d){var e=a.aaSorting,f=a.aoColumns[b].asSorting,g=function(a,b){var c=a._idx;c===k&&(c=h.inArray(a[1],f));return c+1<f.length?c+1:b?null:0};"number"===typeof e[0]&&(e=a.aaSorting=[e]);c&&a.oFeatures.bSortMulti?(c=h.inArray(b,
D(e,"0")),-1!==c?(b=g(e[c],!0),null===b&&1===e.length&&(b=0),null===b?e.splice(c,1):(e[c][1]=f[b],e[c]._idx=b)):(e.push([b,f[0],0]),e[e.length-1]._idx=0)):e.length&&e[0][0]==b?(b=g(e[0]),e.length=1,e[0][1]=f[b],e[0]._idx=b):(e.length=0,e.push([b,f[0]]),e[0]._idx=0);T(a);"function"==typeof d&&d(a)}function Oa(a,b,c,d){var e=a.aoColumns[c];Ya(b,{},function(b){!1!==e.bSortable&&(a.oFeatures.bProcessing?(C(a,!0),setTimeout(function(){Xa(a,c,b.shiftKey,d);"ssp"!==y(a)&&C(a,!1)},0)):Xa(a,c,b.shiftKey,d))})}
function ya(a){var b=a.aLastSort,c=a.oClasses.sSortColumn,d=W(a),e=a.oFeatures,f,g;if(e.bSort&&e.bSortClasses){e=0;for(f=b.length;e<f;e++)g=b[e].src,h(D(a.aoData,"anCells",g)).removeClass(c+(2>e?e+1:3));e=0;for(f=d.length;e<f;e++)g=d[e].src,h(D(a.aoData,"anCells",g)).addClass(c+(2>e?e+1:3))}a.aLastSort=d}function Jb(a,b){var c=a.aoColumns[b],d=m.ext.order[c.sSortDataType],e;d&&(e=d.call(a.oInstance,a,b,aa(a,b)));for(var f,g=m.ext.type.order[c.sType+"-pre"],j=0,i=a.aoData.length;j<i;j++)if(c=a.aoData[j],
c._aSortData||(c._aSortData=[]),!c._aSortData[b]||d)f=d?e[j]:B(a,j,b,"sort"),c._aSortData[b]=g?g(f):f}function za(a){if(a.oFeatures.bStateSave&&!a.bDestroying){var b={time:+new Date,start:a._iDisplayStart,length:a._iDisplayLength,order:h.extend(!0,[],a.aaSorting),search:Cb(a.oPreviousSearch),columns:h.map(a.aoColumns,function(b,d){return{visible:b.bVisible,search:Cb(a.aoPreSearchCols[d])}})};s(a,"aoStateSaveParams","stateSaveParams",[a,b]);a.oSavedState=b;a.fnStateSaveCallback.call(a.oInstance,a,
b)}}function Lb(a,b,c){var d,e,f=a.aoColumns,b=function(b){if(b&&b.time){var g=s(a,"aoStateLoadParams","stateLoadParams",[a,b]);if(-1===h.inArray(!1,g)&&(g=a.iStateDuration,!(0<g&&b.time<+new Date-1E3*g)&&!(b.columns&&f.length!==b.columns.length))){a.oLoadedState=h.extend(!0,{},b);b.start!==k&&(a._iDisplayStart=b.start,a.iInitDisplayStart=b.start);b.length!==k&&(a._iDisplayLength=b.length);b.order!==k&&(a.aaSorting=[],h.each(b.order,function(b,c){a.aaSorting.push(c[0]>=f.length?[0,c[1]]:c)}));b.search!==
k&&h.extend(a.oPreviousSearch,Db(b.search));if(b.columns){d=0;for(e=b.columns.length;d<e;d++)g=b.columns[d],g.visible!==k&&(f[d].bVisible=g.visible),g.search!==k&&h.extend(a.aoPreSearchCols[d],Db(g.search))}s(a,"aoStateLoaded","stateLoaded",[a,b])}}c()};if(a.oFeatures.bStateSave){var g=a.fnStateLoadCallback.call(a.oInstance,a,b);g!==k&&b(g)}else c()}function Aa(a){var b=m.settings,a=h.inArray(a,D(b,"nTable"));return-1!==a?b[a]:null}function K(a,b,c,d){c="DataTables warning: "+(a?"table id="+a.sTableId+
" - ":"")+c;d&&(c+=". For more information about this error, please see http://datatables.net/tn/"+d);if(b)E.console&&console.log&&console.log(c);else if(b=m.ext,b=b.sErrMode||b.errMode,a&&s(a,null,"error",[a,d,c]),"alert"==b)alert(c);else{if("throw"==b)throw Error(c);"function"==typeof b&&b(a,d,c)}}function F(a,b,c,d){h.isArray(c)?h.each(c,function(c,d){h.isArray(d)?F(a,b,d[0],d[1]):F(a,b,d)}):(d===k&&(d=c),b[c]!==k&&(a[d]=b[c]))}function Mb(a,b,c){var d,e;for(e in b)b.hasOwnProperty(e)&&(d=b[e],
h.isPlainObject(d)?(h.isPlainObject(a[e])||(a[e]={}),h.extend(!0,a[e],d)):a[e]=c&&"data"!==e&&"aaData"!==e&&h.isArray(d)?d.slice():d);return a}function Ya(a,b,c){h(a).on("click.DT",b,function(b){a.blur();c(b)}).on("keypress.DT",b,function(a){13===a.which&&(a.preventDefault(),c(a))}).on("selectstart.DT",function(){return!1})}function z(a,b,c,d){c&&a[b].push({fn:c,sName:d})}function s(a,b,c,d){var e=[];b&&(e=h.map(a[b].slice().reverse(),function(b){return b.fn.apply(a.oInstance,d)}));null!==c&&(b=h.Event(c+
".dt"),h(a.nTable).trigger(b,d),e.push(b.result));return e}function Ua(a){var b=a._iDisplayStart,c=a.fnDisplayEnd(),d=a._iDisplayLength;b>=c&&(b=c-d);b-=b%d;if(-1===d||0>b)b=0;a._iDisplayStart=b}function Pa(a,b){var c=a.renderer,d=m.ext.renderer[b];return h.isPlainObject(c)&&c[b]?d[c[b]]||d._:"string"===typeof c?d[c]||d._:d._}function y(a){return a.oFeatures.bServerSide?"ssp":a.ajax||a.sAjaxSource?"ajax":"dom"}function ia(a,b){var c=[],c=Nb.numbers_length,d=Math.floor(c/2);b<=c?c=X(0,b):a<=d?(c=X(0,
c-2),c.push("ellipsis"),c.push(b-1)):(a>=b-1-d?c=X(b-(c-2),b):(c=X(a-d+2,a+d-1),c.push("ellipsis"),c.push(b-1)),c.splice(0,0,"ellipsis"),c.splice(0,0,0));c.DT_el="span";return c}function fb(a){h.each({num:function(b){return Ba(b,a)},"num-fmt":function(b){return Ba(b,a,Za)},"html-num":function(b){return Ba(b,a,Ca)},"html-num-fmt":function(b){return Ba(b,a,Ca,Za)}},function(b,c){x.type.order[b+a+"-pre"]=c;b.match(/^html\-/)&&(x.type.search[b+a]=x.type.search.html)})}function Ob(a){return function(){var b=
[Aa(this[m.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return m.ext.internal[a].apply(this,b)}}var m=function(a){this.$=function(a,b){return this.api(!0).$(a,b)};this._=function(a,b){return this.api(!0).rows(a,b).data()};this.api=function(a){return a?new t(Aa(this[x.iApiIndex])):new t(this)};this.fnAddData=function(a,b){var c=this.api(!0),d=h.isArray(a)&&(h.isArray(a[0])||h.isPlainObject(a[0]))?c.rows.add(a):c.row.add(a);(b===k||b)&&c.draw();return d.flatten().toArray()};this.fnAdjustColumnSizing=
function(a){var b=this.api(!0).columns.adjust(),c=b.settings()[0],d=c.oScroll;a===k||a?b.draw(!1):(""!==d.sX||""!==d.sY)&&ma(c)};this.fnClearTable=function(a){var b=this.api(!0).clear();(a===k||a)&&b.draw()};this.fnClose=function(a){this.api(!0).row(a).child.hide()};this.fnDeleteRow=function(a,b,c){var d=this.api(!0),a=d.rows(a),e=a.settings()[0],h=e.aoData[a[0][0]];a.remove();b&&b.call(this,e,h);(c===k||c)&&d.draw();return h};this.fnDestroy=function(a){this.api(!0).destroy(a)};this.fnDraw=function(a){this.api(!0).draw(a)};
this.fnFilter=function(a,b,c,d,e,h){e=this.api(!0);null===b||b===k?e.search(a,c,d,h):e.column(b).search(a,c,d,h);e.draw()};this.fnGetData=function(a,b){var c=this.api(!0);if(a!==k){var d=a.nodeName?a.nodeName.toLowerCase():"";return b!==k||"td"==d||"th"==d?c.cell(a,b).data():c.row(a).data()||null}return c.data().toArray()};this.fnGetNodes=function(a){var b=this.api(!0);return a!==k?b.row(a).node():b.rows().nodes().flatten().toArray()};this.fnGetPosition=function(a){var b=this.api(!0),c=a.nodeName.toUpperCase();
return"TR"==c?b.row(a).index():"TD"==c||"TH"==c?(a=b.cell(a).index(),[a.row,a.columnVisible,a.column]):null};this.fnIsOpen=function(a){return this.api(!0).row(a).child.isShown()};this.fnOpen=function(a,b,c){return this.api(!0).row(a).child(b,c).show().child()[0]};this.fnPageChange=function(a,b){var c=this.api(!0).page(a);(b===k||b)&&c.draw(!1)};this.fnSetColumnVis=function(a,b,c){a=this.api(!0).column(a).visible(b);(c===k||c)&&a.columns.adjust().draw()};this.fnSettings=function(){return Aa(this[x.iApiIndex])};
this.fnSort=function(a){this.api(!0).order(a).draw()};this.fnSortListener=function(a,b,c){this.api(!0).order.listener(a,b,c)};this.fnUpdate=function(a,b,c,d,e){var h=this.api(!0);c===k||null===c?h.row(b).data(a):h.cell(b,c).data(a);(e===k||e)&&h.columns.adjust();(d===k||d)&&h.draw();return 0};this.fnVersionCheck=x.fnVersionCheck;var b=this,c=a===k,d=this.length;c&&(a={});this.oApi=this.internal=x.internal;for(var e in m.ext.internal)e&&(this[e]=Ob(e));this.each(function(){var e={},g=1<d?Mb(e,a,!0):
a,j=0,i,e=this.getAttribute("id"),n=!1,l=m.defaults,q=h(this);if("table"!=this.nodeName.toLowerCase())K(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{gb(l);hb(l.column);J(l,l,!0);J(l.column,l.column,!0);J(l,h.extend(g,q.data()));var r=m.settings,j=0;for(i=r.length;j<i;j++){var p=r[j];if(p.nTable==this||p.nTHead.parentNode==this||p.nTFoot&&p.nTFoot.parentNode==this){var t=g.bRetrieve!==k?g.bRetrieve:l.bRetrieve;if(c||t)return p.oInstance;if(g.bDestroy!==k?g.bDestroy:l.bDestroy){p.oInstance.fnDestroy();
break}else{K(p,0,"Cannot reinitialise DataTable",3);return}}if(p.sTableId==this.id){r.splice(j,1);break}}if(null===e||""===e)this.id=e="DataTables_Table_"+m.ext._unique++;var o=h.extend(!0,{},m.models.oSettings,{sDestroyWidth:q[0].style.width,sInstance:e,sTableId:e});o.nTable=this;o.oApi=b.internal;o.oInit=g;r.push(o);o.oInstance=1===b.length?b:q.dataTable();gb(g);g.oLanguage&&Fa(g.oLanguage);g.aLengthMenu&&!g.iDisplayLength&&(g.iDisplayLength=h.isArray(g.aLengthMenu[0])?g.aLengthMenu[0][0]:g.aLengthMenu[0]);
g=Mb(h.extend(!0,{},l),g);F(o.oFeatures,g,"bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" "));F(o,g,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],
["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"],["bJQueryUI","bJUI"]]);F(o.oScroll,g,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]);F(o.oLanguage,g,"fnInfoCallback");z(o,"aoDrawCallback",g.fnDrawCallback,"user");z(o,"aoServerParams",g.fnServerParams,"user");z(o,"aoStateSaveParams",g.fnStateSaveParams,"user");z(o,"aoStateLoadParams",g.fnStateLoadParams,"user");z(o,"aoStateLoaded",g.fnStateLoaded,
"user");z(o,"aoRowCallback",g.fnRowCallback,"user");z(o,"aoRowCreatedCallback",g.fnCreatedRow,"user");z(o,"aoHeaderCallback",g.fnHeaderCallback,"user");z(o,"aoFooterCallback",g.fnFooterCallback,"user");z(o,"aoInitComplete",g.fnInitComplete,"user");z(o,"aoPreDrawCallback",g.fnPreDrawCallback,"user");o.rowIdFn=R(g.rowId);ib(o);var u=o.oClasses;g.bJQueryUI?(h.extend(u,m.ext.oJUIClasses,g.oClasses),g.sDom===l.sDom&&"lfrtip"===l.sDom&&(o.sDom='<"H"lfr>t<"F"ip>'),o.renderer)?h.isPlainObject(o.renderer)&&
!o.renderer.header&&(o.renderer.header="jqueryui"):o.renderer="jqueryui":h.extend(u,m.ext.classes,g.oClasses);q.addClass(u.sTable);o.iInitDisplayStart===k&&(o.iInitDisplayStart=g.iDisplayStart,o._iDisplayStart=g.iDisplayStart);null!==g.iDeferLoading&&(o.bDeferLoading=!0,e=h.isArray(g.iDeferLoading),o._iRecordsDisplay=e?g.iDeferLoading[0]:g.iDeferLoading,o._iRecordsTotal=e?g.iDeferLoading[1]:g.iDeferLoading);var v=o.oLanguage;h.extend(!0,v,g.oLanguage);v.sUrl&&(h.ajax({dataType:"json",url:v.sUrl,success:function(a){Fa(a);
J(l.oLanguage,a);h.extend(true,v,a);ha(o)},error:function(){ha(o)}}),n=!0);null===g.asStripeClasses&&(o.asStripeClasses=[u.sStripeOdd,u.sStripeEven]);var e=o.asStripeClasses,x=q.children("tbody").find("tr").eq(0);-1!==h.inArray(!0,h.map(e,function(a){return x.hasClass(a)}))&&(h("tbody tr",this).removeClass(e.join(" ")),o.asDestroyStripes=e.slice());e=[];r=this.getElementsByTagName("thead");0!==r.length&&(ea(o.aoHeader,r[0]),e=ta(o));if(null===g.aoColumns){r=[];j=0;for(i=e.length;j<i;j++)r.push(null)}else r=
g.aoColumns;j=0;for(i=r.length;j<i;j++)Ga(o,e?e[j]:null);kb(o,g.aoColumnDefs,r,function(a,b){la(o,a,b)});if(x.length){var w=function(a,b){return a.getAttribute("data-"+b)!==null?b:null};h(x[0]).children("th, td").each(function(a,b){var c=o.aoColumns[a];if(c.mData===a){var d=w(b,"sort")||w(b,"order"),e=w(b,"filter")||w(b,"search");if(d!==null||e!==null){c.mData={_:a+".display",sort:d!==null?a+".@data-"+d:k,type:d!==null?a+".@data-"+d:k,filter:e!==null?a+".@data-"+e:k};la(o,a)}}})}var U=o.oFeatures,
e=function(){if(g.aaSorting===k){var a=o.aaSorting;j=0;for(i=a.length;j<i;j++)a[j][1]=o.aoColumns[j].asSorting[0]}ya(o);U.bSort&&z(o,"aoDrawCallback",function(){if(o.bSorted){var a=W(o),b={};h.each(a,function(a,c){b[c.src]=c.dir});s(o,null,"order",[o,a,b]);Kb(o)}});z(o,"aoDrawCallback",function(){(o.bSorted||y(o)==="ssp"||U.bDeferRender)&&ya(o)},"sc");var a=q.children("caption").each(function(){this._captionSide=h(this).css("caption-side")}),b=q.children("thead");b.length===0&&(b=h("<thead/>").appendTo(q));
o.nTHead=b[0];b=q.children("tbody");b.length===0&&(b=h("<tbody/>").appendTo(q));o.nTBody=b[0];b=q.children("tfoot");if(b.length===0&&a.length>0&&(o.oScroll.sX!==""||o.oScroll.sY!==""))b=h("<tfoot/>").appendTo(q);if(b.length===0||b.children().length===0)q.addClass(u.sNoFooter);else if(b.length>0){o.nTFoot=b[0];ea(o.aoFooter,o.nTFoot)}if(g.aaData)for(j=0;j<g.aaData.length;j++)N(o,g.aaData[j]);else(o.bDeferLoading||y(o)=="dom")&&oa(o,h(o.nTBody).children("tr"));o.aiDisplay=o.aiDisplayMaster.slice();
o.bInitialised=true;n===false&&ha(o)};g.bStateSave?(U.bStateSave=!0,z(o,"aoDrawCallback",za,"state_save"),Lb(o,g,e)):e()}});b=null;return this},x,t,p,u,$a={},Pb=/[\r\n]/g,Ca=/<.*?>/g,cc=/^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,dc=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),Za=/[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi,M=function(a){return!a||!0===a||"-"===a?!0:!1},Qb=function(a){var b=parseInt(a,10);return!isNaN(b)&&
isFinite(a)?b:null},Rb=function(a,b){$a[b]||($a[b]=RegExp(Sa(b),"g"));return"string"===typeof a&&"."!==b?a.replace(/\./g,"").replace($a[b],"."):a},ab=function(a,b,c){var d="string"===typeof a;if(M(a))return!0;b&&d&&(a=Rb(a,b));c&&d&&(a=a.replace(Za,""));return!isNaN(parseFloat(a))&&isFinite(a)},Sb=function(a,b,c){return M(a)?!0:!(M(a)||"string"===typeof a)?null:ab(a.replace(Ca,""),b,c)?!0:null},D=function(a,b,c){var d=[],e=0,f=a.length;if(c!==k)for(;e<f;e++)a[e]&&a[e][b]&&d.push(a[e][b][c]);else for(;e<
f;e++)a[e]&&d.push(a[e][b]);return d},ja=function(a,b,c,d){var e=[],f=0,g=b.length;if(d!==k)for(;f<g;f++)a[b[f]][c]&&e.push(a[b[f]][c][d]);else for(;f<g;f++)e.push(a[b[f]][c]);return e},X=function(a,b){var c=[],d;b===k?(b=0,d=a):(d=b,b=a);for(var e=b;e<d;e++)c.push(e);return c},Tb=function(a){for(var b=[],c=0,d=a.length;c<d;c++)a[c]&&b.push(a[c]);return b},sa=function(a){var b;a:{if(!(2>a.length)){b=a.slice().sort();for(var c=b[0],d=1,e=b.length;d<e;d++){if(b[d]===c){b=!1;break a}c=b[d]}}b=!0}if(b)return a.slice();
b=[];var e=a.length,f,g=0,d=0;a:for(;d<e;d++){c=a[d];for(f=0;f<g;f++)if(b[f]===c)continue a;b.push(c);g++}return b};m.util={throttle:function(a,b){var c=b!==k?b:200,d,e;return function(){var b=this,g=+new Date,h=arguments;d&&g<d+c?(clearTimeout(e),e=setTimeout(function(){d=k;a.apply(b,h)},c)):(d=g,a.apply(b,h))}},escapeRegex:function(a){return a.replace(dc,"\\$1")}};var A=function(a,b,c){a[b]!==k&&(a[c]=a[b])},ca=/\[.*?\]$/,V=/\(\)$/,Sa=m.util.escapeRegex,xa=h("<div>")[0],$b=xa.textContent!==k,bc=
/<.*?>/g,Qa=m.util.throttle,Ub=[],w=Array.prototype,ec=function(a){var b,c,d=m.settings,e=h.map(d,function(a){return a.nTable});if(a){if(a.nTable&&a.oApi)return[a];if(a.nodeName&&"table"===a.nodeName.toLowerCase())return b=h.inArray(a,e),-1!==b?[d[b]]:null;if(a&&"function"===typeof a.settings)return a.settings().toArray();"string"===typeof a?c=h(a):a instanceof h&&(c=a)}else return[];if(c)return c.map(function(){b=h.inArray(this,e);return-1!==b?d[b]:null}).toArray()};t=function(a,b){if(!(this instanceof
t))return new t(a,b);var c=[],d=function(a){(a=ec(a))&&(c=c.concat(a))};if(h.isArray(a))for(var e=0,f=a.length;e<f;e++)d(a[e]);else d(a);this.context=sa(c);b&&h.merge(this,b);this.selector={rows:null,cols:null,opts:null};t.extend(this,this,Ub)};m.Api=t;h.extend(t.prototype,{any:function(){return 0!==this.count()},concat:w.concat,context:[],count:function(){return this.flatten().length},each:function(a){for(var b=0,c=this.length;b<c;b++)a.call(this,this[b],b,this);return this},eq:function(a){var b=
this.context;return b.length>a?new t(b[a],this[a]):null},filter:function(a){var b=[];if(w.filter)b=w.filter.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)a.call(this,this[c],c,this)&&b.push(this[c]);return new t(this.context,b)},flatten:function(){var a=[];return new t(this.context,a.concat.apply(a,this.toArray()))},join:w.join,indexOf:w.indexOf||function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]===a)return c;return-1},iterator:function(a,b,c,d){var e=[],f,g,h,i,n,l=this.context,
m,p,u=this.selector;"string"===typeof a&&(d=c,c=b,b=a,a=!1);g=0;for(h=l.length;g<h;g++){var s=new t(l[g]);if("table"===b)f=c.call(s,l[g],g),f!==k&&e.push(f);else if("columns"===b||"rows"===b)f=c.call(s,l[g],this[g],g),f!==k&&e.push(f);else if("column"===b||"column-rows"===b||"row"===b||"cell"===b){p=this[g];"column-rows"===b&&(m=Da(l[g],u.opts));i=0;for(n=p.length;i<n;i++)f=p[i],f="cell"===b?c.call(s,l[g],f.row,f.column,g,i):c.call(s,l[g],f,g,i,m),f!==k&&e.push(f)}}return e.length||d?(a=new t(l,a?
e.concat.apply([],e):e),b=a.selector,b.rows=u.rows,b.cols=u.cols,b.opts=u.opts,a):this},lastIndexOf:w.lastIndexOf||function(a,b){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(a){var b=[];if(w.map)b=w.map.call(this,a,this);else for(var c=0,d=this.length;c<d;c++)b.push(a.call(this,this[c],c));return new t(this.context,b)},pluck:function(a){return this.map(function(b){return b[a]})},pop:w.pop,push:w.push,reduce:w.reduce||function(a,b){return jb(this,a,b,0,this.length,
1)},reduceRight:w.reduceRight||function(a,b){return jb(this,a,b,this.length-1,-1,-1)},reverse:w.reverse,selector:null,shift:w.shift,slice:function(){return new t(this.context,this)},sort:w.sort,splice:w.splice,toArray:function(){return w.slice.call(this)},to$:function(){return h(this)},toJQuery:function(){return h(this)},unique:function(){return new t(this.context,sa(this))},unshift:w.unshift});t.extend=function(a,b,c){if(c.length&&b&&(b instanceof t||b.__dt_wrapper)){var d,e,f,g=function(a,b,c){return function(){var d=
b.apply(a,arguments);t.extend(d,d,c.methodExt);return d}};d=0;for(e=c.length;d<e;d++)f=c[d],b[f.name]="function"===typeof f.val?g(a,f.val,f):h.isPlainObject(f.val)?{}:f.val,b[f.name].__dt_wrapper=!0,t.extend(a,b[f.name],f.propExt)}};t.register=p=function(a,b){if(h.isArray(a))for(var c=0,d=a.length;c<d;c++)t.register(a[c],b);else for(var e=a.split("."),f=Ub,g,j,c=0,d=e.length;c<d;c++){g=(j=-1!==e[c].indexOf("()"))?e[c].replace("()",""):e[c];var i;a:{i=0;for(var n=f.length;i<n;i++)if(f[i].name===g){i=
f[i];break a}i=null}i||(i={name:g,val:{},methodExt:[],propExt:[]},f.push(i));c===d-1?i.val=b:f=j?i.methodExt:i.propExt}};t.registerPlural=u=function(a,b,c){t.register(a,c);t.register(b,function(){var a=c.apply(this,arguments);return a===this?this:a instanceof t?a.length?h.isArray(a[0])?new t(a.context,a[0]):a[0]:k:a})};p("tables()",function(a){var b;if(a){b=t;var c=this.context;if("number"===typeof a)a=[c[a]];else var d=h.map(c,function(a){return a.nTable}),a=h(d).filter(a).map(function(){var a=h.inArray(this,
d);return c[a]}).toArray();b=new b(a)}else b=this;return b});p("table()",function(a){var a=this.tables(a),b=a.context;return b.length?new t(b[0]):a});u("tables().nodes()","table().node()",function(){return this.iterator("table",function(a){return a.nTable},1)});u("tables().body()","table().body()",function(){return this.iterator("table",function(a){return a.nTBody},1)});u("tables().header()","table().header()",function(){return this.iterator("table",function(a){return a.nTHead},1)});u("tables().footer()",
"table().footer()",function(){return this.iterator("table",function(a){return a.nTFoot},1)});u("tables().containers()","table().container()",function(){return this.iterator("table",function(a){return a.nTableWrapper},1)});p("draw()",function(a){return this.iterator("table",function(b){"page"===a?O(b):("string"===typeof a&&(a="full-hold"===a?!1:!0),T(b,!1===a))})});p("page()",function(a){return a===k?this.page.info().page:this.iterator("table",function(b){Va(b,a)})});p("page.info()",function(){if(0===
this.context.length)return k;var a=this.context[0],b=a._iDisplayStart,c=a.oFeatures.bPaginate?a._iDisplayLength:-1,d=a.fnRecordsDisplay(),e=-1===c;return{page:e?0:Math.floor(b/c),pages:e?1:Math.ceil(d/c),start:b,end:a.fnDisplayEnd(),length:c,recordsTotal:a.fnRecordsTotal(),recordsDisplay:d,serverSide:"ssp"===y(a)}});p("page.len()",function(a){return a===k?0!==this.context.length?this.context[0]._iDisplayLength:k:this.iterator("table",function(b){Ta(b,a)})});var Vb=function(a,b,c){if(c){var d=new t(a);
d.one("draw",function(){c(d.ajax.json())})}if("ssp"==y(a))T(a,b);else{C(a,!0);var e=a.jqXHR;e&&4!==e.readyState&&e.abort();ua(a,[],function(c){pa(a);for(var c=va(a,c),d=0,e=c.length;d<e;d++)N(a,c[d]);T(a,b);C(a,!1)})}};p("ajax.json()",function(){var a=this.context;if(0<a.length)return a[0].json});p("ajax.params()",function(){var a=this.context;if(0<a.length)return a[0].oAjaxData});p("ajax.reload()",function(a,b){return this.iterator("table",function(c){Vb(c,!1===b,a)})});p("ajax.url()",function(a){var b=
this.context;if(a===k){if(0===b.length)return k;b=b[0];return b.ajax?h.isPlainObject(b.ajax)?b.ajax.url:b.ajax:b.sAjaxSource}return this.iterator("table",function(b){h.isPlainObject(b.ajax)?b.ajax.url=a:b.ajax=a})});p("ajax.url().load()",function(a,b){return this.iterator("table",function(c){Vb(c,!1===b,a)})});var bb=function(a,b,c,d,e){var f=[],g,j,i,n,l,m;i=typeof b;if(!b||"string"===i||"function"===i||b.length===k)b=[b];i=0;for(n=b.length;i<n;i++){j=b[i]&&b[i].split&&!b[i].match(/[\[\(:]/)?b[i].split(","):
[b[i]];l=0;for(m=j.length;l<m;l++)(g=c("string"===typeof j[l]?h.trim(j[l]):j[l]))&&g.length&&(f=f.concat(g))}a=x.selector[a];if(a.length){i=0;for(n=a.length;i<n;i++)f=a[i](d,e,f)}return sa(f)},cb=function(a){a||(a={});a.filter&&a.search===k&&(a.search=a.filter);return h.extend({search:"none",order:"current",page:"all"},a)},db=function(a){for(var b=0,c=a.length;b<c;b++)if(0<a[b].length)return a[0]=a[b],a[0].length=1,a.length=1,a.context=[a.context[b]],a;a.length=0;return a},Da=function(a,b){var c,
d,e,f=[],g=a.aiDisplay;c=a.aiDisplayMaster;var j=b.search;d=b.order;e=b.page;if("ssp"==y(a))return"removed"===j?[]:X(0,c.length);if("current"==e){c=a._iDisplayStart;for(d=a.fnDisplayEnd();c<d;c++)f.push(g[c])}else if("current"==d||"applied"==d)f="none"==j?c.slice():"applied"==j?g.slice():h.map(c,function(a){return-1===h.inArray(a,g)?a:null});else if("index"==d||"original"==d){c=0;for(d=a.aoData.length;c<d;c++)"none"==j?f.push(c):(e=h.inArray(c,g),(-1===e&&"removed"==j||0<=e&&"applied"==j)&&f.push(c))}return f};
p("rows()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=cb(b),c=this.iterator("table",function(c){var e=b,f;return bb("row",a,function(a){var b=Qb(a);if(b!==null&&!e)return[b];f||(f=Da(c,e));if(b!==null&&h.inArray(b,f)!==-1)return[b];if(a===null||a===k||a==="")return f;if(typeof a==="function")return h.map(f,function(b){var e=c.aoData[b];return a(b,e._aData,e.nTr)?b:null});b=Tb(ja(c.aoData,f,"nTr"));if(a.nodeName){if(a._DT_RowIndex!==k)return[a._DT_RowIndex];if(a._DT_CellIndex)return[a._DT_CellIndex.row];
b=h(a).closest("*[data-dt-row]");return b.length?[b.data("dt-row")]:[]}if(typeof a==="string"&&a.charAt(0)==="#"){var i=c.aIds[a.replace(/^#/,"")];if(i!==k)return[i.idx]}return h(b).filter(a).map(function(){return this._DT_RowIndex}).toArray()},c,e)},1);c.selector.rows=a;c.selector.opts=b;return c});p("rows().nodes()",function(){return this.iterator("row",function(a,b){return a.aoData[b].nTr||k},1)});p("rows().data()",function(){return this.iterator(!0,"rows",function(a,b){return ja(a.aoData,b,"_aData")},
1)});u("rows().cache()","row().cache()",function(a){return this.iterator("row",function(b,c){var d=b.aoData[c];return"search"===a?d._aFilterData:d._aSortData},1)});u("rows().invalidate()","row().invalidate()",function(a){return this.iterator("row",function(b,c){da(b,c,a)})});u("rows().indexes()","row().index()",function(){return this.iterator("row",function(a,b){return b},1)});u("rows().ids()","row().id()",function(a){for(var b=[],c=this.context,d=0,e=c.length;d<e;d++)for(var f=0,g=this[d].length;f<
g;f++){var h=c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);b.push((!0===a?"#":"")+h)}return new t(c,b)});u("rows().remove()","row().remove()",function(){var a=this;this.iterator("row",function(b,c,d){var e=b.aoData,f=e[c],g,h,i,n,l;e.splice(c,1);g=0;for(h=e.length;g<h;g++)if(i=e[g],l=i.anCells,null!==i.nTr&&(i.nTr._DT_RowIndex=g),null!==l){i=0;for(n=l.length;i<n;i++)l[i]._DT_CellIndex.row=g}qa(b.aiDisplayMaster,c);qa(b.aiDisplay,c);qa(a[d],c,!1);Ua(b);c=b.rowIdFn(f._aData);c!==k&&delete b.aIds[c]});
this.iterator("table",function(a){for(var c=0,d=a.aoData.length;c<d;c++)a.aoData[c].idx=c});return this});p("rows.add()",function(a){var b=this.iterator("table",function(b){var c,f,g,h=[];f=0;for(g=a.length;f<g;f++)c=a[f],c.nodeName&&"TR"===c.nodeName.toUpperCase()?h.push(oa(b,c)[0]):h.push(N(b,c));return h},1),c=this.rows(-1);c.pop();h.merge(c,b);return c});p("row()",function(a,b){return db(this.rows(a,b))});p("row().data()",function(a){var b=this.context;if(a===k)return b.length&&this.length?b[0].aoData[this[0]]._aData:
k;b[0].aoData[this[0]]._aData=a;da(b[0],this[0],"data");return this});p("row().node()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]].nTr||null:null});p("row.add()",function(a){a instanceof h&&a.length&&(a=a[0]);var b=this.iterator("table",function(b){return a.nodeName&&"TR"===a.nodeName.toUpperCase()?oa(b,a)[0]:N(b,a)});return this.row(b[0])});var eb=function(a,b){var c=a.context;if(c.length&&(c=c[0].aoData[b!==k?b:a[0]])&&c._details)c._details.remove(),c._detailsShow=
k,c._details=k},Wb=function(a,b){var c=a.context;if(c.length&&a.length){var d=c[0].aoData[a[0]];if(d._details){(d._detailsShow=b)?d._details.insertAfter(d.nTr):d._details.detach();var e=c[0],f=new t(e),g=e.aoData;f.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details");0<D(g,"_details").length&&(f.on("draw.dt.DT_details",function(a,b){e===b&&f.rows({page:"current"}).eq(0).each(function(a){a=g[a];a._detailsShow&&a._details.insertAfter(a.nTr)})}),f.on("column-visibility.dt.DT_details",
function(a,b){if(e===b)for(var c,d=ba(b),f=0,h=g.length;f<h;f++)c=g[f],c._details&&c._details.children("td[colspan]").attr("colspan",d)}),f.on("destroy.dt.DT_details",function(a,b){if(e===b)for(var c=0,d=g.length;c<d;c++)g[c]._details&&eb(f,c)}))}}};p("row().child()",function(a,b){var c=this.context;if(a===k)return c.length&&this.length?c[0].aoData[this[0]]._details:k;if(!0===a)this.child.show();else if(!1===a)eb(this);else if(c.length&&this.length){var d=c[0],c=c[0].aoData[this[0]],e=[],f=function(a,
b){if(h.isArray(a)||a instanceof h)for(var c=0,k=a.length;c<k;c++)f(a[c],b);else a.nodeName&&"tr"===a.nodeName.toLowerCase()?e.push(a):(c=h("<tr><td/></tr>").addClass(b),h("td",c).addClass(b).html(a)[0].colSpan=ba(d),e.push(c[0]))};f(a,b);c._details&&c._details.detach();c._details=h(e);c._detailsShow&&c._details.insertAfter(c.nTr)}return this});p(["row().child.show()","row().child().show()"],function(){Wb(this,!0);return this});p(["row().child.hide()","row().child().hide()"],function(){Wb(this,!1);
return this});p(["row().child.remove()","row().child().remove()"],function(){eb(this);return this});p("row().child.isShown()",function(){var a=this.context;return a.length&&this.length?a[0].aoData[this[0]]._detailsShow||!1:!1});var fc=/^([^:]+):(name|visIdx|visible)$/,Xb=function(a,b,c,d,e){for(var c=[],d=0,f=e.length;d<f;d++)c.push(B(a,e[d],b));return c};p("columns()",function(a,b){a===k?a="":h.isPlainObject(a)&&(b=a,a="");var b=cb(b),c=this.iterator("table",function(c){var e=a,f=b,g=c.aoColumns,
j=D(g,"sName"),i=D(g,"nTh");return bb("column",e,function(a){var b=Qb(a);if(a==="")return X(g.length);if(b!==null)return[b>=0?b:g.length+b];if(typeof a==="function"){var e=Da(c,f);return h.map(g,function(b,f){return a(f,Xb(c,f,0,0,e),i[f])?f:null})}var k=typeof a==="string"?a.match(fc):"";if(k)switch(k[2]){case "visIdx":case "visible":b=parseInt(k[1],10);if(b<0){var m=h.map(g,function(a,b){return a.bVisible?b:null});return[m[m.length+b]]}return[$(c,b)];case "name":return h.map(j,function(a,b){return a===
k[1]?b:null});default:return[]}if(a.nodeName&&a._DT_CellIndex)return[a._DT_CellIndex.column];b=h(i).filter(a).map(function(){return h.inArray(this,i)}).toArray();if(b.length||!a.nodeName)return b;b=h(a).closest("*[data-dt-column]");return b.length?[b.data("dt-column")]:[]},c,f)},1);c.selector.cols=a;c.selector.opts=b;return c});u("columns().header()","column().header()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTh},1)});u("columns().footer()","column().footer()",
function(){return this.iterator("column",function(a,b){return a.aoColumns[b].nTf},1)});u("columns().data()","column().data()",function(){return this.iterator("column-rows",Xb,1)});u("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(a,b){return a.aoColumns[b].mData},1)});u("columns().cache()","column().cache()",function(a){return this.iterator("column-rows",function(b,c,d,e,f){return ja(b.aoData,f,"search"===a?"_aFilterData":"_aSortData",c)},1)});u("columns().nodes()",
"column().nodes()",function(){return this.iterator("column-rows",function(a,b,c,d,e){return ja(a.aoData,e,"anCells",b)},1)});u("columns().visible()","column().visible()",function(a,b){var c=this.iterator("column",function(b,c){if(a===k)return b.aoColumns[c].bVisible;var f=b.aoColumns,g=f[c],j=b.aoData,i,n,l;if(a!==k&&g.bVisible!==a){if(a){var m=h.inArray(!0,D(f,"bVisible"),c+1);i=0;for(n=j.length;i<n;i++)l=j[i].nTr,f=j[i].anCells,l&&l.insertBefore(f[c],f[m]||null)}else h(D(b.aoData,"anCells",c)).detach();
g.bVisible=a;fa(b,b.aoHeader);fa(b,b.aoFooter);za(b)}});a!==k&&(this.iterator("column",function(c,e){s(c,null,"column-visibility",[c,e,a,b])}),(b===k||b)&&this.columns.adjust());return c});u("columns().indexes()","column().index()",function(a){return this.iterator("column",function(b,c){return"visible"===a?aa(b,c):c},1)});p("columns.adjust()",function(){return this.iterator("table",function(a){Z(a)},1)});p("column.index()",function(a,b){if(0!==this.context.length){var c=this.context[0];if("fromVisible"===
a||"toData"===a)return $(c,b);if("fromData"===a||"toVisible"===a)return aa(c,b)}});p("column()",function(a,b){return db(this.columns(a,b))});p("cells()",function(a,b,c){h.isPlainObject(a)&&(a.row===k?(c=a,a=null):(c=b,b=null));h.isPlainObject(b)&&(c=b,b=null);if(null===b||b===k)return this.iterator("table",function(b){var d=a,e=cb(c),f=b.aoData,g=Da(b,e),j=Tb(ja(f,g,"anCells")),i=h([].concat.apply([],j)),l,n=b.aoColumns.length,m,p,u,t,s,v;return bb("cell",d,function(a){var c=typeof a==="function";
if(a===null||a===k||c){m=[];p=0;for(u=g.length;p<u;p++){l=g[p];for(t=0;t<n;t++){s={row:l,column:t};if(c){v=f[l];a(s,B(b,l,t),v.anCells?v.anCells[t]:null)&&m.push(s)}else m.push(s)}}return m}if(h.isPlainObject(a))return[a];c=i.filter(a).map(function(a,b){return{row:b._DT_CellIndex.row,column:b._DT_CellIndex.column}}).toArray();if(c.length||!a.nodeName)return c;v=h(a).closest("*[data-dt-row]");return v.length?[{row:v.data("dt-row"),column:v.data("dt-column")}]:[]},b,e)});var d=this.columns(b,c),e=this.rows(a,
c),f,g,j,i,n,l=this.iterator("table",function(a,b){f=[];g=0;for(j=e[b].length;g<j;g++){i=0;for(n=d[b].length;i<n;i++)f.push({row:e[b][g],column:d[b][i]})}return f},1);h.extend(l.selector,{cols:b,rows:a,opts:c});return l});u("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(a,b,c){return(a=a.aoData[b])&&a.anCells?a.anCells[c]:k},1)});p("cells().data()",function(){return this.iterator("cell",function(a,b,c){return B(a,b,c)},1)});u("cells().cache()","cell().cache()",function(a){a=
"search"===a?"_aFilterData":"_aSortData";return this.iterator("cell",function(b,c,d){return b.aoData[c][a][d]},1)});u("cells().render()","cell().render()",function(a){return this.iterator("cell",function(b,c,d){return B(b,c,d,a)},1)});u("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(a,b,c){return{row:b,column:c,columnVisible:aa(a,c)}},1)});u("cells().invalidate()","cell().invalidate()",function(a){return this.iterator("cell",function(b,c,d){da(b,c,a,d)})});p("cell()",
function(a,b,c){return db(this.cells(a,b,c))});p("cell().data()",function(a){var b=this.context,c=this[0];if(a===k)return b.length&&c.length?B(b[0],c[0].row,c[0].column):k;lb(b[0],c[0].row,c[0].column,a);da(b[0],c[0].row,"data",c[0].column);return this});p("order()",function(a,b){var c=this.context;if(a===k)return 0!==c.length?c[0].aaSorting:k;"number"===typeof a?a=[[a,b]]:a.length&&!h.isArray(a[0])&&(a=Array.prototype.slice.call(arguments));return this.iterator("table",function(b){b.aaSorting=a.slice()})});
p("order.listener()",function(a,b,c){return this.iterator("table",function(d){Oa(d,a,b,c)})});p("order.fixed()",function(a){if(!a){var b=this.context,b=b.length?b[0].aaSortingFixed:k;return h.isArray(b)?{pre:b}:b}return this.iterator("table",function(b){b.aaSortingFixed=h.extend(!0,{},a)})});p(["columns().order()","column().order()"],function(a){var b=this;return this.iterator("table",function(c,d){var e=[];h.each(b[d],function(b,c){e.push([c,a])});c.aaSorting=e})});p("search()",function(a,b,c,d){var e=
this.context;return a===k?0!==e.length?e[0].oPreviousSearch.sSearch:k:this.iterator("table",function(e){e.oFeatures.bFilter&&ga(e,h.extend({},e.oPreviousSearch,{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?!0:c,bCaseInsensitive:null===d?!0:d}),1)})});u("columns().search()","column().search()",function(a,b,c,d){return this.iterator("column",function(e,f){var g=e.aoPreSearchCols;if(a===k)return g[f].sSearch;e.oFeatures.bFilter&&(h.extend(g[f],{sSearch:a+"",bRegex:null===b?!1:b,bSmart:null===c?
!0:c,bCaseInsensitive:null===d?!0:d}),ga(e,e.oPreviousSearch,1))})});p("state()",function(){return this.context.length?this.context[0].oSavedState:null});p("state.clear()",function(){return this.iterator("table",function(a){a.fnStateSaveCallback.call(a.oInstance,a,{})})});p("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null});p("state.save()",function(){return this.iterator("table",function(a){za(a)})});m.versionCheck=m.fnVersionCheck=function(a){for(var b=m.version.split("."),
a=a.split("."),c,d,e=0,f=a.length;e<f;e++)if(c=parseInt(b[e],10)||0,d=parseInt(a[e],10)||0,c!==d)return c>d;return!0};m.isDataTable=m.fnIsDataTable=function(a){var b=h(a).get(0),c=!1;if(a instanceof m.Api)return!0;h.each(m.settings,function(a,e){var f=e.nScrollHead?h("table",e.nScrollHead)[0]:null,g=e.nScrollFoot?h("table",e.nScrollFoot)[0]:null;if(e.nTable===b||f===b||g===b)c=!0});return c};m.tables=m.fnTables=function(a){var b=!1;h.isPlainObject(a)&&(b=a.api,a=a.visible);var c=h.map(m.settings,
function(b){if(!a||a&&h(b.nTable).is(":visible"))return b.nTable});return b?new t(c):c};m.camelToHungarian=J;p("$()",function(a,b){var c=this.rows(b).nodes(),c=h(c);return h([].concat(c.filter(a).toArray(),c.find(a).toArray()))});h.each(["on","one","off"],function(a,b){p(b+"()",function(){var a=Array.prototype.slice.call(arguments);a[0]=h.map(a[0].split(/\s/),function(a){return!a.match(/\.dt\b/)?a+".dt":a}).join(" ");var d=h(this.tables().nodes());d[b].apply(d,a);return this})});p("clear()",function(){return this.iterator("table",
function(a){pa(a)})});p("settings()",function(){return new t(this.context,this.context)});p("init()",function(){var a=this.context;return a.length?a[0].oInit:null});p("data()",function(){return this.iterator("table",function(a){return D(a.aoData,"_aData")}).flatten()});p("destroy()",function(a){a=a||!1;return this.iterator("table",function(b){var c=b.nTableWrapper.parentNode,d=b.oClasses,e=b.nTable,f=b.nTBody,g=b.nTHead,j=b.nTFoot,i=h(e),f=h(f),k=h(b.nTableWrapper),l=h.map(b.aoData,function(a){return a.nTr}),
p;b.bDestroying=!0;s(b,"aoDestroyCallback","destroy",[b]);a||(new t(b)).columns().visible(!0);k.off(".DT").find(":not(tbody *)").off(".DT");h(E).off(".DT-"+b.sInstance);e!=g.parentNode&&(i.children("thead").detach(),i.append(g));j&&e!=j.parentNode&&(i.children("tfoot").detach(),i.append(j));b.aaSorting=[];b.aaSortingFixed=[];ya(b);h(l).removeClass(b.asStripeClasses.join(" "));h("th, td",g).removeClass(d.sSortable+" "+d.sSortableAsc+" "+d.sSortableDesc+" "+d.sSortableNone);b.bJUI&&(h("th span."+d.sSortIcon+
", td span."+d.sSortIcon,g).detach(),h("th, td",g).each(function(){var a=h("div."+d.sSortJUIWrapper,this);h(this).append(a.contents());a.detach()}));f.children().detach();f.append(l);g=a?"remove":"detach";i[g]();k[g]();!a&&c&&(c.insertBefore(e,b.nTableReinsertBefore),i.css("width",b.sDestroyWidth).removeClass(d.sTable),(p=b.asDestroyStripes.length)&&f.children().each(function(a){h(this).addClass(b.asDestroyStripes[a%p])}));c=h.inArray(b,m.settings);-1!==c&&m.settings.splice(c,1)})});h.each(["column",
"row","cell"],function(a,b){p(b+"s().every()",function(a){var d=this.selector.opts,e=this;return this.iterator(b,function(f,g,h,i,m){a.call(e[b](g,"cell"===b?h:d,"cell"===b?d:k),g,h,i,m)})})});p("i18n()",function(a,b,c){var d=this.context[0],a=R(a)(d.oLanguage);a===k&&(a=b);c!==k&&h.isPlainObject(a)&&(a=a[c]!==k?a[c]:a._);return a.replace("%d",c)});m.version="1.10.15";m.settings=[];m.models={};m.models.oSearch={bCaseInsensitive:!0,sSearch:"",bRegex:!1,bSmart:!0};m.models.oRow={nTr:null,anCells:null,
_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null,idx:-1};m.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null};m.defaults=
{aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bJQueryUI:!1,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(a){try{return JSON.parse((-1===a.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+a.sInstance+"_"+location.pathname))}catch(b){}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(a,b){try{(-1===a.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+a.sInstance+
"_"+location.pathname,JSON.stringify(b))}catch(c){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",
sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:h.extend({},m.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null,rowId:"DT_RowId"};
Y(m.defaults);m.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};Y(m.defaults.column);m.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,
bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1,bBounding:!1,barWidth:0},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aIds:{},aoColumns:[],aoHeader:[],aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],
aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:!0,jqXHR:null,json:k,oAjaxData:k,fnServerData:null,
aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,bJUI:null,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==y(this)?1*this._iRecordsTotal:this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==y(this)?1*this._iRecordsDisplay:this.aiDisplay.length},fnDisplayEnd:function(){var a=
this._iDisplayLength,b=this._iDisplayStart,c=b+a,d=this.aiDisplay.length,e=this.oFeatures,f=e.bPaginate;return e.bServerSide?!1===f||-1===a?b+d:Math.min(b+a,this._iRecordsDisplay):!f||c>d||-1===a?d:c},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{},rowIdFn:null,rowId:null};m.ext=x={buttons:{},classes:{},builder:"-source-",errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},
header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:m.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:m.version};h.extend(x,{afnFiltering:x.search,aTypes:x.type.detect,ofnSearch:x.type.search,oSort:x.type.order,afnSortData:x.order,aoFeatures:x.feature,oApi:x.internal,oStdClasses:x.classes,oPagination:x.pager});h.extend(m.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",
sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",
sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",sJUIHeader:"",sJUIFooter:""});var Ea="",Ea="",G=Ea+"ui-state-default",ka=Ea+"css_right ui-icon ui-icon-",Yb=Ea+"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix";h.extend(m.ext.oJUIClasses,
m.ext.classes,{sPageButton:"fg-button ui-button "+G,sPageButtonActive:"ui-state-disabled",sPageButtonDisabled:"ui-state-disabled",sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",sSortAsc:G+" sorting_asc",sSortDesc:G+" sorting_desc",sSortable:G+" sorting",sSortableAsc:G+" sorting_asc_disabled",sSortableDesc:G+" sorting_desc_disabled",sSortableNone:G+" sorting_disabled",sSortJUIAsc:ka+"triangle-1-n",sSortJUIDesc:ka+"triangle-1-s",sSortJUI:ka+"carat-2-n-s",
sSortJUIAscAllowed:ka+"carat-1-n",sSortJUIDescAllowed:ka+"carat-1-s",sSortJUIWrapper:"DataTables_sort_wrapper",sSortIcon:"DataTables_sort_icon",sScrollHead:"dataTables_scrollHead "+G,sScrollFoot:"dataTables_scrollFoot "+G,sHeaderTH:G,sFooterTH:G,sJUIHeader:Yb+" ui-corner-tl ui-corner-tr",sJUIFooter:Yb+" ui-corner-bl ui-corner-br"});var Nb=m.ext.pager;h.extend(Nb,{simple:function(){return["previous","next"]},full:function(){return["first","previous","next","last"]},numbers:function(a,b){return[ia(a,
b)]},simple_numbers:function(a,b){return["previous",ia(a,b),"next"]},full_numbers:function(a,b){return["first","previous",ia(a,b),"next","last"]},first_last_numbers:function(a,b){return["first",ia(a,b),"last"]},_numbers:ia,numbers_length:7});h.extend(!0,m.ext.renderer,{pageButton:{_:function(a,b,c,d,e,f){var g=a.oClasses,j=a.oLanguage.oPaginate,i=a.oLanguage.oAria.paginate||{},m,l,p=0,r=function(b,d){var k,t,u,s,v=function(b){Va(a,b.data.action,true)};k=0;for(t=d.length;k<t;k++){s=d[k];if(h.isArray(s)){u=
h("<"+(s.DT_el||"div")+"/>").appendTo(b);r(u,s)}else{m=null;l="";switch(s){case "ellipsis":b.append('<span class="ellipsis">&#x2026;</span>');break;case "first":m=j.sFirst;l=s+(e>0?"":" "+g.sPageButtonDisabled);break;case "previous":m=j.sPrevious;l=s+(e>0?"":" "+g.sPageButtonDisabled);break;case "next":m=j.sNext;l=s+(e<f-1?"":" "+g.sPageButtonDisabled);break;case "last":m=j.sLast;l=s+(e<f-1?"":" "+g.sPageButtonDisabled);break;default:m=s+1;l=e===s?g.sPageButtonActive:""}if(m!==null){u=h("<a>",{"class":g.sPageButton+
" "+l,"aria-controls":a.sTableId,"aria-label":i[s],"data-dt-idx":p,tabindex:a.iTabIndex,id:c===0&&typeof s==="string"?a.sTableId+"_"+s:null}).html(m).appendTo(b);Ya(u,{action:s},v);p++}}}},t;try{t=h(b).find(H.activeElement).data("dt-idx")}catch(u){}r(h(b).empty(),d);t!==k&&h(b).find("[data-dt-idx="+t+"]").focus()}}});h.extend(m.ext.type.detect,[function(a,b){var c=b.oLanguage.sDecimal;return ab(a,c)?"num"+c:null},function(a){if(a&&!(a instanceof Date)&&!cc.test(a))return null;var b=Date.parse(a);
return null!==b&&!isNaN(b)||M(a)?"date":null},function(a,b){var c=b.oLanguage.sDecimal;return ab(a,c,!0)?"num-fmt"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Sb(a,c)?"html-num"+c:null},function(a,b){var c=b.oLanguage.sDecimal;return Sb(a,c,!0)?"html-num-fmt"+c:null},function(a){return M(a)||"string"===typeof a&&-1!==a.indexOf("<")?"html":null}]);h.extend(m.ext.type.search,{html:function(a){return M(a)?a:"string"===typeof a?a.replace(Pb," ").replace(Ca,""):""},string:function(a){return M(a)?
a:"string"===typeof a?a.replace(Pb," "):a}});var Ba=function(a,b,c,d){if(0!==a&&(!a||"-"===a))return-Infinity;b&&(a=Rb(a,b));a.replace&&(c&&(a=a.replace(c,"")),d&&(a=a.replace(d,"")));return 1*a};h.extend(x.type.order,{"date-pre":function(a){return Date.parse(a)||-Infinity},"html-pre":function(a){return M(a)?"":a.replace?a.replace(/<.*?>/g,"").toLowerCase():a+""},"string-pre":function(a){return M(a)?"":"string"===typeof a?a.toLowerCase():!a.toString?"":a.toString()},"string-asc":function(a,b){return a<
b?-1:a>b?1:0},"string-desc":function(a,b){return a<b?1:a>b?-1:0}});fb("");h.extend(!0,m.ext.renderer,{header:{_:function(a,b,c,d){h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(c.sSortingClass+" "+d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass)}})},jqueryui:function(a,b,c,d){h("<div/>").addClass(d.sSortJUIWrapper).append(b.contents()).append(h("<span/>").addClass(d.sSortIcon+" "+c.sSortingClassJUI)).appendTo(b);
h(a.nTable).on("order.dt.DT",function(e,f,g,h){if(a===f){e=c.idx;b.removeClass(d.sSortAsc+" "+d.sSortDesc).addClass(h[e]=="asc"?d.sSortAsc:h[e]=="desc"?d.sSortDesc:c.sSortingClass);b.find("span."+d.sSortIcon).removeClass(d.sSortJUIAsc+" "+d.sSortJUIDesc+" "+d.sSortJUI+" "+d.sSortJUIAscAllowed+" "+d.sSortJUIDescAllowed).addClass(h[e]=="asc"?d.sSortJUIAsc:h[e]=="desc"?d.sSortJUIDesc:c.sSortingClassJUI)}})}}});var Zb=function(a){return"string"===typeof a?a.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,
"&quot;"):a};m.render={number:function(a,b,c,d,e){return{display:function(f){if("number"!==typeof f&&"string"!==typeof f)return f;var g=0>f?"-":"",h=parseFloat(f);if(isNaN(h))return Zb(f);h=h.toFixed(c);f=Math.abs(h);h=parseInt(f,10);f=c?b+(f-h).toFixed(c).substring(2):"";return g+(d||"")+h.toString().replace(/\B(?=(\d{3})+(?!\d))/g,a)+f+(e||"")}}},text:function(){return{display:Zb}}};h.extend(m.ext.internal,{_fnExternApiFunc:Ob,_fnBuildAjax:ua,_fnAjaxUpdate:nb,_fnAjaxParameters:wb,_fnAjaxUpdateDraw:xb,
_fnAjaxDataSrc:va,_fnAddColumn:Ga,_fnColumnOptions:la,_fnAdjustColumnSizing:Z,_fnVisibleToColumnIndex:$,_fnColumnIndexToVisible:aa,_fnVisbleColumns:ba,_fnGetColumns:na,_fnColumnTypes:Ia,_fnApplyColumnDefs:kb,_fnHungarianMap:Y,_fnCamelToHungarian:J,_fnLanguageCompat:Fa,_fnBrowserDetect:ib,_fnAddData:N,_fnAddTr:oa,_fnNodeToDataIndex:function(a,b){return b._DT_RowIndex!==k?b._DT_RowIndex:null},_fnNodeToColumnIndex:function(a,b,c){return h.inArray(c,a.aoData[b].anCells)},_fnGetCellData:B,_fnSetCellData:lb,
_fnSplitObjNotation:La,_fnGetObjectDataFn:R,_fnSetObjectDataFn:S,_fnGetDataMaster:Ma,_fnClearTable:pa,_fnDeleteIndex:qa,_fnInvalidate:da,_fnGetRowElements:Ka,_fnCreateTr:Ja,_fnBuildHead:mb,_fnDrawHead:fa,_fnDraw:O,_fnReDraw:T,_fnAddOptionsHtml:pb,_fnDetectHeader:ea,_fnGetUniqueThs:ta,_fnFeatureHtmlFilter:rb,_fnFilterComplete:ga,_fnFilterCustom:Ab,_fnFilterColumn:zb,_fnFilter:yb,_fnFilterCreateSearch:Ra,_fnEscapeRegex:Sa,_fnFilterData:Bb,_fnFeatureHtmlInfo:ub,_fnUpdateInfo:Eb,_fnInfoMacros:Fb,_fnInitialise:ha,
_fnInitComplete:wa,_fnLengthChange:Ta,_fnFeatureHtmlLength:qb,_fnFeatureHtmlPaginate:vb,_fnPageChange:Va,_fnFeatureHtmlProcessing:sb,_fnProcessingDisplay:C,_fnFeatureHtmlTable:tb,_fnScrollDraw:ma,_fnApplyToChildren:I,_fnCalculateColumnWidths:Ha,_fnThrottle:Qa,_fnConvertToWidth:Gb,_fnGetWidestNode:Hb,_fnGetMaxLenString:Ib,_fnStringToCss:v,_fnSortFlatten:W,_fnSort:ob,_fnSortAria:Kb,_fnSortListener:Xa,_fnSortAttachListener:Oa,_fnSortingClasses:ya,_fnSortData:Jb,_fnSaveState:za,_fnLoadState:Lb,_fnSettingsFromNode:Aa,
_fnLog:K,_fnMap:F,_fnBindAction:Ya,_fnCallbackReg:z,_fnCallbackFire:s,_fnLengthOverflow:Ua,_fnRenderer:Pa,_fnDataSource:y,_fnRowAttributes:Na,_fnCalculateEnd:function(){}});h.fn.dataTable=m;m.$=h;h.fn.dataTableSettings=m.settings;h.fn.dataTableExt=m.ext;h.fn.DataTable=function(a){return h(this).dataTable(a).api()};h.each(m,function(a,b){h.fn.DataTable[a]=b});return h.fn.dataTable});
/*!
 DataTables Bootstrap 4 integration
 ©2011-2017 SpryMedia Ltd - datatables.net/license
*/

(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(a){return b(a,window,document)}):"object"===typeof exports?module.exports=function(a,d){a||(a=window);if(!d||!d.fn.dataTable)d=require("datatables.net")(a,d).$;return b(d,a,a.document)}:b(jQuery,window,document)})(function(b,a,d,m){var f=b.fn.dataTable;b.extend(!0,f.defaults,{dom:"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
renderer:"bootstrap"});b.extend(f.ext.classes,{sWrapper:"dataTables_wrapper dt-bootstrap4",sFilterInput:"form-control form-control-sm",sLengthSelect:"custom-select custom-select-sm form-control form-control-sm",sProcessing:"dataTables_processing card",sPageButton:"paginate_button page-item"});f.ext.renderer.pageButton.bootstrap=function(a,h,r,s,j,n){var o=new f.Api(a),t=a.oClasses,k=a.oLanguage.oPaginate,u=a.oLanguage.oAria.paginate||{},e,g,p=0,q=function(d,f){var l,h,i,c,m=function(a){a.preventDefault();
!b(a.currentTarget).hasClass("disabled")&&o.page()!=a.data.action&&o.page(a.data.action).draw("page")};l=0;for(h=f.length;l<h;l++)if(c=f[l],b.isArray(c))q(d,c);else{g=e="";switch(c){case "ellipsis":e="&#x2026;";g="disabled";break;case "first":e=k.sFirst;g=c+(0<j?"":" disabled");break;case "previous":e=k.sPrevious;g=c+(0<j?"":" disabled");break;case "next":e=k.sNext;g=c+(j<n-1?"":" disabled");break;case "last":e=k.sLast;g=c+(j<n-1?"":" disabled");break;default:e=c+1,g=j===c?"active":""}e&&(i=b("<li>",
{"class":t.sPageButton+" "+g,id:0===r&&"string"===typeof c?a.sTableId+"_"+c:null}).append(b("<a>",{href:"#","aria-controls":a.sTableId,"aria-label":u[c],"data-dt-idx":p,tabindex:a.iTabIndex,"class":"page-link"}).html(e)).appendTo(d),a.oApi._fnBindAction(i,{action:c},m),p++)}},i;try{i=b(h).find(d.activeElement).data("dt-idx")}catch(v){}q(b(h).empty().html('<ul class="pagination"/>').children("ul"),s);i!==m&&b(h).find("[data-dt-idx="+i+"]").focus()};return f});
// Peity jQuery plugin version 3.3.0
// (c) 2018 Ben Pickles
//
// http://benpickles.github.io/peity
//
// Released under MIT license.
!function(t,i,e,n){var a=t.fn.peity=function(i,e){return l&&this.each(function(){var n=t(this),h=n.data("_peity");h?(i&&(h.type=i),t.extend(h.opts,e)):(h=new r(n,i,t.extend({},a.defaults[i],n.data("peity"),e)),n.change(function(){h.draw()}).data("_peity",h)),h.draw()}),this},r=function(t,i,e){this.$el=t,this.type=i,this.opts=e},h=r.prototype,s=h.svgElement=function(e,n){return t(i.createElementNS("http://www.w3.org/2000/svg",e)).attr(n)},l="createElementNS"in i&&s("svg",{})[0].createSVGRect;h.draw=function(){var t=this.opts;a.graphers[this.type].call(this,t),t.after&&t.after.call(this,t)},h.fill=function(){var i=this.opts.fill;return t.isFunction(i)?i:function(t,e){return i[e%i.length]}},h.prepare=function(t,i){return this.$svg||this.$el.hide().after(this.$svg=s("svg",{class:"peity"})),this.$svg.empty().data("_peity",this).attr({height:i,width:t})},h.values=function(){return t.map(this.$el.text().split(this.opts.delimiter),function(t){return parseFloat(t)})},a.defaults={},a.graphers={},a.register=function(t,i,e){this.defaults[t]=i,this.graphers[t]=e},a.register("pie",{fill:["#ff9900","#fff4dd","#ffc66e"],radius:8},function(i){if(!i.delimiter){var n=this.$el.text().match(/[^0-9\.]/);i.delimiter=n?n[0]:","}var a=t.map(this.values(),function(t){return t>0?t:0});if("/"==i.delimiter){var r=a[0],h=a[1];a=[r,e.max(0,h-r)]}for(var l=0,p=a.length,o=0;l<p;l++)o+=a[l];o||(p=2,o=1,a=[0,1]);var f=2*i.radius,c=this.prepare(i.width||f,i.height||f),u=c.width()/2,d=c.height()/2,g=e.min(u,d),v=i.innerRadius;"donut"!=this.type||v||(v=.5*g);var m=e.PI,y=this.fill(),w=this.scale=function(t,i){var n=t/o*m*2-m/2;return[i*e.cos(n)+u,i*e.sin(n)+d]},x=0;for(l=0;l<p;l++){var k,$=a[l],j=$/o;if(0!=j){if(1==j)if(v){var A=u-.01,E=d-g,F=d-v;k=s("path",{d:["M",u,E,"A",g,g,0,1,1,A,E,"L",A,F,"A",v,v,0,1,0,u,F].join(" "),"data-value":$})}else k=s("circle",{cx:u,cy:d,"data-value":$,r:g});else{var M=x+$,S=["M"].concat(w(x,g),"A",g,g,0,j>.5?1:0,1,w(M,g),"L");v?S=S.concat(w(M,v),"A",v,v,0,j>.5?1:0,0,w(x,v)):S.push(u,d),x+=$,k=s("path",{d:S.join(" "),"data-value":$})}k.attr("fill",y.call(this,$,l,a)),c.append(k)}}}),a.register("donut",t.extend(!0,{},a.defaults.pie),function(t){a.graphers.pie.call(this,t)}),a.register("line",{delimiter:",",fill:"#c6d9fd",height:16,min:0,stroke:"#4d89f9",strokeWidth:1,width:32},function(t){var i=this.values();1==i.length&&i.push(i[0]);for(var a=e.max.apply(e,t.max==n?i:i.concat(t.max)),r=e.min.apply(e,t.min==n?i:i.concat(t.min)),h=this.prepare(t.width,t.height),l=t.strokeWidth,p=h.width(),o=h.height()-l,f=a-r,c=this.x=function(t){return t*(p/(i.length-1))},u=this.y=function(t){var i=o;return f&&(i-=(t-r)/f*o),i+l/2},d=u(e.max(r,0)),g=[0,d],v=0;v<i.length;v++)g.push(c(v),u(i[v]));g.push(p,d),t.fill&&h.append(s("polygon",{fill:t.fill,points:g.join(" ")})),l&&h.append(s("polyline",{fill:"none",points:g.slice(2,g.length-2).join(" "),stroke:t.stroke,"stroke-width":l,"stroke-linecap":"square"}))}),a.register("bar",{delimiter:",",fill:["#4D89F9"],height:16,min:0,padding:.1,width:32},function(t){for(var i=this.values(),a=e.max.apply(e,t.max==n?i:i.concat(t.max)),r=e.min.apply(e,t.min==n?i:i.concat(t.min)),h=this.prepare(t.width,t.height),l=h.width(),p=h.height(),o=a-r,f=t.padding,c=this.fill(),u=this.x=function(t){return t*l/i.length},d=this.y=function(t){return p-(o?(t-r)/o*p:1)},g=0;g<i.length;g++){var v,m=u(g+f),y=u(g+1-f)-m,w=i[g],x=d(w),k=x,$=x;o?w<0?k=d(e.min(a,0)):$=d(e.max(r,0)):v=1,0==(v=$-k)&&(v=1,a>0&&o&&k--),h.append(s("rect",{"data-value":w,fill:c.call(this,w,g,i),x:m,y:k,width:y,height:v}))}})}(jQuery,document,Math);
!function(t){"use strict";var i=function(){};i.prototype.init=function(){t(".peity-line").each(function(){t(this).peity("line",t(this).data())}),t(".peity-bar").each(function(){t(this).peity("bar",t(this).data())}),t(".peity-pie").each(function(){t(this).peity("pie",t(this).data())}),t(".peity-donut").each(function(){t(this).peity("donut",t(this).data())})},t.PeietyCharts=new i,t.PeietyCharts.Constructor=i}(window.jQuery),function(t){"use strict";window.jQuery.PeietyCharts.init()}();
var options={chart:{height:374,type:"line",shadow:{enabled:!1,color:"#bbb",top:3,left:2,blur:3,opacity:1}},stroke:{width:5,curve:"smooth"},series:[{name:"Likes",data:[4,3,10,9,29,19,22,9,12,7,19,5,13,9,17,2,7,5]}],xaxis:{type:"datetime",categories:["1/11/2000","2/11/2000","3/11/2000","4/11/2000","5/11/2000","6/11/2000","7/11/2000","8/11/2000","9/11/2000","10/11/2000","11/11/2000","12/11/2000","1/11/2001","2/11/2001","3/11/2001","4/11/2001","5/11/2001","6/11/2001"],axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},fill:{type:"gradient",gradient:{shade:"dark",gradientToColors:["#43cea2"],shadeIntensity:1,type:"horizontal",opacityFrom:1,opacityTo:1,stops:[0,100,100,100]}},markers:{size:4,opacity:.9,colors:["#ffbc00"],strokeColor:"#fff",strokeWidth:2,style:"inverted",hover:{size:7}},yaxis:{min:-10,max:40,title:{text:"Engagement"}},grid:{row:{colors:["transparent","transparent"],opacity:.2},borderColor:"#185a9d"},responsive:[{breakpoint:600,options:{chart:{toolbar:{show:!1}},legend:{show:!1}}}]},chart=new ApexCharts(document.querySelector("#apex_line1"),options);chart.render(),$("#datatable").DataTable(),$(".peity-bar").each(function(){$(this).peity("bar",$(this).data())}),$(".peity-donut").each(function(){$(this).peity("donut",$(this).data())}),$(".peity-line").each(function(){$(this).peity("line",$(this).data())});
var options={chart:{height:374,type:"line",shadow:{enabled:!1,color:"#bbb",top:3,left:2,blur:3,opacity:1}},stroke:{width:5,curve:"smooth"},series:[{name:"Likes",data:[4,3,10,9,29,19,22,9,12,7,19,5,13,9,17,2,7,5]}],xaxis:{type:"datetime",categories:["1/11/2000","2/11/2000","3/11/2000","4/11/2000","5/11/2000","6/11/2000","7/11/2000","8/11/2000","9/11/2000","10/11/2000","11/11/2000","12/11/2000","1/11/2001","2/11/2001","3/11/2001","4/11/2001","5/11/2001","6/11/2001"],axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},title:{text:"Social Media",align:"left",style:{fontSize:"16px",color:"#666"}},fill:{type:"gradient",gradient:{shade:"dark",gradientToColors:["#43cea2"],shadeIntensity:1,type:"horizontal",opacityFrom:1,opacityTo:1,stops:[0,100,100,100]}},markers:{size:4,opacity:.9,colors:["#ffbc00"],strokeColor:"#fff",strokeWidth:2,style:"inverted",hover:{size:7}},yaxis:{min:-10,max:40,title:{text:"Engagement"}},grid:{row:{colors:["transparent","transparent"],opacity:.2},borderColor:"#185a9d"},responsive:[{breakpoint:600,options:{chart:{toolbar:{show:!1}},legend:{show:!1}}}]};(chart=new ApexCharts(document.querySelector("#apex_line1"),options)).render();options={chart:{height:380,type:"line",zoom:{enabled:!1},toolbar:{show:!1}},colors:["#f6d365","#0acf97"],dataLabels:{enabled:!0},stroke:{width:[3,3],curve:"smooth"},series:[{name:"High - 2018",data:[28,29,33,36,32,32,33]},{name:"Low - 2018",data:[12,11,14,18,17,13,13]}],title:{text:"Average High & Low Temperature",align:"left"},grid:{row:{colors:["transparent","transparent"],opacity:.2},borderColor:"#f1f3fa"},markers:{style:"inverted",size:6},xaxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul"],axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"},title:{text:"Month"}},yaxis:{title:{text:"Temperature"},min:5,max:40},legend:{position:"top",horizontalAlign:"right",floating:!0,offsetY:-25,offsetX:-5},responsive:[{breakpoint:600,options:{chart:{toolbar:{show:!1}},legend:{show:!1}}}]};(chart=new ApexCharts(document.querySelector("#apex_line2"),options)).render();for(var ts2=14844186e5,dates=[],spikes=[5,-5,3,-3,8,-8],i=0;i<120;i++){var innerArr=[ts2+=864e5,dataSeries[1][i].value];dates.push(innerArr)}options={chart:{type:"area",stacked:!1,height:380,zoom:{enabled:!0}},plotOptions:{line:{curve:"smooth"}},dataLabels:{enabled:!1},stroke:{width:[3]},series:[{name:"XYZ MOTORS",data:dates}],markers:{size:0,style:"full"},colors:["#fa5c7c"],title:{text:"Stock Price Movement",align:"left"},grid:{row:{colors:["transparent","transparent"],opacity:.2},borderColor:"#f1f3fa"},fill:{gradient:{enabled:!0,shadeIntensity:1,inverseColors:!1,opacityFrom:.5,opacityTo:.1,stops:[0,70,80,100]}},yaxis:{min:2e7,max:25e7,labels:{formatter:function(e){return(e/1e6).toFixed(0)}},title:{text:"Price"}},xaxis:{type:"datetime",axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},tooltip:{shared:!1,y:{formatter:function(e){return(e/1e6).toFixed(0)}}},responsive:[{breakpoint:600,options:{chart:{toolbar:{show:!1}},legend:{show:!1}}}]};(chart=new ApexCharts(document.querySelector("#apex_line3"),options)).render();var ts1=13885344e5,ts3=(ts2=13886208e5,13890528e5),dataSet=[[],[],[]];for(i=0;i<12;i++){innerArr=[ts1+=864e5,dataSeries[2][i].value];dataSet[0].push(innerArr)}for(i=0;i<18;i++){innerArr=[ts2+=864e5,dataSeries[1][i].value];dataSet[1].push(innerArr)}for(i=0;i<12;i++){innerArr=[ts3+=864e5,dataSeries[0][i].value];dataSet[2].push(innerArr)}options={chart:{type:"area",stacked:!1,height:350,zoom:{enabled:!1}},plotOptions:{line:{curve:"smooth"}},dataLabels:{enabled:!1},series:[{name:"PRODUCT A",data:dataSet[0]},{name:"PRODUCT B",data:dataSet[1]},{name:"PRODUCT C",data:dataSet[2]}],markers:{size:0,style:"full"},fill:{type:"gradient",gradient:{shadeIntensity:1,inverseColors:!1,opacityFrom:.45,opacityTo:.05,stops:[20,100,100,100]}},yaxis:{labels:{style:{color:"#8e8da4"},offsetX:0,formatter:function(e){return(e/1e6).toFixed(2)}},axisBorder:{show:!1},axisTicks:{show:!1}},xaxis:{type:"datetime",tickAmount:8,min:new Date("01/01/2014").getTime(),max:new Date("01/20/2014").getTime(),labels:{rotate:-15,rotateAlways:!0,formatter:function(e,t){return moment(new Date(t)).format("DD MMM YYYY")}},axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},title:{text:"Irregular Data in Time Series",align:"left",offsetX:14},colors:["#f93b7a","#00bcd4","#fbb624"],tooltip:{shared:!0},legend:{position:"top",horizontalAlign:"right",offsetX:-10}};(chart=new ApexCharts(document.querySelector("#apex_area1"),options)).render(),$(document).ready(function(){var e={annotations:{yaxis:[{y:30,borderColor:"#999",label:{show:!0,text:"Support",style:{color:"#fff",background:"#00E396"}}}],xaxis:[{x:new Date("14 Nov 2012").getTime(),borderColor:"#999",yAxisIndex:0,label:{show:!0,text:"Rally",style:{color:"#fff",background:"#775DD0"}}}]},chart:{type:"area",height:350},dataLabels:{enabled:!1},series:[{data:[[13273596e5,30.95],[1327446e6,31.34],[13275324e5,31.18],[13276188e5,31.05],[1327878e6,31],[13279644e5,30.95],[13280508e5,31.24],[13281372e5,31.29],[13282236e5,31.85],[13284828e5,31.86],[13285692e5,32.28],[13286556e5,32.1],[1328742e6,32.65],[13288284e5,32.21],[13290876e5,32.35],[1329174e6,32.44],[13292604e5,32.46],[13293468e5,32.86],[13294332e5,32.75],[13297788e5,32.54],[13298652e5,32.33],[13299516e5,32.97],[1330038e6,33.41],[13302972e5,33.27],[13303836e5,33.27],[133047e7,32.89],[13305564e5,33.1],[13306428e5,33.73],[1330902e6,33.22],[13309884e5,31.99],[13310748e5,32.41],[13311612e5,33.05],[13312476e5,33.64],[13315068e5,33.56],[13315932e5,34.22],[13316796e5,33.77],[1331766e6,34.17],[13318524e5,33.82],[13321116e5,34.51],[1332198e6,33.16],[13322844e5,33.56],[13323708e5,33.71],[13324572e5,33.81],[13327128e5,34.4],[13327992e5,34.63],[13328856e5,34.46],[1332972e6,34.48],[13330584e5,34.31],[13333176e5,34.7],[1333404e6,34.31],[13334904e5,33.46],[13335768e5,33.59],[13339224e5,33.22],[13340088e5,32.61],[13340952e5,33.01],[13341816e5,33.55],[1334268e6,33.18],[13345272e5,32.84],[13346136e5,33.84],[13347e8,33.39],[13347864e5,32.91],[13348728e5,33.06],[1335132e6,32.62],[13352184e5,32.4],[13353048e5,33.13],[13353912e5,33.26],[13354776e5,33.58],[13357368e5,33.55],[13358232e5,33.77],[13359096e5,33.76],[1335996e6,33.32],[13360824e5,32.61],[13363416e5,32.52],[1336428e6,32.67],[13365144e5,32.52],[13366008e5,31.92],[13366872e5,32.2],[13369464e5,32.23],[13370328e5,32.33],[13371192e5,32.36],[13372056e5,32.01],[1337292e6,31.31],[13375512e5,32.01],[13376376e5,32.01],[1337724e6,32.18],[13378104e5,31.54],[13378968e5,31.6],[13382424e5,32.05],[13383288e5,31.29],[13384152e5,31.05],[13385016e5,29.82],[13387608e5,30.31],[13388472e5,30.7],[13389336e5,31.69],[133902e7,31.32],[13391064e5,31.65],[13393656e5,31.13],[1339452e6,31.77],[13395384e5,31.79],[13396248e5,31.67],[13397112e5,32.39],[13399704e5,32.63],[13400568e5,32.89],[13401432e5,31.99],[13402296e5,31.23],[1340316e6,31.57],[13405752e5,30.84],[13406616e5,31.07],[1340748e6,31.41],[13408344e5,31.17],[13409208e5,32.37],[134118e7,32.19],[13412664e5,32.51],[13414392e5,32.53],[13415256e5,31.37],[13417848e5,30.43],[13418712e5,30.44],[13419576e5,30.2],[1342044e6,30.14],[13421304e5,30.65],[13423896e5,30.4],[1342476e6,30.65],[13425624e5,31.43],[13426488e5,31.89],[13427352e5,31.38],[13429944e5,30.64],[13430808e5,30.02],[13431672e5,30.33],[13432536e5,30.95],[134334e7,31.89],[13435992e5,31.01],[13436856e5,30.88],[1343772e6,30.69],[13438584e5,30.58],[13439448e5,32.02],[1344204e6,32.14],[13442904e5,32.37],[13443768e5,32.51],[13444632e5,32.65],[13445496e5,32.64],[13448088e5,32.27],[13448952e5,32.1],[13449816e5,32.91],[1345068e6,33.65],[13451544e5,33.8],[13454136e5,33.92],[13455e8,33.75],[13455864e5,33.84],[13456728e5,33.5],[13457592e5,32.26],[13460184e5,32.32],[13461048e5,32.06],[13461912e5,31.96],[13462776e5,31.46],[1346364e6,31.27],[13467096e5,31.43],[1346796e6,32.26],[13468824e5,32.79],[13469688e5,32.46],[1347228e6,32.13],[13473144e5,32.43],[13474008e5,32.42],[13474872e5,32.81],[13475736e5,33.34],[13478328e5,33.41],[13479192e5,32.57],[13480056e5,33.12],[1348092e6,34.53],[13481784e5,33.83],[13484376e5,33.41],[1348524e6,32.9],[13486104e5,32.53],[13486968e5,32.8],[13487832e5,32.44],[13490424e5,32.62],[13491288e5,32.57],[13492152e5,32.6],[13493016e5,32.68],[1349388e6,32.47],[13496472e5,32.23],[13497336e5,31.68],[134982e7,31.51],[13499064e5,31.78],[13499928e5,31.94],[1350252e6,32.33],[13503384e5,33.24],[13504248e5,33.44],[13505112e5,33.48],[13505976e5,33.24],[13508568e5,33.49],[13509432e5,33.31],[13510296e5,33.36],[1351116e6,33.4],[13512024e5,34.01],[1351638e6,34.02],[13517244e5,34.36],[13518108e5,34.39],[135207e7,34.24],[13521564e5,34.39],[13522428e5,33.47],[13523292e5,32.98],[13524156e5,32.9],[13526748e5,32.7],[13527612e5,32.54],[13528476e5,32.23],[1352934e6,32.64],[13530204e5,32.65],[13532796e5,32.92],[1353366e6,32.64],[13534524e5,32.84],[13536252e5,33.4],[13538844e5,33.3],[13539708e5,33.18],[13540572e5,33.88],[13541436e5,34.09],[135423e7,34.61],[13544892e5,34.7],[13545756e5,35.3],[1354662e6,35.4],[13547484e5,35.14],[13548348e5,35.48],[1355094e6,35.75],[13551804e5,35.54],[13552668e5,35.96],[13553532e5,35.53],[13554396e5,37.56],[13556988e5,37.42],[13557852e5,37.49],[13558716e5,38.09],[1355958e6,37.87],[13560444e5,37.71],[13563036e5,37.53],[13564764e5,37.55],[13565628e5,37.3],[13566492e5,36.9],[13569084e5,37.68],[13570812e5,38.34],[13571676e5,37.75],[1357254e6,38.13],[13575132e5,37.94],[13575996e5,38.14],[1357686e6,38.66],[13577724e5,38.62],[13578588e5,38.09],[1358118e6,38.16],[13582044e5,38.15],[13582908e5,37.88],[13583772e5,37.73],[13584636e5,37.98],[13588092e5,37.95],[13588956e5,38.25],[1358982e6,38.1],[13590684e5,38.32],[13593276e5,38.24],[1359414e6,38.52],[13595004e5,37.94],[13595868e5,37.83],[13596732e5,38.34],[13599324e5,38.1],[13600188e5,38.51],[13601052e5,38.4],[13601916e5,38.07],[1360278e6,39.12],[13605372e5,38.64],[13606236e5,38.89],[136071e7,38.81],[13607964e5,38.61],[13608828e5,38.63],[13612284e5,38.99],[13613148e5,38.77],[13614012e5,38.34],[13614876e5,38.55],[13617468e5,38.11],[13618332e5,38.59],[13619196e5,39.6]]}],markers:{size:0,style:"hollow"},xaxis:{type:"datetime",min:new Date("01 Mar 2012").getTime(),tickAmount:6,axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},colors:["#dfa579"],tooltip:{x:{format:"dd MMM yyyy"}},fill:{type:"gradient",gradient:{shadeIntensity:1,opacityFrom:.7,opacityTo:.9,stops:[0,100]}}},t=new ApexCharts(document.querySelector("#apex_area2"),e);t.render();var a=function(e){var t=document.querySelectorAll("button");Array.prototype.forEach.call(t,function(e){e.classList.remove("active")}),e.target.classList.add("active")};document.querySelector("#one_month").addEventListener("click",function(e){a(e),t.updateOptions({xaxis:{min:new Date("28 Jan 2013").getTime(),max:new Date("27 Feb 2013").getTime()}})}),document.querySelector("#six_months").addEventListener("click",function(e){a(e),t.updateOptions({xaxis:{min:new Date("27 Sep 2012").getTime(),max:new Date("27 Feb 2013").getTime()}})}),document.querySelector("#one_year").addEventListener("click",function(e){a(e),t.updateOptions({xaxis:{min:new Date("27 Feb 2012").getTime(),max:new Date("27 Feb 2013").getTime()}})}),document.querySelector("#ytd").addEventListener("click",function(e){a(e),t.updateOptions({xaxis:{min:new Date("01 Jan 2013").getTime(),max:new Date("27 Feb 2013").getTime()}})}),document.querySelector("#all").addEventListener("click",function(e){a(e),t.updateOptions({xaxis:{min:void 0,max:void 0}})}),document.querySelector("#ytd").addEventListener("click",function(){})});options={chart:{height:396,type:"bar",toolbar:{show:!1}},plotOptions:{bar:{horizontal:!1,endingShape:"rounded",columnWidth:"55%"}},dataLabels:{enabled:!1},stroke:{show:!0,width:2,colors:["transparent"]},colors:["#5766da","#1ecab8","#fbb624"],series:[{name:"Net Profit",data:[44,55,57,56,61,58,63,60,66]},{name:"Revenue",data:[76,85,101,98,87,105,91,114,94]},{name:"Free Cash Flow",data:[35,41,36,26,45,48,52,53,41]}],xaxis:{categories:["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"],axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},legend:{offsetY:-10},yaxis:{title:{text:"$ (thousands)"}},fill:{opacity:1},grid:{row:{colors:["transparent","transparent"],opacity:.2},borderColor:"#f1f3fa"},tooltip:{y:{formatter:function(e){return"$ "+e+" thousands"}}}};(chart=new ApexCharts(document.querySelector("#apex_column1"),options)).render();options={chart:{height:380,type:"bar",toolbar:{show:!1}},plotOptions:{bar:{dataLabels:{position:"top"}}},dataLabels:{enabled:!0,formatter:function(e){return e+"%"},offsetY:-20,style:{fontSize:"12px",colors:["#304758"]}},colors:["#4facfe"],series:[{name:"Inflation",data:[2.3,3.1,4,10.1,4,3.6,3.2,2.3,1.4,.8,.5,.2]}],xaxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],position:"top",labels:{offsetY:-18},axisBorder:{show:!1},axisTicks:{show:!1},crosshairs:{fill:{type:"gradient",gradient:{colorFrom:"#D8E3F0",colorTo:"#BED1E6",stops:[0,100],opacityFrom:.4,opacityTo:.5}}},tooltip:{enabled:!0,offsetY:-35}},fill:{gradient:{enabled:!1,shade:"light",type:"horizontal",shadeIntensity:.25,gradientToColors:void 0,inverseColors:!0,opacityFrom:1,opacityTo:1,stops:[50,0,100,100]}},yaxis:{axisBorder:{show:!1},axisTicks:{show:!1},labels:{show:!1,formatter:function(e){return e+"%"}}},title:{text:"Monthly Inflation in Argentina, 2002",floating:!0,offsetY:350,align:"center",style:{color:"#444"}},grid:{row:{colors:["#f1f3fa","transparent"],opacity:.2},borderColor:"#f1f3fa"}};(chart=new ApexCharts(document.querySelector("#apex_column2"),options)).render();options={chart:{height:380,type:"bar",toolbar:{show:!1}},plotOptions:{bar:{horizontal:!0}},dataLabels:{enabled:!1},series:[{data:[400,430,448,470,540,580,690,1100,1200,1380]}],colors:["#95a6bf"],yaxis:{axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},xaxis:{categories:["South Korea","Canada","United Kingdom","Netherlands","Italy","France","Japan","United States","China","Germany"]},states:{hover:{filter:"none"}},grid:{borderColor:"#f1f3fa"}};(chart=new ApexCharts(document.querySelector("#apex_bar1"),options)).render();options={chart:{height:380,type:"bar",stacked:!0,toolbar:{show:!1}},colors:["#ffab96","#185a9d"],plotOptions:{bar:{horizontal:!0,barHeight:"80%"}},dataLabels:{enabled:!1},stroke:{width:1,colors:["#fff"]},series:[{name:"Males",data:[.4,.65,.76,.88,1.5,2.1,2.9,3.8,3.9,4.2,4,4.3,4.1,4.2,4.5,3.9,3.5,3]},{name:"Females",data:[-.8,-1.05,-1.06,-1.18,-1.4,-2.2,-2.85,-3.7,-3.96,-4.22,-4.3,-4.4,-4.1,-4,-4.1,-3.4,-3.1,-2.8]}],grid:{xaxis:{showLines:!1}},yaxis:{min:-5,max:5,title:{},axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},tooltip:{shared:!1,x:{formatter:function(e){return e}},y:{formatter:function(e){return Math.abs(e)+"%"}}},xaxis:{categories:["85+","80-84","75-79","70-74","65-69","60-64","55-59","50-54","45-49","40-44","35-39","30-34","25-29","20-24","15-19","10-14","5-9","0-4"],title:{text:"Percent"},labels:{formatter:function(e){return Math.abs(Math.round(e))+"%"}}},legend:{offsetY:-10},grid:{borderColor:"#f1f3fa"}};(chart=new ApexCharts(document.querySelector("#apex_bar2"),options)).render();options={chart:{height:380,type:"line",stacked:!1,toolbar:{show:!1}},stroke:{width:[0,2,4],curve:"smooth"},plotOptions:{bar:{columnWidth:"50%"}},colors:["#1ecab8","#fbb624","#f93b7a"],series:[{name:"Team A",type:"column",data:[23,11,22,27,13,22,37,21,44,22,30]},{name:"Team B",type:"area",data:[44,55,41,67,22,43,21,41,56,27,43]},{name:"Team C",type:"line",data:[30,25,36,30,45,35,64,52,59,36,39]}],fill:{opacity:[.85,.25,1],gradient:{inverseColors:!1,shade:"light",type:"vertical",opacityFrom:.85,opacityTo:.55,stops:[0,100,100,100]}},labels:["01/01/2003","02/01/2003","03/01/2003","04/01/2003","05/01/2003","06/01/2003","07/01/2003","08/01/2003","09/01/2003","10/01/2003","11/01/2003"],markers:{size:0},legend:{offsetY:-10},xaxis:{type:"datetime",axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},yaxis:{title:{text:"Points"}},tooltip:{shared:!0,intersect:!1,y:{formatter:function(e){return void 0!==e?e.toFixed(0)+" points":e}}},grid:{borderColor:"#f1f3fa"}};(chart=new ApexCharts(document.querySelector("#apex_mixed1"),options)).render();options={chart:{height:380,type:"line",stacked:!1,toolbar:{show:!1}},dataLabels:{enabled:!1},stroke:{width:[0,0,3]},series:[{name:"Income",type:"column",data:[1.4,2,2.5,1.5,2.5,2.8,3.8,4.6]},{name:"Cashflow",type:"column",data:[1.1,3,3.1,4,4.1,4.9,6.5,8.5]},{name:"Revenue",type:"line",data:[20,29,37,36,44,45,50,58]}],colors:["#20016c","#77d0ba","#fa5c7c"],xaxis:{categories:[2009,2010,2011,2012,2013,2014,2015,2016],axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},yaxis:[{axisTicks:{show:!0},axisBorder:{show:!0,color:"#20016c"},labels:{style:{color:"#20016c"}},title:{text:"Income (thousand crores)"}},{axisTicks:{show:!0},axisBorder:{show:!0,color:"#77d0ba"},labels:{style:{color:"#77d0ba"},offsetX:10},title:{text:"Operating Cashflow (thousand crores)"}},{opposite:!0,axisTicks:{show:!0},axisBorder:{show:!0,color:"#fa5c7c"},labels:{style:{color:"#fa5c7c"}},title:{text:"Revenue (thousand crores)"}}],tooltip:{followCursor:!0,y:{formatter:function(e){return void 0!==e?e+" thousand crores":e}}},grid:{borderColor:"#f1f3fa"},legend:{offsetY:-10},responsive:[{breakpoint:600,options:{yaxis:{show:!1},legend:{show:!1}}}]};(chart=new ApexCharts(document.querySelector("#apex_mixed2"),options)).render();options={chart:{height:380,type:"line",toolbar:{show:!1}},stroke:{curve:"smooth",width:2},series:[{name:"Team A",type:"area",data:[3,25,5,10,22,12,5,3,27,10,5,22,12,5]},{name:"Team B",type:"line",data:[8,33,10,15,30,17,10,8,35,15,10,27,17,10]}],fill:{type:"solid",opacity:[.35,1]},labels:["Dec 01","Dec 02","Dec 03","Dec 04","Dec 05","Dec 06","Dec 07","Dec 08","Dec 09 ","Dec 10","Dec 11"],markers:{size:0},legend:{offsetY:-10},colors:["#30a6d3","#f7cda0"],xaxis:{axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},yaxis:[{title:{text:"Series A"}},{opposite:!0,title:{text:"Series B"}}],tooltip:{shared:!0,intersect:!1,y:{formatter:function(e){return void 0!==e?e.toFixed(0)+" points":e}}},grid:{borderColor:"#f1f3fa"},responsive:[{breakpoint:600,options:{yaxis:{show:!1},legend:{show:!1}}}]};function generateData(e,t,a){for(var o=0,r=[];o<t;){var i=Math.floor(750*Math.random())+1,s=Math.floor(Math.random()*(a.max-a.min+1))+a.min,n=Math.floor(61*Math.random())+15;r.push([i,s,n]),864e5,o++}return r}(chart=new ApexCharts(document.querySelector("#apex_mixed3"),options)).render();options={chart:{height:380,type:"bubble",toolbar:{show:!1}},dataLabels:{enabled:!1},series:[{name:"Bubble 1",data:generateData(new Date("11 Feb 2017 GMT").getTime(),20,{min:10,max:60})},{name:"Bubble 2",data:generateData(new Date("11 Feb 2017 GMT").getTime(),20,{min:10,max:60})},{name:"Bubble 3",data:generateData(new Date("11 Feb 2017 GMT").getTime(),20,{min:10,max:60})}],fill:{opacity:.8,gradient:{enabled:!1}},colors:["#e1a52e","#01ae9a","#bbc46a"],xaxis:{tickAmount:12,type:"category",axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},yaxis:{max:70},grid:{borderColor:"#f1f3fa"},legend:{offsetY:-10}};function generateData1(e,t,a){for(var o=0,r=[];o<t;){var i=Math.floor(Math.random()*(a.max-a.min+1))+a.min,s=Math.floor(61*Math.random())+15;r.push([e,i,s]),e+=864e5,o++}return r}(chart=new ApexCharts(document.querySelector("#apex_bubble1"),options)).render();var options2={chart:{height:380,type:"bubble",toolbar:{show:!1}},dataLabels:{enabled:!1},series:[{name:"Product 1",data:generateData1(new Date("11 Feb 2017 GMT").getTime(),20,{min:10,max:60})},{name:"Product 2",data:generateData1(new Date("11 Feb 2017 GMT").getTime(),20,{min:10,max:60})},{name:"Product 3",data:generateData1(new Date("11 Feb 2017 GMT").getTime(),20,{min:10,max:60})},{name:"Product 4",data:generateData1(new Date("11 Feb 2017 GMT").getTime(),20,{min:10,max:60})}],fill:{type:"gradient"},colors:["#727cf5","#0acf97","#fa5c7c","#39afd1"],xaxis:{tickAmount:12,type:"datetime",labels:{rotate:0},axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},yaxis:{max:70},legend:{offsetY:-10},grid:{borderColor:"#f1f3fa"}};(chart=new ApexCharts(document.querySelector("#apex_bubble2"),options2)).render();options={chart:{height:380,type:"scatter",zoom:{enabled:!1}},series:[{name:"Sample A",data:[[16.4,5.4],[21.7,2],[25.4,3],[19,2],[10.9,1],[13.6,3.2],[10.9,7.4],[10.9,0],[10.9,8.2],[16.4,0],[16.4,1.8],[13.6,.3],[13.6,0],[29.9,0],[27.1,2.3],[16.4,0],[13.6,3.7],[10.9,5.2],[16.4,6.5],[10.9,0],[24.5,7.1],[10.9,0],[8.1,4.7],[19,0],[21.7,1.8],[27.1,0],[24.5,0],[27.1,0],[29.9,1.5],[27.1,.8],[22.1,2]]},{name:"Sample B",data:[[6.4,13.4],[1.7,11],[5.4,8],[9,17],[1.9,4],[3.6,12.2],[1.9,14.4],[1.9,9],[1.9,13.2],[1.4,7],[6.4,8.8],[3.6,4.3],[1.6,10],[9.9,2],[7.1,15],[1.4,0],[3.6,13.7],[1.9,15.2],[6.4,16.5],[.9,10],[4.5,17.1],[10.9,10],[.1,14.7],[9,10],[12.7,11.8],[2.1,10],[2.5,10],[27.1,10],[2.9,11.5],[7.1,10.8],[2.1,12]]},{name:"Sample C",data:[[21.7,3],[23.6,3.5],[24.6,3],[29.9,3],[21.7,20],[23,2],[10.9,3],[28,4],[27.1,.3],[16.4,4],[13.6,0],[19,5],[22.4,3],[24.5,3],[32.6,3],[27.1,4],[29.6,6],[31.6,8],[21.6,5],[20.9,4],[22.4,0],[32.6,10.3],[29.7,20.8],[24.5,.8],[21.4,0],[21.7,6.9],[28.6,7.7],[15.4,0],[18.1,0],[33.4,0],[16.4,0]]}],xaxis:{tickAmount:10,axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},yaxis:{tickAmount:7},colors:["#727cf5","#0acf97","#fa5c7c"],grid:{borderColor:"#f1f3fa"},legend:{offsetY:-10},responsive:[{breakpoint:600,options:{chart:{toolbar:{show:!1}},legend:{show:!1}}}]};(chart=new ApexCharts(document.querySelector("#apex_scatter1"),options)).render();options={chart:{height:380,type:"scatter",zoom:{type:"xy"}},series:[{name:"Team 1",data:generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(),20,{min:10,max:60})},{name:"Team 2",data:generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(),20,{min:10,max:60})},{name:"Team 3",data:generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(),30,{min:10,max:60})},{name:"Team 4",data:generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(),10,{min:10,max:60})},{name:"Team 5",data:generateDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(),30,{min:10,max:60})}],dataLabels:{enabled:!1},colors:["#39afd1","#0acf97","#e3eaef","#6c757d","#ffbc00"],grid:{borderColor:"#f1f3fa",xaxis:{showLines:!0},yaxis:{showLines:!0}},legend:{offsetY:-10},xaxis:{type:"datetime",axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},yaxis:{max:70},responsive:[{breakpoint:600,options:{chart:{toolbar:{show:!1}},legend:{show:!1}}}]};function generateDayWiseTimeSeries(e,t,a){for(var o=0,r=[];o<t;){var i=Math.floor(Math.random()*(a.max-a.min+1))+a.min;r.push([e,i]),e+=864e5,o++}return r}(chart=new ApexCharts(document.querySelector("#apex_scatter2"),options)).render();options={chart:{height:400,type:"candlestick"},plotOptions:{candlestick:{colors:{upward:"#4e7e9b",downward:"#e4b1c5"}}},series:[{data:seriesData}],stroke:{show:!0,colors:"#f1f3fa",width:[1,4]},xaxis:{type:"datetime",axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},grid:{borderColor:"#f1f3fa"}};(chart=new ApexCharts(document.querySelector("#apex_candlestick1"),options)).render();var optionsCandlestick={chart:{height:240,type:"candlestick",toolbar:{show:!1},zoom:{enabled:!1}},series:[{data:seriesData}],plotOptions:{candlestick:{colors:{upward:"#99b9c9",downward:"#b7a96f"}}},xaxis:{type:"datetime",axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},grid:{borderColor:"#f1f3fa"}},chartCandlestick=new ApexCharts(document.querySelector("#apex_candlestick2"),optionsCandlestick);chartCandlestick.render();options={chart:{height:160,type:"bar",toolbar:{show:!1,autoSelected:"selection"},selection:{xaxis:{min:new Date("20 Jan 2017").getTime(),max:new Date("10 Dec 2017").getTime()},fill:{color:"#6c757d",opacity:.4},stroke:{color:"#6c757d"}},events:{selection:function(e,t){chartCandlestick.updateOptions({xaxis:{min:t.xaxis.min,max:t.xaxis.max}},!1,!1)}}},dataLabels:{enabled:!1},plotOptions:{bar:{columnWidth:"80%",colors:{ranges:[{from:-1e3,to:0,color:"#ee6c62"},{from:1,to:1e4,color:"#08aeb0"}]}}},series:[{name:"volume",data:seriesDataLinear}],xaxis:{type:"datetime",axisBorder:{offsetX:13},axisBorder:{show:!0,color:"#bec7e0"},axisTicks:{show:!0,color:"#bec7e0"}},yaxis:{labels:{show:!1}},grid:{borderColor:"#f1f3fa"}};(chart=new ApexCharts(document.querySelector("#apex_candlestick3"),options)).render();options={chart:{height:320,type:"pie"},series:[44,55,41,17,15],labels:["Series 1","Series 2","Series 3","Series 4","Series 5"],colors:["#a3cae0","#232f5b","#f06a6c","#f1e299","#08aeb0"],legend:{show:!0,position:"bottom",horizontalAlign:"center",verticalAlign:"middle",floating:!1,fontSize:"14px",offsetX:0,offsetY:-10},responsive:[{breakpoint:600,options:{chart:{height:240},legend:{show:!1}}}]};(chart=new ApexCharts(document.querySelector("#apex_pie1"),options)).render();options={chart:{height:320,type:"donut"},series:[44,55,41,17,15],legend:{show:!0,position:"bottom",horizontalAlign:"center",verticalAlign:"middle",floating:!1,fontSize:"14px",offsetX:0,offsetY:-10},labels:["Series 1","Series 2","Series 3","Series 4","Series 5"],colors:["#a3cae0","#232f5b","#f06a6c","#f1e299","#08aeb0"],responsive:[{breakpoint:600,options:{chart:{height:240},legend:{show:!1}}}],fill:{type:"gradient"}};(chart=new ApexCharts(document.querySelector("#apex_pie2"),options)).render();options={chart:{height:320,type:"donut",dropShadow:{enabled:!0,color:"#111",top:-1,left:3,blur:3,opacity:.2}},stroke:{show:!0,width:2},series:[44,55,41,17,15],colors:["#a3cae0","#232f5b","#f06a6c","#f1e299","#08aeb0"],labels:["Comedy","Action","SciFi","Drama","Horror"],dataLabels:{dropShadow:{blur:3,opacity:.8}},fill:{type:"pattern",opacity:1,pattern:{enabled:!0,style:["verticalLines","squares","horizontalLines","circles","slantedLines"]}},states:{hover:{enabled:!1}},legend:{show:!0,position:"bottom",horizontalAlign:"center",verticalAlign:"middle",floating:!1,fontSize:"14px",offsetX:0,offsetY:-10},responsive:[{breakpoint:600,options:{chart:{height:240},legend:{show:!1}}}]};(chart=new ApexCharts(document.querySelector("#apex_pie3"),options)).render();options={chart:{height:320,type:"pie"},labels:["Series 1","Series 2","Series 3","Series 4"],colors:["#39afd1","#ffbc00","#727cf5","#0acf97"],series:[44,33,54,45],fill:{type:"image",opacity:.85,image:{src:["../assets/images/small/img-1.jpg","../assets/images/small/img-2.jpg","../assets/images/small/img-3.jpg","../assets/images/small/img-4.jpg"],width:25,imagedHeight:25}},stroke:{width:4},dataLabels:{enabled:!1},legend:{show:!0,position:"bottom",horizontalAlign:"center",verticalAlign:"middle",floating:!1,fontSize:"14px",offsetX:0,offsetY:-10},responsive:[{breakpoint:600,options:{chart:{height:240},legend:{show:!1}}}]};(chart=new ApexCharts(document.querySelector("#apex_pie4"),options)).render();options={chart:{height:320,type:"radialBar"},plotOptions:{radialBar:{hollow:{size:"70%"}}},colors:["#68823f"],series:[70],labels:["CRICKET"]};(chart=new ApexCharts(document.querySelector("#apex_radialbar1"),options)).render();options={chart:{height:350,type:"radialBar"},plotOptions:{radialBar:{dataLabels:{name:{fontSize:"22px"},value:{fontSize:"16px"},total:{show:!0,label:"Total",formatter:function(e){return 249}}}}},series:[44,55,67,83],labels:["Apples","Oranges","Bananas","Berries"]};(chart=new ApexCharts(document.querySelector("#apex_radialbar2"),options)).render();options={chart:{height:380,type:"radialBar"},plotOptions:{radialBar:{startAngle:-135,endAngle:135,dataLabels:{name:{fontSize:"16px",color:void 0,offsetY:120},value:{offsetY:76,fontSize:"22px",color:void 0,formatter:function(e){return e+"%"}}}}},fill:{gradient:{enabled:!0,shade:"dark",shadeIntensity:.15,inverseColors:!1,opacityFrom:1,opacityTo:1,stops:[0,50,65,91]}},stroke:{dashArray:4},colors:["#727cf5"],series:[67],labels:["Median Ratio"],responsive:[{breakpoint:380,options:{chart:{height:280}}}]};(chart=new ApexCharts(document.querySelector("#apex_radialbar3"),options)).render();var chart;options={chart:{height:380,type:"radialBar",toolbar:{show:!0}},plotOptions:{radialBar:{startAngle:-135,endAngle:225,hollow:{margin:0,size:"70%",background:"#fff",image:void 0,imageOffsetX:0,imageOffsetY:0,position:"front",dropShadow:{enabled:!0,top:3,left:0,blur:4,opacity:.24}},track:{background:"#fff",strokeWidth:"67%",margin:0,dropShadow:{enabled:!0,top:-3,left:0,blur:4,opacity:.35}},dataLabels:{showOn:"always",name:{offsetY:-10,show:!0,color:"#888",fontSize:"17px"},value:{formatter:function(e){return parseInt(e)},color:"#111",fontSize:"36px",show:!0}}}},fill:{type:"gradient",gradient:{shade:"dark",type:"horizontal",shadeIntensity:.5,gradientToColors:["#cba280","#2c3e50"],inverseColors:!0,opacityFrom:1,opacityTo:1,stops:[0,100]}},series:[75],stroke:{lineCap:"round"},labels:["Percent"]};(chart=new ApexCharts(document.querySelector("#apex_radialbar4"),options)).render(),Apex.grid={padding:{right:0,left:0}},Apex.dataLabels={enabled:!1};var randomizeArray=function(e){for(var t,a,o=e.slice(),r=o.length;0!==r;)a=Math.floor(Math.random()*r),t=o[r-=1],o[r]=o[a],o[a]=t;return o},sparklineData=[47,45,54,38,56,24,65,31,37,39,62,51,35,41,35,27,93,53,61,27,54,43,19,46],colorPalette=["#00D8B6","#008FFB","#FEB019","#FF4560","#775DD0"],spark1={chart:{type:"area",height:160,sparkline:{enabled:!0}},stroke:{width:2,curve:"straight"},fill:{opacity:.2},series:[{name:"Frogetor Sales ",data:randomizeArray(sparklineData)}],yaxis:{min:0},colors:["#f93b7a"],title:{text:"$424,652",offsetX:20,style:{fontSize:"24px"}},subtitle:{text:"Sales",offsetX:20,style:{fontSize:"14px"}}};new ApexCharts(document.querySelector("#spark1"),spark1).render();var spark2={chart:{type:"area",height:160,sparkline:{enabled:!0}},stroke:{width:2,curve:"straight"},fill:{opacity:.2},series:[{name:"Frogetor Expenses ",data:randomizeArray(sparklineData)}],yaxis:{min:0},colors:["#fbb624"],title:{text:"$235,312",offsetX:20,style:{fontSize:"24px"}},subtitle:{text:"Expenses",offsetX:20,style:{fontSize:"14px"}}};new ApexCharts(document.querySelector("#spark2"),spark2).render();var spark3={chart:{type:"area",height:160,sparkline:{enabled:!0}},stroke:{width:2,curve:"straight"},fill:{opacity:.2},series:[{name:"Net Profits ",data:randomizeArray(sparklineData)}],xaxis:{crosshairs:{width:1}},yaxis:{min:0},colors:["#0acf97"],title:{text:"$135,965",offsetX:20,style:{fontSize:"24px"}},subtitle:{text:"Profits",offsetX:20,style:{fontSize:"14px"}}};new ApexCharts(document.querySelector("#spark3"),spark3).render();var options1={chart:{type:"line",width:140,height:60,sparkline:{enabled:!0}},series:[{data:[25,66,41,89,63,25,44,12,36,9,54]}],stroke:{width:2,curve:"smooth"},markers:{size:0},colors:["#727cf5"],tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:function(e){return""}}},marker:{show:!1}}},options3=(options2={chart:{type:"line",width:140,height:60,sparkline:{enabled:!0}},colors:["#0acf97"],series:[{data:[12,14,2,47,42,15,47,75,65,19,14]}],stroke:{width:2,curve:"smooth"},markers:{size:0},tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:function(e){return""}}},marker:{show:!1}}},{chart:{type:"line",width:140,height:60,sparkline:{enabled:!0}},colors:["#ffbc00"],series:[{data:[47,45,74,14,56,74,14,11,7,39,82]}],stroke:{width:2,curve:"smooth"},markers:{size:0},tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:function(e){return""}}},marker:{show:!1}}}),options4={chart:{type:"line",width:140,height:60,sparkline:{enabled:!0}},colors:["#fa5c7c"],series:[{data:[15,75,47,65,14,2,41,54,4,27,15]}],stroke:{width:2,curve:"smooth"},markers:{size:0},tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:function(e){return""}}},marker:{show:!1}}},options5={chart:{type:"bar",width:100,height:60,sparkline:{enabled:!0}},plotOptions:{bar:{columnWidth:"80%"}},colors:["#727cf5"],series:[{data:[25,66,41,89,63,25,44,12,36,9,54]}],labels:[1,2,3,4,5,6,7,8,9,10,11],xaxis:{crosshairs:{width:1}},tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:function(e){return""}}},marker:{show:!1}}},options6={chart:{type:"bar",width:100,height:60,sparkline:{enabled:!0}},plotOptions:{bar:{columnWidth:"80%"}},colors:["#0acf97"],series:[{data:[12,14,2,47,42,15,47,75,65,19,14]}],labels:[1,2,3,4,5,6,7,8,9,10,11],xaxis:{crosshairs:{width:1}},tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:function(e){return""}}},marker:{show:!1}}},options7={chart:{type:"bar",width:100,height:60,sparkline:{enabled:!0}},plotOptions:{bar:{columnWidth:"80%"}},colors:["#ffbc00"],series:[{data:[47,45,74,14,56,74,14,11,7,39,82]}],labels:[1,2,3,4,5,6,7,8,9,10,11],xaxis:{crosshairs:{width:1}},tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:function(e){return""}}},marker:{show:!1}}},options8={chart:{type:"bar",width:100,height:60,sparkline:{enabled:!0}},plotOptions:{bar:{columnWidth:"80%"}},colors:["#fa5c7c"],series:[{data:[25,66,41,89,63,25,44,12,36,9,54]}],labels:[1,2,3,4,5,6,7,8,9,10,11],xaxis:{crosshairs:{width:1}},tooltip:{fixed:{enabled:!1},x:{show:!1},y:{title:{formatter:function(e){return""}}},marker:{show:!1}}};new ApexCharts(document.querySelector("#chart1"),options1).render(),new ApexCharts(document.querySelector("#chart2"),options2).render(),new ApexCharts(document.querySelector("#chart3"),options3).render(),new ApexCharts(document.querySelector("#chart4"),options4).render(),new ApexCharts(document.querySelector("#chart5"),options5).render(),new ApexCharts(document.querySelector("#chart6"),options6).render(),new ApexCharts(document.querySelector("#chart7"),options7).render(),new ApexCharts(document.querySelector("#chart8"),options8).render();
var dataSeries = [
  [{
      "date": "2014-01-01",
      "value": 20000000
    },
    {
      "date": "2014-01-02",
      "value": 10379978
    },
    {
      "date": "2014-01-03",
      "value": 30493749
    },
    {
      "date": "2014-01-04",
      "value": 10785250
    },
    {
      "date": "2014-01-05",
      "value": 33901904
    },
    {
      "date": "2014-01-06",
      "value": 11576838
    },
    {
      "date": "2014-01-07",
      "value": 14413854
    },
    {
      "date": "2014-01-08",
      "value": 15177211
    },
    {
      "date": "2014-01-09",
      "value": 16622100
    },
    {
      "date": "2014-01-10",
      "value": 17381072
    },
    {
      "date": "2014-01-11",
      "value": 18802310
    },
    {
      "date": "2014-01-12",
      "value": 15531790
    },
    {
      "date": "2014-01-13",
      "value": 15748881
    },
    {
      "date": "2014-01-14",
      "value": 18706437
    },
    {
      "date": "2014-01-15",
      "value": 19752685
    },
    {
      "date": "2014-01-16",
      "value": 21016418
    },
    {
      "date": "2014-01-17",
      "value": 25622924
    },
    {
      "date": "2014-01-18",
      "value": 25337480
    },
    {
      "date": "2014-01-19",
      "value": 22258882
    },
    {
      "date": "2014-01-20",
      "value": 23829538
    },
    {
      "date": "2014-01-21",
      "value": 24245689
    },
    {
      "date": "2014-01-22",
      "value": 26429711
    },
    {
      "date": "2014-01-23",
      "value": 26259017
    },
    {
      "date": "2014-01-24",
      "value": 25396183
    },
    {
      "date": "2014-01-25",
      "value": 23107346
    },
    {
      "date": "2014-01-26",
      "value": 28659852
    },
    {
      "date": "2014-01-27",
      "value": 25270783
    },
    {
      "date": "2014-01-28",
      "value": 26270783
    },
    {
      "date": "2014-01-29",
      "value": 27270783
    },
    {
      "date": "2014-01-30",
      "value": 28270783
    },
    {
      "date": "2014-01-31",
      "value": 29270783
    },
    {
      "date": "2014-02-01",
      "value": 30270783
    },
    {
      "date": "2014-02-02",
      "value": 31270783
    },
    {
      "date": "2014-02-03",
      "value": 32270783
    },
    {
      "date": "2014-02-04",
      "value": 33270783
    },
    {
      "date": "2014-02-05",
      "value": 28270783
    },
    {
      "date": "2014-02-06",
      "value": 27270783
    },
    {
      "date": "2014-02-07",
      "value": 35270783
    },
    {
      "date": "2014-02-08",
      "value": 34270783
    },
    {
      "date": "2014-02-09",
      "value": 28270783
    },
    {
      "date": "2014-02-10",
      "value": 35270783
    },
    {
      "date": "2014-02-11",
      "value": 36270783
    },
    {
      "date": "2014-02-12",
      "value": 34127078
    },
    {
      "date": "2014-02-13",
      "value": 33124078
    },
    {
      "date": "2014-02-14",
      "value": 36227078
    },
    {
      "date": "2014-02-15",
      "value": 37827078
    },
    {
      "date": "2014-02-16",
      "value": 36427073
    },
    {
      "date": "2014-02-17",
      "value": 37570783
    },
    {
      "date": "2014-02-18",
      "value": 38627073
    },
    {
      "date": "2014-02-19",
      "value": 37727078
    },
    {
      "date": "2014-02-20",
      "value": 38827073
    },
    {
      "date": "2014-02-21",
      "value": 40927078
    },
    {
      "date": "2014-02-22",
      "value": 41027078
    },
    {
      "date": "2014-02-23",
      "value": 42127073
    },
    {
      "date": "2014-02-24",
      "value": 43220783
    },
    {
      "date": "2014-02-25",
      "value": 44327078
    },
    {
      "date": "2014-02-26",
      "value": 40427078
    },
    {
      "date": "2014-02-27",
      "value": 41027078
    },
    {
      "date": "2014-02-28",
      "value": 45627078
    },
    {
      "date": "2014-03-01",
      "value": 44727078
    },
    {
      "date": "2014-03-02",
      "value": 44227078
    },
    {
      "date": "2014-03-03",
      "value": 45227078
    },
    {
      "date": "2014-03-04",
      "value": 46027078
    },
    {
      "date": "2014-03-05",
      "value": 46927078
    },
    {
      "date": "2014-03-06",
      "value": 47027078
    },
    {
      "date": "2014-03-07",
      "value": 46227078
    },
    {
      "date": "2014-03-08",
      "value": 47027078
    },
    {
      "date": "2014-03-09",
      "value": 48027078
    },
    {
      "date": "2014-03-10",
      "value": 47027078
    },
    {
      "date": "2014-03-11",
      "value": 47027078
    },
    {
      "date": "2014-03-12",
      "value": 48017078
    },
    {
      "date": "2014-03-13",
      "value": 48077078
    },
    {
      "date": "2014-03-14",
      "value": 48087078
    },
    {
      "date": "2014-03-15",
      "value": 48017078
    },
    {
      "date": "2014-03-16",
      "value": 48047078
    },
    {
      "date": "2014-03-17",
      "value": 48067078
    },
    {
      "date": "2014-03-18",
      "value": 48077078
    },
    {
      "date": "2014-03-19",
      "value": 48027074
    },
    {
      "date": "2014-03-20",
      "value": 48927079
    },
    {
      "date": "2014-03-21",
      "value": 48727071
    },
    {
      "date": "2014-03-22",
      "value": 48127072
    },
    {
      "date": "2014-03-23",
      "value": 48527072
    },
    {
      "date": "2014-03-24",
      "value": 48627027
    },
    {
      "date": "2014-03-25",
      "value": 48027040
    },
    {
      "date": "2014-03-26",
      "value": 48027043
    },
    {
      "date": "2014-03-27",
      "value": 48057022
    },
    {
      "date": "2014-03-28",
      "value": 49057022
    },
    {
      "date": "2014-03-29",
      "value": 50057022
    },
    {
      "date": "2014-03-30",
      "value": 51057022
    },
    {
      "date": "2014-03-31",
      "value": 52057022
    },
    {
      "date": "2014-04-01",
      "value": 53057022
    },
    {
      "date": "2014-04-02",
      "value": 54057022
    },
    {
      "date": "2014-04-03",
      "value": 52057022
    },
    {
      "date": "2014-04-04",
      "value": 55057022
    },
    {
      "date": "2014-04-05",
      "value": 58270783
    },
    {
      "date": "2014-04-06",
      "value": 56270783
    },
    {
      "date": "2014-04-07",
      "value": 55270783
    },
    {
      "date": "2014-04-08",
      "value": 58270783
    },
    {
      "date": "2014-04-09",
      "value": 59270783
    },
    {
      "date": "2014-04-10",
      "value": 60270783
    },
    {
      "date": "2014-04-11",
      "value": 61270783
    },
    {
      "date": "2014-04-12",
      "value": 62270783
    },
    {
      "date": "2014-04-13",
      "value": 63270783
    },
    {
      "date": "2014-04-14",
      "value": 64270783
    },
    {
      "date": "2014-04-15",
      "value": 65270783
    },
    {
      "date": "2014-04-16",
      "value": 66270783
    },
    {
      "date": "2014-04-17",
      "value": 67270783
    },
    {
      "date": "2014-04-18",
      "value": 68270783
    },
    {
      "date": "2014-04-19",
      "value": 69270783
    },
    {
      "date": "2014-04-20",
      "value": 70270783
    },
    {
      "date": "2014-04-21",
      "value": 71270783
    },
    {
      "date": "2014-04-22",
      "value": 72270783
    },
    {
      "date": "2014-04-23",
      "value": 73270783
    },
    {
      "date": "2014-04-24",
      "value": 74270783
    },
    {
      "date": "2014-04-25",
      "value": 75270783
    },
    {
      "date": "2014-04-26",
      "value": 76660783
    },
    {
      "date": "2014-04-27",
      "value": 77270783
    },
    {
      "date": "2014-04-28",
      "value": 78370783
    },
    {
      "date": "2014-04-29",
      "value": 79470783
    },
    {
      "date": "2014-04-30",
      "value": 80170783
    }
  ],
  [{
      "date": "2014-01-01",
      "value": 150000000
    },
    {
      "date": "2014-01-02",
      "value": 160379978
    },
    {
      "date": "2014-01-03",
      "value": 170493749
    },
    {
      "date": "2014-01-04",
      "value": 160785250
    },
    {
      "date": "2014-01-05",
      "value": 167391904
    },
    {
      "date": "2014-01-06",
      "value": 161576838
    },
    {
      "date": "2014-01-07",
      "value": 161413854
    },
    {
      "date": "2014-01-08",
      "value": 152177211
    },
    {
      "date": "2014-01-09",
      "value": 140762210
    },
    {
      "date": "2014-01-10",
      "value": 144381072
    },
    {
      "date": "2014-01-11",
      "value": 154352310
    },
    {
      "date": "2014-01-12",
      "value": 165531790
    },
    {
      "date": "2014-01-13",
      "value": 175748881
    },
    {
      "date": "2014-01-14",
      "value": 187064037
    },
    {
      "date": "2014-01-15",
      "value": 197520685
    },
    {
      "date": "2014-01-16",
      "value": 210176418
    },
    {
      "date": "2014-01-17",
      "value": 196122924
    },
    {
      "date": "2014-01-18",
      "value": 207337480
    },
    {
      "date": "2014-01-19",
      "value": 200258882
    },
    {
      "date": "2014-01-20",
      "value": 186829538
    },
    {
      "date": "2014-01-21",
      "value": 192456897
    },
    {
      "date": "2014-01-22",
      "value": 204299711
    },
    {
      "date": "2014-01-23",
      "value": 192759017
    },
    {
      "date": "2014-01-24",
      "value": 203596183
    },
    {
      "date": "2014-01-25",
      "value": 208107346
    },
    {
      "date": "2014-01-26",
      "value": 196359852
    },
    {
      "date": "2014-01-27",
      "value": 192570783
    },
    {
      "date": "2014-01-28",
      "value": 177967768
    },
    {
      "date": "2014-01-29",
      "value": 190632803
    },
    {
      "date": "2014-01-30",
      "value": 203725316
    },
    {
      "date": "2014-01-31",
      "value": 218226177
    },
    {
      "date": "2014-02-01",
      "value": 210698669
    },
    {
      "date": "2014-02-02",
      "value": 217640656
    },
    {
      "date": "2014-02-03",
      "value": 216142362
    },
    {
      "date": "2014-02-04",
      "value": 201410971
    },
    {
      "date": "2014-02-05",
      "value": 196704289
    },
    {
      "date": "2014-02-06",
      "value": 190436945
    },
    {
      "date": "2014-02-07",
      "value": 178891686
    },
    {
      "date": "2014-02-08",
      "value": 171613962
    },
    {
      "date": "2014-02-09",
      "value": 157579773
    },
    {
      "date": "2014-02-10",
      "value": 158677098
    },
    {
      "date": "2014-02-11",
      "value": 147129977
    },
    {
      "date": "2014-02-12",
      "value": 151561876
    },
    {
      "date": "2014-02-13",
      "value": 151627421
    },
    {
      "date": "2014-02-14",
      "value": 143543872
    },
    {
      "date": "2014-02-15",
      "value": 136581057
    },
    {
      "date": "2014-02-16",
      "value": 135560715
    },
    {
      "date": "2014-02-17",
      "value": 122625263
    },
    {
      "date": "2014-02-18",
      "value": 112091484
    },
    {
      "date": "2014-02-19",
      "value": 98810329
    },
    {
      "date": "2014-02-20",
      "value": 99882912
    },
    {
      "date": "2014-02-21",
      "value": 94943095
    },
    {
      "date": "2014-02-22",
      "value": 104875743
    },
    {
      "date": "2014-02-23",
      "value": 116383678
    },
    {
      "date": "2014-02-24",
      "value": 125028841
    },
    {
      "date": "2014-02-25",
      "value": 123967310
    },
    {
      "date": "2014-02-26",
      "value": 133167029
    },
    {
      "date": "2014-02-27",
      "value": 128577263
    },
    {
      "date": "2014-02-28",
      "value": 115836969
    },
    {
      "date": "2014-03-01",
      "value": 119264529
    },
    {
      "date": "2014-03-02",
      "value": 109363374
    },
    {
      "date": "2014-03-03",
      "value": 113985628
    },
    {
      "date": "2014-03-04",
      "value": 114650999
    },
    {
      "date": "2014-03-05",
      "value": 110866108
    },
    {
      "date": "2014-03-06",
      "value": 96473454
    },
    {
      "date": "2014-03-07",
      "value": 104075886
    },
    {
      "date": "2014-03-08",
      "value": 103568384
    },
    {
      "date": "2014-03-09",
      "value": 101534883
    },
    {
      "date": "2014-03-10",
      "value": 115825447
    },
    {
      "date": "2014-03-11",
      "value": 126133916
    },
    {
      "date": "2014-03-12",
      "value": 116502109
    },
    {
      "date": "2014-03-13",
      "value": 130169411
    },
    {
      "date": "2014-03-14",
      "value": 124296886
    },
    {
      "date": "2014-03-15",
      "value": 126347399
    },
    {
      "date": "2014-03-16",
      "value": 131483669
    },
    {
      "date": "2014-03-17",
      "value": 142811333
    },
    {
      "date": "2014-03-18",
      "value": 129675396
    },
    {
      "date": "2014-03-19",
      "value": 115514483
    },
    {
      "date": "2014-03-20",
      "value": 117630630
    },
    {
      "date": "2014-03-21",
      "value": 122340239
    },
    {
      "date": "2014-03-22",
      "value": 132349091
    },
    {
      "date": "2014-03-23",
      "value": 125613305
    },
    {
      "date": "2014-03-24",
      "value": 135592466
    },
    {
      "date": "2014-03-25",
      "value": 123408762
    },
    {
      "date": "2014-03-26",
      "value": 111991454
    },
    {
      "date": "2014-03-27",
      "value": 116123955
    },
    {
      "date": "2014-03-28",
      "value": 112817214
    },
    {
      "date": "2014-03-29",
      "value": 113029590
    },
    {
      "date": "2014-03-30",
      "value": 108753398
    },
    {
      "date": "2014-03-31",
      "value": 99383763
    },
    {
      "date": "2014-04-01",
      "value": 100151737
    },
    {
      "date": "2014-04-02",
      "value": 94985209
    },
    {
      "date": "2014-04-03",
      "value": 82913669
    },
    {
      "date": "2014-04-04",
      "value": 78748268
    },
    {
      "date": "2014-04-05",
      "value": 63829135
    },
    {
      "date": "2014-04-06",
      "value": 78694727
    },
    {
      "date": "2014-04-07",
      "value": 80868994
    },
    {
      "date": "2014-04-08",
      "value": 93799013
    },
    {
      "date": "2014-04-09",
      "value": 99042416
    },
    {
      "date": "2014-04-10",
      "value": 97298692
    },
    {
      "date": "2014-04-11",
      "value": 83353499
    },
    {
      "date": "2014-04-12",
      "value": 71248129
    },
    {
      "date": "2014-04-13",
      "value": 75253744
    },
    {
      "date": "2014-04-14",
      "value": 68976648
    },
    {
      "date": "2014-04-15",
      "value": 71002284
    },
    {
      "date": "2014-04-16",
      "value": 75052401
    },
    {
      "date": "2014-04-17",
      "value": 83894030
    },
    {
      "date": "2014-04-18",
      "value": 90236528
    },
    {
      "date": "2014-04-19",
      "value": 99739114
    },
    {
      "date": "2014-04-20",
      "value": 96407136
    },
    {
      "date": "2014-04-21",
      "value": 108323177
    },
    {
      "date": "2014-04-22",
      "value": 101578914
    },
    {
      "date": "2014-04-23",
      "value": 115877608
    },
    {
      "date": "2014-04-24",
      "value": 112088857
    },
    {
      "date": "2014-04-25",
      "value": 112071353
    },
    {
      "date": "2014-04-26",
      "value": 101790062
    },
    {
      "date": "2014-04-27",
      "value": 115003761
    },
    {
      "date": "2014-04-28",
      "value": 120457727
    },
    {
      "date": "2014-04-29",
      "value": 118253926
    },
    {
      "date": "2014-04-30",
      "value": 117956992
    }
  ],
  [{
      "date": "2014-01-01",
      "value": 50000000
    },
    {
      "date": "2014-01-02",
      "value": 60379978
    },
    {
      "date": "2014-01-03",
      "value": 40493749
    },
    {
      "date": "2014-01-04",
      "value": 60785250
    },
    {
      "date": "2014-01-05",
      "value": 67391904
    },
    {
      "date": "2014-01-06",
      "value": 61576838
    },
    {
      "date": "2014-01-07",
      "value": 61413854
    },
    {
      "date": "2014-01-08",
      "value": 82177211
    },
    {
      "date": "2014-01-09",
      "value": 103762210
    },
    {
      "date": "2014-01-10",
      "value": 84381072
    },
    {
      "date": "2014-01-11",
      "value": 54352310
    },
    {
      "date": "2014-01-12",
      "value": 65531790
    },
    {
      "date": "2014-01-13",
      "value": 75748881
    },
    {
      "date": "2014-01-14",
      "value": 47064037
    },
    {
      "date": "2014-01-15",
      "value": 67520685
    },
    {
      "date": "2014-01-16",
      "value": 60176418
    },
    {
      "date": "2014-01-17",
      "value": 66122924
    },
    {
      "date": "2014-01-18",
      "value": 57337480
    },
    {
      "date": "2014-01-19",
      "value": 100258882
    },
    {
      "date": "2014-01-20",
      "value": 46829538
    },
    {
      "date": "2014-01-21",
      "value": 92456897
    },
    {
      "date": "2014-01-22",
      "value": 94299711
    },
    {
      "date": "2014-01-23",
      "value": 62759017
    },
    {
      "date": "2014-01-24",
      "value": 103596183
    },
    {
      "date": "2014-01-25",
      "value": 108107346
    },
    {
      "date": "2014-01-26",
      "value": 66359852
    },
    {
      "date": "2014-01-27",
      "value": 62570783
    },
    {
      "date": "2014-01-28",
      "value": 77967768
    },
    {
      "date": "2014-01-29",
      "value": 60632803
    },
    {
      "date": "2014-01-30",
      "value": 103725316
    },
    {
      "date": "2014-01-31",
      "value": 98226177
    },
    {
      "date": "2014-02-01",
      "value": 60698669
    },
    {
      "date": "2014-02-02",
      "value": 67640656
    },
    {
      "date": "2014-02-03",
      "value": 66142362
    },
    {
      "date": "2014-02-04",
      "value": 101410971
    },
    {
      "date": "2014-02-05",
      "value": 66704289
    },
    {
      "date": "2014-02-06",
      "value": 60436945
    },
    {
      "date": "2014-02-07",
      "value": 78891686
    },
    {
      "date": "2014-02-08",
      "value": 71613962
    },
    {
      "date": "2014-02-09",
      "value": 107579773
    },
    {
      "date": "2014-02-10",
      "value": 58677098
    },
    {
      "date": "2014-02-11",
      "value": 87129977
    },
    {
      "date": "2014-02-12",
      "value": 51561876
    },
    {
      "date": "2014-02-13",
      "value": 51627421
    },
    {
      "date": "2014-02-14",
      "value": 83543872
    },
    {
      "date": "2014-02-15",
      "value": 66581057
    },
    {
      "date": "2014-02-16",
      "value": 65560715
    },
    {
      "date": "2014-02-17",
      "value": 62625263
    },
    {
      "date": "2014-02-18",
      "value": 92091484
    },
    {
      "date": "2014-02-19",
      "value": 48810329
    },
    {
      "date": "2014-02-20",
      "value": 49882912
    },
    {
      "date": "2014-02-21",
      "value": 44943095
    },
    {
      "date": "2014-02-22",
      "value": 104875743
    },
    {
      "date": "2014-02-23",
      "value": 96383678
    },
    {
      "date": "2014-02-24",
      "value": 105028841
    },
    {
      "date": "2014-02-25",
      "value": 63967310
    },
    {
      "date": "2014-02-26",
      "value": 63167029
    },
    {
      "date": "2014-02-27",
      "value": 68577263
    },
    {
      "date": "2014-02-28",
      "value": 95836969
    },
    {
      "date": "2014-03-01",
      "value": 99264529
    },
    {
      "date": "2014-03-02",
      "value": 109363374
    },
    {
      "date": "2014-03-03",
      "value": 93985628
    },
    {
      "date": "2014-03-04",
      "value": 94650999
    },
    {
      "date": "2014-03-05",
      "value": 90866108
    },
    {
      "date": "2014-03-06",
      "value": 46473454
    },
    {
      "date": "2014-03-07",
      "value": 84075886
    },
    {
      "date": "2014-03-08",
      "value": 103568384
    },
    {
      "date": "2014-03-09",
      "value": 101534883
    },
    {
      "date": "2014-03-10",
      "value": 95825447
    },
    {
      "date": "2014-03-11",
      "value": 66133916
    },
    {
      "date": "2014-03-12",
      "value": 96502109
    },
    {
      "date": "2014-03-13",
      "value": 80169411
    },
    {
      "date": "2014-03-14",
      "value": 84296886
    },
    {
      "date": "2014-03-15",
      "value": 86347399
    },
    {
      "date": "2014-03-16",
      "value": 31483669
    },
    {
      "date": "2014-03-17",
      "value": 82811333
    },
    {
      "date": "2014-03-18",
      "value": 89675396
    },
    {
      "date": "2014-03-19",
      "value": 95514483
    },
    {
      "date": "2014-03-20",
      "value": 97630630
    },
    {
      "date": "2014-03-21",
      "value": 62340239
    },
    {
      "date": "2014-03-22",
      "value": 62349091
    },
    {
      "date": "2014-03-23",
      "value": 65613305
    },
    {
      "date": "2014-03-24",
      "value": 65592466
    },
    {
      "date": "2014-03-25",
      "value": 63408762
    },
    {
      "date": "2014-03-26",
      "value": 91991454
    },
    {
      "date": "2014-03-27",
      "value": 96123955
    },
    {
      "date": "2014-03-28",
      "value": 92817214
    },
    {
      "date": "2014-03-29",
      "value": 93029590
    },
    {
      "date": "2014-03-30",
      "value": 108753398
    },
    {
      "date": "2014-03-31",
      "value": 49383763
    },
    {
      "date": "2014-04-01",
      "value": 100151737
    },
    {
      "date": "2014-04-02",
      "value": 44985209
    },
    {
      "date": "2014-04-03",
      "value": 52913669
    },
    {
      "date": "2014-04-04",
      "value": 48748268
    },
    {
      "date": "2014-04-05",
      "value": 23829135
    },
    {
      "date": "2014-04-06",
      "value": 58694727
    },
    {
      "date": "2014-04-07",
      "value": 50868994
    },
    {
      "date": "2014-04-08",
      "value": 43799013
    },
    {
      "date": "2014-04-09",
      "value": 4042416
    },
    {
      "date": "2014-04-10",
      "value": 47298692
    },
    {
      "date": "2014-04-11",
      "value": 53353499
    },
    {
      "date": "2014-04-12",
      "value": 71248129
    },
    {
      "date": "2014-04-13",
      "value": 75253744
    },
    {
      "date": "2014-04-14",
      "value": 68976648
    },
    {
      "date": "2014-04-15",
      "value": 71002284
    },
    {
      "date": "2014-04-16",
      "value": 75052401
    },
    {
      "date": "2014-04-17",
      "value": 83894030
    },
    {
      "date": "2014-04-18",
      "value": 50236528
    },
    {
      "date": "2014-04-19",
      "value": 59739114
    },
    {
      "date": "2014-04-20",
      "value": 56407136
    },
    {
      "date": "2014-04-21",
      "value": 108323177
    },
    {
      "date": "2014-04-22",
      "value": 101578914
    },
    {
      "date": "2014-04-23",
      "value": 95877608
    },
    {
      "date": "2014-04-24",
      "value": 62088857
    },
    {
      "date": "2014-04-25",
      "value": 92071353
    },
    {
      "date": "2014-04-26",
      "value": 81790062
    },
    {
      "date": "2014-04-27",
      "value": 105003761
    },
    {
      "date": "2014-04-28",
      "value": 100457727
    },
    {
      "date": "2014-04-29",
      "value": 98253926
    },
    {
      "date": "2014-04-30",
      "value": 67956992
    }
  ]
]
;
!function(a){"use strict";function t(){a(".slimscroll").slimscroll({height:"auto",position:"right",size:"7px",color:"#e0e5f1",opacity:1,wheelStep:5,touchScrollStep:50})}t(),a(".metismenu").metisMenu(),a(".button-menu-mobile").on("click",function(e){e.preventDefault(),a("body").toggleClass("enlarge-menu"),t()}),a(window).width()<1025?a("body").addClass("enlarge-menu"):1!=a("body").data("keep-enlarged")&&a("body").removeClass("enlarge-menu"),a(".left-sidenav a").each(function(){var e=window.location.href.split(/[?#]/)[0];this.href==e&&(a(this).addClass("active"),a(this).parent().addClass("active"),a(this).parent().parent().addClass("in"),a(this).parent().parent().addClass("mm-show"),a(this).parent().parent().parent().addClass("mm-active"),a(this).parent().parent().prev().addClass("active"),a(this).parent().parent().parent().addClass("active"),a(this).parent().parent().parent().parent().addClass("mm-show"),a(this).parent().parent().parent().parent().parent().addClass("mm-active"))}),Waves.init()}(jQuery);






// Vendor Files













$(document).ready(function() {


	 toastr.options = {
	                  "closeButton": false,
	                  "debug": false,
	                  "positionClass": "toast-bottom-right",
	                  "onclick": null,
	                  "showDuration": "300",
	                  "hideDuration": "1000",
	                  "timeOut": "5000",
	                  "extendedTimeOut": "1000",
	                  "showEasing": "swing",
	                  "hideEasing": "linear",
	                  "showMethod": "fadeIn",
	                  "hideMethod": "fadeOut"
	              }




	});
