// expo-modules.d.ts
declare module 'expo-haptics';
declare module 'expo-web-browser';
declare module 'react-native-reanimated' {
  import type * as React from 'react';
  export function useAnimatedRef<T = any>(): React.RefObject<T>;
  export function useAnimatedStyle<T = any>(callback: () => T): T;
  export function useSharedValue<T = any>(value: T): { value: T };
  export function useScrollOffset(ref: any): number;
  export const Animated: any;
}
