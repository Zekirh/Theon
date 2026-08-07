/** Shared easing curves + springs for the Causality motion language. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_INOUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const SPRING_SOFT = { type: "spring", stiffness: 260, damping: 26, mass: 0.9 } as const;
export const SPRING_SNAPPY = { type: "spring", stiffness: 380, damping: 30 } as const;
