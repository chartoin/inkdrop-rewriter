'use babel';

export class RXHelper {

	static escape(str: string) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

}

export class String {
	static wrap(str: string, c: string, suffix?: string) {
		suffix = (suffix === null || typeof suffix === 'undefined') ? c : suffix;
		return c + str + suffix;
	}
}
