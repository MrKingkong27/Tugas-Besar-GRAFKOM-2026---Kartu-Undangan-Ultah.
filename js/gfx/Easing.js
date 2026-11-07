
export default class Easing {
    static lerp(a, b, t) { return a + (b - a) * t; }

    static clamp(t) {
        if (t < 0) return 0;
        if (t > 1) return 1;
        return t;
    }

    static outQuad(t) { return 1 - (1 - t) * (1 - t); }

    static inOutQuad(t) {
        if (t < 0.5) return 2 * t * t;
        return 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    static outBounce(t) {
        if (t < 1 / 2.75) return 7.5625 * t * t;
        if (t < 2 / 2.75) { t -= 1.5 / 2.75; return 7.5625 * t * t + 0.75; }
        if (t < 2.5 / 2.75) { t -= 2.25 / 2.75; return 7.5625 * t * t + 0.9375; }
        t -= 2.625 / 2.75;
        return 7.5625 * t * t + 0.984375;
    }
}
