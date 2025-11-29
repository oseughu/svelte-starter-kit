<script lang="ts">
    import { Button } from '@/components/ui/button';
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu';
    import { useAppearance } from '@/hooks/use-appearance.svelte';
    import { Monitor, Moon, Sun } from 'lucide-svelte';

    interface Props {
        class?: string;
    }

    let { class: className = '', ...props }: Props = $props();

    const { appearance, updateAppearance } = useAppearance();

    const currentIcon = $derived.by(() => {
        switch (appearance) {
            case 'dark':
                return Moon;
            case 'light':
                return Sun;
            default:
                return Monitor;
        }
    });
</script>

<div class={className} {...props}>
    <DropdownMenu>
        <DropdownMenuTrigger asChild let:builder>
            <Button
                builders={[builder]}
                variant="ghost"
                size="icon"
                class="h-9 w-9 rounded-md"
            >
                <svelte:component this={currentIcon} class="h-5 w-5" />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onclick={() => updateAppearance('light')}>
                <span class="flex items-center gap-2">
                    <Sun class="h-5 w-5" />
                    Light
                </span>
            </DropdownMenuItem>
            <DropdownMenuItem onclick={() => updateAppearance('dark')}>
                <span class="flex items-center gap-2">
                    <Moon class="h-5 w-5" />
                    Dark
                </span>
            </DropdownMenuItem>
            <DropdownMenuItem onclick={() => updateAppearance('system')}>
                <span class="flex items-center gap-2">
                    <Monitor class="h-5 w-5" />
                    System
                </span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</div>
