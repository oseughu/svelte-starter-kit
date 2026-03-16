import { qrCode, recoveryCodes, secretKey } from '@/routes/two-factor';

type TwoFactorAuthState = {
    qrCodeSvg: string | null;
    manualSetupKey: string | null;
    recoveryCodesList: string[];
    errors: string[];
};

export type TwoFactorAuthStateApi = {
    state: TwoFactorAuthState;
    hasSetupData: () => boolean;
    clearSetupData: () => void;
    clearErrors: () => void;
    clearTwoFactorAuthData: () => void;
    fetchQrCode: () => Promise<void>;
    fetchSetupKey: () => Promise<void>;
    fetchSetupData: () => Promise<void>;
    fetchRecoveryCodes: () => Promise<void>;
};

const fetchJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, {
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        return response.json();
    }

    const text = await response.text();

    try {
        return JSON.parse(text) as T;
    } catch {
        return text as T;
    }
};

const state = $state<TwoFactorAuthState>({
    qrCodeSvg: null,
    manualSetupKey: null,
    recoveryCodesList: [],
    errors: [],
});

const hasSetupData = (): boolean =>
    state.qrCodeSvg !== null && state.manualSetupKey !== null;

export function twoFactorAuthState(): TwoFactorAuthStateApi {
    const fetchQrCode = async (): Promise<void> => {
        try {
            const { svg } = await fetchJson<{ svg: string; url: string }>(
                qrCode.url(),
            );

            state.qrCodeSvg = svg;
        } catch {
            state.errors = [...state.errors, 'Failed to fetch QR code'];
            state.qrCodeSvg = null;
        }
    };

    const fetchSetupKey = async (): Promise<void> => {
        try {
            const payload = await fetchJson<
                { secretKey?: string; secret_key?: string } | string
            >(secretKey.url());

            const key =
                typeof payload === 'string'
                    ? payload
                    : (payload.secretKey ?? payload.secret_key ?? null);

            if (!key) {
                throw new Error('Setup key not found in response');
            }

            state.manualSetupKey = key;
        } catch {
            state.errors = [...state.errors, 'Failed to fetch a setup key'];
            state.manualSetupKey = null;
        }
    };

    const clearErrors = (): void => {
        state.errors = [];
    };

    const clearSetupData = (): void => {
        state.manualSetupKey = null;
        state.qrCodeSvg = null;
        clearErrors();
    };

    const clearTwoFactorAuthData = (): void => {
        clearSetupData();
        state.recoveryCodesList = [];
        clearErrors();
    };

    const fetchRecoveryCodes = async (): Promise<void> => {
        try {
            clearErrors();
            state.recoveryCodesList = await fetchJson<string[]>(
                recoveryCodes.url(),
            );
        } catch {
            state.errors = [...state.errors, 'Failed to fetch recovery codes'];
            state.recoveryCodesList = [];
        }
    };

    const fetchSetupData = async (): Promise<void> => {
        try {
            clearErrors();
            await Promise.all([fetchQrCode(), fetchSetupKey()]);
        } catch {
            state.qrCodeSvg = null;
            state.manualSetupKey = null;
        }
    };

    return {
        state,
        hasSetupData,
        clearSetupData,
        clearErrors,
        clearTwoFactorAuthData,
        fetchQrCode,
        fetchSetupKey,
        fetchSetupData,
        fetchRecoveryCodes,
    };
}
