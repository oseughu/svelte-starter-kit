<script lang="ts">
    import { Link, page } from '@inertiajs/svelte';
    import type { Snippet } from 'svelte';
    import AppLogoIcon from '@/components/AppLogoIcon.svelte';
    import { home } from '@/routes';

    let {
        title = '',
        description = '',
        children,
    }: {
        title?: string;
        description?: string;
        children?: Snippet;
    } = $props();

    const name = $derived($page.props.name);
</script>

<div
    class="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0"
>
    <div
        class="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
    >
        <div class="absolute inset-0 bg-zinc-900"></div>
        <Link
            href={home()}
            class="relative z-20 flex items-center text-lg font-medium"
        >
            <AppLogoIcon class="mr-2 size-8 fill-current text-white" />
            {name}
        </Link>
    </div>
    <div class="lg:p-8">
        <div
            class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        >
            <div class="flex flex-col space-y-2 text-center">
                {#if title}
                    <h1 class="text-xl font-medium tracking-tight">{title}</h1>
                {/if}
                {#if description}
                    <p class="text-sm text-muted-foreground">{description}</p>
                {/if}
            </div>
            {@render children?.()}
        </div>
    </div>
</div>
