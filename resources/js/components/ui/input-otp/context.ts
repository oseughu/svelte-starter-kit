import { getContext, setContext } from 'svelte';

export const INPUT_OTP_CONTEXT = Symbol('input-otp');

export type InputOTPContext = {
    value: () => string;
    activeIndex: () => number;
    isFocused: () => boolean;
    focus: () => void;
};

export function setInputOTPContext(ctx: InputOTPContext): void {
    setContext(INPUT_OTP_CONTEXT, ctx);
}

export function getInputOTPContext(): InputOTPContext {
    return getContext<InputOTPContext>(INPUT_OTP_CONTEXT);
}
