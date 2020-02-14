export function executeAsyncValidators(control, validators, invert = false) {
    return validators.map(validator => validator(control, invert));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZUFzeW5jVmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3NmL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvdmFsaWRhdG9yL2V4ZWN1dGVBc3luY1ZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZUEsTUFBTSxVQUFVLHNCQUFzQixDQUNwQyxPQUF3QixFQUN4QixVQUErQixFQUMvQixNQUFNLEdBQUcsS0FBSztJQUVkLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTtBQUNoRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAnZXhlY3V0ZUFzeW5jVmFsaWRhdG9ycycgdXRpbGl0eSBmdW5jdGlvblxuICpcbiAqIFZhbGlkYXRlcyBhIGNvbnRyb2wgYWdhaW5zdCBhbiBhcnJheSBvZiBhc3luYyB2YWxpZGF0b3JzLCBhbmQgcmV0dXJuc1xuICogYW4gYXJyYXkgb2Ygb2JzZXJ2YWJlIHJlc3VsdHMgb2YgdGhlIHNhbWUgbGVuZ3RoIGNvbnRhaW5pbmcgYSBjb21iaW5hdGlvbiBvZlxuICogZXJyb3IgbWVzc2FnZXMgKGZyb20gaW52YWxpZCB2YWxpZGF0b3JzKSBhbmQgbnVsbCB2YWx1ZXMgKGZyb20gdmFsaWQgb25lcylcbiAqXG4gKiBAcGFyYW0gIHsgQWJzdHJhY3RDb250cm9sIH0gY29udHJvbCAtIGNvbnRyb2wgdG8gdmFsaWRhdGVcbiAqIEBwYXJhbSAgeyBBc3luY0lWYWxpZGF0b3JGbltdIH0gdmFsaWRhdG9ycyAtIGFycmF5IG9mIGFzeW5jIHZhbGlkYXRvcnNcbiAqIEBwYXJhbSAgeyBib29sZWFuIH0gaW52ZXJ0IC0gaW52ZXJ0P1xuICogQHJldHVybiBhcnJheSBvZiBvYnNlcnZhYmxlIG51bGxzIGFuZCBlcnJvciBtZXNzYWdlXG4gKi9cbmltcG9ydCB7QWJzdHJhY3RDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3JtcydcbmltcG9ydCB7QXN5bmNJVmFsaWRhdG9yRm59IGZyb20gJy4vdHlwZXMnXG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlQXN5bmNWYWxpZGF0b3JzKFxuICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsXG4gIHZhbGlkYXRvcnM6IEFzeW5jSVZhbGlkYXRvckZuW10sXG4gIGludmVydCA9IGZhbHNlXG4pIHtcbiAgcmV0dXJuIHZhbGlkYXRvcnMubWFwKHZhbGlkYXRvciA9PiB2YWxpZGF0b3IoY29udHJvbCwgaW52ZXJ0KSlcbn1cbiJdfQ==