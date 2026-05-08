import type { LinkComponentBaseProps } from '@inertiajs/core';
import { page } from '@inertiajs/svelte';
import { toUrl } from '@/lib/utils';

export type CurrentUrlState = {
    readonly currentUrl: string;
    isCurrentUrl: (
        urlToCheck: NonNullable<LinkComponentBaseProps['href']>,
        currentUrl: string,
    ) => boolean;
    isCurrentOrParentUrl: (
        urlToCheck: NonNullable<LinkComponentBaseProps['href']>,
        currentUrl: string,
    ) => boolean;
    whenCurrentUrl: <TIfTrue, TIfFalse>(
        urlToCheck: NonNullable<LinkComponentBaseProps['href']>,
        currentUrl: string,
        ifTrue: TIfTrue,
        ifFalse: TIfFalse,
    ) => TIfTrue | TIfFalse;
};

export function currentUrlState(): CurrentUrlState {
    const currentUrl = $derived.by(() => {
        const origin =
            typeof window === 'undefined'
                ? 'http://localhost'
                : window.location.origin;

        try {
            return new URL(page.url, origin).pathname;
        } catch {
            return page.url;
        }
    });

    function isCurrentUrl(
        urlToCheck: NonNullable<LinkComponentBaseProps['href']>,
        current: string,
    ): boolean {
        const resolved = toUrl(urlToCheck);

        if (typeof resolved !== 'string') {
            return false;
        }

        return current === resolved;
    }

    function isCurrentOrParentUrl(
        urlToCheck: NonNullable<LinkComponentBaseProps['href']>,
        current: string,
    ): boolean {
        const resolved = toUrl(urlToCheck);

        if (typeof resolved !== 'string') {
            return false;
        }

        return current.startsWith(resolved);
    }

    function whenCurrentUrl<TIfTrue, TIfFalse>(
        urlToCheck: NonNullable<LinkComponentBaseProps['href']>,
        current: string,
        ifTrue: TIfTrue,
        ifFalse: TIfFalse,
    ): TIfTrue | TIfFalse {
        return isCurrentUrl(urlToCheck, current) ? ifTrue : ifFalse;
    }

    return {
        get currentUrl() {
            return currentUrl;
        },
        isCurrentUrl,
        isCurrentOrParentUrl,
        whenCurrentUrl,
    };
}
