'use babel';

export class RXHelper {

	static escape(str) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

}

export class String {
	static wrap(str, c, suffix) {
		suffix = (suffix === null || typeof suffix === 'undefined') ? c : suffix;
		return c + str + suffix;
	}
}
