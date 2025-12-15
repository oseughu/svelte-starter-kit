<script lang="ts">
    import type { LinkComponentBaseProps, Method } from '@inertiajs/core';
    import { Link } from '@inertiajs/svelte';
    import type { Snippet } from 'svelte';

    interface Props {
        href: LinkComponentBaseProps['href'];
        tabindex?: number;
        method?: Method;
        as?: keyof HTMLElementTagNameMap;
        class?: string;
        children: Snippet;
    }

    let { href, tabindex, method, as, class: className, children }: Props = $props();
</script>

<Link
    {href}
    {tabindex}
    {method}
    {as}
    class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500 {className}"
>
    {@render children?.()}
</Link>
