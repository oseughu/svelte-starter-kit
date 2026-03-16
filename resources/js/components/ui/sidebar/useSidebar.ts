import { getContext } from 'svelte';
import { SIDEBAR_CONTEXT, type SidebarContext } from './context';

export function useSidebar(): SidebarContext {
    const context = getContext<SidebarContext>(SIDEBAR_CONTEXT);

    if (!context) {
        throw new Error('Sidebar context is not available');
    }

    return context;
}
