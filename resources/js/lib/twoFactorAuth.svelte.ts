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

const state = $state<TwoFactorAuthState>({
    qrCodeSvg: null,
    manualSetupKey: null,
    recoveryCodesList: [],
    errors: [],
});

const hasSetupData = (): boolean =>
    state.qrCodeSvg !== null && state.manualSetupKey !== null;

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
};

const notAvailable = async (): Promise<void> => {
    clearTwoFactorAuthData();
    state.errors = [
        'Two-factor authentication is not available in the WorkOS kit.',
    ];
};

export function twoFactorAuthState(): TwoFactorAuthStateApi {
    return {
        state,
        hasSetupData,
        clearSetupData,
        clearErrors,
        clearTwoFactorAuthData,
        fetchQrCode: notAvailable,
        fetchSetupKey: notAvailable,
        fetchSetupData: notAvailable,
        fetchRecoveryCodes: notAvailable,
    };
}
