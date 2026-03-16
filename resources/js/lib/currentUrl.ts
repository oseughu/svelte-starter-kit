import type { LinkComponentBaseProps } from '@inertiajs/core';
import { page } from '@inertiajs/svelte';
import type { Readable } from 'svelte/store';
import { derived } from 'svelte/store';
import { toUrl } from '@/lib/utils';

export type CurrentUrlState = {
    currentUrl: Readable<string>;
    isCurrentUrl: (
        urlToCheck: NonNullable<LinkComponentBaseProps['href']>,
        currentUrl: string,
        startsWith?: boolean,
    ) => boolean;
    isCurrentOrParentUrl: (
        urlToCheck: NonNullable<LinkComponentBaseProps['href']>,
        currentUrl: string,
    ) => boolean;
    whenCurrentUrl: <TIfTrue, TIfFalse = null>(
        urlToCheck: NonNullable<LinkComponentBaseProps['href']>,
        currentUrl: string,
        ifTrue: TIfTrue,
        ifFalse?: TIfFalse,
    ) => TIfTrue | TIfFalse;
};

const currentUrl = derived(page, ($page) => {
    const origin =
        typeof window === 'undefined'
            ? 'http://localhost'
            : window.location.origin;

    try {
        return new URL($page.url, origin).pathname;
    } catch {
        return $page.url;
    }
});

export function currentUrlState(): CurrentUrlState {
    function isCurrentUrl(
        urlToCheck: NonNullable<LinkComponentBaseProps['href']>,
        current: string,
        startsWith: boolean = false,
    ): boolean {
        const urlString = toUrl(urlToCheck);

        const comparePath = (path: string): boolean =>
            startsWith ? current.startsWith(path) : path === current;

        if (!urlString.startsWith('http')) {
            return comparePath(urlString);
        }

        try {
            const absoluteUrl = new URL(urlString);
            return comparePath(absoluteUrl.pathname);
        } catch {
            return false;
        }
    }

    function isCurrentOrParentUrl(
        urlToCheck: NonNullable<LinkComponentBaseProps['href']>,
        current: string,
    ): boolean {
        return isCurrentUrl(urlToCheck, current, true);
    }

    function whenCurrentUrl<TIfTrue, TIfFalse = null>(
        urlToCheck: NonNullable<LinkComponentBaseProps['href']>,
        current: string,
        ifTrue: TIfTrue,
        ifFalse: TIfFalse = null as TIfFalse,
    ): TIfTrue | TIfFalse {
        return isCurrentUrl(urlToCheck, current) ? ifTrue : ifFalse;
    }

    return {
        currentUrl,
        isCurrentUrl,
        isCurrentOrParentUrl,
        whenCurrentUrl,
    };
}
