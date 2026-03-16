<script lang="ts">
    import type { Snippet } from 'svelte';
    import { cn } from '@/lib/utils';
    import { setInputOTPContext } from './context';

    let {
        value = $bindable(''),
        maxlength = 6,
        disabled = false,
        id,
        class: className = '',
        children,
        ...rest
    }: {
        value?: string;
        maxlength?: number;
        disabled?: boolean;
        id?: string;
        class?: string;
        children?: Snippet;
        [key: string]: unknown;
    } = $props();

    let inputRef: HTMLInputElement;
    let isFocused = $state(false);
    const activeIndex = $derived(Math.min(value.length, maxlength - 1));

    setInputOTPContext({
        value: () => value,
        activeIndex: () => (isFocused ? activeIndex : -1),
        isFocused: () => isFocused,
        focus: () => inputRef?.focus(),
    });

    function handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        value = target.value.replace(/[^0-9]/g, '').slice(0, maxlength);
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Backspace' && value.length > 0) {
            e.preventDefault();
            value = value.slice(0, -1);
        }
    }
</script>

<div
    data-slot="input-otp"
    class={cn('relative flex items-center gap-2 has-disabled:opacity-50', className)}
    role="group"
    {...rest}
>
    <input
        bind:this={inputRef}
        {id}
        {disabled}
        type="text"
        inputmode="numeric"
        autocomplete="one-time-code"
        {value}
        oninput={handleInput}
        onkeydown={handleKeyDown}
        onfocus={() => (isFocused = true)}
        onblur={() => (isFocused = false)}
        class="absolute inset-0 z-10 h-full w-full cursor-text opacity-0 disabled:cursor-not-allowed"
    />
    <div class="pointer-events-none">
        {@render children?.()}
    </div>
</div>
